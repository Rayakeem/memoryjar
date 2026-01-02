import { motion, AnimatePresence } from "motion/react";

interface JellyfishBubbleProps {
  isVisible: boolean;
  text: string;
  onClose: () => void;
}

export function JellyfishBubble({ isVisible, text, onClose }: JellyfishBubbleProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-4 z-50"
          style={{ minWidth: '240px', maxWidth: '300px' }}
        >
          {/* Speech bubble */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-lg border border-primary/10 relative">
            <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line">
              {text}
            </p>
            
            {/* Tail */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full"
              style={{
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid rgba(255, 255, 255, 0.95)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
