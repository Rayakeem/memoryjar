import { motion } from "motion/react";

interface JarProps {
  noteCount?: number;
  className?: string;
}

export function Jar({ noteCount = 0, className = "" }: JarProps) {
  const notes = Array.from({ length: Math.min(noteCount, 12) }, (_, i) => i);
  
  return (
    <div className={`relative ${className}`}>
      <svg
        width="280"
        height="320"
        viewBox="0 0 280 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Jar body */}
        <defs>
          <linearGradient id="jarGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'rgba(255, 255, 255, 0.5)', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: 'rgba(255, 255, 255, 0.3)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgba(255, 255, 255, 0.4)', stopOpacity: 1 }} />
          </linearGradient>
          
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main jar body */}
        <path
          d="M 80 80 L 80 240 Q 80 280, 120 290 L 160 290 Q 200 280, 200 240 L 200 80 Z"
          fill="url(#jarGlass)"
          stroke="#E8E3DC"
          strokeWidth="2"
          opacity="0.9"
        />
        
        {/* Jar neck */}
        <rect
          x="100"
          y="40"
          width="80"
          height="45"
          rx="4"
          fill="url(#jarGlass)"
          stroke="#E8E3DC"
          strokeWidth="2"
          opacity="0.9"
        />
        
        {/* Lid */}
        <rect
          x="95"
          y="30"
          width="90"
          height="15"
          rx="3"
          fill="#D4D0CA"
          stroke="#B8B4AE"
          strokeWidth="1.5"
        />
        
        {/* Lid top detail */}
        <ellipse
          cx="140"
          cy="30"
          rx="35"
          ry="8"
          fill="#E8E3DC"
          opacity="0.6"
        />
        
        {/* Glass highlights */}
        <ellipse
          cx="110"
          cy="120"
          rx="20"
          ry="40"
          fill="white"
          opacity="0.25"
        />
        <ellipse
          cx="175"
          cy="160"
          rx="12"
          ry="25"
          fill="white"
          opacity="0.15"
        />
        
        {/* Folded paper notes inside jar */}
        {notes.map((i) => {
          const positions = [
            { x: 110, y: 240, rotate: -15 },
            { x: 145, y: 250, rotate: 20 },
            { x: 125, y: 230, rotate: 5 },
            { x: 160, y: 235, rotate: -25 },
            { x: 135, y: 215, rotate: 15 },
            { x: 115, y: 210, rotate: -10 },
            { x: 155, y: 220, rotate: 30 },
            { x: 125, y: 200, rotate: -5 },
            { x: 145, y: 205, rotate: 18 },
            { x: 130, y: 190, rotate: -20 },
            { x: 150, y: 195, rotate: 12 },
            { x: 120, y: 185, rotate: -8 },
          ];
          
          const pos = positions[i] || positions[0];
          
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              {/* Folded paper note */}
              <rect
                x={pos.x - 12}
                y={pos.y - 8}
                width="24"
                height="16"
                rx="2"
                fill="#FFFEF9"
                stroke="#E8E3DC"
                strokeWidth="1"
                transform={`rotate(${pos.rotate}, ${pos.x}, ${pos.y})`}
                opacity="0.95"
              />
              {/* Fold line */}
              <line
                x1={pos.x - 12}
                y1={pos.y}
                x2={pos.x + 12}
                y2={pos.y}
                stroke="#D4D0CA"
                strokeWidth="0.5"
                transform={`rotate(${pos.rotate}, ${pos.x}, ${pos.y})`}
                opacity="0.6"
              />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
