import { useState } from 'react';
import { 
  Mail, Globe, ArrowUp, Shield, 
  FileText, ExternalLink, Smartphone, Cpu, Linkedin
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/context/LanguageContext';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export function Footer({ onOpenPrivacy, onOpenTerms }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { direction, t } = useLanguage();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: t('nav.home'), id: 'hero' },
    { label: t('nav.translate'), id: 'translation-section' },
    { label: t('nav.features'), id: 'features' },
  ];

  const resources = [
    { label: t('footer.privacy'), onClick: onOpenPrivacy },
    { label: t('footer.terms'), onClick: onOpenTerms },
    { label: t('footer.quickLinks'), href: '#' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="relative pt-12 sm:pt-20 pb-6 sm:pb-8 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12 mb-10 sm:mb-16">
          {/* Brand Column - Large Text Logo */}
          <div className="col-span-2 lg:col-span-1">
            <div 
              className="mb-4 cursor-pointer group" 
              onClick={() => window.location.reload()}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-red-400 transition-colors">
                MED <span className="text-red-400">TRANSLATE</span>
              </h2>
            </div>
            
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4" style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}>
              {t('footer.tagline')}
            </p>

            {/* Intellectual Property Rights */}
            <p className="text-white/40 text-[10px] sm:text-xs mb-4" style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}>
              {direction === 'rtl' 
                ? 'جميع الحقوق محفوظة - الملكية الفكرية'
                : 'All Rights Reserved - Intellectual Property Rights'}
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2">
              <div className="px-2 py-1 glass-panel rounded-full text-[10px] sm:text-xs text-red-400 flex items-center gap-1 hover:border-red-500/30 transition-colors">
                <Cpu className="w-3 h-3" />
                {t('footer.badge.ai')}
              </div>
              <div className="px-2 py-1 glass-panel rounded-full text-[10px] sm:text-xs text-green-400 flex items-center gap-1 hover:border-green-500/30 transition-colors">
                <Smartphone className="w-3 h-3" />
                {t('footer.badge.onDevice')}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-6 flex items-center gap-2 text-sm sm:text-base" style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
              <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/60 hover:text-red-400 transition-all duration-300 text-xs sm:text-sm flex items-center gap-2 hover:translate-x-1"
                    style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}
                  >
                    <ExternalLink className="w-3 h-3" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-6 flex items-center gap-2 text-sm sm:text-base" style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
              {t('footer.resources')}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  {resource.onClick ? (
                    <button
                      onClick={resource.onClick}
                      className="text-white/60 hover:text-red-400 transition-all duration-300 text-xs sm:text-sm flex items-center gap-2 hover:translate-x-1"
                      style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}
                    >
                      <Shield className="w-3 h-3" />
                      {resource.label}
                    </button>
                  ) : (
                    <a
                      href={resource.href}
                      className="text-white/60 hover:text-red-400 transition-all duration-300 text-xs sm:text-sm flex items-center gap-2 hover:translate-x-1"
                      style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}
                    >
                      <ExternalLink className="w-3 h-3" />
                      {resource.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-white font-semibold mb-3 sm:mb-6 flex items-center gap-2 text-sm sm:text-base" style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
              {t('footer.stayUpdated')}
            </h3>
            <p className="text-white/60 text-xs sm:text-sm mb-3 sm:mb-4" style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}>
              {t('footer.newsletter.desc')}
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-2 sm:space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder') as string}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs sm:text-sm placeholder:text-white/40 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all"
                  style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs sm:text-sm font-semibold rounded-xl hover:from-red-400 hover:to-red-500 transition-all hover:scale-[1.02]"
              >
                {subscribed ? t('footer.newsletter.success') : t('footer.newsletter.button')}
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="glass-card p-3 sm:p-6 mb-6 sm:mb-8 hover:border-red-500/20 transition-colors">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4" style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
              </div>
              <div className={`${direction === 'rtl' ? 'text-right' : 'text-left'} min-w-0`}>
                <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-wider">{t('footer.email')}</p>
                <a href="mailto:amrk08642@gmail.com" className="text-white text-xs sm:text-sm hover:text-red-400 transition-colors truncate block">
                  amrk08642@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4" style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </div>
              <div className={`${direction === 'rtl' ? 'text-right' : 'text-left'} min-w-0`}>
                <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-wider">LinkedIn</p>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white text-xs sm:text-sm hover:text-blue-400 transition-colors truncate block">
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-white/10">
          <div className="text-center sm:text-left">
            <p className="text-white/40 text-xs sm:text-sm">
              {t('footer.copyright')}
            </p>
            {/* Designer Credit */}
            <p className="text-white/30 text-[10px] sm:text-xs mt-1">
              {direction === 'rtl' 
                ? 'تصميم: عمرو خالد محمد عبدالقادر'
                : 'Designed by Amr Khaled Mohamed Abdelkader'}
            </p>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={onOpenPrivacy}
              className="text-white/40 hover:text-white text-xs sm:text-sm transition-colors hover:underline"
            >
              {t('footer.privacy')}
            </button>
            <button 
              onClick={onOpenTerms}
              className="text-white/40 hover:text-white text-xs sm:text-sm transition-colors hover:underline"
            >
              {t('footer.terms')}
            </button>
            <button 
              onClick={scrollToTop}
              className="w-8 h-8 sm:w-10 sm:h-10 glass-panel rounded-lg flex items-center justify-center text-white/50 hover:text-red-400 hover:border-red-500/30 transition-all hover:scale-110"
            >
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Privacy Modal Content
export function PrivacyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { direction, t } = useLanguage();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel-strong border-white/10 max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3" style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
            {t('privacy.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 sm:space-y-6 text-white/70 text-xs sm:text-sm leading-relaxed" style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}>
          <section>
            <h3 className="text-white font-semibold text-sm sm:text-lg mb-2">{t('privacy.section1.title')}</h3>
            <p>
              {t('privacy.section1.content')}
            </p>
          </section>
          
          <section>
            <h3 className="text-white font-semibold text-sm sm:text-lg mb-2">{t('privacy.section2.title')}</h3>
            <p>
              {t('privacy.section2.content')}
            </p>
          </section>
          
          <section>
            <h3 className="text-white font-semibold text-sm sm:text-lg mb-2">{t('privacy.section3.title')}</h3>
            <p>
              {t('privacy.section3.content')}
            </p>
          </section>
          
          <section>
            <h3 className="text-white font-semibold text-sm sm:text-lg mb-2">{t('privacy.section4.title')}</h3>
            <p>
              {t('privacy.section4.content')}{' '}
              <a href="mailto:amrk08642@gmail.com" className="text-red-400 hover:underline">amrk08642@gmail.com</a>
            </p>
          </section>

          {/* Designer Credit in Privacy */}
          <section className="pt-4 border-t border-white/10">
            <p className="text-white/50 text-xs">
              {direction === 'rtl' 
                ? 'تصميم: عمرو خالد محمد عبدالقادر'
                : 'Designed by Amr Khaled Mohamed Abdelkader'}
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Terms Modal Content
export function TermsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { direction, t } = useLanguage();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel-strong border-white/10 max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3" style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
            {t('terms.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 sm:space-y-6 text-white/70 text-xs sm:text-sm leading-relaxed" style={{ textAlign: direction === 'rtl' ? 'right' : 'left' }}>
          <section>
            <h3 className="text-white font-semibold text-sm sm:text-lg mb-2">{t('terms.section1.title')}</h3>
            <p>
              {t('terms.section1.content')}
            </p>
          </section>
          
          <section>
            <h3 className="text-white font-semibold text-sm sm:text-lg mb-2">{t('terms.section2.title')}</h3>
            <p>
              {t('terms.section2.content')}
            </p>
          </section>
          
          <section>
            <h3 className="text-white font-semibold text-sm sm:text-lg mb-2">{t('terms.section3.title')}</h3>
            <p>
              {t('terms.section3.content')}
            </p>
          </section>
          
          <section>
            <h3 className="text-white font-semibold text-sm sm:text-lg mb-2">{t('terms.section4.title')}</h3>
            <p>
              {t('terms.section4.content')}{' '}
              <a href="mailto:amrk08642@gmail.com" className="text-red-400 hover:underline">amrk08642@gmail.com</a>
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
