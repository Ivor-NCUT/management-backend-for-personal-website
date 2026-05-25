/**
 * [INPUT]: 依赖 @/components/ui/Button, lucide-react
 * [OUTPUT]: 对外提供 SaveButton 组件
 * [POS]: ui/ 的带反馈保存按钮
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from "react";
import Button from "./Button";
import { Check } from "lucide-react";
import { broadcastPortfolioSync } from "@/lib/portfolioSync";

interface SaveButtonProps {
  onSave: () => void;
}

export default function SaveButton({ onSave }: SaveButtonProps) {
  const [saved, setSaved] = useState(false);

  const handleClick = () => {
    onSave();
    broadcastPortfolioSync();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      className={saved ? "bg-green-500 hover:bg-green-600" : ""}
    >
      {saved ? (
        <>
          <Check className="w-4 h-4" />
          已保存
        </>
      ) : (
        "保存"
      )}
    </Button>
  );
}
