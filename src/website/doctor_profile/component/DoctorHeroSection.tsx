import React from 'react';
import {
  Heart,
  Users,
  Stethoscope,
  Clock,
  Mouse,
  Calendar,
  ArrowRight,
  Award,
  ShieldCheck,
  PhoneCall,
  Star,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import {
  EditableText,
  EditableButton,
  EditableImage,
} from './DoctorCanvaEditorContext';
import { DoctorVariantId } from './DoctorNavbar';

export interface DoctorHeroSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  accentTeal?: string;
  isDark?: boolean;
  onBookAppointment?: () => void;
  onLearnMore?: () => void;
}

export const DOCTOR_HERO_STATS = [
  {
    id: 'patients',
    value: '5000+',
    label: 'Patients Served',
    icon: Users,
  },
  {
    id: 'experience',
    value: '15+',
    label: 'Years Experience',
    icon: Stethoscope,
  },
  {
    id: 'success',
    value: '98%',
    label: 'Success Rate',
    icon: Heart,
  },
  {
    id: 'emergency',
    value: '24/7',
    label: 'Emergency Care',
    icon: Clock,
  },
];

const DEFAULT_HERO_PORTRAIT =
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=85';

export const DoctorHeroSection: React.FC<DoctorHeroSectionProps> = ({
  title = 'Dr. Sarah Mitchell',
  subtitle = 'Compassionate healthcare focused on your wellness. Specializing in internal medicine with a holistic approach to patient care.',
  variant = 'varient_1',
  primaryColor = '#1D2B6B',
  accentTeal = '#48B89F',
  isDark = false,
  onBookAppointment,
  onLearnMore,
}) => {
  /* ========================================================================
   * VARIANT 2: Centered Editorial Showcase + Wide Portrait Frame + Floating Pill Stats
   * ======================================================================== */
  if (variant === 'varient_2') {
    return (
      <section
        className={`py-16 md:py-24 px-6 transition-colors ${
          isDark ? 'bg-[#0D1322] text-white' : 'bg-[#F6FAF9] text-[#1D2B6B]'
        }`}
      >
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest text-white shadow-sm"
            style={{ backgroundColor: accentTeal }}
          >
            <Award size={14} />
            <EditableText
              id="doc_hero_badge_v2"
              defaultText="BOARD CERTIFIED PHYSICIAN"
            />
          </div>

          <EditableText
            id="doc_hero_title_v2"
            as="h1"
            defaultText={title}
            className="text-4xl sm:text-6xl font-black tracking-tight leading-tight block"
            style={{ color: isDark ? '#FFFFFF' : primaryColor }}
          />

          <EditableText
            id="doc_hero_subtitle_v2"
            as="p"
            defaultText={subtitle}
            className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed block"
          />

          <div className="flex flex-wrap items-center justify-center gap-4">
            <EditableButton
              id="doc_hero_btn_book_v2"
              defaultText="Book Appointment"
              defaultLinkUrl="#contact"
              onClickFallback={onBookAppointment}
              iconLeft={<Calendar size={16} />}
              className="px-8 py-4 rounded-full text-sm font-bold text-white shadow-lg hover:opacity-95 transition cursor-pointer inline-flex items-center gap-2"
              style={{ backgroundColor: primaryColor }}
            />
            <EditableButton
              id="doc_hero_btn_learn_v2"
              defaultText="Learn More"
              defaultLinkUrl="#about"
              onClickFallback={onLearnMore}
              iconRight={<ArrowRight size={15} />}
              className="px-8 py-4 rounded-full text-sm font-bold border-2 transition cursor-pointer inline-flex items-center gap-2"
              style={{
                borderColor: isDark ? '#48B89F' : primaryColor,
                color: isDark ? '#FFFFFF' : primaryColor,
              }}
            />
          </div>

          {/* Wide Panoramic Portrait Card + Overlapping Stat Pills */}
          <div className="relative pt-6">
            <div className="rounded-[32px] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 h-[360px] sm:h-[430px] max-w-4xl mx-auto">
              <EditableImage
                id="doc_hero_portrait_img"
                defaultSrc={DEFAULT_HERO_PORTRAIT}
                alt="Dr. Sarah Mitchell"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {DOCTOR_HERO_STATS.map((stat) => {
                const IconComp = stat.icon;
                return (
                  <div
                    key={stat.id}
                    className={`p-4 rounded-2xl border shadow-md flex items-center gap-3.5 text-left ${
                      isDark
                        ? 'bg-[#162035] border-white/10'
                        : 'bg-white border-slate-100'
                    }`}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#E6F4F1', color: accentTeal }}
                    >
                      <IconComp size={20} />
                    </div>
                    <div>
                      <EditableText
                        id={`doc_hero_stat_val_${stat.id}`}
                        as="div"
                        defaultText={stat.value}
                        className="text-xl font-black"
                        style={{ color: isDark ? '#FFFFFF' : primaryColor }}
                      />
                      <EditableText
                        id={`doc_hero_stat_lbl_${stat.id}`}
                        as="div"
                        defaultText={stat.label}
                        className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold"
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
  }

  /* ========================================================================
   * VARIANT 3: Brutalist Architectural Medical Ledger Hero
   * ======================================================================== */
  if (variant === 'varient_3') {
    return (
      <section
        className={`py-16 px-6 border-b-2 border-slate-900 dark:border-white ${
          isDark ? 'bg-[#0F1523] text-white' : 'bg-[#EAF4F1] text-slate-950'
        }`}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 border-2 border-slate-900 dark:border-white bg-white dark:bg-[#141D30] shadow-[8px_8px_0px_#1D2B6B]">
          {/* Left Ledger Content */}
          <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-slate-900 dark:border-white space-y-8">
            <div className="space-y-5">
              <div className="inline-block px-3 py-1 border-2 border-slate-900 dark:border-white bg-[#48B89F] text-white text-xs font-mono font-black uppercase">
                <EditableText
                  id="doc_hero_badge"
                  defaultText="BOARD CERTIFIED PHYSICIAN // INTERNAL MEDICINE"
                />
              </div>

              <EditableText
                id="doc_hero_title"
                as="h1"
                defaultText={title}
                className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none block"
                style={{ color: isDark ? '#FFFFFF' : primaryColor }}
              />

              <EditableText
                id="doc_hero_subtitle"
                as="p"
                defaultText={subtitle}
                className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300 leading-relaxed block"
              />

              <div className="flex flex-wrap gap-4 pt-2">
                <EditableButton
                  id="doc_hero_btn_book"
                  defaultText="BOOK APPOINTMENT →"
                  defaultLinkUrl="#contact"
                  onClickFallback={onBookAppointment}
                  className="px-6 py-3.5 border-2 border-slate-900 dark:border-white text-xs font-black uppercase text-white cursor-pointer inline-flex items-center gap-2"
                  style={{
                    backgroundColor: primaryColor,
                    boxShadow: `4px 4px 0px ${accentTeal}`,
                  }}
                />
                <EditableButton
                  id="doc_hero_btn_learn"
                  defaultText="CLINICAL CREDENTIALS"
                  defaultLinkUrl="#about"
                  onClickFallback={onLearnMore}
                  className="px-6 py-3.5 border-2 border-slate-900 dark:border-white bg-white dark:bg-slate-900 text-xs font-black uppercase cursor-pointer inline-flex items-center gap-2"
                />
              </div>
            </div>

            {/* 4 Divided Brutalist Cells for Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-2 border-slate-900 dark:border-white divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-slate-900 dark:divide-white">
              {DOCTOR_HERO_STATS.map((stat) => (
                <div key={stat.id} className="p-3.5 bg-[#F8FAFC] dark:bg-[#0F1523]">
                  <EditableText
                    id={`doc_hero_stat_val_${stat.id}`}
                    as="div"
                    defaultText={stat.value}
                    className="text-2xl font-black font-mono"
                    style={{ color: accentTeal }}
                  />
                  <EditableText
                    id={`doc_hero_stat_lbl_${stat.id}`}
                    as="div"
                    defaultText={stat.label}
                    className="text-[11px] font-bold uppercase tracking-wider mt-0.5"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Portrait Cell */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#1D2B6B] text-white">
            <div className="h-[380px] lg:h-[420px] border-b-2 border-slate-900 dark:border-white">
              <EditableImage
                id="doc_hero_portrait_img"
                defaultSrc={DEFAULT_HERO_PORTRAIT}
                alt="Dr. Sarah Mitchell"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex items-center gap-3.5 bg-[#48B89F] text-slate-950">
              <Heart size={24} className="flex-shrink-0" />
              <div>
                <EditableText
                  id="doc_hero_floating_title"
                  as="div"
                  defaultText="Patient-Centered Care"
                  className="text-sm font-black uppercase"
                />
                <EditableText
                  id="doc_hero_floating_sub"
                  as="div"
                  defaultText="Personalized treatment plans for every patient"
                  className="text-xs font-semibold"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ========================================================================
   * VARIANT 4: Modern Bento Grid Medical Dashboard Hero
   * ======================================================================== */
  if (variant === 'varient_4') {
    return (
      <section
        className={`py-14 px-6 ${
          isDark ? 'bg-[#0D1322] text-white' : 'bg-[#F2F7F6] text-[#1D2B6B]'
        }`}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Main Headline Bento Tile (7 cols) */}
          <div
            className={`md:col-span-7 p-8 md:p-10 rounded-[28px] border shadow-sm flex flex-col justify-between space-y-6 ${
              isDark
                ? 'bg-[#151F33] border-white/10'
                : 'bg-white border-slate-200/80'
            }`}
          >
            <div className="space-y-4">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white"
                style={{ backgroundColor: accentTeal }}
              >
                <ShieldCheck size={14} />
                <EditableText
                  id="doc_hero_badge"
                  defaultText="BOARD CERTIFIED PHYSICIAN"
                />
              </span>

              <EditableText
                id="doc_hero_title"
                as="h1"
                defaultText={title}
                className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight block"
                style={{ color: isDark ? '#FFFFFF' : primaryColor }}
              />

              <EditableText
                id="doc_hero_subtitle"
                as="p"
                defaultText={subtitle}
                className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed block"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <EditableButton
                id="doc_hero_btn_book"
                defaultText="Book Appointment"
                defaultLinkUrl="#contact"
                onClickFallback={onBookAppointment}
                iconLeft={<Calendar size={15} />}
                className="px-6 py-3.5 rounded-2xl text-xs font-extrabold text-white shadow-md cursor-pointer inline-flex items-center gap-2"
                style={{ backgroundColor: primaryColor }}
              />
              <EditableButton
                id="doc_hero_btn_learn"
                defaultText="Learn More"
                defaultLinkUrl="#about"
                onClickFallback={onLearnMore}
                className="px-6 py-3.5 rounded-2xl text-xs font-extrabold border-2 cursor-pointer inline-flex items-center gap-2"
                style={{
                  borderColor: accentTeal,
                  color: isDark ? '#FFFFFF' : primaryColor,
                }}
              />
            </div>
          </div>

          {/* Portrait Bento Tile (5 cols) */}
          <div className="md:col-span-5 rounded-[28px] overflow-hidden relative min-h-[360px] shadow-md border border-slate-200/80 dark:border-white/10">
            <EditableImage
              id="doc_hero_portrait_img"
              defaultSrc={DEFAULT_HERO_PORTRAIT}
              alt="Dr. Sarah Mitchell"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 dark:bg-[#151F33]/95 backdrop-blur-md shadow-lg flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: accentTeal }}
              >
                <Heart size={18} />
              </div>
              <div>
                <EditableText
                  id="doc_hero_floating_title"
                  as="div"
                  defaultText="Patient-Centered Care"
                  className="text-xs font-extrabold"
                />
                <EditableText
                  id="doc_hero_floating_sub"
                  as="div"
                  defaultText="Personalized treatment plans for every patient"
                  className="text-[11px] text-slate-500 dark:text-slate-300"
                />
              </div>
            </div>
          </div>

          {/* 4 Individual Bento Stat Tiles Across Bottom (3 cols each) */}
          {DOCTOR_HERO_STATS.map((stat, idx) => {
            const IconComp = stat.icon;
            const isHighlighted = idx === 0;
            return (
              <div
                key={stat.id}
                className={`md:col-span-3 p-6 rounded-[24px] border flex items-center justify-between ${
                  isHighlighted
                    ? 'text-white border-transparent shadow-md'
                    : isDark
                    ? 'bg-[#151F33] border-white/10'
                    : 'bg-white border-slate-200/80'
                }`}
                style={
                  isHighlighted
                    ? { backgroundColor: primaryColor }
                    : undefined
                }
              >
                <div>
                  <EditableText
                    id={`doc_hero_stat_val_${stat.id}`}
                    as="div"
                    defaultText={stat.value}
                    className="text-2xl font-black"
                  />
                  <EditableText
                    id={`doc_hero_stat_lbl_${stat.id}`}
                    as="div"
                    defaultText={stat.label}
                    className={`text-xs font-semibold mt-0.5 ${
                      isHighlighted
                        ? 'text-white/80'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  />
                </div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    backgroundColor: isHighlighted
                      ? 'rgba(255,255,255,0.15)'
                      : '#E6F4F1',
                    color: isHighlighted ? '#FFFFFF' : accentTeal,
                  }}
                >
                  <IconComp size={22} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  /* ========================================================================
   * VARIANT 5: Dark Luxury Royal Navy & Mint Executive Cinema Hero
   * ======================================================================== */
  if (variant === 'varient_5') {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-[#0B1120] via-[#152244] to-[#0E3132] text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Portrait in Arch Frame */}
          <div className="lg:col-span-5 order-2 lg:Order-1">
            <div className="rounded-t-[180px] rounded-b-[32px] overflow-hidden border-4 border-[#48B89F]/50 shadow-2xl h-[450px] relative">
              <EditableImage
                id="doc_hero_portrait_img"
                defaultSrc={DEFAULT_HERO_PORTRAIT}
                alt="Dr. Sarah Mitchell"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Executive Copy */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48B89F]/20 border border-[#48B89F]/40 text-[#48B89F] text-xs font-extrabold uppercase tracking-widest">
              <Star size={13} />
              <EditableText
                id="doc_hero_badge"
                defaultText="BOARD CERTIFIED PHYSICIAN"
              />
            </div>

            <EditableText
              id="doc_hero_title"
              as="h1"
              defaultText={title}
              className="text-4xl sm:text-6xl font-black tracking-tight text-white block"
            />

            <EditableText
              id="doc_hero_subtitle"
              as="p"
              defaultText={subtitle}
              className="text-base sm:text-lg text-slate-300 leading-relaxed block"
            />

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <EditableButton
                id="doc_hero_btn_book"
                defaultText="Book Private Consultation"
                defaultLinkUrl="#contact"
                onClickFallback={onBookAppointment}
                iconLeft={<Calendar size={16} />}
                className="px-7 py-4 rounded-2xl text-sm font-extrabold text-slate-950 bg-[#48B89F] shadow-lg hover:opacity-95 transition cursor-pointer inline-flex items-center gap-2"
              />
              <EditableButton
                id="doc_hero_btn_learn"
                defaultText="Explore Services"
                defaultLinkUrl="#services"
                onClickFallback={onLearnMore}
                className="px-7 py-4 rounded-2xl text-sm font-extrabold border border-white/25 text-white hover:bg-white/10 transition cursor-pointer inline-flex items-center gap-2"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15">
              {DOCTOR_HERO_STATS.map((stat) => (
                <div
                  key={stat.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <EditableText
                    id={`doc_hero_stat_val_${stat.id}`}
                    as="div"
                    defaultText={stat.value}
                    className="text-2xl font-black text-[#48B89F]"
                  />
                  <EditableText
                    id={`doc_hero_stat_lbl_${stat.id}`}
                    as="div"
                    defaultText={stat.label}
                    className="text-xs text-slate-300 mt-1"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ========================================================================
   * VARIANT 6: Split Appointment Quick-Card Hero + Doctor Profile Card
   * ======================================================================== */
  if (variant === 'varient_6') {
    return (
      <section
        className={`py-16 px-6 ${
          isDark
            ? 'bg-[#0F1523] text-white'
            : 'bg-gradient-to-r from-[#EEF5FF] to-[#E6F4F1] text-[#1D2B6B]'
        }`}
      >
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Doctor Profile Card with Photo + Bio */}
            <div
              className={`lg:col-span-7 p-8 rounded-[28px] border shadow-lg flex flex-col sm:flex-row gap-7 items-center ${
                isDark
                  ? 'bg-[#162035] border-white/10'
                  : 'bg-white border-slate-200/70'
              }`}
            >
              <div className="w-44 h-56 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                <EditableImage
                  id="doc_hero_portrait_img"
                  defaultSrc={DEFAULT_HERO_PORTRAIT}
                  alt="Dr. Sarah Mitchell"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <span
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white"
                  style={{ backgroundColor: accentTeal }}
                >
                  <EditableText
                    id="doc_hero_badge"
                    defaultText="BOARD CERTIFIED PHYSICIAN"
                  />
                </span>
                <EditableText
                  id="doc_hero_title"
                  as="h1"
                  defaultText={title}
                  className="text-3xl font-black tracking-tight block"
                />
                <EditableText
                  id="doc_hero_subtitle"
                  as="p"
                  defaultText={subtitle}
                  className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed block"
                />
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <EditableButton
                    id="doc_hero_btn_book"
                    defaultText="Book Appointment"
                    defaultLinkUrl="#contact"
                    onClickFallback={onBookAppointment}
                    className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-sm cursor-pointer inline-flex items-center gap-1.5"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <EditableButton
                    id="doc_hero_btn_learn"
                    defaultText="Learn More"
                    defaultLinkUrl="#about"
                    onClickFallback={onLearnMore}
                    className="px-5 py-2.5 rounded-xl text-xs font-extrabold border cursor-pointer inline-flex items-center gap-1.5"
                  />
                </div>
              </div>
            </div>

            {/* Right Instant Clinic Highlights Card */}
            <div
              className="lg:col-span-5 p-8 rounded-[28px] text-white shadow-lg flex flex-col justify-between space-y-6"
              style={{
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentTeal} 100%)`,
              }}
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white/80">
                  <Heart size={15} />
                  <EditableText
                    id="doc_hero_floating_title"
                    defaultText="Patient-Centered Care"
                  />
                </div>
                <EditableText
                  id="doc_hero_floating_sub"
                  as="h3"
                  defaultText="Personalized treatment plans for every patient"
                  className="text-2xl font-extrabold leading-snug block"
                />
              </div>

              <div className="space-y-2.5 text-xs text-white/90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} />
                  <span>Same-Day Acute &amp; Preventive Appointments</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} />
                  <span>123 Medical Plaza, Suite 400 · San Francisco</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall size={15} />
                  <span>24/7 Direct Line: (555) 123-4567</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/20">
                {DOCTOR_HERO_STATS.map((stat) => (
                  <div key={stat.id}>
                    <EditableText
                      id={`doc_hero_stat_val_${stat.id}`}
                      as="div"
                      defaultText={stat.value}
                      className="text-xl font-black"
                    />
                    <EditableText
                      id={`doc_hero_stat_lbl_${stat.id}`}
                      as="div"
                      defaultText={stat.label}
                      className="text-[11px] text-white/80"
                    />
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
   * VARIANT 1 (Default Dribbble Video Layout): Split Left Info + Stats & Right Portrait
   * ======================================================================== */
  return (
    <section
      className={`relative overflow-hidden transition-colors ${
        isDark
          ? 'bg-gradient-to-br from-[#0F1523] via-[#132038] to-[#0E292A] text-white'
          : 'bg-gradient-to-br from-[#EEF5FF] via-[#F7FBFA] to-[#E6F6F2] text-[#1D2B6B]'
      }`}
    >
      {/* Subtle Ambient Blurred Glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#48B89F]/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-[#1D2B6B]/10 blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 pt-14 pb-16 md:pt-20 md:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-white shadow-xs"
              style={{ backgroundColor: accentTeal }}
            >
              <EditableText
                id="doc_hero_badge"
                defaultText="BOARD CERTIFIED PHYSICIAN"
              />
            </div>

            <EditableText
              id="doc_hero_title"
              as="h1"
              defaultText={title}
              className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.12] block"
              style={{ color: isDark ? '#FFFFFF' : primaryColor }}
            />

            <EditableText
              id="doc_hero_subtitle"
              as="p"
              defaultText={subtitle}
              className={`text-base sm:text-lg leading-relaxed max-w-xl block ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            />

            {/* CTA Buttons (Editable Label + Link URL) */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <EditableButton
                id="doc_hero_btn_book"
                defaultText="Book Appointment"
                defaultLinkUrl="#contact"
                onClickFallback={onBookAppointment}
                iconLeft={<Calendar size={16} />}
                className="px-7 py-3.5 rounded-2xl text-sm font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition inline-flex items-center gap-2 cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              />

              <EditableButton
                id="doc_hero_btn_learn"
                defaultText="Learn More"
                defaultLinkUrl="#about"
                onClickFallback={onLearnMore}
                iconRight={<ArrowRight size={15} />}
                className="px-7 py-3.5 rounded-2xl text-sm font-bold border-2 bg-white/70 dark:bg-white/5 hover:bg-white transition inline-flex items-center gap-2 cursor-pointer"
                style={{
                  borderColor: isDark ? '#48B89F' : primaryColor,
                  color: isDark ? '#FFFFFF' : primaryColor,
                }}
              />
            </div>

            {/* 4-Column Stats Bar from Dribbble Video */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80 dark:border-white/10">
              {DOCTOR_HERO_STATS.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div key={stat.id} className="flex flex-col items-start gap-2">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center"
                      style={{
                        backgroundColor: isDark
                          ? 'rgba(72, 184, 159, 0.18)'
                          : '#DDF3EE',
                        color: accentTeal,
                      }}
                    >
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <EditableText
                        id={`doc_hero_stat_val_${stat.id}`}
                        as="div"
                        defaultText={stat.value}
                        className="text-2xl font-extrabold tracking-tight"
                        style={{ color: isDark ? '#FFFFFF' : primaryColor }}
                      />
                      <EditableText
                        id={`doc_hero_stat_lbl_${stat.id}`}
                        as="div"
                        defaultText={stat.label}
                        className="text-xs font-medium text-slate-500 dark:text-slate-400"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Editable Doctor Portrait + Floating "Patient-Centered Care" Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 aspect-[4/4.6] bg-slate-100">
              <EditableImage
                id="doc_hero_portrait_img"
                defaultSrc={DEFAULT_HERO_PORTRAIT}
                alt="Dr. Sarah Mitchell - Board Certified Internal Medicine Physician"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Floating Overlapping Card (Bottom-Left) */}
            <div
              className={`mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:-left-6 sm:right-6 p-4 sm:p-5 rounded-2xl shadow-xl border flex items-center gap-4 ${
                isDark
                  ? 'bg-[#172035]/95 border-white/10 text-white'
                  : 'bg-white/95 border-slate-100 text-[#1D2B6B]'
              } backdrop-blur-md z-10`}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: accentTeal, color: '#FFFFFF' }}
              >
                <Heart size={22} />
              </div>
              <div>
                <EditableText
                  id="doc_hero_floating_title"
                  as="h3"
                  defaultText="Patient-Centered Care"
                  className="text-sm font-extrabold"
                />
                <EditableText
                  id="doc_hero_floating_sub"
                  as="p"
                  defaultText="Personalized treatment plans for every patient"
                  className="text-xs text-slate-500 dark:text-slate-300 mt-0.5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator Mouse Icon at Bottom Center */}
        <div className="mt-12 flex justify-center">
          <div className="w-7 h-11 rounded-full border-2 border-[#48B89F]/60 flex items-start justify-center p-1.5">
            <Mouse size={14} className="text-[#48B89F] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorHeroSection;
