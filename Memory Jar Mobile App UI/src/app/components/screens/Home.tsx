import { motion } from "motion/react";
import { useState } from "react";
import { Jar } from "../Jar";
import { Jellyfish } from "../Jellyfish";
import { SeasonBar } from "../SeasonBar";
import { JellyfishBubble } from "../JellyfishBubble";
import { Plus, Settings } from "lucide-react";

interface HomeProps {
  noteCount: number;
  yearProgress: number;
  jellyfishStage: 1 | 2 | 3 | 4 | 5 | 6;
  onWriteMemory: () => void;
  onSettings: () => void;
  isEmpty?: boolean;
}

// Jellyfish facts (exact text from requirements)
const jellyfishFacts = [
  "보름달물해파리는 뇌, 심장, 피가 없습니다.\n우리 몸의 필수 기관인 뇌, 심장, 혈액, 눈 등이 없고,\n몸의 95%가 수분으로 이루어져 있어\n'물 주머니'라고 불리기도 합니다.",
  "보름달물해파리는 아가미나 폐가 없지만,\n얇은 피부를 통해 바닷물 속의 산소를\n직접 흡수하여 호흡합니다.",
  "투명한 몸속에 보이는 네 개의 말굽 모양,\n또는 클로버 모양의 기관은 생식선입니다.\n먹이를 먹으면 이 부분이 먹이의 색으로\n물들어 더욱 선명해집니다.",
  "먹이가 부족하면 에너지를 절약하기 위해\n몸 크기를 10분의 1로 줄일 수 있습니다.\n다시 먹이가 풍부해지면\n원래 크기로 돌아옵니다.",
  "보름달물해파리는 약 6억 년 전부터\n지구상에 존재해 왔습니다.\n공룡보다도 훨씬 오래된\n해양 생존자입니다.",
  "다른 해파리들과 달리\n독성이 매우 약해서\n대부분의 사람은 쏘여도\n거의 느끼지 못합니다.",
];

export function Home({ 
  noteCount, 
  yearProgress,
  jellyfishStage,
  onWriteMemory, 
  onSettings,
  isEmpty = false 
}: HomeProps) {
  const [showBubble, setShowBubble] = useState(false);
  const [currentFact, setCurrentFact] = useState("");
  const [jellyfishBounce, setJellyfishBounce] = useState(false);
  const [showHint, setShowHint] = useState(true);
  
  // Get jellyfish position based on stage
  const getJellyfishPosition = () => {
    switch (jellyfishStage) {
      case 1: // Egg - far above
      case 2: // Planula - above
        return "absolute -top-12 left-1/2 -translate-x-1/2";
      case 3: // Polyp - bottom attached
        return "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2";
      case 4: // Strobila - bottom
        return "absolute bottom-2 right-4";
      case 5: // Ephyra - side floating
      case 6: // Adult - side floating
        return "absolute -top-4 -right-8";
      default:
        return "absolute -top-4 -right-8";
    }
  };
  
  // Hide hint after first interaction
  const handleJellyfishTap = () => {
    setJellyfishBounce(true);
    setShowHint(false);
    setTimeout(() => setJellyfishBounce(false), 300);
  };
  
  const handleJellyfishLongPress = () => {
    setShowHint(false);
    const randomFact = jellyfishFacts[Math.floor(Math.random() * jellyfishFacts.length)];
    setCurrentFact(randomFact);
    setShowBubble(true);
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
      setShowBubble(false);
    }, 8000);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <h3 className="text-sm text-muted-foreground tracking-wider">
          Memory Jar
        </h3>
        <button
          onClick={onSettings}
          className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
        >
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        {/* Jar with Jellyfish */}
        <div className="relative mb-8">
          <Jar noteCount={noteCount} />
          
          {/* Jellyfish with stage-based positioning */}
          <motion.div
            className={getJellyfishPosition()}
            animate={jellyfishBounce ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <JellyfishBubble 
                isVisible={showBubble} 
                text={currentFact}
                onClose={() => setShowBubble(false)}
              />
              <Jellyfish 
                size="medium" 
                stage={jellyfishStage}
                onTap={handleJellyfishTap}
                onLongPress={handleJellyfishLongPress}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Message */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isEmpty ? (
            <p className="text-muted-foreground">
              첫 번째 해피저금을 담아볼까요?
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">
              {noteCount > 0 && `${noteCount}개의 순간이 담겨있어요`}
            </p>
          )}
        </motion.div>
        
        {/* Season progress */}
        <SeasonBar progress={yearProgress} className="max-w-sm mb-8" />
        
        {/* CTA Button */}
        <motion.button
          className="w-full max-w-sm bg-primary text-primary-foreground px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
          onClick={onWriteMemory}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
        >
          <Plus className="w-5 h-5" />
          오늘의 해피저금
        </motion.button>
        
        {/* Hint text */}
        <motion.p
          className="text-xs text-muted-foreground/70 text-center mt-4 max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {showHint && "행복했던 순간만 짧게 적어도 괜찮아요."}
        </motion.p>
      </div>
    </div>
  );
}