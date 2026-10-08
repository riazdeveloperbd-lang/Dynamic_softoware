import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Award,
  Headphones,
  Watch,
  BatteryCharging,
  Gamepad2,
  QrCode,
  Search,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface GadgetGhorHeroWarrantySerialSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface SerialCheckResult {
  serial: string;
  status: 'verified' | 'invalid';
  productName: string;
  batchCode: string;
  importOrigin: string;
  warrantyCoverage: string;
}

const SAMPLE_VERIFIED_SERIALS: Record<string, Omit<SerialCheckResult, 'serial' | 'status'>> = {
  'GG-2026-8841': {
    productName: 'SonicPulse Pro ANC + 38ms Gaming TWS Earbuds',
    batchCode: 'BD-AIR-2026-Q4',
    importOrigin: 'Shenzhen Global Official Warehouse (100% Original Master Carton)',
    warrantyCoverage: '7-Day Instant Replacement + 6-Month Official E-Warranty Active',
  },
  'GG-2026-9920': {
    productName: 'ApexFit Ultra 2.04" Super AMOLED Bluetooth Calling Watch',
    batchCode: 'BD-WATCH-2026-Q4',
    importOrigin: 'Official Brand Distributor Stock (Verified Seal)',
    warrantyCoverage: '7-Day Instant Replacement + 12-Month Official Display & Sensor Warranty',
  },
  'GG-2026-6500': {
    productName: 'BizliVolt 65W 3-Port GaN Fast Charger (MacBook + iPhone + Android)',
    batchCode: 'BD-GAN-2026-Q4',
    importOrigin: 'UL & CE Certified GaN Chipset Factory Direct',
    warrantyCoverage: '7-Day Instant Replacement + 12-Month Official Chipset Warranty',
  },
};

