import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  PlayCircle,
  Lock,
  ChevronDown,
  FileText,
  HelpCircle,
  Clock,
  CheckCircle2,
  Sparkles,
  X,
  ArrowRight,
  Video,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface EduTectCurriculumDemoSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface CurriculumLessonItem {
  id: string;
  englishTitle: string;
  banglaTitle: string;
  duration: string;
  resourceTag: 'PDF Sheet Available' | 'Interactive Quiz' | 'Cambridge Mock Set';
  isFreePreview: boolean;
  videoPreviewThumbnail: string;
  chapterMarkers: { time: string; label: string }[];
  keyTakeaways: string[];
}

interface CurriculumModuleBlock {
  id: string;
  moduleTitle: string;
  banglaModuleSub: string;
  lessonCountDuration: string;
  completionBadge: string;
  isPremiumLocked: boolean;
  lessons: CurriculumLessonItem[];
}

const CURRICULUM_MODULES: CurriculumModuleBlock[] = [
  {
    id: 'mod-1',
    moduleTitle: 'Module 1: Reading Strategies & True/False/Not Given Mastery',
    banglaModuleSub: 'কম সময়ে প্যাসেজ না পড়েও রিডিংয়ে ৮.৫ পাওয়ার কৌশল',
    lessonCountDuration: '5 Lessons • 2h 15m',
    completionBadge: '2 Free Demo Previews Unlocked',
    isPremiumLocked: false,
    lessons: [
      {
        id: 'les-101',
        englishTitle: 'Lesson 1.1: The "Cambridge Keyword Mapping" Formula',
        banglaTitle: 'প্যাসেজের মূল শব্দ খুঁজে বের করার জাদুকরী কৌশল',
        duration: '22 mins',
        resourceTag: 'PDF Sheet Available',
        isFreePreview: true,
        videoPreviewThumbnail:
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85',
        chapterMarkers: [
          { time: '00:00', label: 'Why 80% of BD Students Run Out of Time in Passage 3' },
          { time: '05:40', label: 'Skimming vs. Synonym Elimination Method' },
          { time: '14:15', label: 'Live Cambridge 18 Passage 2 Walkthrough' },
          { time: '21:30', label: 'Last 30s Summary & Worksheet Download' },
        ],
        keyTakeaways: [
          'Solve True/False/Not Given in under 45 seconds per question without second-guessing',
          'Includes 40-page Cambridge Synonym Bank PDF lecture sheet',
        ],
      },
      {
        id: 'les-102',
        englishTitle: 'Lesson 1.2: Eliminating "List of Headings" Traps in 90 Seconds',
        banglaTitle: 'লিস্ট অফ হেডিংস সমাধানের নিখুঁত শর্টকাট',
        duration: '18 mins',
        resourceTag: 'Interactive Quiz',
        isFreePreview: true,
        videoPreviewThumbnail:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=85',
        chapterMarkers: [
          { time: '00:00', label: 'First & Last Sentence Trap Explained' },
          { time: '06:20', label: 'Contrast Discourse Markers (However, Yet, Despite)' },
          { time: '13:10', label: 'Timed 5-Paragraph Live Drill' },
          { time: '17:30', label: 'Last 30s Band 8.5 Checklist' },
        ],
        keyTakeaways: [
          'Never fall for distractor keywords placed in the middle of long paragraphs',
          'Includes 20-question interactive self-grading quiz',
        ],
      },
      {
        id: 'les-103',
        englishTitle: 'Lesson 1.3: Summary Completion & Grammatical Prediction',
        banglaTitle: 'শূন্যস্থান পূরণে গ্রামার ও পার্টস অফ স্পিচের ব্যবহার',
        duration: '28 mins',
        resourceTag: 'PDF Sheet Available',
        isFreePreview: false,
        videoPreviewThumbnail:
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=85',
        chapterMarkers: [
          { time: '00:00', label: 'Noun/Verb/Adjective Slot Prediction' },
          { time: '12:00', label: 'Boxed Word List Synonym Matching' },
        ],
        keyTakeaways: [
          'Predict the exact word class before even looking at the reading passage',
        ],
      },
    ],
  },
  {
    id: 'mod-2',
    moduleTitle: 'Module 2: Speaking Masterclass & Fluency Without Memorization',
    banglaModuleSub: 'জড়তা কাটিয়ে ন্যাচারাল অ্যাকসেন্ট ও ইডিয়ম ব্যবহারের ফর্মুলা',
    lessonCountDuration: '6 Lessons • 2h 30m',
    completionBadge: '1 Free Demo Preview Unlocked',
    isPremiumLocked: false,
    lessons: [
      {
        id: 'les-201',
        englishTitle: 'Lesson 2.1: The "PPF Storytelling Framework" for 2-Minute Cue Cards',
        banglaTitle: 'যেকোনো কিউ কার্ডে ২ মিনিট না থেমে কথা বলার কৌশল',
        duration: '24 mins',
        resourceTag: 'PDF Sheet Available',
        isFreePreview: true,
        videoPreviewThumbnail:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85',
        chapterMarkers: [
          { time: '00:00', label: 'Why Examiners Penalize Memorized Scripts' },
          { time: '07:15', label: 'Past–Present–Future (PPF) 60-Second Note Making' },
          { time: '15:40', label: 'Live Band 8.5 Mock Speaking Demonstration' },
          { time: '23:30', label: 'Final 30s Cue Card Cheat Sheet' },
        ],
        keyTakeaways: [
          'Combine 50 universal Cue Card topics into 6 master story templates',
          'Includes 1-on-1 Zoom Speaking Mock Test booking link',
        ],
      },
      {
        id: 'les-202',
        englishTitle: 'Lesson 2.2: Part 3 Abstract Discussion & C1/C2 Lexical Resource',
        banglaTitle: 'পার্ট-৩ এর কঠিন প্রশ্নের লজিক্যাল উত্তর দেওয়ার নিয়ম',
        duration: '26 mins',
        resourceTag: 'Cambridge Mock Set',
        isFreePreview: false,
        videoPreviewThumbnail:
          'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=85',
        chapterMarkers: [
          { time: '00:00', label: 'Point–Reason–Example–Contrast Structure' },
        ],
        keyTakeaways: [
          'Boost Lexical Resource from Band 6.5 to Band 8.0 using natural collocations',
        ],
      },
    ],
  },
  {
    id: 'mod-3',
    moduleTitle: 'Module 3: Task 2 Essay Writing Strategy & Vocabulary',
    banglaModuleSub: 'রাইটিং টাস্ক-২ এ ৭.৫+ ব্যান্ড নিশ্চিত করার ৪-প্যারাগ্রাফ ব্লুপ্রিন্ট',
    lessonCountDuration: '6 Lessons • 2h 45m',
    completionBadge: 'Band 8.0 Essay Templates Included',
    isPremiumLocked: true,
    lessons: [
      {
        id: 'les-301',
        englishTitle: 'Lesson 3.1: The 4-Paragraph Band 8.0 Essay Architecture',
        banglaTitle: 'অ্যাগ্রি/ডিসঅ্যাগ্রি এবং ডিসকাশন এসে লেখার স্ট্রাকচার',
        duration: '20 mins',
        resourceTag: 'PDF Sheet Available',
        isFreePreview: true,
        videoPreviewThumbnail:
          'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85',
        chapterMarkers: [
          { time: '00:00', label: 'Task Response: Avoiding Off-Topic Tangents' },
          { time: '06:50', label: '2-Sentence Paraphrase + Thesis Statement Formula' },
          { time: '14:20', label: 'Complex Sentences (Conditional, Relative, Concession)' },
          { time: '19:30', label: 'Last 30s Unlock Full Essay Correction Service' },
        ],
        keyTakeaways: [
          'Step-by-step breakdown of British Council Coherence & Cohesion rubric',
          'Includes 30 graded Band 8.5 sample essays written by Sadman Sakib',
        ],
      },
      {
        id: 'les-302',
        englishTitle: 'Lesson 3.2: Academic Task 1 (Bar, Line, Pie, Map & Process Diagrams)',
        banglaTitle: 'একাডেমিক টাস্ক-১ গ্রাফ ও চার্ট বিশ্লেষণের সহজ নিয়ম',
        duration: '32 mins',
        resourceTag: 'Interactive Quiz',
        isFreePreview: false,
        videoPreviewThumbnail:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85',
        chapterMarkers: [
          { time: '00:00', label: 'Writing a Clear Overview Paragraph for Band 8+' },
        ],
        keyTakeaways: [
          'Master upward/downward trend vocabulary and comparison structures',
        ],
      },
    ],
  },
  {
    id: 'mod-4',
    moduleTitle: 'Module 4: Listening Section 4 & Full-Length Mock Exam Lab',
    banglaModuleSub: 'লিসেনিং এমসিকিউ ও ম্যাপ এবং ১০টি পূর্ণাঙ্গ মক টেস্ট',
    lessonCountDuration: '5 Lessons • 3h 10m',
    completionBadge: '10 Full Computer & Paper Mock Tests',
    isPremiumLocked: true,
    lessons: [
      {
        id: 'les-401',
        englishTitle: 'Lesson 4.1: Mastering Fast Multiple Choice & Map Labelling in Part 3',
        banglaTitle: 'লিসেনিং পার্ট-৩ এর বড় অপশন ও ম্যাপ দ্রুত পড়ার কৌশল',
        duration: '19 mins',
        resourceTag: 'Cambridge Mock Set',
        isFreePreview: false,
        videoPreviewThumbnail:
          'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1000&q=85',
        chapterMarkers: [
          { time: '00:00', label: 'Spotting Self-Correction Distractors in Audio' },
        ],
        keyTakeaways: [
          'Score 38/40+ consistently in Listening to pull up your overall IELTS band',
        ],
      },
    ],
  },
];

