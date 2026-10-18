// [INPUT]: Existing store/storage modules and Vite's installed esbuild.
// [OUTPUT]: Synthetic persistence and image fallback acceptance; no network writes.
// [POS]: Migration checks; never reads or changes a real browser profile.
// [PROTOCOL]: Update CLAUDE.md when changing this test's role.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { build } = createRequire(require.resolve('vite/package.json'))('esbuild');
const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const temp = await mkdtemp(join(tmpdir(), 'portfolio-migration-'));
const data = new Map();
globalThis.localStorage = {
  getItem: key => data.get(key) ?? null,
  setItem: (key, value) => data.set(key, String(value)),
  removeItem: key => data.delete(key),
};
globalThis.window = globalThis;
window.location = { hostname: 'localhost' };
globalThis.FileReader = class {
  async readAsDataURL(file) {
    this.result = `data:${file.type};base64,${Buffer.from(await file.arrayBuffer()).toString('base64')}`;
    this.onload();
  }
};
let networkAttempts = 0;
globalThis.fetch = async () => {
  networkAttempts++;
  throw new Error('Synthetic offline fixture: network access disabled');
};
async function bundle(entry, output, define = {}) {
  const outfile = join(temp, output);
  await build({ entryPoints: [resolve(root, entry)], outfile, bundle: true,
    format: 'esm', platform: 'browser', tsconfig: resolve(root, 'tsconfig.json'), define });
  return pathToFileURL(outfile).href;
}
try {
  const storeUrl = await bundle('src/stores/usePortfolioStore.ts', 'store.mjs');
  const { usePortfolioStore: store } = await import(storeUrl);
  const baseline = store.getState().exportData();
  store.getState().setHero({ name: 'SYNTHETIC_MIGRATION_ONLY' });
  store.getState().addWork({ id: 987654321, title: 'Synthetic work', image: '', category: 'test' });
  store.getState().updateWork(987654321, { title: 'Saved synthetic work' });
  assert.equal(JSON.parse(data.get('portfolio-data')).state.hero.name, 'SYNTHETIC_MIGRATION_ONLY');
  const { usePortfolioStore: reloaded } = await import(`${storeUrl}?reload=1`);
  assert.equal(reloaded.getState().hero.name, 'SYNTHETIC_MIGRATION_ONLY');
  assert.equal(reloaded.getState().works.find(x => x.id === 987654321).title, 'Saved synthetic work');
  const exported = JSON.parse(JSON.stringify(reloaded.getState().exportData()));
  reloaded.getState().resetToDefaults();
  reloaded.getState().importData(exported);
  assert.deepEqual(reloaded.getState().exportData(), exported);
  reloaded.getState().deleteWork(987654321);
  assert.equal(reloaded.getState().works.some(x => x.id === 987654321), false);
  reloaded.getState().importData(baseline);

  const storageUrl = await bundle('src/lib/storage.ts', 'storage.mjs', {
    'import.meta.env.VITE_INSFORGE_API_URL': JSON.stringify('https://synthetic.invalid'),
    'import.meta.env.VITE_INSFORGE_ANON_KEY': JSON.stringify(''),
    'import.meta.env.VITE_INSFORGE_STORAGE_BUCKET': JSON.stringify('portfolio'),
  });
  const { uploadImage, deleteImage } = await import(storageUrl);
  const file = new File(['synthetic'], 'test.png', { type: 'image/png' });
  const local = await uploadImage(file);
  assert.equal(local.url, 'data:image/png;base64,c3ludGhldGlj');
  assert.match(local.key, /^inline:/);
  await deleteImage(local.key);
  assert.equal(networkAttempts, 0);
  window.location.hostname = 'synthetic.invalid';
  const fallback = await uploadImage(file);
  assert.equal(fallback.url, local.url);
  assert.match(fallback.key, /^inline:/);
  assert.ok(networkAttempts > 0);
  assert.ok(Number(data.get('portfolio-storage:bypass-until')) > Date.now());
  const attempts = networkAttempts;
  await uploadImage(file);
  assert.equal(networkAttempts, attempts);
  console.log(JSON.stringify({ passed: true, synthetic_localStorage_crud_reload: true,
    export_import_roundtrip: true, local_inline_image: true,
    offline_cloud_fallback: true, external_requests_sent: 0 }));
} finally {
  await rm(temp, { recursive: true, force: true });
}
