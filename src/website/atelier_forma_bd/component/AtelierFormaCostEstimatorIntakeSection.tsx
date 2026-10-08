import React, { useState, useMemo } from 'react';
import {
  Ruler,
  SlidersHorizontal,
  Upload,
  FileText,
  CheckCircle2,
  ArrowUpRight,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Layers,
  ShieldCheck,
  Building2,
  Phone,
  User,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';

export interface AtelierFormaCostEstimatorIntakeSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

type SpaceTypeOption = 'Apartment' | 'Duplex' | 'Office' | 'Retail' | 'Restaurant';
type ScopeRequiredOption =
  | 'Design & 3D Only'
  | 'Full Turnkey Design + Execution'
  | 'Renovation';
type FinishTierOption = 'Minimalist Standard' | 'Premium Bespoke' | 'Ultra-Luxury';

const SPACE_TYPE_MULTIPLIER: Record<SpaceTypeOption, number> = {
  Apartment: 1.0,
  Duplex: 1.18,
  Office: 0.95,
  Retail: 1.12,
  Restaurant: 1.25,
};

const SCOPE_BASE_RATES_BDT: Record<ScopeRequiredOption, number> = {
  'Design & 3D Only': 240, // BDT per sq.ft.
  'Full Turnkey Design + Execution': 2250, // BDT per sq.ft.
  Renovation: 1650, // BDT per sq.ft.
};

const FINISH_TIER_CONFIG: Record<
  FinishTierOption,
  {
    multiplier: number;
    tagline: string;
    materialsSummary: string;
    hardwareSpec: string;
    weeksPer1000SqFt: number;
  }
> = {
  'Minimalist Standard': {
    multiplier: 1.0,
    tagline: 'Clean architectural lines, durable HPL veneers & warm LED cove lighting',
    materialsSummary:
      'Syncronized melamine & matte HPL joinery, homogeneous porcelain floor tiles, Berger BreathEasy matte emulsion, warm 3000K architectural downlights.',
    hardwareSpec: 'Hettich Soft-Close Hinges & Channels (5-Year Warranty)',
    weeksPer1000SqFt: 3.5,
  },
  'Premium Bespoke': {
    multiplier: 1.45,
    tagline: 'Natural Crown Teak veneers, quartz countertops & DALI dimmable tracks',
    materialsSummary:
      'Seasoned Chittagong Teak & American Walnut veneer with PU matte lacquer, Spanish sintered stone slabs, seamless micro-cement accent walls, CRI 97+ magnetic track lighting.',
    hardwareSpec: 'Blum Austria Legrabox & Aventos Lift Systems (10-Year Warranty)',
    weeksPer1000SqFt: 4.5,
  },
  'Ultra-Luxury': {
    multiplier: 2.15,
    tagline: 'Book-matched Italian marble, solid Burmese teak & full Lutron automation',
    materialsSummary:
      'Imported Italian Statuario & Travertine slabs, solid seasoned Burmese teak millwork, PVD brushed champagne brass inlays, acoustic wall paneling, Lutron HomeWorks smart scenes.',
    hardwareSpec: 'Blum Servo-Drive Motorized Touch-to-Open + Rimadesio Style Glass Systems',
    weeksPer1000SqFt: 5.5,
  },
};

export const AtelierFormaCostEstimatorIntakeSection: React.FC<
  AtelierFormaCostEstimatorIntakeSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  // Step 1: Space Type
  const [spaceType, setSpaceType] = useState<SpaceTypeOption>('Apartment');
  // Step 2: Area Slider
  const [areaSqFt, setAreaSqFt] = useState<number>(2600);
  // Step 3: Scope Required
  const [scopeRequired, setScopeRequired] = useState<ScopeRequiredOption>(
    'Full Turnkey Design + Execution'
  );
  // Step 4: Aesthetic & Finish Tier
  const [finishTier, setFinishTier] = useState<FinishTierOption>('Premium Bespoke');

  // Optional Add-ons
  const [includeSmartAutomation, setIncludeSmartAutomation] = useState<boolean>(true);
  const [includeAcousticGlazing, setIncludeAcousticGlazing] = useState<boolean>(false);
  const [currencyMode, setCurrencyMode] = useState<'BDT' | 'USD'>('BDT');

  // Lead Capture & Floor Plan Upload State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('+880 17');
  const [clientEmail, setClientEmail] = useState('');
  const [siteAddress, setSiteAddress] = useState('Gulshan-2, Dhaka');
  const [preferredConsultMode, setPreferredConsultMode] = useState<
    'Studio Presentation (Gulshan-2)' | 'On-Site Laser Survey' | 'Zoom 3D Review'
  >('Studio Presentation (Gulshan-2)');
  const [uploadedFileName, setUploadedFileName] = useState<string>(
    'Gulshan_Duplex_Layout_Rev02.pdf'
  );
  const [uploadedFileSize, setUploadedFileSize] = useState<string>('4.2 MB · CAD / PDF');
  const [proposalSubmitted, setProposalSubmitted] = useState<boolean>(false);

  // Dynamic Estimation Math
  const estimation = useMemo(() => {
    const baseRate = SCOPE_BASE_RATES_BDT[scopeRequired];
    const spaceMult = SPACE_TYPE_MULTIPLIER[spaceType];
    const tierCfg = FINISH_TIER_CONFIG[finishTier];

    const effectiveRatePerSqFt = Math.round(baseRate * spaceMult * tierCfg.multiplier);
    let baseTotalBdt = effectiveRatePerSqFt * areaSqFt;

    if (includeSmartAutomation && scopeRequired !== 'Design & 3D Only') {
      baseTotalBdt += Math.round(areaSqFt * 185);
    }
    if (includeAcousticGlazing && scopeRequired !== 'Design & 3D Only') {
      baseTotalBdt += Math.round(areaSqFt * 220);
    }

    const lowEstimateBdt = Math.round(baseTotalBdt * 0.93);
    const highEstimateBdt = Math.round(baseTotalBdt * 1.08);

    // Timeline calculation
    const rawWeeks =
      scopeRequired === 'Design & 3D Only'
        ? Math.max(3, Math.round((areaSqFt / 1000) * 1.6))
        : Math.max(8, Math.round((areaSqFt / 1000) * tierCfg.weeksPer1000SqFt));

    const minWeeks = rawWeeks;
    const maxWeeks = rawWeeks + 3;

    // Breakdown percentages
    const civilMepShare = scopeRequired === 'Design & 3D Only' ? 20 : 28;
    const millworkJoineryShare = scopeRequired === 'Design & 3D Only' ? 45 : 46;
    const lightingStoneShare = scopeRequired === 'Design & 3D Only' ? 35 : 26;

    return {
      effectiveRatePerSqFt,
      lowEstimateBdt,
      highEstimateBdt,
      minWeeks,
      maxWeeks,
      civilMepShare,
      millworkJoineryShare,
      lightingStoneShare,
      tierCfg,
    };
  }, [
    spaceType,
    areaSqFt,
    scopeRequired,
    finishTier,
    includeSmartAutomation,
    includeAcousticGlazing,
  ]);

  const formatMoney = (bdtAmount: number) => {
    if (currencyMode === 'USD') {
      const usd = Math.round(bdtAmount / 120);
      return `$${usd.toLocaleString()}`;
    }
    if (bdtAmount >= 10000000) {
      return `৳${(bdtAmount / 10000000).toFixed(2)} Cr`;
    }
    if (bdtAmount >= 100000) {
      return `৳${(bdtAmount / 100000).toFixed(2)} Lakh`;
    }
    return `৳${bdtAmount.toLocaleString()}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setUploadedFileSize(`${sizeMb} MB · Verified Floor Plan`);
    }
  };

  return (
    <section
      id="atelier-estimator"
      className={`w-full py-20 lg:py-28 border-b ${
        isDark
          ? 'bg-[#161616] text-[#F9F9F9] border-white/10'
          : 'bg-[#F2EFE9] text-[#121212] border-[#121212]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-current/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] opacity-65">
              <span>04. INTERACTIVE PROJECT COST &amp; SCOPE ESTIMATOR</span>
              <span aria-hidden="true">·</span>
              <span>2026 DHAKA / CHATTOGRAM BOQ INDEX</span>
            </div>
            <EditableText
              as="h2"
              value={title}
              className="text-3xl sm:text-4xl font-serif font-normal tracking-tight"
            />
            <EditableText
              as="p"
              value={subtitle}
              className="text-sm opacity-75 leading-relaxed"
            />
          </div>

          {/* Currency Switcher (BDT Lakh/Cr vs USD for International/NRB Clients) */}
          <div className="flex items-center gap-2 self-start">
            <span className="text-xs uppercase tracking-wider opacity-65">
              Currency:
            </span>
            <div className="flex items-center bg-[#121212] text-white p-1">
              <button
                type="button"
                onClick={() => setCurrencyMode('BDT')}
                className={`px-3 py-1 text-xs font-mono uppercase cursor-pointer ${
                  currencyMode === 'BDT'
                    ? 'bg-[#E8DCC4] text-[#121212] font-bold'
                    : 'text-white/70'
                }`}
              >
                BDT (৳ Lakh/Cr)
              </button>
              <button
                type="button"
                onClick={() => setCurrencyMode('USD')}
                className={`px-3 py-1 text-xs font-mono uppercase cursor-pointer ${
                  currencyMode === 'USD'
                    ? 'bg-[#E8DCC4] text-[#121212] font-bold'
                    : 'text-white/70'
                }`}
              >
                USD ($ NRB/Intl)
              </button>
            </div>
          </div>
        </div>

        {/* Main 12-Column Interactive Split: Left 7 Cols Configurator + Right 5 Cols Live Output & Floorplan Upload */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 COLUMNS: 4-STEP ARCHITECTURAL CONFIGURATOR */}
          <div
            className={`lg:col-span-7 p-6 sm:p-8 border space-y-8 ${
              isDark
                ? 'bg-[#121212] border-white/10'
                : 'bg-[#F9F9F9] border-[#121212]/15'
            }`}
          >
            {/* STEP 1: Space Type */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono uppercase tracking-widest opacity-70">
                  STEP 01 · SELECT TYPOLOGY / SPACE TYPE
                </span>
                <span className="font-semibold" style={{ color: primaryColor }}>
                  {spaceType}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {(
                  ['Apartment', 'Duplex', 'Office', 'Retail', 'Restaurant'] as SpaceTypeOption[]
                ).map((type) => {
                  const active = spaceType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSpaceType(type)}
                      className={`py-3 px-3 text-xs font-semibold uppercase tracking-wider border transition cursor-pointer ${
                        active
                          ? 'bg-[#121212] text-[#E8DCC4] border-[#121212]'
                          : 'border-current/15 opacity-75 hover:opacity-100'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Approximate Area (Sq. Ft. Slider) */}
            <div className="space-y-3 pt-4 border-t border-current/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest opacity-70">
                  STEP 02 · APPROXIMATE CARPET / BUILT AREA (SQ. FT.)
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-serif font-bold">
                    {areaSqFt.toLocaleString()}
                  </span>
                  <span className="text-xs uppercase opacity-65">sq. ft.</span>
                  <span className="text-[11px] opacity-55 font-mono">
                    (~{(areaSqFt / 720).toFixed(1)} Katha equiv.)
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={500}
                max={10000}
                step={100}
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full h-2 bg-neutral-300 dark:bg-neutral-700 appearance-none cursor-pointer accent-[#B8860B]"
              />

              <div className="flex items-center justify-between text-[11px] font-mono opacity-60">
                <span>500 sq. ft. (Studio)</span>
                <span>2,500 sq. ft. (4-Bed Apt)</span>
                <span>5,500 sq. ft. (Duplex)</span>
                <span>10,000+ sq. ft. (HQ/Villa)</span>
              </div>
            </div>

            {/* STEP 3: Scope Required */}
            <div className="space-y-3 pt-4 border-t border-current/10">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono uppercase tracking-widest opacity-70">
                  STEP 03 · ARCHITECTURAL &amp; EXECUTION SCOPE
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(
                  [
                    'Design & 3D Only',
                    'Full Turnkey Design + Execution',
                    'Renovation',
                  ] as ScopeRequiredOption[]
                ).map((sc) => {
                  const active = scopeRequired === sc;
                  return (
                    <button
                      key={sc}
                      type="button"
                      onClick={() => setScopeRequired(sc)}
                      className={`p-4 text-left border transition cursor-pointer flex flex-col justify-between space-y-2 ${
                        active
                          ? 'bg-[#121212] text-[#E8DCC4] border-[#121212]'
                          : 'border-current/15 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase tracking-wider leading-snug">
                        {sc}
                      </span>
                      <span className="text-[11px] opacity-70 font-mono">
                        Base: ৳{SCOPE_BASE_RATES_BDT[sc]}/sft
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: Aesthetic & Finish Tier */}
            <div className="space-y-3 pt-4 border-t border-current/10">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono uppercase tracking-widest opacity-70">
                  STEP 04 · MATERIALITY &amp; FINISH SPECIFICATION TIER
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(
                  [
                    'Minimalist Standard',
                    'Premium Bespoke',
                    'Ultra-Luxury',
                  ] as FinishTierOption[]
                ).map((tier) => {
                  const active = finishTier === tier;
                  const info = FINISH_TIER_CONFIG[tier];
                  return (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setFinishTier(tier)}
                      className={`p-4 text-left border transition cursor-pointer flex flex-col justify-between space-y-2 ${
                        active
                          ? 'bg-[#121212] text-[#E8DCC4] border-[#121212]'
                          : 'border-current/15 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider">
                          {tier}
                        </div>
                        <p className="text-[11px] opacity-75 mt-1 leading-relaxed">
                          {info.tagline}
                        </p>
                      </div>
                      <div
                        className="text-[10px] font-mono uppercase pt-2 border-t border-current/10"
                        style={{ color: active ? '#E8DCC4' : primaryColor }}
                      >
                        Multiplier: {info.multiplier}x
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Finish Tier Material & Hardware Specification Callout */}
            <div
              className={`p-4 border text-xs space-y-2 ${
                isDark
                  ? 'bg-[#1A1A1A] border-white/10'
                  : 'bg-[#EFECE6] border-[#121212]/10'
              }`}
            >
              <div className="flex items-center justify-between font-mono uppercase text-[11px]">
                <span style={{ color: primaryColor }}>
                  INCLUDED IN {finishTier.toUpperCase()} TIER:
                </span>
                <span>{estimation.tierCfg.hardwareSpec}</span>
              </div>
              <p className="opacity-80 leading-relaxed">
                {estimation.tierCfg.materialsSummary}
              </p>
            </div>

            {/* Technical Engineering Add-Ons */}
            {scopeRequired !== 'Design & 3D Only' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="flex items-start gap-3 p-3.5 border border-current/15 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSmartAutomation}
                    onChange={(e) => setIncludeSmartAutomation(e.target.checked)}
                    className="mt-0.5 accent-[#B8860B]"
                  />
                  <div className="text-xs">
                    <div className="font-semibold">
                      DALI / Lutron Smart Lighting &amp; Curtain Automation
                    </div>
                    <div className="text-[11px] opacity-65">
                      Scene presets, app control &amp; motorized drapery tracks (+৳185/sft)
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 border border-current/15 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeAcousticGlazing}
                    onChange={(e) => setIncludeAcousticGlazing(e.target.checked)}
                    className="mt-0.5 accent-[#B8860B]"
                  />
                  <div className="text-xs">
                    <div className="font-semibold">
                      STC-48 Acoustic Double-Glazed Windows &amp; Partitions
                    </div>
                    <div className="text-[11px] opacity-65">
                      Urban Dhaka traffic noise isolation &amp; thermal Low-E glass (+৳220/sft)
                    </div>
                  </div>
                </label>
              </div>
            )}
          </div>

          {/* RIGHT 5 COLUMNS: LIVE ESTIMATE OUTPUT + FLOOR PLAN UPLOAD & CONSULTATION BOOKING */}
          <div className="lg:col-span-5 bg-[#121212] text-[#F9F9F9] border border-[#E8DCC4]/30 p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Dynamic Output Banner */}
            <div className="space-y-4 border-b border-white/10 pb-6">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#E8DCC4]">
                <span>ESTIMATED INVESTMENT RANGE</span>
                <span>
                  {currencyMode === 'BDT'
                    ? `~৳${estimation.effectiveRatePerSqFt.toLocaleString()}/sft`
                    : `~$${Math.round(estimation.effectiveRatePerSqFt / 120)}/sft`}
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
                {formatMoney(estimation.lowEstimateBdt)} —{' '}
                <span style={{ color: '#E8DCC4' }}>
                  {formatMoney(estimation.highEstimateBdt)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-white/5 border border-white/10">
                  <div className="text-[10px] font-mono uppercase text-white/60">
                    ESTIMATED TIMELINE
                  </div>
                  <div className="text-sm font-bold text-[#E8DCC4] mt-0.5">
                    {estimation.minWeeks} – {estimation.maxWeeks} Weeks
                  </div>
                </div>
                <div className="p-3 bg-white/5 border border-white/10">
                  <div className="text-[10px] font-mono uppercase text-white/60">
                    CONFIGURED SCOPE
                  </div>
                  <div className="text-xs font-semibold text-white mt-0.5 truncate">
                    {areaSqFt.toLocaleString()} sft · {spaceType}
                  </div>
                </div>
              </div>

              {/* Proportional BOQ Allocation Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] text-white/70">
                  <span>Joinery &amp; Millwork ({estimation.millworkJoineryShare}%)</span>
                  <span>Civil &amp; MEP ({estimation.civilMepShare}%)</span>
                  <span>Stone &amp; Lighting ({estimation.lightingStoneShare}%)</span>
                </div>
                <div className="w-full h-2 bg-white/10 flex overflow-hidden">
                  <div
                    style={{
                      width: `${estimation.millworkJoineryShare}%`,
                      backgroundColor: primaryColor,
                    }}
                  />
                  <div
                    style={{
                      width: `${estimation.civilMepShare}%`,
                      backgroundColor: '#E8DCC4',
                    }}
                  />
                  <div
                    style={{
                      width: `${estimation.lightingStoneShare}%`,
                      backgroundColor: '#52525B',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Floor Plan Upload & Consultation Booking Form */}
            {proposalSubmitted ? (
              <div className="p-6 bg-white/5 border border-[#E8DCC4]/40 space-y-4">
                <div className="flex items-center gap-2.5 text-[#E8DCC4]">
                  <CheckCircle2 size={20} style={{ color: primaryColor }} />
                  <h4 className="text-base font-serif font-bold">
                    Custom BOQ Proposal &amp; Site Visit Reserved
                  </h4>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  We have generated your itemized preliminary BOQ for your{' '}
                  <strong>
                    {areaSqFt.toLocaleString()} sq. ft. {spaceType}
                  </strong>{' '}
                  ({finishTier}) along with your uploaded file{' '}
                  <span className="underline text-[#E8DCC4]">{uploadedFileName}</span>.
                </p>
                <div className="p-3.5 bg-black/50 border border-white/10 text-[11px] font-mono space-y-1 text-white/75">
                  <div>CLIENT: {clientName || 'Principal Homeowner'}</div>
                  <div>LOCATION: {siteAddress}</div>
                  <div>MEETING MODE: {preferredConsultMode}</div>
                  <div>ESTIMATE REF: #AF-BOQ-2026</div>
                </div>
                <button
                  type="button"
                  onClick={() => setProposalSubmitted(false)}
                  className="w-full py-2.5 bg-[#E8DCC4] text-[#121212] text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Recalculate Another Space
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setProposalSubmitted(true);
                }}
                className="space-y-4"
              >
                <div className="text-xs uppercase tracking-[0.18em] text-[#E8DCC4] font-semibold">
                  Upload Floor Plan &amp; Book Principal Architect Review
                </div>

                {/* Drag & Drop / File Upload Box for CAD / PDF Floor Plan */}
                <label className="block p-4 border border-dashed border-[#E8DCC4]/40 bg-white/5 hover:bg-white/10 transition cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.dwg,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Upload
                        size={18}
                        className="flex-shrink-0"
                        style={{ color: primaryColor }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">
                          {uploadedFileName}
                        </div>
                        <div className="text-[11px] text-white/60">
                          {uploadedFileSize} · Click to attach PDF, DWG, or Hand Sketch
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-[#E8DCC4]/15 text-[#E8DCC4] text-[10px] font-mono uppercase flex-shrink-0">
                      Attach Plan
                    </span>
                  </div>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-white/65 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g., Barrister Arman"
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8DCC4]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-white/65 mb-1">
                      Phone / WhatsApp (+880) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8DCC4]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-white/65 mb-1">
                      Project Location / Plot
                    </label>
                    <input
                      type="text"
                      value={siteAddress}
                      onChange={(e) => setSiteAddress(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8DCC4]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-white/65 mb-1">
                      Consultation Format
                    </label>
                    <select
                      value={preferredConsultMode}
                      onChange={(e) =>
                        setPreferredConsultMode(e.target.value as typeof preferredConsultMode)
                      }
                      className="w-full px-3 py-2.5 bg-[#1C1C1C] border border-white/15 text-xs text-white focus:outline-none"
                    >
                      <option value="Studio Presentation (Gulshan-2)">
                        Studio Presentation (Gulshan-2)
                      </option>
                      <option value="On-Site Laser Survey">
                        On-Site Laser Survey
                      </option>
                      <option value="Zoom 3D Review">
                        Zoom 3D Review (NRB / Intl)
                      </option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-5 text-xs font-bold uppercase tracking-[0.16em] text-white flex items-center justify-center gap-2 transition hover:opacity-95 cursor-pointer shadow-lg"
                  style={{ backgroundColor: primaryColor }}
                >
                  <span>Request Custom Proposal &amp; Book Site Visit</span>
                  <ArrowUpRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
