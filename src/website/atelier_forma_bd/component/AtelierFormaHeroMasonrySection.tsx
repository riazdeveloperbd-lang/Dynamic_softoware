import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  Ruler,
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  Building2,
  Eye,
  Box,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';

export interface AtelierFormaHeroMasonrySectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

type ProjectCategory =
  | 'All Projects'
  | 'Residential Apartments'
  | 'Duplexes & Villas'
  | 'Commercial & Offices'
  | '3D Concept Renders';

interface ArchitecturalProject {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All Projects'>;
  location: string;
  areaSqFt: string;
  completionYear: string;
  timeline: string;
  budgetTier: string;
  aspectClass: 'aspect-[4/5]' | 'aspect-[16/10]' | 'aspect-square';
  heroImage: string;
  galleryImages: { label: string; url: string }[];
  floorPlanSchematic: {
    zones: string[];
    structuralNote: string;
    naturalLightIndex: string;
  };
  materialsUsed: string[];
  lightingDesign: string;
  architectCredits: string;
  editorialBrief: string;
}

const HERO_SHOWCASE_SLIDES = [
  {
    id: 'slide_1',
    code: 'ARCHIVE 01 / DUPLEX PENTHOUSE',
    title: 'The Gulshan-2 Travertine Sky Villa',
    location: 'North Gulshan Avenue, Dhaka',
    specs: '5,400 Sq. Ft. · Double-Height Cantilever · Burmese Teak & Honed Limestone',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'slide_2',
    code: 'ARCHIVE 02 / CONTEMPORARY RESIDENCE',
    title: 'House of Filtered Monsoon Light',
    location: 'Dhanmondi Road 27, Dhaka',
    specs: '3,650 Sq. Ft. · Board-Formed Fair-Faced Concrete · Terracotta Louver Screen',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
  },
  {
    id: 'slide_3',
    code: 'ARCHIVE 03 / EXECUTIVE HQ',
    title: 'Apex FinTech Flagship Atelier',
    location: 'Tejgaon Commercial Corridor, Dhaka',
    specs: '12,000 Sq. Ft. · Acoustic Fluted Oak Baffles · DALI Circadian Lighting',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
  },
];

