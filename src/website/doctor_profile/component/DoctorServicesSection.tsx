import React from 'react';
import {
  Heart,
  Activity,
  Stethoscope,
  ClipboardList,
  UserCheck,
  Pill,
  Video,
  Share2,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { EditableText, EditableButton } from './DoctorCanvaEditorContext';
import { DoctorVariantId } from './DoctorNavbar';

export interface DoctorServicesSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  accentTeal?: string;
  isDark?: boolean;
}

export const MEDICAL_SERVICES_DATA = [
  {
    id: 'preventive',
    title: 'Preventive Care',
    description:
      'Comprehensive health screenings, vaccinations, and lifestyle counseling to keep you healthy and prevent disease before it starts.',
    icon: Heart,
    bullets: [
      'Annual Physical Exams',
      'Health Risk Assessments',
      'Vaccination Programs',
      'Wellness Counseling',
    ],
  },
  {
    id: 'chronic',
    title: 'Chronic Disease Management',
    description:
      'Expert care for long-term conditions including diabetes, hypertension, heart disease, and respiratory disorders.',
    icon: Activity,
    bullets: [
      'Diabetes Care',
      'Hypertension Management',
      'Asthma & COPD',
      'Heart Disease Monitoring',
    ],
  },
  {
    id: 'acute',
    title: 'Acute Care',
    description:
      'Same-day appointments for sudden illnesses, infections, minor injuries, and urgent medical concerns.',
    icon: Stethoscope,
    bullets: [
      'Same-Day Appointments',
      'Infection Treatment',
      'Minor Injury Care',
      'Urgent Consultations',
    ],
  },
  {
    id: 'diagnostic',
    title: 'Diagnostic Services',
    description:
      'On-site laboratory testing, imaging coordination, and comprehensive diagnostic evaluations.',
    icon: ClipboardList,
    bullets: [
      'Blood Work',
      'EKG Testing',
      'Imaging Referrals',
      'Health Screenings',
    ],
  },
  {
    id: 'geriatric',
    title: 'Geriatric Care',
    description:
      'Specialized care for older adults focusing on maintaining independence, managing multiple conditions, and quality of life.',
    icon: UserCheck,
    bullets: [
      'Senior Wellness',
      'Memory Care',
      'Fall Prevention',
      'Medication Management',
    ],
  },
  {
    id: 'medication',
    title: 'Medication Management',
    description:
      'Careful oversight of your medications to ensure safety, effectiveness, and minimize side effects or interactions.',
    icon: Pill,
    bullets: [
      'Prescription Review',
      'Drug Interaction Check',
      'Side Effect Monitoring',
      'Medication Education',
    ],
  },
  {
    id: 'telemedicine',
    title: 'Telemedicine',
    description:
      'Convenient virtual appointments for follow-ups, medication reviews, and minor health concerns from the comfort of your home.',
    icon: Video,
    bullets: [
      'Video Consultations',
      'Online Prescription Refills',
      'Remote Monitoring',
      'Digital Health Records',
    ],
  },
  {
    id: 'referrals',
    title: 'Specialized Referrals',
    description:
      'Coordinated care with trusted specialists to ensure you receive the best comprehensive treatment for complex conditions.',
    icon: Share2,
    bullets: [
      'Specialist Coordination',
      'Second Opinions',
      'Treatment Planning',
      'Care Continuity',
    ],
  },
];

