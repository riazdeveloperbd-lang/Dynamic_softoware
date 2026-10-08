import React, { useState } from 'react';
import {
  Layers,
  Award,
  Quote,
  MapPin,
  PhoneCall,
  Mail,
  ArrowUpRight,
  Compass,
  CheckCircle2,
  Building2,
  Eye,
  Sparkles,
  FileText,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';

export interface AtelierFormaMaterialityTestimonialsFooterSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface MaterialSwatch {
  id: string;
  code: string;
  name: string;
  origin: string;
  finishType: string;
  hexPreview: string;
  textureImage: string;
  architecturalApplication: string;
  acousticOrThermalSpec: string;
  careAndLongevity: string;
}

const MATERIAL_SWATCHES: MaterialSwatch[] = [
  {
    id: 'mat_travertine',
    code: 'SWATCH 01 / STONE',
    name: 'Honed Roman Silver Travertine',
    origin: 'Tivoli Quarry Import · Unfilled Open-Pore',
    finishType: 'Matte Honed & Sealed',
    hexPreview: '#CFC5B4',
    textureImage:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
    architecturalApplication:
      'Double-height feature monoliths, cantilevered fireplace hearths, and bespoke dining plinths.',
    acousticOrThermalSpec: 'High thermal mass; stays 4°C cooler than ambient Dhaka summer air.',
    careAndLongevity: 'Impregnated with breathable fluoropolymer sealer against monsoon humidity.',
  },
  {
    id: 'mat_burmese_teak',
    code: 'SWATCH 02 / TIMBER',
    name: 'Kiln-Seasoned Chittagong Burmese Teak',
    origin: 'Chattogram Hill Tracts · 12% Moisture Content',
    finishType: 'Hand-Rubbed Osmo Hardwax Matte Oil',
    hexPreview: '#7C5333',
    textureImage:
      'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=900&q=80',
    architecturalApplication:
      'Floor-to-ceiling pivot doors, acoustic slatted soffits, and cantilevered stair treads.',
    acousticOrThermalSpec: 'Natural oleoresin content prevents warping during 85% RH monsoon months.',
    careAndLongevity: 'Zero polyurethane plastic sheen; develops a rich amber patina over decades.',
  },
  {
    id: 'mat_pvd_bronze',
    code: 'SWATCH 03 / METAL',
    name: 'Brushed Champagne PVD Architectural Brass',
    origin: 'Vapor-Deposited 304 Stainless Core',
    finishType: 'Hairline Linear Brush',
    hexPreview: '#B8860B',
    textureImage:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
    architecturalApplication:
      'Shadow-gap skirting reveals, fluted glass partition frames, and custom wardrobe pulls.',
    acousticOrThermalSpec: '2mm CNC laser-folded profiles with concealed magnetic latches.',
    careAndLongevity: 'Anti-fingerprint PVD coating; impervious to oxidation and coastal salinity.',
  },
  {
    id: 'mat_limewash',
    code: 'SWATCH 04 / MINERAL',
    name: 'Artisanal Slaked Limewash & Micro-Cement',
    origin: 'Natural Dolomitic Lime & Marble Dust',
    finishType: 'Hand-Troweled Cloud Movement',
    hexPreview: '#E8DCC4',
    textureImage:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80',
    architecturalApplication:
      'Seamless curved corridor walls, monolithic wet-area vanities, and gallery-grade ceilings.',
    acousticOrThermalSpec: 'Zero-VOC breathable mineral surface; naturally alkaline & mold-resistant.',
    careAndLongevity: 'Absorbs harsh tropical daylight into a soft, velvety chiaroscuro glow.',
  },
  {
    id: 'mat_acoustic_felt',
    code: 'SWATCH 05 / ACOUSTIC',
    name: 'Architectural Woven Belgian Linen & Acoustic Felt',
    origin: 'Oeko-Tex Certified Natural Flax & Recycled PET Core',
    finishType: 'Tactile Slub Weave',
    hexPreview: '#9E9587',
    textureImage:
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80',
    architecturalApplication:
      'Motorized sheer drapery, master bedroom headboard upholstery, and boardroom wall panels.',
    acousticOrThermalSpec: 'NRC 0.85 sound absorption rating — eliminates slap-echo in large salons.',
    careAndLongevity: 'Scotchgard stain-repellent treatment with concealed ceiling track motors.',
  },
];

const CLIENT_TESTIMONIALS = [
  {
    quote:
      '“What astonished us was the 1:1 fidelity between Atelier Forma’s initial 4K Corona renders and the final apartment handover in Gulshan-2. Every shadow gap, marble vein alignment, and concealed air-conditioning slot was executed to the millimeter.”',
    client: 'Farzana & Mahbubur Rahman',
    role: 'Homeowners · 4,200 Sq. Ft. Penthouse, Gulshan-2',
    scope: 'Full Turnkey Interior Architecture · 16 Weeks',
  },
  {
    quote:
      '“As a real estate developer, their 3D architectural visualization and VR walkthroughs helped us pre-sell 80% of our Baridhara boutique residences before civil superstructure completion. Their grasp of tropical light and material honesty is unmatched in Dhaka.”',
    client: 'Imran Karin, Managing Director',
    role: 'Crestline Luxury Developments Ltd.',
    scope: 'Architectural Facade & 8K CGI Marketing Suite',
  },
  {
    quote:
      '“We commissioned Studio Forma from London to renovate our family duplex in Dhanmondi. Their weekly Gantt photo logs, itemized BOQ transparency, and acoustic double-glazing transformed a noisy street-facing house into a serene sanctuary.”',
    client: 'Dr. Shafiqul Alam (NRB Client)',
    role: 'Consultant Surgeon · London & Dhanmondi Rd 27',
    scope: 'Structural Renovation & Bespoke Millwork',
  },
];

export const AtelierFormaMaterialityTestimonialsFooterSection: React.FC<
  AtelierFormaMaterialityTestimonialsFooterSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [selectedSwatchIdx, setSelectedSwatchIdx] = useState<number>(0);
  const [lookbookDownloaded, setLookbookDownloaded] = useState<boolean>(false);

  const activeSwatch = MATERIAL_SWATCHES[selectedSwatchIdx];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="atelier-material-board"
      className={`w-full ${
        isDark ? 'bg-[#121212] text-[#F9F9F9]' : 'bg-[#F9F9F9] text-[#121212]'
      }`}
    >
      {/* ===================================================================== */}
      {/* 1. PRINCIPAL ARCHITECT SPOTLIGHT & INTERACTIVE MATERIALITY BOARD      */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 space-y-20">
        {/* Principal Architect & Design Philosophy Editorial Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-current/10 pb-20">
          {/* Portrait Column */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#121212] border border-current/15">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85"
                alt="Principal Architect in Studio"
                className="w-full h-full object-cover object-center filter grayscale contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E8DCC4]">
                  PRINCIPAL ARCHITECT &amp; FOUNDING PARTNER
                </div>
                <div className="text-2xl font-serif">Ar. Zafar Mahmood, IAB</div>
                <div className="text-xs text-white/75">
                  B.Arch (BUET) · M.Arch in Urban &amp; Spatial Design (AA London) · 14+ Years Practice
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Manifesto Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] opacity-65">
              <span>05. DESIGN PHILOSOPHY &amp; MATERIAL HONESTY</span>
              <span aria-hidden="true">·</span>
              <span>ATELIER MONOGRAPH</span>
            </div>

            <EditableText
              as="h2"
              value={title}
              className="text-3xl sm:text-5xl font-serif font-normal tracking-tight leading-[1.12]"
            />

            <blockquote className="text-base sm:text-lg font-serif italic opacity-85 leading-relaxed border-l-2 pl-5 py-1" style={{ borderColor: primaryColor }}>
              “Luxury in tropical architecture is not achieved by layering gilded ornament.
              It is carved through quiet proportion, cross-ventilated shadow, and honest materials
              — stone, seasoned teak, and mineral lime — that age with dignity under the Bengal sun.”
            </blockquote>

            <EditableText
              as="p"
              value={subtitle}
              className="text-sm opacity-75 leading-relaxed"
            />

            {/* Credentials & Software Pipeline */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-current/10 text-xs">
              <div>
                <div className="font-mono uppercase text-[10px] opacity-60">
                  ACCREDITATION
                </div>
                <div className="font-semibold mt-1">
                  Institute of Architects Bangladesh (IAB #A-0942) &amp; RAJUK Listed
                </div>
              </div>
              <div>
                <div className="font-mono uppercase text-[10px] opacity-60">
                  BIM &amp; 3D PIPELINE
                </div>
                <div className="font-semibold mt-1">
                  Autodesk Revit BIM · 3ds Max · Corona 11 · Unreal Engine 5 VR
                </div>
              </div>
              <div>
                <div className="font-mono uppercase text-[10px] opacity-60">
                  MILLWORK ATELIER
                </div>
                <div className="font-semibold mt-1">
                  In-House 18,000 sft CNC Joinery &amp; Kiln Facility (Gazipur)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Tactile Materiality Board */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] opacity-65">
                TACTILE PALETTE EXPLORER
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-normal mt-1">
                Curated Studio Materiality &amp; Finish Swatches
              </h3>
            </div>
            <p className="text-xs opacity-70 max-w-md">
              Select any physical swatch below to inspect its quarry/kiln origin, tropical
              humidity resilience, and architectural application.
            </p>
          </div>

          {/* Swatch Selector Strip + Active Detail Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Swatch Buttons (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-2.5">
              {MATERIAL_SWATCHES.map((sw, idx) => {
                const active = selectedSwatchIdx === idx;
                return (
                  <button
                    key={sw.id}
                    type="button"
                    onClick={() => setSelectedSwatchIdx(idx)}
                    className={`p-4 text-left border transition flex items-center justify-between gap-4 cursor-pointer ${
                      active
                        ? 'bg-[#121212] text-[#E8DCC4] border-[#121212] shadow-lg'
                        : isDark
                        ? 'bg-[#181818] text-white/80 border-white/10 hover:border-white/30'
                        : 'bg-white text-[#121212] border-[#121212]/15 hover:border-[#121212]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className="w-8 h-8 flex-shrink-0 border border-white/20"
                        style={{ backgroundColor: sw.hexPreview }}
                      />
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono uppercase opacity-65">
                          {sw.code}
                        </div>
                        <div className="text-xs font-bold truncate">{sw.name}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono opacity-60">0{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Swatch High-Res Inspection Card (7 Columns) */}
            <div className="lg:col-span-7 bg-[#121212] text-[#F9F9F9] border border-[#E8DCC4]/25 grid grid-cols-1 sm:grid-cols-12 overflow-hidden">
              <div className="sm:col-span-5 relative min-h-[240px]">
                <img
                  src={activeSwatch.textureImage}
                  alt={activeSwatch.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/80 text-[10px] font-mono uppercase text-[#E8DCC4]">
                  {activeSwatch.finishType}
                </div>
              </div>

              <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#E8DCC4]">
                    {activeSwatch.origin}
                  </div>
                  <h4 className="text-2xl font-serif font-normal text-white">
                    {activeSwatch.name}
                  </h4>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-white/55 block">
                      SPATIAL APPLICATION
                    </span>
                    <p className="text-white/85 mt-0.5 leading-relaxed">
                      {activeSwatch.architecturalApplication}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-white/55 block">
                      CLIMATE &amp; ACOUSTIC PERFORMANCE
                    </span>
                    <p className="text-white/85 mt-0.5 leading-relaxed">
                      {activeSwatch.acousticOrThermalSpec}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-white/55 block">
                      LONGEVITY &amp; PATINA
                    </span>
                    <p className="text-[#E8DCC4] mt-0.5 leading-relaxed">
                      {activeSwatch.careAndLongevity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Endorsements & Developer Testimonials */}
        <div className="space-y-8 pt-8 border-t border-current/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] opacity-65">
                PATRON &amp; DEVELOPER ENDORSEMENTS
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-normal mt-1">
                Reflections from Completed Commissions
              </h3>
            </div>
            <span className="text-xs opacity-70">
              98.4% On-Time Handover Record Across 120+ Spaces
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLIENT_TESTIMONIALS.map((item) => (
              <div
                key={item.client}
                className={`p-7 border flex flex-col justify-between space-y-6 ${
                  isDark
                    ? 'bg-[#181818] border-white/10'
                    : 'bg-white border-[#121212]/15'
                }`}
              >
                <p className="text-xs sm:text-sm leading-relaxed font-serif italic opacity-90">
                  {item.quote}
                </p>
                <div className="pt-4 border-t border-current/10 space-y-1">
                  <div className="text-xs font-bold">{item.client}</div>
                  <div className="text-[11px] opacity-70">{item.role}</div>
                  <div
                    className="text-[10px] font-mono uppercase pt-1"
                    style={{ color: primaryColor }}
                  >
                    {item.scope}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. ARCHITECTURAL MONOGRAPH FOOTER                                     */}
      {/* ===================================================================== */}
      <footer className="w-full bg-[#121212] text-[#F9F9F9] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-20 space-y-14">
          {/* Top Lead Magnet: 2026 Architectural Monograph & Sq.Ft. Cost Guide */}
          <div className="p-8 sm:p-10 bg-[#1A1A1A] border border-[#E8DCC4]/25 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#E8DCC4]">
                COMPLIMENTARY 2026 ARCHITECTURAL DOSSIER (PDF · 18.4 MB)
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white">
                Download Our 2026 Dhaka Luxury Interior &amp; Material Cost Guide
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Includes current square-foot rates for Italian marble, seasoned Burmese
                teak, DALI smart lighting, and a 25-point pre-handover apartment inspection
                checklist.
              </p>
            </div>

            <div>
              {lookbookDownloaded ? (
                <div className="px-5 py-3.5 bg-white/10 border border-[#E8DCC4] text-xs text-[#E8DCC4] flex items-center gap-2">
                  <CheckCircle2 size={16} style={{ color: primaryColor }} />
                  <span>
                    Dossier Dispatched · Atelier_Forma_2026_Monograph_BOQ.pdf
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setLookbookDownloaded(true)}
                  className="px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#121212] bg-[#E8DCC4] hover:bg-white transition flex items-center gap-2 cursor-pointer"
                >
                  <FileText size={15} />
                  <span>Download 2026 Studio Monograph &amp; Rate Card</span>
                </button>
              )}
            </div>
          </div>

          {/* 4-Column Studio Directory */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10 text-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center border border-[#E8DCC4]/40 font-serif text-sm">
                  <span style={{ color: primaryColor }}>A</span>F
                </div>
                <span className="text-base font-serif font-bold tracking-wide text-white">
                  ATELIER FORMA
                </span>
              </div>
              <p className="text-white/65 leading-relaxed">
                Architecture, Bespoke Interior Transformation, and 4K/VR Spatial
                Visualization Studio serving discerning residential &amp; commercial
                patrons.
              </p>
              <div className="text-[11px] font-mono text-[#E8DCC4]">
                IAB Practice Reg #A-0942 · RAJUK Enlisted
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="font-mono uppercase tracking-widest text-[#E8DCC4]">
                DHAKA FLAGSHIP ATELIER
              </div>
              <p className="text-white/75 leading-relaxed">
                Level 6, House 14, Road 71, Gulshan-2, Dhaka-1212, Bangladesh
              </p>
              <p className="text-white/60">
                Design Material Library Open: Sat – Thu (10:30 AM – 7:30 PM)
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="font-mono uppercase tracking-widest text-[#E8DCC4]">
                CHATTOGRAM &amp; INTL DESK
              </div>
              <p className="text-white/75 leading-relaxed">
                Road 3, South Khulshi, Chattogram · NRB Remote 3D Consultation Desk
                (London / Singapore / Dubai)
              </p>
              <p className="text-white/80 font-mono">
                +880 1711-940210 · studio@atelierforma.com.bd
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="font-mono uppercase tracking-widest text-[#E8DCC4]">
                NAVIGATION
              </div>
              <ul className="space-y-1.5 text-white/75">
                <li>
                  <button
                    type="button"
                    onClick={scrollToTop}
                    className="hover:text-[#E8DCC4] cursor-pointer"
                  >
                    ↑ Return to Spatial Showcase
                  </button>
                </li>
                <li>Selected Works Monograph (2023–2026)</li>
                <li>Before / After 3D Render Slider</li>
                <li>Sq. Ft. Turnkey Cost Estimator</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
            <span>
              © {new Date().getFullYear()} Atelier Forma Architecture &amp; Spatial Design
              Ltd. All rights reserved.
            </span>
            <span>
              Palette: #121212 Charcoal · #E8DCC4 Warm Sand · #F9F9F9 Studio White · #B8860B Bronze
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
