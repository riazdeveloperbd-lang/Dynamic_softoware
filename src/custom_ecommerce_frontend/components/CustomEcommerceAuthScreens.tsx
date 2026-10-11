import React, { useState } from 'react';
import {
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  CreditCard,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  KeyRound,
  Fingerprint,
  QrCode,
  Globe,
  Play,
  HelpCircle,
  Delete,
  CheckCircle2,
  AlertCircle,
  Zap,
  Award,
} from 'lucide-react';
import {
  CustomEcommerceScreenId,
  CustomEcommerceVariantId,
  CUSTOM_ECOMMERCE_PRODUCTS,
} from '../data/customEcommerceRegistry';

interface AuthScreensProps {
  screenId: CustomEcommerceScreenId;
  variant: CustomEcommerceVariantId;
  primaryColor: string;
  isDark: boolean;
  onNavigate: (target: CustomEcommerceScreenId) => void;
}

export const CustomEcommerceAuthScreens: React.FC<AuthScreensProps> = ({
  screenId,
  variant,
  primaryColor,
  isDark,
  onNavigate,
}) => {
  const [walkthroughStep, setWalkthroughStep] = useState(0);
  const [authTab, setAuthTab] = useState<'phone' | 'email'>('phone');
  const [phoneInput, setPhoneInput] = useState('+880 1711-892400');
  const [otpSent, setOtpSent] = useState(true);
  const [otpDigits, setOtpDigits] = useState(['4', '8', '2', '9', '1', '6']);
  const [showPass, setShowPass] = useState(false);
  const [resetStage, setResetStage] = useState<'otp' | 'new_pin'>('otp');
  const [newPin, setNewPin] = useState('8492');
  const [selectedLang, setSelectedLang] = useState<'EN' | 'BN'>('EN');
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'BDT'>('BDT');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Audio Tech', 'Sneakers']);
  const [dialedDigits, setDialedDigits] = useState('01711892');
  const [recoveryChannel, setRecoveryChannel] = useState<'sms' | 'whatsapp' | 'email'>('whatsapp');

  // ============================================================================
  // 1. SPLASH SCREEN — 6 COMPLETELY DIFFERENT ARCHITECTURES & FEATURES
  // ============================================================================
  if (screenId === 'SplashScreen') {
    // V1: KEEP EXACTLY AS ORIGINAL
    if (variant === 'varient_1') {
      return (
        <div
          className="h-full w-full flex flex-col justify-between p-6 relative overflow-hidden select-none text-white"
          style={{
            background: `linear-gradient(155deg, ${primaryColor} 0%, #090D16 90%)`,
          }}
        >
          <div className="flex items-center justify-between text-[11px] font-bold opacity-80 z-10">
            <span className="font-mono uppercase tracking-widest">
              LAYOUT V1 · UNIVERSAL E-COMMERCE
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur text-[10px]">
              v4.2.0
            </span>
          </div>

          <div className="my-auto flex flex-col items-center text-center z-10 space-y-4">
            <div className="relative">
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl border border-white/25"
                style={{ backgroundColor: 'rgba(255,255,255,0.16)' }}
              >
                <ShoppingBag size={42} />
              </div>
              <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                <Sparkles size={14} />
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">NovaCart Universal</h1>
              <p className="text-xs opacity-80 mt-1 max-w-[230px]">
                Fast Delivery · Verified Brands · Frictionless Checkout
              </p>
            </div>
          </div>

          <div className="space-y-3 z-10">
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div className="h-full w-4/5 rounded-full bg-white" />
            </div>
            <button
              type="button"
              onClick={() => onNavigate('OnboardingWalkthrough')}
              className="w-full py-3 rounded-xl text-xs font-extrabold bg-white text-slate-950 flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>Continue to Walkthrough</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      );
    }

    // V2: BENTO 4-TILE MOSAIC COLLAGE + LIVE ORDER TICKER + REGION/CURRENCY PICKER
    if (variant === 'varient_2') {
      return (
        <div className="h-full w-full flex flex-col justify-between p-4 select-none">
          {/* Top Region & Currency Selector Pill */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-xs"
                style={{ backgroundColor: primaryColor }}
              >
                N
              </div>
              <span className="text-xs font-black">NovaBento</span>
            </div>
            <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl text-[10px] font-extrabold">
              <button
                type="button"
                onClick={() => setSelectedLang(selectedLang === 'EN' ? 'BN' : 'EN')}
                className="px-2 py-1 rounded-lg bg-white dark:bg-neutral-900 shadow-xs cursor-pointer"
              >
                🌐 {selectedLang}
              </button>
              <button
                type="button"
                onClick={() => setSelectedCurrency(selectedCurrency === 'BDT' ? 'USD' : 'BDT')}
                className="px-2 py-1 rounded-lg cursor-pointer"
                style={{ color: primaryColor }}
              >
                {selectedCurrency === 'BDT' ? '৳ BDT' : '$ USD'}
              </button>
            </div>
          </div>

          {/* Bento 4-Tile Asymmetrical Grid */}
          <div className="grid grid-cols-12 gap-2.5 my-auto">
            <div
              className="col-span-7 rounded-3xl p-4 text-white flex flex-col justify-between h-44"
              style={{ backgroundColor: primaryColor }}
            >
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[9px] font-extrabold w-fit uppercase">
                Bento OS v2
              </span>
              <div>
                <div className="text-2xl font-black leading-none">54,200+</div>
                <div className="text-[11px] opacity-85 mt-1">Authentic Brand SKUs Ready</div>
              </div>
            </div>

            <div className="col-span-5 rounded-3xl overflow-hidden relative h-44 border border-neutral-200 dark:border-neutral-800">
              <img
                src={CUSTOM_ECOMMERCE_PRODUCTS[0].image}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 inset-x-2 p-1.5 rounded-xl bg-black/70 backdrop-blur text-white text-[9px] font-bold text-center">
                🎧 Audio -30%
              </div>
            </div>

            <div className="col-span-5 rounded-3xl p-3 bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-between h-28">
              <Truck size={18} className="text-emerald-500" />
              <div>
                <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                  42 Min Avg
                </div>
                <div className="text-[10px] opacity-70">Dhaka Metro Hub</div>
              </div>
            </div>

            <div className="col-span-7 rounded-3xl p-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between h-28">
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-amber-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>LIVE ORDER STREAM</span>
              </div>
              <div className="text-[11px] font-bold leading-snug">
                Nadia from Banani just ordered <span className="underline">Sony XM5</span> (2m ago)
              </div>
              <div className="text-[9px] font-mono opacity-55">Syncing 18 local dark-stores...</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('OnboardingWalkthrough')}
            className="w-full py-3.5 rounded-2xl text-xs font-extrabold text-white flex items-center justify-between px-4 shadow-lg cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            <span>Launch {selectedCurrency} Storefront</span>
            <span className="px-2 py-0.5 rounded-md bg-white/20 font-mono text-[10px]">
              ENTER →
            </span>
          </button>
        </div>
      );
    }

    // V3: BRUTALIST TERMINAL BOOT LOG + BARCODE TICKET + SYSTEM DIAGNOSTICS
    if (variant === 'varient_3') {
      return (
        <div className="h-full w-full flex flex-col justify-between p-4 bg-[#FDE047] text-black font-mono select-none">
          <div className="border-2 border-black bg-white p-2.5 shadow-[4px_4px_0px_#000] flex items-center justify-between text-[10px] font-black">
            <span>SYS_BOOT // NOVACART_OS</span>
            <span className="bg-black text-white px-1.5 py-0.5">REV_03</span>
          </div>

          <div className="my-auto space-y-3">
            <div className="border-4 border-black bg-white p-4 shadow-[6px_6px_0px_#000]">
              <div className="text-[10px] font-black uppercase bg-black text-white inline-block px-2 py-0.5">
                RAW DIRECT WHOLESALE
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tighter leading-none mt-2">
                NO FEES.
                <br />
                JUST GOODS.
              </h1>
              <div className="mt-3 pt-2 border-t-2 border-dashed border-black text-[10px] space-y-1">
                <div>[OK] CDN_EDGE_DHAKA_01 ... 12ms</div>
                <div>[OK] BKASH_MFS_GATEWAY ... ONLINE</div>
                <div>[OK] FLASH_INVENTORY_LOCK ... 99.4%</div>
              </div>
            </div>

            {/* Simulated Barcode Strip */}
            <div className="border-2 border-black bg-white p-3 shadow-[4px_4px_0px_#000] flex items-center justify-between">
              <div className="flex gap-0.5 h-8 items-stretch">
                {[3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2, 4].map((w, i) => (
                  <div
                    key={i}
                    className="bg-black"
                    style={{ width: `${w * 2}px` }}
                  />
                ))}
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black">PASS #NC-2026</div>
                <div className="text-[9px]">VERIFIED MEMBER</div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('OnboardingWalkthrough')}
            className="w-full py-3.5 border-3 border-black bg-black text-[#FDE047] font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_#fff] cursor-pointer"
          >
            [ INITIALIZE_WORKSPACE ] →
          </button>
        </div>
      );
    }

    // V4: LUXURY FULL-BLEED EDITORIAL MAGAZINE COVER WITH FLOATING GLASS VIP PASS
    if (variant === 'varient_4') {
      return (
        <div className="h-full w-full relative overflow-hidden flex flex-col justify-between p-5 text-white select-none">
          <img
            src={CUSTOM_ECOMMERCE_PRODUCTS[1].image}
            alt="Luxury Cover"
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/95" />

          <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-3">
            <span className="text-xs font-serif tracking-[0.3em] uppercase">MAISON NOVA</span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border border-amber-400/50 text-amber-300">
              Private Client Edition
            </span>
          </div>

          <div className="relative z-10 my-auto space-y-3">
            <div className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-bold">
              Autumn / Winter Archive
            </div>
            <h1 className="text-3xl font-serif font-light tracking-tight leading-tight">
              Horology, Couture &amp; Objects of Craft.
            </h1>
          </div>

          {/* Floating Glass VIP Member Card */}
          <div className="relative z-10 p-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Fingerprint size={20} className="text-amber-300" />
                <div>
                  <div className="text-xs font-bold">Biometric Vault Ready</div>
                  <div className="text-[10px] text-white/70">Concierge White-Glove Delivery</div>
                </div>
              </div>
              <Award size={18} className="text-amber-300" />
            </div>
            <button
              type="button"
              onClick={() => onNavigate('OnboardingWalkthrough')}
              className="w-full py-2.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-black tracking-wide uppercase cursor-pointer"
            >
              Enter Private Salon
            </button>
          </div>
        </div>
      );
    }

    // V5: ATELIER SPLIT VERTICAL SPINE + CURATED SEASONAL CHAPTER SELECTOR
    if (variant === 'varient_5') {
      return (
        <div className="h-full w-full flex select-none">
          {/* Left Vertical Architectural Spine */}
          <div
            className="w-14 h-full flex flex-col items-center justify-between py-5 text-white"
            style={{ backgroundColor: primaryColor }}
          >
            <ShoppingBag size={18} />
            <div
              className="text-[10px] font-mono font-extrabold tracking-[0.25em] uppercase"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              ATELIER NOVACART · VOL 05
            </div>
            <span className="text-[10px] font-mono">01/18</span>
          </div>

          {/* Right Split Editorial Content */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase opacity-50">
                CHAPTER INDEX · SELECT DEPARTMENT
              </span>
              <h2 className="text-lg font-black tracking-tight">
                Curated Design &amp; Daily Essentials
              </h2>
            </div>

            <div className="space-y-2 my-auto">
              {[
                { idx: '01', name: 'Acoustic & Studio Tech', count: '140 Objects', img: CUSTOM_ECOMMERCE_PRODUCTS[0].image },
                { idx: '02', name: 'Minimalist Horology', count: '85 Objects', img: CUSTOM_ECOMMERCE_PRODUCTS[1].image },
                { idx: '03', name: 'Botanical Apothecary', count: '210 Objects', img: CUSTOM_ECOMMERCE_PRODUCTS[3].image },
              ].map((ch) => (
                <div
                  key={ch.idx}
                  onClick={() => onNavigate('OnboardingWalkthrough')}
                  className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center gap-3 cursor-pointer hover:border-current transition"
                >
                  <span className="text-xs font-mono font-black opacity-40">{ch.idx}</span>
                  <img src={ch.img} alt="" className="w-11 h-11 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-extrabold truncate">{ch.name}</div>
                    <div className="text-[10px] opacity-60">{ch.count}</div>
                  </div>
                  <ArrowRight size={13} />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('OnboardingWalkthrough')}
              className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              Explore Full Lookbook →
            </button>
          </div>
        </div>
      );
    }

    // V6: HIGH-CONVERSION FLASH DROP COUNTDOWN + SCRATCH VOUCHER + GUEST ENTRY
    return (
      <div className="h-full w-full flex flex-col justify-between p-4 select-none">
        <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between">
          <span className="text-[11px] font-black text-rose-500 flex items-center gap-1">
            <Zap size={13} /> LIVE DROP IN PROGRESS
          </span>
          <span className="font-mono text-xs font-black bg-rose-600 text-white px-2 py-0.5 rounded-md">
            02:14:55
          </span>
        </div>

        <div className="my-auto space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[11px] font-extrabold">
            🎁 Welcome Mystery Voucher Unlocked!
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            Claim $25 OFF Your First Express Order
          </h1>

          {/* Interactive Voucher Ticket */}
          <div
            className="p-4 rounded-2xl border-2 border-dashed text-left space-y-2 relative overflow-hidden"
            style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}10` }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-extrabold uppercase opacity-70">
                NEW USER PROMO PASS
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-black">
                ACTIVE
              </span>
            </div>
            <div className="text-xl font-black" style={{ color: primaryColor }}>
              CODE: FIRST25
            </div>
            <div className="text-[11px] opacity-75">
              Valid on Sony, Nordic Time &amp; 200+ official brands for the next 30 minutes.
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onNavigate('HomeDashboard')}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white shadow-lg cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            ⚡ Instant Guest Shop (Apply $25 OFF)
          </button>
          <button
            type="button"
            onClick={() => onNavigate('OnboardingWalkthrough')}
            className="w-full py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-bold cursor-pointer"
          >
            Take 30-Sec Tour First
          </button>
        </div>
      </div>
    );
  }

  // ============================================================================
  // 2. ONBOARDING / WALKTHROUGH — 6 DISTINCT LAYOUTS & INTERACTIVE FEATURES
  // ============================================================================
  if (screenId === 'OnboardingWalkthrough') {
    const slides = [
      {
        badge: 'STEP 01 · EXPRESS LOGISTICS',
        title: '60-Minute Rapid Doorstep Delivery',
        desc: 'Real-time GPS courier tracking from local fulfillment hubs straight to your apartment door.',
        icon: Truck,
        img: CUSTOM_ECOMMERCE_PRODUCTS[2].image,
      },
      {
        badge: 'STEP 02 · AUTHENTIC CATALOG',
        title: '100% Verified Official Brands',
        desc: 'Direct brand-authorized inventory with instant warranty registration and 7-day easy returns.',
        icon: ShieldCheck,
        img: CUSTOM_ECOMMERCE_PRODUCTS[0].image,
      },
      {
        badge: 'STEP 03 · FRICTIONLESS PAY',
        title: '1-Tap MFS, Cards & Cash on Delivery',
        desc: 'Pay seamlessly via bKash, Nagad, Apple Pay, Visa/Mastercard, or pay cash at your doorstep.',
        icon: CreditCard,
        img: CUSTOM_ECOMMERCE_PRODUCTS[1].image,
      },
    ];
    const currentSlide = slides[walkthroughStep % slides.length];
    const SlideIcon = currentSlide.icon;

    // V1: KEEP ORIGINAL 4-SLIDE CAROUSEL
    if (variant === 'varient_1') {
      return (
        <div className="h-full w-full flex flex-col justify-between p-5 select-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setWalkthroughStep(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    walkthroughStep === idx ? 'w-7' : 'w-2 opacity-30 bg-current'
                  }`}
                  style={walkthroughStep === idx ? { backgroundColor: primaryColor } : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => onNavigate('SignUpLogin')}
              className="text-xs font-bold opacity-70 hover:opacity-100 cursor-pointer"
            >
              Skip
            </button>
          </div>

          <div className="my-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 space-y-4 shadow-xs">
            <div className="relative h-48 rounded-xl overflow-hidden">
              <img src={currentSlide.img} alt={currentSlide.title} className="w-full h-full object-cover" />
              <div
                className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-extrabold text-white flex items-center gap-1.5 shadow"
                style={{ backgroundColor: primaryColor }}
              >
                <SlideIcon size={12} />
                <span>{currentSlide.badge}</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <h2 className="text-lg font-black tracking-tight leading-snug">{currentSlide.title}</h2>
              <p className="text-xs opacity-70 leading-relaxed">{currentSlide.desc}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setWalkthroughStep((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
              className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() =>
                walkthroughStep < slides.length - 1
                  ? setWalkthroughStep((p) => p + 1)
                  : onNavigate('SignUpLogin')
              }
              className="flex-1 py-3 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <span>Next Step ({walkthroughStep + 1}/{slides.length})</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      );
    }

    // V2: INTERACTIVE SHOPPING PERSONA & CATEGORY PERSONALIZATION QUIZ
    if (variant === 'varient_2') {
      const interests = [
        { name: 'Audio Tech', emoji: '🎧', perks: 'Early Flash Drops' },
        { name: 'Sneakers', emoji: '👟', perks: 'Size Lock Guarantee' },
        { name: 'Luxury Watches', emoji: '⌚', perks: 'Certified Vault' },
        { name: 'Glow Skincare', emoji: '✨', perks: 'Free Samples' },
        { name: 'Barista Home', emoji: '☕', perks: 'Bundle Discounts' },
        { name: 'Italian Bags', emoji: '👜', perks: 'VIP Concierge' },
      ];
      return (
        <div className="h-full w-full flex flex-col justify-between p-4 select-none">
          <div>
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase"
              style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
            >
              Bento Personalization · Step 2/2
            </span>
            <h1 className="text-lg font-black mt-1">Tailor Your Home Feed</h1>
            <p className="text-xs opacity-65">
              Pick 2+ categories to unlock personalized daily deals:
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 my-auto">
            {interests.map((item) => {
              const picked = selectedInterests.includes(item.name);
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() =>
                    setSelectedInterests((prev) =>
                      prev.includes(item.name)
                        ? prev.filter((i) => i !== item.name)
                        : [...prev, item.name]
                    )
                  }
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer relative ${
                    picked
                      ? 'border-2 bg-indigo-500/10'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'
                  }`}
                  style={picked ? { borderColor: primaryColor } : undefined}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{item.emoji}</span>
                    {picked && (
                      <span
                        className="w-4 h-4 rounded-full text-white flex items-center justify-center"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <Check size={10} />
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-extrabold mt-1.5">{item.name}</div>
                  <div className="text-[10px] opacity-60">{item.perks}</div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('SignUpLogin')}
            className="w-full py-3 rounded-2xl text-xs font-extrabold text-white shadow-md cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Build My Custom Feed ({selectedInterests.length} Selected) →
          </button>
        </div>
      );
    }

    // V3: BRUTALIST MANIFESTO CHECKLIST + FEE COMPARISON LEDGER
    if (variant === 'varient_3') {
      return (
        <div className="h-full w-full flex flex-col justify-between p-4 font-mono select-none">
          <div className="border-2 border-current p-2.5 flex items-center justify-between text-xs font-black">
            <span>WHY_NOVACART.TXT</span>
            <span>[3 RULES]</span>
          </div>

          <div className="space-y-3 my-auto">
            {[
              { no: '01', title: '0% MIDDLEMAN MARKUP', sub: 'Factory-direct pricing verified daily.' },
              { no: '02', title: '60-MIN SLA OR FREE', sub: 'Late courier arrival = $10 instant credit.' },
              { no: '03', title: 'NO-QUESTIONS RETURN', sub: 'Instant doorstep pickup within 7 days.' },
            ].map((rule) => (
              <div
                key={rule.no}
                className="border-2 border-current p-3 bg-white dark:bg-neutral-900 shadow-[4px_4px_0px_currentColor]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black px-1.5 py-0.5 bg-amber-300 text-black">
                    RULE #{rule.no}
                  </span>
                  <Check size={15} />
                </div>
                <div className="text-sm font-black mt-1.5">{rule.title}</div>
                <div className="text-[11px] opacity-75 mt-0.5">{rule.sub}</div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('SignUpLogin')}
            className="w-full py-3.5 border-2 border-current font-black text-xs uppercase shadow-[4px_4px_0px_currentColor] text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            I ACCEPT THE MANIFESTO →
          </button>
        </div>
      );
    }

    // V4: FULL-SCREEN TIKTOK/REELS STORY PLAYER WITH PROGRESS BARS
    if (variant === 'varient_4') {
      return (
        <div className="h-full w-full relative overflow-hidden flex flex-col justify-between p-4 text-white select-none">
          <img
            src={currentSlide.img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />

          {/* Story Progress Bars */}
          <div className="relative z-10 space-y-2">
            <div className="grid grid-cols-3 gap-1.5">
              {slides.map((_, idx) => (
                <div key={idx} className="h-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-white ${idx <= walkthroughStep ? 'w-full' : 'w-0'}`}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center">
                  <Play size={10} className="fill-white" />
                </span>
                <span>@novacart.official · Reel {walkthroughStep + 1}/3</span>
              </span>
              <button
                type="button"
                onClick={() => onNavigate('SignUpLogin')}
                className="px-2 py-0.5 rounded-full bg-white/20 text-[10px]"
              >
                Skip
              </button>
            </div>
          </div>

          {/* Bottom Story Overlay */}
          <div className="relative z-10 space-y-3">
            <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur text-[10px] font-extrabold uppercase">
              {currentSlide.badge}
            </span>
            <h2 className="text-2xl font-black leading-tight">{currentSlide.title}</h2>
            <p className="text-xs text-white/80">{currentSlide.desc}</p>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setWalkthroughStep((s) => (s + 1) % slides.length)}
                className="px-4 py-3 rounded-xl bg-white/20 backdrop-blur text-xs font-extrabold cursor-pointer"
              >
                Next Story
              </button>
              <button
                type="button"
                onClick={() => onNavigate('SignUpLogin')}
                className="flex-1 py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              >
                Start Shopping →
              </button>
            </div>
          </div>
        </div>
      );
    }

    // V5: VERTICAL TIMELINE ROADMAP (HOW YOUR ORDER TRAVELS)
    if (variant === 'varient_5') {
      return (
        <div className="h-full w-full flex flex-col justify-between p-5 select-none">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">
              ATELIER LOGISTICS BLUEPRINT
            </span>
            <h1 className="text-lg font-black mt-0.5">How NovaCart Works in 3 Steps</h1>
          </div>

          <div className="my-auto space-y-4 border-l-2 pl-4 ml-2" style={{ borderColor: primaryColor }}>
            {slides.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={s.badge} className="relative space-y-1">
                  <div
                    className="w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-black absolute -left-[29px] top-0"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-extrabold">
                    <Icon size={13} style={{ color: primaryColor }} />
                    <span>{s.title}</span>
                  </div>
                  <p className="text-[11px] opacity-70 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('SignUpLogin')}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Continue to Member Sign-In →
          </button>
        </div>
      );
    }

    // V6: COMPACT SPLIT COMPARISON TABLE (NOVACART VS TRADITIONAL APPS)
    return (
      <div className="h-full w-full flex flex-col justify-between p-4 select-none">
        <div>
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500">
            Smart Shopper Comparison
          </span>
          <h1 className="text-lg font-black mt-1">Why 1.2M+ Shoppers Switched</h1>
        </div>

        <div className="my-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden text-xs">
          <div className="grid grid-cols-3 bg-neutral-100 dark:bg-neutral-800 p-2.5 font-black text-[11px]">
            <span>Feature</span>
            <span className="text-center" style={{ color: primaryColor }}>
              NovaCart
            </span>
            <span className="text-center opacity-50">Others</span>
          </div>
          {[
            ['Delivery Speed', '45 Mins ⚡', '3–5 Days'],
            ['Brand Warranty', '100% Official ✓', 'Unverified'],
            ['Hidden Markup', '$0 Fee ✓', '+25% Fee'],
            ['Return Policy', 'Instant Doorstep', '14-Day Wait'],
          ].map(([feat, us, them]) => (
            <div
              key={feat}
              className="grid grid-cols-3 p-2.5 border-t border-neutral-200 dark:border-neutral-800 items-center text-[11px]"
            >
              <span className="font-bold">{feat}</span>
              <span className="text-center font-extrabold text-emerald-500">{us}</span>
              <span className="text-center opacity-50">{them}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onNavigate('SignUpLogin')}
          className="w-full py-3 rounded-xl text-xs font-extrabold text-white shadow-md cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          Unlock Zero-Fee Shopping →
        </button>
      </div>
    );
  }

  // ============================================================================
  // 3. SIGN UP / LOGIN — 6 DISTINCT AUTHENTICATION INTERFACES
  // ============================================================================
  if (screenId === 'SignUpLogin') {
    // V1: KEEP ORIGINAL PHONE OTP + EMAIL + SOCIAL
    if (variant === 'varient_1') {
      return (
        <div className="h-full w-full flex flex-col justify-between p-5 overflow-y-auto no-scrollbar select-none space-y-4">
          <div className="space-y-1">
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
              style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
            >
              Frictionless Entry
            </span>
            <h1 className="text-xl font-black tracking-tight pt-1">Welcome to NovaCart</h1>
            <p className="text-xs opacity-70">
              Sign in with Phone OTP verification, Email/Password, or 1-tap Social Login.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            <button
              type="button"
              onClick={() => setAuthTab('phone')}
              className={`py-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                authTab === 'phone' ? 'text-white shadow-xs' : 'opacity-70'
              }`}
              style={authTab === 'phone' ? { backgroundColor: primaryColor } : undefined}
            >
              <Phone size={13} />
              <span>Phone + OTP</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthTab('email')}
              className={`py-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                authTab === 'email' ? 'text-white shadow-xs' : 'opacity-70'
              }`}
              style={authTab === 'email' ? { backgroundColor: primaryColor } : undefined}
            >
              <Mail size={13} />
              <span>Email / Pass</span>
            </button>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 space-y-3.5">
            {authTab === 'phone' ? (
              <>
                <div>
                  <label className="block text-[11px] font-extrabold mb-1 opacity-80">
                    Mobile Number (Instant SMS OTP)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="flex-1 px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-xs font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => setOtpSent(true)}
                      className="px-3 py-2.5 rounded-xl text-[11px] font-extrabold text-white cursor-pointer"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Send OTP
                    </button>
                  </div>
                </div>
                {otpSent && (
                  <div className="grid grid-cols-6 gap-1.5">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const next = [...otpDigits];
                          next[idx] = e.target.value;
                          setOtpDigits(next);
                        }}
                        className="h-10 rounded-xl border-2 text-center text-sm font-black bg-transparent"
                        style={{ borderColor: primaryColor }}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-3">
                <input
                  type="email"
                  defaultValue="alex.morgan@novacart.io"
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-xs font-semibold"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => onNavigate('ForgotPasswordPin')}
                    className="text-[11px] font-bold cursor-pointer"
                    style={{ color: primaryColor }}
                  >
                    Forgot Password / PIN?
                  </button>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => onNavigate('HomeDashboard')}
              className="w-full py-3 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <span>Verify &amp; Enter Store</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {['Apple ID', 'Google', 'Facebook'].map((provider) => (
              <button
                key={provider}
                type="button"
                onClick={() => onNavigate('HomeDashboard')}
                className="py-2.5 px-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-[11px] font-bold cursor-pointer"
              >
                {provider}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // V2: BENTO BIOMETRIC PASSKEY + WHATSAPP 1-TAP + QR DESKTOP HANDOFF
    if (variant === 'varient_2') {
      return (
        <div className="h-full w-full flex flex-col justify-between p-4 select-none space-y-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase opacity-60">
              BENTO PASSWORDLESS HUB
            </span>
            <h1 className="text-lg font-black">1-Tap Instant Access</h1>
          </div>

          <div className="grid grid-cols-2 gap-2.5 my-auto">
            <button
              type="button"
              onClick={() => onNavigate('HomeDashboard')}
              className="col-span-2 p-4 rounded-3xl text-white flex items-center justify-between shadow-md cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="text-left">
                <div className="text-xs font-black">Sign In with FaceID / Passkey</div>
                <div className="text-[10px] opacity-80">Hardware-backed biometric token</div>
              </div>
              <Fingerprint size={28} />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('HomeDashboard')}
              className="p-3.5 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 text-left space-y-2 cursor-pointer"
            >
              <Phone size={18} className="text-emerald-500" />
              <div>
                <div className="text-xs font-extrabold">WhatsApp Direct</div>
                <div className="text-[10px] opacity-65">Instant verified magic link</div>
              </div>
            </button>

            <div className="p-3.5 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col justify-between">
              <QrCode size={22} style={{ color: primaryColor }} />
              <div>
                <div className="text-xs font-extrabold">Scan Desktop QR</div>
                <div className="text-[10px] opacity-65">Sync active web cart</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => onNavigate('ForgotPasswordPin')}
              className="font-bold opacity-70 cursor-pointer"
            >
              Recovery PIN?
            </button>
            <button
              type="button"
              onClick={() => onNavigate('HomeDashboard')}
              className="font-extrabold cursor-pointer"
              style={{ color: primaryColor }}
            >
              Continue as Guest →
            </button>
          </div>
        </div>
      );
    }

    // V3: BRUTALIST CRYPTOGRAPHIC LEDGER AUTHENTICATION
    if (variant === 'varient_3') {
      return (
        <div className="h-full w-full flex flex-col justify-between p-4 font-mono select-none">
          <div className="border-2 border-current p-2 bg-amber-300 text-black font-black text-xs">
            AUTH_GATEWAY // ZERO_FRICTION
          </div>

          <div className="border-2 border-current p-4 bg-white dark:bg-neutral-900 shadow-[5px_5px_0px_currentColor] space-y-3 my-auto">
            <div className="text-sm font-black uppercase">MEMBER CREDENTIALS</div>
            <div>
              <label className="block text-[10px] font-bold uppercase mb-1">PHONE_OR_HANDLE</label>
              <input
                type="text"
                defaultValue="+8801711892400"
                className="w-full p-2 border-2 border-current bg-transparent text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase mb-1">6_DIGIT_TOKEN</label>
              <input
                type="text"
                defaultValue="482-916"
                className="w-full p-2 border-2 border-current bg-transparent text-sm font-black tracking-widest"
              />
            </div>
            <button
              type="button"
              onClick={() => onNavigate('HomeDashboard')}
              className="w-full py-3 border-2 border-black bg-emerald-400 text-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] cursor-pointer"
            >
              [ AUTHORIZE SESSION ]
            </button>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('ForgotPasswordPin')}
            className="w-full py-2 border-2 border-current text-[11px] font-black uppercase cursor-pointer"
          >
            RESET_SECURITY_PIN_VAULT
          </button>
        </div>
      );
    }

    // V4: LUXURY VIP CONCIERGE INVITATION & MEMBERSHIP CARD
    if (variant === 'varient_4') {
      return (
        <div className="h-full w-full flex flex-col justify-between p-5 bg-[#090D16] text-white select-none">
          <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-amber-300">
            <span>PRIVÉ ACCESS</span>
            <span>TIER · BLACK CARD</span>
          </div>

          <div className="my-auto space-y-4">
            <div className="p-4 rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/20 via-slate-900 to-black space-y-3 shadow-2xl">
              <div className="flex justify-between items-center">
                <span className="text-xs font-serif tracking-widest text-amber-200">
                  MAISON NOVACART
                </span>
                <Sparkles size={15} className="text-amber-300" />
              </div>
              <div className="font-mono text-sm tracking-widest text-amber-100">
                •••• •••• •••• 8924
              </div>
              <div className="text-[10px] text-white/70">
                Complimentary Express Courier &amp; Private Preview Access
              </div>
            </div>

            <div className="space-y-2.5">
              <input
                type="text"
                defaultValue="alex.morgan@privé.io"
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-xs text-white"
              />
              <button
                type="button"
                onClick={() => onNavigate('HomeDashboard')}
                className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                Unlock Private Showroom
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('ForgotPasswordPin')}
            className="text-[11px] text-white/60 underline text-center cursor-pointer"
          >
            Request Concierge PIN Recovery
          </button>
        </div>
      );
    }

    // V5: ATELIER SPLIT REGISTER VS SIGN IN ACCORDION SHEET
    if (variant === 'varient_5') {
      return (
        <div className="h-full w-full flex flex-col justify-between p-4 select-none space-y-3">
          <div className="border-l-4 pl-3" style={{ borderColor: primaryColor }}>
            <div className="text-[10px] font-mono uppercase opacity-60">ATELIER IDENTITY</div>
            <h1 className="text-base font-black">Member Account Portal</h1>
          </div>

          <div className="space-y-2.5 my-auto">
            <div className="p-3.5 rounded-2xl border-2 space-y-2.5" style={{ borderColor: primaryColor }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black">Existing Member Sign-In</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 font-bold">
                  Instant OTP
                </span>
              </div>
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-xs font-bold"
              />
              <button
                type="button"
                onClick={() => onNavigate('HomeDashboard')}
                className="w-full py-2.5 rounded-xl text-xs font-extrabold text-white cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              >
                Continue with Mobile →
              </button>
            </div>

            <div className="p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="text-xs font-extrabold">New to NovaCart? Create Profile</div>
              <p className="text-[11px] opacity-65">
                Get $25 welcome credit + free delivery on your first 3 orders.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('HomeDashboard')}
                className="w-full py-2 rounded-xl border border-current text-xs font-extrabold cursor-pointer"
              >
                Register New Account
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('ForgotPasswordPin')}
            className="text-xs font-bold text-center opacity-70 cursor-pointer"
          >
            Forgot PIN or Password?
          </button>
        </div>
      );
    }

    // V6: FULL NUMERIC TACTILE KEYPAD DIALER FOR 1-HANDED PHONE OTP
    return (
      <div className="h-full w-full flex flex-col justify-between p-4 select-none">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-500">
            One-Handed Speed Dialer
          </span>
          <h2 className="text-sm font-black">Enter Mobile for Instant OTP</h2>
          <div
            className="text-xl font-mono font-black tracking-wider py-1"
            style={{ color: primaryColor }}
          >
            +880 {dialedDigits || '••••••••••'}
          </div>
        </div>

        {/* Tactile 12-Key Numeric Pad */}
        <div className="grid grid-cols-3 gap-2 my-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setDialedDigits((d) => (d.length < 10 ? d + num : d))}
              className="h-11 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-base font-black hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setDialedDigits('')}
            className="h-11 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-[10px] font-extrabold cursor-pointer"
          >
            CLEAR
          </button>
          <button
            type="button"
            onClick={() => setDialedDigits((d) => (d.length < 10 ? d + '0' : d))}
            className="h-11 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-base font-black cursor-pointer"
          >
            0
          </button>
          <button
            type="button"
            onClick={() => setDialedDigits((d) => d.slice(0, -1))}
            className="h-11 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-center cursor-pointer"
          >
            <Delete size={16} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('HomeDashboard')}
          className="w-full py-3 rounded-xl text-xs font-extrabold text-white shadow-md cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          Send SMS Code &amp; Login →
        </button>
      </div>
    );
  }

  // ============================================================================
  // 4. FORGOT PASSWORD / RESET PIN — 6 DISTINCT RECOVERY FLOWS
  // ============================================================================
  // V1: KEEP ORIGINAL
  if (variant === 'varient_1') {
    return (
      <div className="h-full w-full flex flex-col justify-between p-5 select-none space-y-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('SignUpLogin')}
            className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 cursor-pointer"
          >
            <ChevronLeft size={15} />
          </button>
          <span className="text-xs font-extrabold">Security Recovery (V1)</span>
          <KeyRound size={16} style={{ color: primaryColor }} />
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 space-y-4 my-auto">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-white flex-shrink-0"
              style={{ backgroundColor: primaryColor }}
            >
              <Fingerprint size={22} />
            </div>
            <div>
              <h2 className="text-base font-black">Forgot Password / Reset PIN</h2>
              <p className="text-[11px] opacity-70">
                Verify 4-digit security OTP &amp; create your new credentials
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {['7', '3', '9', '2'].map((d, i) => (
              <div
                key={i}
                className="h-11 rounded-xl border-2 flex items-center justify-center text-base font-black"
                style={{ borderColor: primaryColor }}
              >
                {d}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-[11px] font-bold mb-1 opacity-80">
              Set 4-Digit Quick Checkout PIN
            </label>
            <input
              type="text"
              maxLength={4}
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-xs font-mono font-black tracking-widest"
            />
          </div>

          <button
            type="button"
            onClick={() => onNavigate('SignUpLogin')}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            <Check size={14} />
            <span>Update Password &amp; Login</span>
          </button>
        </div>
      </div>
    );
  }

  // V2: MULTI-CHANNEL RECOVERY SELECTOR (WHATSAPP / SMS / BACKUP EMAIL)
  if (variant === 'varient_2') {
    return (
      <div className="h-full w-full flex flex-col justify-between p-4 select-none">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('SignUpLogin')}
            className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="text-xs font-black">Bento Recovery Hub</span>
          <ShieldCheck size={16} className="text-emerald-500" />
        </div>

        <div className="space-y-2.5 my-auto">
          <div className="text-xs font-extrabold">Choose Verification Delivery Channel:</div>
          {[
            { id: 'whatsapp', label: 'WhatsApp Encrypted Push', sub: '+880 17•••400 (Instant)', badge: 'Fastest' },
            { id: 'sms', label: 'Cellular SMS Gateway', sub: '+880 17•••400 (15s)', badge: 'Standard' },
            { id: 'email', label: 'Recovery Email Link', sub: 'al•••@novacart.io', badge: 'Backup' },
          ].map((ch) => {
            const active = recoveryChannel === ch.id;
            return (
              <div
                key={ch.id}
                onClick={() => setRecoveryChannel(ch.id as any)}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer ${
                  active ? 'border-2 bg-indigo-500/10' : 'border-neutral-200 dark:border-neutral-800'
                }`}
                style={active ? { borderColor: primaryColor } : undefined}
              >
                <div>
                  <div className="text-xs font-extrabold">{ch.label}</div>
                  <div className="text-[10px] opacity-65">{ch.sub}</div>
                </div>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: active ? primaryColor : '#64748B' }}
                >
                  {ch.badge}
                </span>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onNavigate('SignUpLogin')}
          className="w-full py-3 rounded-2xl text-xs font-extrabold text-white cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          Send Recovery Token via {recoveryChannel.toUpperCase()} →
        </button>
      </div>
    );
  }

  // V3: BRUTALIST PASSWORD ENTROPY & SECURITY VAULT AUDITOR
  if (variant === 'varient_3') {
    return (
      <div className="h-full w-full flex flex-col justify-between p-4 font-mono select-none">
        <div className="border-2 border-current p-2 bg-rose-500 text-white font-black text-xs">
          SECURITY_RESET // PIN_OVERRIDE
        </div>

        <div className="border-2 border-current p-4 bg-white dark:bg-neutral-900 shadow-[4px_4px_0px_currentColor] space-y-3 my-auto">
          <div className="text-xs font-black">ENTROPY STRENGTH: 98/100 [MIL-SPEC]</div>
          <div className="grid grid-cols-4 gap-1 h-2">
            <div className="bg-emerald-500" />
            <div className="bg-emerald-500" />
            <div className="bg-emerald-500" />
            <div className="bg-emerald-500" />
          </div>
          <div className="space-y-1 text-[10px]">
            <div>[X] 12+ CHARACTERS VERIFIED</div>
            <div>[X] HARDWARE DEVICE FINGERPRINT MATCH</div>
            <div>[X] NEW 4-DIGIT WALLET PIN: {newPin}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('SignUpLogin')}
          className="w-full py-3 border-2 border-black bg-amber-300 text-black font-black text-xs uppercase shadow-[4px_4px_0px_#000] cursor-pointer"
        >
          [ COMMIT NEW CREDENTIALS ]
        </button>
      </div>
    );
  }

  // V4: BIOMETRIC FACE-ID / PASSKEY HARDWARE ENROLLMENT
  if (variant === 'varient_4') {
    return (
      <div className="h-full w-full flex flex-col justify-between p-5 bg-[#090D16] text-white text-center select-none">
        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
          BIOMETRIC PASSKEY VAULT
        </span>
        <div className="my-auto space-y-4">
          <div
            className="w-24 h-24 rounded-full mx-auto border-2 border-emerald-400/50 bg-emerald-500/10 flex items-center justify-center animate-pulse"
          >
            <Fingerprint size={44} className="text-emerald-400" />
          </div>
          <h2 className="text-lg font-black">Skip Passwords Forever</h2>
          <p className="text-xs text-white/70">
            Bind your device FaceID / TouchID to replace your forgotten password and authorize 1-tap checkout.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('HomeDashboard')}
          className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black cursor-pointer"
        >
          Activate Biometric Passkey ✓
        </button>
      </div>
    );
  }

  // V5: 3-STEP horizontal WIZARD WITH SECURITY QUESTION & DEVICE TRUST
  if (variant === 'varient_5') {
    return (
      <div className="h-full w-full flex flex-col justify-between p-4 select-none">
        <div className="border-l-4 pl-3" style={{ borderColor: primaryColor }}>
          <div className="text-[10px] font-mono uppercase opacity-60">STEP 2 OF 3 · IDENTITY</div>
          <h2 className="text-base font-black">Verify Trusted Device</h2>
        </div>

        <div className="my-auto space-y-3">
          <div className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="text-[10px] font-bold uppercase opacity-60">Last Known Order Item</div>
            <div className="text-xs font-extrabold">✓ Sony WH-1000XM5 Headphones</div>
          </div>
          <div className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2">
            <label className="block text-[11px] font-extrabold">Enter New 6-Digit Wallet PIN</label>
            <input
              type="password"
              defaultValue="849201"
              className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-sm font-mono font-black tracking-widest"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('SignUpLogin')}
          className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          Save PIN &amp; Return to Login →
        </button>
      </div>
    );
  }

  // V6: COMPACT EMERGENCY ACCOUNT LOCK & INSTANT PIN DIALER
  return (
    <div className="h-full w-full flex flex-col justify-between p-4 select-none">
      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2.5">
        <AlertCircle size={18} className="text-amber-500 flex-shrink-0" />
        <div className="text-[11px] font-bold">
          Wallet Protected: $145.50 balance is frozen until new PIN is confirmed.
        </div>
      </div>

      <div className="my-auto space-y-3 text-center">
        <div className="text-xs font-extrabold">Tap to Generate Instant One-Time PIN</div>
        <div className="text-3xl font-mono font-black tracking-[0.35em]" style={{ color: primaryColor }}>
          {newPin}
        </div>
        <button
          type="button"
          onClick={() => setNewPin(String(Math.floor(1000 + Math.random() * 9000)))}
          className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-[11px] font-bold cursor-pointer"
        >
          🎲 Regenerate Random PIN
        </button>
      </div>

      <button
        type="button"
        onClick={() => onNavigate('HomeDashboard')}
        className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
        style={{ backgroundColor: primaryColor }}
      >
        Unlock Wallet &amp; Enter Store →
      </button>
    </div>
  );
};
