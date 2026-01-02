import { motion } from "motion/react";
import { useState } from "react";
import { PaperInput } from "../PaperNote";
import { ArrowLeft } from "lucide-react";

interface WriteMemoryProps {
  onSave: (content: string, emoji: string) => void;
  onCancel: () => void;
}

const emojis = ["😊", "✨", "💬", "⭐", "🌿", "🎉"];

export function WriteMemory({ onSave, onCancel }: WriteMemoryProps) {
  const [content, setContent] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  
  const handleSave = () => {
    if (content.trim()) {
      onSave(content, selectedEmoji);
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center px-6 py-4 gap-4">
        <button
          onClick={onCancel}
          className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg">오늘의 해피저금</h2>
          <p className="text-sm text-muted-foreground">
            짧게 적어도 충분해요.
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 px-6 py-8 space-y-6">
        {/* Paper note input */}
        <PaperInput
          value={content}
          onChange={setContent}
          placeholder="예: 오늘 들은 한 마디가 오래 남았다."
          maxLength={150}
        />
        
        {/* Emoji selector */}
        <div className="space-y-3">
          <label className="text-sm text-muted-foreground">
            느낌 (선택)
          </label>
          <div className="flex gap-3 flex-wrap">
            {emojis.map((emoji) => (
              <motion.button
                key={emoji}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all ${
                  selectedEmoji === emoji
                    ? 'bg-accent scale-110 shadow-md'
                    : 'bg-secondary/40 hover:bg-secondary'
                }`}
                onClick={() => setSelectedEmoji(emoji === selectedEmoji ? "" : emoji)}
                whileTap={{ scale: 0.9 }}
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom actions */}
      <div className="px-6 pb-8 space-y-3">
        <motion.button
          className={`w-full px-8 py-4 rounded-2xl transition-all ${
            content.trim()
              ? 'bg-primary text-primary-foreground hover:scale-105 active:scale-95'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
          onClick={handleSave}
          disabled={!content.trim()}
          whileTap={content.trim() ? { scale: 0.95 } : {}}
        >
          병에 넣기
        </motion.button>
        
        <button
          className="w-full px-8 py-3 text-muted-foreground hover:text-foreground transition-colors"
          onClick={onCancel}
        >
          취소
        </button>
      </div>
    </div>
  );
}
