import React, { useState, useEffect } from 'react';
import {
  Check,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Calendar,
  Building2,
  Home,
  Search,
  Sparkles,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface VerdantPackagesCoverageBookingSectionProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface PackageTier {
  id: string;
  name: string;
  target: string;
  oneTimeDesignBuild: string;
  seasonalCarePlan: string;
  badge?: string;
  featured: boolean;
  features: string[];
}

const PACKAGE_TIERS: PackageTier[] = [
  {
    id: 'urban_balcony',
    name: 'Tier 1: The Urban Balcony & Patio Refresh',
    target: 'Ideal for apartments, terraces & compact outdoor spaces (100–450 sq ft)',
    oneTimeDesignBuild: '$6,800',
    seasonalCarePlan: '$240 / month',
    featured: false,
    features: [
      'Custom lightweight fiberglass & terracotta modular planters',
      'Four-season native perennial & dwarf evergreen matrix',
      'Concealed smart Wi-Fi micro-drip irrigation timer',
      'Low-voltage warm 2700K architectural accent lighting',
      'Single-day white-glove elevator installation',
    ],
  },
  {
    id: 'complete_sanctuary',
    name: 'Tier 2: The Complete Backyard Sanctuary',
    target: 'Full architectural design, hardscaping, lighting & planting (450–2,200 sq ft)',
    oneTimeDesignBuild: '$24,500',
    seasonalCarePlan: '$580 / month',
    badge: 'Most Popular',
    featured: true,
    features: [
      'Full 3D BIM architectural masterplan & DOB/Landmark permitting',
      'FSC thermally modified timber decking & permeable bluestone',
      'Subsurface rainwater harvesting cistern & soil telemetry',
      'Mature canopy trees (Serviceberry, Japanese Maple, Redbud)',
      'Custom outdoor kitchen or smokeless bio-ethanol fire hearth',
      '1-year 100% botanical establishment guarantee',
    ],
  },
  {
    id: 'commercial_hoa',
    name: 'Tier 3: Commercial & HOA Biophilic Stewardship',
    target: 'Ongoing zero-emissions maintenance & seasonal rotations (2,000–15,000+ sq ft)',
    oneTimeDesignBuild: '$58,000+',
    seasonalCarePlan: '$1,650 / month',
    featured: false,
    features: [
      'LEED v4.1 & Local Law 97 green roof thermal compliance',
      'Acoustic bio-wall buffers & modular tenant lounge zones',
      'Weekly zero-emissions all-electrichorticultural crew visits',
      'Quarterly ESG stormwater & carbon sequestration audit report',
      'Priority snow-load protection & seasonal bulb rotations',
    ],
  },
];

interface ZipZoneRecord {
  zipPrefix: string;
  zoneName: string;
  tier: 'Primary Core Zone' | 'Extended Tri-State Zone';
  turnaround: string;
  leadArchitect: string;
}

const COVERAGE_ZONES: ZipZoneRecord[] = [
  {
    zipPrefix: '100',
    zoneName: 'Manhattan (TriBeCa, SoHo, Chelsea, Upper East/West)',
    tier: 'Primary Core Zone',
    turnaround: 'Site Audit within 48 Hours · Zero Travel Fee',
    leadArchitect: 'Elena Vance, RLA (Studio Principal)',
  },
  {
    zipPrefix: '112',
    zoneName: 'Brooklyn (Brooklyn Heights, Cobble Hill, Williamsburg, Park Slope)',
    tier: 'Primary Core Zone',
    turnaround: 'Site Audit within 48 Hours · Zero Travel Fee',
    leadArchitect: 'Marcus Thorne, LEED AP',
  },
  {
    zipPrefix: '111',
    zoneName: 'Long Island City & Astoria Waterfront',
    tier: 'Primary Core Zone',
    turnaround: 'Site Audit within 72 Hours · Zero Travel Fee',
    leadArchitect: 'Sora Takahashi, ASLA',
  },
  {
    zipPrefix: '070',
    zoneName: 'Hoboken, Jersey City & Hudson Gold Coast',
    tier: 'Extended Tri-State Zone',
    turnaround: 'Weekly Thursday Site Audits · Complimentary for Tier 2 & 3',
    leadArchitect: 'Elena Vance, RLA (Studio Principal)',
  },
  {
    zipPrefix: '105',
    zoneName: 'Westchester & Lower Hudson Valley Estates',
    tier: 'Extended Tri-State Zone',
    turnaround: 'Tuesday/Friday Estate Audits · Dedicated Crane Logistics',
    leadArchitect: 'Marcus Thorne, LEED AP',
  },
  {
    zipPrefix: '068',
    zoneName: 'Greenwich & Fairfield County Coastal Corridor',
    tier: 'Extended Tri-State Zone',
    turnaround: 'By Appointment · Full Coastal Native Flora Spec',
    leadArchitect: 'Sora Takahashi, ASLA',
  },
];

export const VerdantPackagesCoverageBookingSection: React.FC<
  VerdantPackagesCoverageBookingSectionProps
> = ({ title, subtitle, isDark = false }) => {
  // Pricing Billing Toggle
  const [billingMode, setBillingMode] = useState<'one_time' | 'seasonal'>('one_time');

  // Zip Code Checker State
  const [zipInput, setZipInput] = useState<string>('10013');
  const [zipResult, setZipResult] = useState<{
    status: 'verified' | 'extended' | 'custom';
    title: string;
    detail: string;
    architect: string;
  } | null>({
    status: 'verified',
    title: 'ZIP 10013 Confirmed — Primary Manhattan Core Zone',
    detail: 'Complimentary 48-hour on-site structural & solar audit available this week.',
    architect: 'Elena Vance, RLA',
  });

  // Booking Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipAddress, setZipAddress] = useState('10013 · TriBeCa, NY');
  const [propertyType, setPropertyType] = useState<'Residential' | 'Commercial'>(
    'Residential'
  );
  const [desiredTimeline, setDesiredTimeline] = useState('Within 30 Days (Spring/Summer Window)');
  const [preferredDate, setPreferredDate] = useState('Thursday, Oct 15 · 10:30 AM');
  const [attachedEstimateSummary, setAttachedEstimateSummary] = useState<string | null>(
    null
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  // Listen for Estimator "Lock In This Estimate" event
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{
        spaceLabel: string;
        sqFt: number;
        lowRange: number;
        highRange: number;
        annualWaterSaved: number;
      }>;
      if (custom.detail) {
        const d = custom.detail;
        setAttachedEstimateSummary(
          `${d.spaceLabel} (${d.sqFt.toLocaleString()} sq ft) · Est. $${d.lowRange.toLocaleString()}–$${d.highRange.toLocaleString()} · Saves ~${d.annualWaterSaved.toLocaleString()} Gal/Yr`
        );
      }
    };
    window.addEventListener('verdant:lock-estimate', handler);
    return () => window.removeEventListener('verdant:lock-estimate', handler);
  }, []);

  const handleCheckZip = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = zipInput.trim().replace(/[^0-9]/g, '');
    if (cleaned.length < 3) {
      setZipResult({
        status: 'custom',
        title: 'Please enter a valid 5-digit ZIP code',
        detail: 'Enter your property postal code to verify architectural crew coverage.',
        architect: 'Studio Dispatch Desk',
      });
      return;
    }

    const prefix = cleaned.slice(0, 3);
    const matched = COVERAGE_ZONES.find((z) => z.zipPrefix === prefix);
    if (matched) {
      setZipResult({
        status:
          matched.tier === 'Primary Core Zone' ? 'verified' : 'extended',
        title: `ZIP ${cleaned} Verified — ${matched.zoneName}`,
        detail: `${matched.tier} · ${matched.turnaround}`,
        architect: matched.leadArchitect,
      });
      setZipAddress(`${cleaned} · ${matched.zoneName.split('(')[0].trim()}`);
    } else {
      setZipResult({
        status: 'extended',
        title: `ZIP ${cleaned} — Custom Architectural Commission Available`,
        detail:
          'Outside our daily electric fleet radius, but eligible for full design-build projects over 1,000 sq ft.',
        architect: 'Elena Vance, RLA (National Design Desk)',
      });
      setZipAddress(cleaned);
    }
  };

  const handleSelectPackage = (pkg: PackageTier) => {
    setAttachedEstimateSummary(
      `${pkg.name} (${
        billingMode === 'one_time' ? pkg.oneTimeDesignBuild : pkg.seasonalCarePlan
      })`
    );
    const el = document.getElementById('verdant-booking');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || ! email.includes('@') || !phone.trim()) {
      setFormError('Please provide your full name, valid email address, and direct phone number.');
      return;
    }
    setFormError(null);
    setBookingConfirmed(true);
  };

  const bgSection = isDark ? 'bg-[#111916] text-[#F4F1EA]' : 'bg-[#FAF9F6] text-[#1F2421]';
  const stoneCard = isDark
    ? 'bg-[#192520] border-[#2C4A3E]'
    : 'bg-[#EFECE6] border-[#D8E2DC]';

  return (
    <div className={`${bgSection} py-20 px-4 sm:px-6 space-y-28`}>
      {/* =====================================================================
          SECTION E: SERVICE PACKAGES & SEASONAL MAINTENANCE PLANS
         ===================================================================== */}
      <section id="verdant-packages" className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold tracking-wide text-[#D37B58]">
              Architectural Packages &amp; Horticultural Stewardship
            </div>
            <EditableText
              id="verdant_packages_title"
              defaultText={
                title || 'Service Packages & Seasonal Maintenance Plans'
              }
              as="h2"
              className="text-3xl sm:text-4xl font-normal tracking-tight"
              style={{
                fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif",
                textWrap: 'balance',
              }}
            />
            <EditableText
              id="verdant_packages_subtitle"
              defaultText={
                subtitle ||
                'Transparent turnkey design-build pricing paired with 100% electric seasonal botanical care.'
              }
              as="p"
              className="text-sm sm:text-base text-[#4A6B5D]"
            />
          </div>

          {/* Interactive Billing Toggle: One-Time Design & Build vs Seasonal Care Plan */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#EFECE6] dark:bg-[#192520] border border-[#D8E2DC] dark:border-[#2C4A3E] self-start">
            <button
              type="button"
              onClick={() => setBillingMode('one_time')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                billingMode === 'one_time'
                  ? 'bg-[#2C4A3E] text-[#F4F1EA] shadow-xs'
                  : 'text-[#4A6B5D] hover:text-[#1F2421]'
              }`}
            >
              One-Time Design &amp; Build
            </button>
            <button
              type="button"
              onClick={() => setBillingMode('seasonal')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                billingMode === 'seasonal'
                  ? 'bg-[#D37B58] text-white shadow-xs'
                  : 'text-[#4A6B5D] hover:text-[#1F2421]'
              }`}
            >
              Seasonal Care Plan (Save 15%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PACKAGE_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl border p-6 sm:p-8 flex flex-col justify-between space-y-6 transition ${
                tier.featured
                  ? 'bg-[#2C4A3E] text-[#F4F1EA] border-[#2C4A3E] shadow-md'
                  : stoneCard
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-semibold ${
                      tier.featured ? 'text-[#D37B58]' : 'text-[#4A6B5D]'
                    }`}
                  >
                    {tier.badge || 'Architectural Tier'}
                  </span>
                  <span
                    className={`text-[11px] font-mono ${
                      tier.featured ? 'text-[#D8E2DC]' : 'text-[#4A6B5D]'
                    }`}
                  >
                    {billingMode === 'one_time'
                      ? 'Turnkey Installation'
                      : 'Quarterly Botanical Retainer'}
                  </span>
                </div>

                <h3
                  className="text-2xl font-normal leading-snug"
                  style={{ fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif" }}
                >
                  {tier.name}
                </h3>

                <p
                  className={`text-xs leading-relaxed ${
                    tier.featured ? 'text-[#D8E2DC]/85' : 'text-[#4A6B5D]'
                  }`}
                >
                  {tier.target}
                </p>

                <div className="pt-2 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-bold font-mono tabular-nums">
                    {billingMode === 'one_time'
                      ? tier.oneTimeDesignBuild
                      : tier.seasonalCarePlan}
                  </span>
                  <span
                    className={`text-xs ${
                      tier.featured ? 'text-[#D8E2DC]/75' : 'text-[#4A6B5D]'
                    }`}
                  >
                    {billingMode === 'one_time'
                      ? 'starting turnkey build'
                      : 'all-electric care'}
                  </span>
                </div>

                <ul className="space-y-2.5 pt-4 border-t border-[#D8E2DC]/30 text-xs">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check
                        size={14}
                        className="shrink-0 mt-0.5 text-[#D37B58]"
                      />
                      <span
                        className={
                          tier.featured ? 'text-[#F4F1EA]/90' : 'text-[#1F2421] dark:text-[#F4F1EA]'
                        }
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleSelectPackage(tier)}
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer whitespace-nowrap ${
                  tier.featured
                    ? 'bg-[#D37B58] text-white hover:opacity-95'
                    : 'bg-[#2C4A3E] text-[#F4F1EA] hover:opacity-95'
                }`}
              >
                <span>Select {tier.name.split(':')[0]} for Site Audit</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SECTION F: LOCAL SERVICE AREA & COVERAGE MAP
         ===================================================================== */}
      <section id="verdant-coverage" className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left 5 Cols: Zip Code Checker & Service Radius */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold tracking-wide text-[#D37B58]">
                Local Service Area &amp; Coverage Map
              </div>
              <h2
                className="text-3xl sm:text-4xl font-normal tracking-tight"
                style={{
                  fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif",
                  textWrap: 'balance',
                }}
              >
                Check Architectural Crew Availability in Your Zip Code
              </h2>
              <p className="text-sm text-[#4A6B5D] leading-relaxed">
                Our zero-emissions electric installation fleet and crane rigging teams operate daily across Primary Core Zones and Extended Tri-State corridors.
              </p>
            </div>

            {/* Interactive Zip Code Input */}
            <form onSubmit={handleCheckZip} className="space-y-3">
              <label
                htmlFor="verdant-zip-input"
                className="block text-xs font-bold text-[#2C4A3E] dark:text-[#F4F1EA]"
              >
                Enter Property 5-Digit ZIP Code (Try 10013, 11201, 07030, 10583)
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A6B5D]"
                  />
                  <input
                    id="verdant-zip-input"
                    type="text"
                    value={zipInput}
                    onChange={(e) => setZipInput(e.target.value)}
                    placeholder="e.g. 10013"
                    maxLength={10}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-[#D8E2DC] bg-[#FAF9F6] dark:bg-[#192520] text-xs font-mono font-semibold text-[#1F2421] dark:text-[#F4F1EA] focus:outline-none focus:border-[#2C4A3E]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#2C4A3E] text-[#F4F1EA] text-xs font-semibold hover:opacity-95 transition cursor-pointer whitespace-nowrap"
                >
                  Check Availability
                </button>
              </div>
            </form>

            {zipResult && (
              <div
                className={`p-4 rounded-xl border ${stoneCard} space-y-1.5`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-[#2C4A3E] dark:text-[#F4F1EA]">
                  <CheckCircle2 size={15} className="text-[#D37B58] shrink-0" />
                  <span>{zipResult.title}</span>
                </div>
                <p className="text-xs text-[#4A6B5D]">{zipResult.detail}</p>
                <div className="text-[11px] font-mono text-[#2C4A3E] dark:text-[#D8E2DC] pt-1">
                  Assigned Zone Lead: {zipResult.architect}
                </div>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-[#2C4A3E] dark:text-[#F4F1EA]">
                Active Dispatch Hubs
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {COVERAGE_ZONES.slice(0, 4).map((z) => (
                  <button
                    key={z.zipPrefix}
                    type="button"
                    onClick={() => {
                      setZipInput(`${z.zipPrefix}01`);
                      setZipResult({
                        status:
                          z.tier === 'Primary Core Zone' ? 'verified' : 'extended',
                        title: `ZIP ${z.zipPrefix}01 Verified — ${z.zoneName}`,
                        detail: `${z.tier} · ${z.turnaround}`,
                        architect: z.leadArchitect,
                      });
                    }}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer ${stoneCard} hover:border-[#2C4A3E]`}
                  >
                    <div className="font-mono font-bold text-[#D37B58]">
                      ZIP {z.zipPrefix}XX · {z.tier.split(' ')[0]}
                    </div>
                    <div className="text-[11px] text-[#4A6B5D] truncate mt-0.5">
                      {z.zoneName}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Stylized Interactive Architectural Vector Coverage Map */}
          <div className="lg:col-span-7">
            <div className={`rounded-2xl border ${stoneCard} p-5 sm:p-6 space-y-4`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-semibold">
                  Metropolitan Biophilic Service Radius · All-Electric Fleet Telemetry
                </div>
                <div className="flex items-center gap-4 text-[11px] text-[#4A6B5D]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2C4A3E]" />
                    Primary Core (0–15 mi)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D37B58]" />
                    Extended Surrounds (15–45 mi)
                  </span>
                </div>
              </div>

              {/* Architectural SVG Radar Map */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#1D3128] border border-[#2C4A3E] p-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 640 400"
                  className="w-full h-full"
                  aria-label="Verdant Spaces Service Area Map"
                >
                  {/* Topographic & Waterway Contours */}
                  <path
                    d="M0 80 Q180 120 320 70 T640 110"
                    stroke="#2C4A3E"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M0 290 Q240 240 410 310 T640 270"
                    stroke="#2C4A3E"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  {/* Stylized Hudson & East River Channels */}
                  <path
                    d="M270 0 C265 140 250 260 220 400"
                    stroke="#4A6B5D"
                    strokeWidth="14"
                    strokeOpacity="0.35"
                    fill="none"
                  />
                  <path
                    d="M355 90 C340 190 330 270 345 400"
                    stroke="#4A6B5D"
                    strokeWidth="10"
                    strokeOpacity="0.35"
                    fill="none"
                  />

                  {/* Extended Service Radius Ring */}
                  <circle
                    cx="320"
                    cy="205"
                    r="165"
                    fill="#D37B58"
                    fillOpacity="0.08"
                    stroke="#D37B58"
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                  />

                  {/* Primary Core Zone Ring */}
                  <circle
                    cx="320"
                    cy="205"
                    r="95"
                    fill="#4A6B5D"
                    fillOpacity="0.22"
                    stroke="#F4F1EA"
                    strokeWidth="1.5"
                  />

                  {/* Active Project Pins */}
                  {[
                    { x: 310, y: 185, label: 'Manhattan Core (100XX)', core: true },
                    { x: 348, y: 245, label: 'Brooklyn Brownstone Belt (112XX)', core: true },
                    { x: 368, y: 162, label: 'LIC Rooftop Nursery (111XX)', core: true },
                    { x: 242, y: 205, label: 'Hoboken / Jersey City (070XX)', core: false },
                    { x: 335, y: 72, label: 'Westchester Estates (105XX)', core: false },
                    { x: 455, y: 95, label: 'Greenwich Coastal (068XX)', core: false },
                  ].map((pin) => (
                    <g key={pin.label}>
                      <circle
                        cx={pin.x}
                        cy={pin.y}
                        r="7"
                        fill={pin.core ? '#F4F1EA' : '#D37B58'}
                        stroke="#1F2421"
                        strokeWidth="2"
                      />
                      <rect
                        x={pin.x + 10}
                        y={pin.y - 11}
                        width={pin.label.length * 6.2 + 12}
                        height="22"
                        rx="5"
                        fill="#111916"
                        fillOpacity="0.88"
                        stroke="#4A6B5D"
                        strokeWidth="1"
                      />
                      <text
                        x={pin.x + 16}
                        y={pin.y + 4}
                        fill="#F4F1EA"
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        {pin.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION G: CONSULTATION & SITE VISIT BOOKING FORM
         ===================================================================== */}
      <section id="verdant-booking" className="max-w-7xl mx-auto">
        <div
          className={`rounded-3xl border ${stoneCard} p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start`}
        >
          {/* Left 5 Cols: Consultation Value & What happens on site */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-semibold tracking-wide text-[#D37B58]">
              On-Site Architectural Consultation
            </div>
            <h2
              className="text-3xl sm:text-4xl font-normal tracking-tight"
              style={{
                fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif",
                textWrap: 'balance',
              }}
            >
              Book Your On-Site Architectural Consultation
            </h2>
            <p className="text-sm text-[#4A6B5D] leading-relaxed">
              Meet with a licensed Verdant Spaces landscape architect on your rooftop, courtyard, or commercial terrace for a comprehensive 45-minute feasibility assessment.
            </p>

            {attachedEstimateSummary && (
              <div className="p-4 rounded-xl bg-[#2C4A3E] text-[#F4F1EA] space-y-1 border border-[#4A6B5D]">
                <div className="text-[11px] text-[#D37B58] font-semibold">
                  Attached Estimator Configuration
                </div>
                <div className="text-xs font-mono">{attachedEstimateSummary}</div>
              </div>
            )}

            <div className="space-y-3 pt-2 border-t border-[#D8E2DC] dark:border-[#2C4A3E] text-xs">
              <div className="font-bold text-[#2C4A3E] dark:text-[#F4F1EA]">
                Included in Your Site Audit:
              </div>
              <div className="space-y-2 text-[#4A6B5D]">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#D37B58]" />
                  <span>Structural slab weight &amp; parapet wind-load inspection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#D37B58]" />
                  <span>Sun-path microclimate &amp; native plant palette matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#D37B58]" />
                  <span>Itemized turnkey proposal delivered within 5 business days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Interactive Booking Form */}
          <div className="lg:col-span-7">
            {bookingConfirmed ? (
              <div className="rounded-2xl bg-[#2C4A3E] text-[#F4F1EA] p-8 space-y-5 border border-[#4A6B5D]">
                <div className="w-12 h-12 rounded-2xl bg-[#D37B58] text-white flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-normal"
                  style={{ fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif" }}
                >
                  Site Visit Confirmed for {fullName}
                </h3>
                <p className="text-xs sm:text-sm text-[#D8E2DC] leading-relaxed">
                  We have reserved your on-site architectural audit for{' '}
                  <strong className="text-white">{preferredDate}</strong> at{' '}
                  <strong className="text-white">{zipAddress}</strong> ({propertyType}). A calendar invitation and structural checklist have been sent to{' '}
                  <span className="underline">{email}</span>.
                </p>
                {attachedEstimateSummary && (
                  <div className="p-3.5 rounded-xl bg-[#1F352C] text-xs font-mono text-[#D8E2DC]">
                    Pre-Loaded Spec: {attachedEstimateSummary}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setBookingConfirmed(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#F4F1EA] text-[#1F2421] text-xs font-semibold cursor-pointer"
                >
                  Modify Appointment Details
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleBookingSubmit}
                className="rounded-2xl bg-[#FAF9F6] dark:bg-[#111916] border border-[#D8E2DC] dark:border-[#2C4A3E] p-6 sm:p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Clara Sterling"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E2DC] bg-white dark:bg-[#192520] text-xs focus:outline-none focus:border-[#2C4A3E]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="clara@sterlingarch.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E2DC] bg-white dark:bg-[#192520] text-xs focus:outline-none focus:border-[#2C4A3E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold">Direct Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(212) 555-0192"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E2DC] bg-white dark:bg-[#192520] text-xs font-mono focus:outline-none focus:border-[#2C4A3E]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold">
                      Property Address / ZIP Code *
                    </label>
                    <div className="relative">
                      <MapPin
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A6B5D]"
                      />
                      <input
                        type="text"
                        required
                        value={zipAddress}
                        onChange={(e) => setZipAddress(e.target.value)}
                        placeholder="10013 · TriBeCa Penthouse"
                        className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-[#D8E2DC] bg-white dark:bg-[#192520] text-xs focus:outline-none focus:border-[#2C4A3E]"
                      />
                    </div>
                  </div>
                </div>

                {/* Property Type Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold">Property Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['Residential', 'Commercial'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPropertyType(type)}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition ${
                            propertyType === type
                              ? 'bg-[#2C4A3E] text-[#F4F1EA] border-[#2C4A3E]'
                              : 'border-[#D8E2DC] text-[#4A6B5D]'
                          }`}
                        >
                          {type === 'Residential' ? (
                            <Home size={13} />
                          ) : (
                            <Building2 size={13} />
                          )}
                          <span>{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold">Desired Timeline</label>
                    <select
                      value={desiredTimeline}
                      onChange={(e) => setDesiredTimeline(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E2DC] bg-white dark:bg-[#192520] text-xs focus:outline-none focus:border-[#2C4A3E]"
                    >
                      <option>Immediate (Next 2–4 Weeks)</option>
                      <option>Within 30 Days (Spring/Summer Window)</option>
                      <option>1–3 Months (Architectural Permitting Phase)</option>
                      <option>Exploratory / Budgeting for Next Season</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Date & Time Slot */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold">
                    Select Preferred On-Site Audit Window
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      'Thursday, Oct 15 · 10:30 AM',
                      'Friday, Oct 16 · 2:00 PM',
                      'Tuesday, Oct 20 · 11:00 AM',
                    ].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setPreferredDate(slot)}
                        className={`p-2.5 rounded-xl border text-[11px] font-mono text-left flex items-center gap-1.5 cursor-pointer transition ${
                          preferredDate === slot
                            ? 'border-[#D37B58] bg-[#F4F1EA] dark:bg-[#192520] font-bold text-[#1F2421] dark:text-[#F4F1EA]'
                            : 'border-[#D8E2DC] text-[#4A6B5D]'
                        }`}
                      >
                        <Calendar size={12} className="text-[#D37B58] shrink-0" />
                        <span className="truncate">{slot}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {formError && (
                  <p className="text-xs text-[#D37B58] font-semibold">{formError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#2C4A3E] hover:bg-[#223a30] text-[#F4F1EA] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                >
                  <Sparkles size={15} className="text-[#D37B58]" />
                  <span>Schedule On-Site Architectural Audit</span>
                  <ArrowRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
