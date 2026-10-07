import React from 'react';
import {
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  Heart,
  Activity,
  Sparkles,
  Users,
  Quote,
} from 'lucide-react';
import { EditableText, EditableImage, EditableButton } from './DoctorCanvaEditorContext';
import { DoctorVariantId } from './DoctorNavbar';

export interface DoctorAboutSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  accentTeal?: string;
  isDark?: boolean;
}

export const DOCTOR_CREDENTIALS = [
  {
    id: 'education',
    title: 'Education',
    icon: GraduationCap,
    items: [
      'MD - Johns Hopkins University',
      'Residency - Massachusetts General Hospital',
      'Fellowship - Mayo Clinic',
    ],
  },
  {
    id: 'experience',
    title: 'Experience',
    icon: Briefcase,
    items: [
      '15+ years in Internal Medicine',
      "Chief of Medicine - St. Mary's Hospital",
      'Clinical Professor - Medical School',
    ],
  },
  {
    id: 'certifications',
    title: 'Certifications',
    icon: Award,
    items: [
      'Board Certified - Internal Medicine',
      'American College of Physicians Fellow',
      'Advanced Cardiac Life Support',
    ],
  },
  {
    id: 'publications',
    title: 'Publications',
    icon: BookOpen,
    items: [
      '50+ peer-reviewed articles',
      'Author of "Modern Healthcare Approach"',
      'Regular speaker at medical conferences',
    ],
  },
];

export const DOCTOR_CORE_VALUES = [
  {
    id: 'compassionate',
    title: 'Compassionate Care',
    description:
      'Every patient deserves empathy, respect, and personalized attention throughout their healthcare journey.',
    icon: Heart,
  },
  {
    id: 'evidence',
    title: 'Evidence-Based Medicine',
    description:
      'Staying current with the latest research to provide the most effective, scientifically-proven treatments.',
    icon: Activity,
  },
  {
    id: 'holistic',
    title: 'Holistic Approach',
    description:
      'Addressing not just symptoms, but the whole person—mind, body, and lifestyle factors that impact health.',
    icon: Sparkles,
  },
  {
    id: 'education',
    title: 'Patient Education',
    description:
      'Empowering patients with knowledge and understanding to make informed decisions about their health.',
    icon: Users,
  },
];

const DEFAULT_BIO_IMG =
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=85';

