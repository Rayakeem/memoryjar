import { motion } from "motion/react";
import { ArrowLeft, User, Calendar, Bell, Shield, CircleHelp, LogOut } from "lucide-react";

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const menuItems = [
    {
      icon: User,
      label: "계정 정보",
      value: "user@example.com",
    },
    {
      icon: Calendar,
      label: "병 연도",
      value: "2026년",
    },
    {
      icon: Bell,
      label: "연말 알림",
      value: "켜짐",
    },
    {
      icon: Shield,
      label: "개인정보 처리방침",
    },
    {
      icon: CircleHelp,
      label: "도움말 & FAQ",
    },
  ];
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center px-6 py-4 gap-4">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg">설정</h2>
      </div>
      
      {/* Menu items */}
      <div className="flex-1 px-6 py-8">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-secondary/40 transition-colors text-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span>{item.label}</span>
                </div>
                {item.value && (
                  <span className="text-sm text-muted-foreground">
                    {item.value}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
        
        {/* Logout button */}
        <motion.button
          className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-destructive/10 text-destructive mt-8 hover:bg-destructive/20 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <LogOut className="w-5 h-5" />
          <span>로그아웃</span>
        </motion.button>
      </div>
      
      {/* Footer info */}
      <div className="px-6 pb-8 text-center">
        <p className="text-xs text-muted-foreground/60">
          Memory Jar v1.0.0
        </p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          기록은 안전하게 보관됩니다
        </p>
      </div>
    </div>
  );
}