import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { PaperNote } from "../PaperNote";
import { Jar } from "../Jar";
import { Jellyfish } from "../Jellyfish";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface Memory {
  id: string;
  content: string;
  emoji: string;
  date: string;
}

interface YearEndOpenProps {
  memories: Memory[];
  onComplete: () => void;
  onOrderBook: () => void;
}

export function YearEndOpen({ memories, onComplete, onOrderBook }: YearEndOpenProps) {
  const [step, setStep] = useState<'unlock' | 'opening' | 'viewing' | 'complete'>('unlock');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleUnlock = () => {
    setStep('opening');
    setTimeout(() => {
      setStep('viewing');
    }, 2000);
  };
  
  const handleNext = () => {
    if (currentIndex < memories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStep('complete');
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  if (step === 'unlock') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8"
        >
          <div className="relative">
            <Jar noteCount={memories.length} />
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Jellyfish size="medium" stage={6} />
            </motion.div>
            <motion.div
              className="absolute -top-2 left-1/2 -translate-x-1/2"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-accent" />
            </motion.div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-2xl text-foreground">
              이제 열어도 돼요.
            </h1>
            <p className="text-muted-foreground">
              올해의 해피저금을 꺼내볼 시간이에요.
            </p>
          </div>
          
          <motion.button
            className="bg-primary text-primary-foreground px-12 py-4 rounded-2xl transition-all hover:scale-105"
            onClick={handleUnlock}
            whileTap={{ scale: 0.95 }}
          >
            열어보기
          </motion.button>
        </motion.div>
      </div>
    );
  }
  
  if (step === 'opening') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-8"
        >
          <motion.div
            animate={{ rotateZ: [0, -5, 5, 0] }}
            transition={{ duration: 1, repeat: 2 }}
          >
            <Jar noteCount={memories.length} />
          </motion.div>
          
          <Jellyfish size="medium" stage={6} />
        </motion.div>
      </div>
    );
  }
  
  if (step === 'viewing') {
    const currentMemory = memories[currentIndex];
    
    return (
      <div className="min-h-screen bg-background flex flex-col px-6 py-8">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1">
            {memories.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentIndex ? 'w-8 bg-primary' : 'w-1.5 bg-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {memories.length}
          </span>
        </div>
        
        {/* Memory card */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMemory.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm"
            >
              <PaperNote
                content={currentMemory.content}
                emoji={currentMemory.emoji}
                date={currentMemory.date}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-3 rounded-full transition-all ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-secondary active:scale-95'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={handleNext}
            className="flex-1 bg-primary text-primary-foreground px-8 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95"
          >
            {currentIndex === memories.length - 1 ? '완료' : '다음'}
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIndex === memories.length - 1}
            className={`p-3 rounded-full transition-all ${
              currentIndex === memories.length - 1
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-secondary active:scale-95'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }
  
  // Complete screen
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 gap-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center mb-4">
          <Jellyfish size="medium" stage={6} />
        </div>
        
        <h1 className="text-2xl text-foreground">
          올해의 해피저금이 모였어요.
        </h1>
        
        <p className="text-muted-foreground">
          {memories.length}개의 행복한 순간들
        </p>
      </motion.div>
      
      <div className="w-full max-w-sm space-y-3">
        <motion.button
          className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-2xl transition-all hover:scale-105"
          onClick={onOrderBook}
          whileTap={{ scale: 0.95 }}
        >
          책으로 남기기
        </motion.button>
        
        <button
          className="w-full px-8 py-3 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setCurrentIndex(0) || setStep('viewing')}
        >
          다시 처음부터 보기
        </button>
        
        <button
          className="w-full px-8 py-3 text-muted-foreground hover:text-foreground transition-colors"
          onClick={onComplete}
        >
          홈으로
        </button>
      </div>
    </div>
  );
}