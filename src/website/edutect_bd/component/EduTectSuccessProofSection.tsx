import React, { useState } from 'react';
import {
  Trophy,
  Star,
  CheckCircle2,
  PlayCircle,
  FileCheck2,
  Eye,
  X,
  Sparkles,
  Award,
  ArrowRight,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface EduTectSuccessProofSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

type ProofCategoryTab =
  | 'all'
  | 'high_scorers'
  | 'video_feedback'
  | 'scorecard_screenshots';

interface StudentProofItem {
  id: string;
  studentName: string;
  banglaName: string;
  batchIdentifier: string;
  achievementPill: string;
  enrolledBadge: string;
  currentDesignationOrUni: string;
  avatar: string;
  rating: number;
  categories: ProofCategoryTab[];
  shortQuote: string;
  fullStoryText: string;
  proofCertificateTitle: string;
  proofCertificateCode: string;
  scoreBreakdown: { label: string; score: string }[];
  proofThumbnailImage: string;
  hasVideoFeedback?: boolean;
}

const STUDENT_PROOF_ITEMS: StudentProofItem[] = [
  {
    id: 'proof-1',
    studentName: 'Tasnim Jahan Ritu',
    banglaName: 'তাসনিম জাহান ঋতু',
    batchIdentifier: 'IELTS Intensive Batch 14',
    achievementPill: 'Overall Band 8.0',
    enrolledBadge: 'Verified Student • Enrolled Jan 2026',
    currentDesignationOrUni: 'M.Sc. Scholar, University of Manchester (UK)',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    categories: ['all', 'high_scorers', 'scorecard_screenshots'],
    shortQuote:
      '“I was stuck at Band 6.5 in Writing & Reading for two attempts. Sadman Bhai’s 4-Paragraph Essay Architecture and Cambridge Keyword Mapping pushed me to Overall Band 8.0 in 6 weeks!”',
    fullStoryText:
      'Before joining Batch 14, I always ran out of time on Reading Passage 3 and wrote overly complicated sentences in Writing Task 2. The 1-on-1 red-pen essay markings and weekly British Council computer-delivered mock tests changed everything. I scored Listening 8.5, Reading 8.5, Writing 7.5, and Speaking 7.5 — securing my full Commonwealth Master’s offer in Manchester!',
    proofCertificateTitle: 'Official IDP IELTS Academic Test Report Form (TRF)',
    proofCertificateCode: 'TRF Verification ID: BD-IDP-2026-88412',
    scoreBreakdown: [
      { label: 'Listening', score: '8.5' },
      { label: 'Reading', score: '8.5' },
      { label: 'Writing', score: '7.5' },
      { label: 'Speaking', score: '7.5' },
    ],
    proofThumbnailImage:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'proof-2',
    studentName: 'Mahmudul Bari Rakib',
    banglaName: 'মাহমুদুল বারী রাকিব',
    batchIdentifier: 'BCS Cadre Intensive Batch 11',
    achievementPill: 'Recommended BCS (Admin Cadre)',
    enrolledBadge: 'Verified Student • Enrolled Jan 2026',
    currentDesignationOrUni: 'Ex-University of Dhaka • Merit 12th (Admin)',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    categories: ['all', 'high_scorers', 'video_feedback'],
    shortQuote:
      '“The 25 live negative-marking OMR mock tests and International Affairs digest sheets saved me at least 400 hours of aimless reading.”',
    fullStoryText:
      'Most BCS coaching centers dump 10,000 pages of unorganized notes on students. EduTect’s High-Yield Topic Exclusion Method taught me what NOT to read for Prelims, and the written answer script framing helped me score 142/200 in Mathematical Reasoning & Mental Ability.',
    proofCertificateTitle: 'BPSC Preliminary & Written Gazette Merit Verification',
    proofCertificateCode: 'BPSC Reg Serial: 44-109482',
    scoreBreakdown: [
      { label: 'Prelim Score', score: '146 / 200' },
      { label: 'Written Math', score: '94 / 100' },
      { label: 'Written Eng', score: '138 / 200' },
      { label: 'Viva Voce', score: '165 / 200' },
    ],
    proofThumbnailImage:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    hasVideoFeedback: true,
  },
  {
    id: 'proof-3',
    studentName: 'Nafisa Anjum',
    banglaName: 'নাফিসা আনজুম',
    batchIdentifier: 'IELTS Intensive Batch 16',
    achievementPill: 'Overall Band 8.5 (Speaking 8.5)',
    enrolledBadge: 'Verified Student • Enrolled Feb 2026',
    currentDesignationOrUni: 'B.Sc. CSE, BUET • Full Funding Offer (Canada)',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    categories: ['all', 'high_scorers', 'video_feedback', 'scorecard_screenshots'],
    shortQuote:
      '“As an engineering student, I used to freeze during Speaking Part 2 Cue Cards. The PPF Storytelling Framework helped me hit 8.5 in Speaking!”',
    fullStoryText:
      'Instead of memorizing 100 different Cue Card answers from guidebooks, I learned how to adapt 6 core life stories to any prompt in 60 seconds. Plus, the private Telegram group solved my doubts at 1:00 AM before exam day.',
    proofCertificateTitle: 'British Council Computer-Delivered IELTS Result Sheet',
    proofCertificateCode: 'BC Reference: BGD-BC-2026-39104',
    scoreBreakdown: [
      { label: 'Listening', score: '9.0' },
      { label: 'Reading', score: '8.5' },
      { label: 'Speaking', score: '8.5' },
      { label: 'Writing', score: '7.5' },
    ],
    proofThumbnailImage:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80',
    hasVideoFeedback: true,
  },
  {
    id: 'proof-4',
    studentName: 'Tanvir Hossain Shuvo',
    banglaName: 'তানভীর হোসেন শুভ',
    batchIdentifier: 'IELTS GT Fast-Track Batch 15',
    achievementPill: 'CLB 10 (Overall Band 8.0)',
    enrolledBadge: 'Verified Student • Enrolled Jan 2026',
    currentDesignationOrUni: 'Senior Software Engineer • Canada Express Entry',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    categories: ['all', 'scorecard_screenshots'],
    shortQuote:
      '“Attended Friday & Saturday 8:00 PM live classes while working a full-time corporate job in Gulshan. Achieved CLB 10 (8-7-7-7+) on my very first try!”',
    fullStoryText:
      'Working 9-to-6 left me zero energy for physical coaching centers in Dhaka traffic. Having instant HD recordings in my dashboard and weekend evening live classes allowed me to jump 52 CRS points for my Canadian PR.',
    proofCertificateTitle: 'IDP IELTS General Training CLB 10 Scorecard',
    proofCertificateCode: 'TRF Verification ID: BD-GT-2026-51029',
    scoreBreakdown: [
      { label: 'Listening', score: '8.5 (CLB 10)' },
      { label: 'Reading', score: '8.0 (CLB 10)' },
      { label: 'Writing', score: '7.5 (CLB 10)' },
      { label: 'Speaking', score: '7.5 (CLB 10)' },
    ],
    proofThumbnailImage:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
  },
];

export const EduTectSuccessProofSection: React.FC<
  EduTectSuccessProofSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [activeTab, setActiveTab] = useState<ProofCategoryTab>('all');
  const [expandedReadMoreIds, setExpandedReadMoreIds] = useState<string[]>([]);
  const [selectedProofLightbox, setSelectedProofLightbox] =
    useState<StudentProofItem | null>(null);

  const royalIndigo = '#1E1B4B';
  const electricBlue = primaryColor || '#2563EB';
  const warmAmber = '#D97706';
  const isBrutalist = variant === 'varient_3';

  const filteredReviews = STUDENT_PROOF_ITEMS.filter((item) =>
    item.categories.includes(activeTab)
  );

  const toggleReadMore = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedReadMoreIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="edutect-proof"
      className={`py-16 sm:py-24 scroll-mt-20 border-t transition-colors ${
        isDark
          ? 'bg-[#0F0E26] text-slate-100 border-indigo-900/60'
          : 'bg-white text-[#1E1B4B] border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white"
            style={{ backgroundColor: electricBlue }}
          >
            <Trophy size={13} className="text-amber-300" />
            STUDENT SUCCESS & VERIFIED SCORECARD GALLERY
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            <EditableText
              id="edutect_proof_title"
              defaultText={
                title ||
                'Real IELTS Band 8.0+ Scorecards, BCS Cadres & Verified Batch Reviews'
              }
            />
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            <EditableText
              id="edutect_proof_subtitle"
              defaultText={
                subtitle ||
                'Filter by High Scorers, Video Feedback, or Official Scorecard Screenshots—and click any card to inspect the full verified TRF result sheet.'
              }
            />
          </p>
        </div>

        {/* 3. AGGREGATE RATING BAR */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border mb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
            isDark
              ? 'bg-indigo-950/60 border-indigo-800'
              : 'bg-[#F8FAFC] border-slate-200'
          }`}
        >
          {/* Overall Score */}
          <div className="lg:col-span-5 flex items-center gap-5">
            <div
              className="w-24 h-24 rounded-3xl flex flex-col items-center justify-center text-white shrink-0 shadow-lg"
              style={{ backgroundColor: royalIndigo }}
            >
              <span className="text-3xl font-black text-amber-400">4.9</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                out of 5.0
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#D97706" stroke="#D97706" />
                ))}
              </div>
              <h3 className="text-base sm:text-lg font-black">
                4.9 out of 5 based on 1,420 student ratings
              </h3>
              <p className="text-xs text-slate-500 dark:text-indigo-300">
                100% verified enrollments from Batches 1 to 17 across Bangladesh
              </p>
            </div>
          </div>

          {/* 5-Star, 4-Star, 3-Star Percentage Distribution Bars */}
          <div className="lg:col-span-7 space-y-2.5">
            {[
              { stars: '5 Star Ratings', pct: 91, count: '1,292 Students' },
              { stars: '4 Star Ratings', pct: 8, count: '114 Students' },
              { stars: '3 Star Ratings', pct: 1, count: '14 Students' },
            ].map((bar) => (
              <div key={bar.stars} className="flex items-center gap-3 text-xs">
                <span className="w-28 font-extrabold shrink-0">{bar.stars}</span>
                <div className="flex-1 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${bar.pct}%`,
                      backgroundColor: warmAmber,
                    }}
                  />
                </div>
                <span className="w-28 text-right font-bold text-slate-500 shrink-0">
                  {bar.pct}% ({bar.count})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 1. TABBED PROOF CATEGORIES (4 Tabs) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all' as ProofCategoryTab, label: 'Tab 1: All Reviews (4)' },
              {
                id: 'high_scorers' as ProofCategoryTab,
                label: 'Tab 2: High Scorers / Success Stories (Band 8.0+ & BCS)',
              },
              {
                id: 'video_feedback' as ProofCategoryTab,
                label: 'Tab 3: Video Feedback',
              },
              {
                id: 'scorecard_screenshots' as ProofCategoryTab,
                label: 'Tab 4: Scorecard Screenshots',
              },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                    active
                      ? 'text-white border-transparent shadow-sm'
                      : isDark
                      ? 'bg-slate-900 border-indigo-800 text-slate-300 hover:border-amber-400'
                      : 'bg-slate-50 border-slate-200 text-[#1E1B4B] hover:border-[#2563EB]'
                  }`}
                  style={
                    active ? { backgroundColor: electricBlue } : undefined
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. REVIEW CARD COMPONENTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {filteredReviews.map((item) => {
            const isExpanded = expandedReadMoreIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => setSelectedProofLightbox(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProofLightbox(item);
                  }
                }}
                className={`group cursor-pointer overflow-hidden border transition-all duration-200 flex flex-col justify-between ${
                  isBrutalist
                    ? 'rounded-none border-2 border-[#1E1B4B] shadow-[5px_5px_0px_#2563EB]'
                    : 'rounded-3xl border-slate-200 dark:border-indigo-900/80 hover:shadow-xl hover:-translate-y-0.5'
                } ${isDark ? 'bg-slate-900' : 'bg-white'}`}
              >
                <div className="p-6 space-y-4">
                  {/* Top Header: Student Avatar, Name, Batch Identifier & Achievement Pill */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={item.avatar}
                        alt={item.studentName}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-black truncate">
                            {item.studentName} ({item.banglaName})
                          </h3>
                        </div>
                        <p className="text-xs font-extrabold text-blue-600 dark:text-amber-300">
                          {item.batchIdentifier} • {item.currentDesignationOrUni}
                        </p>
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                          <CheckCircle2 size={12} />
                          <span>{item.enrolledBadge}</span>
                        </p>
                      </div>
                    </div>

                    {/* Score / Achievement Pill */}
                    <span
                      className="px-3 py-1 rounded-full text-xs font-black text-slate-950 shrink-0 shadow-xs"
                      style={{ backgroundColor: '#F59E0B' }}
                    >
                      {item.achievementPill}
                    </span>
                  </div>

                  {/* 5-Star Yellow Vector Stars */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={15}
                          fill="#D97706"
                          stroke="#D97706"
                        />
                      ))}
                    </div>
                    {item.hasVideoFeedback && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-blue-500/10 text-blue-600 dark:text-blue-300">
                        <PlayCircle size={12} />
                        Video Testimonial Attached
                      </span>
                    )}
                  </div>

                  {/* Text Review with "Read More" Expansion */}
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm font-bold leading-relaxed text-[#1E1B4B] dark:text-white">
                      {item.shortQuote}
                    </p>
                    {isExpanded && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1 border-t border-slate-100 dark:border-slate-800">
                        {item.fullStoryText}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={(e) => toggleReadMore(item.id, e)}
                      className="text-xs font-extrabold text-blue-600 dark:text-amber-400 hover:underline cursor-pointer"
                    >
                      {isExpanded ? 'Show Less ↑' : 'Read More Full Journey ↓'}
                    </button>
                  </div>

                  {/* Attached Proof Thumbnail (Clickable Lightbox Preview) */}
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-indigo-900/60 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.proofThumbnailImage}
                        alt={item.proofCertificateTitle}
                        className="w-16 h-12 rounded-lg object-cover shrink-0 border border-slate-300 dark:border-slate-700"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-black truncate">
                          {item.proofCertificateTitle}
                        </p>
                        <p className="text-[10px] font-mono text-slate-500">
                          {item.proofCertificateCode}
                        </p>
                      </div>
                    </div>

                    <span
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-extrabold text-white shrink-0"
                      style={{ backgroundColor: royalIndigo }}
                    >
                      <Eye size={13} className="text-amber-400" />
                      <span>Inspect TRF</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= SCORECARD & CERTIFICATE LIGHTBOX MODAL ================= */}
      {selectedProofLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProofLightbox(null)}
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
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                    {selectedProofLightbox.achievementPill}
                  </span>
                  <span className="text-xs font-bold text-indigo-200">
                    {selectedProofLightbox.batchIdentifier}
                  </span>
                </div>
                <h3 className="text-xl font-black">
                  {selectedProofLightbox.studentName} ({selectedProofLightbox.banglaName})
                </h3>
                <p className="text-xs text-indigo-200">
                  {selectedProofLightbox.proofCertificateTitle} •{' '}
                  {selectedProofLightbox.proofCertificateCode}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProofLightbox(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
              {/* Official Sub-Score Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                {selectedProofLightbox.scoreBreakdown.map((sc) => (
                  <div
                    key={sc.label}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    <p className="text-[10px] font-extrabold uppercase text-slate-400">
                      {sc.label}
                    </p>
                    <p
                      className="text-lg font-black mt-0.5"
                      style={{ color: electricBlue }}
                    >
                      {sc.score}
                    </p>
                  </div>
                ))}
              </div>

              <div className="relative h-52 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                <img
                  src={selectedProofLightbox.proofThumbnailImage}
                  alt={selectedProofLightbox.proofCertificateTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-xs text-white px-4 py-2 rounded-xl flex items-center justify-between text-xs font-bold">
                  <span>{selectedProofLightbox.enrolledBadge}</span>
                  <span className="text-amber-300">
                    {selectedProofLightbox.proofCertificateCode}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <p className="font-black text-[#1E1B4B] dark:text-white">
                  {selectedProofLightbox.shortQuote}
                </p>
                <p>{selectedProofLightbox.fullStoryText}</p>
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500">
                  {selectedProofLightbox.currentDesignationOrUni}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProofLightbox(null);
                    const el = document.getElementById('edutect-enrollment');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-black text-white cursor-pointer"
                  style={{ backgroundColor: electricBlue }}
                >
                  Join Next Batch (৳3,000) →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
