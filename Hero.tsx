import { useEffect, useRef } from 'react';
import { ArrowDown, Shield, Smartphone, Zap, Globe } from 'lucide-react';
import { Header } from '@/components/Header';
import { useLanguage } from '@/context/LanguageContext';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { language, direction, setLanguage, t } = useLanguage();
  
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
    
    const elements = heroRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const scrollToTranslation = () => {
    const element = document.getElementById('translation-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    { icon: Shield, label: t('hero.feature1.label') as string, desc: t('hero.feature1.desc') as string },
    { icon: Smartphone, label: t('hero.feature2.label') as string, desc: t('hero.feature2.desc') as string },
    { icon: Zap, label: t('hero.feature3.label') as string, desc: t('hero.feature3.desc') as string },
    { icon: Globe, label: t('hero.feature4.label') as string, desc: t('hero.feature4.desc') as string },
  ];

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Header - Only on homepage */}
      <div className="relative z-20">
        <Header />
      </div>

      {/* Main Hero Content */}
      <div className="flex-1 flex items-center justify-center relative pt-8 pb-12">
        {/* Animated Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 0, 0, 0.5) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255, 0, 0, 0.5) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className={`text-center lg:text-${direction === 'rtl' ? 'right' : 'left'}`}>
              {/* Language Toggle Buttons */}
              <div className="reveal opacity-0 flex items-center justify-center lg:justify-start gap-2 mb-4">
                <button
                  onClick={() => setLanguage('en')}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden ${
                    language === 'en'
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-glow'
                      : 'glass-panel text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {language === 'en' && (
                    <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 hover:opacity-100 transition-opacity" />
                  )}
                  <span className="relative z-10">{t('hero.lang.english')}</span>
                </button>
                <button
                  onClick={() => setLanguage('ar')}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden ${
                    language === 'ar'
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-glow'
                      : 'glass-panel text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {language === 'ar' && (
                    <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 hover:opacity-100 transition-opacity" />
                  )}
                  <span className="relative z-10">{t('hero.lang.arabic')}</span>
                </button>
              </div>

              {/* Badge */}
              <div className="reveal opacity-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-red-500/30 mb-4 hover:border-red-500/50 transition-colors">
                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                <span className="text-sm text-red-400 font-medium tracking-wide">
                  {t('hero.badge')}
                </span>
              </div>

              {/* Main heading */}
              <h1 className="reveal opacity-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                <span className="block">{t('hero.title.line1')}</span>
                <span className="block mt-1 sm:mt-2">
                  <span className="text-gradient">{t('hero.title.line2')}</span>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="reveal opacity-0 text-base sm:text-lg text-white/60 max-w-lg mx-auto lg:mx-0 mb-6 leading-relaxed">
                {t('hero.subtitle')}
              </p>

              {/* CTA Buttons */}
              <div className={`reveal opacity-0 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-${direction === 'rtl' ? 'end' : 'start'} gap-3 mb-8`}>
                <button 
                  onClick={scrollToTranslation}
                  className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow-lg"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2">
                    {t('hero.cta.primary')}
                    <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
                  </span>
                </button>
                
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 glass-panel text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-red-500/30"
                >
                  {t('hero.cta.secondary')}
                </button>
              </div>

              {/* Features - 2x2 grid on mobile */}
              <div className="reveal opacity-0 grid grid-cols-2 gap-2 sm:gap-3">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="glass-card p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3 group hover:border-red-500/30 transition-all duration-300 hover:scale-[1.02]"
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 transition-colors">
                      <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                    </div>
                    <div className={`text-${direction === 'rtl' ? 'right' : 'left'} min-w-0`}>
                      <div className="text-white font-medium text-xs sm:text-sm truncate">{feature.label}</div>
                      <div className="text-white/50 text-[10px] sm:text-xs truncate">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - 3D Robot Image */}
            <div className="reveal opacity-0 relative flex items-center justify-center">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full blur-[80px] animate-pulse" />
              
              {/* Image container */}
              <div className="relative group">
                <img 
                  src="/hero-robot.png" 
                  alt="AI Medical Robot" 
                  className="relative z-10 w-full max-w-[280px] sm:max-w-sm lg:max-w-md h-auto object-contain drop-shadow-[0_0_40px_rgba(255,0,0,0.3)] transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 glass-panel px-2 py-1 sm:px-3 sm:py-2 rounded-lg border border-red-500/30 animate-float">
                  <span className="text-red-400 text-[10px] sm:text-xs font-medium">{t('hero.floating.ai')}</span>
                </div>
                
                <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 glass-panel px-2 py-1 sm:px-3 sm:py-2 rounded-lg border border-green-500/30 animate-float" style={{ animationDelay: '1s' }}>
                  <span className="text-green-400 text-[10px] sm:text-xs font-medium">{t('hero.floating.private')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
