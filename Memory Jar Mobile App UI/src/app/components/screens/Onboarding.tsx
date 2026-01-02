import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Jar } from "../Jar";
import { Jellyfish } from "../Jellyfish";
import { SeasonBar } from "../SeasonBar";
import { ChevronRight } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  
  const slides = [
    {
      title: "행복했던 순간을 담아요",
      body: "짧게 적고, 병에 넣어두면 끝.",
      illustration: <Jar noteCount={1} className="mx-auto" />,
    },
    {
      title: "해파리도 함께 자라요",
      body: "보름달물해파리는\n알에서 시작해,\n여러 모습을 거쳐\n해파리가 됩니다.\n\n해피저금도\n올해의 흐름을\n같이 지나가요.",
      illustration: (
        <div className="space-y-8 flex flex-col items-center">
          <div className="flex gap-6 items-end justify-center">
            <div className="flex flex-col items-center gap-2">
              <Jellyfish size="small" stage={1} />
              <span className="text-[10px] text-muted-foreground">알</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Jellyfish size="small" stage={5} />
              <span className="text-[10px] text-muted-foreground">에피라</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Jellyfish size="medium" stage={6} />
              <span className="text-[10px] text-muted-foreground">성체</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "연말에 한 번에 열어요",
      body: "지금은 보관하고, 연말에 꺼내보는 기록.",
      illustration: (
        <div className="space-y-6">
          <Jar noteCount={8} className="mx-auto" />
          <SeasonBar progress={65} className="max-w-xs mx-auto" />
        </div>
      ),
    },
  ];
  
  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between px-6 py-12">
      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === step ? 'w-8 bg-primary' : 'w-1.5 bg-muted'
            }`}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full"
          >
            {/* Illustration */}
            <div className="mb-12">
              {slides[step].illustration}
            </div>
            
            {/* Text */}
            <div className="text-center space-y-3 mb-8">
              <h2 className="text-2xl text-foreground tracking-tight">
                {slides[step].title}
              </h2>
              <p className="text-muted-foreground">
                {slides[step].body}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation */}
      <motion.button
        className="w-full max-w-sm bg-primary text-primary-foreground px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
        onClick={handleNext}
        whileTap={{ scale: 0.95 }}
      >
        {step === slides.length - 1 ? '병 만들기' : '다음'}
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}