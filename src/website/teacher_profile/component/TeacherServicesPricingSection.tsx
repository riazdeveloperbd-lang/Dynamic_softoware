import React, { useState } from 'react';
import { Check, Calendar, ArrowRight, Calculator } from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface TeacherServicesPricingSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
  onSelectPlan?: (planName: string) => void;
}

export const TeacherServicesPricingSection: React.FC<
  TeacherServicesPricingSectionProps
> = ({
  title = 'Services & Transparent Tuition Rates',
  subtitle = 'Flexible 1-on-1 tutoring, small-group problem-solving labs, and comprehensive monthly mentorship packages. Every plan begins with a complimentary 30-minute diagnostic session.',
  variant = 'varient_1',
  primaryColor = '#2563EB',
  isDark = false,
  onSelectPlan,
}) => {
  const [billingCycle, setBillingCycle] = useState<'session' | 'monthly'>('monthly');
  const [academicTrack, setAcademicTrack] = useState<'ap_ib' | 'university'>('ap_ib');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan_1on1');

  const pricingPlans = [
    {
      id: 'plan_group',
      index: '01.',
      name: 'Small-Group Problem Lab',
      kicker: 'Collaborative Cohort (Max 4 Students)',
      sessionPrice: academicTrack === 'ap_ib' ? 45 : 55,
      monthlyPrice: academicTrack === 'ap_ib' ? 160 : 195,
      unitLabel: billingCycle === 'monthly' ? '/ month (4× 75-min labs)' : '/ 75-min live session',
      description:
        'Structured weekly problem-solving seminars where peers tackle past AP Calculus BC, IB Physics HL, and AIME proof sets together on the shared 3D whiteboard.',
      features: [
        '4 live 75-minute interactive lightboard seminars per month',
        'Curated weekly LaTeX problem sets with step-by-step solutions',
        'Full 4K recorded session replays archived in your student portal',
        'Peer discussion board with 24-hour instructor feedback',
      ],
      featured: false,
      ctaLabel: 'Reserve Cohort Seat',
    },
    {
      id: 'plan_1on1',
      index: '02.',
      name: '1-on-1 Bespoke Tutoring',
      kicker: 'Most Popular · Personalized Curriculum',
      sessionPrice: academicTrack === 'ap_ib' ? 85 : 105,
      monthlyPrice: academicTrack === 'ap_ib' ? 295 : 365,
      unitLabel: billingCycle === 'monthly' ? '/ month (4× 60-min sessions)' : '/ 60-min 1-on-1 session',
      description:
        'Individualized instruction tailored to your exact syllabus, pacing, and upcoming exam calendar. Ideal for mastering AP/IB exams or university calculus.',
      features: [
        '4 private 60-minute 1-on-1 3D Lightboard sessions per month',
        'Custom diagnostic gap analysis & weekly homework grading',
        'Direct WhatsApp / email question support between lessons',
        'Annotated PDF board notes + HD video replay after every class',
        'Monthly written progress report for parents or advisors',
      ],
      featured: true,
      ctaLabel: 'Book Free Trial for 1-on-1',
    },
    {
      id: 'plan_olympiad',
      index: '03.',
      name: 'Intensive Exam & Olympiad Package',
      kicker: 'Accelerated 2× Weekly Mentorship',
      sessionPrice: academicTrack === 'ap_ib' ? 155 : 185,
      monthlyPrice: academicTrack === 'ap_ib' ? 540 : 640,
      unitLabel: billingCycle === 'monthly' ? '/ month (8× 60-min sessions)' : '/ 2-session weekly bundle',
      description:
        'Comprehensive mentorship for students targeting a 5 on AP Calculus/Physics, a 7 in IB HL, or qualification for AIME, USAMO, and F=ma Physics Olympiads.',
      features: [
        '8 private 60-minute 1-on-1 sessions per month (twice weekly)',
        'Full-length timed mock exams with rubric-level score breakdown',
        'Custom interactive 3D GeoGebra & Python physics simulations',
        'Priority evening & weekend scheduling with flexible rescheduling',
        'University STEM recommendation letter & research portfolio guidance',
      ],
      featured: false,
      ctaLabel: 'Start Intensive Mentorship',
    },
  ];

  const handleChoosePlan = (planId: string, planName: string) => {
    setSelectedPlanId(planId);
    if (onSelectPlan) onSelectPlan(planName);
    if (typeof document !== 'undefined') {
      const target = document.querySelector('#teacher-booking');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section
      id="teacher-pricing"
      className={`py-20 px-6 border-t transition-colors ${
        isDark
          ? 'bg-[#0B0F19] border-white/10 text-slate-100'
          : 'bg-[#F8FAFC] border-slate-200/80 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header + Interactive Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span style={{ color: primaryColor }} className="font-semibold">
                Services &amp; Pricing
              </span>
              <span aria-hidden="true">·</span>
              <span>No Long-Term Contracts</span>
              <span aria-hidden="true">·</span>
              <span>Free 30-Min Trial Included</span>
            </div>

            <h2
              className="text-2xl sm:text-4xl font-semibold tracking-tight"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                textWrap: 'balance',
              }}
            >
              <EditableText id="teacher_pricing_heading" defaultText={title} />
            </h2>

            <EditableText
              id="teacher_pricing_sub"
              as="p"
              defaultText={subtitle}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed block"
            />
          </div>

          {/* Interactive Track & Billing Switchers */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Academic Track Toggle */}
            <div
              className={`inline-flex items-center gap-1 p-1.5 rounded-xl border ${
                isDark
                  ? 'bg-[#131B2E] border-white/10'
                  : 'bg-white border-slate-200/90'
              }`}
            >
              <button
                type="button"
                onClick={() => setAcademicTrack('ap_ib')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition cursor-pointer ${
                  academicTrack === 'ap_ib'
                    ? 'text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                style={
                  academicTrack === 'ap_ib'
                    ? { backgroundColor: primaryColor }
                    : undefined
                }
              >
                High School · AP &amp; IB
              </button>
              <button
                type="button"
                onClick={() => setAcademicTrack('university')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition cursor-pointer ${
                  academicTrack === 'university'
                    ? 'text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                style={
                  academicTrack === 'university'
                    ? { backgroundColor: primaryColor }
                    : undefined
                }
              >
                University &amp; Olympiad
              </button>
            </div>

            {/* Billing Cycle Toggle */}
            <div
              className={`inline-flex items-center gap-1 p-1.5 rounded-xl border ${
                isDark
                  ? 'bg-[#131B2E] border-white/10'
                  : 'bg-white border-slate-200/90'
              }`}
            >
              <button
                type="button"
                onClick={() => setBillingCycle('session')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition cursor-pointer ${
                  billingCycle === 'session'
                    ? 'text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                style={
                  billingCycle === 'session'
                    ? { backgroundColor: primaryColor }
                    : undefined
                }
              >
                Pay Per Session
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                style={
                  billingCycle === 'monthly'
                    ? { backgroundColor: primaryColor }
                    : undefined
                }
              >
                Monthly Package (Save 15%)
              </button>
            </div>
          </div>
        </div>

        {/* 3D Tactile Pricing Cards Grid */}
        <div
          className={`grid grid-cols-1 ${
            variant === 'varient_2' ? 'lg:grid-cols-3 gap-8' : 'lg:grid-cols-3 gap-7'
          } items-stretch`}
        >
          {pricingPlans.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            const activePrice =
              billingCycle === 'monthly' ? plan.monthlyPrice : plan.sessionPrice;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`rounded-3xl p-7 sm:p-8 border flex flex-col justify-between space-y-6 transition-all duration-200 cursor-pointer ${
                  plan.featured
                    ? isDark
                      ? 'bg-[#16213A] border-blue-500 shadow-[0_14px_0_0_#1E3A8A] lg:-translate-y-2'
                      : 'bg-white border-blue-600 shadow-[0_14px_0_0_#2563EB] lg:-translate-y-2'
                    : isDark
                    ? 'bg-[#131B2E] border-white/10 shadow-[0_10px_0_0_#1E293B] hover:-translate-y-1'
                    : 'bg-white border-slate-200/90 shadow-[0_10px_0_0_#E2E8F0] hover:-translate-y-1'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Editorial Number & Kicker */}
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className="font-mono font-semibold tabular-nums"
                      style={{ color: primaryColor }}
                    >
                      {plan.index} {plan.kicker}
                    </span>
                    {isSelected && (
                      <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        ● Selected
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                    {plan.name}
                  </h3>

                  {/* Price Numeral with Tabular Discipline */}
                  <div className="pt-1 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-semibold font-mono tabular-nums tracking-tight">
                      ${activePrice}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {plan.unitLabel}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 space-y-3">
                    <div className="text-xs font-semibold text-slate-400">
                      Included in every enrollment:
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check
                            size={16}
                            className="shrink-0 mt-0.5"
                            style={{ color: primaryColor }}
                          />
                          <span className="text-slate-700 dark:text-slate-200">
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChoosePlan(plan.id, plan.name);
                    }}
                    className={`w-full py-3.5 px-5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap inline-flex items-center justify-center gap-2 transition-transform active:translate-y-0.5 cursor-pointer ${
                      plan.featured
                        ? 'text-white'
                        : isDark
                        ? 'bg-[#0B0F19] text-white border border-white/15 hover:bg-white/10'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                    style={
                      plan.featured
                        ? {
                            backgroundColor: primaryColor,
                            boxShadow: '0 5px 0 0 #1E3A8A',
                          }
                        : undefined
                    }
                  >
                    <Calendar size={15} />
                    <span>{plan.ctaLabel}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Course Subjects Directory Strip */}
        <div
          className={`p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs sm:text-sm ${
            isDark
              ? 'bg-[#131B2E] border-white/10 text-slate-300'
              : 'bg-white border-slate-200/80 text-slate-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <Calculator size={18} style={{ color: primaryColor }} className="shrink-0" />
            <div>
              <span className="font-semibold text-slate-900 dark:text-white mr-2">
                Core Subjects Taught:
              </span>
              <span>
                AP Calculus AB &amp; BC · IB Mathematics AA HL · AP Physics C (Mechanics &amp; E&amp;M) · Multivariable Calculus · Linear Algebra · Differential Equations · SAT / ACT Math · AIME &amp; F=ma Olympiad
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
