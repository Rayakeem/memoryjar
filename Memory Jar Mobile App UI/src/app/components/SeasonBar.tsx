import { motion } from "motion/react";
import { Leaf, Sun, Wind, Snowflake } from "lucide-react";

interface SeasonBarProps {
  progress: number; // 0-100
  className?: string;
}

export function SeasonBar({ progress, className = "" }: SeasonBarProps) {
  const seasons = [
    { name: "봄", icon: Leaf, color: "#E8F5E9", range: [0, 25] },
    { name: "여름", icon: Sun, color: "#FFF9C4", range: [25, 50] },
    { name: "가을", icon: Wind, color: "#FFE0B2", range: [50, 75] },
    { name: "겨울", icon: Snowflake, color: "#E3F2FD", range: [75, 100] },
  ];
  
  return (
    <div className={`w-full ${className}`}>
      <div className="relative h-12 bg-secondary/40 rounded-full overflow-hidden backdrop-blur-sm">
        {/* Progress fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(to right, #E8F5E9 0%, #FFF9C4 33%, #FFE0B2 66%, #E3F2FD 100%)`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        {/* Season markers */}
        <div className="relative h-full flex items-center justify-between px-4">
          {seasons.map((season, index) => {
            const Icon = season.icon;
            const isActive = progress >= season.range[0];
            const isPast = progress > season.range[1];
            
            return (
              <div
                key={season.name}
                className="flex flex-col items-center gap-1 z-10"
              >
                <motion.div
                  className={`p-1.5 rounded-full transition-all ${
                    isActive ? 'bg-white shadow-sm' : 'bg-transparent'
                  }`}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{
                    scale: isActive ? 1 : 0.8,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isPast ? 'text-muted-foreground/60' : 'text-foreground/80'
                    }`}
                  />
                </motion.div>
                <span className="text-[10px] text-muted-foreground/70">
                  {season.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Fixed message below season bar */}
      <motion.p
        className="text-xs text-muted-foreground/70 text-center mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        올해의 흐름을 같이 지나가요.
      </motion.p>
    </div>
  );
}