export const DoctorAboutSection: React.FC<DoctorAboutSectionProps> = ({
  title = 'Dedicated to Your Health & Wellness',
  subtitle = 'With over 15 years of experience in internal medicine, I am committed to providing comprehensive, compassionate care that addresses your unique health needs and goals.',
  variant = 'varient_1',
  primaryColor = '#1D2B6B',
  accentTeal = '#48B89F',
  isDark = false,
}) => {
  /* ========================================================================
   * VARIANT 2: Editorial Magazine Biography (Right Portrait + Left Pull-Quote)
   * ======================================================================== */
  if (variant === 'varient_2') {
    return (
      <section
        id="about"
        className={`py-20 px-6 ${
          isDark ? 'bg-[#0D1322] text-white' : 'bg-[#FAFBFD] text-[#1D2B6B]'
        }`}
      >
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <EditableText
                id="doc_about_badge"
                as="div"
                defaultText="ABOUT DR. MITCHELL"
                className="text-xs font-extrabold uppercase tracking-widest"
                style={{ color: accentTeal }}
              />
              <EditableText
                id="doc_about_heading"
                as="h2"
                defaultText={title}
                className="text-3xl md:text-5xl font-black tracking-tight leading-tight block"
              />
              <div className="p-5 rounded-2xl border-l-4 border-[#48B89F] bg-[#E6F4F1]/50 dark:bg-white/5 flex items-start gap-3">
                <Quote size={24} className="text-[#48B89F] flex-shrink-0 mt-0.5" />
                <EditableText
                  id="doc_about_intro"
                  as="p"
                  defaultText={subtitle}
                  className="text-sm md:text-base italic font-medium text-slate-700 dark:text-slate-200 leading-relaxed block"
                />
              </div>
              <EditableText
                id="doc_about_personal_p1"
                as="p"
                defaultText="I believe that exceptional healthcare begins with truly listening to patients. Each person has a unique story, and understanding that story is essential to providing effective treatment."
                className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed block"
              />
              <EditableText
                id="doc_about_personal_p2"
                as="p"
                defaultText="My practice focuses on preventive care, chronic disease management, and helping patients achieve optimal health through evidence-based medicine combined with a holistic perspective."
                className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed block"
              />
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[32px] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 h-[440px]">
                <EditableImage
                  id="doc_about_bio_img"
                  defaultSrc={DEFAULT_BIO_IMG}
                  alt="Dr. Sarah Mitchell"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Horizontal Timeline / Pill Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DOCTOR_CREDENTIALS.map((cred) => {
              const IconComp = cred.icon;
              return (
                <div
                  key={cred.id}
                  className={`p-6 rounded-3xl border flex items-start gap-5 ${
                    isDark
                      ? 'bg-[#151F34] border-white/10'
                      : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: accentTeal }}
                  >
                    <IconComp size={24} />
                  </div>
                  <div className="space-y-2">
                    <EditableText
                      id={`doc_cred_title_${cred.id}`}
                      as="h4"
                      defaultText={cred.title}
                      className="text-lg font-extrabold block"
                    />
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                      {cred.items.map((item, idx) => (
                        <li key={idx}>
                          •{' '}
                          <EditableText
                            id={`doc_cred_item_${cred.id}_${idx}`}
                            defaultText={item}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  /* ========================================================================
   * VARIANT 3: Brutalist Clinical Credentials & Values Dossier
   * ======================================================================== */
  if (variant === 'varient_3') {
    return (
      <section
        id="about"
        className={`py-20 px-6 border-b-2 border-slate-900 dark:border-white ${
          isDark ? 'bg-[#0F1523] text-white' : 'bg-white text-slate-950'
        }`}
      >
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="border-2 border-slate-900 dark:border-white p-8 bg-[#F4F8F7] dark:bg-[#151F33] shadow-[6px_6px_0px_#48B89F]">
            <EditableText
              id="doc_about_badge"
              as="div"
              defaultText="PHYSICIAN DOSSIER // ABOUT DR. MITCHELL"
              className="font-mono text-xs font-black uppercase text-[#48B89F]"
            />
            <EditableText
              id="doc_about_heading"
              as="h2"
              defaultText={title}
              className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-2 block"
            />
            <EditableText
              id="doc_about_intro"
              as="p"
              defaultText={subtitle}
              className="text-sm md:text-base mt-3 max-w-3xl font-medium block"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 border-2 border-slate-900 dark:border-white">
            <div className="lg:col-span-5 border-b-2 lg:border-b-0 lg:border-r-2 border-slate-900 dark:border-white h-[380px]">
              <EditableImage
                id="doc_about_bio_img"
                defaultSrc={DEFAULT_BIO_IMG}
                alt="Dr. Sarah Mitchell"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-7 p-8 space-y-4 flex flex-col justify-center">
              <EditableText
                id="doc_about_personal_title"
                as="h3"
                defaultText="A Personal Approach to Medicine"
                className="text-2xl font-black uppercase block"
              />
              <EditableText
                id="doc_about_personal_p1"
                as="p"
                defaultText="I believe that exceptional healthcare begins with truly listening to patients. Each person has a unique story, and understanding that story is essential to providing effective treatment."
                className="text-sm leading-relaxed block"
              />
              <EditableText
                id="doc_about_personal_p2"
                as="p"
                defaultText="My practice focuses on preventive care, chronic disease management, and helping patients achieve optimal health through evidence-based medicine combined with a holistic perspective."
                className="text-sm leading-relaxed block"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-2 border-slate-900 dark:border-white divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-slate-900 dark:divide-white">
            {DOCTOR_CREDENTIALS.map((cred) => (
              <div key={cred.id} className="p-6 space-y-3">
                <EditableText
                  id={`doc_cred_title_${cred.id}`}
                  as="h4"
                  defaultText={cred.title}
                  className="text-base font-black uppercase tracking-wider text-[#48B89F] block"
                />
                <ul className="space-y-2 text-xs font-medium">
                  {cred.items.map((item, idx) => (
                    <li key={idx}>
                      →{' '}
                      <EditableText
                        id={`doc_cred_item_${cred.id}_${idx}`}
                        defaultText={item}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ========================================================================
   * VARIANT 4: Asymmetric Bento Grid Bio + Credentials + Core Values
   * ======================================================================== */
  if (variant === 'varient_4') {
    return (
      <section
        id="about"
        className={`py-20 px-6 ${
          isDark ? 'bg-[#0F1523] text-white' : 'bg-[#F3F7FA] text-[#1D2B6B]'
        }`}
      >
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Bio Bento Tile (8 cols) */}
            <div
              className={`lg:col-span-8 p-8 md:p-10 rounded-[28px] border space-y-4 ${
                isDark
                  ? 'bg-[#161F33] border-white/10'
                  : 'bg-white border-slate-200/80 shadow-sm'
              }`}
            >
              <EditableText
                id="doc_about_badge"
                as="span"
                defaultText="ABOUT DR. MITCHELL"
                className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#E6F4F1] text-[#48B89F] inline-block"
              />
              <EditableText
                id="doc_about_heading"
                as="h2"
                defaultText={title}
                className="text-3xl font-extrabold block"
              />
              <EditableText
                id="doc_about_intro"
                as="p"
                defaultText={subtitle}
                className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed block"
              />
              <EditableText
                id="doc_about_personal_p1"
                as="p"
                defaultText="I believe that exceptional healthcare begins with truly listening to patients. Each person has a unique story, and understanding that story is essential to providing effective treatment."
                className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed block"
              />
            </div>

            {/* Portrait Bento Tile (4 cols) */}
            <div className="lg:col-span-4 rounded-[28px] overflow-hidden shadow-md min-h-[300px]">
              <EditableImage
                id="doc_about_bio_img"
                defaultSrc={DEFAULT_BIO_IMG}
                alt="Dr. Sarah Mitchell"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 4 Bento Credential Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOCTOR_CREDENTIALS.map((cred) => {
              const IconComp = cred.icon;
              return (
                <div
                  key={cred.id}
                  className={`p-6 rounded-[24px] border ${
                    isDark
                      ? 'bg-[#161F33] border-white/10'
                      : 'bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <IconComp size={18} />
                    </div>
                    <EditableText
                      id={`doc_cred_title_${cred.id}`}
                      as="h4"
                      defaultText={cred.title}
                      className="text-sm font-extrabold"
                    />
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {cred.items.map((item, idx) => (
                      <li key={idx}>
                        •{' '}
                        <EditableText
                          id={`doc_cred_item_${cred.id}_${idx}`}
                          defaultText={item}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* 4 Core Values Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOCTOR_CORE_VALUES.map((val) => (
              <div
                key={val.id}
                className="p-6 rounded-[24px] text-white space-y-2"
                style={{ backgroundColor: primaryColor }}
              >
                <EditableText
                  id={`doc_val_title_${val.id}`}
                  as="h4"
                  defaultText={val.title}
                  className="text-sm font-extrabold text-[#48B89F] block"
                />
                <EditableText
                  id={`doc_val_desc_${val.id}`}
                  as="p"
                  defaultText={val.description}
                  className="text-xs text-white/85 leading-relaxed block"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ========================================================================
   * VARIANT 5: Dark Navy Specialist Spotlight & Glowing Glass Cards
   * ======================================================================== */
  if (variant === 'varient_5') {
    return (
      <section
        id="about"
        className="py-20 px-6 bg-[#0B1120] text-white"
      >
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4">
              <div className="rounded-3xl overflow-hidden border-2 border-[#48B89F]/40 shadow-2xl h-[380px]">
                <EditableImage
                  id="doc_about_bio_img"
                  defaultSrc={DEFAULT_BIO_IMG}
                  alt="Dr. Sarah Mitchell"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-8 space-y-5">
              <EditableText
                id="doc_about_badge"
                as="div"
                defaultText="ABOUT DR. MITCHELL"
                className="text-xs font-extrabold uppercase tracking-widest text-[#48B89F]"
              />
              <EditableText
                id="doc_about_heading"
                as="h2"
                defaultText={title}
                className="text-3xl md:text-5xl font-black tracking-tight block"
              />
              <EditableText
                id="doc_about_intro"
                as="p"
                defaultText={subtitle}
                className="text-base text-slate-300 leading-relaxed block"
              />
              <EditableText
                id="doc_about_personal_p1"
                as="p"
                defaultText="I believe that exceptional healthcare begins with truly listening to patients. Each person has a unique story, and understanding that story is essential to providing effective treatment."
                className="text-sm text-slate-400 leading-relaxed block"
              />
              <EditableButton
                id="doc_about_v5_btn"
                defaultText="Schedule a Consultation"
                defaultLinkUrl="#contact"
                className="px-6 py-3 rounded-xl bg-[#48B89F] text-slate-950 text-xs font-extrabold inline-flex items-center gap-2 cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOCTOR_CREDENTIALS.map((cred) => {
              const IconComp = cred.icon;
              return (
                <div
                  key={cred.id}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3"
                >
                  <IconComp size={24} className="text-[#48B89F]" />
                  <EditableText
                    id={`doc_cred_title_${cred.id}`}
                    as="h4"
                    defaultText={cred.title}
                    className="text-base font-extrabold text-white block"
                  />
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {cred.items.map((item, idx) => (
                      <li key={idx}>
                        •{' '}
                        <EditableText
                          id={`doc_cred_item_${cred.id}_${idx}`}
                          defaultText={item}
                        />
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

  /* ========================================================================
   * VARIANT 6: Compact Executive Summary + 2-Column Values & Credentials
   * ======================================================================== */
  if (variant === 'varient_6') {
    return (
      <section
        id="about"
        className={`py-20 px-6 ${
          isDark ? 'bg-[#0F1523] text-white' : 'bg-white text-[#1D2B6B]'
        }`}
      >
        <div className="max-w-6xl mx-auto space-y-12">
          <div
            className="p-8 md:p-10 rounded-[32px] text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentTeal} 100%)`,
            }}
          >
            <div className="lg:col-span-3">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white mx-auto shadow-lg">
                <EditableImage
                  id="doc_about_bio_img"
                  defaultSrc={DEFAULT_BIO_IMG}
                  alt="Dr. Sarah Mitchell"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-9 space-y-3 text-center lg:text-left">
              <EditableText
                id="doc_about_badge"
                as="div"
                defaultText="ABOUT DR. MITCHELL"
                className="text-xs font-extrabold uppercase tracking-widest text-white/80"
              />
              <EditableText
                id="doc_about_heading"
                as="h2"
                defaultText={title}
                className="text-3xl md:text-4xl font-black block"
              />
              <EditableText
                id="doc_about_intro"
                as="p"
                defaultText={subtitle}
                className="text-sm md:text-base text-white/90 leading-relaxed block"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <EditableText
                id="doc_values_heading"
                as="h3"
                defaultText="My Core Values"
                className="text-2xl font-extrabold block"
              />
              {DOCTOR_CORE_VALUES.map((val) => (
                <div
                  key={val.id}
                  className={`p-5 rounded-2xl border ${
                    isDark
                      ? 'bg-[#161F33] border-white/10'
                      : 'bg-[#F8FAFC] border-slate-200/80'
                  }`}
                >
                  <EditableText
                    id={`doc_val_title_${val.id}`}
                    as="h4"
                    defaultText={val.title}
                    className="text-sm font-extrabold block"
                  />
                  <EditableText
                    id={`doc_val_desc_${val.id}`}
                    as="p"
                    defaultText={val.description}
                    className="text-xs text-slate-600 dark:text-slate-300 mt-1 block"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <EditableText
                id="doc_about_cred_header_v6"
                as="h3"
                defaultText="Board Credentials & Academic Background"
                className="text-2xl font-extrabold block"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DOCTOR_CREDENTIALS.map((cred) => (
                  <div
                    key={cred.id}
                    className={`p-5 rounded-2xl border ${
                      isDark
                        ? 'bg-[#161F33] border-white/10'
                        : 'bg-[#F8FAFC] border-slate-200/80'
                    }`}
                  >
                    <EditableText
                      id={`doc_cred_title_${cred.id}`}
                      as="h4"
                      defaultText={cred.title}
                      className="text-sm font-extrabold text-[#48B89F] mb-2 block"
                    />
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                      {cred.items.map((item, idx) => (
                        <li key={idx}>
                          •{' '}
                          <EditableText
                            id={`doc_cred_item_${cred.id}_${idx}`}
                            defaultText={item}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ========================================================================
   * VARIANT 1 (Default Dribbble Video Layout): Bio + 4 Credentials + Core Values
   * ======================================================================== */
  return (
    <section
      id="about"
      className={`py-20 px-6 transition-colors ${
        isDark ? 'bg-[#0F1523] text-white' : 'bg-white text-[#1D2B6B]'
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Top Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <EditableText
            id="doc_about_badge"
            as="div"
            defaultText="ABOUT DR. MITCHELL"
            className="text-xs font-extrabold uppercase tracking-widest"
            style={{ color: accentTeal }}
          />
          <EditableText
            id="doc_about_heading"
            as="h2"
            defaultText={title}
            className="text-3xl md:text-4xl font-extrabold tracking-tight block"
            style={{ color: isDark ? '#FFFFFF' : primaryColor }}
          />
          <EditableText
            id="doc_about_intro"
            as="p"
            defaultText={subtitle}
            className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed block"
          />
        </div>

        {/* Two-Column Personal Approach & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="rounded-[26px] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 aspect-[4/4.3]">
              <EditableImage
                id="doc_about_bio_img"
                defaultSrc={DEFAULT_BIO_IMG}
                alt="Dr. Sarah Mitchell in clinical attire"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <EditableText
              id="doc_about_personal_title"
              as="h3"
              defaultText="A Personal Approach to Medicine"
              className="text-2xl md:text-3xl font-extrabold tracking-tight block"
              style={{ color: isDark ? '#FFFFFF' : primaryColor }}
            />
            <EditableText
              id="doc_about_personal_p1"
              as="p"
              defaultText="I believe that exceptional healthcare begins with truly listening to patients. Each person has a unique story, and understanding that story is essential to providing effective treatment."
              className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed block"
            />
            <EditableText
              id="doc_about_personal_p2"
              as="p"
              defaultText="My practice focuses on preventive care, chronic disease management, and helping patients achieve optimal health through evidence-based medicine combined with a holistic perspective."
              className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed block"
            />
            <EditableText
              id="doc_about_personal_p3"
              as="p"
              defaultText="Outside of medicine, I'm passionate about medical education, community health initiatives, and staying active through hiking and yoga—practices I often recommend to my patients."
              className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed block"
            />
          </div>
        </div>

        {/* 4-Column Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOCTOR_CREDENTIALS.map((cred) => {
            const IconComp = cred.icon;
            return (
              <div
                key={cred.id}
                className={`p-6 rounded-2xl border shadow-sm transition hover:shadow-md ${
                  isDark
                    ? 'bg-[#161F33] border-white/10'
                    : 'bg-[#F9FBFC] border-slate-200/70'
                }`}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white shadow-xs"
                  style={{ backgroundColor: primaryColor }}
                >
                  <IconComp size={22} />
                </div>
                <EditableText
                  id={`doc_cred_title_${cred.id}`}
                  as="h4"
                  defaultText={cred.title}
                  className="text-base font-extrabold mb-3 block"
                  style={{ color: isDark ? '#FFFFFF' : primaryColor }}
                />
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {cred.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: accentTeal }}
                      />
                      <EditableText
                        id={`doc_cred_item_${cred.id}_${idx}`}
                        defaultText={item}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* My Core Values Section */}
        <div
          className={`p-8 md:p-10 rounded-[28px] border ${
            isDark
              ? 'bg-[#141D30] border-white/10'
              : 'bg-gradient-to-br from-[#F2F9F7] via-[#F7FAFC] to-[#EEF4FF] border-slate-200/60'
          }`}
        >
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <EditableText
              id="doc_values_heading"
              as="h3"
              defaultText="My Core Values"
              className="text-2xl md:text-3xl font-extrabold block"
              style={{ color: isDark ? '#FFFFFF' : primaryColor }}
            />
            <EditableText
              id="doc_values_sub"
              as="p"
              defaultText="The principles that guide every patient interaction"
              className="text-xs md:text-sm text-slate-500 dark:text-slate-400 block"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DOCTOR_CORE_VALUES.map((val) => {
              const IconComp = val.icon;
              return (
                <div
                  key={val.id}
                  className={`p-6 rounded-2xl border flex items-start gap-4 ${
                    isDark
                      ? 'bg-[#0F1523]/90 border-white/10'
                      : 'bg-white border-slate-100 shadow-xs'
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: isDark ? 'rgba(72,184,159,0.2)' : '#E6F4F1',
                      color: accentTeal,
                    }}
                  >
                    <IconComp size={18} />
                  </div>
                  <div>
                    <EditableText
                      id={`doc_val_title_${val.id}`}
                      as="h4"
                      defaultText={val.title}
                      className="text-base font-extrabold mb-1.5 block"
                      style={{ color: isDark ? '#FFFFFF' : primaryColor }}
                    />
                    <EditableText
                      id={`doc_val_desc_${val.id}`}
                      as="p"
                      defaultText={val.description}
                      className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed block"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorAboutSection;
