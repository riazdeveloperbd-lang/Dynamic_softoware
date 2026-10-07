import React from 'react';
import {
  Download,
  ShieldCheck,
  HeartHandshake,
  MessageSquareText,
  Cpu,
} from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface Doctor2AboutSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const ARJUN_TIMELINE = [
  {
    id: 'aiims',
    year: '2006 - 2010',
    detail: 'MD, All India Institute of Medical Science (AIIMS)',
  },
  {
    id: 'pgimer',
    year: '2010 - 2013',
    detail: 'DM Cardiology, PGIMER, Chandigarh',
  },
  {
    id: 'cleveland',
    year: '2014',
    detail: 'Fellowship in Interventional Cardiology, Cleveland Clinic, USA',
  },
  {
    id: 'awards',
    year: 'Award & Recognition',
    detail: 'Excellence in Cardiac Care Award (2022) · Top Doctor - Cardiology (2023)',
  },
];

export const WHY_CHOOSE_ARJUN = [
  {
    id: 'evidence',
    title: 'Evidence-Based Approach',
    description:
      'State-of-the-art diagnostic and treatment facilities designed to deliver care.',
    icon: ShieldCheck,
  },
  {
    id: 'continuity',
    title: 'Continuity Of Care',
    description:
      'Long-term support and special care for your heart health journey.',
    icon: HeartHandshake,
  },
  {
    id: 'communication',
    title: 'Clear Communication',
    description:
      'Explaining conditions and treatment in simple and easy terms.',
    icon: MessageSquareText,
  },
  {
    id: 'technology',
    title: 'Advanced Technology',
    description:
      'We use the latest research and advance technologies on all our operations.',
    icon: Cpu,
  },
];

