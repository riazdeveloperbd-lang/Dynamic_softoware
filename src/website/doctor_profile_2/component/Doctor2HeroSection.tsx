import React from 'react';
import { Calendar, Briefcase, Users, Star, Shield, Award, HeartPulse } from 'lucide-react';
import {
  EditableText,
  EditableButton,
  EditableImage,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface Doctor2HeroSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

const DEFAULT_ARJUN_PORTRAIT =
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=85';

export const PARTNER_HOSPITALS = [
  { id: 'acc', name: 'AMERICAN COLLEGE of CARDIOLOGY', tag: 'ACC' },
  { id: 'mayo', name: 'MAYO CLINIC', tag: 'MC' },
  { id: 'jhm', name: 'JOHNS HOPKINS MEDICINE', tag: 'JHM' },
  { id: 'cleveland', name: 'Cleveland Clinic', tag: 'CC' },
];

export const Doctor2HeroSection: React.FC<Doctor2HeroSectionProps> = ({
  title = 'Your Heart Health is My Priority',
  subtitle = 'Providing personalized, evidence-based cardiology care to help you live a longer, healthier life.',
  variant = 'varient_1',
  primaryColor = '#118C74',
  isDark = false,
}) => {
  const renderHospitalLogosRow = () => (
    <div className="pt-8 pb-2">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center divide-y sm:divide-y-0 md:divide-x divide-slate-200 dark:divide-white/10">
        {PARTNER_HOSPITALS.map((hosp) => (
          <div
            key={hosp.id}
            className="flex items-center justify-center gap-2.5 py-2 px-3 opacity-80 hover:opacity-100 transition"
          >
            <div className="w-8 h-8 rounded-full border-2 border-slate-700 dark:border-slate-300 flex items-center justify-center text-[10px] font-black tracking-tighter text-slate-800 dark:text-slate-200 flex-shrink-0">
              {hosp.tag}
            </div>
            <EditableText
              id={`doc2_logo_${hosp.id}`}
              defaultText={hosp.name}
              className="text-xs sm:text-sm font-black tracking-tight text-slate-800 dark:text-slate-200 uppercase leading-tight"
            />
          </div>
        ))}
      </div>
    </div>
  );

  /* ========================================================================
   * VARIANT 2: Centered Cardiology Showcase + Wide Portrait + Stat Cards
   * ======================================================================== */
  if (variant === 'varient_2' || variant === 'varient_5') {
    return (
      <section className={`py-10 sm:py-14 px-4 sm:px-8 ${isDark ? 'bg-[#0B1320] text-white' : 'bg-white text-slate-900'}`}>
        <div className="max-w-6xl mx-auto space-y-8">
          <div
            className={`rounded-[32px] p-6 sm:p-12 text-center space-y-6 ${
              isDark ? 'bg-[#121F33] border border-white/10' : 'bg-[#EAF6F4]'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-white/10 text-[11px] font-bold text-slate-600 dark:text-slate-300 shadow-2xs">
              <HeartPulse size={13} style={{ color: primaryColor }} />
              <EditableText
                id="doc2_hero_badge_v2"
                defaultText="Trusted. Experienced. Compassionate Care"
              />
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-2xl mx-auto leading-tight">
              <EditableText id="doc2_hero_title_v2_1" defaultText="Your Heart Health is " />
              <EditableText
                id="doc2_hero_title_v2_2"
                defaultText="My Priority"
                style={{ color: primaryColor }}
              />
            </h1>

            <EditableText
              id="doc2_hero_subtitle_v2"
              as="p"
              defaultText={subtitle}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed block"
            />

            <div className="flex justify-center">
              <EditableButton
                id="doc2_hero_btn_v2"
                defaultText="Book Appointment"
                defaultLinkUrl="#location"
                iconLeft={<Calendar size={15} />}
                className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-extrabold text-white shadow-md hover:opacity-95 transition cursor-pointer inline-flex items-center gap-2"
                style={{ backgroundColor: primaryColor }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-4 max-w-4xl mx-auto">
              <div className="md:col-span-4 space-y-3 text-left">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/60" style={{ color: primaryColor }}>
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <EditableText id="doc2_stat_exp_val" as="div" defaultText="15+" className="text-lg font-black" />
                    <EditableText id="doc2_stat_exp_lbl" as="div" defaultText="Years Experience" className="text-[11px] text-slate-500" />
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/60" style={{ color: primaryColor }}>
                    <Users size={18} />
                  </div>
                  <div>
                    <EditableText id="doc2_stat_pat_val" as="div" defaultText="10K+" className="text-lg font-black" />
                    <EditableText id="doc2_stat_pat_lbl" as="div" defaultText="Patients Treated" className="text-[11px] text-slate-500" />
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-50 dark:bg-amber-950/60 text-amber-500">
                    <Star size={18} fill="currentColor" />
                  </div>
                  <div>
                    <EditableText id="doc2_stat_rat_val" as="div" defaultText="4.9" className="text-lg font-black" />
                    <EditableText id="doc2_stat_rat_lbl" as="div" defaultText="(500+ Reviews)" className="text-[11px] text-slate-500" />
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 h-80 sm:h-96 rounded-3xl overflow-hidden shadow-lg border-4 border-white dark:border-slate-800">
                <EditableImage
                  id="doc2_hero_portrait"
                  defaultSrc={DEFAULT_ARJUN_PORTRAIT}
                  alt="Dr. Arjun Mehta - Cardiologist"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {renderHospitalLogosRow()}
        </div>
      </section>
    );
  }

  /* ========================================================================
   * VARIANT 3: Dark Executive Cardiology Hero + Split Stats
   * ======================================================================== */
  if (variant === 'varient_3' || variant === 'varient_6') {
    return (
      <section className="py-10 sm:py-14 px-4 sm:px-8 bg-[#0B1320] text-white">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="rounded-[32px] bg-gradient-to-r from-[#0F1E36] via-[#122B38] to-[#0D3B33] p-6 sm:p-12 border border-emerald-500/20 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-emerald-300">
                <Shield size={13} />
                <EditableText
                  id="doc2_hero_badge"
                  defaultText="Trusted. Experienced. Compassionate Care"
                />
              </div>

              <EditableText
                id="doc2_hero_full_title_v3"
                as="h1"
                defaultText={title}
                className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white block"
              />

              <EditableText
                id="doc2_hero_subtitle"
                as="p"
                defaultText={subtitle}
                className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg block"
              />

              <div className="flex flex-wrap items-center gap-4">
                <EditableButton
                  id="doc2_hero_btn"
                  defaultText="Book Appointment"
                  defaultLinkUrl="#location"
                  iconLeft={<Calendar size={15} />}
                  className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-extrabold text-white shadow-lg cursor-pointer inline-flex items-center gap-2"
                  style={{ backgroundColor: primaryColor }}
                />
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                  <EditableText id="doc2_stat_exp_val" as="div" defaultText="15+" className="text-xl font-black text-emerald-400" />
                  <EditableText id="doc2_stat_exp_lbl" as="div" defaultText="Years Experience" className="text-[11px] text-slate-300" />
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                  <EditableText id="doc2_stat_pat_val" as="div" defaultText="10K+" className="text-xl font-black text-emerald-400" />
                  <EditableText id="doc2_stat_pat_lbl" as="div" defaultText="Patients Treated" className="text-[11px] text-slate-300" />
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                  <EditableText id="doc2_stat_rat_val" as="div" defaultText="★ 4.9" className="text-xl font-black text-amber-400" />
                  <EditableText id="doc2_stat_rat_lbl" as="div" defaultText="(500+ Reviews)" className="text-[11px] text-slate-300" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border-2 border-emerald-400/40 shadow-2xl h-[360px] sm:h-[400px]">
                <EditableImage
                  id="doc2_hero_portrait"
                  defaultSrc={DEFAULT_ARJUN_PORTRAIT}
                  alt="Dr. Arjun Mehta"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {renderHospitalLogosRow()}
        </div>
      </section>
    );
  }

  /* ========================================================================
   * VARIANT 1 (Exact Dribbble Screenshot Layout):
   * Soft Mint/Cyan Rounded Banner Card + Left Headline & Pill Button +
   * Right Doctor Portrait with 3 Floating Stat Badges (15+, 10K+, 4.9) +
   * 4 Partner Hospital Logos Row Below
   * ======================================================================== */
  return (
    <section
      className={`pt-6 pb-10 px-4 sm:px-8 transition-colors ${
        isDark ? 'bg-[#0B1320] text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Rounded Mint-Blue Hero Container matching screenshot */}
        <div
          className={`relative rounded-[28px] overflow-hidden px-6 sm:px-12 pt-10 pb-10 lg:pb-0 transition-colors ${
            isDark
              ? 'bg-gradient-to-r from-[#111F33] via-[#13293D] to-[#0E312F] border border-white/10'
              : 'bg-gradient-to-r from-[#EDF5F8] via-[#E6F4F1] to-[#DDF1ED]'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-6 space-y-5 lg:pb-10 z-10">
              {/* Pill Badge: Trusted. Experienced. Compassionate Care */}
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 text-[11px] font-medium text-slate-600 dark:text-slate-300 shadow-2xs">
                <EditableText
                  id="doc2_hero_badge"
                  defaultText="Trusted. Experienced. Compassionate Care"
                />
              </div>

              {/* Headline: Your Heart Health is My Priority */}
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15]">
                <EditableText
                  id="doc2_hero_title_line1"
                  defaultText="Your Heart Health"
                  className="block text-slate-900 dark:text-white"
                />
                <span className="block mt-1">
                  <EditableText
                    id="doc2_hero_title_is"
                    defaultText="is "
                    className="text-slate-900 dark:text-white"
                  />
                  <EditableText
                    id="doc2_hero_title_priority"
                    defaultText="My Priority"
                    style={{ color: primaryColor }}
                  />
                </span>
              </h1>

              {/* Subtitle */}
              <EditableText
                id="doc2_hero_subtitle"
                as="p"
                defaultText={subtitle}
                className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md block"
              />

              {/* Green Pill CTA Button: Book Appointment */}
              <div className="pt-1">
                <EditableButton
                  id="doc2_hero_book_btn"
                  defaultText="Book Appointment"
                  defaultLinkUrl="#location"
                  iconLeft={<Calendar size={15} />}
                  className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white shadow-md hover:opacity-95 transition cursor-pointer inline-flex items-center gap-2"
                  style={{ backgroundColor: primaryColor }}
                />
              </div>
            </div>

            {/* Right Doctor Portrait + 3 Responsive Stat Cards */}
            <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end justify-end min-h-[280px] sm:min-h-[380px]">
              {/* Soft radial halo behind doctor */}
              <div className="pointer-events-none absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-white/50 dark:bg-emerald-500/10 blur-2xl" />

              {/* Doctor Image */}
              <div className="relative z-10 w-56 sm:w-80 lg:w-[350px] h-[270px] sm:h-[380px] rounded-t-3xl overflow-hidden shadow-xl border-4 border-white/80 dark:border-slate-800">
                <EditableImage
                  id="doc2_hero_portrait"
                  defaultSrc={DEFAULT_ARJUN_PORTRAIT}
                  alt="Dr. Arjun Mehta - Cardiologist"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Mobile Stat Cards Grid (Shown on Mobile < 640px for clean non-overlapping layout) */}
              <div className="grid grid-cols-3 gap-2 w-full pt-4 sm:hidden relative z-20">
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#152238] shadow-sm border border-slate-100 dark:border-white/10 text-center">
                  <EditableText
                    id="doc2_stat_exp_val"
                    as="div"
                    defaultText="15+"
                    className="text-xs font-extrabold text-slate-900 dark:text-white"
                  />
                  <EditableText
                    id="doc2_stat_exp_lbl"
                    as="div"
                    defaultText="Years Exp."
                    className="text-[10px] text-slate-500 dark:text-slate-400 truncate"
                  />
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#152238] shadow-sm border border-slate-100 dark:border-white/10 text-center">
                  <EditableText
                    id="doc2_stat_pat_val"
                    as="div"
                    defaultText="10K+"
                    className="text-xs font-extrabold text-slate-900 dark:text-white"
                  />
                  <EditableText
                    id="doc2_stat_pat_lbl"
                    as="div"
                    defaultText="Patients"
                    className="text-[10px] text-slate-500 dark:text-slate-400 truncate"
                  />
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-[#152238] shadow-sm border border-slate-100 dark:border-white/10 text-center">
                  <EditableText
                    id="doc2_stat_rat_val"
                    as="div"
                    defaultText="★ 4.9"
                    className="text-xs font-extrabold text-emerald-600"
                  />
                  <EditableText
                    id="doc2_stat_rat_lbl"
                    as="div"
                    defaultText="500+ Reviews"
                    className="text-[10px] text-slate-500 dark:text-slate-400 truncate"
                  />
                </div>
              </div>

              {/* Floating Card 1 (Tablet/Desktop): 15+ Years Experience */}
              <div className="hidden sm:flex absolute top-4 left-2 sm:left-6 z-20 px-3.5 py-2.5 rounded-2xl bg-white dark:bg-[#152238] shadow-lg border border-slate-100 dark:border-white/10 items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#E7F6F3', color: primaryColor }}
                >
                  <Briefcase size={14} />
                </div>
                <div className="leading-tight">
                  <EditableText
                    id="doc2_stat_exp_val"
                    as="div"
                    defaultText="15+"
                    className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white"
                  />
                  <EditableText
                    id="doc2_stat_exp_lbl"
                    as="div"
                    defaultText="Years Experience"
                    className="text-[10px] text-slate-500 dark:text-slate-400"
                  />
                </div>
              </div>

              {/* Floating Card 2 (Tablet/Desktop): 10K+ Patients Treated */}
              <div className="hidden sm:flex absolute bottom-8 left-0 sm:left-2 z-20 px-3.5 py-2.5 rounded-2xl bg-white dark:bg-[#152238] shadow-lg border border-slate-100 dark:border-white/10 items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#E7F6F3', color: primaryColor }}
                >
                  <Users size={14} />
                </div>
                <div className="leading-tight">
                  <EditableText
                    id="doc2_stat_pat_val"
                    as="div"
                    defaultText="10K+"
                    className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white"
                  />
                  <EditableText
                    id="doc2_stat_pat_lbl"
                    as="div"
                    defaultText="Patients Treated"
                    className="text-[10px] text-slate-500 dark:text-slate-400"
                  />
                </div>
              </div>

              {/* Floating Card 3 (Tablet/Desktop): ★ 4.9 (500+ Reviews) */}
              <div className="hidden sm:flex absolute top-20 right-0 sm:right-2 z-20 px-3.5 py-2.5 rounded-2xl bg-white dark:bg-[#152238] shadow-lg border border-slate-100 dark:border-white/10 items-center gap-2">
                <Star size={14} className="text-emerald-600 fill-emerald-600 flex-shrink-0" />
                <div className="leading-tight">
                  <EditableText
                    id="doc2_stat_rat_val"
                    as="div"
                    defaultText="4.9"
                    className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white"
                  />
                  <EditableText
                    id="doc2_stat_rat_lbl"
                    as="div"
                    defaultText="(500+ Reviews)"
                    className="text-[10px] text-slate-500 dark:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Partner Hospital Logos Row Below Hero */}
        {renderHospitalLogosRow()}
      </div>
    </section>
  );
};

export default Doctor2HeroSection;
