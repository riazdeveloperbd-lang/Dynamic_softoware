import React, { useState, useMemo } from 'react';
import {
  Check,
  ArrowRight,
  Droplets,
  Clock,
  Sprout,
  Compass,
  Sun,
  Layers,
  MoveHorizontal,
  Sparkles,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface VerdantEstimatorPortfolioSectionProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

type SpaceTypeId =
  | 'rooftop_garden'
  | 'townhouse_courtyard'
  | 'backyard_oasis'
  | 'living_green_wall'
  | 'commercial_terrace';

interface SpaceTypeOption {
  id: SpaceTypeId;
  label: string;
  ratePerSqFt: number;
  baseSetupCost: number;
  waterFactorGalPerSqFt: number;
  structuralNote: string;
}

const SPACE_TYPES: SpaceTypeOption[] = [
  {
    id: 'rooftop_garden',
    label: 'Rooftop Garden',
    ratePerSqFt: 24,
    baseSetupCost: 3800,
    waterFactorGalPerSqFt: 8.2,
    structuralNote: 'Includes lightweight engineered soil & wind-rated root anchoring',
  },
  {
    id: 'townhouse_courtyard',
    label: 'Townhouse Courtyard',
    ratePerSqFt: 20,
    baseSetupCost: 2900,
    waterFactorGalPerSqFt: 7.4,
    structuralNote: 'Shade-tolerant woodland understory & permeable bluestone drainage',
  },
  {
    id: 'backyard_oasis',
    label: 'Backyard Oasis',
    ratePerSqFt: 18,
    baseSetupCost: 2600,
    waterFactorGalPerSqFt: 9.0,
    structuralNote: 'Multi-season pollinator meadows, canopy trees & rain garden swales',
  },
  {
    id: 'living_green_wall',
    label: 'Living Green Wall',
    ratePerSqFt: 32,
    baseSetupCost: 3400,
    waterFactorGalPerSqFt: 10.5,
    structuralNote: 'Hydroponic felt matrix with closed-loop recirculating nutrient line',
  },
  {
    id: 'commercial_terrace',
    label: 'Commercial Terrace',
    ratePerSqFt: 26,
    baseSetupCost: 4800,
    waterFactorGalPerSqFt: 8.8,
    structuralNote: 'LEED-compliant modular seating, acoustic bio-buffers & ADA pathways',
  },
];

interface AddOnFeature {
  id: string;
  label: string;
  description: string;
  cost: number;
  extraWaterSavingsGal: number;
}

const ADD_ON_FEATURES: AddOnFeature[] = [
  {
    id: 'native_flora',
    label: 'Native Flora & Pollinator Gardens',
    description: '100% regional perennials, monarch host plants & mycotrophic soil inoculants',
    cost: 2200,
    extraWaterSavingsGal: 1200,
  },
  {
    id: 'stone_hardscaping',
    label: 'Custom Stone Hardscaping & Timber Decking',
    description: 'FSC-certified thermally modified ash decking & reclaimed Hudson bluestone',
    cost: 4600,
    extraWaterSavingsGal: 650,
  },
  {
    id: 'rainwater_drip',
    label: 'Automated Rainwater Harvesting & Drip Irrigation',
    description: 'Cistern capture + soil-moisture telemetry reducing municipal water use by 74%',
    cost: 3100,
    extraWaterSavingsGal: 2650,
  },
  {
    id: 'lighting_fire',
    label: 'Architectural Outdoor Lighting & Fire Elements',
    description: 'Dark-sky compliant 2700K brass fixtures & bio-ethanol smokeless hearth',
    cost: 3500,
    extraWaterSavingsGal: 0,
  },
];

interface PortfolioTransformItem {
  id: string;
  title: string;
  neighborhood: string;
  spaceType: string;
  sqFt: string;
  beforeImg: string;
  afterImg: string;
  summary: string;
  keyPlants: string[];
  materials: string[];
  waterSaved: string;
}

const PORTFOLIO_TRANSFORMS: PortfolioTransformItem[] = [
  {
    id: 'soho_penthouse',
    title: 'SoHo Cast-Iron Rooftop Sanctuary',
    neighborhood: 'SoHo, Manhattan',
    spaceType: 'Rooftop Garden',
    sqFt: '1,650 sq ft',
    beforeImg: '/src/assets/images/verdant_rooftop_before_1791390148745.jpg',
    afterImg: '/src/assets/images/verdant_rooftop_after_1791390171671.jpg',
    summary:
      'Converted a wind-scoured concrete roof membrane into an elevated woodland retreat with custom cedar louvers and storm-retention planters.',
    keyPlants: ['Serviceberry (Amelanchier)', 'Little Bluestem Grass', 'Eastern Redbud'],
    materials: ['FSC Thermally Modified Cedar', 'Weathering Corten Steel', 'Lightweight Expanded Shale'],
    waterSaved: '8,400 Gallons / Yr',
  },
  {
    id: 'brooklyn_brownstone',
    title: 'Cobble Hill Brownstone Shaded Parterre',
    neighborhood: 'Cobble Hill, Brooklyn',
    spaceType: 'Townhouse Courtyard',
    sqFt: '880 sq ft',
    beforeImg: '/src/assets/images/verdant_courtyard_before_1791390184868.jpg',
    afterImg: '/src/assets/images/verdant_courtyard_after_1791390199369.jpg',
    summary:
      'Replaced cracked impervious concrete with permeable reclaimed bluestone, a recirculating basalt rill, and a lush shade fern & moss understory.',
    keyPlants: ['Christmas Fern', 'Japanese Forest Grass', 'Oakleaf Hydrangea'],
    materials: ['Reclaimed Pennsylvania Bluestone', 'Hand-Troweled Lime Stucco', 'Subsurface Rain Cistern'],
    waterSaved: '5,150 Gallons / Yr',
  },
];

export const VerdantEstimatorPortfolioSection: React.FC<
  VerdantEstimatorPortfolioSectionProps
> = ({ title, subtitle, isDark = false }) => {
  // Interactive Estimator State
  const [selectedSpaceId, setSelectedSpaceId] = useState<SpaceTypeId>('rooftop_garden');
  const [sqFt, setSqFt] = useState<number>(650);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([
    'native_flora',
    'rainwater_drip',
  ]);
  const [lockedQuoteBanner, setLockedQuoteBanner] = useState<boolean>(false);

  // Before/After Gallery State
  const [activePortfolioId, setActivePortfolioId] = useState<string>('soho_penthouse');
  const [sliderPos, setSliderPos] = useState<number>(60);

  const selectedSpace = useMemo(
    () => SPACE_TYPES.find((s) => s.id === selectedSpaceId) || SPACE_TYPES[0],
    [selectedSpaceId]
  );

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Formula: Estimated Cost = (SqFt * SpaceTypeRate) + BaseSetupCost + Sum(Add-ons)
  const estimation = useMemo(() => {
    const addOnsTotal = ADD_ON_FEATURES.filter((a) =>
      selectedAddOns.includes(a.id)
    ).reduce((acc, item) => acc + item.cost, 0);

    const exactCost =
      sqFt * selectedSpace.ratePerSqFt + selectedSpace.baseSetupCost + addOnsTotal;

    const lowRange = Math.round((exactCost * 0.92) / 100) * 100;
    const highRange = Math.round((exactCost * 1.08) / 100) * 100;

    // Duration calculation
    let durationLabel = '2–3 Weeks';
    if (sqFt > 2500 || selectedAddOns.length >= 4) {
      durationLabel = '5–7 Weeks';
    } else if (sqFt > 1000 || selectedAddOns.length >= 3) {
      durationLabel = '3–5 Weeks';
    }

    // Water savings calculation
    const addOnWater = ADD_ON_FEATURES.filter((a) =>
      selectedAddOns.includes(a.id)
    ).reduce((acc, item) => acc + item.extraWaterSavingsGal, 0);
    const annualWaterSaved = Math.round(
      (sqFt * selectedSpace.waterFactorGalPerSqFt + addOnWater) / 50
    ) * 50;

    return {
      exactCost,
      lowRange,
      highRange,
      durationLabel,
      annualWaterSaved,
    };
  }, [sqFt, selectedSpace, selectedAddOns]);

  const handleLockEstimate = () => {
    // Dispatch custom event so Booking Form in next section can prefill with the estimate
    window.dispatchEvent(
      new CustomEvent('verdant:lock-estimate', {
        detail: {
          spaceLabel: selectedSpace.label,
          sqFt,
          lowRange: estimation.lowRange,
          highRange: estimation.highRange,
          annualWaterSaved: estimation.annualWaterSaved,
        },
      })
    );
    setLockedQuoteBanner(true);
    const bookingEl = document.getElementById('verdant-booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activePortfolio =
    PORTFOLIO_TRANSFORMS.find((p) => p.id === activePortfolioId) ||
    PORTFOLIO_TRANSFORMS[0];

  const bgSection = isDark ? 'bg-[#141E1A] text-[#F4F1EA]' : 'bg-[#FAF9F6] text-[#1F2421]';
  const stoneCard = isDark
    ? 'bg-[#1C2A24] border-[#2C4A3E]'
    : 'bg-[#EFECE6] border-[#D8E2DC]';
  const innerWhiteCard = isDark
    ? 'bg-[#111916] border-[#2C4A3E]'
    : 'bg-[#FAF9F6] border-[#D8E2DC]';

  return (
    <div className={`${bgSection} py-20 px-4 sm:px-6 space-y-28`}>
      {/* =====================================================================
          SECTION C: INTERACTIVE PROJECT ESTIMATOR WIDGET
         ===================================================================== */}
      <section id="verdant-estimator" className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold tracking-wide text-[#D37B58]">
              Interactive Architectural Cost &amp; Ecological Calculator
            </div>
            <EditableText
              id="verdant_estimator_title"
              defaultText={title || 'Calculate Your Urban Transformation'}
              as="h2"
              className="text-3xl sm:text-4xl font-normal tracking-tight"
              style={{
                fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif",
                textWrap: 'balance',
              }}
            />
            <EditableText
              id="verdant_estimator_subtitle"
              defaultText={
                subtitle ||
                'Configure your outdoor footprint, architectural typology, and sustainable systems to generate an instant budget and water-conservation forecast.'
              }
              as="p"
              className="text-sm sm:text-base text-[#4A6B5D]"
            />
          </div>

          <div className="text-xs text-[#4A6B5D] font-mono tabular-nums">
            Formula: (SqFt × Space Rate) + Base Engineering + Selected Eco Systems
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Cols: Step-by-Step Customization Panel */}
          <div className={`lg:col-span-7 rounded-2xl border ${stoneCard} p-6 sm:p-8 space-y-8`}>
            {/* Step 1: Select Space Type */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold tracking-wide text-[#2C4A3E] dark:text-[#F4F1EA]">
                  01. Select Architectural Space Type
                </label>
                <span className="text-xs font-mono tabular-nums text-[#4A6B5D]">
                  ${selectedSpace.ratePerSqFt}/sq ft + $
                  {selectedSpace.baseSetupCost.toLocaleString()} base
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {SPACE_TYPES.map((space) => {
                  const active = space.id === selectedSpaceId;
                  return (
                    <button
                      key={space.id}
                      type="button"
                      onClick={() => setSelectedSpaceId(space.id)}
                      className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                        active
                          ? 'bg-[#2C4A3E] border-[#2C4A3E] text-[#F4F1EA] shadow-xs'
                          : `${innerWhiteCard} hover:border-[#4A6B5D]`
                      }`}
                    >
                      <div className="text-xs font-semibold whitespace-nowrap truncate">
                        {space.label}
                      </div>
                      <div
                        className={`text-[11px] font-mono tabular-nums mt-1 ${
                          active ? 'text-[#D37B58]' : 'text-[#4A6B5D]'
                        }`}
                      >
                        ${space.ratePerSqFt}/sq ft
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-[#4A6B5D] pt-0.5">
                {selectedSpace.structuralNote}
              </p>
            </div>

            {/* Step 2: Estimated Square Footage Slider (100 - 5,000+ sq ft) */}
            <div className="space-y-3 pt-4 border-t border-[#D8E2DC] dark:border-[#2C4A3E]">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="verdant-sqft-slider"
                  className="text-xs font-bold tracking-wide text-[#2C4A3E] dark:text-[#F4F1EA]"
                >
                  02. Estimated Square Footage
                </label>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold font-mono tabular-nums text-[#D37B58]">
                    {sqFt.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#4A6B5D]">
                    {sqFt >= 5000 ? '+ sq ft' : 'sq ft'}
                  </span>
                </div>
              </div>

              <input
                id="verdant-sqft-slider"
                type="range"
                min={100}
                max={5000}
                step={50}
                value={sqFt}
                onChange={(e) => setSqFt(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#D8E2DC] accent-[#2C4A3E]"
              />

              <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-[#4A6B5D]">
                <button
                  type="button"
                  onClick={() => setSqFt(250)}
                  className="hover:text-[#1F2421] cursor-pointer"
                >
                  250 sq ft (Balcony)
                </button>
                <button
                  type="button"
                  onClick={() => setSqFt(850)}
                  className="hover:text-[#1F2421] cursor-pointer"
                >
                  850 sq ft (Courtyard)
                </button>
                <button
                  type="button"
                  onClick={() => setSqFt(1800)}
                  className="hover:text-[#1F2421] cursor-pointer"
                >
                  1,800 sq ft (Penthouse)
                </button>
                <button
                  type="button"
                  onClick={() => setSqFt(5000)}
                  className="hover:text-[#1F2421] cursor-pointer"
                >
                  5,000+ sq ft (Commercial)
                </button>
              </div>
            </div>

            {/* Step 3: Add-On Features (Checkboxes) */}
            <div className="space-y-3 pt-4 border-t border-[#D8E2DC] dark:border-[#2C4A3E]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wide text-[#2C4A3E] dark:text-[#F4F1EA]">
                  03. Architectural &amp; Ecological Add-On Systems
                </span>
                <span className="text-xs text-[#4A6B5D]">
                  {selectedAddOns.length} of {ADD_ON_FEATURES.length} selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADD_ON_FEATURES.map((addon) => {
                  const isChecked = selectedAddOns.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-4 rounded-xl border text-left transition flex items-start gap-3 cursor-pointer ${
                        isChecked
                          ? 'border-[#2C4A3E] bg-[#F4F1EA] dark:bg-[#111916]'
                          : `${innerWhiteCard} opacity-80 hover:opacity-100`
                      }`}
                    >
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition ${
                          isChecked
                            ? 'bg-[#2C4A3E] border-[#2C4A3E] text-[#F4F1EA]'
                            : 'border-[#4A6B5D]'
                        }`}
                      >
                        {isChecked && <Check size={13} />}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="text-xs font-semibold leading-snug text-[#1F2421] dark:text-[#F4F1EA]">
                          {addon.label}
                        </div>
                        <p className="text-[11px] text-[#4A6B5D] leading-relaxed">
                          {addon.description}
                        </p>
                        <div className="text-[11px] font-mono tabular-nums font-bold text-[#D37B58]">
                          +${addon.cost.toLocaleString()}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Dynamic Output Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#2C4A3E] text-[#F4F1EA] p-6 sm:p-8 space-y-6 border border-[#4A6B5D] shadow-md">
              <div className="flex items-center justify-between border-b border-[#4A6B5D] pb-4">
                <div>
                  <div className="text-xs text-[#D8E2DC]">
                    Preliminary Architectural Estimate
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    {selectedSpace.label} ·{' '}
                    <span className="font-mono tabular-nums">
                      {sqFt.toLocaleString()} sq ft
                    </span>
                  </div>
                </div>
                <Sprout size={20} className="text-[#D37B58]" />
              </div>

              {/* Estimated Price Range */}
              <div className="space-y-1">
                <div className="text-xs text-[#D8E2DC]">
                  Estimated Turnkey Investment Range
                </div>
                <div
                  className="text-3xl sm:text-4xl font-bold font-mono tabular-nums tracking-tight text-[#F4F1EA]"
                >
                  ${estimation.lowRange.toLocaleString()} – $
                  {estimation.highRange.toLocaleString()}
                </div>
                <div className="text-[11px] text-[#D8E2DC]/80">
                  Includes structural load engineering, DOB permits &amp; 1-year botanical establishment warranty
                </div>
              </div>

              {/* Duration & Eco Impact Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-xl bg-[#1F352C] border border-[#4A6B5D]/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#D8E2DC]">
                    <Clock size={13} className="text-[#D37B58]" />
                    <span>Project Duration</span>
                  </div>
                  <div className="text-lg font-bold font-mono tabular-nums">
                    {estimation.durationLabel}
                  </div>
                  <div className="text-[11px] text-[#D8E2DC]/70">
                    Off-site prefabrication + installation
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#1F352C] border border-[#4A6B5D]/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#D8E2DC]">
                    <Droplets size={13} className="text-[#D37B58]" />
                    <span>Eco Impact Metric</span>
                  </div>
                  <div className="text-lg font-bold font-mono tabular-nums text-[#D37B58]">
                    ~{estimation.annualWaterSaved.toLocaleString()} Gal/Yr
                  </div>
                  <div className="text-[11px] text-[#D8E2DC]/70">
                    Saved vs. standard turf lawn
                  </div>
                </div>
              </div>

              {/* Line-item summary */}
              <div className="space-y-2 pt-2 border-t border-[#4A6B5D]/60 text-xs">
                <div className="flex justify-between text-[#D8E2DC]">
                  <span>
                    Footprint ({sqFt.toLocaleString()} sq ft × ${selectedSpace.ratePerSqFt})
                  </span>
                  <span className="font-mono tabular-nums">
                    ${(sqFt * selectedSpace.ratePerSqFt).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[#D8E2DC]">
                  <span>Base Crane / Waterproofing &amp; Engineering</span>
                  <span className="font-mono tabular-nums">
                    ${selectedSpace.baseSetupCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[#D8E2DC]">
                  <span>Selected Eco &amp; Architectural Add-Ons ({selectedAddOns.length})</span>
                  <span className="font-mono tabular-nums">
                    +$
                    {ADD_ON_FEATURES.filter((a) => selectedAddOns.includes(a.id))
                      .reduce((acc, i) => acc + i.cost, 0)
                      .toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLockEstimate}
                className="w-full py-3.5 px-5 rounded-xl bg-[#D37B58] hover:bg-[#c26c49] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer whitespace-nowrap"
              >
                <span>Lock In This Estimate — Book Free Site Visit</span>
                <ArrowRight size={15} />
              </button>

              {lockedQuoteBanner && (
                <div className="p-3 rounded-xl bg-[#1F352C] border border-[#D37B58] text-xs text-[#F4F1EA] flex items-center justify-between">
                  <span>Estimate attached to your Site Consultation form below.</span>
                  <span className="font-mono font-bold text-[#D37B58]">Ready</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION D: INTERACTIVE BEFORE / AFTER TRANSFORMATION GALLERY
         ===================================================================== */}
      <section id="verdant-portfolio" className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold tracking-wide text-[#D37B58]">
              Verified Architectural Case Studies
            </div>
            <h2
              className="text-3xl sm:text-4xl font-normal tracking-tight"
              style={{
                fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif",
                textWrap: 'balance',
              }}
            >
              Interactive Before &amp; After Transformations
            </h2>
            <p className="text-sm sm:text-base text-[#4A6B5D]">
              Drag the comparison handle across each commission to inspect how barren urban slabs become self-sustaining native habitats.
            </p>
          </div>

          {/* Case Study Switcher Buttons */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#EFECE6] dark:bg-[#1C2A24] border border-[#D8E2DC] dark:border-[#2C4A3E] self-start">
            {PORTFOLIO_TRANSFORMS.map((item) => {
              const active = item.id === activePortfolioId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActivePortfolioId(item.id);
                    setSliderPos(60);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#2C4A3E] text-[#F4F1EA] shadow-xs'
                      : 'text-[#4A6B5D] hover:text-[#1F2421]'
                  }`}
                >
                  {item.neighborhood}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive Drag Comparison Slider (7 cols) */}
          <div className="lg:col-span-7">
            <div className={`rounded-2xl border ${stoneCard} p-3 sm:p-4 space-y-3`}>
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden select-none bg-[#2C4A3E]">
                <img
                  src={activePortfolio.beforeImg}
                  alt={`${activePortfolio.title} before transformation`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img
                    src={activePortfolio.afterImg}
                    alt={`${activePortfolio.title} after transformation`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Handle */}
                <div
                  className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-[#F4F1EA] shadow-md"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#D37B58] border-2 border-[#F4F1EA] text-white flex items-center justify-center shadow-lg">
                    <MoveHorizontal size={16} />
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex items-center justify-between text-xs text-[#F4F1EA]">
                  <span>AFTER · Completed Biophilic Sanctuary</span>
                  <span>BEFORE · Existing Site Condition</span>
                </div>

                <input
                  type="range"
                  min={5}
                  max={95}
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  aria-label="Comparison slider"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                />
              </div>

              <div className="flex items-center justify-between px-1 text-xs text-[#4A6B5D]">
                <span>
                  {activePortfolio.neighborhood} · {activePortfolio.spaceType} ·{' '}
                  <strong className="font-mono tabular-nums text-[#1F2421] dark:text-[#F4F1EA]">
                    {activePortfolio.sqFt}
                  </strong>
                </span>
                <span className="font-mono tabular-nums text-[#D37B58] font-semibold">
                  Saves {activePortfolio.waterSaved}
                </span>
              </div>
            </div>
          </div>

          {/* Project Dossier & Botanical Spec (5 cols) */}
          <div className={`lg:col-span-5 rounded-2xl border ${stoneCard} p-6 sm:p-8 space-y-6`}>
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#4A6B5D]">
                {activePortfolio.neighborhood} · {activePortfolio.spaceType}
              </div>
              <h3
                className="text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif" }}
              >
                {activePortfolio.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4A6B5D] leading-relaxed">
                {activePortfolio.summary}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#D8E2DC] dark:border-[#2C4A3E]">
              <div className="text-xs font-bold text-[#2C4A3E] dark:text-[#F4F1EA]">
                Key Native Flora Installed
              </div>
              <div className="text-xs text-[#4A6B5D] flex flex-wrap items-center gap-2">
                {activePortfolio.keyPlants.map((plant, idx) => (
                  <React.Fragment key={plant}>
                    {idx > 0 && <span aria-hidden="true">·</span>}
                    <span className="font-medium text-[#1F2421] dark:text-[#F4F1EA]">
                      {plant}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#D8E2DC] dark:border-[#2C4A3E]">
              <div className="text-xs font-bold text-[#2C4A3E] dark:text-[#F4F1EA]">
                Architectural Hardscape &amp; Soil Matrix
              </div>
              <div className="text-xs text-[#4A6B5D] flex flex-wrap items-center gap-2">
                {activePortfolio.materials.map((mat, idx) => (
                  <React.Fragment key={mat}>
                    {idx > 0 && <span aria-hidden="true">·</span>}
                    <span>{mat}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-[#4A6B5D]">
                Verified Hydrological Reduction:{' '}
                <strong className="font-mono text-[#2C4A3E] dark:text-[#F4F1EA]">
                  {activePortfolio.waterSaved}
                </strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('verdant-booking');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-semibold text-[#D37B58] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Request Similar Spec</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION H: OUR ETHOS — 4-STEP DESIGN PROCESS TIMELINE
         ===================================================================== */}
      <section id="verdant-ethos" className="max-w-7xl mx-auto space-y-10">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-semibold tracking-wide text-[#D37B58]">
            Our Ethos &amp; Methodology
          </div>
          <h2
            className="text-3xl sm:text-4xl font-normal tracking-tight"
            style={{
              fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif",
              textWrap: 'balance',
            }}
          >
            Four-Stage Biophilic Engineering Process
          </h2>
          <p className="text-sm text-[#4A6B5D]">
            Every project follows a disciplined architectural workflow from structural load testing to zero-emissions biological stewardship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01.',
              title: 'Site & Soil Audit',
              metric: 'Week 1 · Structural & Solar Scan',
              desc: 'We perform structural slab load analysis, sun-path LiDAR mapping, wind-tunnel modeling, and microbiome soil testing.',
              icon: Compass,
            },
            {
              step: '02.',
              title: '3D Architectural Modeling',
              metric: 'Week 2 · Four-Season BIM Render',
              desc: 'Walk through your sanctuary in 3D across spring bloom, summer canopy, autumn foliage, and winter architectural structure.',
              icon: Layers,
            },
            {
              step: '03.',
              title: 'Eco-Installation',
              metric: 'Weeks 3–5 · Crane & Drip Rigging',
              desc: 'Zero-VOC hardscaping, crane hoisting of mature native specimens, and concealed smart rainwater drip manifolds.',
              icon: Sun,
            },
            {
              step: '04.',
              title: 'Seasonal Care',
              metric: 'Ongoing · 100% Electric Fleet',
              desc: 'Quiet, zero-emissions botanical pruning, organic compost tea feeding, and spring/autumn sensor calibration.',
              icon: Sparkles,
            },
          ].map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.step}
                className={`rounded-2xl border ${stoneCard} p-6 flex flex-col justify-between space-y-5`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold font-mono text-[#D37B58]">
                      {item.step}
                    </span>
                    <IconComponent size={18} className="text-[#2C4A3E] dark:text-[#F4F1EA]" />
                  </div>
                  <h3
                    className="text-xl font-normal"
                    style={{ fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#4A6B5D] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#D8E2DC] dark:border-[#2C4A3E] text-[11px] font-mono text-[#2C4A3E] dark:text-[#D8E2DC]">
                  {item.metric}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
