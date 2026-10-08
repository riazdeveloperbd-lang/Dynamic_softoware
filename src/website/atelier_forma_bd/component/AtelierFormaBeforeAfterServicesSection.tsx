import React, { useState } from 'react';
import {
  MoveHorizontal,
  Layers,
  Compass,
  Box,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  FileCode2,
  Ruler,
  Hammer,
  Eye,
  Building2,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';

export interface AtelierFormaBeforeAfterServicesSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface TransformationCase {
  id: string;
  label: string;
  projectTitle: string;
  location: string;
  modeLabelLeft: string;
  modeLabelRight: string;
  beforeImage: string;
  afterImage: string;
  beforeCaption: string;
  afterCaption: string;
  deviationAccuracy: string;
  keyInterventions: string[];
}

const TRANSFORMATION_CASES: TransformationCase[] = [
  {
    id: 'case_brick_to_finished',
    label: '01. Raw Brick Site vs. Completed Living Space',
    projectTitle: 'Gulshan-2 Lakeview Duplex Salon',
    location: 'Road 71, Gulshan-2, Dhaka · 4,200 Sq. Ft.',
    modeLabelLeft: 'BEFORE: RAW CIVIL SHELL & MASONRY',
    modeLabelRight: 'AFTER: HANDOVER PHOTOGRAPH (16 WEEKS)',
    beforeImage:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
    beforeCaption:
      'Unplastered 5-inch brick partitions, exposed RCC ceiling beams, and raw electrical conduits prior to acoustic false ceiling and HVAC ducting.',
    afterCaption:
      'Completed salon featuring honed Italian Statuario marble, recessed 2700K magnetic track lighting, and custom-milled Burmese teak paneling.',
    deviationAccuracy: '99.2% Execution Match to Approved Drawings',
    keyInterventions: [
      'Demolished 2 redundant corridor walls to gain +240 sq. ft. open lounge volume',
      'Concealed VRF multi-split air conditioning inside shadow-gap teak plenum',
      'Installed acoustic double-glazed balcony sliders (-38dB traffic noise reduction)',
    ],
  },
  {
    id: 'case_wireframe_to_render',
    label: '02. 3D Wireframe / Clay Model vs. Photorealistic 4K Render',
    projectTitle: 'Baridhara Courtyard Villa Atrium',
    location: 'Baridhara Diplomatic Zone · 6,800 Sq. Ft.',
    modeLabelLeft: 'STAGE A: 3DS MAX CLAY & WIREFRAME GEOMETRY',
    modeLabelRight: 'STAGE B: CORONA 11 PHOTOREALISTIC 4K RENDER',
    beforeImage:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    beforeCaption:
      'BIM LOD-350 clay massing model testing cantilevered stair geometry, solar incidence angles, and sightlines before material assignment.',
    afterCaption:
      'Physically based 4K render simulating overcast Dhaka monsoon skylight, PBR travertine veining, and IES luminaire photometrics.',
    deviationAccuracy: '1:1 Ray-Traced Lighting & Material Calibration',
    keyInterventions: [
      'Simulated June & December solar azimuth to eliminate west-facing afternoon glare',
      'Tested 4 stone slab vein orientations in VR prior to Italian quarry order',
      'Validated acoustic reverberation time (RT60 < 0.55s) in double-height volume',
    ],
  },
  {
    id: 'case_commercial_shell',
    label: '03. Bare Commercial Floorplate vs. Executive Boardroom',
    projectTitle: 'Vanguard Venture Capital Flagship HQ',
    location: 'Banani Road 11, Dhaka · 5,100 Sq. Ft.',
    modeLabelLeft: 'BEFORE: BARE CORE-AND-SHELL FLOORPLATE',
    modeLabelRight: 'AFTER: ACOUSTIC WALNUT & BRASS HQ',
    beforeImage:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85',
    beforeCaption:
      'Bare commercial concrete floorplate with exposed fire sprinklers and zero acoustic isolation.',
    afterCaption:
      'STC-52 acoustic laminated glass boardroom, smoked American walnut millwork, and glare-free linear architectural lighting.',
    deviationAccuracy: 'Delivered 4 Days Ahead of 12-Week Schedule',
    keyInterventions: [
      'Raised floor trunking for zero-visible-cable power & data distribution',
      'Custom brass architectural mesh dividers preserving daylight penetration',
      'Integrated Biophilic indoor planters with automated drip irrigation',
    ],
  },
];

const CORE_DISCIPLINES = [
  {
    index: '01',
    title: 'Architectural Design',
    bnSubtitle: 'স্থাপত্য নকশা ও রাজউক অনুমোদন',
    summary:
      'Holistic residential, duplex, and commercial building design tailored to Bangladesh’s tropical monsoon climate, urban plot constraints, and timeless modernist rigor.',
    deliverables: [
      'Site Topography, Solar Azimuth & Wind Orientation Analysis',
      'Master Spatial Planning & 2D CAD Architectural Drawings',
      'Structural RCC / Steel Framing & Seismic BNBC-2020 Engineering',
      'RAJUK / CDA / Pourashava Sheet Preparation & Approval Liaison',
    ],
    leadTime: '4–8 Weeks Design Phase',
    feeStructure: '৳120 – ৳280 / sq. ft.',
  },
  {
    index: '02',
    title: 'Interior Architecture',
    bnSubtitle: 'লাক্সারি ইন্টেরিয়র ও ফার্নিচার ডিজাইন',
    summary:
      'Bespoke interior environments where every millimeter of joinery, stone alignment, lighting temperature, and tactile textile is curated as a cohesive composition.',
    deliverables: [
      'High-Efficiency Space Zoning & Circulation Optimization',
      'Tactile Material & Stone Selection Boards (Marble, Teak, Micro-Cement)',
      'Custom Furniture, Wardrobe & Modular Kitchen Millwork Drawings',
      'Architectural Lighting Design (2700K–3500K CRI 97+ DALI Plans)',
    ],
    leadTime: '3–5 Weeks Design Phase',
    feeStructure: '৳150 – ৳350 / sq. ft.',
  },
  {
    index: '03',
    title: '3D Spatial Visualization',
    bnSubtitle: 'ফটোরিয়ালিস্টিক থ্রিডি রেন্ডার ও ভিআর ওয়াকথ্রু',
    summary:
      'Cinema-grade photorealistic 4K/8K CGI renders and interactive Unreal Engine 5 VR walkthroughs for architects, luxury real estate developers, and private homeowners.',
    deliverables: [
      'Photorealistic 4K Interior & Exterior Still Renders (3ds Max / Corona)',
      'Cinematic 60fps Architectural Animation & Drone Composite Reel',
      'Interactive 360° Web & Meta Quest VR Spatial Walkthroughs',
      'Real-Estate Developer Sales Brochure & Billboard CGI Assets',
    ],
    leadTime: '7–14 Days Turnaround',
    feeStructure: 'From ৳18,000 / View or Project Package',
  },
  {
    index: '04',
    title: 'Turnkey Execution',
    bnSubtitle: 'টার্নকি প্রজেক্ট ম্যানেজমেন্ট ও সুপারভিশন',
    summary:
      'Single-point accountability from demolition to white-glove handover. Our in-house civil engineers, master carpenters, and MEP specialists execute with zero vendor markups.',
    deliverables: [
      'Dedicated Resident Site Engineer & Weekly Gantt Progress Reports',
      'Direct Factory Millwork & Imported Hardware Procurement (Blum/Hettich)',
      'Civil Masonry, Acoustic False Ceiling, HVAC & Smart Home Integration',
      '10-Year Structural Joinery Warranty & Post-Handover Maintenance',
    ],
    leadTime: '10–20 Weeks On-Site',
    feeStructure: '৳1,850 – ৳4,800 / sq. ft. (All-Inclusive)',
  },
];

const WORKFLOW_STEPS = [
  {
    step: '01',
    name: 'Brief & Site Analysis',
    duration: 'Week 1',
    desc: 'Laser site measurement, structural column audit, lifestyle discovery interview, and preliminary budget alignment.',
  },
  {
    step: '02',
    name: '2D Space Planning',
    duration: 'Week 2–3',
    desc: 'Multiple furniture zoning options optimizing natural light, cross-ventilation, acoustic privacy, and circulation flow.',
  },
  {
    step: '03',
    name: '3D Visualization & Materiality',
    duration: 'Week 4–6',
    desc: 'Photorealistic 4K renders paired with physical stone, timber, brass, and fabric sample boards reviewed in our studio.',
  },
  {
    step: '04',
    name: 'Execution & Handover',
    duration: 'Week 7–18',
    desc: 'Precision BOQ costing, factory millwork fabrication, daily engineer supervision, and white-glove key handover.',
  },
];

export const AtelierFormaBeforeAfterServicesSection: React.FC<
  AtelierFormaBeforeAfterServicesSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState<number>(52);
  const [selectedDisciplineIdx, setSelectedDisciplineIdx] = useState<number>(1);

  const activeCase = TRANSFORMATION_CASES[activeCaseIdx];

  const scrollToEstimator = () => {
    const el = document.getElementById('atelier-estimator');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className={`w-full ${
        isDark ? 'bg-[#121212] text-[#F9F9F9]' : 'bg-[#F9F9F9] text-[#121212]'
      }`}
    >
      {/* ===================================================================== */}
      {/* 1. INTERACTIVE BEFORE / AFTER & 3D RENDER COMPARISON SLIDER           */}
      {/* ===================================================================== */}
      <section
        id="atelier-transformation-slider"
        className="w-full bg-[#121212] text-[#F9F9F9] py-20 lg:py-28 border-y border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          {/* Header & Case Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#E8DCC4]">
                <span>02. SPATIAL TRANSFORMATION &amp; CGI FIDELITY</span>
                <span aria-hidden="true">·</span>
                <span>INTERACTIVE SPLIT-SCREEN</span>
              </div>
              <EditableText
                as="h2"
                value={title}
                className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-white"
              />
              <EditableText
                as="p"
                value={subtitle}
                className="text-sm text-white/75 leading-relaxed"
              />
            </div>

            {/* Interactive Case Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {TRANSFORMATION_CASES.map((c, idx) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setActiveCaseIdx(idx);
                    setSliderPos(50);
                  }}
                  className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider border transition cursor-pointer ${
                    activeCaseIdx === idx
                      ? 'bg-[#E8DCC4] text-[#121212] border-[#E8DCC4]'
                      : 'bg-white/5 text-white/75 border-white/15 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Interactive Drag / Range Comparison Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="relative w-full aspect-[16/10] overflow-hidden select-none border border-[#E8DCC4]/30 bg-black">
                {/* Base Layer: AFTER Image (Full Width) */}
                <img
                  src={activeCase.afterImage}
                  alt={activeCase.modeLabelRight}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Top Clipped Layer: BEFORE Image (Clipped by sliderPos %) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img
                    src={activeCase.beforeImage}
                    alt={activeCase.modeLabelLeft}
                    className="w-full h-full object-cover filter grayscale contrast-125"
                  />
                  <div className="absolute inset-0 bg-[#121212]/25" />
                </div>

                {/* Top Corner Labels */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-black/80 backdrop-blur-xs border border-white/15 text-[11px] font-mono uppercase tracking-wider text-[#E8DCC4]">
                  {activeCase.modeLabelLeft}
                </div>
                <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-black/80 backdrop-blur-xs border border-[#E8DCC4]/40 text-[11px] font-mono uppercase tracking-wider text-white">
                  {activeCase.modeLabelRight}
                </div>

                {/* Vertical Divider Line & Drag Handle */}
                <div
                  className="absolute top-0 bottom-0 z-20 w-0.5 bg-[#E8DCC4] shadow-[0_0_15px_rgba(0,0,0,0.9)] pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center shadow-2xl border-2 border-[#E8DCC4]"
                    style={{ backgroundColor: '#121212', color: '#E8DCC4' }}
                  >
                    <MoveHorizontal size={18} />
                  </div>
                </div>

                {/* Accessible Full-Area Range Input Overlay for Smooth Touch & Mouse Dragging */}
                <input
                  type="range"
                  min={5}
                  max={95}
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  aria-label="Drag to compare before and after spatial transformation"
                  className="absolute inset-0 z-30 w-full h-full opacity-0 cursor-ew-resize"
                />
              </div>

              {/* Fine-Tune Scrub Bar Below Viewport */}
              <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 bg-white/5 border border-white/10 text-xs">
                <span className="font-mono text-[#E8DCC4]">
                  SLIDER RATIO: {sliderPos}% BEFORE / {100 - sliderPos}% AFTER
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSliderPos(15)}
                    className="px-2.5 py-1 bg-white/5 hover:bg-white/15 text-[11px] uppercase tracking-wider cursor-pointer"
                  >
                    Inspect Finished (85%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSliderPos(50)}
                    className="px-2.5 py-1 bg-white/5 hover:bg-white/15 text-[11px] uppercase tracking-wider cursor-pointer"
                  >
                    50 / 50 Split
                  </button>
                  <button
                    type="button"
                    onClick={() => setSliderPos(85)}
                    className="px-2.5 py-1 bg-white/5 hover:bg-white/15 text-[11px] uppercase tracking-wider cursor-pointer"
                  >
                    Inspect Raw Shell (85%)
                  </button>
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Architectural Intervention Notes */}
            <div className="lg:col-span-4 p-6 sm:p-7 bg-[#181818] border border-white/10 space-y-6">
              <div className="space-y-1.5 border-b border-white/10 pb-4">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#E8DCC4]">
                  {activeCase.location}
                </div>
                <h3 className="text-2xl font-serif font-normal text-white">
                  {activeCase.projectTitle}
                </h3>
                <div
                  className="text-xs font-semibold pt-1"
                  style={{ color: primaryColor }}
                >
                  {activeCase.deviationAccuracy}
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-black/40 border-l-2 border-white/30 space-y-1">
                  <div className="font-mono uppercase text-[10px] text-white/60">
                    INITIAL SITE CONDITION
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    {activeCase.beforeCaption}
                  </p>
                </div>

                <div
                  className="p-3.5 bg-black/40 border-l-2 space-y-1"
                  style={{ borderColor: primaryColor }}
                >
                  <div className="font-mono uppercase text-[10px] text-[#E8DCC4]">
                    EXECUTED ARCHITECTURAL OUTCOME
                  </div>
                  <p className="text-white/90 leading-relaxed">
                    {activeCase.afterCaption}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="text-[11px] uppercase tracking-wider text-[#E8DCC4] font-semibold">
                  Key Structural &amp; MEP Interventions
                </div>
                <ul className="space-y-2 text-xs text-white/80">
                  {activeCase.keyInterventions.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2
                        size={14}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: primaryColor }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. ARCHITECTURAL & DESIGN SERVICES MATRIX + 4-STEP WORKFLOW           */}
      {/* ===================================================================== */}
      <section
        id="atelier-services-matrix"
        className="max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 space-y-20"
      >
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-current/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] opacity-65">
              <span>03. CORE STUDIO DISCIPLINES</span>
              <span aria-hidden="true">·</span>
              <span>CONCEPT TO TURNKEY HANDOVER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight">
              Multidisciplinary Spatial Engineering &amp; Craft
            </h2>
          </div>
          <p className="text-sm opacity-75 max-w-md leading-relaxed">
            Whether commissioning a ground-up duplex in Purbachal, a turnkey penthouse
            in Gulshan, or photorealistic 3D marketing visuals, our four practice
            divisions operate under a unified design standard.
          </p>
        </div>

        {/* 4 Core Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CORE_DISCIPLINES.map((disc, idx) => {
            const isSelected = selectedDisciplineIdx === idx;
            return (
              <div
                key={disc.index}
                onClick={() => setSelectedDisciplineIdx(idx)}
                className={`p-8 border transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
                  isSelected
                    ? 'bg-[#121212] text-[#F9F9F9] border-[#121212] shadow-xl'
                    : isDark
                    ? 'bg-[#181818] text-[#F9F9F9] border-white/10 hover:border-white/30'
                    : 'bg-white text-[#121212] border-[#121212]/15 hover:border-[#121212]/40'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-current/10 pb-4">
                    <span
                      className="text-xs font-mono uppercase tracking-[0.2em]"
                      style={{ color: isSelected ? '#E8DCC4' : primaryColor }}
                    >
                      DISCIPLINE {disc.index}
                    </span>
                    <span className="text-xs opacity-70">{disc.bnSubtitle}</span>
                  </div>

                  <h3 className="text-2xl font-serif font-normal tracking-tight">
                    {disc.title}
                  </h3>

                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                    {disc.summary}
                  </p>

                  <div className="pt-2 space-y-2">
                    <div className="text-[11px] uppercase tracking-wider opacity-60 font-semibold">
                      Standard Deliverables
                    </div>
                    <ul className="space-y-2 text-xs">
                      {disc.deliverables.map((del) => (
                        <li key={del} className="flex items-start gap-2">
                          <span
                            className="font-mono text-xs"
                            style={{ color: isSelected ? '#E8DCC4' : primaryColor }}
                          >
                            —
                          </span>
                          <span className="opacity-90">{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 border-t border-current/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="opacity-60 block text-[10px] uppercase tracking-wider">
                      Indicative Fee / Rate
                    </span>
                    <strong
                      className="font-semibold"
                      style={{ color: isSelected ? '#E8DCC4' : primaryColor }}
                    >
                      {disc.feeStructure}
                    </strong>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToEstimator();
                    }}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#E8DCC4] text-[#121212]'
                        : 'border border-current/25 hover:bg-current/5'
                    }`}
                  >
                    <span>Estimate This Scope</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Step Visual Workflow Timeline */}
        <div
          className={`p-8 sm:p-10 border ${
            isDark
              ? 'bg-[#181818] border-white/10'
              : 'bg-[#EFECE6] border-[#121212]/15'
          } space-y-8`}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-current/10 pb-5">
            <div>
              <span
                className="text-xs font-mono uppercase tracking-[0.2em]"
                style={{ color: primaryColor }}
              >
                THE STUDIO METHODOLOGY
              </span>
              <h3 className="text-2xl font-serif font-normal mt-1">
                From First Sketch to Turnkey Key Handover
              </h3>
            </div>
            <span className="text-xs opacity-70">
              100% Transparent Milestone Billing · Weekly Site Photo Logs
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW_STEPS.map((w) => (
              <div
                key={w.step}
                className={`p-5 border ${
                  isDark
                    ? 'bg-[#121212] border-white/10'
                    : 'bg-[#F9F9F9] border-[#121212]/10'
                } space-y-3`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span
                    className="font-bold text-sm"
                    style={{ color: primaryColor }}
                  >
                    STEP {w.step}
                  </span>
                  <span className="opacity-60">{w.duration}</span>
                </div>
                <h4 className="text-base font-serif font-semibold">{w.name}</h4>
                <p className="text-xs opacity-75 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