export const DoctorServicesSection: React.FC<DoctorServicesSectionProps> = ({
  title = 'Medical Services',
  subtitle = 'From preventive care to chronic disease management, I offer a full spectrum of internal medicine services to meet your healthcare needs at every stage of life.',
  variant = 'varient_1',
  primaryColor = '#1D2B6B',
  accentTeal = '#48B89F',
  isDark = false,
}) => {
  /* VARIANT 2: 2-Column Horizontal Editorial Cards with Pill Tags */
  if (variant === 'varient_2') {
    return (
      <section id="services" className={`py-20 px-6 ${isDark ? 'bg-[#0E1525] text-white' : 'bg-[#F4FAF8] text-[#1D2B6B]'}`}>
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-white/10 pb-8">
            <div className="space-y-2 max-w-2xl">
              <EditableText id="doc_services_badge" as="div" defaultText="COMPREHENSIVE CARE" className="text-xs font-extrabold uppercase tracking-widest" style={{ color: accentTeal }} />
              <EditableText id="doc_services_heading" as="h2" defaultText={title} className="text-3xl md:text-5xl font-black tracking-tight block" />
              <EditableText id="doc_services_subtitle" as="p" defaultText={subtitle} className="text-sm text-slate-600 dark:text-slate-300 block" />
            </div>
            <EditableButton id="doc_services_v2_cta" defaultText="Book a Service Visit" defaultLinkUrl="#contact" className="px-6 py-3 rounded-2xl text-xs font-extrabold text-white shadow-md cursor-pointer inline-flex items-center gap-2 self-start" style={{ backgroundColor: primaryColor }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MEDICAL_SERVICES_DATA.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <div key={service.id} className={`p-7 rounded-3xl border flex items-start gap-5 transition hover:shadow-lg ${isDark ? 'bg-[#162035] border-white/10' : 'bg-white border-slate-200/80'}`}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-sm" style={{ backgroundColor: idx % 2 === 0 ? primaryColor : accentTeal }}>
                    <IconComp size={24} />
                  </div>
                  <div className="space-y-3 flex-1">
                    <EditableText id={`doc_srv_title_${service.id}`} as="h3" defaultText={service.title} className="text-lg font-extrabold block" />
                    <EditableText id={`doc_srv_desc_${service.id}`} as="p" defaultText={service.description} className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed block" />
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {service.bullets.map((b, bIdx) => (
                        <span key={bIdx} className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E6F4F1] dark:bg-white/10 text-[#1D2B6B] dark:text-teal-300">
                          <EditableText id={`doc_srv_bullet_${service.id}_${bIdx}`} defaultText={b} />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 3: Brutalist Numbered Clinical Service Ledger */
  if (variant === 'varient_3') {
    return (
      <section id="services" className={`py-20 px-6 border-b-2 border-slate-900 dark:border-white ${isDark ? 'bg-[#12192B] text-white' : 'bg-[#F8FAFC] text-slate-950'}`}>
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <EditableText id="doc_services_badge" as="div" defaultText="03 // COMPREHENSIVE CARE LEDGER" className="font-mono text-xs font-black uppercase text-[#48B89F]" />
              <EditableText id="doc_services_heading" as="h2" defaultText={title} className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-1 block" />
            </div>
            <EditableText id="doc_services_subtitle" as="p" defaultText={subtitle} className="text-xs md:text-sm max-w-md font-medium block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-2 border-slate-900 dark:border-white bg-white dark:bg-[#162035] shadow-[8px_8px_0px_#1D2B6B]">
            {MEDICAL_SERVICES_DATA.map((service, idx) => (
              <div key={service.id} className="p-6 border-b-2 sm:border-r-2 border-slate-900 dark:border-white flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black px-2 py-0.5 bg-[#48B89F] text-white">0{idx + 1}</span>
                    <ArrowUpRight size={16} />
                  </div>
                  <EditableText id={`doc_srv_title_${service.id}`} as="h3" defaultText={service.title} className="text-base font-black uppercase block" />
                  <EditableText id={`doc_srv_desc_${service.id}`} as="p" defaultText={service.description} className="text-xs opacity-80 leading-relaxed block" />
                </div>
                <ul className="space-y-1 pt-3 border-t-2 border-slate-900/20 dark:border-white/20 text-xs font-semibold">
                  {service.bullets.map((b, bIdx) => (
                    <li key={bIdx}>+ <EditableText id={`doc_srv_bullet_${service.id}_${bIdx}`} defaultText={b} /></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 4: Bento Specialty Spotlight (2 Featured Wide Cards + 6 Grid) */
  if (variant === 'varient_4') {
    return (
      <section id="services" className={`py-20 px-6 ${isDark ? 'bg-[#0D1322] text-white' : 'bg-[#EEF5F4] text-[#1D2B6B]'}`}>
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <EditableText id="doc_services_badge" as="div" defaultText="COMPREHENSIVE CARE" className="text-xs font-extrabold uppercase tracking-widest text-[#48B89F]" />
            <EditableText id="doc_services_heading" as="h2" defaultText={title} className="text-3xl md:text-4xl font-black block" />
            <EditableText id="doc_services_subtitle" as="p" defaultText={subtitle} className="text-sm text-slate-600 dark:text-slate-300 block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {MEDICAL_SERVICES_DATA.map((service, idx) => {
              const IconComp = service.icon;
              const isFeatured = idx < 2;
              return (
                <div
                  key={service.id}
                  className={`${isFeatured ? 'md:col-span-6' : 'md:col-span-4'} p-7 rounded-[28px] border flex flex-col justify-between space-y-4 ${
                    idx === 0 ? 'text-white border-transparent shadow-lg' : isDark ? 'bg-[#162035] border-white/10' : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                  style={idx === 0 ? { backgroundColor: primaryColor } : undefined}
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: idx === 0 ? 'rgba(255,255,255,0.15)' : '#E6F4F1', color: idx === 0 ? '#FFFFFF' : accentTeal }}>
                      <IconComp size={22} />
                    </div>
                    <EditableText id={`doc_srv_title_${service.id}`} as="h3" defaultText={service.title} className="text-lg font-extrabold block" />
                    <EditableText id={`doc_srv_desc_${service.id}`} as="p" defaultText={service.description} className={`text-xs leading-relaxed block ${idx === 0 ? 'text-white/85' : 'text-slate-500 dark:text-slate-300'}`} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-current/10 text-xs">
                    {service.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} style={{ color: idx === 0 ? '#48B89F' : accentTeal }} />
                        <EditableText id={`doc_srv_bullet_${service.id}_${bIdx}`} defaultText={b} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 5: Dark Contrast Royal Navy Medical Matrix */
  if (variant === 'varient_5') {
    return (
      <section id="services" className="py-20 px-6 bg-gradient-to-b from-[#0F172A] to-[#1D2B6B] text-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <EditableText id="doc_services_badge" as="div" defaultText="COMPREHENSIVE CARE" className="text-xs font-extrabold uppercase tracking-widest text-[#48B89F]" />
            <EditableText id="doc_services_heading" as="h2" defaultText={title} className="text-3xl md:text-5xl font-black block" />
            <EditableText id="doc_services_subtitle" as="p" defaultText={subtitle} className="text-sm text-slate-300 block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MEDICAL_SERVICES_DATA.map((service) => {
              const IconComp = service.icon;
              return (
                <div key={service.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#48B89F] transition flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-[#48B89F]/20 text-[#48B89F] flex items-center justify-center">
                      <IconComp size={20} />
                    </div>
                    <EditableText id={`doc_srv_title_${service.id}`} as="h3" defaultText={service.title} className="text-base font-extrabold text-white block" />
                    <EditableText id={`doc_srv_desc_${service.id}`} as="p" defaultText={service.description} className="text-xs text-slate-300 leading-relaxed block" />
                  </div>
                  <ul className="space-y-1.5 pt-3 border-t border-white/10 text-xs text-teal-200">
                    {service.bullets.map((b, bIdx) => (
                      <li key={bIdx}>• <EditableText id={`doc_srv_bullet_${service.id}_${bIdx}`} defaultText={b} /></li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 6: Split Sticky Header + Service Directory Rows */
  if (variant === 'varient_6') {
    return (
      <section id="services" className={`py-20 px-6 ${isDark ? 'bg-[#12192B] text-white' : 'bg-white text-[#1D2B6B]'}`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <EditableText id="doc_services_badge" as="div" defaultText="COMPREHENSIVE CARE" className="text-xs font-extrabold uppercase tracking-widest text-[#48B89F]" />
            <EditableText id="doc_services_heading" as="h2" defaultText={title} className="text-3xl md:text-4xl font-black block" />
            <EditableText id="doc_services_subtitle" as="p" defaultText={subtitle} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed block" />
            <EditableButton id="doc_services_v6_btn" defaultText="Request Service Consultation" defaultLinkUrl="#contact" className="px-6 py-3.5 rounded-2xl text-xs font-extrabold text-white shadow-md cursor-pointer inline-flex items-center gap-2" style={{ backgroundColor: primaryColor }} />
          </div>

          <div className="lg:col-span-8 space-y-4">
            {MEDICAL_SERVICES_DATA.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <div key={service.id} className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-start justify-between gap-5 ${isDark ? 'bg-[#182238] border-white/10' : 'bg-[#F8FAFC] border-slate-200/80'}`}>
                  <div className="flex items-start gap-4 max-w-md">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: idx % 2 === 0 ? primaryColor : accentTeal }}>
                      <IconComp size={20} />
                    </div>
                    <div>
                      <EditableText id={`doc_srv_title_${service.id}`} as="h3" defaultText={service.title} className="text-base font-extrabold block" />
                      <EditableText id={`doc_srv_desc_${service.id}`} as="p" defaultText={service.description} className="text-xs text-slate-500 dark:text-slate-300 mt-1 leading-relaxed block" />
                    </div>
                  </div>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300 flex-shrink-0">
                    {service.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentTeal }} />
                        <EditableText id={`doc_srv_bullet_${service.id}_${bIdx}`} defaultText={b} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 1 (Default Dribbble Video Layout): 8-Card 4x2 Medical Services Grid */
  return (
    <section id="services" className={`py-20 px-6 transition-colors ${isDark ? 'bg-[#12192B] text-white' : 'bg-[#F6FAFD] text-[#1D2B6B]'}`}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <EditableText id="doc_services_badge" as="div" defaultText="COMPREHENSIVE CARE" className="text-xs font-extrabold uppercase tracking-widest" style={{ color: accentTeal }} />
          <EditableText id="doc_services_heading" as="h2" defaultText={title} className="text-3xl md:text-4xl font-extrabold tracking-tight block" style={{ color: isDark ? '#FFFFFF' : primaryColor }} />
          <EditableText id="doc_services_subtitle" as="p" defaultText={subtitle} className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed block" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEDICAL_SERVICES_DATA.map((service, idx) => {
            const IconComp = service.icon;
            const badgeColor = idx % 2 === 0 ? primaryColor : accentTeal;
            return (
              <div key={service.id} className={`p-6 rounded-2xl border shadow-sm hover:shadow-lg transition flex flex-col justify-between ${isDark ? 'bg-[#182238] border-white/10' : 'bg-white border-slate-200/70'}`}>
                <div>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-5 shadow-xs" style={{ backgroundColor: badgeColor }}>
                    <IconComp size={22} />
                  </div>
                  <EditableText id={`doc_srv_title_${service.id}`} as="h3" defaultText={service.title} className="text-base font-extrabold mb-2 block" style={{ color: isDark ? '#FFFFFF' : primaryColor }} />
                  <EditableText id={`doc_srv_desc_${service.id}`} as="p" defaultText={service.description} className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed mb-4 block" />
                </div>
                <ul className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300">
                  {service.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accentTeal }} />
                      <EditableText id={`doc_srv_bullet_${service.id}_${bIdx}`} defaultText={b} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DoctorServicesSection;