export const Doctor2AboutSection: React.FC<Doctor2AboutSectionProps> = ({
  title = 'About Dr. Arjun Mehta',
  subtitle = 'Dr. Arjun Mehta is a board-certified interventional cardiologist with over 15 years of experience in diagnosing and treating complex heart conditions. His patients-first philosophy focuses on personalized care, prevention, and long-term wellness.',
  variant = 'varient_1',
  primaryColor = '#118C74',
  isDark = false,
}) => {
  /* VARIANT 2: Stacked Editorial Timeline + 4-Column Feature Row */
  if (variant === 'varient_2' || variant === 'varient_5') {
    return (
      <section
        id="about"
        className={`py-14 px-4 sm:px-8 ${
          isDark ? 'bg-[#0B1320] text-white' : 'bg-[#F8FAFC] text-slate-900'
        }`}
      >
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="p-8 rounded-3xl border bg-white dark:bg-[#131F33] border-slate-200/80 dark:border-white/10 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <EditableText
                  id="doc2_about_heading"
                  as="h2"
                  defaultText={title}
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight block"
                />
                <EditableText
                  id="doc2_about_bio"
                  as="p"
                  defaultText={subtitle}
                  className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed block"
                />
              </div>
              <EditableButton
                id="doc2_about_cv_btn"
                defaultText="Download CV"
                defaultLinkUrl="#location"
                iconLeft={<Download size={14} />}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-white shadow-sm cursor-pointer inline-flex items-center gap-2 self-start"
                style={{ backgroundColor: primaryColor }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-white/10">
              {ARJUN_TIMELINE.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#EFF8F6] dark:bg-white/5 border border-emerald-500/20 space-y-1"
                >
                  <EditableText
                    id={`doc2_tl_yr_${item.id}`}
                    as="div"
                    defaultText={item.year}
                    className="text-xs font-extrabold"
                    style={{ color: primaryColor }}
                  />
                  <EditableText
                    id={`doc2_tl_dt_${item.id}`}
                    as="div"
                    defaultText={item.detail}
                    className="text-xs text-slate-600 dark:text-slate-300 leading-snug"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <EditableText
              id="doc2_why_heading"
              as="h3"
              defaultText="Why Patients Choose Me"
              className="text-xl sm:text-2xl font-extrabold tracking-tight block"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {WHY_CHOOSE_ARJUN.map((feat) => {
                const IconComp = feat.icon;
                return (
                  <div
                    key={feat.id}
                    className={`p-6 rounded-2xl border space-y-3 ${
                      isDark
                        ? 'bg-[#131F33] border-white/10'
                        : 'bg-white border-slate-200/80 shadow-2xs'
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: '#E6F5F2', color: primaryColor }}
                    >
                      <IconComp size={20} />
                    </div>
                    <EditableText
                      id={`doc2_why_t_${feat.id}`}
                      as="h4"
                      defaultText={feat.title}
                      className="text-sm font-extrabold block"
                    />
                    <EditableText
                      id={`doc2_why_d_${feat.id}`}
                      as="p"
                      defaultText={feat.description}
                      className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed block"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 3: Dark Executive Split Biography & 2x2 Matrix */
  if (variant === 'varient_3' || variant === 'varient_6') {
    return (
      <section id="about" className="py-14 px-4 sm:px-8 bg-[#0E182B] text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-6 p-7 rounded-3xl bg-white/5 border border-white/10">
            <EditableText
              id="doc2_about_heading"
              as="h2"
              defaultText={title}
              className="text-2xl font-extrabold text-white block"
            />
            <EditableText
              id="doc2_about_bio"
              as="p"
              defaultText={subtitle}
              className="text-xs sm:text-sm text-slate-300 leading-relaxed block"
            />
            <div className="space-y-4 border-l-2 border-emerald-400/50 pl-4 ml-2">
              {ARJUN_TIMELINE.map((item) => (
                <div key={item.id} className="space-y-0.5">
                  <EditableText
                    id={`doc2_tl_yr_${item.id}`}
                    as="div"
                    defaultText={item.year}
                    className="text-xs font-extrabold text-emerald-400"
                  />
                  <EditableText
                    id={`doc2_tl_dt_${item.id}`}
                    as="div"
                    defaultText={item.detail}
                    className="text-xs text-slate-300"
                  />
                </div>
              ))}
            </div>
            <EditableButton
              id="doc2_about_cv_btn"
              defaultText="Download CV"
              defaultLinkUrl="#location"
              iconLeft={<Download size={14} />}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-white cursor-pointer inline-flex items-center gap-2"
              style={{ backgroundColor: primaryColor }}
            />
          </div>

          <div className="lg:col-span-6 space-y-5">
            <EditableText
              id="doc2_why_heading"
              as="h2"
              defaultText="Why Patients Choose Me"
              className="text-2xl font-extrabold text-white block"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHY_CHOOSE_ARJUN.map((feat) => {
                const IconComp = feat.icon;
                return (
                  <div
                    key={feat.id}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <IconComp size={18} />
                      </div>
                      <EditableText
                        id={`doc2_why_t_${feat.id}`}
                        as="h4"
                        defaultText={feat.title}
                        className="text-sm font-extrabold text-white block"
                      />
                    </div>
                    <EditableText
                      id={`doc2_why_d_${feat.id}`}
                      as="p"
                      defaultText={feat.description}
                      className="text-xs text-slate-300 leading-relaxed block"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ========================================================================
   * VARIANT 1 (Exact Dribbble Screenshot Layout):
   * Left Column: "About Dr. Arjun Mehta" + Bio + Vertical Green Dot Timeline + "Download CV" Pill Button
   * Right Column: "Why Patients Choose Me" + 2x2 Soft Mint/Ice Cards
   * ======================================================================== */
  return (
    <section
      id="about"
      className={`py-12 px-4 sm:px-8 transition-colors ${
        isDark ? 'bg-[#0B1320] text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: About Dr. Arjun Mehta + Timeline + Download CV */}
        <div className="lg:col-span-6 space-y-6">
          <EditableText
            id="doc2_about_heading"
            as="h2"
            defaultText={title}
            className="text-xl sm:text-2xl font-extrabold tracking-tight block"
          />

          <EditableText
            id="doc2_about_bio"
            as="p"
            defaultText={subtitle}
            className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed block"
          />

          {/* Vertical Timeline with Teal Circle Nodes */}
          <div className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-emerald-600/30">
            {ARJUN_TIMELINE.map((item) => (
              <div key={item.id} className="relative">
                <span
                  className="absolute -left-6 top-1 w-4 h-4 rounded-full border-2 bg-white dark:bg-slate-900 flex items-center justify-center"
                  style={{ borderColor: primaryColor }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                </span>
                <EditableText
                  id={`doc2_tl_yr_${item.id}`}
                  as="div"
                  defaultText={item.year}
                  className="text-xs font-extrabold text-slate-900 dark:text-white"
                />
                <EditableText
                  id={`doc2_tl_dt_${item.id}`}
                  as="div"
                  defaultText={item.detail}
                  className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed"
                />
              </div>
            ))}
          </div>

          <div className="pt-1">
            <EditableButton
              id="doc2_about_cv_btn"
              defaultText="Download CV"
              defaultLinkUrl="#location"
              iconLeft={<Download size={14} />}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-white shadow-sm hover:opacity-95 transition cursor-pointer inline-flex items-center gap-2"
              style={{ backgroundColor: primaryColor }}
            />
          </div>
        </div>

        {/* Right Column: Why Patients Choose Me (2x2 Soft Mint Cards) */}
        <div className="lg:col-span-6 space-y-6">
          <EditableText
            id="doc2_why_heading"
            as="h2"
            defaultText="Why Patients Choose Me"
            className="text-xl sm:text-2xl font-extrabold tracking-tight block"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_CHOOSE_ARJUN.map((feat) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={feat.id}
                  className={`p-6 rounded-2xl space-y-3 transition ${
                    isDark
                      ? 'bg-[#132235] border border-white/10'
                      : 'bg-[#EEF7F6] border border-emerald-900/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ color: primaryColor }}
                    >
                      <IconComp size={22} />
                    </div>
                    <EditableText
                      id={`doc2_why_t_${feat.id}`}
                      as="h3"
                      defaultText={feat.title}
                      className="text-xs sm:text-sm font-extrabold leading-snug block"
                    />
                  </div>
                  <EditableText
                    id={`doc2_why_d_${feat.id}`}
                    as="p"
                    defaultText={feat.description}
                    className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-300 leading-relaxed block"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctor2AboutSection;
