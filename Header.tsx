import { useState } from 'react';
import { Menu, X, Mail, Linkedin, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { direction, t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: t('nav.home'), id: 'hero' },
    { label: t('nav.translate'), id: 'translation-section' },
    { label: t('nav.features'), id: 'features' },
    { label: t('nav.contact'), id: 'footer' },
  ];

  return (
    <header className="relative z-10">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-3">
        <div className="relative glass-futuristic rounded-2xl sm:rounded-3xl overflow-hidden">
          {/* Top glowing line */}
          <div className="absolute top-0 left-4 right-4 sm:left-6 sm:right-6 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
          
          <div className="relative px-3 sm:px-5 py-3 flex items-center justify-between">
            {/* Logo Only - Enlarged */}
            <div 
              onClick={() => window.location.reload()}
              className="flex items-center cursor-pointer group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/30 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <img 
                  src="/Logo.png" 
                  alt="MED TRANSLATE" 
                  className="relative h-10 sm:h-14 w-auto transition-all duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="relative px-3 lg:px-4 py-2 text-xs lg:text-sm text-white/70 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/5 group overflow-hidden"
                >
                  <span className="relative z-10">{link.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-300 group-hover:w-1/2" />
                </button>
              ))}
            </nav>

            {/* Contact & CTA */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              <a 
                href="mailto:amrk08642@gmail.com" 
                className="p-2 text-white/50 hover:text-red-400 transition-all duration-300 hover:scale-110 rounded-lg hover:bg-white/5"
                title="Email Us"
              >
                <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-white/50 hover:text-blue-400 transition-all duration-300 hover:scale-110 rounded-lg hover:bg-white/5"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
              <div className="w-px h-6 bg-white/10 mx-1" />
              <button 
                onClick={() => scrollToSection('translation-section')}
                className="group relative px-4 lg:px-5 py-2 lg:py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs lg:text-sm font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t('nav.getStarted')}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Bottom subtle line */}
          <div className="absolute bottom-0 left-4 right-4 sm:left-6 sm:right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden mt-2 glass-futuristic rounded-2xl overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen 
              ? 'max-h-96 opacity-100 translate-y-0' 
              : 'max-h-0 opacity-0 -translate-y-4'
          }`}
        >
          <nav className="flex flex-col gap-1 p-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 text-sm text-left flex items-center gap-3"
                style={{ textAlign: direction === 'rtl' ? 'right' : 'left', flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                {link.label}
              </button>
            ))}
          </nav>
          <div className="mx-3 mb-3 p-3 border-t border-white/10 flex gap-3">
            <a 
              href="mailto:amrk08642@gmail.com" 
              className="flex-1 flex items-center justify-center gap-2 text-white/50 hover:text-red-400 text-sm transition-colors py-2 rounded-lg hover:bg-white/5"
            >
              <Mail className="w-4 h-4" /> {t('footer.email')}
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 text-white/50 hover:text-blue-400 text-sm transition-colors py-2 rounded-lg hover:bg-white/5"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
