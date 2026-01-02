import { motion } from "motion/react";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface BookOrderProps {
  onBack: () => void;
  onComplete: () => void;
}

export function BookOrder({ onBack, onComplete }: BookOrderProps) {
  const [step, setStep] = useState<'select' | 'checkout' | 'complete'>('select');
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium'>('basic');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  
  if (step === 'select') {
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
          <h2 className="text-lg">올해의 해피저금 미니북</h2>
        </div>
        
        {/* Content */}
        <div className="flex-1 px-6 py-8 space-y-8">
          {/* Book preview */}
          <div className="bg-gradient-to-br from-secondary/40 to-accent/20 rounded-3xl p-8 flex items-center justify-center">
            <div className="w-48 h-64 bg-card rounded-lg shadow-2xl border border-border/50 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="text-4xl">📖</div>
                <p className="text-sm text-muted-foreground">2026년의</p>
                <p className="text-sm">해피저금</p>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            기록이 책 한 권으로 만들어져 배송돼요.
          </p>
          
          {/* Plans */}
          <div className="space-y-3">
            <button
              onClick={() => setSelectedPlan('basic')}
              className={`w-full p-6 rounded-2xl border-2 transition-all ${
                selectedPlan === 'basic'
                  ? 'border-primary bg-accent/20'
                  : 'border-border bg-card hover:bg-secondary/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="text-left">
                  <h3 className="mb-1">Basic (소프트커버)</h3>
                  <p className="text-sm text-muted-foreground">
                    깔끔한 무선 제본
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl">19,900원</div>
                </div>
              </div>
              {selectedPlan === 'basic' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              )}
            </button>
            
            <button
              onClick={() => setSelectedPlan('premium')}
              className={`w-full p-6 rounded-2xl border-2 transition-all relative ${
                selectedPlan === 'premium'
                  ? 'border-primary bg-accent/20'
                  : 'border-border bg-card hover:bg-secondary/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="text-left">
                  <h3 className="mb-1">Premium (하드커버)</h3>
                  <p className="text-sm text-muted-foreground">
                    고급스러운 양장 제본
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl">29,900원</div>
                </div>
              </div>
              {selectedPlan === 'premium' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              )}
            </button>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="px-6 pb-8">
          <motion.button
            className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-2xl transition-all hover:scale-105"
            onClick={() => setStep('checkout')}
            whileTap={{ scale: 0.95 }}
          >
            주문하기
          </motion.button>
        </div>
      </div>
    );
  }
  
  if (step === 'checkout') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="flex items-center px-6 py-4 gap-4">
          <button
            onClick={() => setStep('select')}
            className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg">배송 정보</h2>
        </div>
        
        {/* Form */}
        <div className="flex-1 px-6 py-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">이름</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="홍길동"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">연락처</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="010-0000-0000"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">배송 주소</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-accent outline-none transition-colors resize-none"
              rows={3}
              placeholder="서울시 강남구..."
            />
          </div>
          
          {/* Summary */}
          <div className="bg-secondary/40 rounded-2xl p-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">상품</span>
              <span>
                {selectedPlan === 'basic' ? 'Basic' : 'Premium'} 미니북
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">금액</span>
              <span className="text-lg">
                {selectedPlan === 'basic' ? '19,900' : '29,900'}원
              </span>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground/70 text-center">
            주문 후 제작 기간은 약 2-3주 소요됩니다.
          </p>
        </div>
        
        {/* Bottom CTA */}
        <div className="px-6 pb-8">
          <motion.button
            className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-2xl transition-all hover:scale-105"
            onClick={() => setStep('complete')}
            whileTap={{ scale: 0.95 }}
          >
            결제하기
          </motion.button>
        </div>
      </div>
    );
  }
  
  // Complete
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 max-w-sm"
      >
        <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto">
          <Check className="w-10 h-10 text-accent-foreground" />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-2xl">주문이 완료됐어요.</h1>
          <p className="text-muted-foreground">
            준비되는 대로 배송 소식을 알려드릴게요.
          </p>
        </div>
        
        <motion.button
          className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-2xl transition-all hover:scale-105"
          onClick={onComplete}
          whileTap={{ scale: 0.95 }}
        >
          홈으로
        </motion.button>
      </motion.div>
    </div>
  );
}
