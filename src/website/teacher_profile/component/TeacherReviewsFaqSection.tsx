import React, { useState } from 'react';
import { ChevronDown, Star, CheckCircle2, HelpCircle } from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface TeacherReviewsFaqSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

const STUDENT_REVIEWS = [
  {
    id: 'rev_1',
    category: 'ap_ib' as const,
    outcomeMetric: 'AP Calculus BC: 2 → 5 (10 Weeks)',
    quote:
      '“Before working with Prof. Vance, Taylor series and parametric curves felt like a foreign language. Watching him sketch 3D surfaces live on the glass lightboard made everything click. I went from a 2 on my February mock exam to a 5 in May.”',
    author: 'Maya Lin',
    role: '12th Grade Student · Phillips Academy Andover (Now at Caltech)',
    date: 'June 2026',
  },
  {
    id: 'rev_2',
    category: 'parents' as const,
    outcomeMetric: 'AP Physics C Mechanics & E&M: Double 5s',
    quote:
      '“As a parent, what impressed me most was Julian’s structure. After every Tuesday session, we received the recorded video link, clean PDF lightboard notes, and a 3-sentence summary of what Ethan mastered and what was assigned for Friday.”',
    author: 'Dr. Rebecca Sterling',
    role: 'Parent of 11th Grader · Boston, MA',
    date: 'May 2026',
  },
  {
    id: 'rev_3',
    category: 'olympiad' as const,
    outcomeMetric: 'AMC 12: 96 → 124.5 · AIME Qualifier',
    quote:
      '“Prof. Vance doesn’t just hand you a solution—he teaches you how to construct geometric invariants from scratch. In one semester of the Intensive Olympiad package, I raised my AMC 12 score by 28.5 points and qualified for AIME.”',
    author: 'Aarav Patel',
    role: '10th Grade Math Circle Competitor · Palo Alto, CA',
    date: 'April 2026',
  },
  {
    id: 'rev_4',
    category: 'ap_ib' as const,
    outcomeMetric: 'IB Physics HL: Predicted 5 → Final 7',
    quote:
      '“Electromagnetic induction and simple harmonic motion used to terrify me. The interactive 3D wave simulations we used during lessons helped me earn a 23/24 on my Physics IA and a 7 overall on my final IB diploma exams.”',
    author: 'Lucas Meyer',
    role: 'IB Diploma Graduate · Zurich International School',
    date: 'July 2026',
  },
  {
    id: 'rev_5',
    category: 'parents' as const,
    outcomeMetric: 'SAT Math Section: 640 → 790 in 6 Weeks',
    quote:
      '“My daughter used to run out of time on the hardest module-2 geometry questions. Prof. Vance diagnosed her pacing bottleneck in the very first 30-minute free trial and gave her visual shortcuts that lifted her SAT Math score by 150 points.”',
    author: 'Jonathan & Claire Brooks',
    role: 'Parents of High School Junior · Greenwich, CT',
    date: 'March 2026',
  },
  {
    id: 'rev_6',
    category: 'olympiad' as const,
    outcomeMetric: 'University Multivariable Calculus: B- → A+',
    quote:
      '“Stokes’ Theorem and Divergence Theorem finally made physical sense after two sessions on the 3D lightboard. I finished first in my 180-person engineering vector calculus lecture.”',
    author: 'Sofia Morales',
    role: 'Sophomore Mechanical Engineering Major · Columbia University',
    date: 'May 2026',
  },
];

const FAQ_ITEMS = [
  {
    q: 'How does the complimentary 30-minute Free Trial session work?',
    a: 'During our 30-minute live lightboard meeting, we spend 10 minutes reviewing your current coursework or target exam, 15 minutes working through 2 diagnostic problems together on the interactive 3D board, and 5 minutes mapping out a week-by-week study schedule.',
  },
  {
    q: 'What is your cancellation and rescheduling policy?',
    a: 'Life and school schedules get busy. Any session can be rescheduled or canceled free of charge with at least 24 hours’ notice via your calendar link or WhatsApp. Each monthly package also includes one emergency same-day reschedule pass per semester.',
  },
  {
    q: 'What materials, hardware, or software do students need for online lessons?',
    a: 'You only need a laptop or tablet with a stable internet connection and Zoom. Because we use a shared cloud whiteboard alongside my 4K studio lightboard, an iPad/stylus or drawing tablet is helpful for writing equations together, though not mandatory.',
  },
  {
    q: 'Do students receive recordings and notes after every tutoring session?',
    a: 'Yes. Within 15 minutes of finishing class, you automatically receive a private link to the 1080p chapter-indexed video recording, high-contrast PDF exports of every lightboard derivation, and a targeted practice set with full worked solutions.',
  },
  {
    q: 'Can we switch between 1-on-1 Tutoring and Small-Group Problem Labs?',
    a: 'Absolutely. Many students begin with 1-on-1 sessions to build foundational confidence and add the weekly Small-Group Problem Lab in the 6 weeks leading up to May AP/IB exams or November AMC competitions.',
  },
];

