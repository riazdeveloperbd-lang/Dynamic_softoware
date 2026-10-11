import React, { useState } from 'react';
import {
  Cpu,
  BatteryCharging,
  ShieldCheck,
  CreditCard,
  Check,
  MapPin,
  ChevronDown,
  Award,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import {
  CustomEcommerceScreenId,
  CustomEcommerceVariantId,
  CUSTOM_ECOMMERCE_PRODUCTS,
} from '../data/customEcommerceRegistry';

interface GadgetScreensProps {
  screenId: CustomEcommerceScreenId;
  variant: CustomEcommerceVariantId;
  primaryColor: string;
  isDark: boolean;
  onNavigate: (target: CustomEcommerceScreenId) => void;
}

export const CustomEcommerceGadgetScreens: React.FC<GadgetScreensProps> = ({
  screenId,
  variant,
  primaryColor,
  isDark,
  onNavigate,
}) => {
  const [highlightDiffOnly, setHighlightDiffOnly] = useState(false);
  const [selectedTenure, setSelectedTenure] = useState<3 | 6 | 12 | 24>(12);
  const [selectedBank, setSelectedBank] = useState('City Bank AMEX (0% EMI)');
  const [openSpecCategory, setOpenSpecCategory] = useState<'Display' | 'Processor' | 'Camera'>('Processor');
  const [serialInput, setSerialInput] = useState('SN-XM5-8849201');

  const devicePrice = 1199;
  const monthlyEmi = Math.round(devicePrice / selectedTenure);

  // ============================================================================
  // 27. PRODUCT COMPARISON MATRIX (SIDE-BY-SIDE 2-3 DEVICES TECH SPECS)
  // ============================================================================
  if (screenId === 'GadgetComparisonMatrix') {
    const specRows = [
      { label: 'Processor / SoC', d1: 'Snapdragon 8 Gen 4 (3nm)', d2: 'A18 Pro Bionic (3nm)', diff: true },
      { label: 'RAM & Storage', d1: '16GB LPDDR5X · 512GB', d2: '8GB Unified · 256GB', diff: true },
      { label: 'Battery & Charge', d1: '5,400 mAh · 100W SuperVOOC', d2: '4,685 mAh · 35W MagSafe', diff: true },
      { label: 'Display Panel', d1: '6.8" 120Hz LTPO AMOLED', d2: '6.7" 120Hz ProMotion OLED', diff: false },
      { label: 'Official Warranty', d1: '24 Months Brand Care', d2: '12 Months AppleCare', diff: true },
    ];
    const visibleSpecs = highlightDiffOnly ? specRows.filter((r) => r.diff) : specRows;

    return (
      <div className="p-4 space-y-3.5 select-none">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase opacity-60">
              HARDWARE MATRIX · {variant.replace('varient_', 'V')}
            </span>
            <h1 className="text-base font-black">Side-by-Side Spec Compare</h1>
          </div>
          <button
            type="button"
            onClick={() => setHighlightDiffOnly((h) => !h)}
            className="px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 text-[10px] font-extrabold cursor-pointer"
          >
            {highlightDiffOnly ? '✓ Diffs Only' : 'Show All'}
          </button>
        </div>

        {/* 2-Device Header Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { name: 'NovaPhone Ultra 5G', price: '$1,099', score: '98/100', img: CUSTOM_ECOMMERCE_PRODUCTS[0].image },
            { name: 'AeroPro Max 16', price: '$1,199', score: '96/100', img: CUSTOM_ECOMMERCE_PRODUCTS[1].image },
          ].map((dev, i) => (
            <div
              key={dev.name}
              className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-center space-y-1"
            >
              <img src={dev.img} alt="" className="w-full h-16 object-cover rounded-xl" />
              <div className="text-xs font-black truncate">{dev.name}</div>
              <div className="text-xs font-black" style={{ color: primaryColor }}>
                {dev.price}
              </div>
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 text-[9px] font-black">
                Lab Score {dev.score}
              </span>
            </div>
          ))}
        </div>

        {/* Side-by-Side Technical Spec Table */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden text-[11px]">
          {visibleSpecs.map((row) => (
            <div key={row.label} className="border-b last:border-b-0 border-neutral-200 dark:border-neutral-800">
              <div className="bg-neutral-100 dark:bg-neutral-800/80 px-3 py-1 font-extrabold text-[10px] uppercase opacity-75">
                {row.label}
              </div>
              <div className="grid grid-cols-2 divide-x divide-neutral-200 dark:divide-neutral-800 p-2.5 font-semibold">
                <span className="pr-2">{row.d1}</span>
                <span className="pl-2">{row.d2}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onNavigate('GadgetEmiFinancingCalculator')}
          className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          Calculate 0% Monthly EMI for Winner →
        </button>
      </div>
    );
  }

  // ============================================================================
  // 28. EMI & FINANCING CALCULATOR MODAL (BANKS, TENURE & MONTHLY BREAKDOWN)
  // ============================================================================
  if (screenId === 'GadgetEmiFinancingCalculator') {
    return (
      <div className="p-4 space-y-4 select-none">
        <div>
          <span className="text-[10px] font-mono uppercase opacity-60">
            0% BANK EMI PLANNER · {variant.replace('varient_', 'V')}
          </span>
          <h1 className="text-base font-black">EMI &amp; Financing Calculator</h1>
          <p className="text-[11px] opacity-65">Device Price: $1,199.00 · 0% Interest Approved</p>
        </div>

        {/* Monthly Installment Hero Ring */}
        <div
          className="p-4 rounded-3xl text-white flex items-center justify-between shadow-lg"
          style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #0F172A 100%)` }}
        >
          <div>
            <div className="text-[10px] uppercase opacity-80">Monthly Installment</div>
            <div className="text-2xl font-black">${monthlyEmi}.00 / mo</div>
            <div className="text-[10px] text-emerald-300 font-bold">
              ✓ $0 Down Payment · $0 Processing Fee
            </div>
          </div>
          <CreditCard size={32} className="opacity-80" />
        </div>

        {/* Select Tenure Pills */}
        <div className="space-y-1.5">
          <div className="text-xs font-extrabold">1. Choose Installment Tenure (Months)</div>
          <div className="grid grid-cols-4 gap-2">
            {([3, 6, 12, 24] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setSelectedTenure(m)}
                className={`py-2.5 rounded-xl border text-xs font-black cursor-pointer ${
                  selectedTenure === m ? 'text-white border-transparent' : 'border-neutral-200 dark:border-neutral-800'
                }`}
                style={selectedTenure === m ? { backgroundColor: primaryColor } : undefined}
              >
                {m}M
              </button>
            ))}
          </div>
        </div>

        {/* Participating Credit Cards */}
        <div className="space-y-1.5">
          <div className="text-xs font-extrabold">2. Select Partner Bank Card</div>
          {[
            'City Bank AMEX (0% EMI up to 24M)',
            'BRAC Bank Visa Signature (0% EMI)',
            'Eastern Bank EBL SKY (0% EMI + 5% Cashback)',
          ].map((bank) => (
            <div
              key={bank}
              onClick={() => setSelectedBank(bank)}
              className={`p-3 rounded-2xl border flex items-center justify-between text-xs font-bold cursor-pointer ${
                selectedBank === bank ? 'border-2 bg-indigo-500/10' : 'border-neutral-200 dark:border-neutral-800'
              }`}
              style={selectedBank === bank ? { borderColor: primaryColor } : undefined}
            >
              <span>{bank}</span>
              {selectedBank === bank && <Check size={14} style={{ color: primaryColor }} />}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onNavigate('CheckoutPaymentGateway')}
          className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          Apply ${monthlyEmi}/mo EMI at Checkout →
        </button>
      </div>
    );
  }

  // ============================================================================
  // 29. DETAILED TECH SPECS TAB (DEEPLY NESTED DISPLAY / PROCESSOR / CAMERA)
  // ============================================================================
  if (screenId === 'GadgetDetailedTechSpecsTab') {
    const specTree: Record<'Display' | 'Processor' | 'Camera', [string, string][]> = {
      Processor: [
        ['Architecture', '3nm TSMC Second-Gen Octa-Core'],
        ['Clock Speed', '4.32 GHz Prime Core + NPU 45 TOPS'],
        ['Memory & UFS', '16GB LPDDR5X + 512GB UFS 4.0'],
        ['Thermal Cooling', 'Dual-Loop Vapor Chamber (9,140 mm²)'],
      ],
      Display: [
        ['Panel Type', '6.82" LTPO 4.0 Micro-Quad Curved AMOLED'],
        ['Refresh Rate', '1Hz – 120Hz Adaptive ProMotion'],
        ['Peak Brightness', '4,500 nits HDR10+ / Dolby Vision'],
        ['Protection', 'Ceramic Shield / Gorilla Glass Armor'],
      ],
      Camera: [
        ['Main Sensor', '50MP 1-Inch Sony LYT-900 (f/1.63 OIS)'],
        ['Periscope Zoom', '200MP 5x Optical / 120x Telephoto'],
        ['Video Capture', '8K @ 30fps, 4K @ 120fps 10-Bit Log'],
        ['Front Optics', '32MP Autofocus 4K Selfie Camera'],
      ],
    };

    return (
      <div className="p-4 space-y-3.5 select-none">
        <div>
          <span className="text-[10px] font-mono uppercase opacity-60">
            NESTED HARDWARE SPECS · {variant.replace('varient_', 'V')}
          </span>
          <h1 className="text-base font-black">Detailed Technical Specifications</h1>
        </div>

        {/* Category Switcher Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-extrabold">
          {(['Processor', 'Display', 'Camera'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setOpenSpecCategory(cat)}
              className={`py-2 rounded-lg cursor-pointer ${
                openSpecCategory === cat ? 'text-white shadow-xs' : 'opacity-65'
              }`}
              style={openSpecCategory === cat ? { backgroundColor: primaryColor } : undefined}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Nested Spec Key-Value Rows */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
          {specTree[openSpecCategory].map(([k, v]) => (
            <div key={k} className="p-3 flex items-center justify-between text-xs">
              <span className="opacity-65 font-semibold">{k}</span>
              <span className="font-extrabold text-right">{v}</span>
            </div>
          ))}
        </div>

        {/* What's in the Box */}
        <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 space-y-1 text-[11px]">
          <div className="font-extrabold">📦 What&apos;s Included in the Box:</div>
          <div className="opacity-75">• Flagship Device · 100W GaN Fast Charger · Braided USB-C Cable</div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // 30. WARRANTY & SERVICE POLICY SCREEN (RETURN WINDOWS, SERIAL CHECK & REPAIR CENTERS)
  // ============================================================================
  return (
    <div className="p-4 space-y-3.5 select-none">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase text-emerald-500">
            OFFICIAL BRAND CARE · {variant.replace('varient_', 'V')}
          </span>
          <h1 className="text-base font-black">Warranty &amp; Authorized Service</h1>
        </div>
        <ShieldCheck size={20} className="text-emerald-500" />
      </div>

      {/* Live IMEI / Serial Official Warranty Verifier */}
      <div className="p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2">
        <div className="text-xs font-extrabold">Instant Serial / IMEI Authenticity Check</div>
        <div className="flex gap-2">
          <input
            type="text"
            value={serialInput}
            onChange={(e) => setSerialInput(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-xs font-mono font-bold"
          />
          <span className="px-3 py-2 rounded-xl bg-emerald-500 text-white text-[11px] font-black flex items-center">
            ✓ Valid
          </span>
        </div>
      </div>

      {/* Return Window & Official Warranty Pillars */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
          <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">
            10-Day Replacement
          </div>
          <div className="text-[10px] opacity-75">Instant box-swap if factory defect found</div>
        </div>
        <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
          <div className="text-xs font-black" style={{ color: primaryColor }}>
            12-Month Official
          </div>
          <div className="text-[10px] opacity-75">100% genuine parts &amp; zero labor charge</div>
        </div>
      </div>

      {/* Authorized Local Repair Centers */}
      <div className="space-y-2">
        <div className="text-xs font-extrabold">Authorized Repair Centers Near You</div>
        {[
          { center: 'Gulshan 2 Flagship Care Lab', addr: 'Tower 71, Level 4 (Open 10AM–8PM)', wait: '15m Wait' },
          { center: 'Bashundhara City Official Hub', addr: 'Level 6, Block D, Panthapath', wait: 'Same-Day Fix' },
        ].map((loc) => (
          <div
            key={loc.center}
            className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-extrabold flex items-center gap-1">
                <MapPin size={12} style={{ color: primaryColor }} /> {loc.center}
              </div>
              <div className="text-[10px] opacity-65">{loc.addr}</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 text-[10px] font-black">
              {loc.wait}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
