import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  direction: 'ltr' | 'rtl';
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string | string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation dictionary
const translations: Record<Language, Record<string, string | string[]>> = {
  en: {
    // Hero Section
    'hero.badge': 'Fine-Tuned On-Device AI',
    'hero.title.line1': 'Translate Medical',
    'hero.title.line2': 'Documents Privately',
    'hero.subtitle': 'Our custom Fine-Tuned AI model runs entirely on your device. No data leaves your phone. Just watch a quick ad and get instant, secure translations.',
    'hero.cta.primary': 'Start Translating',
    'hero.cta.secondary': 'How It Works',
    'hero.feature1.label': '100% Private',
    'hero.feature1.desc': 'On-device AI',
    'hero.feature2.label': 'Local Processing',
    'hero.feature2.desc': 'No cloud needed',
    'hero.feature3.label': 'Fast & Free',
    'hero.feature3.desc': 'Watch ad to use',
    'hero.feature4.label': '2 Languages',
    'hero.feature4.desc': 'More coming',
    'hero.floating.ai': 'AI Powered',
    'hero.floating.private': '100% Private',
    'hero.lang.english': 'English',
    'hero.lang.arabic': 'العربية',

    // Translation Interface
    'translate.badge': 'On-Device AI Translation',
    'translate.title': 'Translate Your Medical Documents',
    'translate.subtitle': 'Upload any PDF or document file. Our custom Fine-Tuned AI model processes everything locally on your device for maximum privacy and security.',
    'translate.feature1.title': '100% Private',
    'translate.feature1.desc': 'AI runs on your phone',
    'translate.feature2.title': 'Lightning Fast',
    'translate.feature2.desc': 'No server delays',
    'translate.feature3.title': '2 Languages',
    'translate.feature3.desc': 'More coming soon',
    'translate.from': 'From',
    'translate.to': 'To',
    'translate.selectLang': 'Select Language',
    'translate.dropzone.title': 'Drop your document here',
    'translate.dropzone.subtitle': 'Supports PDF, TXT, MD, DOC files',
    'translate.dropzone.browse': 'Click to browse',
    'translate.file.ready': 'Ready to translate. Click the button below to start.',
    'translate.file.selected': 'File selected',
    'translate.cancelled.title': 'Translation Cancelled',
    'translate.cancelled.desc': 'You closed the ad before completion',
    'translate.cancelled.retry': 'Try Again',
    'translate.completed.title': 'Translation Complete!',
    'translate.completed.desc': 'Your document has been successfully translated using our on-device AI.',
    'translate.completed.ready': 'READY',
    'translate.download': 'Download',
    'translate.newFile': 'New File',
    'translate.error.title': 'Translation Failed',
    'translate.error.retry': 'Try Again',
    'translate.watchAd': 'Watch an Ad & Translate Your File',
    'translate.supported': 'Supported Formats',

    // Features Section
    'features.howItWorks.badge': 'How It Works',
    'features.howItWorks.title': 'Translate in 4 Simple Steps',
    'features.step1.title': 'Upload Document',
    'features.step1.desc': 'Select your PDF or document file',
    'features.step2.title': 'Watch an Ad',
    'features.step2.desc': 'Support free translations by watching a quick ad',
    'features.step3.title': 'AI Translates',
    'features.step3.desc': 'Our Fine-Tuned model processes on your device',
    'features.step4.title': 'Download Result',
    'features.step4.desc': 'Get your translated document instantly',
    'features.whyChoose.badge': 'Why Choose Us',
    'features.whyChoose.title': 'Built for Privacy & Speed',
    'features.whyChoose.subtitle': 'Our custom Fine-Tuned AI model is designed specifically for medical document translation, running entirely on your device for maximum security.',
    'features.onDevice.title': 'On-Device AI',
    'features.onDevice.desc': 'Our custom Fine-Tuned model runs entirely on your phone. No data ever leaves your device.',
    'features.privacy.title': 'Maximum Privacy',
    'features.privacy.desc': '100% private translation. Your medical documents are never uploaded to any server.',
    'features.fast.title': 'Lightning Fast',
    'features.fast.desc': 'No server delays. Process documents instantly using your device\'s computing power.',
    'features.zeroData.title': 'Zero Data Collection',
    'features.zeroData.desc': 'We don\'t collect, store, or track any of your documents or personal information.',
    'features.fineTuned.title': 'Fine-Tuned Model',
    'features.fineTuned.desc': 'Custom AI specifically trained for medical terminology and document translation.',
    'features.languages.title': '2 Languages',
    'features.languages.desc': 'Currently supporting English and Arabic. More languages coming soon!',
    'features.ocr.title': 'OCR Technology',
    'features.ocr.desc': 'Advanced optical character recognition extracts text from scanned PDFs and images.',
    'features.alwaysOn.title': 'Always Available',
    'features.alwaysOn.desc': 'Works offline after initial setup. Translate anytime, anywhere without internet.',
    'features.comingSoon.title': 'More Languages Coming Soon',
    'features.comingSoon.desc': 'We\'re working on adding French, German, Chinese, and more!',
    'features.comingSoon.cta': 'Start Translating',

    // Footer
    'footer.tagline': 'AI-powered medical document translation that runs entirely on your device. 100% private, secure, and free with ads.',
    'footer.badge.ai': 'Fine-Tuned AI',
    'footer.badge.onDevice': 'On-Device',
    'footer.quickLinks': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.stayUpdated': 'Stay Updated',
    'footer.newsletter.desc': 'Get notified when we add new languages and features.',
    'footer.newsletter.placeholder': 'Enter your email',
    'footer.newsletter.button': 'Subscribe',
    'footer.newsletter.success': 'Subscribed!',
    'footer.email': 'Email',
    'footer.whatsapp': 'WhatsApp Business',
    'footer.location': 'Location',
    'footer.location.value': 'Available Worldwide',
    'footer.copyright': '© 2024 MED TRANSLATE. All rights reserved.',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',

    // Navigation
    'nav.home': 'Home',
    'nav.translate': 'Translate',
    'nav.features': 'Features',
    'nav.contact': 'Contact',
    'nav.getStarted': 'Get Started',

    // Privacy Modal
    'privacy.title': 'Privacy Policy',
    'privacy.section1.title': '1. 100% On-Device Processing',
    'privacy.section1.content': 'MED TRANSLATE processes all documents locally on your device using our Fine-Tuned AI model. Your files never leave your phone and are never uploaded to any server. This ensures maximum privacy and security for your medical documents.',
    'privacy.section2.title': '2. No Data Collection',
    'privacy.section2.content': 'We do not collect, store, or track any of your documents, translations, or personal information. All processing happens entirely on your device. We have no access to your files.',
    'privacy.section3.title': '3. Advertisements',
    'privacy.section3.content': 'We display ads to support the free service. These ads are served by Google AdMob. Ad networks may collect limited data for ad personalization, but this is separate from your document content which remains private.',
    'privacy.section4.title': '4. Contact Information',
    'privacy.section4.content': 'For privacy-related questions, contact us at:',

    // Terms Modal
    'terms.title': 'Terms of Service',
    'terms.section1.title': '1. Service Description',
    'terms.section1.content': 'MED TRANSLATE provides on-device AI translation for medical documents. Our Fine-Tuned model processes files locally on your device. The service is supported by advertisements.',
    'terms.section2.title': '2. Supported Languages',
    'terms.section2.content': 'Currently supported: English and Arabic. More languages will be added in future updates.',
    'terms.section3.title': '3. Disclaimer',
    'terms.section3.content': 'While our AI strives for accuracy, translations may contain errors. MED TRANSLATE is not responsible for any damages resulting from translation errors. Always verify critical medical information with qualified professionals.',
    'terms.section4.title': '4. Contact',
    'terms.section4.content': 'For questions or support:',

    // Languages
    'lang.english': 'English',
    'lang.arabic': 'Arabic',
    'lang.englishNative': 'English',
    'lang.arabicNative': 'العربية',
  },
  ar: {
    // Hero Section
    'hero.badge': 'ذكاء اصطناعي مخصص على الجهاز',
    'hero.title.line1': 'ترجم المستندات',
    'hero.title.line2': 'الطبية بخصوصية',
    'hero.subtitle': 'نموذج الذكاء الاصطناعي المخصص لدينا يعمل بالكامل على جهازك. لا تغادر بياناتك هاتفك. ما عليك سوى مشاهدة إعلان سريع والحصول على ترجمات فورية وآمنة.',
    'hero.cta.primary': 'ابدأ الترجمة',
    'hero.cta.secondary': 'كيف يعمل',
    'hero.feature1.label': '100% خاص',
    'hero.feature1.desc': 'ذكاء اصطناعي على الجهاز',
    'hero.feature2.label': 'معالجة محلية',
    'hero.feature2.desc': 'لا حاجة للسحابة',
    'hero.feature3.label': 'سريع ومجاني',
    'hero.feature3.desc': 'شاهد إعلان للاستخدام',
    'hero.feature4.label': 'لغتان',
    'hero.feature4.desc': 'المزيد قادم',
    'hero.floating.ai': 'مدعوم بالذكاء الاصطناعي',
    'hero.floating.private': '100% خاص',
    'hero.lang.english': 'English',
    'hero.lang.arabic': 'العربية',

    // Translation Interface
    'translate.badge': 'ترجمة بالذكاء الاصطناعي على الجهاز',
    'translate.title': 'ترجم مستنداتك الطبية',
    'translate.subtitle': 'قم بتحميل أي ملف PDF أو مستند. يعالج نموذج الذكاء الاصطناعي المخصص لدينا كل شيء محلياً على جهازك لأقصى درجات الخصوصية والأمان.',
    'translate.feature1.title': '100% خاص',
    'translate.feature1.desc': 'الذكاء الاصطناعي يعمل على هاتفك',
    'translate.feature2.title': 'سريع كالبرق',
    'translate.feature2.desc': 'لا تأخير في الخوادم',
    'translate.feature3.title': 'لغتان',
    'translate.feature3.desc': 'المزيد قريباً',
    'translate.from': 'من',
    'translate.to': 'إلى',
    'translate.selectLang': 'اختر اللغة',
    'translate.dropzone.title': 'أسقط مستندك هنا',
    'translate.dropzone.subtitle': 'يدعم ملفات PDF, TXT, MD, DOC',
    'translate.dropzone.browse': 'انقر للتصفح',
    'translate.file.ready': 'جاهز للترجمة. انقر الزر أدناه للبدء.',
    'translate.file.selected': 'تم اختيار الملف',
    'translate.cancelled.title': 'تم إلغاء الترجمة',
    'translate.cancelled.desc': 'أغلقت الإعلان قبل الانتهاء',
    'translate.cancelled.retry': 'حاول مرة أخرى',
    'translate.completed.title': 'اكتملت الترجمة!',
    'translate.completed.desc': 'تمت ترجمة مستندك بنجاح باستخدام ذكاء الاصطناعي على جهازك.',
    'translate.completed.ready': 'جاهز',
    'translate.download': 'تحميل',
    'translate.newFile': 'ملف جديد',
    'translate.error.title': 'فشلت الترجمة',
    'translate.error.retry': 'حاول مرة أخرى',
    'translate.watchAd': 'شاهد إعلان وترجم ملفك',
    'translate.supported': 'الصيغ المدعومة',

    // Features Section
    'features.howItWorks.badge': 'كيف يعمل',
    'features.howItWorks.title': 'ترجم في 4 خطوات بسيطة',
    'features.step1.title': 'تحميل المستند',
    'features.step1.desc': 'اختر ملف PDF أو مستند',
    'features.step2.title': 'شاهد إعلان',
    'features.step2.desc': 'ادعم الترجمات المجانية بمشاهدة إعلان سريع',
    'features.step3.title': 'الذكاء الاصطناعي يترجم',
    'features.step3.desc': 'يعالج نموذجنا المخصص على جهازك',
    'features.step4.title': 'تحميل النتيجة',
    'features.step4.desc': 'احصل على مستندك المترجم فوراً',
    'features.whyChoose.badge': 'لماذا تختارنا',
    'features.whyChoose.title': 'مبني للخصوصية والسرعة',
    'features.whyChoose.subtitle': 'تم تصميم نموذج الذكاء الاصطناعي المخصص لدينا خصيصاً لترجمة المستندات الطبية، ويعمل بالكامل على جهازك لأقصى درجات الأمان.',
    'features.onDevice.title': 'ذكاء اصطناعي على الجهاز',
    'features.onDevice.desc': 'يعمل نموذجنا المخصص بالكامل على هاتفك. لا تغادر بياناتك جهازك أبداً.',
    'features.privacy.title': 'أقصى درجات الخصوصية',
    'features.privacy.desc': 'ترجمة 100% خاصة. لا يتم تحميل مستنداتك الطبية إلى أي خادم.',
    'features.fast.title': 'سريع كالبرق',
    'features.fast.desc': 'لا تأخير في الخوادم. معالجة المستندات فوراً باستخدام قوة جهازك.',
    'features.zeroData.title': 'عدم جمع البيانات',
    'features.zeroData.desc': 'نحن لا نجمع أو نخزن أو نتتبع أي من مستنداتك أو معلوماتك الشخصية.',
    'features.fineTuned.title': 'نموذج مخصص',
    'features.fineTuned.desc': 'ذكاء اصطناعي مخصص مدرب خصيصاً للمصطلحات الطبية وترجمة المستندات.',
    'features.languages.title': 'لغتان',
    'features.languages.desc': 'يدعم حالياً الإنجليزية والعربية. المزيد من اللغات قريباً!',
    'features.ocr.title': 'تقنية OCR',
    'features.ocr.desc': 'التعرف البصري على الحروف يستخرج النص من ملفات PDF الممسوحة والصور.',
    'features.alwaysOn.title': 'متاح دائماً',
    'features.alwaysOn.desc': 'يعمل بدون إنترنت بعد الإعداد الأولي. ترجم في أي وقت وفي أي مكان.',
    'features.comingSoon.title': 'المزيد من اللغات قريباً',
    'features.comingSoon.desc': 'نعمل على إضافة الفرنسية والألمانية والصينية والمزيد!',
    'features.comingSoon.cta': 'ابدأ الترجمة',

    // Footer
    'footer.tagline': 'ترجمة المستندات الطبية بالذكاء الاصطناعي تعمل بالكامل على جهازك. 100% خاص وآمن ومجاني مع الإعلانات.',
    'footer.badge.ai': 'ذكاء اصطناعي مخصص',
    'footer.badge.onDevice': 'على الجهاز',
    'footer.quickLinks': 'روابط سريعة',
    'footer.resources': 'الموارد',
    'footer.stayUpdated': 'ابقَ على اطلاع',
    'footer.newsletter.desc': 'احصل على إشعارات عند إضافة لغات وميزات جديدة.',
    'footer.newsletter.placeholder': 'أدخل بريدك الإلكتروني',
    'footer.newsletter.button': 'اشترك',
    'footer.newsletter.success': 'تم الاشتراك!',
    'footer.email': 'البريد الإلكتروني',
    'footer.whatsapp': 'واتساب للأعمال',
    'footer.location': 'الموقع',
    'footer.location.value': 'متاح عالمياً',
    'footer.copyright': '© 2024 MED TRANSLATE. جميع الحقوق محفوظة.',
    'footer.privacy': 'الخصوصية',
    'footer.terms': 'الشروط',

    // Navigation
    'nav.home': 'الرئيسية',
    'nav.translate': 'ترجم',
    'nav.features': 'الميزات',
    'nav.contact': 'اتصل بنا',
    'nav.getStarted': 'ابدأ الآن',

    // Privacy Modal
    'privacy.title': 'سياسة الخصوصية',
    'privacy.section1.title': '1. معالجة 100% على الجهاز',
    'privacy.section1.content': 'يعالج MED TRANSLATE جميع المستندات محلياً على جهازك باستخدام نموذج الذكاء الاصطناعي المخصص. لا تغادر ملفاتك هاتفك أبداً ولا يتم تحميلها إلى أي خادم. هذا يضمن أقصى درجات الخصوصية والأمان لمستنداتك الطبية.',
    'privacy.section2.title': '2. عدم جمع البيانات',
    'privacy.section2.content': 'نحن لا نجمع أو نخزن أو نتتبع أي من مستنداتك أو ترجماتك أو معلوماتك الشخصية. تتم جميع المعالجات بالكامل على جهازك. ليس لدينا وصول إلى ملفاتك.',
    'privacy.section3.title': '3. الإعلانات',
    'privacy.section3.content': 'نعرض إعلانات لدعم الخدمة المجانية. يتم عرض هذه الإعلانات بواسطة Google AdMob. قد تجمع شبكات الإعلانات بيانات محدودة لتخصيص الإعلانات، لكن هذا منفصل عن محتوى مستندك الذي يبقى خاصاً.',
    'privacy.section4.title': '4. معلومات الاتصال',
    'privacy.section4.content': 'للاستفسارات المتعلقة بالخصوصية، تواصل معنا على:',

    // Terms Modal
    'terms.title': 'شروط الخدمة',
    'terms.section1.title': '1. وصف الخدمة',
    'terms.section1.content': 'يوفر MED TRANSLATE ترجمة بالذكاء الاصطناعي على الجهاز للمستندات الطبية. يعالج نموذجنا المخصص الملفات محلياً على جهازك. الخدمة مدعومة بالإعلانات.',
    'terms.section2.title': '2. اللغات المدعومة',
    'terms.section2.content': 'اللغات المدعومة حالياً: الإنجليزية والعربية. سيتم إضافة المزيد من اللغات في التحديثات المستقبلية.',
    'terms.section3.title': '3. إخلاء المسؤولية',
    'terms.section3.content': 'بينما يسعى ذكاء الاصطناعي لدينا للدقة، قد تحتوي الترجمات على أخطاء. MED TRANSLATE غير مسؤول عن أي أضرار ناتجة عن أخطاء الترجمة. تحقق دائماً من المعلومات الطبية الحرجة مع المتخصصين المؤهلين.',
    'terms.section4.title': '4. الاتصال',
    'terms.section4.content': 'للأسئلة أو الدعم:',

    // Languages
    'lang.english': 'الإنجليزية',
    'lang.arabic': 'العربية',
    'lang.englishNative': 'English',
    'lang.arabicNative': 'العربية',
  },
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage for saved preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved && (saved === 'en' || saved === 'ar')) {
        return saved;
      }
    }
    return 'en';
  });

  const direction: 'ltr' | 'rtl' = language === 'ar' ? 'rtl' : 'ltr';

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
  }, [language, setLanguage]);

  const t = useCallback((key: string): string | string[] => {
    const value = translations[language][key];
    return value ?? key;
  }, [language]);

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
