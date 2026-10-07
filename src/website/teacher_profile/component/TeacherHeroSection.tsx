import React, { useState } from 'react';
import { Calendar, Play, ArrowRight, Compass, Sliders } from 'lucide-react';
import {
  EditableText,
  EditableButton,
  EditableImage,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import teacherHeroPortrait from '../../../assets/images/teacher_hero_portrait_1791386003586.jpg';

export interface TeacherHeroSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
  onBookTrial?: () => void;
  onViewSchedule?: () => void;
}

export const TeacherHeroSection: React.FC<TeacherHeroSectionProps> = ({
  title = 'Prof. Julian Vance, Ph.D.',
  subtitle = 'Math & Physics Tutor specializing in AP Calculus BC, Multivariable Calculus, IB Physics HL, and Olympiad Problem Solving. Turning abstract equations into intuitive 3D geometric insight.',
  variant = 'varient_1',
  primaryColor = '#2563EB',
  isDark = false,
  onBookTrial,
  onViewSchedule,
}) => {
  // Interactive 3D Card Perspective State
  const [tilt, setTilt] = useState<{ rx: number; ry: number; gx: number; gy: number }>({
    rx: 6,
    ry: -8,
    gx: 50,
    gy: 35,
  });

  // Interactive 3D Harmonic Wave Frequency Control inside Hero 3D HUD
  const [harmonicFreq, setHarmonicFreq] = useState<number>(3);
  const [phaseAngle, setPhaseAngle] = useState<number>(45);

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 18;
    const rx = (0.5 - py) * 16;
    setTilt({
      rx: Number(rx.toFixed(2)),
      ry: Number(ry.toFixed(2)),
      gx: Math.round(px * 100),
      gy: Math.round(py * 100),
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 6, ry: -8, gx: 50, gy: 35 });
  };

  const scrollToTarget = (selector: string, cb?: () => void) => {
    if (cb) cb();
    if (typeof document !== 'undefined') {
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Generate dynamic SVG 3D Lissajous / Harmonic curve points
  const curvePoints = Array.from({ length: 65 }, (_, i) => {
    const t = (i / 64) * Math.PI * 2;
    const x = 140 + Math.sin(t * harmonicFreq + (phaseAngle * Math.PI) / 180) * 110;
    const y = 44 + Math.cos(t * 2) * 28;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <section
      id="teacher-hero"
      className={`relative overflow-hidden py-14 sm:py-20 px-6 transition-colors ${
        isDark
          ? 'bg-[#0B0F19] text-slate-100'
          : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      {/* Subtle Architectural Isometric Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35 dark:opacity-20"
        style={{
          backgroundImage: `radial-gradient(${primaryColor} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`grid grid-cols-1 ${
            variant === 'varient_2'
              ? 'lg:grid-cols-12 gap-12 items-center'
              : 'lg:grid-cols-12 gap-12 lg:gap-14 items-center'
          }`}
        >
          {/* LEFT COLUMN: Proposition, Subject Expertise, Unboxed Metadata, Primary CTA */}
          <div
            className={`${
              variant === 'varient_3' ? 'lg:col-span-6 lg:order-2' : 'lg:col-span-7'
            } space-y-6`}
          >
            {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              <EditableText
                id="teacher_hero_kicker_1"
                defaultText="Math & Physics Tutor"
                className="font-semibold"
                style={{ color: primaryColor }}
              />
              <span aria-hidden="true">·</span>
              <EditableText
                id="teacher_hero_kicker_2"
                defaultText="MIT Ph.D. in Applied Mathematics"
              />
              <span aria-hidden="true">·</span>
              <EditableText
                id="teacher_hero_kicker_3"
                defaultText="12+ Years 1-on-1 & Olympiad Mentorship"
              />
            </div>

            {/* Display Headline */}
            <div className="space-y-3">
              <h1
                className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-tight leading-[1.08] max-w-2xl"
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  textWrap: 'balance',
                }}
              >
                <EditableText id="teacher_hero_name" defaultText={title} />
              </h1>
              <p className="text-lg sm:text-2xl font-semibold text-slate-700 dark:text-slate-200 tracking-tight">
                <EditableText
                  id="teacher_hero_role_headline"
                  defaultText="Mastering Calculus, Linear Algebra & Classical Mechanics Through 3D Visual Intuition"
                />
              </p>
            </div>

            {/* Engaging Value Proposition */}
            <EditableText
              id="teacher_hero_subtitle"
              as="p"
              defaultText={subtitle}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl block"
            />

            {/* Primary CTA ("Book a Free Trial") & Secondary Action ("View Schedule") */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <EditableButton
                id="teacher_hero_primary_cta"
                defaultText="Book a Free Trial"
                defaultLinkUrl="#teacher-booking"
                iconLeft={<Calendar size={16} />}
                iconRight={<ArrowRight size={15} />}
                onClick={() => scrollToTarget('#teacher-booking', onBookTrial)}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white whitespace-nowrap shrink-0 inline-flex items-center gap-2.5 transition-transform active:translate-y-0.5 cursor-pointer"
                style={{
                  backgroundColor: primaryColor,
                  boxShadow: `0 6px 0 0 ${isDark ? '#1E3A8A' : '#1D4ED8'}, 0 16px 30px -8px rgba(37,99,235,0.45)`,
                }}
              />

              <button
                type="button"
                onClick={() => scrollToTarget('#teacher-booking', onViewSchedule)}
                className={`px-6 py-3.5 rounded-xl text-sm font-semibold whitespace-nowrap shrink-0 inline-flex items-center gap-2 border transition-transform active:translate-y-0.5 cursor-pointer ${
                  isDark
                    ? 'bg-[#131B2E] border-white/15 text-slate-100 hover:bg-[#1A2540] shadow-[0_5px_0_0_rgba(255,255,255,0.08)]'
                    : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 shadow-[0_5px_0_0_#CBD5E1]'
                }`}
              >
                <span>View Schedule</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToTarget('#teacher-video')}
                className="px-4 py-3.5 text-sm font-semibold whitespace-nowrap shrink-0 inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white cursor-pointer"
              >
                <Play size={15} style={{ color: primaryColor }} />
                <span>Watch 75s Welcome Video</span>
              </button>
            </div>

            {/* Quantitative Proof Row (Tabular Numerals, Unboxed) */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-3 gap-6 max-w-xl">
              <div>
                <div
                  className="text-2xl sm:text-3xl font-semibold font-mono tabular-nums tracking-tight"
                  style={{ color: primaryColor }}
                >
                  <EditableText id="teacher_stat_1_val" defaultText="1,420+" />
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  <EditableText
                    id="teacher_stat_1_lbl"
                    defaultText="Students Mentored Since 2014"
                  />
                </div>
              </div>

              <div>
                <div
                  className="text-2xl sm:text-3xl font-semibold font-mono tabular-nums tracking-tight"
                  style={{ color: primaryColor }}
                >
                  <EditableText id="teacher_stat_2_val" defaultText="+1.8 pts" />
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  <EditableText
                    id="teacher_stat_2_lbl"
                    defaultText="Avg. AP / IB Score Gain in 8 Weeks"
                  />
                </div>
              </div>

              <div>
                <div
                  className="text-2xl sm:text-3xl font-semibold font-mono tabular-nums tracking-tight"
                  style={{ color: primaryColor }}
                >
                  <EditableText id="teacher_stat_3_val" defaultText="4.98 / 5" />
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  <EditableText
                    id="teacher_stat_3_lbl"
                    defaultText="Verified Parent & Student Rating"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive 3D Spatial Portrait Stage + Live Harmonic Curve HUD */}
          <div
            className={`${
              variant === 'varient_3' ? 'lg:col-span-6 lg:order-1' : 'lg:col-span-5'
            }`}
            style={{ perspective: '1200px' }}
          >
            <div
              onMouseMove={handlePointerMove}
              onMouseLeave={handlePointerLeave}
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 160ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className={`relative rounded-3xl p-5 sm:p-6 border ${
                isDark
                  ? 'bg-[#131B2E] border-white/15 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7),0_10px_0_0_#1E293B]'
                  : 'bg-white border-slate-200/90 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.16),0_10px_0_0_#E2E8F0]'
              }`}
            >
              {/* Specular 3D Light Glare Overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-30 transition-opacity"
                style={{
                  background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.55), transparent 60%)`,
                }}
              />

              {/* Portrait Frame with Resilient Fallback */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950">
                <EditableImage
                  id="teacher_hero_portrait_img"
                  defaultSrc={teacherHeroPortrait}
                  alt="Prof. Julian Vance — Mathematics and Physics Educator"
                  className="w-full h-full object-cover"
                />

                {/* Measured Contrast Scrim for Overlay Legibility */}
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />

                {/* Bottom Studio Caption inside Portrait */}
                <div className="absolute bottom-4 inset-x-4 text-white flex items-end justify-between gap-3">
                  <div>
                    <div className="text-xs font-mono text-sky-300 tabular-nums">
                      LIVE 3D LIGHTBOARD STUDIO · CAMBRIDGE, MA
                    </div>
                    <div className="text-sm sm:text-base font-semibold mt-0.5">
                      Interactive Vector &amp; Differential Calculus
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-slate-200 tabular-nums">
                    <div>Next Open Slot</div>
                    <div className="text-emerald-300 font-semibold">Tomorrow · 4:30 PM</div>
                  </div>
                </div>
              </div>

              {/* Interactive 3D Physics Harmonic Simulator Bar Below Portrait */}
              <div
                className={`mt-4 p-4 rounded-2xl border ${
                  isDark
                    ? 'bg-[#0B0F19]/90 border-white/10'
                    : 'bg-slate-50 border-slate-200/80'
                }`}
                style={{ transform: 'translateZ(28px)' }}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <Compass size={14} style={{ color: primaryColor }} />
                    <span>3D Orbital Resonance Visualizer</span>
                  </div>
                  <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                    ω = {harmonicFreq}:2 · φ = {phaseAngle}°
                  </span>
                </div>

                <svg
                  viewBox="0 0 280 88"
                  className="w-full h-20 rounded-xl bg-slate-950 border border-white/10"
                >
                  <line
                    x1="0"
                    y1="44"
                    x2="280"
                    y2="44"
                    stroke="rgba(148,163,184,0.2)"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="140"
                    y1="0"
                    x2="140"
                    y2="88"
                    stroke="rgba(148,163,184,0.2)"
                    strokeDasharray="3 3"
                  />
                  <polyline
                    fill="none"
                    stroke={primaryColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={curvePoints}
                  />
                </svg>

                {/* Interactive Sliders with Explicit Labels & Units */}
                <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                  <label className="space-y-1 block">
                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Sliders size={11} />
                        <span>Harmonic Ratio</span>
                      </span>
                      <span className="font-mono tabular-nums font-semibold">
                        {harmonicFreq} Hz
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={7}
                      step={1}
                      value={harmonicFreq}
                      onChange={(e) => setHarmonicFreq(Number(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </label>

                  <label className="space-y-1 block">
                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      <span>Phase Shift (φ)</span>
                      <span className="font-mono tabular-nums font-semibold">
                        {phaseAngle}°
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={180}
                      step={15}
                      value={phaseAngle}
                      onChange={(e) => setPhaseAngle(Number(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