export const TeacherReviewsFaqSection: React.FC<TeacherReviewsFaqSectionProps> = ({
  title = 'Verified Student & Parent Outcomes',
  subtitle = 'Concrete score improvements across AP Calculus, IB Physics HL, SAT Math, and university engineering coursework.',
  variant = 'varient_1',
  primaryColor = '#2563EB',
  isDark = false,
}) => {
  const [reviewFilter, setReviewFilter] = useState<
    'all' | 'ap_ib' | 'parents' | 'olympiad'
  >('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  const visibleReviews =
    reviewFilter === 'all'
      ? STUDENT_REVIEWS
      : STUDENT_REVIEWS.filter((r) => r.category === reviewFilter);

  return (
    <section
      id="teacher-reviews"
      className={`py-20 px-6 border-t transition-colors ${
        isDark
          ? 'bg-[#0E1422] border-white/10 text-slate-100'
          : 'bg-white border-slate-200/80 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-24">
        {/* =============================================================== */}
        {/* PART 1: TESTIMONIALS / REVIEWS                                  */}
        {/* =============================================================== */}
        <div className="space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span style={{ color: primaryColor }} className="font-semibold">
                  Testimonials &amp; Score Outcomes
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">4.98 / 5.0 Average Rating</span>
                <span aria-hidden="true">·</span>
                <span>240+ Verified Families</span>
              </div>

              <h2
                className="text-2xl sm:text-4xl font-semibold tracking-tight"
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  textWrap: 'balance',
                }}
              >
                <EditableText id="teacher_reviews_heading" defaultText={title} />
              </h2>

              <EditableText
                id="teacher_reviews_sub"
                as="p"
                defaultText={subtitle}
                className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed block"
              />
            </div>

            {/* Interactive Review Category Filter */}
            <div
              className={`inline-flex items-center gap-1 p-1.5 rounded-xl border self-start ${
                isDark
                  ? 'bg-[#0B0F19] border-white/10'
                  : 'bg-slate-100 border-slate-200/80'
              }`}
            >
              {(
                [
                  { id: 'all', label: 'All Reviews (6)' },
                  { id: 'ap_ib', label: 'AP & IB Exams' },
                  { id: 'parents', label: 'Parent Feedback' },
                  { id: 'olympiad', label: 'Olympiad & College' },
                ] as const
              ).map((tab) => {
                const active = reviewFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setReviewFilter(tab.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition cursor-pointer ${
                      active
                        ? 'text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    style={active ? { backgroundColor: primaryColor } : undefined}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${
              variant === 'varient_2' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
            } gap-6`}
          >
            {visibleReviews.map((rev) => (
              <div
                key={rev.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 transition-transform hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#131B2E] border-white/10 shadow-[0_8px_0_0_#1E293B]'
                    : 'bg-[#F8FAFC] border-slate-200/90 shadow-[0_8px_0_0_#E2E8F0]'
                }`}
              >
                <div className="space-y-3">
                  {/* Unboxed Quantified Outcome Header */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span
                      className="font-mono font-semibold tabular-nums"
                      style={{ color: primaryColor }}
                    >
                      {rev.outcomeMetric}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-amber-500">
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {rev.quote}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs sm:text-sm font-semibold">
                      {rev.author}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {rev.role}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 shrink-0 flex items-center gap-1">
                    <CheckCircle2 size={13} style={{ color: primaryColor }} />
                    <span>{rev.date}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =============================================================== */}
        {/* PART 2: FAQ SECTION                                             */}
        {/* =============================================================== */}
        <div id="teacher-faq" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <HelpCircle size={14} style={{ color: primaryColor }} />
              <span style={{ color: primaryColor }} className="font-semibold">
                Frequently Asked Questions
              </span>
              <span aria-hidden="true">·</span>
              <span>Scheduling &amp; Policies</span>
            </div>

            <h3
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                textWrap: 'balance',
              }}
            >
              <EditableText
                id="teacher_faq_heading"
                defaultText="Answers on Scheduling, Cancellations & Required Materials"
              />
            </h3>

            <EditableText
              id="teacher_faq_sub"
              as="p"
              defaultText="Everything students and parents need to know before locking in a complimentary 30-minute diagnostic session."
              className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed block"
            />
          </div>

          <div className="lg:col-span-7 space-y-3.5">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={item.q}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? isDark
                        ? 'bg-[#131B2E] border-blue-500/60 shadow-[0_6px_0_0_#1E3A8A]'
                        : 'bg-white border-blue-600/60 shadow-[0_6px_0_0_#DBEAFE]'
                      : isDark
                      ? 'bg-[#131B2E]/60 border-white/10'
                      : 'bg-[#F8FAFC] border-slate-200/80'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      style={{ color: primaryColor }}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-white/10">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
