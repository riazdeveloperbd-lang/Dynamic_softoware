import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { EditableText, EditableButton } from './DoctorCanvaEditorContext';
import { DoctorVariantId } from './DoctorNavbar';

export interface DoctorCareJourneySectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  accentTeal?: string;
  isDark?: boolean;
}

export const CARE_JOURNEY_STEPS = [
  {
    number: '01',
    title: 'Schedule',
    description: 'Book online or by phone at your convenience',
  },
  {
    number: '02',
    title: 'Consultation',
    description: 'Comprehensive evaluation of your health needs',
  },
  {
    number: '03',
    title: 'Treatment Plan',
    description: 'Personalized care plan tailored to your goals',
  },
  {
    number: '04',
    title: 'Follow-Up',
    description: 'Ongoing support and health monitoring',
  },
];

export const INSURANCE_ITEMS = [
  'Most Major Insurance Plans',
  'Medicare & Medicaid',
  'Flexible Payment Plans',
  'Cash Pay Options',
];

export const ACCESSIBLE_CARE_ITEMS = [
  'Extended Hours & Weekend Appointments',
  'Wheelchair Accessible Facility',
  'Multi-Language Support',
  'Convenient Parking',
];

export const DoctorCareJourneySection: React.FC<DoctorCareJourneySectionProps> = ({
  title = 'Your Care Journey',
  subtitle = 'A streamlined process designed with your comfort and health in mind',
  variant = 'varient_1',
  primaryColor = '#1D2B6B',
  accentTeal = '#48B89F',
  isDark = false,
}) => {
  /* VARIANT 2: Vertical Connected Roadmap Left + Insurance/Access Cards Right */
  if (variant === 'varient_2') {
    return (
      <section className={`py-20 px-6 ${isDark ? 'bg-[#0F1523] text-white' : 'bg-[#FAFDFC] text-[#1D2B6B]'}`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Vertical Timeline (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <EditableText id="doc_journey_heading" as="h2" defaultText={title} className="text-3xl font-black block" />
              <EditableText id="doc_journey_subtitle" as="p" defaultText={subtitle} className="text-sm text-slate-500 dark:text-slate-400 mt-1 block" />
            </div>

            <div className="space-y-4">
              {CARE_JOURNEY_STEPS.map((step) => (
                <div key={step.number} className={`p-5 rounded-2xl border flex items-start gap-4 ${isDark ? 'bg-[#162035] border-white/10' : 'bg-white border-slate-200/80 shadow-xs'}`}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{ backgroundColor: accentTeal }}>
                    <EditableText id={`doc_journey_num_${step.number}`} defaultText={step.number} />
                  </div>
                  <div>
                    <EditableText id={`doc_journey_title_${step.number}`} as="h3" defaultText={step.title} className="text-base font-extrabold block" />
                    <EditableText id={`doc_journey_desc_${step.number}`} as="p" defaultText={step.description} className="text-xs text-slate-500 dark:text-slate-300 mt-0.5 block" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Stacked Insurance & Accessibility Cards (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl text-white space-y-4 shadow-lg" style={{ backgroundColor: primaryColor }}>
              <EditableText id="doc_insurance_title" as="h3" defaultText="Insurance & Payment" className="text-xl font-extrabold block" />
              <EditableText id="doc_insurance_desc" as="p" defaultText="We accept most major insurance plans and offer flexible payment options to ensure quality healthcare is accessible to all patients." className="text-xs text-white/80 leading-relaxed block" />
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs font-semibold">
                {INSURANCE_ITEMS.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#48B89F]" />
                    <EditableText id={`doc_insurance_item_${idx}`} defaultText={item} />
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-8 rounded-3xl border space-y-4 ${isDark ? 'bg-[#162035] border-white/10' : 'bg-[#EDF9F5] border-teal-200'}`}>
              <EditableText id="doc_access_title" as="h3" defaultText="Accessible Care" className="text-xl font-extrabold block" />
              <EditableText id="doc_access_desc" as="p" defaultText="Our practice is designed to provide convenient, comfortable, and accessible healthcare for all patients in our community." className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed block" />
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs font-semibold">
                {ACCESSIBLE_CARE_ITEMS.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 size={15} style={{ color: accentTeal }} />
                    <EditableText id={`doc_access_item_${idx}`} defaultText={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 3: Brutalist Clinical Process & Coverage Ledger */
  if (variant === 'varient_3') {
    return (
      <section className={`py-20 px-6 border-b-2 border-slate-900 dark:border-white ${isDark ? 'bg-[#0F1523] text-white' : 'bg-white text-slate-950'}`}>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="border-2 border-slate-900 dark:border-white bg-[#1D2B6B] text-white p-8 shadow-[6px_6px_0px_#48B89F]">
            <EditableText id="doc_journey_heading" as="h2" defaultText={title} className="text-3xl font-black uppercase block" />
            <EditableText id="doc_journey_subtitle" as="p" defaultText={subtitle} className="text-xs font-mono text-teal-300 mt-1 block" />
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t-2 border-white/20">
              {CARE_JOURNEY_STEPS.map((step) => (
                <div key={step.number} className="p-4 border-2 border-white/30 bg-white/5 space-y-1.5">
                  <EditableText id={`doc_journey_num_${step.number}`} as="div" defaultText={`STEP ${step.number}`} className="font-mono text-xs font-black text-[#48B89F]" />
                  <EditableText id={`doc_journey_title_${step.number}`} as="h3" defaultText={step.title} className="text-base font-black uppercase block" />
                  <EditableText id={`doc_journey_desc_${step.number}`} as="p" defaultText={step.description} className="text-xs text-white/80 block" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 border-2 border-slate-900 dark:border-white bg-[#F0F5FF] dark:bg-[#151F34] shadow-[5px_5px_0px_#1D2B6B] space-y-3">
              <EditableText id="doc_insurance_title" as="h3" defaultText="Insurance & Payment" className="text-xl font-black uppercase block" />
              <EditableText id="doc_insurance_desc" as="p" defaultText="We accept most major insurance plans and offer flexible payment options to ensure quality healthcare is accessible to all patients." className="text-xs block" />
              <ul className="space-y-1.5 text-xs font-bold pt-2">
                {INSURANCE_ITEMS.map((item, idx) => (
                  <li key={idx}>[✓] <EditableText id={`doc_insurance_item_${idx}`} defaultText={item} /></li>
                ))}
              </ul>
            </div>

            <div className="p-7 border-2 border-slate-900 dark:border-white bg-[#EDF9F5] dark:bg-[#12262A] shadow-[5px_5px_0px_#48B89F] space-y-3">
              <EditableText id="doc_access_title" as="h3" defaultText="Accessible Care" className="text-xl font-black uppercase block" />
              <EditableText id="doc_access_desc" as="p" defaultText="Our practice is designed to provide convenient, comfortable, and accessible healthcare for all patients in our community." className="text-xs block" />
              <ul className="space-y-1.5 text-xs font-bold pt-2">
                {ACCESSIBLE_CARE_ITEMS.map((item, idx) => (
                  <li key={idx}>[✓] <EditableText id={`doc_access_item_${idx}`} defaultText={item} /></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 4: Bento 6-Card Care Journey & Coverage Grid */
  if (variant === 'varient_4') {
    return (
      <section className={`py-20 px-6 ${isDark ? 'bg-[#0F1523] text-white' : 'bg-[#F4F8FA] text-[#1D2B6B]'}`}>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <EditableText id="doc_journey_heading" as="h2" defaultText={title} className="text-3xl md:text-4xl font-black block" />
            <EditableText id="doc_journey_subtitle" as="p" defaultText={subtitle} className="text-sm text-slate-500 dark:text-slate-400 block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CARE_JOURNEY_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className={`p-6 rounded-[24px] border space-y-3 ${
                  idx === 0 ? 'text-white border-transparent shadow-md' : isDark ? 'bg-[#162035] border-white/10' : 'bg-white border-slate-200/80'
                }`}
                style={idx === 0 ? { backgroundColor: accentTeal } : undefined}
              >
                <EditableText id={`doc_journey_num_${step.number}`} as="div" defaultText={step.number} className="text-3xl font-black opacity-60" />
                <EditableText id={`doc_journey_title_${step.number}`} as="h3" defaultText={step.title} className="text-base font-extrabold block" />
                <EditableText id={`doc_journey_desc_${step.number}`} as="p" defaultText={step.description} className="text-xs opacity-85 leading-relaxed block" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-8 rounded-[28px] border space-y-3 ${isDark ? 'bg-[#162035] border-white/10' : 'bg-white border-slate-200/80'}`}>
              <EditableText id="doc_insurance_title" as="h3" defaultText="Insurance & Payment" className="text-xl font-extrabold block" />
              <EditableText id="doc_insurance_desc" as="p" defaultText="We accept most major insurance plans and offer flexible payment options to ensure quality healthcare is accessible to all patients." className="text-xs text-slate-500 dark:text-slate-300 block" />
              <div className="flex flex-wrap gap-2 pt-2">
                {INSURANCE_ITEMS.map((item, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-[#F0F5FF] dark:bg-white/10 text-xs font-bold">
                    <EditableText id={`doc_insurance_item_${idx}`} defaultText={item} />
                  </span>
                ))}
              </div>
            </div>

            <div className={`p-8 rounded-[28px] border space-y-3 ${isDark ? 'bg-[#162035] border-white/10' : 'bg-white border-slate-200/80'}`}>
              <EditableText id="doc_access_title" as="h3" defaultText="Accessible Care" className="text-xl font-extrabold block" />
              <EditableText id="doc_access_desc" as="p" defaultText="Our practice is designed to provide convenient, comfortable, and accessible healthcare for all patients in our community." className="text-xs text-slate-500 dark:text-slate-300 block" />
              <div className="flex flex-wrap gap-2 pt-2">
                {ACCESSIBLE_CARE_ITEMS.map((item, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-[#EDF9F5] dark:bg-white/10 text-xs font-bold">
                    <EditableText id={`doc_access_item_${idx}`} defaultText={item} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 5: Dark Executive Navy & Glowing Mint Roadmap */
  if (variant === 'varient_5') {
    return (
      <section className="py-20 px-6 bg-[#0B1120] text-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <EditableText id="doc_journey_heading" as="h2" defaultText={title} className="text-3xl md:text-5xl font-black text-white block" />
            <EditableText id="doc_journey_subtitle" as="p" defaultText={subtitle} className="text-sm text-teal-300 block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CARE_JOURNEY_STEPS.map((step) => (
              <div key={step.number} className="p-6 rounded-2xl bg-white/5 border border-[#48B89F]/30 space-y-2">
                <EditableText id={`doc_journey_num_${step.number}`} as="div" defaultText={step.number} className="text-3xl font-black text-[#48B89F]" />
                <EditableText id={`doc_journey_title_${step.number}`} as="h3" defaultText={step.title} className="text-base font-extrabold text-white block" />
                <EditableText id={`doc_journey_desc_${step.number}`} as="p" defaultText={step.description} className="text-xs text-slate-300 block" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
              <EditableText id="doc_insurance_title" as="h3" defaultText="Insurance & Payment" className="text-xl font-extrabold text-[#48B89F] block" />
              <EditableText id="doc_insurance_desc" as="p" defaultText="We accept most major insurance plans and offer flexible payment options to ensure quality healthcare is accessible to all patients." className="text-xs text-slate-300 block" />
              <ul className="space-y-2 text-xs text-white">
                {INSURANCE_ITEMS.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#48B89F]" />
                    <EditableText id={`doc_insurance_item_${idx}`} defaultText={item} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
              <EditableText id="doc_access_title" as="h3" defaultText="Accessible Care" className="text-xl font-extrabold text-[#48B89F] block" />
              <EditableText id="doc_access_desc" as="p" defaultText="Our practice is designed to provide convenient, comfortable, and accessible healthcare for all patients in our community." className="text-xs text-slate-300 block" />
              <ul className="space-y-2 text-xs text-white">
                {ACCESSIBLE_CARE_ITEMS.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#48B89F]" />
                    <EditableText id={`doc_access_item_${idx}`} defaultText={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 6: Compact Stepper Strip + Unified Patient Perks Banner */
  if (variant === 'varient_6') {
    return (
      <section className={`py-16 px-6 ${isDark ? 'bg-[#0F1523] text-white' : 'bg-white text-[#1D2B6B]'}`}>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className={`p-8 rounded-3xl border ${isDark ? 'bg-[#162035] border-white/10' : 'bg-[#F8FAFC] border-slate-200/80'} space-y-6`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <EditableText id="doc_journey_heading" as="h2" defaultText={title} className="text-2xl font-black block" />
                <EditableText id="doc_journey_subtitle" as="p" defaultText={subtitle} className="text-xs text-slate-500 dark:text-slate-400 block" />
              </div>
              <EditableButton id="doc_journey_v6_btn" defaultText="Start Step 01 Today" defaultLinkUrl="#contact" iconRight={<ArrowRight size={14} />} className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white cursor-pointer inline-flex items-center gap-1.5 self-start" style={{ backgroundColor: accentTeal }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {CARE_JOURNEY_STEPS.map((step) => (
                <div key={step.number} className="p-4 rounded-2xl bg-white dark:bg-[#0F1523] border border-slate-200/60 dark:border-white/10 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{ backgroundColor: primaryColor }}>
                    <EditableText id={`doc_journey_num_${step.number}`} defaultText={step.number} />
                  </span>
                  <div>
                    <EditableText id={`doc_journey_title_${step.number}`} as="h3" defaultText={step.title} className="text-xs font-extrabold block" />
                    <EditableText id={`doc_journey_desc_${step.number}`} as="p" defaultText={step.description} className="text-[11px] text-slate-500 dark:text-slate-400 block" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 flex items-start gap-4">
              <ShieldCheck size={24} style={{ color: primaryColor }} className="flex-shrink-0 mt-1" />
              <div>
                <EditableText id="doc_insurance_title" as="h3" defaultText="Insurance & Payment" className="text-base font-extrabold block" />
                <EditableText id="doc_insurance_desc" as="p" defaultText="We accept most major insurance plans and offer flexible payment options." className="text-xs text-slate-500 dark:text-slate-400 mt-1 block" />
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 flex items-start gap-4">
              <Sparkles size={24} style={{ color: accentTeal }} className="flex-shrink-0 mt-1" />
              <div>
                <EditableText id="doc_access_title" as="h3" defaultText="Accessible Care" className="text-base font-extrabold block" />
                <EditableText id="doc_access_desc" as="p" defaultText="Extended hours, wheelchair accessibility, multi-language support, and convenient parking." className="text-xs text-slate-500 dark:text-slate-400 mt-1 block" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 1 (Default Dribbble Video Layout): Gradient 4-Step Banner + 2 Tinted Info Cards */
  return (
    <section className={`py-16 px-6 transition-colors ${isDark ? 'bg-[#0F1523] text-white' : 'bg-white text-[#1D2B6B]'}`}>
      <div className="max-w-6xl mx-auto space-y-10">
        <div
          className="rounded-[28px] p-8 md:p-12 text-white shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentTeal} 100%)`,
          }}
        >
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <EditableText id="doc_journey_heading" as="h2" defaultText={title} className="text-2xl md:text-3xl font-extrabold block" />
            <EditableText id="doc_journey_subtitle" as="p" defaultText={subtitle} className="text-xs md:text-sm text-white/85 block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CARE_JOURNEY_STEPS.map((step) => (
              <div key={step.number} className="text-center space-y-2">
                <EditableText id={`doc_journey_num_${step.number}`} as="div" defaultText={step.number} className="text-4xl md:text-5xl font-extrabold text-white/35 tracking-tight" />
                <EditableText id={`doc_journey_title_${step.number}`} as="h3" defaultText={step.title} className="text-base font-extrabold text-white block" />
                <EditableText id={`doc_journey_desc_${step.number}`} as="p" defaultText={step.description} className="text-xs text-white/80 leading-relaxed max-w-[220px] mx-auto block" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-7 md:p-8 rounded-[24px] border space-y-4 ${isDark ? 'bg-[#151F34] border-white/10' : 'bg-[#F0F5FF] border-blue-100'}`}>
            <EditableText id="doc_insurance_title" as="h3" defaultText="Insurance & Payment" className="text-xl font-extrabold block" style={{ color: isDark ? '#FFFFFF' : primaryColor }} />
            <EditableText id="doc_insurance_desc" as="p" defaultText="We accept most major insurance plans and offer flexible payment options to ensure quality healthcare is accessible to all patients." className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed block" />
            <ul className="space-y-2.5 pt-1">
              {INSURANCE_ITEMS.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <CheckCircle2 size={16} style={{ color: accentTeal }} />
                  <EditableText id={`doc_insurance_item_${idx}`} defaultText={item} />
                </li>
              ))}
            </ul>
          </div>

          <div className={`p-7 md:p-8 rounded-[24px] border space-y-4 ${isDark ? 'bg-[#12262A] border-white/10' : 'bg-[#EDF9F5] border-teal-100'}`}>
            <EditableText id="doc_access_title" as="h3" defaultText="Accessible Care" className="text-xl font-extrabold block" style={{ color: isDark ? '#FFFFFF' : primaryColor }} />
            <EditableText id="doc_access_desc" as="p" defaultText="Our practice is designed to provide convenient, comfortable, and accessible healthcare for all patients in our community." className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed block" />
            <ul className="space-y-2.5 pt-1">
              {ACCESSIBLE_CARE_ITEMS.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <CheckCircle2 size={16} style={{ color: accentTeal }} />
                  <EditableText id={`doc_access_item_${idx}`} defaultText={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorCareJourneySection;
