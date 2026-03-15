import { useEffect, useRef } from 'react';
import { 
  Smartphone, Shield, Lock, Cpu, 
  Eye, Clock, Sparkles, Play, Gift, FileText, 
  Heart, BookOpen 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, gradient }) => {
  const { direction } = useLanguage();
  
  return (
    <div className="group relative glass-card p-4 sm:p-6 hover:border-red-500/30 transition-all duration-500 overflow-hidden hover:scale-[1.02] hover-lift">
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      {/* Icon */}
      <div className="relative mb-3">
        <div className="absolute inset-0 bg-red-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center border border-red-500/30 group-hover:scale-110 group-hover:border-red-500/50 transition-all duration-300">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
        </div>
      </div>
      
      {/* Content */}
      <h3 className="text-sm sm:text-lg font-bold text-white mb-1.5 sm:mb-2 group-hover:text-red-400 transition-colors duration-300" style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}>
        {title}
      </h3>
      <p className="text-white/60 text-xs sm:text-sm leading-relaxed" style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}>
        {description}
      </p>
    </div>
  );
};

export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { direction, t } = useLanguage();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const howItWorks = [
    {
      step: 1,
      icon: FileText,
      title: t('features.step1.title'),
      desc: t('features.step1.desc'),
    },
    {
      step: 2,
      icon: Play,
      title: t('features.step2.title'),
      desc: t('features.step2.desc'),
    },
    {
      step: 3,
      icon: Cpu,
      title: t('features.step3.title'),
      desc: t('features.step3.desc'),
    },
    {
      step: 4,
      icon: Gift,
      title: t('features.step4.title'),
      desc: t('features.step4.desc'),
    },
  ];

  const features: FeatureCardProps[] = [
    {
      icon: Smartphone,
      title: t('features.onDevice.title') as string,
      description: t('features.onDevice.desc') as string,
      gradient: 'from-red-500 to-red-600',
    },
    {
      icon: Shield,
      title: t('features.privacy.title') as string,
      description: t('features.privacy.desc') as string,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: BookOpen,
      title: direction === 'rtl' ? 'ترجمة طبية مع شروحات' : 'Medical Translation with Explanations',
      description: direction === 'rtl' 
        ? 'شروحات مفصلة للمصطلحات الطبية العربية المعقدة'
        : 'Detailed explanations for complex Arabic medical terms',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Lock,
      title: t('features.zeroData.title') as string,
      description: t('features.zeroData.desc') as string,
      gradient: 'from-red-500 to-rose-500',
    },
    {
      icon: Cpu,
      title: t('features.fineTuned.title') as string,
      description: t('features.fineTuned.desc') as string,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Heart,
      title: direction === 'rtl' ? 'مدعوم من منظمة الصحة العالمية' : 'Supported by WHO',
      description: direction === 'rtl'
        ? 'هذه الترجمة مدعومة من منظمة الصحة العالمية'
        : 'This translation is supported by the World Health Organization',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Eye,
      title: t('features.ocr.title') as string,
      description: t('features.ocr.desc') as string,
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Clock,
      title: t('features.alwaysOn.title') as string,
      description: t('features.alwaysOn.desc') as string,
      gradient: 'from-orange-500 to-amber-500',
    },
  ];

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="relative py-16 sm:py-24 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px] -translate-y-1/2 animate-pulse" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-red-600/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* How It Works Section */}
        <div className="mb-12 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <div className="reveal opacity-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-red-500/30 mb-4 sm:mb-6 hover:border-red-500/50 transition-colors">
              <Play className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
              <span className="text-xs sm:text-sm text-red-400 font-medium">{t('features.howItWorks.badge')}</span>
            </div>
            
            <h2 className="reveal opacity-0 text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              {t('features.howItWorks.title').toString().split('4')[0]}
              <span className="text-gradient">4{t('features.howItWorks.title').toString().split('4')[1]}</span>
            </h2>
          </div>

          <div className="reveal opacity-0 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative group">
                <div className="glass-card p-3 sm:p-6 text-center h-full hover:border-red-500/30 transition-all duration-300 hover:scale-[1.02]">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm sm:text-base">{item.step}</span>
                  </div>
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-red-400 mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold text-xs sm:text-base mb-1">{item.title}</h3>
                  <p className="text-white/50 text-[10px] sm:text-sm">{item.desc}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-red-500/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="reveal opacity-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-red-500/30 mb-4 sm:mb-6 hover:border-red-500/50 transition-colors">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
            <span className="text-xs sm:text-sm text-red-400 font-medium">{t('features.whyChoose.badge')}</span>
          </div>
          
          <h2 className="reveal opacity-0 text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            {t('features.whyChoose.title').toString().split('&')[0]}
            <span className="text-gradient">&{t('features.whyChoose.title').toString().split('&')[1]}</span>
          </h2>
          
          <p className="reveal opacity-0 text-white/60 max-w-xl mx-auto text-sm sm:text-base">
            {t('features.whyChoose.subtitle')}
          </p>
        </div>

        {/* Features Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`reveal opacity-0`}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>

        {/* Best Quality Banner */}
        <div className="reveal opacity-0 mt-8 sm:mt-12 glass-card p-4 sm:p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:scale-[1.01]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4" style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
              </div>
              <div className={direction === 'rtl' ? 'text-right' : 'text-left'}>
                <h3 className="text-white font-semibold text-sm sm:text-base">
                  {direction === 'rtl' 
                    ? 'أفضل جودة ترجمة طبية' 
                    : 'Best Quality Medical Translation'}
                </h3>
                <p className="text-white/50 text-xs sm:text-sm">
                  {direction === 'rtl'
                    ? 'بين العربية والإنجليزية'
                    : 'Between Arabic and English'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => document.getElementById('translation-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary whitespace-nowrap text-sm hover:scale-105 transition-transform"
            >
              {t('features.comingSoon.cta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
