import { useState, useEffect, useRef, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, FileText, Sparkles, Shield } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AdOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  fileName: string;
  sourceLang: string;
  targetLang: string;
}

export function AdOverlay({ isOpen, onClose, onComplete, fileName, sourceLang, targetLang }: AdOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { direction } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setShowWarning(false);
      setIsComplete(false);
      
      // Start progress animation
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            setTimeout(() => setIsComplete(true), 300);
            return 100;
          }
          return prev + 0.4;
        });
      }, 40);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isOpen]);

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  const handleCloseClick = useCallback(() => {
    if (progress < 100) {
      setShowWarning(true);
    } else {
      onClose();
    }
  }, [progress, onClose]);

  const handleConfirmClose = useCallback(() => {
    setShowWarning(false);
    onClose();
  }, [onClose]);

  const handleCancelClose = useCallback(() => {
    setShowWarning(false);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Warning Modal */}
      {showWarning && (
        <div className="absolute inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-md futuristic-card rounded-3xl p-8 animate-scale-in corner-accent">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-3xl" />
            
            <div className="relative flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mb-6 neon-glow-red">
                <AlertTriangle className="w-10 h-10 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {direction === 'rtl' ? 'هل أنت متأكد؟' : 'Are you sure?'}
              </h3>
              <p className="text-white/60 mb-8 max-w-xs">
                {direction === 'rtl' 
                  ? 'إذا أغلقت الآن، لن يتم إكمال ترجمة ملفك. هل تريد المتابعة؟'
                  : 'If you close now, your translation will not complete. Do you want to continue?'}
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleCancelClose}
                  className="flex-1 py-3.5 glass-futuristic text-white rounded-xl hover:bg-white/10 transition-all font-medium"
                >
                  {direction === 'rtl' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  onClick={handleConfirmClose}
                  className="flex-1 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-400 hover:to-red-500 transition-all font-medium shadow-lg shadow-red-500/25"
                >
                  {direction === 'rtl' ? 'نعم، أغلق' : 'Yes, Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Overlay */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl flex flex-col animate-fade-in">
        {/* === PROGRESS BANNER AT TOP === */}
        <div className="relative z-20 bg-gradient-to-b from-black/80 to-transparent">
          {/* Progress bar */}
          <div className="h-1.5 bg-white/10">
            <div 
              className="h-full progress-shimmer progress-smooth relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-400 rounded-full blur-md" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
            </div>
          </div>

          {/* Progress Info Bar */}
          <div className="flex items-center justify-between px-4 sm:px-8 py-4">
            <div className="flex items-center gap-4" style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/30 rounded-xl blur-lg" />
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center border border-red-500/30">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                </div>
              </div>
              <div className={direction === 'rtl' ? 'text-right' : 'text-left'}>
                <p className="text-white font-medium text-sm sm:text-base truncate max-w-[150px] sm:max-w-[250px]">{fileName}</p>
                <div className="flex items-center gap-2 text-xs text-white/50" style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
                  <span>{sourceLang}</span>
                  <span className="text-red-400">→</span>
                  <span className="text-green-400">{targetLang}</span>
                </div>
              </div>
            </div>

            {/* Progress Status */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs text-white/40 uppercase tracking-wider">
                  {isComplete 
                    ? (direction === 'rtl' ? 'اكتملت الترجمة' : 'Translation Complete') 
                    : (direction === 'rtl' ? 'جاري الترجمة' : 'Translating...')}
                </span>
                <span className={`text-2xl font-bold ${isComplete ? 'text-green-400' : 'text-red-400'}`}>
                  {Math.round(progress)}%
                </span>
              </div>
              <button 
                onClick={handleCloseClick}
                className="p-2.5 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Translation Steps */}
          <div className="px-4 sm:px-8 pb-4">
            <div className="flex items-center justify-center gap-2 sm:gap-6">
              {[
                { label: direction === 'rtl' ? 'تحليل' : 'Analyzing', threshold: 20 },
                { label: direction === 'rtl' ? 'ترجمة' : 'Translating', threshold: 50 },
                { label: direction === 'rtl' ? 'تنسيق' : 'Formatting', threshold: 80 },
                { label: direction === 'rtl' ? 'اكتمال' : 'Complete', threshold: 100 },
              ].map((step, index) => {
                const isActive = progress >= step.threshold;
                const isCurrent = progress < step.threshold && (index === 0 || progress >= [
                  0, 20, 50, 80
                ][index - 1]);
                
                return (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-green-500/20 text-green-400' 
                        : isCurrent 
                          ? 'bg-red-500/20 text-red-400 animate-pulse'
                          : 'bg-white/5 text-white/30'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        isActive ? 'bg-green-400' : isCurrent ? 'bg-red-400 animate-pulse' : 'bg-white/30'
                      }`} />
                      <span className="text-xs font-medium hidden sm:inline">{step.label}</span>
                    </div>
                    {index < 3 && (
                      <div className={`w-4 sm:w-8 h-px transition-all duration-300 ${
                        progress >= [20, 50, 80][index] ? 'bg-green-500/50' : 'bg-white/10'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* === LARGE ADVERTISING SPACE - CENTERED & ENLARGED === */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {!isComplete ? (
            /* Ad Playing State - Larger & Centered */
            <div className="relative w-full max-w-5xl flex flex-col items-center justify-center">
              {/* Ad Container - Enlarged */}
              <div className="relative w-full aspect-video max-h-[60vh] min-h-[400px] futuristic-card rounded-3xl overflow-hidden corner-accent shadow-2xl shadow-red-500/10">
                {/* Ad placeholder - in real app, this would be the actual ad */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex flex-col items-center justify-center">
                  {/* Animated ad content */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse" />
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-red-500/30 border-t-red-500 animate-spin" />
                  </div>
                  
                  <div className="mt-8 text-center">
                    <p className="text-white/60 text-lg sm:text-xl mb-2">
                      {direction === 'rtl' ? 'جاري عرض الإعلان...' : 'Advertisement Playing...'}
                    </p>
                    <p className="text-white/40 text-sm">
                      {direction === 'rtl' 
                        ? 'شكراً لدعمك الترجمة المجانية'
                        : 'Thank you for supporting free translation'}
                    </p>
                  </div>

                  {/* Progress overlay at bottom of ad */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Supporting text */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 glass-futuristic rounded-full">
                  <Sparkles className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-white/60">
                    {direction === 'rtl' 
                      ? 'الترجمة تتم أثناء عرض الإعلان'
                      : 'Translation happens while ad plays'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Translation Complete State */
            <div className="flex flex-col items-center animate-scale-in">
              {/* Success animation */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-green-500/30 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border-2 border-green-500/50 neon-glow-green">
                  <div className="absolute inset-0 rounded-full border-2 border-green-400/30 animate-[airdrop-pulse-ring_1.5s_ease-out_infinite]" />
                  <CheckCircle className="w-14 h-14 sm:w-18 sm:h-18 text-green-400" />
                </div>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">
                {direction === 'rtl' ? 'اكتملت الترجمة!' : 'Translation Complete!'}
              </h3>
              <p className="text-white/50 text-sm sm:text-base mb-8 text-center max-w-md">
                {direction === 'rtl' 
                  ? 'تمت ترجمة مستندك بنجاح. اضغط أدناه لعرض النتيجة!'
                  : 'Your document has been translated. Click below to view!'}
              </p>

              <button
                onClick={handleComplete}
                className="group relative px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-2xl overflow-hidden transition-all hover:scale-105 shadow-xl shadow-green-500/25"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  {direction === 'rtl' ? 'عرض النتيجة' : 'View Result'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom status bar */}
        <div className="relative z-20 px-4 sm:px-8 py-4 border-t border-white/5 bg-black/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isComplete ? 'bg-green-400' : 'bg-red-400 animate-pulse'}`} />
                <span className="text-xs text-white/40">
                  {isComplete 
                    ? (direction === 'rtl' ? 'مكتمل' : 'Complete')
                    : (direction === 'rtl' ? 'قيد التقدم' : 'In Progress')}
                </span>
              </div>
            </div>
            <div className="text-xs text-white/30 flex items-center gap-2">
              <Shield className="w-3 h-3" />
              MED TRANSLATE AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