const PORTFOLIO_PROJECTS: ArchitecturalProject[] = [
  {
    id: 'proj_gulshan_penthouse',
    title: 'The Solitude Penthouse at Lakehore',
    category: 'Residential Apartments',
    location: 'Gulshan-2, Road 71, Dhaka',
    areaSqFt: '4,200 sq. ft.',
    completionYear: '2026',
    timeline: '16 Weeks Turnkey',
    budgetTier: 'Ultra-Luxury Bespoke (৳82L)',
    aspectClass: 'aspect-[4/5]',
    heroImage:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      {
        label: 'Main Living Salon — Dusk Illumination',
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      },
      {
        label: '3D Corona Render vs Executed Millwork',
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
      },
      {
        label: 'Monolithic Italian Statuario Dry Kitchen',
        url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      },
    ],
    floorPlanSchematic: {
      zones: [
        'Private Foyer & Sculptural Travertine Gallery',
        'Open-Plan Formal Lounge + 10-Seater Burmese Teak Dining',
        'Dual Wet & Dry Chef Kitchens with Concealed Pantry Pocket Door',
        'Master Suite with Acoustic Walk-In Wardrobe & Rain Spa',
      ],
      structuralNote:
        'Removed 3 non-load-bearing masonry partitions to unlock a 48-foot uninterrupted cross-ventilated sightline overlooking Gulshan Lake.',
      naturalLightIndex: '84% Daylight Autonomy (South-East Glazing)',
    },
    materialsUsed: [
      'Book-matched Italian Statuario Marble',
      'Seasoned Chittagong Burmese Teak (Matte Oil Finish)',
      'Brushed Champagne PVD Brass Hardware',
      'Limewash Mineral Plaster Walls (#E8DCC4)',
    ],
    lightingDesign:
      '2700K Warm Architectural Recessed Magnetic Track + Concealed Grazing Cove LEDs (CRI 97+)',
    architectCredits:
      'Lead Architect: Ar. Zafar Mahmood (IAB) · Senior Interior Stylist: Nadia Rahman',
    editorialBrief:
      'Conceived as a quiet sanctuary above Dhaka’s dense urban fabric, this 4,200 sq. ft. residence balances raw mineral plaster surfaces with custom-milled teak joinery and museum-grade lighting.',
  },
  {
    id: 'proj_baridhara_duplex',
    title: 'Villa Terracotta & Courtyard Pavilion',
    category: 'Duplexes & Villas',
    location: 'Baridhara Diplomatic Zone, Dhaka',
    areaSqFt: '6,800 sq. ft.',
    completionYear: '2025',
    timeline: '24 Weeks Civil + Interior',
    budgetTier: 'Signature Architectural (৳1.45Cr)',
    aspectClass: 'aspect-[16/10]',
    heroImage:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      {
        label: 'Double-Height Courtyard & Cantilever Stair',
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      },
      {
        label: 'Cantilevered Steel & Teak Staircase Detail',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      },
      {
        label: 'Master Terrace & Reflection Pool',
        url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      },
    ],
    floorPlanSchematic: {
      zones: [
        'Double-Height Internal Reflection Atrium',
        'Ground Level Formal Entertaining & Library',
        'Upper Level Family Lounge & 4 En-Suite Bedrooms',
        'Rooftop Glass Tea Pavilion & Monsoon Deck',
      ],
      structuralNote:
        'Engineered a self-supporting folded steel-plate staircase clad in 50mm solid teak treads anchored into a fair-faced concrete shear wall.',
      naturalLightIndex: '91% Daylight Penetration via Central Skylight Well',
    },
    materialsUsed: [
      'Board-Formed Architectural Concrete',
      'Handcrafted Khadimnagar Terracotta Jaali Blocks',
      'Honed Black Basalt Flooring',
      'Raw Unlacquered Bronze Fixtures',
    ],
    lightingDesign:
      'Automated Lutron HomeWorks DALI System with Dusk-to-Midnight Scene Presets',
    architectCredits:
      'Principal Architect: Ar. Zafar Mahmood · Structural Consultant: Eng. Rashedul Karim',
    editorialBrief:
      'Drawing inspiration from Bengal’s modernist heritage, Villa Terracotta utilizes perforated brick screens to filter harsh tropical glare while funneling prevailing south breezes across an indoor water court.',
  },
  {
    id: 'proj_banani_hq',
    title: 'Vanguard Venture Capital HQ',
    category: 'Commercial & Offices',
    location: 'Banani Road 11, Dhaka',
    areaSqFt: '5,100 sq. ft.',
    completionYear: '2026',
    timeline: '12 Weeks Fast-Track',
    budgetTier: 'Executive Commercial (৳68L)',
    aspectClass: 'aspect-square',
    heroImage:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      {
        label: '16-Seater Acoustic Boardroom & Brass Mesh Partitions',
        url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85',
      },
      {
        label: 'Partner Suites & Espresso Lounge',
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
      },
    ],
    floorPlanSchematic: {
      zones: [
        'Sculptural Monolith Reception & Client Espresso Bar',
        'STC-52 Rated Soundproof Investment Committee Boardroom',
        '4 Managing Partner Corner Suites + 28 Ergonomic Trading Desks',
        '3 Acoustic Phone Booths & Prayer/Wellness Sanctuary',
      ],
      structuralNote:
        'Double-glazed acoustic laminated glass partitions with concealed floor springs and under-floor power trunking.',
      naturalLightIndex: '78% Perimeter Glazing Utilization',
    },
    materialsUsed: [
      'Smoked American Walnut Veneer',
      'Acoustic PET Felt Slatted Ceilings (NRC 0.85)',
      'Sintered Charcoal Porcelain Slabs',
      'Fluted Reeded Privacy Glass',
    ],
    lightingDesign:
      '3500K Neutral-Warm Linear Suspended Louvers (UGR < 16 Glare-Free)',
    architectCredits:
      'Lead Commercial Designer: Ar. Farhan Sobhan · MEP & Acoustics: Studio Forma Lab',
    editorialBrief:
      'An institutional-grade workspace engineered for discretion and focus, replacing sterile corporate cubicles with hospitality-inspired walnut lounges and high-isolation acoustic glass.',
  },
  {
    id: 'proj_purbachal_pavilion_3d',
    title: 'The Glass Monsoon Pavilion (CGI Study)',
    category: '3D Concept Renders',
    location: 'Purbachal Sector 4 (10-Katha Plot)',
    areaSqFt: '8,400 sq. ft.',
    completionYear: '2026 CGI',
    timeline: '3 Weeks 4K Visualization + BIM',
    budgetTier: '3D ArchViz & RAJUK Approval Package',
    aspectClass: 'aspect-[4/5]',
    heroImage:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      {
        label: '8K Corona Photorealistic Overcast Monsoon Render',
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      },
      {
        label: 'Golden Hour Poolside Elevation Study',
        url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
      },
    ],
    floorPlanSchematic: {
      zones: [
        'Submerged Entry Bridge over Koi Reflection Pond',
        'Cantilevered 24-Foot Column-Free Living Pavilion',
        'Private Master Wing with Suspended Garden Terrace',
        'Basement Cinema, Gym & 4-Car Collector Garage',
      ],
      structuralNote:
        'Full Revit BIM LOD-350 model + 3ds Max / Corona 11 physically based shader pipeline with accurate Dhaka solar azimuth study.',
      naturalLightIndex: 'Simulated 100% Ray-Traced Solar Study (June & December Solstices)',
    },
    materialsUsed: [
      'PBR Scanned Travertine & Weathered Corten Steel',
      'Low-E Triple-Silver Solar Control Glass',
      'Charred Shou Sugi Ban Cedar Cladding',
    ],
    lightingDesign:
      'IES Photometric Profiles matched to ERCO & Flos Architectural Luminaires',
    architectCredits:
      'Lead 3D Visualization Artist: Rafsan Jani · Concept Architect: Ar. Zafar Mahmood',
    editorialBrief:
      'Commissioned prior to civil piling in Purbachal, this hyper-real 3D architectural visualization suite allowed the client to experience every shadow, material joint, and monsoon reflection in VR before pouring concrete.',
  },
  {
    id: 'proj_dhanmondi_apartment',
    title: 'Dhanmondi Wabi-Sabi Residence',
    category: 'Residential Apartments',
    location: 'Dhanmondi Road 9/A, Dhaka',
    areaSqFt: '2,850 sq. ft.',
    completionYear: '2025',
    timeline: '14 Weeks Turnkey',
    budgetTier: 'Premium Bespoke (৳46L)',
    aspectClass: 'aspect-[16/10]',
    heroImage:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      {
        label: 'Earthy Micro-Cement Living & Custom Bouclé Sofa',
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
      },
      {
        label: 'Hand-Troweled Limewash Dining Nook',
        url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      },
    ],
    floorPlanSchematic: {
      zones: [
        'Curved Plaster Entryway with Concealed Shoe & Coat Millwork',
        'Seamless Micro-Cement Living & Tea Alcove',
        '3 Bedrooms with Integrated Floating Cane & Teak Headboards',
      ],
      structuralNote:
        'Softened harsh structural column corners with 180mm radius plaster curves and continuous shadow-gap skirting.',
      naturalLightIndex: '80% Diffused Linen Sheer Daylight',
    },
    materialsUsed: [
      'Seamless Warm Sand Micro-Cement (#E8DCC4)',
      'Natural Rattan & Woven Cane Inserts',
      'Hand-Thrown Tangail Ceramic Pendant Lamps',
      'Unbleached Belgian Linen Drapery',
    ],
    lightingDesign:
      'Zero Ceiling Downlights in Living Zone — 100% Indirect Cove & Floor Uplighting',
    architectCredits:
      'Interior Lead: Nadia Rahman · Custom Furniture Atelier: Forma Craft Dhaka',
    editorialBrief:
      'Designed for a couple returning from Tokyo, this residence eschews glossy marble in favor of tactile micro-cement, woven cane cabinetry, and serene indirect illumination.',
  },
  {
    id: 'proj_khulshi_hill_villa',
    title: 'Khulshi Hillside Glass & Stone Residence',
    category: 'Duplexes & Villas',
    location: 'South Khulshi, Chattogram',
    areaSqFt: '5,600 sq. ft.',
    completionYear: '2026',
    timeline: '20 Weeks Execution',
    budgetTier: 'Luxury Turnkey (৳98L)',
    aspectClass: 'aspect-square',
    heroImage:
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      {
        label: 'Hilltop Infinity Deck & Double-Height Lounge',
        url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
      },
      {
        label: 'Natural Sylhet Stone Feature Wall',
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      },
    ],
    floorPlanSchematic: {
      zones: [
        'Split-Level Topographic Entry Deck',
        'Panoramic Bay of Bengal & Hill View Formal Salon',
        'Custom Wine & Cigar Humidor Lounge',
        '4 Terraced Suites with Private Landscaped Balconies',
      ],
      structuralNote:
        'Marine-grade anodized aluminum fenestration engineered for coastal wind loads and high-humidity resistance.',
      naturalLightIndex: '89% Panoramic West-South Glazing with Motorized Louvers',
    },
    materialsUsed: [
      'Split-Face Sylhet Sandstone Cladding',
      'Marine-Grade Teak Decking',
      'Brushed Bronze Architectural Mesh',
      'Honed Beige Travertine Slabs',
    ],
    lightingDesign:
      'Architectural Step Grazing + Anti-Glare Honeycomb Louver Downlights',
    architectCredits:
      'Chattogram Studio Lead: Ar. Tanvir Chowdhury · Landscape: Studio Forma',
    editorialBrief:
      'Anchored into the contours of South Khulshi, this hillside duplex celebrates Chattogram’s topography with split-level stone terraces and warm bronze interiors.',
  },
];