export const EduTectCurriculumDemoSection: React.FC<
  EduTectCurriculumDemoSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [expandedModuleIds, setExpandedModuleIds] = useState<string[]>([
    'mod-1',
    'mod-3',
  ]);
  const [activeVideoLesson, setActiveVideoLesson] =
    useState<CurriculumLessonItem | null>(null);
  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);
  const [simulateLast30Seconds, setSimulateLast30Seconds] =
    useState<boolean>(true);

  const royalIndigo = '#1E1B4B';
  const electricBlue = primaryColor || '#2563EB';
  const warmAmber = '#D97706';
  const isBrutalist = variant === 'varient_3';

  // Listen for Navbar or Hero "Watch Free Demo Class" click
  useEffect(() => {
    const handleOpenDefaultDemo = () => {
      const defaultDemo = CURRICULUM_MODULES[0].lessons[0];
      setActiveVideoLesson(defaultDemo);
      setActiveChapterIdx(0);
      setSimulateLast30Seconds(true);
    };
    window.addEventListener('edutect:open-demo-video', handleOpenDefaultDemo);
    return () =>
      window.removeEventListener(
        'edutect:open-demo-video',
        handleOpenDefaultDemo
      );
  }, []);

  const toggleModule = (modId: string) => {
    setExpandedModuleIds((prev) =>
      prev.includes(modId)
        ? prev.filter((id) => id !== modId)
        : [...prev, modId]
    );
  };

  const scrollToEnrollment = () => {
    setActiveVideoLesson(null);
    const el = document.getElementById('edutect-enrollment');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="edutect-curriculum"
      className={`py-16 sm:py-24 scroll-mt-20 border-t transition-colors ${
        isDark
          ? 'bg-[#131130] text-slate-100 border-indigo-900/60'
          : 'bg-[#F8FAFC] text-[#1E1B4B] border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-3xl">
            <span
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white"
              style={{ backgroundColor: electricBlue }}
            >
              <BookOpen size={13} />
              CURRICULUM ACCORDION & DEMO LESSON SHOWCASE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              <EditableText
                id="edutect_curriculum_title"
                defaultText={
                  title ||
                  'Structured Exam-Tested Syllabus & Free HD Demo Lessons'
                }
              />
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              <EditableText
                id="edutect_curriculum_subtitle"
                defaultText={
                  subtitle ||
                  'Expand any module below to inspect Bangla + English lesson topics, PDF lecture sheets, and click "Free Preview" to launch the interactive HD video player.'
                }
              />
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveVideoLesson(CURRICULUM_MODULES[0].lessons[0]);
              setActiveChapterIdx(0);
            }}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-white shadow-md shrink-0 cursor-pointer"
            style={{ backgroundColor: royalIndigo }}
          >
            <PlayCircle size={18} className="text-amber-400" />
            <span>Launch Masterclass Video Player (4 Free Demos)</span>
          </button>
        </div>

        {/* Multi-Module Expanding Accordion UI */}
        <div className="space-y-4">
          {CURRICULUM_MODULES.map((mod) => {
            const isExpanded = expandedModuleIds.includes(mod.id);
            return (
              <div
                key={mod.id}
                className={`overflow-hidden border transition ${
                  isBrutalist
                    ? 'rounded-none border-2 border-[#1E1B4B] shadow-[4px_4px_0px_#2563EB]'
                    : 'rounded-3xl border-slate-200 dark:border-indigo-900/70 shadow-sm'
                } ${isDark ? 'bg-slate-900' : 'bg-white'}`}
              >
                {/* Module Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleModule(mod.id)}
                  className="w-full p-5 sm:p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 dark:hover:bg-indigo-950/40 transition cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase text-white"
                        style={{ backgroundColor: royalIndigo }}
                      >
                        {mod.lessonCountDuration}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold ${
                          mod.isPremiumLocked
                            ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
                            : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                        }`}
                      >
                        {mod.isPremiumLocked ? (
                          <Lock size={11} />
                        ) : (
                          <CheckCircle2 size={11} />
                        )}
                        <span>{mod.completionBadge}</span>
                      </span>
                    </div>

                    <h3 className="text-base sm:text-xl font-black text-[#1E1B4B] dark:text-white">
                      {mod.moduleTitle}
                    </h3>
                    <p className="text-xs font-bold text-slate-500 dark:text-indigo-300">
                      {mod.banglaModuleSub}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <span className="text-xs font-extrabold text-blue-600 dark:text-amber-400">
                      {isExpanded ? 'Hide Lessons' : 'Expand Module'}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        isExpanded ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Lesson List Items */}
                {isExpanded && (
                  <div className="border-t border-slate-100 dark:border-indigo-900/60 divide-y divide-slate-100 dark:divide-indigo-900/40 bg-slate-50/50 dark:bg-slate-950/50">
                    {mod.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        onClick={() => {
                          setActiveVideoLesson(lesson);
                          setActiveChapterIdx(0);
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setActiveVideoLesson(lesson);
                          }
                        }}
                        className="p-4 sm:px-6 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-blue-50/50 dark:hover:bg-indigo-950/60 transition cursor-pointer"
                      >
                        <div className="flex items-start gap-3.5 min-w-0">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs"
                            style={{
                              backgroundColor: lesson.isFreePreview
                                ? electricBlue
                                : '#64748B',
                            }}
                          >
                            {lesson.isFreePreview ? (
                              <PlayCircle size={19} />
                            ) : (
                              <Lock size={16} />
                            )}
                          </div>

                          <div className="min-w-0 space-y-1">
                            <p className="text-xs sm:text-sm font-black text-[#1E1B4B] dark:text-white">
                              {lesson.englishTitle}
                            </p>
                            <p className="text-xs font-semibold text-slate-500 dark:text-indigo-300">
                              {lesson.banglaTitle}
                            </p>
                          </div>
                        </div>

                        {/* Right Side Metadata: Duration, Resource Tag & Free Preview / Locked Action */}
                        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                          {/* Resource Tag */}
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-white dark:bg-slate-900 border border-slate-200 dark:border-indigo-800 text-slate-700 dark:text-slate-300">
                            {lesson.resourceTag === 'PDF Sheet Available' ? (
                              <FileText size={12} style={{ color: electricBlue }} />
                            ) : (
                              <HelpCircle size={12} style={{ color: warmAmber }} />
                            )}
                            <span>{lesson.resourceTag}</span>
                          </span>

                          {/* Duration Indicator */}
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            <Clock size={12} />
                            <span>{lesson.duration}</span>
                          </span>

                          {/* Action Button: Free Preview vs Locked */}
                          {lesson.isFreePreview ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveVideoLesson(lesson);
                                setActiveChapterIdx(0);
                              }}
                              className="px-3.5 py-1.5 rounded-xl text-xs font-black text-white shadow-xs flex items-center gap-1.5 cursor-pointer"
                              style={{ backgroundColor: electricBlue }}
                            >
                              <PlayCircle size={13} />
                              <span>Free Preview</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveVideoLesson(lesson);
                                setActiveChapterIdx(0);
                              }}
                              className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer"
                            >
                              <Lock size={12} />
                              <span>Locked</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= 2. VIDEO PREVIEW MODAL (WITH CHAPTER MARKERS & LAST 30S ENROLL OVERLAY) ================= */}
      {activeVideoLesson && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveVideoLesson(null)}
        >
          <div
            className="max-w-3xl w-full rounded-3xl overflow-hidden border border-indigo-500/40 bg-[#0F0E26] text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div
              className="p-5 flex items-start justify-between gap-4 border-b border-white/10"
              style={{ backgroundColor: royalIndigo }}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase text-white"
                    style={{ backgroundColor: electricBlue }}
                  >
                    {activeVideoLesson.isFreePreview
                      ? 'HD FREE DEMO CLASS PREVIEW'
                      : 'SYLLABUS LESSON PREVIEW'}
                  </span>
                  <span className="text-xs font-bold text-amber-300">
                    Duration: {activeVideoLesson.duration} •{' '}
                    {activeVideoLesson.resourceTag}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black">
                  {activeVideoLesson.englishTitle}
                </h3>
                <p className="text-xs text-indigo-200 mt-0.5">
                  {activeVideoLesson.banglaTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideoLesson(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Simulated Secured HLS / YouTube Video Player Viewport */}
            <div className="relative h-64 sm:h-80 bg-slate-950 overflow-hidden">
              <img
                src={activeVideoLesson.videoPreviewThumbnail}
                alt={activeVideoLesson.englishTitle}
                className="w-full h-full object-cover opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-between p-5">
                {/* Top Right Toggle for Last-30s Overlay */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 text-[11px] font-bold text-emerald-300 flex items-center gap-1.5">
                    <Video size={13} />
                    <span>
                      Now Playing Chapter:{' '}
                      {activeVideoLesson.chapterMarkers[activeChapterIdx]?.label ||
                        'Introduction'}
                    </span>
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setSimulateLast30Seconds((prev) => !prev)
                    }
                    className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-[11px] font-extrabold text-amber-300 cursor-pointer"
                  >
                    {simulateLast30Seconds
                      ? 'Hide Last-30s Banner'
                      : 'Preview Last-30s Banner'}
                  </button>
                </div>

                {/* Required "Enroll Now to Unlock All Modules" Overlay Banner During Last 30 Seconds */}
                {simulateLast30Seconds && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#1E1B4B]/95 border-2 border-amber-400/80 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                        LAST 30 SECONDS OF DEMO PREVIEW
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-white">
                        Enroll Now to Unlock All Modules, 24+ Live Zoom Classes & PDF Sheets
                      </h4>
                      <p className="text-xs text-indigo-200">
                        Use Promo Code <strong className="text-amber-300">EARLYBIRD</strong> for ৳500 Instant Discount (Payable: ৳3,000 via bKash/Nagad).
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={scrollToEnrollment}
                      className="px-5 py-3 rounded-xl text-xs font-black text-white shrink-0 flex items-center gap-1.5 shadow-lg cursor-pointer"
                      style={{ backgroundColor: electricBlue }}
                    >
                      <span>Enroll Now to Unlock All Modules</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}

                {/* Video Scrubber Bar */}
                <div className="space-y-1.5">
                  <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: simulateLast30Seconds ? '92%' : '38%',
                        backgroundColor: electricBlue,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300">
                    <span>
                      {simulateLast30Seconds ? '21:30 (Last 30s)' : '06:20'}
                    </span>
                    <span>{activeVideoLesson.duration} • 1080p HD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapter Markers & Takeaways */}
            <div className="p-6 space-y-5">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-indigo-300 mb-2.5">
                  Interactive Video Chapter Markers (Click to Jump):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeVideoLesson.chapterMarkers.map((chap, idx) => {
                    const active = activeChapterIdx === idx;
                    return (
                      <button
                        key={chap.time}
                        type="button"
                        onClick={() => {
                          setActiveChapterIdx(idx);
                          if (idx === activeVideoLesson.chapterMarkers.length - 1) {
                            setSimulateLast30Seconds(true);
                          }
                        }}
                        className={`p-3 rounded-xl border text-left text-xs flex items-center justify-between gap-2 transition cursor-pointer ${
                          active
                            ? 'bg-blue-600/25 border-blue-400 text-white font-black'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span className="truncate">{chap.label}</span>
                        <span className="px-2 py-0.5 rounded bg-black/40 font-mono text-[10px] text-amber-300 shrink-0">
                          {chap.time}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
                <div className="text-xs text-indigo-200">
                  Includes downloadable lecture PDF & 1-on-1 instructor Q&A access.
                </div>
                <button
                  type="button"
                  onClick={scrollToEnrollment}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 cursor-pointer"
                >
                  Unlock All 4 Modules (৳3,000) →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