export const GadgetGhorHeroWarrantySerialSection: React.FC<
  GadgetGhorHeroWarrantySerialSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [serialInput, setSerialInput] = useState<string>('GG-2026-8841');
  const [verificationResult, setVerificationResult] = useState<SerialCheckResult | null>({
    serial: 'GG-2026-8841',
    status: 'verified',
    ...SAMPLE_VERIFIED_SERIALS['GG-2026-8841'],
  });

  const isCentered = variant === 'varient_2';
  const isBrutalist = variant === 'varient_3';

  const handleVerifySerial = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = serialInput.trim().toUpperCase();
    if (!clean) return;

    if (SAMPLE_VERIFIED_SERIALS[clean]) {
      setVerificationResult({
        serial: clean,
        status: 'verified',
        ...SAMPLE_VERIFIED_SERIALS[clean],
      });
    } else if (clean.startsWith('GG-') && clean.length >= 8) {
      setVerificationResult({
        serial: clean,
        status: 'verified',
        productName: 'GadgetGhor Authentic Global Variant Tech Gear',
        batchCode: 'BD-OFFICIAL-2026',
        importOrigin: '100% Original Imported Stock · Verified Hologram Sticker',
        warrantyCoverage: '7-Day Instant Replacement + 12-Month Official Warranty Active',
      });
    } else {
      setVerificationResult({
        serial: clean,
        status: 'invalid',
        productName: 'Unrecognized Serial / Master-Copy Alert',
        batchCode: 'N/A',
        importOrigin: 'Not found in GadgetGhor BD Official Import Registry',
        warrantyCoverage: 'Please check the 12-character code on our silver scratch hologram.',
      });
    }
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className={`relative overflow-hidden py-12 sm:py-16 lg:py-20 ${
        isDark
          ? 'bg-[#070B14] text-white'
          : 'bg-gradient-to-b from-slate-950 via-[#0B1120] to-slate-900 text-white'
      }`}
    >
      {/* Subtle Futuristic Tech Glow */}
      <div
        className="pointer-events-none absolute -top-28 right-1/4 w-[480px] h-[480px] rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: primaryColor }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 w-[380px] h-[380px] rounded-full blur-3xl opacity-15"
        style={{ backgroundColor: '#00F5D4' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* HERO MAIN GRID */}
        <div
          className={`grid grid-cols-1 ${
            isCentered ? 'max-w-4xl mx-auto text-center gap-10' : 'lg:grid-cols-12 gap-10 items-center'
          }`}
        >
          {/* Left Column: High-Energy Tech Copy + Warranty Badges + CTAs */}
          <div className={isCentered ? 'space-y-6' : 'lg:col-span-7 space-y-6'}>
            <div
              className={`inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 ${
                isCentered ? 'mx-auto' : ''
              }`}
            >
              <Zap size={14} className="text-cyan-400" />
              <EditableText
                id="gadgetghor_hero_eyebrow"
                defaultText="100% Original Global Variant · 7-Day Instant Replacement · Same-Day Dhaka COD"
              />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-black tracking-tight leading-[1.12] text-white">
              <EditableText
                id="gadgetghor_hero_h1"
                defaultText={
                  title ||
                  'নকল মাস্টার-কপি ও ওয়ারেন্টি ভোগান্তিকে বিদায় — আসল স্মার্ট গ্যাজেটে সুপারফাস্ট পারফরম্যান্স ও অফিশিয়াল ওয়ারেন্টি!'
                }
              />
            </h1>

            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-slate-300 max-w-2xl">
              <EditableText
                id="gadgetghor_hero_subtitle"
                defaultText={
                  subtitle ||
                  'ফুটপাত বা নামহীন পেজের সস্তা ক্লোন কিনে কয়েক দিনেই চার্জ না থাকা বা এক পাশের ইয়ারবাড নষ্ট হওয়ার দিন শেষ! GadgetGhor BD (গ্যাজেটঘর) দিচ্ছে ১০০% অরিজিনাল গ্লোবাল ভ্যারিয়েন্ট লো-লেটেন্সি TWS ইয়ারবাডস, Super AMOLED স্মার্টওয়াচ, 100W GaN ফাস্ট চার্জার ও মেকানিক্যাল কিবোর্ড — সাথে ৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট ও ১২ মাসের অফিশিয়াল ওয়ারেন্টি।'
                }
              />
            </p>

            {/* 4 Key Tech Performance Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-left">
              {[
                {
                  id: 'gg_hero_pt_1',
                  title: '38ms Ultra-Low Gaming Latency & 4-Mic ENC',
                  sub: 'PUBG/FreeFire গেমিংয়ে জিরো অডিও ল্যাগ এবং বাসে বা রাস্তায় ক্রিস্টাল-ক্লিয়ার কলিং।',
                },
                {
                  id: 'gg_hero_pt_2',
                  title: '7-Day Instant Box-to-Box Replacement',
                  sub: 'যেকোনো ম্যানুফ্যাকচারিং ত্রুটিতে মেরামত নয়—সরাসরি নতুন বক্স রিপ্লেসমেন্ট গ্যারান্টি।',
                },
                {
                  id: 'gg_hero_pt_3',
                  title: 'True 65W–100W GaN & PD 3.0 Fast Charging',
                  sub: 'মাত্র ৩০ মিনিটে আইফোন, স্যামসাং ও ম্যাকবুক ৭০% চার্জ—ওভারহিটিং প্রোটেকশনসহ।',
                },
                {
                  id: 'gg_hero_pt_4',
                  title: 'Open-Box Verification & Serial Check',
                  sub: 'ডেলিভারি ম্যানের সামনে বক্সের সিরিয়াল কোড মিলিয়ে ও প্রোডাক্ট অন করে পেমেন্ট করুন।',
                },
              ].map((pt) => (
                <div
                  key={pt.id}
                  className="p-3 rounded-xl border border-slate-800 bg-slate-900/75 flex items-start gap-2.5"
                >
                  <CheckCircle2
                    size={16}
                    className="shrink-0 mt-0.5 text-cyan-400"
                  />
                  <div>
                    <EditableText
                      id={`${pt.id}_t`}
                      defaultText={pt.title}
                      className="text-xs font-extrabold text-white block"
                    />
                    <EditableText
                      id={`${pt.id}_s`}
                      defaultText={pt.sub}
                      className="text-[11px] text-slate-400 mt-0.5 block"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Distinct Hero CTA Buttons */}
            <div
              className={`flex flex-wrap items-center gap-3.5 pt-2 ${
                isCentered ? 'justify-center' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => scrollToId('gadgetghor-catalog')}
                className={`px-6 py-4 text-xs sm:text-sm font-black text-white flex items-center gap-2.5 transition transform hover:-translate-y-0.5 cursor-pointer shadow-lg ${
                  isBrutalist
                    ? 'rounded-none border-2 border-cyan-300 shadow-[4px_4px_0px_#00F5D4]'
                    : 'rounded-2xl'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, #0891B2)`,
                }}
              >
                <ShoppingBag size={17} />
                <EditableText
                  id="gadgetghor_hero_primary_cta"
                  defaultText="অরিজিনাল গ্যাজেট কালেকশন দেখুন — ৳৯৯০ থেকে"
                />
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => scrollToId('gadgetghor-spec-matrix')}
                className="px-5 py-4 rounded-2xl text-xs sm:text-sm font-extrabold border border-slate-700 bg-slate-900/90 text-slate-100 hover:border-cyan-400 flex items-center gap-2 transition cursor-pointer"
              >
                <Zap size={16} className="text-cyan-400" />
                <EditableText
                  id="gadgetghor_hero_secondary_cta"
                  defaultText="লাইভ স্পেক তুলনা (Spec Matrix)"
                />
              </button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-cyan-400" />
                <span>
                  <strong className="font-black text-white">৬৫,০০০+</strong> ভেরিফাইড গ্যাজেট ডেলিভারি
                </span>
              </div>
              <span>•</span>
              <div>
                <strong className="font-black text-emerald-400">৪.৯৪ ★</strong> (৯,৪০০+ গেমার ও টেক রিভিউ)
              </div>
              <span>•</span>
              <div>
                <strong className="font-black text-white">Same-Day</strong> ঢাকা এক্সপ্রেস ডেলিভারি
              </div>
            </div>
          </div>

          {/* Right Column: Hero Ecosystem Bento Showcase */}
          {!isCentered && (
            <div className="lg:col-span-5">
              <div
                className={`p-4 sm:p-5 border border-slate-800 bg-slate-900/90 space-y-4 relative ${
                  isBrutalist
                    ? 'rounded-none border-2 border-cyan-400 shadow-[6px_6px_0px_#00F5D4]'
                    : 'rounded-3xl shadow-2xl'
                }`}
              >
                {/* Floating Official Warranty Pill */}
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[11px] font-black uppercase tracking-wider text-cyan-300">
                      GLOBAL VARIANT ECOSYSTEM 2026
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    100% Original Seal
                  </span>
                </div>

                {/* Main Product Image Card */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950 border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=85"
                    alt="GadgetGhor BD Smart Tech Ecosystem — TWS Earbuds, AMOLED Smartwatch & GaN Charger"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span
                      className="px-2.5 py-1 rounded-lg text-[10px] font-black text-white shadow-md"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Bluetooth 5.4 · 38ms Gaming Mode
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-slate-950/85 text-cyan-300 border border-cyan-400/30">
                      Super AMOLED 1000 Nits
                    </span>
                  </div>

                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400">
                        FLASH COMBO DEAL (SAVE ৳900)
                      </div>
                      <div className="text-xs sm:text-sm font-black text-white">
                        SonicPulse ANC TWS + ApexFit AMOLED Watch
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] line-through text-slate-400 block">
                        ৳৫,৩৮০
                      </span>
                      <span className="text-sm sm:text-base font-black text-emerald-400">
                        ৳৪,৪৮০
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mini Category Quick Grid */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { icon: Headphones, label: 'ENC TWS', spec: '45H Play' },
                    { icon: Watch, label: 'AMOLED', spec: 'IP68 Waterproof' },
                    { icon: BatteryCharging, label: '100W GaN', spec: 'PD 3.0 Fast' },
                    { icon: Gamepad2, label: 'Mech RGB', spec: 'Hot-Swap' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-1"
                      >
                        <Icon size={16} className="mx-auto text-cyan-400" />
                        <div className="text-[11px] font-extrabold text-white">
                          {item.label}
                        </div>
                        <div className="text-[9px] font-semibold text-slate-400">
                          {item.spec}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MANDATORY SECTION: BOLD OFFICIAL BRAND WARRANTY CALLOUT BANNER + SERIAL / IMEI VERIFICATION TOOL */}
        <div
          id="gadgetghor-serial-verify"
          className="rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-r from-slate-900 via-[#0B1528] to-slate-900 p-6 sm:p-8 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Cols: 7-Day Replacement & 6/12 Month Official Warranty Callout */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase tracking-wider">
                <ShieldCheck size={15} />
                <EditableText
                  id="gadgetghor_warranty_badge_pill"
                  defaultText="OFFICIAL BRAND WARRANTY GUARANTEE · জিরো-হ্যাসেল রিপ্লেসমেন্ট"
                />
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
                <EditableText
                  id="gadgetghor_warranty_title"
                  defaultText="৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট গ্যারান্টি ও ৬/১২ মাসের অফিশিয়াল ওয়ারেন্টি!"
                />
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <EditableText
                  id="gadgetghor_warranty_desc"
                  defaultText="বাংলাদেশে অনলাইনে গ্যাজেট কেনার সবচেয়ে বড় ভয় হলো—'কেনার পর নষ্ট হলে দোকানদার আর ফোন ধরে না!' গ্যাজেটঘর বিডিতে প্রতিটি প্রোডাক্টের সাথে থাকছে ডিজিটাল সিরিয়াল ওয়ারেন্টি কার্ড। ডেলিভারির পর ৭ দিনের মধ্যে যেকোনো ম্যানুফ্যাকচারিং সমস্যা পেলে আমরা প্রোডাক্ট মেরামত করি না—সরাসরি নতুন সিলড বক্স রিপ্লেস করে দিই!"
                />
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {[
                  {
                    step: 'STEP 01',
                    title: '৭ দিনের বক্স-টু-বক্স চেঞ্জ',
                    desc: 'চার্জিং, ব্লুটুথ বা সেন্সরে সমস্যা হলে সাথে সাথে নতুন বক্স।',
                  },
                  {
                    step: 'STEP 02',
                    title: '৬–১২ মাসের অফিশিয়াল সেবা',
                    desc: 'ব্র্যান্ড অনুমোদিত সার্ভিস ও ফ্রি পিক-অ্যান্ড-ড্রপ ওয়ারেন্টি ক্লেইম।',
                  },
                  {
                    step: 'STEP 03',
                    title: '১০০% আসল ইমপোর্ট স্টক',
                    desc: 'কোনো ক্লোন, রিফার্বিশড বা দুবাই মাস্টার-কপি আমরা বিক্রি করি না।',
                  },
                ].map((w) => (
                  <div
                    key={w.step}
                    className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1"
                  >
                    <span className="text-[10px] font-black text-cyan-400 tracking-wider">
                      {w.step}
                    </span>
                    <div className="text-xs font-extrabold text-white">{w.title}</div>
                    <p className="text-[11px] text-slate-400 leading-snug">{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Interactive Serial / IMEI Authenticity Verification Tool */}
            <div className="lg:col-span-5">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode size={18} className="text-cyan-400" />
                    <div>
                      <h3 className="text-sm font-black text-white">
                        Serial / IMEI Authenticity Checker
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        বক্সের সিলভার হলোগ্রাম কোড দিয়ে আসল প্রোডাক্ট যাচাই করুন
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/15 text-cyan-300">
                    LIVE DB
                  </span>
                </div>

                <form onSubmit={handleVerifySerial} className="flex gap-2">
                  <div className="relative flex-1">
                    <Search
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={serialInput}
                      onChange={(e) => setSerialInput(e.target.value)}
                      placeholder="e.g. GG-2026-8841"
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl text-xs font-black text-white cursor-pointer transition hover:opacity-95 shrink-0"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Verify Code
                  </button>
                </form>

                {/* Sample Serial Pills for Quick Testing */}
                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="text-slate-400 font-semibold">Try Sample Serials:</span>
                  {Object.keys(SAMPLE_VERIFIED_SERIALS).map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        setSerialInput(code);
                        setVerificationResult({
                          serial: code,
                          status: 'verified',
                          ...SAMPLE_VERIFIED_SERIALS[code],
                        });
                      }}
                      className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-mono cursor-pointer"
                    >
                      {code}
                    </button>
                  ))}
                </div>

                {/* Verification Result Box */}
                {verificationResult && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                      verificationResult.status === 'verified'
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-100'
                    }`}
                  >
                    <div className="flex items-center justify-between font-black">
                      <span className="flex items-center gap-1.5">
                        {verificationResult.status === 'verified' ? (
                          <CheckCircle2 size={15} className="text-emerald-400" />
                        ) : (
                          <AlertCircle size={15} className="text-rose-400" />
                        )}
                        {verificationResult.status === 'verified'
                          ? '100% AUTHENTIC IMPORTED STOCK'
                          : 'SERIAL NOT FOUND IN REGISTRY'}
                      </span>
                      <span className="font-mono text-[10px] opacity-80">
                        {verificationResult.serial}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-white">
                      {verificationResult.productName}
                    </div>
                    <div className="text-[11px] opacity-80">
                      <strong>Origin:</strong> {verificationResult.importOrigin}
                    </div>
                    <div className="text-[11px] text-cyan-300 font-semibold flex items-center gap-1 pt-0.5">
                      <RefreshCw size={11} />
                      <span>{verificationResult.warrantyCoverage}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
