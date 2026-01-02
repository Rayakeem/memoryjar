import { motion } from "motion/react";
import { useState } from "react";

interface PaperNoteProps {
  content?: string;
  emoji?: string;
  date?: string;
  isFolded?: boolean;
  className?: string;
}

export function PaperNote({ 
  content = "", 
  emoji = "", 
  date = "",
  isFolded = false,
  className = "" 
}: PaperNoteProps) {
  if (isFolded) {
    return (
      <motion.div
        className={`relative w-24 h-16 ${className}`}
        initial={{ rotateX: 0 }}
        animate={{ rotateX: 0 }}
      >
        <div className="absolute inset-0 bg-card rounded-md shadow-md border border-border">
          {/* Fold line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-muted" />
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      className={`relative bg-card rounded-2xl p-6 shadow-lg border border-border/50 ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03' /%3E%3C/svg%3E")`,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Date */}
      {date && (
        <div className="text-xs text-muted-foreground mb-3">
          {date}
        </div>
      )}
      
      {/* Emoji */}
      {emoji && (
        <div className="text-2xl mb-3">
          {emoji}
        </div>
      )}
      
      {/* Content */}
      {content && (
        <div className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      )}
      
      {/* Paper texture lines */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-muted/20"
            style={{ top: `${20 + i * 15}%` }}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface PaperInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

export function PaperInput({ 
  value, 
  onChange, 
  placeholder = "",
  maxLength = 150,
  className = "" 
}: PaperInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <motion.div
      className={`relative bg-card rounded-2xl p-6 shadow-lg border-2 transition-colors ${
        isFocused ? 'border-accent' : 'border-border/50'
      } ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03' /%3E%3C/svg%3E")`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full h-32 bg-transparent border-none outline-none resize-none text-foreground/90 placeholder:text-muted-foreground/60"
        style={{ lineHeight: '1.8' }}
      />
      
      {/* Character count */}
      <div className="text-xs text-muted-foreground text-right mt-2">
        {value.length} / {maxLength}
      </div>
      
      {/* Paper texture lines */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute left-6 right-6 h-px bg-muted/15"
            style={{ top: `${25 + i * 20}%` }}
          />
        ))}
      </div>
    </motion.div>
  );
}