export const AtelierFormaHeroMasonrySection: React.FC<
  AtelierFormaHeroMasonrySectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>('All Projects');
  const [lightboxProject, setLightboxProject] =
    useState<ArchitecturalProject | null>(null);
  const [activeLightboxTab, setActiveLightboxTab] = useState<
    'photos' | 'floorplan' | 'specs'
  >('photos');
  const [activeGalleryImgIdx, setActiveGalleryImgIdx] = useState(0);
  const [similarRequestSuccess, setSimilarRequestSuccess] = useState(false);

  const activeSlide = HERO_SHOWCASE_SLIDES[activeSlideIdx];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All Projects') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openProjectLightbox = (proj: ArchitecturalProject) => {
    setLightboxProject(proj);
    setActiveLightboxTab('photos');
    setActiveGalleryImgIdx(0);
    setSimilarRequestSuccess(false);
  };

  return (
    <div
      className={`w-full ${
        isDark ? 'bg-[#121212] text-[#F9F9F9]' : 'bg-[#F9F9F9] text-[#121212]'
      }`}
    >
      {/* ===================================================================== */}
      {/* 1. HERO SECTION: FULL-BLEED SPATIAL SHOWCASE                          */}
      {/* ===================================================================== */}
      <section className="relative w-full min-h-[680px] lg:min-h-[760px] flex flex-col justify-between overflow-hidden bg-[#121212] text-[#F9F9F9]">
        {/* Full-Bleed Architectural Background Image with Subtle Scale Transition */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeSlide.image}
            alt={activeSlide.title}
            className="w-full h-full object-cover object-center opacity-55 transition-all duration-700 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/55 to-[#121212]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/90 via-[#121212]/45 to-transparent" />
        </div>

        {/* Top Architectural Grid Coordinates Bar */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-8 pt-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#E8DCC4]">
            <span>{activeSlide.code}</span>
            <span aria-hidden="true">·</span>
            <span className="text-white/75">{activeSlide.location}</span>
          </div>

          <div className="flex items-center gap-2">
            {HERO_SHOWCASE_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSlideIdx(idx)}
                className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider transition cursor-pointer border ${
                  idx === activeSlideIdx
                    ? 'bg-[#E8DCC4] text-[#121212] border-[#E8DCC4] font-bold'
                    : 'bg-black/40 text-white/70 border-white/15 hover:text-white'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Center Editorial Copy & Primary CTAs */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-8 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5 text-xs uppercase tracking-[0.22em] text-[#E8DCC4]">
              <span>ARCHITECTURE</span>
              <span aria-hidden="true">/</span>
              <span>BESPOKE INTERIORS</span>
              <span aria-hidden="true">/</span>
              <span>3D SPATIAL VISUALIZATION</span>
            </div>

            <EditableText
              as="h1"
              value={title}
              className="text-4xl sm:text-6xl lg:text-[64px] font-serif font-normal tracking-tight leading-[1.06] text-[#F9F9F9]"
            />

            <EditableText
              as="p"
              value={subtitle}
              className="text-sm sm:text-base lg:text-lg text-[#E8DCC4]/90 max-w-2xl leading-relaxed font-light"
            />

            {/* Primary CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToId('atelier-masonry-gallery')}
                className="px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#121212] bg-[#E8DCC4] hover:bg-white transition flex items-center gap-2.5 cursor-pointer"
              >
                <span>Explore Portfolio</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                onClick={() => scrollToId('atelier-estimator')}
                className="px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white border border-[#E8DCC4]/50 bg-black/40 hover:bg-white/10 transition flex items-center gap-2.5 cursor-pointer"
              >
                <SlidersHorizontal size={14} style={{ color: primaryColor }} />
                <span>Calculate Project Cost</span>
              </button>
            </div>
          </div>

          {/* Right Active Slide Architectural Spec Card */}
          <div className="lg:col-span-4">
            <div className="p-6 bg-[#121212]/85 backdrop-blur-md border border-[#E8DCC4]/25 space-y-4">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#E8DCC4]/75">
                <span>FEATURED SPATIAL MONOGRAPH</span>
                <span style={{ color: primaryColor }}>LIVE VIEW</span>
              </div>
              <h2 className="text-lg font-serif font-semibold text-white">
                {activeSlide.title}
              </h2>
              <p className="text-xs text-white/75 leading-relaxed">
                {activeSlide.specs}
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => openProjectLightbox(PORTFOLIO_PROJECTS[activeSlideIdx])}
                  className="text-xs font-semibold uppercase tracking-wider text-[#E8DCC4] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Inspect Floor Plan & Materials</span>
                  <ArrowUpRight size={14} style={{ color: primaryColor }} />
                </button>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlideIdx((prev) =>
                        prev === 0 ? HERO_SHOWCASE_SLIDES.length - 1 : prev - 1
                      )
                    }
                    className="p-1.5 border border-white/15 hover:bg-white/10 text-white cursor-pointer"
                    aria-label="Previous project slide"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlideIdx(
                        (prev) => (prev + 1) % HERO_SHOWCASE_SLIDES.length
                      )
                    }
                    className="p-1.5 border border-white/15 hover:bg-white/10 text-white cursor-pointer"
                    aria-label="Next project slide"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Studio Stats Banner */}
        <div className="relative z-10 w-full bg-[#0A0A0A]/90 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <span
                className="text-2xl sm:text-3xl font-serif font-bold"
                style={{ color: '#E8DCC4' }}
              >
                120+
              </span>
              <div className="text-xs">
                <div className="font-semibold uppercase tracking-wider text-white">
                  Spaces Transformed
                </div>
                <div className="text-white/60">
                  Turnkey apartments, duplexes & corporate HQs
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:border-l sm:border-white/10 sm:pl-6">
              <span
                className="text-2xl sm:text-3xl font-serif font-bold"
                style={{ color: primaryColor }}
              >
                AD / IAB
              </span>
              <div className="text-xs">
                <div className="font-semibold uppercase tracking-wider text-white">
                  Featured in Architectural Digest
                </div>
                <div className="text-white/60">
                  2025 South Asian Spatial Design Commendation
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:border-l sm:border-white/10 sm:pl-6">
              <span
                className="text-2xl sm:text-3xl font-serif font-bold"
                style={{ color: '#E8DCC4' }}
              >
                BD · INTL
              </span>
              <div className="text-xs">
                <div className="font-semibold uppercase tracking-wider text-white">
                  Serving Dhaka, Chattogram & International Clients
                </div>
                <div className="text-white/60">
                  Gulshan · Dhanmondi · Baridhara · Singapore · London
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. IMMERSIVE MASONRY PROJECT GALLERY & CASE STUDY LIGHTBOX            */}
      {/* ===================================================================== */}
      <section
        id="atelier-masonry-gallery"
        className="max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 space-y-12"
      >
        {/* Editorial Section Header + Interactive Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-current/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] opacity-65">
              <span>01. SELECTED WORKS ARCHIVE</span>
              <span aria-hidden="true">·</span>
              <span>2023 — 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight">
              Curated Spatial Monographs &amp; Built Works
            </h2>
            <p className="text-sm opacity-75 leading-relaxed">
              Every project is approached as a site-specific dialogue between natural light,
              honest materiality, and human proportion. Click any work to inspect the
              floor plan schematic, material palette, and 4K documentation.
            </p>
          </div>

          {/* Interactive Category Filter Bar (Segmented Functional Buttons) */}
          <div
            className={`flex flex-wrap items-center gap-1.5 p-1.5 border ${
              isDark
                ? 'bg-[#1A1A1A] border-white/10'
                : 'bg-[#EFECE6] border-[#121212]/10'
            }`}
          >
            {(
              [
                'All Projects',
                'Residential Apartments',
                'Duplexes & Villas',
                'Commercial & Offices',
                '3D Concept Renders',
              ] as ProjectCategory[]
            ).map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-semibold tracking-wider uppercase transition cursor-pointer ${
                    active
                      ? 'bg-[#121212] text-[#E8DCC4] shadow-xs'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Masonry-Style Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              onClick={() => openProjectLightbox(project)}
              className={`group cursor-pointer flex flex-col space-y-4 ${
                idx % 3 === 1 ? 'lg:mt-10' : ''
              }`}
            >
              {/* Image Container with Hover Reveal Overlay */}
              <div
                className={`relative w-full ${project.aspectClass} overflow-hidden bg-[#121212] border border-current/10`}
              >
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                {/* Top Unboxed Editorial Index */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#E8DCC4]">
                  <span>
                    0{idx + 1} / {project.category}
                  </span>
                  <span>{project.completionYear}</span>
                </div>

                {/* Hover Bottom Slide-Up Project Specs */}
                <div className="absolute bottom-0 inset-x-0 p-6 text-white flex flex-col justify-end space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#E8DCC4]">
                    <span>{project.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.areaSqFt}</span>
                  </div>
                  <h3 className="text-xl font-serif font-normal tracking-tight text-white group-hover:text-[#E8DCC4] transition-colors">
                    {project.title}
                  </h3>
                  <div className="pt-2 flex items-center justify-between text-xs uppercase tracking-widest text-white/80 border-t border-white/15">
                    <span>Open Case Study &amp; Floor Plan</span>
                    <Maximize2 size={14} style={{ color: primaryColor }} />
                  </div>
                </div>
              </div>

              {/* Quiet Unboxed Below-Card Metadata */}
              <div className="flex items-center justify-between text-xs opacity-75 px-0.5">
                <span>{project.materialsUsed[0]}</span>
                <span>·</span>
                <span>{project.timeline}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. PROJECT DETAIL LIGHTBOX / MODAL VIEW                               */}
      {/* ===================================================================== */}
      {lightboxProject && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setLightboxProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl bg-[#121212] text-[#F9F9F9] border border-[#E8DCC4]/30 shadow-2xl overflow-hidden my-auto"
          >
            {/* Top Modal Header Bar */}
            <div className="px-6 py-4 bg-[#0A0A0A] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#E8DCC4]">
                  <span>{lightboxProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{lightboxProject.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{lightboxProject.areaSqFt}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-normal text-white mt-0.5">
                  {lightboxProject.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                {/* Modal View Switcher Tabs */}
                <div className="flex items-center bg-white/5 border border-white/15 p-1">
                  <button
                    type="button"
                    onClick={() => setActiveLightboxTab('photos')}
                    className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider cursor-pointer ${
                      activeLightboxTab === 'photos'
                        ? 'bg-[#E8DCC4] text-[#121212]'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    High-Res Gallery
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLightboxTab('floorplan')}
                    className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider cursor-pointer ${
                      activeLightboxTab === 'floorplan'
                        ? 'bg-[#E8DCC4] text-[#121212]'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    2D / 3D Floor Plan
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLightboxTab('specs')}
                    className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider cursor-pointer ${
                      activeLightboxTab === 'specs'
                        ? 'bg-[#E8DCC4] text-[#121212]'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Material &amp; Lighting Specs
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setLightboxProject(null)}
                  className="p-2 bg-white/5 hover:bg-white/15 text-white/80 cursor-pointer"
                  aria-label="Close Case Study Modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Main Body: Left Visual Viewer + Right Project Specs Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left 8 Columns: Gallery / Floor Plan / Spec Sheet */}
              <div className="lg:col-span-8 p-6 bg-[#161616] flex flex-col justify-between space-y-4 border-b lg:border-b-0 lg:border-r border-white/10">
                {activeLightboxTab === 'photos' && (
                  <>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black border border-white/10">
                      <img
                        src={
                          lightboxProject.galleryImages[activeGalleryImgIdx]?.url ||
                          lightboxProject.heroImage
                        }
                        alt={lightboxProject.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-3 left-3 right-3 px-4 py-2 bg-black/75 backdrop-blur-xs text-xs text-[#E8DCC4] flex items-center justify-between">
                        <span>
                          {lightboxProject.galleryImages[activeGalleryImgIdx]?.label}
                        </span>
                        <span className="font-mono">
                          0{activeGalleryImgIdx + 1} / 0
                          {lightboxProject.galleryImages.length}
                        </span>
                      </div>
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="grid grid-cols-3 gap-3">
                      {lightboxProject.galleryImages.map((img, i) => (
                        <button
                          key={img.label}
                          type="button"
                          onClick={() => setActiveGalleryImgIdx(i)}
                          className={`text-left p-2 border transition cursor-pointer ${
                            activeGalleryImgIdx === i
                              ? 'border-[#E8DCC4] bg-white/10'
                              : 'border-white/10 bg-black/40 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img.url}
                            alt={img.label}
                            className="w-full h-16 object-cover mb-1.5"
                          />
                          <div className="text-[11px] text-white truncate">
                            {img.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {activeLightboxTab === 'floorplan' && (
                  <div className="p-6 bg-[#0E0E0E] border border-[#E8DCC4]/25 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#E8DCC4]">
                          ARCHITECTURAL SCHEMATIC &amp; SPATIAL ZONING
                        </span>
                        <h4 className="text-lg font-serif text-white mt-0.5">
                          {lightboxProject.title} — Spatial Flow &amp; Axis Diagram
                        </h4>
                      </div>
                      <span
                        className="text-xs font-mono px-2.5 py-1 border border-[#E8DCC4]/30 text-[#E8DCC4]"
                      >
                        SCALE 1:100 · {lightboxProject.areaSqFt}
                      </span>
                    </div>

                    {/* Interactive CAD Blueprint Grid Representation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-[#121820] border border-cyan-500/25 font-mono text-xs">
                      {lightboxProject.floorPlanSchematic.zones.map((zone, zIdx) => (
                        <div
                          key={zone}
                          className="p-4 border border-cyan-300/20 bg-black/40 space-y-1.5"
                        >
                          <div className="text-[10px] text-cyan-300/80">
                            ZONE 0{zIdx + 1} · SPATIAL MODULE
                          </div>
                          <div className="text-white font-sans font-medium leading-snug">
                            {zone}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 bg-white/5 border border-white/10 space-y-1">
                        <div className="uppercase tracking-wider text-[#E8DCC4] font-semibold">
                          Structural &amp; Civil Intervention
                        </div>
                        <p className="text-white/75 leading-relaxed">
                          {lightboxProject.floorPlanSchematic.structuralNote}
                        </p>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 space-y-1">
                        <div className="uppercase tracking-wider text-[#E8DCC4] font-semibold">
                          Daylight &amp; Ventilation Orientation
                        </div>
                        <p className="text-white/75 leading-relaxed">
                          {lightboxProject.floorPlanSchematic.naturalLightIndex}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeLightboxTab === 'specs' && (
                  <div className="p-6 bg-[#0E0E0E] border border-white/10 space-y-6">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-[#E8DCC4] mb-3">
                        CURATED MATERIAL BOARD &amp; FINISH SCHEDULE
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {lightboxProject.materialsUsed.map((mat, mIdx) => (
                          <div
                            key={mat}
                            className="p-3.5 bg-white/5 border border-white/10 flex items-center gap-3"
                          >
                            <span
                              className="w-6 h-6 flex items-center justify-center text-[11px] font-mono border border-[#E8DCC4]/40 text-[#E8DCC4]"
                            >
                              M{mIdx + 1}
                            </span>
                            <span className="text-xs text-white font-medium">{mat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 border border-white/10 space-y-1.5">
                      <div className="text-xs uppercase tracking-wider text-[#E8DCC4] font-semibold">
                        Architectural Lighting Specification
                      </div>
                      <p className="text-xs text-white/80 leading-relaxed">
                        {lightboxProject.lightingDesign}
                      </p>
                    </div>
                  </div>
                )}

                <p className="text-xs text-white/70 leading-relaxed italic">
                  “{lightboxProject.editorialBrief}”
                </p>
              </div>

              {/* Right 4 Columns: Project Specs Sidebar + Floating CTA */}
              <div className="lg:col-span-4 p-6 bg-[#121212] flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-[#E8DCC4] border-b border-white/10 pb-2">
                    PROJECT SPECIFICATIONS
                  </div>

                  <dl className="space-y-3.5 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-white/10">
                      <dt className="text-white/60">Location</dt>
                      <dd className="font-semibold text-white text-right">
                        {lightboxProject.location}
                      </dd>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/10">
                      <dt className="text-white/60">Area (Sq. Ft.)</dt>
                      <dd className="font-semibold text-white">
                        {lightboxProject.areaSqFt}
                      </dd>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/10">
                      <dt className="text-white/60">Completion Timeline</dt>
                      <dd className="font-semibold text-white">
                        {lightboxProject.timeline}
                      </dd>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/10">
                      <dt className="text-white/60">Investment Tier</dt>
                      <dd className="font-semibold text-[#E8DCC4]">
                        {lightboxProject.budgetTier}
                      </dd>
                    </div>
                  </dl>

                  <div className="space-y-2">
                    <div className="text-[11px] uppercase tracking-wider text-white/60">
                      Materials &amp; Lighting Used
                    </div>
                    <p className="text-xs text-white/85 leading-relaxed">
                      {lightboxProject.materialsUsed.join(' · ')}
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-white/10">
                    <div className="text-[11px] uppercase tracking-wider text-white/60">
                      Architect / Designer Credits
                    </div>
                    <p className="text-xs text-[#E8DCC4]">
                      {lightboxProject.architectCredits}
                    </p>
                  </div>
                </div>

                {/* Floating CTA in Lightbox */}
                <div className="pt-4 border-t border-white/15 space-y-3">
                  {similarRequestSuccess ? (
                    <div className="p-3.5 bg-white/5 border border-[#E8DCC4]/40 text-xs text-[#E8DCC4] space-y-2">
                      <div className="flex items-center gap-2 font-bold">
                        <CheckCircle2 size={15} style={{ color: primaryColor }} />
                        <span>Reference Design Attached to Estimator</span>
                      </div>
                      <p className="text-[11px] text-white/75">
                        We have pre-loaded the specifications of{' '}
                        <strong>{lightboxProject.title}</strong> into the Project Cost
                        Estimator below.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setLightboxProject(null);
                          scrollToId('atelier-estimator');
                        }}
                        className="w-full py-2 bg-[#E8DCC4] text-[#121212] font-bold uppercase tracking-wider text-[11px] cursor-pointer"
                      >
                        Go to Cost Estimator Now →
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSimilarRequestSuccess(true)}
                      className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 shadow-lg transition hover:opacity-95 cursor-pointer"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <span>Request Similar Design for Your Space</span>
                      <ArrowUpRight size={15} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
