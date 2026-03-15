import { useState, useRef, useEffect } from 'react';
import { 
  Upload, FileText, ArrowRightLeft, CheckCircle, 
  RefreshCcw, XCircle, ChevronDown, FileCheck, Check, 
  Shield, Zap, Globe, ChevronLeft, ChevronRight,
  Maximize2, Eye, Sparkles, Minimize2
} from 'lucide-react';
import { LANGUAGES, type LanguageOption, TranslationStatus } from '@/types';
import { AdOverlay } from '@/components/AdOverlay';
import { translateDocument } from '@/services/geminiService';
import { useLanguage } from '@/context/LanguageContext';

// Language Selector Component
interface LanguageSelectorProps {
  label: string;
  value: LanguageOption;
  onChange: (lang: LanguageOption) => void;
  disabled?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ label, value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { direction, t } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative group w-full" ref={containerRef}>
      <label className="block text-xs text-white/40 uppercase tracking-wider mb-2 font-medium">
        {label}
      </label>
      <div className="relative">
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full glass-futuristic rounded-xl px-4 py-3 flex items-center justify-between transition-all duration-300 ${
            disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-white/10 hover:border-red-500/30 cursor-pointer'
          }`}
          disabled={disabled}
          style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}
        >
          <div className="flex items-center gap-3" style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
            <span className="text-lg">{value.flag}</span>
            <div className={direction === 'rtl' ? 'text-right' : 'text-left'}>
              <span className="text-white font-medium block">{value.name}</span>
              <span className="text-white/40 text-xs">{value.nameNative}</span>
            </div>
          </div>
          <ChevronDown className={`h-4 w-4 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto glass-futuristic rounded-xl shadow-2xl z-50 animate-fade-in-up border border-white/10">
            <div className="sticky top-0 glass-futuristic p-3 border-b border-white/10 z-10">
              <p className="text-[10px] text-white/40 uppercase tracking-widest">{t('translate.selectLang')}</p>
            </div>
            <div className="p-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onChange(lang);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center justify-between group transition-colors ${
                    lang.code === value.code 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                  style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row', textAlign: direction === 'rtl' ? 'right' : 'left' }}
                >
                  <div className="flex items-center gap-3" style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
                    <span className="text-lg">{lang.flag}</span>
                    <div>
                      <span className="block">{lang.name}</span>
                      <span className="text-xs text-white/40">{lang.nameNative}</span>
                    </div>
                  </div>
                  {lang.code === value.code && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Inline Document Viewer Component
interface InlineDocumentViewerProps {
  fileName: string;
  translatedContent: string;
  sourceLang: string;
  targetLang: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const InlineDocumentViewer: React.FC<InlineDocumentViewerProps> = ({ 
  fileName, 
  translatedContent, 
  sourceLang, 
  targetLang,
  isExpanded,
  onToggleExpand
}) => {
  const { direction } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  // Split content into pages
  const lines = translatedContent.split('\n');
  const linesPerPage = 30;
  const totalPages = Math.ceil(lines.length / linesPerPage);
  const currentLines = lines.slice((currentPage - 1) * linesPerPage, currentPage * linesPerPage);

  if (isExpanded) {
    // Fullscreen view
    return (
      <div className="fixed inset-0 z-[200] animate-fade-in bg-black/95 backdrop-blur-2xl">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 glass-futuristic border-b border-white/10">
          <div className="flex items-center gap-3" style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-400" />
            </div>
            <div className={direction === 'rtl' ? 'text-right' : 'text-left'}>
              <p className="text-white font-medium text-sm">{fileName}</p>
              <div className="flex items-center gap-2 text-xs text-white/50" style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
                <span>{sourceLang}</span>
                <span className="text-green-400">→</span>
                <span className="text-green-400">{targetLang}</span>
              </div>
            </div>
          </div>
          
          {/* Page Navigation */}
          <div className="hidden sm:flex items-center gap-2 glass-futuristic rounded-lg p-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-all disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-white/70 text-sm min-w-[60px] text-center">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-all disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={onToggleExpand}
              className="p-2.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Document Content */}
        <div 
          ref={contentRef}
          className="flex-1 bg-gradient-to-b from-gray-50 to-white overflow-auto h-[calc(100vh-80px)]"
          style={{ direction }}
        >
          <div className="min-h-full p-6 sm:p-10 lg:p-16">
            <div 
              className="max-w-4xl mx-auto space-y-4"
              style={{ 
                direction,
                textAlign: direction === 'rtl' ? 'right' : 'left',
                fontFamily: direction === 'rtl' ? "'Baloo Bhaijaan 2', sans-serif" : "'SF Pro Display', sans-serif"
              }}
            >
              {/* Page header */}
              <div className="border-b border-gray-200 pb-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{fileName}</span>
                  <span className="text-xs text-gray-400">{direction === 'rtl' ? 'صفحة' : 'Page'} {currentPage}</span>
                </div>
              </div>

              {/* Content */}
              {currentLines.map((line, index) => (
                <p key={index} className="text-gray-800 leading-relaxed text-base sm:text-lg">
                  {line || '\u00A0'}
                </p>
              ))}

              {/* Page footer */}
              <div className="border-t border-gray-200 pt-4 mt-8">
                <div className="flex items-center justify-center">
                  <span className="text-xs text-gray-400">- {currentPage} -</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Inline view - this shouldn't be rendered directly, it's handled by the parent
  return null;
};

// Main Translation Interface
export function TranslationInterface() {
  const [status, setStatus] = useState<string>(TranslationStatus.IDLE);
  const [sourceLang, setSourceLang] = useState<LanguageOption>(LANGUAGES[0]);
  const [targetLang, setTargetLang] = useState<LanguageOption>(LANGUAGES[1]);
  const [file, setFile] = useState<File | null>(null);
  const [translatedContent, setTranslatedContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showAdOverlay, setShowAdOverlay] = useState(false);
  const [showInlineDocument, setShowInlineDocument] = useState(false);
  const [isDocumentExpanded, setIsDocumentExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const inlineDocRef = useRef<HTMLDivElement>(null);
  const { direction, t } = useLanguage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const allowedExtensions = ['.pdf', '.txt', '.md', '.json', '.csv', '.doc', '.docx'];
      
      const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();
      
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please upload a valid document (PDF, TXT, MD, DOC, or CSV).");
        return;
      }
      
      setFile(selectedFile);
      setStatus(TranslationStatus.FILE_SELECTED);
      setError(null);
      setTranslatedContent('');
      setShowInlineDocument(false);
    }
  };

  const handleStartTranslation = () => {
    if (!file) {
      setError("Please upload a valid document.");
      return;
    }
    // Show ad overlay - translation happens WHILE ad plays
    setShowAdOverlay(true);
    setStatus(TranslationStatus.WATCHING_AD);
  };

  const handleAdComplete = async () => {
    setShowAdOverlay(false);
    setStatus(TranslationStatus.TRANSLATING);
    
    try {
      const result = await translateDocument(file!, targetLang.name, sourceLang.name);
      setTranslatedContent(result);
      setStatus(TranslationStatus.COMPLETED);
      
      // Scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } catch (err) {
      console.error(err);
      setError("Translation failed. Please try again.");
      setStatus(TranslationStatus.ERROR);
    }
  };

  const handleAdCancel = () => {
    setShowAdOverlay(false);
    setStatus(TranslationStatus.CANCELLED);
    setTimeout(() => {
      setStatus(TranslationStatus.FILE_SELECTED);
    }, 1000);
  };

  const reset = () => {
    setFile(null);
    setTranslatedContent('');
    setStatus(TranslationStatus.IDLE);
    setError(null);
    setShowAdOverlay(false);
    setShowInlineDocument(false);
    setIsDocumentExpanded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  const handleViewDocument = () => {
    setShowInlineDocument(true);
    // Scroll to inline document after animation
    setTimeout(() => {
      inlineDocRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <section id="translation-section" className="relative py-20">
      {/* Ad Overlay - Shows ad WHILE translating */}
      <AdOverlay
        isOpen={showAdOverlay}
        onClose={handleAdCancel}
        onComplete={handleAdComplete}
        fileName={file?.name || ''}
        sourceLang={sourceLang.name}
        targetLang={targetLang.name}
      />

      {/* Fullscreen Document Viewer */}
      {isDocumentExpanded && (
        <InlineDocumentViewer
          fileName={file?.name || ''}
          translatedContent={translatedContent}
          sourceLang={sourceLang.name}
          targetLang={targetLang.name}
          isExpanded={true}
          onToggleExpand={() => setIsDocumentExpanded(false)}
        />
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-futuristic border border-red-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-400 font-medium">{t('translate.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gradient">{t('translate.title')}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {t('translate.subtitle')}
          </p>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Shield, title: t('translate.feature1.title'), desc: t('translate.feature1.desc'), color: 'red' },
            { icon: Zap, title: t('translate.feature2.title'), desc: t('translate.feature2.desc'), color: 'green' },
            { icon: Globe, title: t('translate.feature3.title'), desc: t('translate.feature3.desc'), color: 'purple' },
          ].map((feature, index) => (
            <div 
              key={index} 
              className="glass-futuristic p-4 flex items-center gap-3 hover:border-red-500/30 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up rounded-2xl"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl bg-${feature.color}-500/10 flex items-center justify-center flex-shrink-0`}>
                <feature.icon className={`w-5 h-5 text-${feature.color}-400`} />
              </div>
              <div>
                <p className="text-white font-medium text-sm">{feature.title}</p>
                <p className="text-white/50 text-xs">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Translation Container */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-red-600/20 to-red-500/20 rounded-3xl blur-xl opacity-50 animate-pulse" />
          
          <div className="relative glass-futuristic rounded-3xl p-1 overflow-hidden">
            <div className="bg-black/40 rounded-[22px] relative min-h-[500px] flex flex-col">
              {/* Ambient glows */}
              <div className="absolute inset-0 overflow-hidden rounded-[22px] pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              <div className="p-8 md:p-12 relative z-10 flex flex-col flex-1">
                {/* Language Selectors */}
                {status !== TranslationStatus.COMPLETED && (
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 animate-fade-in-up">
                    <LanguageSelector 
                      label={t('translate.from') as string} 
                      value={sourceLang} 
                      onChange={setSourceLang} 
                      disabled={status === TranslationStatus.WATCHING_AD || status === TranslationStatus.TRANSLATING}
                    />

                    <button 
                      onClick={handleSwapLanguages}
                      disabled={status === TranslationStatus.WATCHING_AD || status === TranslationStatus.TRANSLATING}
                      className="mt-6 p-3 rounded-xl glass-futuristic hover:bg-white/10 border border-white/20 transition-all hover:rotate-180 disabled:opacity-50 disabled:cursor-not-allowed group"
                      title="Swap Languages"
                    >
                      <ArrowRightLeft className="h-5 w-5 text-red-400 group-hover:text-red-300 transition-colors" />
                    </button>

                    <LanguageSelector 
                      label={t('translate.to') as string} 
                      value={targetLang} 
                      onChange={setTargetLang} 
                      disabled={status === TranslationStatus.WATCHING_AD || status === TranslationStatus.TRANSLATING}
                    />
                  </div>
                )}

                {/* Content Area */}
                <div className="flex-1 flex flex-col justify-center">
                  {/* Upload State */}
                  {status !== TranslationStatus.COMPLETED && status !== TranslationStatus.TRANSLATING && status !== TranslationStatus.WATCHING_AD && (
                    <div 
                      className={`border-2 border-dashed rounded-2xl transition-all duration-500 flex flex-col items-center justify-center p-10 text-center cursor-pointer flex-1 min-h-[250px] hover:scale-[1.02] ${
                        file 
                          ? 'border-red-500/50 bg-red-500/5' 
                          : 'border-white/20 hover:border-red-500/30 hover:bg-white/5'
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept=".pdf,.txt,.md,.json,.csv,.doc,.docx"
                        onChange={handleFileChange}
                      />
                      
                      <div className={`relative mb-5 transition-all duration-500 ${file ? 'scale-110' : ''}`}>
                        <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-xl animate-pulse" />
                        <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center border border-red-500/30">
                          {file ? <FileCheck className="text-red-400 h-10 w-10" /> : <Upload className="text-red-400 h-10 w-10" />}
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-2">
                        {file ? file.name : t('translate.dropzone.title')}
                      </h3>
                      <p className="text-white/50 max-w-md mx-auto mb-3 text-sm">
                        {file 
                          ? t('translate.file.ready')
                          : t('translate.dropzone.subtitle')
                        }
                      </p>
                      
                      {!file && (
                        <div className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors">
                          <span>{t('translate.dropzone.browse')}</span>
                        </div>
                      )}

                      {file && (
                        <div className="flex items-center gap-2 text-sm text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span>{(file.size / 1024).toFixed(1)} KB</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Translating State */}
                  {status === TranslationStatus.TRANSLATING && (
                    <div className="flex flex-col items-center justify-center flex-1 animate-fade-in">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
                        <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center border border-red-500/30">
                          <div className="w-12 h-12 rounded-full border-4 border-red-500/30 border-t-red-500 animate-spin" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {direction === 'rtl' ? 'جاري الترجمة...' : 'Translating...'}
                      </h3>
                      <p className="text-white/50">
                        {direction === 'rtl' 
                          ? 'يعالج الذكاء الاصطناعي مستندك' 
                          : 'AI is processing your document'}
                      </p>
                    </div>
                  )}

                  {/* Cancelled State */}
                  {status === TranslationStatus.CANCELLED && (
                    <div className="flex flex-col items-center justify-center flex-1 animate-fade-in">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl" />
                        <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-500/30">
                          <XCircle className="text-yellow-400 h-10 w-10" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{t('translate.cancelled.title')}</h3>
                      <p className="text-white/50 mb-4">{t('translate.cancelled.desc')}</p>
                      <button 
                        onClick={() => setStatus(TranslationStatus.FILE_SELECTED)}
                        className="px-6 py-3 glass-futuristic rounded-xl text-white hover:bg-white/10 transition-all hover:scale-105"
                      >
                        {t('translate.cancelled.retry')}
                      </button>
                    </div>
                  )}

                  {/* Error State */}
                  {status === TranslationStatus.ERROR && (
                    <div className="text-center py-8 flex-1 flex flex-col items-center justify-center animate-fade-in">
                      <div className="relative mb-5">
                        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl" />
                        <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-red-500/20 to-rose-500/20 flex items-center justify-center border border-red-500/30">
                          <XCircle className="text-red-400 h-10 w-10" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{t('translate.error.title')}</h3>
                      <p className="text-white/50 mb-6 max-w-md text-sm">{error}</p>
                      <button 
                        onClick={reset} 
                        className="px-6 py-3 glass-futuristic rounded-xl text-white hover:bg-white/10 transition-all border border-white/20 hover:scale-105"
                      >
                        <RefreshCcw className="h-4 w-4 inline mr-2" />
                        {t('translate.error.retry')}
                      </button>
                    </div>
                  )}
                </div>

                {/* Action Button - Watch Ad & Translate */}
                {status === TranslationStatus.FILE_SELECTED && (
                  <div className="mt-6 flex justify-center animate-fade-in-up">
                    <button 
                      onClick={handleStartTranslation}
                      className="group relative px-8 py-4 bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white font-bold text-lg rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-500/25"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <Sparkles className="h-5 w-5" />
                        {direction === 'rtl' ? 'شاهد إعلان وترجم' : 'Watch Ad & Translate'}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-red-500 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </button>
                  </div>
                )}

                {/* Reset Button (when completed) */}
                {status === TranslationStatus.COMPLETED && (
                  <div className="mt-6 flex justify-center animate-fade-in-up">
                    <button 
                      onClick={reset}
                      className="px-6 py-3 glass-futuristic text-white rounded-xl hover:bg-white/10 transition-all font-medium border border-white/20 hover:scale-105"
                    >
                      <RefreshCcw className="h-4 w-4 inline mr-2" />
                      {t('translate.newFile')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Supported Formats */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <p className="w-full text-center text-white/40 text-xs mb-2">{t('translate.supported')}</p>
          {['PDF', 'TXT', 'MD', 'DOC', 'CSV'].map((format) => (
            <div 
              key={format}
              className="px-3 py-1.5 glass-futuristic rounded-lg text-xs text-white/60 flex items-center gap-2 hover:border-red-500/30 transition-all"
            >
              <FileText className="w-3 h-3 text-red-400" />
              {format}
            </div>
          ))}
        </div>

        {/* === TRANSLATION RESULT WITH INLINE EXPANSION === */}
        {status === TranslationStatus.COMPLETED && file && (
          <div ref={resultRef} className="mt-12 animate-fade-in-up">
            {/* Success Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-futuristic border border-green-500/30">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400 font-medium">{t('translate.completed.title')}</span>
              </div>
            </div>
            
            {/* Result Card - This is where the magic happens */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 rounded-3xl blur-xl opacity-50" />
              
              <div className="relative glass-futuristic rounded-3xl p-1 overflow-hidden">
                <div className="bg-black/40 rounded-[22px] p-6 sm:p-8">
                  {/* Result Header */}
                  <div className="flex items-center justify-between mb-6" style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
                    <div className="flex items-center gap-4" style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-green-400" />
                      </div>
                      <div className={direction === 'rtl' ? 'text-right' : 'text-left'}>
                        <p className="text-white font-medium">{file.name}</p>
                        <div className="flex items-center gap-2 text-sm text-white/50" style={{ flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' }}>
                          <span>{sourceLang.name}</span>
                          <span className="text-green-400">→</span>
                          <span className="text-green-400">{targetLang.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                      {t('translate.completed.ready')}
                    </div>
                  </div>

                  {/* === INLINE DOCUMENT PREVIEW === */}
                  {!showInlineDocument ? (
                    /* Preview Card - Click to expand */
                    <div 
                      className="bg-gradient-to-b from-gray-50 to-white rounded-xl p-4 sm:p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-[1.01] group relative overflow-hidden"
                      onClick={handleViewDocument}
                      style={{ direction }}
                    >
                      <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/5 transition-colors duration-300" />
                      
                      <div className="max-h-48 overflow-hidden relative">
                        <div 
                          className="text-gray-800 text-sm space-y-2"
                          style={{ 
                            textAlign: direction === 'rtl' ? 'right' : 'left',
                            fontFamily: direction === 'rtl' ? "'Baloo Bhaijaan 2', sans-serif" : "'SF Pro Display', sans-serif"
                          }}
                        >
                          {translatedContent.split('\n').slice(0, 8).map((line, index) => (
                            <p key={index}>{line || '\u00A0'}</p>
                          ))}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
                      </div>
                      
                      {/* View hint */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                          <Eye className="w-4 h-4 text-white" />
                          <span className="text-white text-sm font-medium">
                            {direction === 'rtl' ? 'انقر للعرض الكامل' : 'Click to View Full'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* === EXPANDED INLINE DOCUMENT === */
                    <div 
                      ref={inlineDocRef}
                      className="animate-[slideDown_0.5s_ease-out]"
                    >
                      {/* Document Toolbar */}
                      <div className="flex items-center justify-between mb-4 p-3 glass-futuristic rounded-xl">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/50">
                            {direction === 'rtl' ? 'معاينة المستند' : 'Document Preview'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setIsDocumentExpanded(true)}
                            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                            title={direction === 'rtl' ? 'تكبير' : 'Expand'}
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Document Content - Pull down animation effect */}
                      <div 
                        className="bg-gradient-to-b from-gray-50 to-white rounded-xl overflow-hidden"
                        style={{ 
                          direction,
                          animation: 'pullDownExpand 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        <div className="p-6 sm:p-8 max-h-[60vh] overflow-auto">
                          <div 
                            className="max-w-3xl mx-auto space-y-3"
                            style={{ 
                              textAlign: direction === 'rtl' ? 'right' : 'left',
                              fontFamily: direction === 'rtl' ? "'Baloo Bhaijaan 2', sans-serif" : "'SF Pro Display', sans-serif"
                            }}
                          >
                            {/* Document Header */}
                            <div className="border-b border-gray-200 pb-4 mb-6">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">{file.name}</span>
                                <span className="text-xs text-gray-400">
                                  {direction === 'rtl' ? 'صفحة 1' : 'Page 1'}
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            {translatedContent.split('\n').map((line, index) => (
                              <p key={index} className="text-gray-800 leading-relaxed">
                                {line || '\u00A0'}
                              </p>
                            ))}

                            {/* Document Footer */}
                            <div className="border-t border-gray-200 pt-4 mt-6">
                              <div className="flex items-center justify-center">
                                <span className="text-xs text-gray-400">- 1 -</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Collapse button */}
                      <button
                        onClick={() => setShowInlineDocument(false)}
                        className="mt-4 w-full py-3 glass-futuristic text-white/70 hover:text-white rounded-xl transition-all text-sm"
                      >
                        {direction === 'rtl' ? 'طي المعاينة' : 'Collapse Preview'}
                      </button>
                    </div>
                  )}

                  {/* Action Buttons - Only show when not expanded */}
                  {!showInlineDocument && (
                    <div className="mt-6">
                      <button
                        onClick={handleViewDocument}
                        className="w-full py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-400 hover:to-red-500 transition-all hover:scale-[1.02] shadow-lg shadow-red-500/25 flex items-center justify-center gap-2"
                      >
                        <Eye className="w-5 h-5" />
                        {direction === 'rtl' ? 'عرض المستند' : 'View Document'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
