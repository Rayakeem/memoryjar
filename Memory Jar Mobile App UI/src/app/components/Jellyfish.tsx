import { motion } from "motion/react";

interface JellyfishProps {
  size?: "small" | "medium";
  stage?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  onTap?: () => void;
  onLongPress?: () => void;
}

export function Jellyfish({ 
  size = "medium", 
  stage = 1, 
  className = "",
  onTap,
  onLongPress,
}: JellyfishProps) {
  const dimensions = size === "small" ? { w: 32, h: 40 } : { w: 48, h: 60 };
  
  // Long press handling
  let pressTimer: NodeJS.Timeout | null = null;
  
  const handleMouseDown = () => {
    pressTimer = setTimeout(() => {
      onLongPress?.();
    }, 2000);
  };
  
  const handleMouseUp = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      pressTimer = null;
    }
    onTap?.();
  };
  
  const handleMouseLeave = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      pressTimer = null;
    }
  };
  
  // Stage 1: 수정란 (Fertilized Egg)
  if (stage === 1) {
    return (
      <motion.div
        className={`relative cursor-pointer ${className}`}
        style={{ width: dimensions.w * 0.4, height: dimensions.h * 0.4 }}
        animate={{ y: [0, -4, 0], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <svg
          width={dimensions.w * 0.4}
          height={dimensions.h * 0.4}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tiny sphere */}
          <circle cx="10" cy="10" r="8" fill="#E8F5F0" opacity="0.7" />
          <circle cx="10" cy="10" r="6" fill="#D4EDE4" opacity="0.5" />
          <circle cx="8" cy="8" r="3" fill="white" opacity="0.6" />
        </svg>
      </motion.div>
    );
  }
  
  // Stage 2: 플라놀라 유생 (Planula Larva)
  if (stage === 2) {
    return (
      <motion.div
        className={`relative cursor-pointer ${className}`}
        style={{ width: dimensions.w * 0.6, height: dimensions.h * 0.5 }}
        animate={{ 
          x: [0, -6, 0, 6, 0],
          y: [0, -3, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <svg
          width={dimensions.w * 0.6}
          height={dimensions.h * 0.5}
          viewBox="0 0 30 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Oval shape */}
          <ellipse cx="15" cy="12" rx="12" ry="8" fill="#D4EDE4" opacity="0.7" />
          <ellipse cx="15" cy="12" rx="10" ry="6" fill="#E8F5F0" opacity="0.8" />
          <ellipse cx="12" cy="10" rx="4" ry="3" fill="white" opacity="0.5" />
          {/* Tiny cilia suggestion */}
          <motion.path
            d="M 5 12 Q 3 13, 2 14"
            stroke="#D4EDE4"
            strokeWidth="1"
            opacity="0.4"
            animate={{ d: ["M 5 12 Q 3 13, 2 14", "M 5 12 Q 3 11, 2 10", "M 5 12 Q 3 13, 2 14"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
      </motion.div>
    );
  }
  
  // Stage 3: 폴립 (Polyp) - attached to bottom
  if (stage === 3) {
    return (
      <motion.div
        className={`relative cursor-pointer ${className}`}
        style={{ width: dimensions.w * 0.7, height: dimensions.h * 0.8 }}
        animate={{ scaleY: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <svg
          width={dimensions.w * 0.7}
          height={dimensions.h * 0.8}
          viewBox="0 0 35 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base/foot attached to surface */}
          <ellipse cx="17.5" cy="46" rx="8" ry="2" fill="#B8D4CA" opacity="0.6" />
          
          {/* Column/stalk */}
          <rect x="14" y="30" width="7" height="16" fill="#D4EDE4" opacity="0.7" rx="2" />
          
          {/* Head with tentacles */}
          <ellipse cx="17.5" cy="20" rx="10" ry="12" fill="#E8F5F0" opacity="0.8" />
          
          {/* Tentacles */}
          <motion.path
            d="M 10 18 Q 5 15, 3 12"
            stroke="#D4EDE4"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
            animate={{ d: ["M 10 18 Q 5 15, 3 12", "M 10 18 Q 6 14, 4 10", "M 10 18 Q 5 15, 3 12"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M 14 15 Q 10 10, 8 6"
            stroke="#D4EDE4"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
            animate={{ d: ["M 14 15 Q 10 10, 8 6", "M 14 15 Q 11 9, 9 5", "M 14 15 Q 10 10, 8 6"] }}
            transition={{ duration: 2.3, repeat: Infinity }}
          />
          <motion.path
            d="M 21 15 Q 25 10, 27 6"
            stroke="#D4EDE4"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
            animate={{ d: ["M 21 15 Q 25 10, 27 6", "M 21 15 Q 24 9, 26 5", "M 21 15 Q 25 10, 27 6"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <motion.path
            d="M 25 18 Q 30 15, 32 12"
            stroke="#D4EDE4"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
            animate={{ d: ["M 25 18 Q 30 15, 32 12", "M 25 18 Q 29 14, 31 10", "M 25 18 Q 30 15, 32 12"] }}
            transition={{ duration: 2.7, repeat: Infinity }}
          />
        </svg>
      </motion.div>
    );
  }
  
  // Stage 4: 스트로빌라 (Strobila) - segmented column
  if (stage === 4) {
    return (
      <motion.div
        className={`relative cursor-pointer ${className}`}
        style={{ width: dimensions.w * 0.8, height: dimensions.h }}
        animate={{ scaleY: [1, 0.95, 1], scaleX: [1, 1.03, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <svg
          width={dimensions.w * 0.8}
          height={dimensions.h}
          viewBox="0 0 40 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base */}
          <ellipse cx="20" cy="58" rx="10" ry="2" fill="#B8D4CA" opacity="0.6" />
          
          {/* Stacked segments (strobila) */}
          <g opacity="0.8">
            {/* Segment 1 (bottom) */}
            <ellipse cx="20" cy="52" rx="8" ry="4" fill="#D4EDE4" opacity="0.7" />
            <ellipse cx="20" cy="51" rx="9" ry="3" fill="#E8F5F0" opacity="0.6" />
            
            {/* Segment 2 */}
            <ellipse cx="20" cy="46" rx="9" ry="4" fill="#D4EDE4" opacity="0.7" />
            <ellipse cx="20" cy="45" rx="10" ry="3" fill="#E8F5F0" opacity="0.6" />
            
            {/* Segment 3 */}
            <ellipse cx="20" cy="40" rx="10" ry="4" fill="#D4EDE4" opacity="0.7" />
            <ellipse cx="20" cy="39" rx="11" ry="3" fill="#E8F5F0" opacity="0.6" />
            
            {/* Segment 4 (top, about to detach) */}
            <motion.g
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ellipse cx="20" cy="34" rx="11" ry="4" fill="#D4EDE4" opacity="0.8" />
              <ellipse cx="20" cy="33" rx="12" ry="3" fill="#E8F5F0" opacity="0.7" />
            </motion.g>
          </g>
        </svg>
      </motion.div>
    );
  }
  
  // Stage 5: 에피라 (Ephyra) - star-shaped baby jellyfish
  if (stage === 5) {
    return (
      <motion.div
        className={`relative cursor-pointer ${className}`}
        style={{ width: dimensions.w * 0.9, height: dimensions.h * 0.9 }}
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <svg
          width={dimensions.w * 0.9}
          height={dimensions.h * 0.9}
          viewBox="0 0 44 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Central body */}
          <circle cx="22" cy="20" r="10" fill="#E8F5F0" opacity="0.8" />
          <circle cx="22" cy="19" r="8" fill="#D4EDE4" opacity="0.7" />
          
          {/* Star-like arms (8 lobes typical of ephyra) */}
          <motion.path
            d="M 22 10 Q 18 8, 14 8"
            fill="#E8F5F0"
            opacity="0.6"
            animate={{ d: ["M 22 10 Q 18 8, 14 8", "M 22 10 Q 18 7, 13 6", "M 22 10 Q 18 8, 14 8"] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <motion.path
            d="M 22 10 Q 26 8, 30 8"
            fill="#E8F5F0"
            opacity="0.6"
            animate={{ d: ["M 22 10 Q 26 8, 30 8", "M 22 10 Q 26 7, 31 6", "M 22 10 Q 26 8, 30 8"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Lobes */}
          <ellipse cx="14" cy="16" rx="4" ry="6" fill="#D4EDE4" opacity="0.6" />
          <ellipse cx="30" cy="16" rx="4" ry="6" fill="#D4EDE4" opacity="0.6" />
          <ellipse cx="16" cy="24" rx="5" ry="4" fill="#D4EDE4" opacity="0.6" />
          <ellipse cx="28" cy="24" rx="5" ry="4" fill="#D4EDE4" opacity="0.6" />
          
          {/* Small tentacles */}
          <motion.path
            d="M 18 28 Q 16 32, 14 36"
            stroke="#D4EDE4"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
            animate={{ d: ["M 18 28 Q 16 32, 14 36", "M 18 28 Q 16 30, 15 34", "M 18 28 Q 16 32, 14 36"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.path
            d="M 26 28 Q 28 32, 30 36"
            stroke="#D4EDE4"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
            animate={{ d: ["M 26 28 Q 28 32, 30 36", "M 26 28 Q 28 30, 29 34", "M 26 28 Q 28 32, 30 36"] }}
            transition={{ duration: 1.7, repeat: Infinity }}
          />
        </svg>
      </motion.div>
    );
  }
  
  // Stage 6: 해파리 성체 (Adult Moon Jellyfish)
  if (stage === 6) {
    return (
      <motion.div
        className={`relative cursor-pointer ${className}`}
        style={{ width: dimensions.w, height: dimensions.h }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        {/* Subtle glow for year-end */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background: "radial-gradient(circle, rgba(212, 237, 228, 0.5) 0%, transparent 70%)",
            transform: "scale(1.5)",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <svg
          width={dimensions.w}
          height={dimensions.h}
          viewBox="0 0 48 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bell body */}
          <ellipse cx="24" cy="20" rx="18" ry="20" fill="#D4EDE4" opacity="0.7" />
          <ellipse cx="24" cy="18" rx="16" ry="18" fill="#E8F5F0" opacity="0.85" />
          
          {/* Highlight */}
          <ellipse cx="20" cy="15" rx="7" ry="9" fill="white" opacity="0.7" />
          
          {/* Four-leaf clover pattern (gonads) */}
          <g opacity="0.5">
            <circle cx="20" cy="18" r="3" fill="#C8E6D7" />
            <circle cx="28" cy="18" r="3" fill="#C8E6D7" />
            <circle cx="20" cy="24" r="3" fill="#C8E6D7" />
            <circle cx="28" cy="24" r="3" fill="#C8E6D7" />
          </g>
          
          {/* Eyes */}
          <circle cx="19" cy="20" r="2" fill="#2B2523" opacity="0.4" />
          <circle cx="29" cy="20" r="2" fill="#2B2523" opacity="0.4" />
          
          {/* Tentacles */}
          <motion.path
            d="M 16 35 Q 14 42, 12 50"
            stroke="#D4EDE4"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
            animate={{ d: ["M 16 35 Q 14 42, 12 50", "M 16 35 Q 14 40, 14 48", "M 16 35 Q 14 42, 12 50"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M 22 36 Q 22 44, 20 52"
            stroke="#D4EDE4"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
            animate={{ d: ["M 22 36 Q 22 44, 20 52", "M 22 36 Q 22 42, 22 50", "M 22 36 Q 22 44, 20 52"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M 26 36 Q 26 44, 28 52"
            stroke="#D4EDE4"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
            animate={{ d: ["M 26 36 Q 26 44, 28 52", "M 26 36 Q 26 42, 26 50", "M 26 36 Q 26 44, 28 52"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M 32 35 Q 34 42, 36 50"
            stroke="#D4EDE4"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
            animate={{ d: ["M 32 35 Q 34 42, 36 50", "M 32 35 Q 34 40, 34 48", "M 32 35 Q 34 42, 36 50"] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    );
  }
  
  return null;
}