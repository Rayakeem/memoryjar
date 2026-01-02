import { motion } from "motion/react";
import { Jar } from "../Jar";

interface SplashProps {
  onStart: () => void;
}

export function Splash({ onStart }: SplashProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between px-6 py-12">
      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Jar noteCount={0} className="mb-8" />
        </motion.div>
        
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-xl text-foreground/90 tracking-tight">
            적어요. 행복했던 순간을
          </h1>
          <h2 className="text-xl text-foreground/90 tracking-tight">
            열어요. 연말에 한 번에
          </h2>
        </motion.div>
      </div>
      
      {/* Bottom CTA */}
      <motion.button
        className="w-full max-w-sm bg-primary text-primary-foreground px-8 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95"
        onClick={onStart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileTap={{ scale: 0.95 }}
      >
        시작하기
      </motion.button>
    </div>
  );
}
