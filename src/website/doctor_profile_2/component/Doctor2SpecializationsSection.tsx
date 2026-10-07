import React from 'react';
import {
  HeartHandshake,
  Activity,
  HeartPulse,
  Stethoscope,
  ChevronRight,
} from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface Doctor2SpecializationsSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const DOCTOR2_SPECIALIZATIONS = [
  {
    id: 'interventional',
    title: 'Interventional Cardiology',
    description: 'Advanced treatments for blocked arteries and heart diseases.',
    icon: HeartHandshake,
  },
  {
    id: 'preventive',
    title: 'Preventive Cardiology',
    description: 'Personalized prevention plans for a healthier heart.',
    icon: Activity,
  },
  {
    id: 'heart_failure',
    title: 'Heart Failure Management',
    description: 'Expert care for heart failure and chronic conditions.',
    icon: HeartPulse,
  },
  {
    id: 'hypertension',
    title: 'Hypertension & Cholesterol Care',
    description: 'Manage blood pressure, cholesterol and cardiac risk factors.',
    icon: Stethoscope,
  },
];

export const Doctor2SpecializationsSection: React.FC<Doctor2SpecializationsSectionProps> = ({
  title = 'Specializations & Services',
  subtitle = 'Comprehensive evidence-based cardiac care tailored to your condition.',
  variant = 'varient_1',
  primaryColor = '#118C74',
  isDark = false,
}) => {
  /* VARIANT 2: 2x2 Horizontal Split Bento Cards */
  if (variant === 'varient_2' || variant === 'varient_5') {
    return (
      <section
        id="services"
        className={`py-14 px-4 sm:px-8 ${
          isDark ? 'bg-[#0E1729] text-white' : 'bg-[#F6FBF9] text-slate-900'
        }`}
      >
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <EditableText
                id="doc2_spec_heading_v2"
                as="h2"
                defaultText={title}
                className="text-2xl sm:text-3xl font-extrabold tracking-tight block"
              />
              <EditableText
                id="doc2_spec_sub_v2"
                as="p"
                defaultText={subtitle}
                className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 block"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DOCTOR2_SPECIALIZATIONS.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  className={`p-6 rounded-3xl border flex items-start gap-5 transition hover:shadow-md ${
                    isDark
                      ? 'bg-[#152238] border-white/10'
                      : 'bg-white border-slate-200/80'
                  }`}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#E7F6F3', color: primaryColor }}
                  >
                    <IconComp size={24} />
                  </div>
                  <div className="space-y-2 flex-1">
                    <EditableText
                      id={`doc2_spec_title_${item.id}`}
                      as="h3"
                      defaultText={item.title}
                      className="text-base font-extrabold block"
                    />
                    <EditableText
                      id={`doc2_spec_desc_${item.id}`}
                      as="p"
                      defaultText={item.description}
                      className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed block"
                    />
                    <EditableButton
                      id={`doc2_spec_btn_${item.id}`}
                      defaultText="Learn More"
                      defaultLinkUrl="#location"
                      iconRight={<ChevronRight size={13} />}
                      className="pt-1 inline-flex items-center gap-1 text-xs font-extrabold cursor-pointer"
                      style={{ color: primaryColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 3: Dark Cardiology Specialty Deck */
  if (variant === 'varient_3' || variant === 'varient_6') {
    return (
      <section id="services" className="py-14 px-4 sm:px-8 bg-[#0B1528] text-white">
        <div className="max-w-6xl mx-auto space-y-8">
          <EditableText
            id="doc2_spec_heading_v3"
            as="h2"
            defaultText={title}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight block"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOCTOR2_SPECIALIZATIONS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-emerald-400/50 transition flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <IconComp size={22} />
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        0{idx + 1}
                      </span>
                    </div>
                    <EditableText
                      id={`doc2_spec_title_${item.id}`}
                      as="h3"
                      defaultText={item.title}
                      className="text-base font-extrabold text-white block"
                    />
                    <EditableText
                      id={`doc2_spec_desc_${item.id}`}
                      as="p"
                      defaultText={item.description}
                      className="text-xs text-slate-300 leading-relaxed block"
                    />
                  </div>
                  <EditableButton
                    id={`doc2_spec_btn_${item.id}`}
                    defaultText="Learn More"
                    defaultLinkUrl="#location"
                    iconRight={<ChevronRight size={13} />}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 1 (Exact Dribbble Screenshot Design): 4 Equal Rounded White Cards with Soft Mint Circle Icon & "Learn More >" */
  return (
    <section
      id="services"
      className={`py-12 px-4 sm:px-8 transition-colors ${
        isDark ? 'bg-[#0B1320] text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-7">
        <EditableText
          id="doc2_spec_heading"
          as="h2"
          defaultText={title}
          className="text-xl sm:text-2xl font-extrabold tracking-tight block"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DOCTOR2_SPECIALIZATIONS.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                className={`p-6 rounded-2xl border transition hover:shadow-lg flex flex-col justify-between space-y-5 ${
                  isDark
                    ? 'bg-[#131F33] border-white/10'
                    : 'bg-white border-slate-200/70 shadow-xs'
                }`}
              >
                <div className="space-y-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: isDark ? 'rgba(17, 140, 116, 0.2)' : '#E6F5F2',
                      color: primaryColor,
                    }}
                  >
                    <IconComp size={22} />
                  </div>

                  <EditableText
                    id={`doc2_spec_title_${item.id}`}
                    as="h3"
                    defaultText={item.title}
                    className="text-sm sm:text-base font-extrabold leading-snug block"
                  />

                  <EditableText
                    id={`doc2_spec_desc_${item.id}`}
                    as="p"
                    defaultText={item.description}
                    className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed block"
                  />
                </div>

                <div>
                  <EditableButton
                    id={`doc2_spec_btn_${item.id}`}
                    defaultText="Learn More"
                    defaultLinkUrl="#location"
                    iconRight={<ChevronRight size={13} />}
                    className="inline-flex items-center gap-1 text-xs font-bold hover:opacity-80 transition cursor-pointer"
                    style={{ color: primaryColor }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Doctor2SpecializationsSection;
