import React, { useState } from 'react';
import {
  Award,
  PlayCircle,
  CheckCircle2,
  Sparkles,
  Flame,
  Star,
  Users,
  Trophy,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Eye,
  X,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface EduTectHeroCredentialsSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

type ExamTrackKey = 'ielts' | 'bcs' | 'tech';

interface TrackProfile {
  id: ExamTrackKey;
  tabLabel: string;
  examTitle: string;
  banglaTagline: string;
  mentorName: string;
  mentorBanglaName: string;
  credentialsBadge: string;
  mentorRole: string;
  mentorAvatar: string;
  upcomingBatchDate: string;
  seatsRemaining: number;
  highlightMetrics: {
    studentsTaught: string;
    batchCount: string;
    successRate: string;
    topScorersLabel: string;
  };
  mentorBioBullets: string[];
  officialCertifications: string[];
}

const EXAM_TRACK_PROFILES: Record<ExamTrackKey, TrackProfile> = {
  ielts: {
    id: 'ielts',
    tabLabel: 'IELTS Band 8.0+ Masterclass',
    examTitle: 'IELTS Academic & GT (Band 8.0+ Blueprint)',
    banglaTagline: 'আইইএলটিএস রিডিং, রাইটিং ও স্পিকিংয়ে কাঙ্ক্ষিত ব্যান্ড স্কোর অর্জনের পূর্ণাঙ্গ গাইডলাইন',
    mentorName: 'Sadman Sakib Chowdhury',
    mentorBanglaName: 'সাদমান সাকিব চৌধুরী',
    credentialsBadge: 'IELTS 8.5 Scorer | Ex-Cadet | 10+ Years Experience',
    mentorRole: 'IBA (DU) MBA • British Council Certified Trainer • Ex-10 Minute School Lead Educator',
    mentorAvatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
    upcomingBatchDate: 'Friday, 18 Oct (8:00 PM Live)',
    seatsRemaining: 12,
    highlightMetrics: {
      studentsTaught: '25,000+',
      batchCount: '45+ Batches',
      successRate: '92% Target Score Achieved',
      topScorersLabel: '3,800+ Band 7.5–8.5 Scorers',
    },
    mentorBioBullets: [
      'Scored Overall Band 8.5 (Listening 9.0, Reading 9.0, Speaking 8.5, Writing 8.0) in IDP Academic IELTS',
      'Former Mirzapur Cadet College Adjutant & IBA (University of Dhaka) Gold Medalist',
      'Personally evaluates every student’s Writing Task 2 essay and conducts 1-on-1 Speaking Mock Tests',
      'Creator of the "Cambridge Keyword Mapping" Reading technique used by 25,000+ Bangladeshi test-takers',
    ],
    officialCertifications: [
      'British Council Certified IELTS Assessment Specialist (UK)',
      'IBA, University of Dhaka (MBA — Finance & Strategy)',
      'Featured National EdTech Speaker — Youth Carnival & Daily Star Education',
    ],
  },
  bcs: {
    id: 'bcs',
    tabLabel: '47th BCS Cadre Intensive',
    examTitle: '47th BCS Preliminary & Written Mastery',
    banglaTagline: 'বিসিএস প্রিলিমিনারি ও লিখিত পরীক্ষার ২০০ নম্বরের কৌশলগত প্রস্তুতি ও ক্যাডার মেন্টরশিপ',
    mentorName: 'Dr. Farhan Tanvir (Admin Cadre 1st)',
    mentorBanglaName: 'ডাঃ ফারহান তানভীর (বিসিএস প্রশাসন)',
    credentialsBadge: '38th BCS Admin Cadre (Merit 4th) | Ex-DMC | 9+ Years Experience',
    mentorRole: 'BCS Preliminary & Written Strategy Mentor • Author of "Cadre Digest BD"',
    mentorAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85',
    upcomingBatchDate: 'Saturday, 19 Oct (8:30 PM Live)',
    seatsRemaining: 9,
    highlightMetrics: {
      studentsTaught: '31,400+',
      batchCount: '52+ Batches',
      successRate: '94% Prelim Qualification Rate',
      topScorersLabel: '410+ Recommended BCS Cadres',
    },
    mentorBioBullets: [
      'Ranked 4th nationally in 38th BCS Administration Cadre with highest written marks in International Affairs & Math',
      'Pioneered the 90-Day High-Yield Topic Exclusion Method for 200-mark BPSC Preliminary exams',
      'Includes 25 OMR-standard live model tests with negative-marking analytics',
    ],
    officialCertifications: [
      'MBBS — Dhaka Medical College (DMC)',
      '38th BCS Administration Cadre Merit Scholar',
      'Guest Faculty — DU Career Club & BUET Civil Service Forum',
    ],
  },
  tech: {
    id: 'tech',
    tabLabel: 'Full-Stack & Remote Job Bootcamp',
    examTitle: 'Full-Stack Software Engineering & Global Remote Jobs',
    banglaTagline: 'বুয়েট ও সিলিকন ভ্যালির সিনিয়র ইঞ্জিনিয়ারদের সাথে প্রজেক্ট-ভিত্তিক ফুল-স্ট্যাক ডেভেলপমেন্ট',
    mentorName: 'Engr. Nafisul Islam',
    mentorBanglaName: 'ইঞ্জিঃ নাফিসুল ইসলাম',
    credentialsBadge: 'BUET CSE | Ex-Singapore Tech Lead | 10+ Years Experience',
    mentorRole: 'Principal Software Architect • Mentored 1,200+ Remote Developers in BD',
    mentorAvatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85',
    upcomingBatchDate: 'Friday, 18 Oct (9:00 PM Live)',
    seatsRemaining: 12,
    highlightMetrics: {
      studentsTaught: '18,500+',
      batchCount: '36+ Batches',
      successRate: '89% Job & Freelance Placement',
      topScorersLabel: '650+ Global Remote Placements',
    },
    mentorBioBullets: [
      'B.Sc. in Computer Science & Engineering from BUET; 8 years leading distributed engineering teams in Singapore & US',
      'Live code reviews, system design mock interviews, and Toptal/LinkedIn profile optimization',
      'Real production SaaS capstone projects deployed on AWS & Vercel',
    ],
    officialCertifications: [
      'B.Sc. Engineering (CSE) — BUET',
      'AWS Certified Solutions Architect — Professional',
      'Mentor — BASIS National ICT Awards & NASA Space Apps BD',
    ],
  },
};

const INSTITUTION_BADGES = [
  {
    code: 'BUET',
    name: 'BUET Alumni Mentor Network',
    sub: 'Engineering & Analytical Excellence',
    detail:
      'Our quantitative reasoning, analytical writing, and tech modules are architected by top graduates from Bangladesh University of Engineering and Technology (BUET).',
  },
  {
    code: 'DU • IBA',
    name: 'IBA, University of Dhaka',
    sub: 'Verbal, GMAT & IELTS Strategy',
    detail:
      'Reading comprehension, critical reasoning, and high-scoring essay structures directly adapted from IBA (DU) merit-scholar frameworks.',
  },
  {
    code: '10MS',
    name: '10 Minute School Contributor',
    sub: '2.5M+ Video Views Across BD',
    detail:
      'Lead instructors have authored viral national masterclasses and crash courses trusted by millions of HSC, University, and Job aspirants.',
  },
  {
    code: 'BRITISH COUNCIL',
    name: 'British Council & IDP Certified',
    sub: 'Official Band Descriptor Rubrics',
    detail:
      'Speaking and Writing mock evaluations follow the exact 4-criterion public and examiner marking rubrics used by British Council and IDP.',
  },
  {
    code: 'EX-CADET',
    name: 'Cadet College Discipline',
    sub: 'Structured Daily Routine & Accountability',
    detail:
      'Weekly progress tracking, mandatory mock tests, and mentor accountability calls inspired by Cadet College academic rigor.',
  },
];

export const EduTectHeroCredentialsSection: React.FC<
  EduTectHeroCredentialsSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [selectedTrack, setSelectedTrack] = useState<ExamTrackKey>('ielts');
  const [mentorModalOpen, setMentorModalOpen] = useState<boolean>(false);
  const [selectedInstitutionModal, setSelectedInstitutionModal] = useState<
    (typeof INSTITUTION_BADGES)[0] | null
  >(null);

  const royalIndigo = '#1E1B4B';
  const electricBlue = primaryColor || '#2563EB';
  const warmAmber = '#D97706';
  const isBrutalist = variant === 'varient_3';

  const activeProfile = EXAM_TRACK_PROFILES[selectedTrack];

  const handleEnrollScroll = () => {
    const el = document.getElementById('edutect-enrollment');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWatchDemo = () => {
    window.dispatchEvent(new CustomEvent('edutect:open-demo-video'));
    const el = document.getElementById('edutect-curriculum');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className={`relative overflow-hidden py-12 sm:py-20 transition-colors ${
        isDark
          ? 'bg-[#0F0E26] text-slate-100'
          : 'bg-white text-[#1E1B4B]'
      }`}
    >
      {/* Subtle Academic Indigo/Blue Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-1/4 w-[540px] h-[540px] rounded-full opacity-10 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${electricBlue} 0%, ${warmAmber} 65%, transparent 100%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Track Selector Pills (IELTS / BCS / Tech) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-200 dark:border-indigo-900/60">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-indigo-300">
            <GraduationCap size={16} style={{ color: electricBlue }} />
            <span>Select Your Flagship Coaching Track:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(Object.keys(EXAM_TRACK_PROFILES) as ExamTrackKey[]).map((key) => {
              const prof = EXAM_TRACK_PROFILES[key];
              const isSelected = selectedTrack === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedTrack(key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                    isSelected
                      ? 'text-white border-transparent shadow-sm'
                      : isDark
                      ? 'bg-indigo-950/60 border-indigo-800 text-indigo-200 hover:border-amber-400'
                      : 'bg-slate-50 border-slate-200 text-[#1E1B4B] hover:border-[#2563EB]'
                  }`}
                  style={
                    isSelected ? { backgroundColor: electricBlue } : undefined
                  }
                >
                  {prof.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= 1. HERO SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 7 Cols: High-Converting Authority Copy, CTAs & Urgency Ticker */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Trust Ticker */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold border bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-300">
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider"
                style={{ backgroundColor: warmAmber }}
              >
                <Flame size={11} />
                LIVE SEAT COUNTER
              </span>
              <span>
                Next Batch Starts: <strong>{activeProfile.upcomingBatchDate}</strong> | Only{' '}
                <strong className="underline">
                  {activeProfile.seatsRemaining} Seats Remaining!
                </strong>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.08] text-[#1E1B4B] dark:text-white">
              <EditableText
                id="edutect_hero_headline"
                defaultText={
                  title ||
                  `Master ${activeProfile.examTitle} with Bangladesh's Top-Rated Mentor.`
                }
              />
            </h1>

            <p className="text-sm sm:text-base font-bold text-blue-700 dark:text-amber-300">
              {activeProfile.banglaTagline}
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl">
              <EditableText
                id="edutect_hero_subheadline"
                defaultText={
                  subtitle ||
                  'Join 15,000+ successful students. Comprehensive batch coaching, live classes, recorded modules, and exam-tested resources.'
                }
              />
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={handleEnrollScroll}
                className={`inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-black text-white shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer ${
                  isBrutalist
                    ? 'rounded-none border-2 border-[#1E1B4B] shadow-[4px_4px_0px_#D97706]'
                    : 'rounded-2xl'
                }`}
                style={{ backgroundColor: electricBlue }}
              >
                <Sparkles size={18} className="text-amber-300" />
                <span>Enroll in Next Batch (৳3,000)</span>
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                onClick={handleWatchDemo}
                className={`inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base font-extrabold border-2 transition cursor-pointer ${
                  isBrutalist
                    ? 'rounded-none border-[#1E1B4B] bg-white text-[#1E1B4B] shadow-[4px_4px_0px_#2563EB]'
                    : isDark
                    ? 'rounded-2xl border-indigo-700 bg-indigo-950/60 text-white hover:border-amber-400'
                    : 'rounded-2xl border-[#1E1B4B]/20 bg-slate-50 text-[#1E1B4B] hover:border-[#2563EB]'
                }`}
              >
                <PlayCircle size={19} style={{ color: electricBlue }} />
                <span>Watch Free Demo Class</span>
              </button>
            </div>

            {/* Key Course Deliverables Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div
                className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                  isDark
                    ? 'bg-indigo-950/50 border-indigo-900'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <CheckCircle2 size={18} className="shrink-0" style={{ color: electricBlue }} />
                <div className="text-xs">
                  <p className="font-black">24+ Live Zoom Classes</p>
                  <p className="text-[11px] text-slate-500">+ HD Lifetime Recordings</p>
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                  isDark
                    ? 'bg-indigo-950/50 border-indigo-900'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <CheckCircle2 size={18} className="shrink-0" style={{ color: warmAmber }} />
                <div className="text-xs">
                  <p className="font-black">1-on-1 Mock Evaluation</p>
                  <p className="text-[11px] text-slate-500">Full Band & Cadre Feedback</p>
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                  isDark
                    ? 'bg-indigo-950/50 border-indigo-900'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <CheckCircle2 size={18} className="shrink-0" style={{ color: electricBlue }} />
                <div className="text-xs">
                  <p className="font-black">bKash / Nagad Instant</p>
                  <p className="text-[11px] text-slate-500">2-Min SMS Group Access</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: INSTRUCTOR SPOTLIGHT CARD (Clickable for Full Credentials Modal) */}
          <div className="lg:col-span-5">
            <div
              onClick={() => setMentorModalOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setMentorModalOpen(true);
                }
              }}
              className={`group cursor-pointer overflow-hidden border shadow-2xl transition-all hover:-translate-y-1 ${
                isBrutalist
                  ? 'rounded-none border-2 border-[#1E1B4B] shadow-[6px_6px_0px_#D97706]'
                  : 'rounded-3xl border-slate-200 dark:border-indigo-800'
              } ${isDark ? 'bg-indigo-950/80' : 'bg-white'}`}
            >
              {/* Top Royal Indigo Header Strip */}
              <div
                className="px-5 py-3.5 text-white flex items-center justify-between gap-2"
                style={{ backgroundColor: royalIndigo }}
              >
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-amber-400" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    LEAD INSTRUCTOR SPOTLIGHT
                  </span>
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase text-slate-950"
                  style={{ backgroundColor: '#F59E0B' }}
                >
                  4.96 ★ (1,420 Reviews)
                </span>
              </div>

              {/* Mentor High-Res Photo & Credentials Badge */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900">
                <img
                  src={activeProfile.mentorAvatar}
                  alt={activeProfile.mentorName}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B] via-[#1E1B4B]/35 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                  <span
                    className="inline-block px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider text-white shadow"
                    style={{ backgroundColor: electricBlue }}
                  >
                    {activeProfile.credentialsBadge}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black">
                    {activeProfile.mentorName}{' '}
                    <span className="text-sm font-bold text-amber-300">
                      ({activeProfile.mentorBanglaName})
                    </span>
                  </h2>
                  <p className="text-xs text-indigo-200 font-semibold">
                    {activeProfile.mentorRole}
                  </p>
                </div>
              </div>

              {/* Mentor Card Highlights & Action */}
              <div className="p-5 space-y-4">
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
                  {activeProfile.mentorBioBullets.slice(0, 2).map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <CheckCircle2
                        size={15}
                        className="shrink-0 mt-0.5"
                        style={{ color: electricBlue }}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-slate-100 dark:border-indigo-900 flex items-center justify-between text-xs font-extrabold">
                  <span className="text-slate-500 dark:text-indigo-300">
                    Click card to inspect full academic & Band 8.5 certificates
                  </span>
                  <span
                    className="inline-flex items-center gap-1 shrink-0"
                    style={{ color: electricBlue }}
                  >
                    <Eye size={14} />
                    <span>Full Bio</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. INSTRUCTOR CREDENTIALS & ACHIEVEMENTS ================= */}
        <div id="edutect-credentials" className="mt-16 sm:mt-20 scroll-mt-24">
          {/* 4-Column Stats Grid */}
          <div
            className="p-6 sm:p-8 rounded-3xl text-white shadow-xl"
            style={{ backgroundColor: royalIndigo }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-2xl sm:text-4xl font-black text-amber-400">
                  {activeProfile.highlightMetrics.studentsTaught}
                </p>
                <p className="text-xs sm:text-sm font-extrabold text-white mt-1">
                  Total Students Taught
                </p>
                <p className="text-[11px] text-indigo-300 mt-0.5">
                  Across Bangladesh & Diaspora
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-2xl sm:text-4xl font-black text-white">
                  {activeProfile.highlightMetrics.batchCount}
                </p>
                <p className="text-xs sm:text-sm font-extrabold text-white mt-1">
                  Completed Live Batches
                </p>
                <p className="text-[11px] text-indigo-300 mt-0.5">
                  100% Syllabus Completion Record
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-2xl sm:text-4xl font-black text-emerald-400">
                  {activeProfile.highlightMetrics.successRate}
                </p>
                <p className="text-xs sm:text-sm font-extrabold text-white mt-1">
                  Verified Success Rate
                </p>
                <p className="text-[11px] text-indigo-300 mt-0.5">
                  Within First Exam Attempt
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xl sm:text-3xl font-black text-amber-300">
                  {activeProfile.highlightMetrics.topScorersLabel}
                </p>
                <p className="text-xs sm:text-sm font-extrabold text-white mt-1">
                  Band 7.5+ / Cadre Selections
                </p>
                <p className="text-[11px] text-indigo-300 mt-0.5">
                  Verified Official Scorecards
                </p>
              </div>
            </div>

            {/* Institutional & Media Authority Badges (Clickable) */}
            <div className="mt-8 pt-6 border-t border-white/15">
              <p className="text-center text-[11px] font-black uppercase tracking-widest text-indigo-300 mb-4">
                ACADEMIC PEDIGREE, CERTIFICATIONS & MEDIA RECOGNITION (CLICK ANY BADGE TO VERIFY)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {INSTITUTION_BADGES.map((inst) => (
                  <button
                    key={inst.code}
                    type="button"
                    onClick={() => setSelectedInstitutionModal(inst)}
                    className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-black uppercase text-slate-950"
                        style={{ backgroundColor: '#F59E0B' }}
                      >
                        {inst.code}
                      </span>
                      <ShieldCheck size={14} className="text-emerald-400" />
                    </div>
                    <p className="text-xs font-black text-white mt-2">
                      {inst.name}
                    </p>
                    <p className="text-[10px] text-indigo-200 mt-0.5">
                      {inst.sub}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MENTOR FULL CREDENTIALS MODAL ================= */}
      {mentorModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setMentorModalOpen(false)}
        >
          <div
            className={`max-w-2xl w-full rounded-3xl overflow-hidden border shadow-2xl ${
              isDark
                ? 'bg-slate-900 border-indigo-800 text-slate-100'
                : 'bg-white border-slate-200 text-[#1E1B4B]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="p-6 text-white flex items-start justify-between gap-4"
              style={{ backgroundColor: royalIndigo }}
            >
              <div className="flex items-center gap-4">
                <img
                  src={activeProfile.mentorAvatar}
                  alt={activeProfile.mentorName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400"
                />
                <div>
                  <span
                    className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase text-white"
                    style={{ backgroundColor: electricBlue }}
                  >
                    {activeProfile.credentialsBadge}
                  </span>
                  <h3 className="text-xl font-black mt-1">
                    {activeProfile.mentorName} ({activeProfile.mentorBanglaName})
                  </h3>
                  <p className="text-xs text-indigo-200">
                    {activeProfile.mentorRole}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMentorModalOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5">
                  Verified Mentor Achievements & Teaching Methodology
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {activeProfile.mentorBioBullets.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={16}
                        className="shrink-0 mt-0.5"
                        style={{ color: electricBlue }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Official Academic & Training Certifications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProfile.officialCertifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    >
                      ✓ {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <span className="text-xs font-extrabold text-amber-600">
                  Next Batch: {activeProfile.upcomingBatchDate} ({activeProfile.seatsRemaining} seats left)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setMentorModalOpen(false);
                    handleEnrollScroll();
                  }}
                  className="px-6 py-3 rounded-xl text-xs sm:text-sm font-black text-white cursor-pointer"
                  style={{ backgroundColor: electricBlue }}
                >
                  Enroll in Batch 18 (৳3,000) →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= INSTITUTION CREDENTIAL MODAL ================= */}
      {selectedInstitutionModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedInstitutionModal(null)}
        >
          <div
            className={`max-w-lg w-full rounded-3xl overflow-hidden border shadow-2xl ${
              isDark
                ? 'bg-slate-900 border-indigo-800 text-slate-100'
                : 'bg-white border-slate-200 text-[#1E1B4B]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="p-5 text-white flex items-center justify-between"
              style={{ backgroundColor: royalIndigo }}
            >
              <div>
                <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                  {selectedInstitutionModal.code}
                </span>
                <h3 className="text-lg font-black mt-1">
                  {selectedInstitutionModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInstitutionModal(null)}
                className="p-1.5 rounded-full bg-white/10 text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {selectedInstitutionModal.detail}
              </p>
              <button
                type="button"
                onClick={() => setSelectedInstitutionModal(null)}
                className="w-full py-2.5 rounded-xl text-xs font-black text-white cursor-pointer"
                style={{ backgroundColor: electricBlue }}
              >
                Close Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
