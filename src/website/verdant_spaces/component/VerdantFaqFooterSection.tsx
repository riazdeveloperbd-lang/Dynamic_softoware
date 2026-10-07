import React, { useState } from 'react';
import {
  ChevronRight,
  Download,
  CheckCircle2,
  Award,
  Sprout,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface VerdantFaqFooterSectionProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

const VERDANT_FAQS = [
  {
    q: 'How do you verify structural weight limits and waterproofing for urban rooftops?',
    a: 'Every rooftop commission begins with a licensed structural PE load audit and electronic flood-testing of your existing membrane. We utilize lightweight engineered expanded-shale soil blends (weighing 45% less than mineral topsoil) and root-barrier drainage mats that protect and extend your roof warranty.',
  },
  {
    q: 'Do you handle Department of Buildings (DOB), Landmark, and HOA / Co-op board approvals?',
    a: 'Yes. Our in-house architectural expediting desk prepares stamped structural drawings, wind-uplift calculations, and 3D photorealistic board packages required by NYC Co-op/Condo boards, Landmarks Preservation Commission (LPC), and local municipal building departments.',
  },
  {
    q: 'What is included in your 1-Year Botanical Establishment & Plant Warranty?',
    a: 'When paired with our smart drip irrigation telemetry, every tree, perennial, and evergreen we install is backed by a 100% 1-year replacement guarantee. If any specimen fails to thrive through its first four seasons, our horticultural team replaces it at zero cost.',
  },
  {
    q: 'How do native plants survive harsh Northeast winters on exposed high-rise terraces?',
    a: 'Unlike tropical annuals that die each November, our Northeast native ecotypes (such as Serviceberry, Little Bluestem, Bearberry, and Eastern Red Cedar) are cold-hardy to USDA Zone 4 (-30°F) and evolved specifically to withstand high winds and freeze-thaw cycles inside insulated planter walls.',
  },
];

export const VerdantFaqFooterSection: React.FC<VerdantFaqFooterSectionProps> = ({
  title,
  subtitle,
  isDark = false,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);
  const [guideEmail, setGuideEmail] = useState<string>('');
  const [guideDownloaded, setGuideDownloaded] = useState<boolean>(false);

  const handleDownloadGuide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideEmail.trim() || !guideEmail.includes('@')) return;
    setGuideDownloaded(true);

    // Generate a real downloadable Native Plant & Biophilic Care Guide checklist file
    const guideContent = `VERDANT SPACES — SEASONAL URBAN GARDEN & NATIVE PLANT CARE GUIDE (2026 EDITION)
================================================================================
Prepared by Verdant Spaces Biophilic Architecture Studio (verdantspaces.arch)

1. SPRING AWAKENING (MARCH – MAY)
- Cut back ornamental native grasses (Little Bluestem, Switchgrass) to 4 inches before new green shoots emerge.
- Top-dress containers with 1 inch of organic leaf-mold compost and mycorrhizal inoculant.
- Pressure-test drip irrigation emitters and calibrate soil-moisture sensors to 35% volumetric threshold.

2. SUMMER CANOPY & HYDROLOGY (JUNE – AUGUST)
- Deep-water rooftop trees at dawn (5:30 AM) via subsurface drip lines to minimize evaporation.
- Deadhead native Echinacea and Agastache only partially—leave 40% of seed heads for urban pollinators and goldfinches.

3. AUTUMN ROOT FORTIFICATION (SEPTEMBER – NOVEMBER)
- Plant native spring ephemerals and botanical bulbs before first frost.
- Insulate exposed terrace hydrants and purge main irrigation manifolds with compressed air by November 20.

4. WINTER ARCHITECTURAL DORMANCY (DECEMBER – FEBRUARY)
- Leave perennial stems standing to trap insulating snow cover and provide overwintering habitat for beneficial insects.
- Inspect wind-anchoring guy wires on rooftop canopy specimens after major coastal storms.
`;
    const blob = new Blob([guideContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Verdant-Spaces-Seasonal-Urban-Garden-Care-Guide.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={isDark ? 'bg-[#111916] text-[#F4F1EA]' : 'bg-[#FAF9F6] text-[#1F2421]'}>
      {/* =====================================================================
          FAQ ACCORDION SECTION
         ===================================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold tracking-wide text-[#D37B58]">
            Engineering, Permitting &amp; Horticultural Guarantees
          </div>
          <h2
            className="text-3xl sm:text-4xl font-normal tracking-tight"
            style={{
              fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif",
              textWrap: 'balance',
            }}
          >
            Frequently Asked Architectural Questions
          </h2>
          <p className="text-sm text-[#4A6B5D]">
            Clear answers on rooftop structural weight engineering, HOA/DOB approvals, native plant warranties, and winter dormancy.
          </p>
        </div>

        <div className="space-y-3.5">
          {VERDANT_FAQS.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={item.q}
                className={`rounded-2xl border transition ${
                  isDark
                    ? 'bg-[#192520] border-[#2C4A3E]'
                    : 'bg-[#EFECE6] border-[#D8E2DC]'
                } p-5 sm:p-6`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span
                    className="text-base sm:text-lg font-normal"
                    style={{ fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif" }}
                  >
                    {item.q}
                  </span>
                  <ChevronRight
                    size={18}
                    className={`shrink-0 text-[#D37B58] transition-transform duration-200 ${
                      isOpen ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 pt-3 border-t border-[#D8E2DC] dark:border-[#2C4A3E] text-xs sm:text-sm text-[#4A6B5D] dark:text-[#D8E2DC]/85 leading-relaxed">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          SECTION I: FOOTER & SUSTAINABILITY PLEDGE
         ===================================================================== */}
      <footer className="bg-[#2C4A3E] text-[#F4F1EA] border-t border-[#4A6B5D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          {/* Lead Magnet Banner: Download the Seasonal Urban Garden Care Guide */}
          <div className="rounded-2xl bg-[#1F352C] border border-[#4A6B5D] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <div className="text-xs font-semibold text-[#D37B58]">
                Complimentary Architectural Field Manual
              </div>
              <h3
                className="text-2xl sm:text-3xl font-normal"
                style={{ fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif" }}
              >
                Download the Seasonal Urban Garden Care Guide
              </h3>
              <p className="text-xs sm:text-sm text-[#D8E2DC]/85 leading-relaxed">
                Receive our 4-season native pruning calendar, rooftop irrigation winterization checklist, and pollinator soil guide.
              </p>
            </div>

            <form
              onSubmit={handleDownloadGuide}
              className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
            >
              <input
                type="email"
                required
                value={guideEmail}
                onChange={(e) => setGuideEmail(e.target.value)}
                placeholder="Enter your email for instant download..."
                className="px-4 py-3 rounded-xl bg-[#2C4A3E] border border-[#4A6B5D] text-xs text-[#F4F1EA] placeholder:text-[#D8E2DC]/60 focus:outline-none focus:border-[#D37B58] min-w-[260px]"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-[#D37B58] hover:bg-[#c26c49] text-white text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer whitespace-nowrap"
              >
                {guideDownloaded ? (
                  <>
                    <CheckCircle2 size={15} />
                    <span>Guide Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download size={15} />
                    <span>Download Care Guide</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Main 4-Column Footer */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#4A6B5D]/60">
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1F352C] border border-[#4A6B5D] flex items-center justify-center text-[#D37B58]">
                  <Sprout size={18} />
                </div>
                <EditableText
                  id="verdant_footer_brand"
                  defaultText={title || 'Verdant Spaces'}
                  as="span"
                  className="text-xl font-normal tracking-tight"
                  style={{ fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif" }}
                />
              </div>

              <EditableText
                id="verdant_footer_desc"
                defaultText={
                  subtitle ||
                  'Biophilic urban architecture and sustainable landscape engineering studio transforming concrete rooftops, courtyards, and commercial terraces into living sanctuaries.'
                }
                as="p"
                className="text-xs text-[#D8E2DC]/80 leading-relaxed max-w-sm"
              />

              {/* Certifications & Trust Badges (Unboxed Clean Metadata) */}
              <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#D8E2DC]">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Award size={14} className="text-[#D37B58]" />
                  LEED Accredited Studio
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <Sprout size={14} className="text-[#D37B58]" />
                  National Wildlife Federation Certified
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <ShieldCheck size={14} className="text-[#D37B58]" />
                  1% for the Planet Member
                </span>
              </div>
            </div>

            <div className="md:col-span-2 space-y-2.5 text-xs">
              <div className="font-semibold text-[#D37B58]">Architecture</div>
              <ul className="space-y-2 text-[#D8E2DC]/85">
                <li>
                  <a href="#verdant-estimator" className="hover:text-white">
                    Project Estimator
                  </a>
                </li>
                <li>
                  <a href="#verdant-packages" className="hover:text-white">
                    Rooftop Sanctuaries
                  </a>
                </li>
                <li>
                  <a href="#verdant-packages" className="hover:text-white">
                    Townhouse Courtyards
                  </a>
                </li>
                <li>
                  <a href="#verdant-packages" className="hover:text-white">
                    Living Green Walls
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-2.5 text-xs">
              <div className="font-semibold text-[#D37B58]">Stewardship</div>
              <ul className="space-y-2 text-[#D8E2DC]/85">
                <li>
                  <a href="#verdant-portfolio" className="hover:text-white">
                    Before &amp; Afters
                  </a>
                </li>
                <li>
                  <a href="#verdant-coverage" className="hover:text-white">
                    NYC &amp; Tri-State Map
                  </a>
                </li>
                <li>
                  <a href="#verdant-ethos" className="hover:text-white">
                    Native Flora Charter
                  </a>
                </li>
                <li>
                  <a href="#verdant-booking" className="hover:text-white">
                    Book Site Audit
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-2.5 text-xs">
              <div className="font-semibold text-[#D37B58]">
                Architectural Studio &amp; Nursery
              </div>
              <p className="text-[#D8E2DC]/85 leading-relaxed">
                458 Broome Street, Penthouse Studio
                <br />
                SoHo, New York, NY 10013
              </p>
              <p className="font-mono text-[#F4F1EA]">(212) 555-0148</p>
              <div className="pt-2 flex items-center gap-4 text-[#D8E2DC]">
                <a
                  href="#verdant-portfolio"
                  className="hover:text-white flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <ArrowUpRight size={12} />
                </a>
                <a
                  href="#verdant-portfolio"
                  className="hover:text-white flex items-center gap-1"
                >
                  <span>Pinterest</span>
                  <ArrowUpRight size={12} />
                </a>
                <a
                  href="#verdant-portfolio"
                  className="hover:text-white flex items-center gap-1"
                >
                  <span>Houzz</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D8E2DC]/70">
            <span>
              © {new Date().getFullYear()} Verdant Spaces Architectural Landscaping PLLC. All rights reserved.
            </span>
            <span>
              100% Native Plants · Zero-Emissions Electric Fleet · Smart Rainwater Telemetry
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
