import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Splash } from './components/screens/Splash';
import { Onboarding } from './components/screens/Onboarding';
import { Login } from './components/screens/Login';
import { Home } from './components/screens/Home';
import { WriteMemory } from './components/screens/WriteMemory';
import { FoldingAnimation } from './components/screens/FoldingAnimation';
import { YearEndOpen } from './components/screens/YearEndOpen';
import { BookOrder } from './components/screens/BookOrder';
import { Settings } from './components/screens/Settings';
import { Toast } from './components/Toast';

type Screen = 
  | 'splash' 
  | 'onboarding'
  | 'login'
  | 'home' 
  | 'write' 
  | 'folding' 
  | 'yearEnd' 
  | 'bookOrder' 
  | 'settings';

interface Memory {
  id: string;
  content: string;
  emoji: string;
  date: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [memories, setMemories] = useState<Memory[]>([]);
  const [currentMemory, setCurrentMemory] = useState<{ content: string; emoji: string } | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  
  // Calculate year progress (0-100)
  const getYearProgress = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    const progress = ((now.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100;
    return Math.round(progress);
  };
  
  // Calculate jellyfish stage based on current month (1-6)
  // Loosely mapped to seasons:
  // Spring (Mar-May): Egg → Planula
  // Summer (Jun-Aug): Polyp → Strobila  
  // Autumn (Sep-Nov): Ephyra
  // Winter (Dec-Feb): Adult
  const getJellyfishStage = (): 1 | 2 | 3 | 4 | 5 | 6 => {
    const month = new Date().getMonth() + 1; // 1-12
    // Winter-Spring transition
    if (month === 1 || month === 2) return 1; // Jan-Feb: Egg
    if (month === 3 || month === 4) return 2; // Mar-Apr: Planula
    // Spring-Summer
    if (month === 5 || month === 6) return 3; // May-Jun: Polyp
    // Summer
    if (month === 7 || month === 8) return 4; // Jul-Aug: Strobila
    // Autumn
    if (month === 9 || month === 10) return 5; // Sep-Oct: Ephyra
    // Winter
    return 6; // Nov-Dec: Adult
  };
  
  const [yearProgress] = useState(getYearProgress());
  const [jellyfishStage, setJellyfishStage] = useState(getJellyfishStage());
  
  // Load sample memories for demo
  useEffect(() => {
    const sampleMemories: Memory[] = [
      {
        id: '1',
        content: '아침에 받은 따뜻한 인사가 하루를 기분 좋게 만들었다.',
        emoji: '😊',
        date: '2026.01.15',
      },
      {
        id: '2',
        content: '오랜만에 만난 친구와의 대화가 즐거웠다.',
        emoji: '💬',
        date: '2026.02.08',
      },
      {
        id: '3',
        content: '새로 시작한 일이 생각보다 잘 풀렸다.',
        emoji: '✨',
        date: '2026.03.22',
      },
      {
        id: '4',
        content: '봄날의 산책이 마음을 평온하게 해줬다.',
        emoji: '🌿',
        date: '2026.04.10',
      },
      {
        id: '5',
        content: '책에서 읽은 한 문장이 오래 남았다.',
        emoji: '⭐',
        date: '2026.05.03',
      },
    ];
    
    setMemories(sampleMemories);
  }, []);
  
  const handleSaveMemory = (content: string, emoji: string) => {
    setCurrentMemory({ content, emoji });
    setCurrentScreen('folding');
  };
  
  const handleFoldingComplete = () => {
    if (currentMemory) {
      const newMemory: Memory = {
        id: Date.now().toString(),
        content: currentMemory.content,
        emoji: currentMemory.emoji,
        date: new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).replace(/\. /g, '.').replace('.', ''),
      };
      
      setMemories([...memories, newMemory]);
      setCurrentMemory(null);
      setToastMessage('저금 완료');
      setShowToast(true);
      setCurrentScreen('home');
    }
  };
  
  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };
  
  return (
    <div className="relative w-full min-h-screen bg-background">
      {/* Mobile container */}
      <div className="mx-auto max-w-[393px] min-h-screen bg-background shadow-2xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentScreen === 'splash' && (
              <Splash onStart={() => setCurrentScreen('onboarding')} />
            )}
            
            {currentScreen === 'onboarding' && (
              <Onboarding onComplete={() => setCurrentScreen('login')} />
            )}
            
            {currentScreen === 'login' && (
              <Login onComplete={() => setCurrentScreen('home')} />
            )}
            
            {currentScreen === 'home' && (
              <Home
                noteCount={memories.length}
                yearProgress={yearProgress}
                jellyfishStage={jellyfishStage}
                onWriteMemory={() => setCurrentScreen('write')}
                onSettings={() => setCurrentScreen('settings')}
                isEmpty={memories.length === 0}
              />
            )}
            
            {currentScreen === 'write' && (
              <WriteMemory
                onSave={handleSaveMemory}
                onCancel={() => setCurrentScreen('home')}
              />
            )}
            
            {currentScreen === 'folding' && currentMemory && (
              <FoldingAnimation
                content={currentMemory.content}
                emoji={currentMemory.emoji}
                onComplete={handleFoldingComplete}
              />
            )}
            
            {currentScreen === 'yearEnd' && (
              <YearEndOpen
                memories={memories}
                onComplete={() => setCurrentScreen('home')}
                onOrderBook={() => setCurrentScreen('bookOrder')}
              />
            )}
            
            {currentScreen === 'bookOrder' && (
              <BookOrder
                onBack={() => setCurrentScreen('yearEnd')}
                onComplete={() => {
                  showToastMessage('주문이 완료되었습니다');
                  setCurrentScreen('home');
                }}
              />
            )}
            
            {currentScreen === 'settings' && (
              <Settings onBack={() => setCurrentScreen('home')} />
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Toast notifications */}
        <Toast
          message={toastMessage}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
        
        {/* Debug controls (for demo) */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white px-4 py-2 rounded-full text-xs flex gap-2 backdrop-blur-sm">
          <button
            onClick={() => setCurrentScreen('home')}
            className="px-3 py-1 rounded-full hover:bg-white/20"
          >
            Home
          </button>
          <button
            onClick={() => setCurrentScreen('yearEnd')}
            className="px-3 py-1 rounded-full hover:bg-white/20"
          >
            Year End
          </button>
          <div className="w-px h-4 bg-white/20 my-auto" />
          <button
            onClick={() => setJellyfishStage((prev) => (prev === 1 ? 6 : (prev - 1) as 1 | 2 | 3 | 4 | 5 | 6))}
            className="px-3 py-1 rounded-full hover:bg-white/20"
          >
            ←
          </button>
          <span className="px-2 py-1">
            {jellyfishStage === 1 && "알"}
            {jellyfishStage === 2 && "플라놀라"}
            {jellyfishStage === 3 && "폴립"}
            {jellyfishStage === 4 && "스트로빌라"}
            {jellyfishStage === 5 && "에피라"}
            {jellyfishStage === 6 && "성체"}
          </span>
          <button
            onClick={() => setJellyfishStage((prev) => (prev === 6 ? 1 : (prev + 1) as 1 | 2 | 3 | 4 | 5 | 6))}
            className="px-3 py-1 rounded-full hover:bg-white/20"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}