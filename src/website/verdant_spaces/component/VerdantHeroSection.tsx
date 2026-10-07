import React, { useState } from 'react';
import {
  ArrowRight,
  SlidersHorizontal,
  MoveHorizontal,
  Droplets,
  Sprout,
  Award,
  Layers,
  Compass,
  Sun,
} from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface VerdantHeroSectionProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

const HERO_BEFORE_IMG = '/src/assets/images/verdant_rooftop_before_1791390148745.jpg';
const HERO_AFTER_IMG = '/src/assets/images/verdant_rooftop_after_1791390171671.jpg';
const COURTYARD_AFTER_IMG = '/src/assets/images/verdant_courtyard_after_1791390199369.jpg';

export const VerdantHeroSection: React.FC<VerdantHeroSectionProps> = ({
  title,
  subtitle,
  variant = 'varient_1',
  primaryColor = '#2C4A3E',
  isDark = false,
}) => {
  const [revealPercent, setRevealPercent] = useState<number>(64);
  const [activeSeasonMode, setActiveSeasonMode] = useState<'golden' | 'dusk'>('golden');
  const [activeVariantOverride, setActiveVariantOverride] = useState<DoctorVariantId | null>(
    null
  );
  const [quickSqFt, setQuickSqFt] = useState<number>(850);

  const effectiveVariant: DoctorVariantId = activeVariantOverride || variant;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const bgCanvas = isDark ? 'bg-[#111916] text-[#F4F1EA]' : 'bg-[#FAF9F6] text-[#1F2421]';
  const cardBg = isDark
    ? 'bg-[#192520] border-[#2C4A3E]'
    : 'bg-[#EFECE6] border-[#D8E2DC]';

  // Reusable interactive Before/After Rooftop Swipe Reveal Card
  const renderComparisonViewport = (aspectClass = 'aspect-[16/10]') => (
    <div className={`rounded-2xl border ${cardBg} p-3 sm:p-4 shadow-sm space-y-3.5 text-left`}>
      {/* Top Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="text-xs font-semibold text-[#1F2421] dark:text-[#F4F1EA]">
          <span>TriBeCa Sky Penthouse</span>
          <span className="mx-1.5 text-[#4A6B5D]">·</span>
          <span className="text-[#4A6B5D] font-mono tabular-nums">1,450 sq ft</span>
        </div>

        {/* Interactive Lighting Filter Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-[#FAF9F6] dark:bg-[#111916] border border-[#D8E2DC] dark:border-[#2C4A3E]">
          <button
            type="button"
            onClick={() => setActiveSeasonMode('golden')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer whitespace-nowrap ${
              activeSeasonMode === 'golden'
                ? 'bg-[#2C4A3E] text-[#F4F1EA]'
                : 'text-[#4A6B5D]'
            }`}
          >
            Golden Hour
          </button>
          <button
            type="button"
            onClick={() => setActiveSeasonMode('dusk')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer whitespace-nowrap ${
              activeSeasonMode === 'dusk'
                ? 'bg-[#D37B58] text-white'
                : 'text-[#4A6B5D]'
            }`}
          >
            Architectural Dusk
          </button>
        </div>
      </div>

      {/* Interactive Before/After Image Comparison Viewport */}
      <div className={`relative ${aspectClass} w-full rounded-xl overflow-hidden select-none bg-[#2C4A3E]`}>
        {/* Base Layer: BEFORE (Raw Concrete Rooftop) */}
        <img
          src={HERO_BEFORE_IMG}
          alt="Raw concrete urban rooftop before transformation"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Top Clipped Layer: AFTER (Lush Biophilic Sanctuary) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `inset(0 ${100 - revealPercent}% 0 0)`,
          }}
        >
          <img
            src={HERO_AFTER_IMG}
            alt="Lush biophilic rooftop garden sanctuary after Verdant Spaces transformation"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-all duration-300 ${
              activeSeasonMode === 'dusk'
                ? 'brightness-90 contrast-110 saturate-110'
                : ''
            }`}
          />
        </div>

        {/* Vertical Divider Line & Drag Handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-[#F4F1EA] shadow-[0_0_12px_rgba(0,0,0,0.5)]"
          style={{ left: `${revealPercent}%` }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#2C4A3E] border-2 border-[#F4F1EA] text-[#F4F1EA] flex items-center justify-center shadow-lg">
            <MoveHorizontal size={15} />
          </div>
        </div>

        {/* Measured Bottom Scrim with Labels */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4 flex items-end justify-between text-xs text-[#F4F1EA]">
          <div>
            <span className="font-semibold text-[#D37B58]">AFTER</span>
            <span className="mx-1.5">·</span>
            <span>Native Redbud, Cedar Deck &amp; Smart Drip</span>
          </div>
          <div className="text-right">
            <span className="font-semibold opacity-80">BEFORE</span>
            <span className="mx-1.5">·</span>
            <span className="opacity-80">Bare Concrete Slab</span>
          </div>
        </div>

        {/* Interactive Range Slider Overlay */}
        <input
          type="range"
          min={5}
          max={95}
          value={revealPercent}
          onChange={(e) => setRevealPercent(Number(e.target.value))}
          aria-label="Swipe to compare concrete rooftop before and lush sanctuary after"
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />
      </div>

      {/* Bottom Slider Readout Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-1 text-xs">
        <span className="text-[#4A6B5D]">
          Drag slider to swipe from raw concrete to living architecture
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setRevealPercent(15)}
            className="text-[11px] font-semibold text-[#4A6B5D] hover:text-[#1F2421] cursor-pointer"
          >
            Before
          </button>
          <span className="text-[#D8E2DC]">·</span>
          <span className="font-mono tabular-nums font-bold text-[#2C4A3E] dark:text-[#F4F1EA]">
            {revealPercent}% Sanctuary Reveal
          </span>
          <span className="text-[#D8E2DC]">·</span>
          <button
            type="button"
            onClick={() => setRevealPercent(92)}
            className="text-[11px] font-semibold text-[#D37B58] hover:underline cursor-pointer"
          >
            Full Bloom
          </button>
        </div>
      </div>
    </div>
  );

  // Reusable Primary & Secondary Hero CTA Buttons (Fixed high-contrast visibility)
  const renderHeroCtaPair = (centered = false, darkThemeButtons = false) => (
    <div
      className={`flex flex-wrap items-center gap-3.5 pt-2 ${
        centered ? 'justify-center' : ''
      }`}
    >
      <EditableButton
        id="verdant_hero_cta_primary"
        defaultText="Estimate Your Project"
        defaultLinkUrl="#verdant-estimator"
        iconLeft={<SlidersHorizontal size={15} className="text-[#D37B58]" />}
        iconRight={<ArrowRight size={15} />}
        onClickFallback={() => scrollToSection('verdant-estimator')}
        style={{
          backgroundColor: darkThemeButtons ? '#D37B58' : primaryColor || '#2C4A3E',
          color: '#F4F1EA',
        }}
        className={`px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold ${
          darkThemeButtons ? 'bg-[#D37B58]' : 'bg-[#2C4A3E]'
        } text-[#F4F1EA] inline-flex items-center gap-2.5 shadow-md hover:opacity-95 transition whitespace-nowrap cursor-pointer`}
      />

      <button
        type="button"
        onClick={() => scrollToSection('verdant-portfolio')}
        className={`px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold border transition whitespace-nowrap cursor-pointer ${
          darkThemeButtons || isDark
            ? 'bg-[#192520] border-[#4A6B5D] text-[#F4F1EA] hover:bg-[#23342C]'
            : 'bg-[#F4F1EA] border-[#D8E2DC] text-[#1F2421] hover:bg-[#EFECE6]'
        }`}
      >
        View Before &amp; Afters
      </button>
    </div>
  );

  return (
    <section
      id="verdant-hero"
      className={`relative overflow-hidden ${
        effectiveVariant === 'varient_3'
          ? 'bg-[#1B2E26] text-[#F4F1EA]'
          : bgCanvas
      } py-12 sm:py-16 lg:py-20 px-4 sm:px-6`}
    >
      {/* Subtle Architectural Blueprint Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(74, 107, 93, 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(74, 107, 93, 0.14) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="relative max-w-7xl mx-auto space-y-10">
        {/* Interactive 3-Variant Hero Layout Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#D8E2DC]/60 dark:border-[#2C4A3E]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4A6B5D] dark:text-[#D8E2DC]">
            <Layers size={14} className="text-[#D37B58]" />
            <span>Hero Architectural Layout</span>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#EFECE6] dark:bg-[#192520] border border-[#D8E2DC] dark:border-[#2C4A3E]">
            {(
              [
                { id: 'varient_1', label: 'Variant 1 · Split Swipe Studio' },
                { id: 'varient_2', label: 'Variant 2 · Centered Editorial Showcase' },
                { id: 'varient_3', label: 'Variant 3 · Biophilic Bento Sanctuary' },
              ] as { id: DoctorVariantId; label: string }[]
            ).map((v) => {
              const active = effectiveVariant === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActiveVariantOverride(v.id)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#2C4A3E] text-[#F4F1EA] shadow-xs'
                      : 'text-[#4A6B5D] hover:text-[#1F2421] dark:text-[#D8E2DC]'
                  }`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================================================================
            VARIANT 1: SPLIT SWIPE STUDIO (2-Column Architectural Split)
           =================================================================== */}
        {effectiveVariant === 'varient_1' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Architectural Proposition & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-[#4A6B5D]">
                <span className="text-[#D37B58] font-bold">Biophilic Urban Architecture</span>
                <span aria-hidden="true">·</span>
                <span>LEED Platinum Landscape Studio</span>
                <span aria-hidden="true">·</span>
                <span>NYC &amp; Tri-State</span>
              </div>

              <EditableText
                id="verdant_hero_headline"
                defaultText={
                  title || 'Transform Urban Concrete into Living Sanctuaries.'
                }
                as="h1"
                className="text-4xl sm:text-5xl lg:text-[54px] font-normal tracking-tight leading-[1.08]"
                style={{
                  fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif",
                  textWrap: 'balance',
                }}
              />

              <EditableText
                id="verdant_hero_subheadline"
                defaultText={
                  subtitle ||
                  'Architectural landscape design engineered with 100% native plants, smart water management, and zero-emissions maintenance.'
                }
                as="p"
                className={`text-base sm:text-lg leading-relaxed max-w-xl ${
                  isDark ? 'text-[#D8E2DC]/85' : 'text-[#4A6B5D]'
                }`}
              />

              {/* Primary & Secondary CTAs */}
              {renderHeroCtaPair(false, false)}

              {/* Sustainability Promises */}
              <div
                className={`pt-6 border-t ${
                  isDark ? 'border-[#2C4A3E]' : 'border-[#D8E2DC]'
                } flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-semibold ${
                  isDark ? 'text-[#D8E2DC]' : 'text-[#2C4A3E]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Sprout size={14} className="text-[#D37B58]" />
                  <span>100% Native Eco-Systems</span>
                </div>
                <span className="text-[#4A6B5D]/50" aria-hidden="true">
                  •
                </span>
                <div className="flex items-center gap-1.5">
                  <Droplets size={14} className="text-[#4A6B5D]" />
                  <span>Smart Drip Irrigation</span>
                </div>
                <span className="text-[#4A6B5D]/50" aria-hidden="true">
                  •
                </span>
                <div className="flex items-center gap-1.5">
                  <Award size={14} className="text-[#D37B58]" />
                  <span>LEED Compliant Design</span>
                </div>
              </div>

              {/* Quantified Architectural Impact Row */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className={`p-4 rounded-xl border ${cardBg}`}>
                  <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-[#2C4A3E] dark:text-[#F4F1EA]">
                    185+
                  </div>
                  <div className="text-[11px] text-[#4A6B5D] mt-0.5">
                    Urban Sanctuaries Built
                  </div>
                </div>
                <div className={`p-4 rounded-xl border ${cardBg}`}>
                  <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-[#D37B58]">
                    1.4M Gal
                  </div>
                  <div className="text-[11px] text-[#4A6B5D] mt-0.5">
                    Stormwater Captured / Yr
                  </div>
                </div>
                <div className={`p-4 rounded-xl border ${cardBg}`}>
                  <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-[#2C4A3E] dark:text-[#F4F1EA]">
                    -7.8°F
                  </div>
                  <div className="text-[11px] text-[#4A6B5D] mt-0.5">
                    Roof Surface Cooling
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Concrete-to-Sanctuary Split-Screen Swipe Reveal */}
            <div className="lg:col-span-6">{renderComparisonViewport('aspect-[16/10]')}</div>
          </div>
        )}

        {/* ===================================================================
            VARIANT 2: CENTERED EDITORIAL ARCHITECTURAL SHOWCASE
           =================================================================== */}
        {effectiveVariant === 'varient_2' && (
          <div className="space-y-10">
            <div className="max-w-3xl mx-auto text-center space-y-5">
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold tracking-wide text-[#4A6B5D]">
                <span className="text-[#D37B58] font-bold">01. Architectural Landscape Monograph</span>
                <span aria-hidden="true">·</span>
                <span>100% Native Eco-Systems</span>
                <span aria-hidden="true">·</span>
                <span>Smart Drip Irrigation</span>
                <span aria-hidden="true">·</span>
                <span>LEED Compliant Design</span>
              </div>

              <EditableText
                id="verdant_hero_headline"
                defaultText={
                  title || 'Transform Urban Concrete into Living Sanctuaries.'
                }
                as="h1"
                className="text-4xl sm:text-6xl font-normal tracking-tight leading-[1.06] mx-auto"
                style={{
                  fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif",
                  textWrap: 'balance',
                }}
              />

              <EditableText
                id="verdant_hero_subheadline"
                defaultText={
                  subtitle ||
                  'Architectural landscape design engineered with 100% native plants, smart water management, and zero-emissions maintenance.'
                }
                as="p"
                className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${
                  isDark ? 'text-[#D8E2DC]/85' : 'text-[#4A6B5D]'
                }`}
              />

              {renderHeroCtaPair(true, false)}
            </div>

            {/* Wide Cinema Interactive Comparison Frame + Architectural Spec Strip */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-8">
                {renderComparisonViewport('aspect-[16/9]')}
              </div>

              <div
                className={`lg:col-span-4 rounded-2xl border ${cardBg} p-6 flex flex-col justify-between space-y-6`}
              >
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-[#D37B58]">
                    Instant Rooftop Feasibility Check
                  </div>
                  <h3
                    className="text-2xl font-normal"
                    style={{ fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif" }}
                  >
                    Quick Terrace Budget Preview
                  </h3>
                  <p className="text-xs text-[#4A6B5D] leading-relaxed">
                    Slide to preview turnkey native rooftop transformation investment before opening the full estimator.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#4A6B5D]">Terrace Footprint</span>
                    <span className="font-mono font-bold text-[#2C4A3E] dark:text-[#F4F1EA]">
                      {quickSqFt.toLocaleString()} sq ft
                    </span>
                  </div>
                  <input
                    type="range"
                    min={200}
                    max={3000}
                    step={50}
                    value={quickSqFt}
                    onChange={(e) => setQuickSqFt(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#D8E2DC] accent-[#2C4A3E]"
                  />
                  <div className="p-4 rounded-xl bg-[#2C4A3E] text-[#F4F1EA] space-y-1">
                    <div className="text-[11px] text-[#D8E2DC]">
                      Projected Turnkey Sanctuary Range
                    </div>
                    <div className="text-2xl font-bold font-mono tabular-nums">
                      ${(quickSqFt * 24 + 3800).toLocaleString()} – $
                      {Math.round((quickSqFt * 24 + 3800) * 1.15).toLocaleString()}
                    </div>
                    <div className="text-[11px] text-[#D37B58] font-mono">
                      Saves ~{Math.round(quickSqFt * 8.2).toLocaleString()} Gal Water / Year
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection('verdant-estimator')}
                  className="w-full py-3 px-4 rounded-xl bg-[#D37B58] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition cursor-pointer"
                >
                  <span>Open Full 3-Step Project Estimator</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            VARIANT 3: DEEP FOREST BIOPHILIC BENTO SANCTUARY
           =================================================================== */}
        {effectiveVariant === 'varient_3' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 7 Cols: Deep Forest Architectural Statement Card */}
            <div className="lg:col-span-7 rounded-2xl bg-[#233B31] border border-[#4A6B5D] p-7 sm:p-10 flex flex-col justify-between space-y-8 text-[#F4F1EA]">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#D8E2DC]">
                  <span className="text-[#D37B58]">Biophilic Living Architecture</span>
                  <span aria-hidden="true">·</span>
                  <span>100% Native Eco-Systems</span>
                  <span aria-hidden="true">·</span>
                  <span>LEED Platinum Studio</span>
                </div>

                <EditableText
                  id="verdant_hero_headline"
                  defaultText={
                    title || 'Transform Urban Concrete into Living Sanctuaries.'
                  }
                  as="h1"
                  className="text-4xl sm:text-5xl font-normal tracking-tight leading-[1.08] text-[#F4F1EA]"
                  style={{
                    fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif",
                    textWrap: 'balance',
                  }}
                />

                <EditableText
                  id="verdant_hero_subheadline"
                  defaultText={
                    subtitle ||
                    'Architectural landscape design engineered with 100% native plants, smart water management, and zero-emissions maintenance.'
                  }
                  as="p"
                  className="text-base text-[#D8E2DC]/90 leading-relaxed max-w-xl"
                />

                {renderHeroCtaPair(false, true)}
              </div>

              {/* 3 Architectural Engineering Pillars inside Bento Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#4A6B5D]/60">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D37B58]">
                    <Compass size={14} />
                    <span>Structural PE Certified</span>
                  </div>
                  <p className="text-[11px] text-[#D8E2DC]/80">
                    Lightweight expanded-shale soil engineered for NYC parapets.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D37B58]">
                    <Droplets size={14} />
                    <span>74% Water Reduction</span>
                  </div>
                  <p className="text-[11px] text-[#D8E2DC]/80">
                    Subsurface rainwater harvesting &amp; soil moisture telemetry.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D37B58]">
                    <Sun size={14} />
                    <span>4-Season Native Bloom</span>
                  </div>
                  <p className="text-[11px] text-[#D8E2DC]/80">
                    USDA Zone 4 cold-hardy canopy trees &amp; pollinator perennials.
                  </p>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Stacked Interactive Before/After + Courtyard Spotlight */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {renderComparisonViewport('aspect-[16/10]')}

              <div className="rounded-2xl bg-[#233B31] border border-[#4A6B5D] p-4 flex items-center gap-4 text-[#F4F1EA]">
                <img
                  src={COURTYARD_AFTER_IMG}
                  alt="Brooklyn Townhouse Courtyard Sanctuary"
                  referrerPolicy="no-referrer"
                  className="w-24 h-20 rounded-xl object-cover shrink-0 border border-[#4A6B5D]"
                />
                <div className="space-y-1 min-w-0">
                  <div className="text-[11px] font-semibold text-[#D37B58]">
                    Featured Townhouse Commission
                  </div>
                  <div
                    className="text-base font-normal truncate"
                    style={{ fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif" }}
                  >
                    Cobble Hill Shaded Parterre · 880 sq ft
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToSection('verdant-portfolio')}
                    className="text-xs font-semibold text-[#D8E2DC] hover:text-white inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect Full Before &amp; After</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
