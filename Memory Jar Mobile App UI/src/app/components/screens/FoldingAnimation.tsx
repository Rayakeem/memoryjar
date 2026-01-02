import { motion } from "motion/react";
import { useEffect } from "react";
import { PaperNote } from "../PaperNote";
import { Jellyfish } from "../Jellyfish";

interface FoldingAnimationProps {
  content: string;
  emoji: string;
  onComplete: () => void;
}

export function FoldingAnimation({ content, emoji, onComplete }: FoldingAnimationProps) {
  useEffect(() => {
    // Auto-complete after animation
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        {/* Paper note folding */}
        <motion.div
          initial={{ scale: 1, rotateX: 0, opacity: 1 }}
          animate={{
            scale: [1, 0.95, 0.7, 0.5],
            rotateX: [0, 45, 90, 180],
            opacity: [1, 0.9, 0.7, 0],
          }}
          transition={{
            duration: 2,
            times: [0, 0.4, 0.7, 1],
            ease: "easeInOut"
          }}
        >
          <PaperNote content={content} emoji={emoji} />
        </motion.div>
        
        {/* Jellyfish message */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <Jellyfish size="medium" />
          <p className="text-muted-foreground text-center">
            잘 맡아둘게요.
          </p>
        </motion.div>
        
        {/* Falling animation hint */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: [0, 1, 0], y: 100 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <div className="w-6 h-4 bg-card rounded-sm shadow-md" />
        </motion.div>
      </div>
    </div>
  );
}
