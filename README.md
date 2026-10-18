# management-backend-for-personal-website
个人网站的管理后台

## 构建和迁移验收

```sh
pnpm install --frozen-lockfile --ignore-scripts
node tests/migration-smoke.mjs
node node_modules/typescript/bin/tsc -b --noEmit
node node_modules/vite/bin/vite.js build
docker build -t portfolio-admin .
```

Dockerfile 使用 Node 24.15.0、pnpm 11.25.0 和 Caddy 2.10.2。安装时禁用依赖生命周期脚本；esbuild 使用锁文件解析出的平台二进制。直接运行构建工具，避免 pnpm 11 的脚本前自动安装再次触发仓库现有的构建脚本审批占位配置。

容器监听 8080，支持全部编辑器深链接；`/assets/` 下不存在的文件返回 404。运行镜像只包含构建产物和静态服务器，不包含源码映射、开发依赖或私密配置。

## 数据和外部依赖

作品集内容保存在浏览器当前 origin 的 `localStorage["portfolio-data"]`。更换域名不会自动迁移浏览器数据，迁移前需从原后台导出 JSON，保留原件，再在新的受控入口导入。合成测试不会读取或改写真实浏览器资料。

图片存储在构建时读取 `VITE_INSFORGE_API_URL`、`VITE_INSFORGE_ANON_KEY` 和 `VITE_INSFORGE_STORAGE_BUCKET`（默认 `portfolio`）。这些变量会进入浏览器产物，只能使用允许公开的配置，不能放服务端密钥。本次隔离镜像不注入未验证的历史凭据；云存储失败沿用现有内联图片降级行为。启用云存储需要确认服务可用并提供经核验的构建环境后重新构建。

主页同步依赖构建时的 `VITE_PORTFOLIO_SYNC_TARGET_ORIGINS` 和目标站点的 `admin-sync.html`。未配置生产主站并不代表已经完成同步验收。

2026-10-18 的迁移以 main `9bfa059` 为源码基线，保留后于旧 Zeabur 部署的同步改动。历史图片服务的只读检查返回 503，原因尚未确认；图片云存储和真实主站同步仍待验收。原服务继续暂停，InstaCloud 验收服务配置为无公共入口并在验收后停止。本项目当前没有服务端登录保护，不能把原 `PASSWORD` 环境变量当作访问控制，也不能把本次隔离验收当作公开启用授权。
