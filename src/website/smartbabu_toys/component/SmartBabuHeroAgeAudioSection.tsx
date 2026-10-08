import React, { useState, useRef, useEffect } from 'react';
import {
  Baby,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  BookOpen,
  ShoppingBag,
  Award,
  Heart,
  Languages,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface SmartBabuHeroAgeAudioSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface TalkingBookSample {
  id: string;
  langBadge: string;
  titleBn: string;
  phoneticPreview: string;
  voiceText: string;
  langCode: string;
  durationLabel: string;
  pageTopic: string;
  benefitText: string;
}

const TALKING_BOOK_SAMPLES: TalkingBookSample[] = [
  {
    id: 'bangla_alphabet',
    langBadge: 'বাংলা স্বরবর্ণ ও ছড়া (Bangla)',
    titleBn: 'অ-তে অজগর · আ-তে আম (শুদ্ধ বাংলা উচ্চারণ)',
    phoneticPreview: '“অ-তে অজগরটি আসছে তেড়ে, আ-তে আমটি আমি খাবো পেড়ে...”',
    voiceText: 'স্বাগতম স্মার্ট বাবু টকিং বুকে! অ-তে অজগর, আ-তে আম, ক-তে দোয়েল পাখি।',
    langCode: 'bn-BD',
    durationLabel: '0:12 sec',
    pageTopic: 'পৃষ্ঠা ০২: বাংলা বর্ণমালা ও জাতীয় প্রতীক',
    benefitText: 'স্পষ্ট দেশি উচ্চারণে ১.৫ বছর বয়স থেকেই বাবুর কথা বলা ও শব্দভাণ্ডার দ্রুত উন্নত করে।',
  },
  {
    id: 'english_phonics',
    langBadge: 'English Phonics & Animals',
    titleBn: 'A for Apple · B for Ball + Real Animal Sounds',
    phoneticPreview: '“A is for Apple (অ্যাপল), B is for Bear (বেয়ার) — Roar!”',
    voiceText: 'Welcome to Smart Babu Interactive Book! A is for Apple. B is for Ball. C is for Cat, Meow!',
    langCode: 'en-US',
    durationLabel: '0:10 sec',
    pageTopic: 'Page 05: English Alphabet, Numbers & Animal Kingdom',
    benefitText: 'ব্রিটিশ-স্ট্যান্ডার্ড ফনিক্স উচ্চারণ এবং বাঘ-সিংহ-পাখির আসল শব্দে আনন্দময় লার্নিং।',
  },
  {
    id: 'arabic_huroof',
    langBadge: 'আরবি হরফ ও দৈনন্দিন দোয়া (Arabic)',
    titleBn: 'আলিফ (أ) · বা (ب) · তা (ت) ও ঘুমানোর দোয়া',
    phoneticPreview: '“বিসমিল্লাহির রাহমানির রাহিম — আলিফ, বা, তা, ছা...”',
    voiceText: 'Bismillahir Rahmanir Rahim. Alif, Baa, Taa, Thaa. Rabbi Zidni Ilma.',
    langCode: 'ar-SA',
    durationLabel: '0:14 sec',
    pageTopic: 'পৃষ্ঠা ০৯: মাখরাজসহ আরবি হরফ ও ১০টি মাসনুন দোয়া',
    benefitText: 'শৈশব থেকেই শুদ্ধ মাখরাজে আরবি হরফ এবং খাবার ও ঘুমের ছোট দোয়াগুলো খেলার ছলে শেখা।',
  },
];

interface AgeGroupGuide {
  id: '0-12m' | '1-3y' | '3-6y';
  badge: string;
  titleBn: string;
  milestoneTitle: string;
  milestoneDesc: string;
  recommendedItems: {
    name: string;
    tag: string;
    price: string;
  }[];
}

const AGE_DEVELOPMENT_GUIDES: Record<'0-12m' | '1-3y' | '3-6y', AgeGroupGuide> = {
  '0-12m': {
    id: '0-12m',
    badge: '০ – ১২ মাস (Infants)',
    titleBn: 'নবজাতক ও প্রথম বছরের নিরাপদ সেন্সরি, ফিডিং ও আরাম',
    milestoneTitle: 'শারীরিক বৃদ্ধি, গ্যাস-মুক্ত ফিডিং ও মায়ের বুকের উষ্ণতা',
    milestoneDesc:
      'জন্মের প্রথম ১২ মাসে বাবুর পেটে বাতাস ঢোকা (Colic Pain) রোধ করা এবং কোমল ত্বকে ১০০% অর্গানিক মসলিন কটন ব্যবহার করা সবচেয়ে জরুরি।',
    recommendedItems: [
      {
        name: 'PPSU Medical-Grade Anti-Colic Feeding Bottle (240ml)',
        tag: '100% BPA-Free · Colic-Vent Valve',
        price: '৳৮৯০',
      },
      {
        name: '4-in-1 Ergonomic M-Position Hip-Healthy Baby Carrier',
        tag: 'Pediatric Spine Support · Breathable Mesh',
        price: '৳১,৮৫০',
      },
      {
        name: '3-Pack 100% Organic Mulmul Cotton Romper & Swaddle Set',
        tag: 'Zero Azo-Dye · Ultra Soft for Summers',
        price: '৳১,১৫০',
      },
    ],
  },
  '1-3y': {
    id: '1-3y',
    badge: '১ – ৩ বছর (Toddlers)',
    titleBn: 'মোবাইল কার্টুনের বদলে কথা বলা ও হাতের মোটর-স্কিল বিকাশ',
    milestoneTitle: 'স্ক্রিন-ফ্রি স্পিচ থেরাপি, বর্ণমালা পরিচয় ও হ্যান্ড-আই কোঅর্ডিনেশন',
    milestoneDesc:
      'এই বয়সে ভাত খাওয়ানোর সময় মোবাইল দিলে বাবুর কথা বলা দেরি হয় (Speech Delay)। তাই রিয়েল অডিও টকিং বুক ও কাঠের পাজল সবচেয়ে কার্যকরী।',
    recommendedItems: [
      {
        name: '3-in-1 Bangla, English & Arabic Rechargeable Talking Audio Book',
        tag: 'Best Seller · 28 Interactive Pages + Pen',
        price: '৳১,৩৯০',
      },
      {
        name: 'Montessori 6-in-1 Wooden Shape Sorter & Fishing Puzzle Box',
        tag: 'Food-Grade Water Paint · Rounded Edges',
        price: '৳১,২৫০',
      },
      {
        name: 'Spill-Proof Food-Grade Silicone Suction Plate & Spoon Set',
        tag: 'Self-Feeding Training · Dishwasher Safe',
        price: '৳৭৯০',
      },
    ],
  },
  '3-6y': {
    id: '3-6y',
    badge: '৩ – ৬ বছর (Preschoolers)',
    titleBn: 'স্কুলে ভর্তির প্রস্তুতি, যুক্তিবোধ ও সৃজনশীল মেধা বিকাশ',
    milestoneTitle: 'হাতের লেখা, গণিত, লজিক্যাল থিংকিং ও প্রি-স্কুল রেডিনেস',
    milestoneDesc:
      'স্কুলে যাওয়ার আগে বাবুর মনোযোগ বাড়াতে এবং অক্ষর ও সংখ্যার ভীতি দূর করতে মন্টেসরি ম্যাথ বোর্ড ও রি-ইউজেবল ম্যাজিক রাইটিং বুক অতুলনীয়।',
    recommendedItems: [
      {
        name: 'Montessori 100-Piece Wooden Math Counting & Clock Learning Board',
        tag: 'STEM Early Logic · Natural Beechwood',
        price: '৳১,৪৯০',
      },
      {
        name: '4-Book Sank Magic Grooved Reusable Handwriting Practice Set',
        tag: 'Auto-Fade Magic Ink · Grip Corrector',
        price: '৳৫৫০',
      },
      {
        name: 'Complete Preschool Genius Bundle (Talking Book + Wooden Puzzle)',
        tag: 'Save ৳৫০০ · Free Gift Box',
        price: '৳২,১৯০',
      },
    ],
  },
};

export const SmartBabuHeroAgeAudioSection: React.FC<SmartBabuHeroAgeAudioSectionProps> = ({
  title,
  subtitle,
  isDark = false,
}) => {
  const [selectedAge, setSelectedAge] = useState<'0-12m' | '1-3y' | '3-6y'>('1-3y');
  const [activeAudioId, setActiveAudioId] = useState<string>('bangla_alphabet');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const timerRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const activeSample =
    TALKING_BOOK_SAMPLES.find((s) => s.id === activeAudioId) || TALKING_BOOK_SAMPLES[0];
  const activeAgeGuide = AGE_DEVELOPMENT_GUIDES[selectedAge];

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const playPleasantChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 cheerful toy chime
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.11);
        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.11);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.11 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.11);
        osc.stop(ctx.currentTime + idx * 0.11 + 0.35);
      });
    } catch {
      // Ignore audio context restriction errors
    }
  };

  const handleToggleAudioPreview = (sample: TalkingBookSample) => {
    if (isPlaying && activeAudioId === sample.id) {
      setIsPlaying(false);
      setProgress(0);
      if (timerRef.current) window.clearInterval(timerRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      return;
    }

    setActiveAudioId(sample.id);
    setIsPlaying(true);
    setProgress(8);
    if (timerRef.current) window.clearInterval(timerRef.current);

    playPleasantChime();

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(sample.voiceText);
      utter.lang = sample.langCode;
      utter.rate = 0.92;
      utter.pitch = 1.1;
      window.speechSynthesis.speak(utter);
    }

    timerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          setIsPlaying(false);
          return 0;
        }
        return prev + 5;
      });
    }, 220);
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="smartbabu-hero-age"
      className="relative overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: isDark ? '#0B111E' : '#FFFDF9',
        color: isDark ? '#F8FAFC' : '#0F172A',
      }}
    >
      {/* Soft Nurturing Background Glows */}
      <div className="pointer-events-none absolute -top-28 -left-24 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-32 -right-24 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        {/* ================================================================= */}
        {/* PART 1: HERO SECTION (Nurturing Screen-Free Learning & Safety)    */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Emotive Copywriting & Safety Badges */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold border bg-teal-500/10 text-teal-800 dark:text-teal-300 border-teal-500/25">
              <ShieldCheck size={15} className="text-[#0D9488]" />
              <EditableText
                id="smartbabu_hero_eyebrow"
                defaultText="৪২,০০০+ বাংলাদেশি মায়ের আস্থার নাম · ১০০% BPA-Free ও নন-টক্সিক সার্টিফাইড"
              />
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-[1.18]"
              style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
            >
              <EditableText
                id="smartbabu_hero_h1"
                defaultText={
                  title ||
                  'মোবাইল স্ক্রিনের নেশা নয় — সোনামণির শৈশব কাটুক নিরাপদ মন্টেসরি খেলনা ও কথা বলা বইয়ের আনন্দে!'
                }
              />
            </h1>

            <p
              className="text-sm sm:text-base leading-relaxed max-w-2xl font-medium"
              style={{ color: isDark ? '#CBD5E1' : '#334155' }}
            >
              <EditableText
                id="smartbabu_hero_subtitle"
                defaultText={
                  subtitle ||
                  'ভাত খাওয়ানো বা কান্না থামানোর জন্য বাবুর হাতে মোবাইল তুলে দিচ্ছেন? অতিরিক্ত স্ক্রিন-টাইম শিশুর কথা বলা (Speech Development) ও চোখের মারাত্মক ক্ষতি করে। স্মার্টবাবু নিয়ে এসেছে ১০০% ফুড-গ্রেড, BPA-Free এবং নন-টক্সিক কাঠের মন্টেসরি পাজল, বাংলা-ইংরেজি-আরবি টকিং অডিও বুক এবং পেডিয়াট্রিশিয়ান অনুমোদিত বেবি কেয়ার এসেনশিয়ালস।'
                }
              />
            </p>

            {/* 4 Key Parent Reassurance Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                {
                  badge: 'স্ক্রিন-ফ্রি স্পিচ বুস্টার',
                  text: 'বাংলা, ইংরেজি ও আরবি উচ্চারণ শুনে বাবু নিজেই কথা বলতে শেখে',
                },
                {
                  badge: '১০০% BPA-Free ও ফুড-গ্রেড',
                  text: 'বাবু মুখে দিলেও সম্পূর্ণ নিরাপদ — ল্যাব টেস্টেড ও নন-টক্সিক রঙ',
                },
                {
                  badge: 'বয়স অনুযায়ী সাজানো (0-6Y)',
                  text: '০-১২ মাস, ১-৩ বছর ও ৩-৬ বছরের মেধা বিকাশের সঠিক গাইডলাইন',
                },
                {
                  badge: 'ডেলিভারি ম্যানের সামনে চেক করুন',
                  text: 'অর্ডার হাতে পেয়ে কোয়ালিটি ও অডিও চেক করে টাকা পরিশোধের সুবিধা',
                },
              ].map((item) => (
                <div
                  key={item.badge}
                  className="p-3.5 rounded-2xl border flex items-start gap-2.5"
                  style={{
                    backgroundColor: isDark ? '#131C2E' : '#FFFFFF',
                    borderColor: isDark ? '#1E293B' : '#E2E8F0',
                  }}
                >
                  <CheckCircle2
                    size={16}
                    className="text-[#0D9488] shrink-0 mt-0.5"
                  />
                  <div>
                    <div
                      className="text-xs font-extrabold"
                      style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
                    >
                      {item.badge}
                    </div>
                    <div
                      className="text-[11px] leading-snug mt-0.5"
                      style={{ color: isDark ? '#94A3B8' : '#475569' }}
                    >
                      {item.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => scrollToId('smartbabu-catalog-safety')}
                className="px-6 py-4 rounded-2xl text-xs sm:text-sm font-black text-white shadow-lg flex items-center gap-2.5 transition hover:opacity-95 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
                }}
              >
                <ShoppingBag size={17} />
                <EditableText
                  id="smartbabu_hero_cta_primary"
                  defaultText="সোনামণির বয়স অনুযায়ী খেলনা দেখুন — ক্যাশ অন ডেলিভারি"
                />
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => scrollToId('smartbabu-audio-preview')}
                className="px-5 py-4 rounded-2xl text-xs sm:text-sm font-extrabold border flex items-center gap-2 transition cursor-pointer"
                style={{
                  backgroundColor: isDark ? '#162032' : '#FFF7ED',
                  borderColor: isDark ? '#F97316' : '#FDBA74',
                  color: isDark ? '#FB923C' : '#C2410C',
                }}
              >
                <Volume2 size={17} />
                <EditableText
                  id="smartbabu_hero_cta_secondary"
                  defaultText="টকিং বুকের বাংলা/আরবি অডিও শুনুন (Listen Now)"
                />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Audio/Video Playback Preview Widget */}
          <div id="smartbabu-audio-preview" className="lg:col-span-5">
            <div
              className="rounded-3xl border-2 p-5 sm:p-6 space-y-5 shadow-xl relative overflow-hidden"
              style={{
                backgroundColor: isDark ? '#131C2E' : '#FFFFFF',
                borderColor: '#0D9488',
              }}
            >
              {/* Top Widget Header */}
              <div className="flex items-center justify-between gap-2 border-b pb-4 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F97316]/15 text-[#EA580C] flex items-center justify-center">
                    <Volume2 size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/15 text-teal-700 dark:text-teal-300">
                      Interactive Audio Preview Widget
                    </span>
                    <h3
                      className="text-sm sm:text-base font-black mt-0.5"
                      style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
                    >
                      কেনার আগেই টকিং বুকের উচ্চারণ শুনে দেখুন!
                    </h3>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  ৳১,৩৯০
                </span>
              </div>

              {/* Book Visual + Live Soundwave Indicator */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80"
                  alt="SmartBabu 3-in-1 Bangla English Arabic Talking Book"
                  className="w-full h-44 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-4 flex flex-col justify-end">
                  <div className="flex items-center justify-between gap-2 text-white">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F97316] text-white">
                        Best-Selling 3-in-1 E-Book
                      </span>
                      <h4 className="text-sm font-black mt-1">
                        বাংলা + English + আরবি রিকার্জেবল টকিং অডিও বুক (২৮ পৃষ্ঠা)
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Language Switcher Tabs (Bangla / English / Arabic) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span
                    className="flex items-center gap-1.5"
                    style={{ color: isDark ? '#CBD5E1' : '#334155' }}
                  >
                    <Languages size={14} className="text-[#0D9488]" />
                    নিচের যেকোনো ভাষায় ক্লিক করে অডিও শুনুন:
                  </span>
                  <span className="text-[11px] text-[#EA580C] font-extrabold">
                    {isPlaying ? '🔊 বাজছে (Playing)...' : '▶ ক্লিক করুন'}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {TALKING_BOOK_SAMPLES.map((sample) => {
                    const active = activeAudioId === sample.id;
                    const currentlyPlayingThis = active && isPlaying;
                    return (
                      <div
                        key={sample.id}
                        onClick={() => handleToggleAudioPreview(sample)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          active
                            ? 'border-[#0D9488] bg-teal-500/10'
                            : isDark
                            ? 'border-slate-800 bg-[#0F172A] hover:border-slate-700'
                            : 'border-slate-200 bg-slate-50/70 hover:border-teal-300'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <button
                              type="button"
                              className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs cursor-pointer ${
                                currentlyPlayingThis ? 'bg-[#F97316]' : 'bg-[#0D9488]'
                              }`}
                            >
                              {currentlyPlayingThis ? (
                                <Pause size={15} />
                              ) : (
                                <Play size={15} className="ml-0.5" />
                              )}
                            </button>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className="text-xs font-black truncate"
                                  style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
                                >
                                  {sample.langBadge}
                                </span>
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">
                                  {sample.durationLabel}
                                </span>
                              </div>
                              <p
                                className="text-[11px] font-semibold truncate mt-0.5"
                                style={{ color: isDark ? '#94A3B8' : '#475569' }}
                              >
                                {sample.titleBn}
                              </p>
                            </div>
                          </div>

                          <span className="text-[11px] font-extrabold text-[#0D9488] dark:text-teal-400 shrink-0">
                            {currentlyPlayingThis ? 'Stop' : 'Listen Now'}
                          </span>
                        </div>

                        {/* Active Transcript & Progress Bar */}
                        {active && (
                          <div className="mt-3 pt-2.5 border-t border-teal-500/20 space-y-2">
                            <div className="text-xs font-bold italic text-[#0F766E] dark:text-teal-300">
                              {sample.phoneticPreview}
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                              <div
                                className="h-full bg-[#F97316] transition-all duration-200"
                                style={{ width: `${currentlyPlayingThis ? progress : 35}%` }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-[11px] opacity-80">
                              <span>{sample.pageTopic}</span>
                              <span>✓ Clear Native Voice</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => scrollToId('smartbabu-gift-checkout')}
                className="w-full py-3.5 rounded-xl text-xs font-black text-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition hover:opacity-95"
                style={{
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                }}
              >
                <ShoppingBag size={15} />
                <span>৩-ইন-১ টকিং অডিও বুক অর্ডার করুন — ৳১,৩৯০</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* PART 2: INTERACTIVE AGE-BASED FILTER BAR & MILESTONE PLANNER      */}
        {/* ================================================================= */}
        <div
          className="rounded-3xl border p-6 sm:p-8 space-y-6 shadow-sm"
          style={{
            backgroundColor: isDark ? '#131C2E' : '#F0FDFA',
            borderColor: isDark ? '#1E293B' : '#99F6E4',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0D9488]">
                Interactive Age-Based Shopping Filter (০–৬ বছর)
              </span>
              <h2
                className="text-xl sm:text-2xl font-black"
                style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
              >
                আপনার সোনামণির বয়স কত? বয়স সিলেক্ট করে সঠিক লার্নিং ও কেয়ার প্রোডাক্ট দেখুন
              </h2>
            </div>

            {/* 3 Prominent Age Filter Buttons */}
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#0B111E] border border-teal-200 dark:border-slate-800 shrink-0">
              {[
                { id: '0-12m' as const, label: '০ – ১২ মাস', sub: 'Infants' },
                { id: '1-3y' as const, label: '১ – ৩ বছর', sub: 'Toddlers' },
                { id: '3-6y' as const, label: '৩ – ৬ বছর', sub: 'Preschoolers' },
              ].map((tab) => {
                const active = selectedAge === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedAge(tab.id)}
                    className={`px-4 py-2.5 rounded-xl text-left transition cursor-pointer ${
                      active
                        ? 'bg-[#0D9488] text-white shadow-sm'
                        : 'hover:bg-teal-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-black">{tab.label}</div>
                    <div
                      className={`text-[10px] font-bold ${
                        active ? 'text-teal-100' : 'opacity-65'
                      }`}
                    >
                      {tab.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Age Milestone & Recommended Picks */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
            <div
              className="lg:col-span-5 p-5 rounded-2xl border space-y-3"
              style={{
                backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                borderColor: isDark ? '#1E293B' : '#CCFBF1',
              }}
            >
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-[#F97316]/15 text-[#EA580C]">
                <Award size={14} />
                {activeAgeGuide.badge} ডেভেলপমেন্ট গাইড
              </span>
              <h3
                className="text-base sm:text-lg font-black"
                style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
              >
                {activeAgeGuide.titleBn}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: isDark ? '#94A3B8' : '#475569' }}
              >
                {activeAgeGuide.milestoneDesc}
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs font-extrabold text-[#0D9488]">
                <Heart size={14} />
                <span>ফোকাস: {activeAgeGuide.milestoneTitle}</span>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {activeAgeGuide.recommendedItems.map((item) => (
                <div
                  key={item.name}
                  className="p-4 rounded-2xl border flex flex-col justify-between space-y-3"
                  style={{
                    backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                    borderColor: isDark ? '#1E293B' : '#E2E8F0',
                  }}
                >
                  <div className="space-y-1.5">
                    <span className="inline-block text-[10px] font-extrabold px-2 py-0.5 rounded bg-teal-500/10 text-[#0D9488]">
                      {item.tag}
                    </span>
                    <h4
                      className="text-xs font-black leading-snug"
                      style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
                    >
                      {item.name}
                    </h4>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-sm font-black text-[#EA580C]">{item.price}</span>
                    <button
                      type="button"
                      onClick={() => scrollToId('smartbabu-gift-checkout')}
                      className="text-[11px] font-extrabold text-[#0D9488] hover:underline cursor-pointer"
                    >
                      ব্যাগ-এ নিন →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
