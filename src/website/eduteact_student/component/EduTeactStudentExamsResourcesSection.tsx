import React, { useState, useEffect } from 'react';
import {
  FileCheck2,
  Clock,
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Download,
  FileText,
  BookOpen,
  Sparkles,
  RotateCcw,
  Award,
  Search,
  Check,
  Filter,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface EduTeactStudentExamsResourcesSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
  embeddedMode?: boolean;
  modeFilter?: 'all' | 'exams' | 'resources';
}

interface McqQuestion {
  id: string;
  question: string;
  bnHint: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface ResourceItem {
  id: string;
  title: string;
  bnSubtitle: string;
  category: 'Lecture Notes' | 'Formula Sheets' | 'Past Papers';
  moduleTag: string;
  size: string;
  pages: string;
  downloads: string;
}

const LIVE_MCQ_QUESTIONS: McqQuestion[] = [
  {
    id: 'q1',
    question:
      '1. [IELTS Reading Trap] "The species was predominantly found in coastal wetlands." — If the test statement says "The species lived exclusively in coastal wetlands", what is the answer?',
    bnHint: 'Predominantly (প্রধানত) বনাম Exclusively (কেবলমাত্র) — পার্থক্য লক্ষ্য করুন।',
    options: [
      'A) TRUE — Both refer to coastal wetlands',
      'B) FALSE — "Predominantly" contradicts "Exclusively"',
      'C) NOT GIVEN — We do not know about other habitats',
      'D) None of the above',
    ],
    correctIndex: 1,
    explanation:
      'Correct! "Predominantly" means mainly (allowing other habitats), which directly contradicts the absolute qualifier "Exclusively" (only). Therefore, the statement is FALSE.',
  },
  {
    id: 'q2',
    question:
      '2. [Academic Writing Task 2] Which linking phrase best introduces a concession paragraph before presenting your main counter-argument?',
    bnHint: 'বিপরীত মতামত স্বীকার করে নিজের যুক্তি দেওয়ার জন্য কোন ফ্রেজটি Band 8.0 উপযোগী?',
    options: [
      'A) Nowadays every coin has two sides and people think...',
      'B) Granted that state subsidies alleviate short-term pressure, they rarely...',
      'C) In a nutshell, I strongly agree with the topic...',
      'D) First and foremost, we must consider the pros and cons...',
    ],
    correctIndex: 1,
    explanation:
      'Correct! "Granted that..." is an advanced C1/C2 concessive structure that immediately boosts Grammatical Range & Accuracy in IELTS Writing Task 2.',
  },
  {
    id: 'q3',
    question:
      '3. [47th BCS & IELTS Grammar] "Hardly had the examinee entered the hall ____ the invigilator rang the warning bell."',
    bnHint: 'Hardly had ... when ফর্মুলাটি বিসিএস এবং আইইএলটিএস উভয় পরীক্ষাতেই আসে।',
    options: ['A) than', 'B) when', 'C) after', 'D) before'],
    correctIndex: 1,
    explanation:
      'Correct! In standard English inversion rules, "Hardly / Scarcely had" pairs with "when", whereas "No sooner had" pairs with "than".',
  },
];

const LEADERBOARD_STUDENTS = [
  {
    rank: 1,
    name: 'Nafis Rahman',
    location: 'Uttara, Dhaka',
    score: '98 / 100',
    band: 'Band 8.5',
    badge: 'Gold Topper 🥇',
  },
  {
    rank: 2,
    name: 'Farzana Mim',
    location: 'Chattogram',
    score: '95 / 100',
    band: 'Band 8.0',
    badge: 'Silver Scorer 🥈',
  },
  {
    rank: 3,
    name: 'Mahmudul Hasan',
    location: 'Rajshahi',
    score: '93 / 100',
    band: 'Band 8.0',
    badge: 'Bronze Scorer 🥉',
  },
  {
    rank: 14,
    name: 'Tasnim Mahi (You)',
    location: 'Dhanmondi, Dhaka',
    score: '88 / 100',
    band: 'Band 7.5',
    badge: 'Top 5% Cohort ⭐',
    isCurrentUser: true,
  },
];

const RESOURCE_VAULT_ITEMS: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'IELTS Writing Task 2 — 12 Band 8.5 Annotated Essay Samples',
    bnSubtitle: 'এক্সামিনার কমেন্টসহ ১২টি পূর্ণাঙ্গ রাইটিং টাস্ক ২ মডেল উত্তর',
    category: 'Lecture Notes',
    moduleTag: 'Module 02',
    size: '3.8 MB',
    pages: '28 Pages',
    downloads: '4.2k',
  },
  {
    id: 'res-2',
    title: 'Reading True/False/Not Given & Matching Headings Master Formula',
    bnSubtitle: 'রিডিং মডিউলে দ্রুত উত্তর বের করার শর্টকাট ফর্মুলা শিট',
    category: 'Formula Sheets',
    moduleTag: 'Module 01',
    size: '1.6 MB',
    pages: '10 Pages',
    downloads: '5.1k',
  },
  {
    id: 'res-3',
    title: 'Cambridge IELTS 18 & 19 Authentic Reading + Listening Past Papers',
    bnSubtitle: 'উত্তরপত্র ও বাংলা ব্যাখ্যাসহ অফিশিয়াল মক টেস্ট প্রশ্নপত্র',
    category: 'Past Papers',
    moduleTag: 'Mock Vault',
    size: '8.4 MB',
    pages: '64 Pages',
    downloads: '6.8k',
  },
  {
    id: 'res-4',
    title: 'Speaking Part 1, 2 & 3 Predicted Cue Card Answers (Sep–Dec)',
    bnSubtitle: 'সাম্প্রতিক ৬০টি কমন কিউ কার্ডের ভোকাবুলারিসহ মডেল স্ক্রিপ্ট',
    category: 'Lecture Notes',
    moduleTag: 'Module 03',
    size: '4.5 MB',
    pages: '42 Pages',
    downloads: '3.9k',
  },
  {
    id: 'res-5',
    title: 'Complex Sentence & Inversion Grammar Cheat Sheet for Band 8+',
    bnSubtitle: 'রাইটিং এবং বিসিএস রিটেনের জন্য ১০০টি অ্যাডভান্সড গ্রামার রুলস',
    category: 'Formula Sheets',
    moduleTag: 'Module 02',
    size: '2.1 MB',
    pages: '14 Pages',
    downloads: '4.7k',
  },
  {
    id: 'res-6',
    title: '46th & 45th BCS English Literature + Grammar Solved Question Bank',
    bnSubtitle: 'বিসিএস প্রিলিমিনারি বিগত বছরের প্রশ্ন ও নির্ভুল ব্যাখ্যা',
    category: 'Past Papers',
    moduleTag: 'BCS Track',
    size: '5.2 MB',
    pages: '48 Pages',
    downloads: '3.4k',
  },
];

export const EduTeactStudentExamsResourcesSection: React.FC<
  EduTeactStudentExamsResourcesSectionProps
> = ({ title, subtitle, primaryColor, embeddedMode = false, modeFilter = 'all' }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({
    q1: 1,
  });
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [quizSecondsLeft, setQuizSecondsLeft] = useState<number>(14 * 60 + 45);
  const [resourceCategory, setResourceCategory] = useState<
    'All' | 'Lecture Notes' | 'Formula Sheets' | 'Past Papers'
  >('All');
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);

  const royalIndigo = primaryColor || '#4F46E5';
  const darkSlate = '#0F172A';
  const emeraldGreen = '#10B981';

  useEffect(() => {
    if (isQuizSubmitted) return;
    const timer = setInterval(() => {
      setQuizSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isQuizSubmitted]);

  const mins = Math.floor(quizSecondsLeft / 60);
  const secs = quizSecondsLeft % 60;

  const correctCount = LIVE_MCQ_QUESTIONS.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  const filteredResources =
    resourceCategory === 'All'
      ? RESOURCE_VAULT_ITEMS
      : RESOURCE_VAULT_ITEMS.filter((r) => r.category === resourceCategory);

  const handleDownloadResource = (id: string) => {
    if (!downloadedIds.includes(id)) {
      setDownloadedIds((prev) => [...prev, id]);
    }
  };

  return (
    <section
      id="eduteact-exams-resources"
      className={
        embeddedMode
          ? 'w-full'
          : 'w-full py-10 sm:py-12 px-4 sm:px-6 border-t border-slate-200/80'
      }
      style={embeddedMode ? undefined : { backgroundColor: '#F8FAFC' }}
    >
      <div className={embeddedMode ? 'space-y-8' : 'max-w-7xl mx-auto space-y-10'}>
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold">
              <FileCheck2 size={13} />
              <span>
                {modeFilter === 'resources'
                  ? 'Lecture Sheet & PDF Resource Vault'
                  : modeFilter === 'exams'
                  ? 'Interactive Mock Quiz Engine & Batch Leaderboard'
                  : '3 & 4. Interactive Mock Quiz Engine, Batch Leaderboard & PDF Vault'}
              </span>
            </div>
            <EditableText
              as="h2"
              defaultValue={
                modeFilter === 'resources'
                  ? 'Categorized Lecture Sheet & PDF Resource Vault'
                  : title ||
                    'Timed Mock Assessments, Batch Leaderboard & Categorized Lecture Sheet Vault'
              }
              className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900"
            />
            <EditableText
              as="p"
              defaultValue={
                modeFilter === 'resources'
                  ? 'ক্লাস নোটস, শর্টকাট ফর্মুলা শিট এবং বিগত বছরের প্রশ্নপত্র ক্যাটাগরি অনুযায়ী ফিল্টার করে এক ক্লিকেই পিডিএফ ডাউনলোড করুন।'
                  : subtitle ||
                    'টাইমারসহ লাইভ এমসিকিউ মক টেস্টে অংশ নিয়ে তাৎক্ষণিক ব্যাখ্যাসহ ফলাফল দেখুন, ব্যাচের লিডারবোর্ডে নিজের অবস্থান যাচাই করুন এবং এক ক্লিকে পিডিএফ লেকচার শিট ডাউনলোড করুন।'
              }
              className="text-xs sm:text-sm text-slate-600 max-w-3xl"
            />
          </div>
        </div>

        {/* PART A: TIMED MCQ MOCK TEST + BATCH LEADERBOARD */}
        {modeFilter !== 'resources' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Timed MCQ Quiz Engine (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden">
            {/* Quiz Header Bar */}
            <div
              className="p-5 text-white flex flex-wrap items-center justify-between gap-3"
              style={{ backgroundColor: darkSlate }}
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                  Live Diagnostic Assessment • Instant Answer Key
                </span>
                <h3 className="text-base sm:text-lg font-black">
                  Mock Test #07: IELTS &amp; BCS High-Yield Concept Check
                </h3>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-black flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>
                    {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
                  </span>
                </div>
                {isQuizSubmitted && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsQuizSubmitted(false);
                      setSelectedAnswers({});
                      setQuizSecondsLeft(15 * 60);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={13} />
                    <span>Retake</span>
                  </button>
                )}
              </div>
            </div>

            {/* Questions List */}
            <div className="p-5 sm:p-6 space-y-6">
              {LIVE_MCQ_QUESTIONS.map((q) => {
                const picked = selectedAnswers[q.id];
                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                  >
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-relaxed">
                        {q.question}
                      </h4>
                      <p className="text-[11px] text-indigo-700 font-medium">
                        💡 {q.bnHint}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, idx) => {
                        const isSelected = picked === idx;
                        const isCorrect = q.correctIndex === idx;

                        let btnStyle =
                          'bg-white border-slate-200 text-slate-700 hover:border-indigo-400';
                        if (isQuizSubmitted) {
                          if (isCorrect) {
                            btnStyle =
                              'bg-emerald-50 border-emerald-500 text-emerald-900 font-extrabold';
                          } else if (isSelected && !isCorrect) {
                            btnStyle =
                              'bg-rose-50 border-rose-400 text-rose-900';
                          }
                        } else if (isSelected) {
                          btnStyle =
                            'bg-indigo-50 border-indigo-600 text-indigo-950 font-extrabold';
                        }

                        return (
                          <button
                            key={opt}
                            type="button"
                            disabled={isQuizSubmitted}
                            onClick={() =>
                              setSelectedAnswers((prev) => ({ ...prev, [q.id]: idx }))
                            }
                            className={`p-3 rounded-xl border text-left text-xs transition flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isQuizSubmitted && isCorrect && (
                              <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                            )}
                            {isQuizSubmitted && isSelected && !isCorrect && (
                              <XCircle size={15} className="text-rose-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isQuizSubmitted && (
                      <div className="p-3 rounded-xl bg-emerald-50/90 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
                        <span className="font-extrabold">Examiner Explanation: </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Submit / Instant Scorecard Footer */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-200">
                {isQuizSubmitted ? (
                  <div className="flex items-center gap-3">
                    <div
                      className="px-3.5 py-2 rounded-xl text-white text-xs font-black"
                      style={{ backgroundColor: emeraldGreen }}
                    >
                      Score: {correctCount} / {LIVE_MCQ_QUESTIONS.length} Correct (
                      {Math.round((correctCount / LIVE_MCQ_QUESTIONS.length) * 100)}%)
                    </div>
                    <span className="text-xs font-bold text-slate-600">
                      +100 XP Added to your Batch 18 Rank!
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 font-medium">
                    Answered {Object.keys(selectedAnswers).length} of{' '}
                    {LIVE_MCQ_QUESTIONS.length} questions
                  </span>
                )}

                {!isQuizSubmitted && (
                  <button
                    type="button"
                    onClick={() => setIsQuizSubmitted(true)}
                    className="px-6 py-3 rounded-xl text-xs font-extrabold text-white shadow-md hover:opacity-95 transition cursor-pointer"
                    style={{ backgroundColor: royalIndigo }}
                  >
                    Submit Quiz &amp; View Instant Explanation →
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Batch Leaderboard & Performance Analytics (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-md p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                  <Trophy size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Batch 18 Live Leaderboard
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    ৪২০ জন শিক্ষার্থীর মক টেস্ট র‍্যাঙ্কিং (সাপ্তাহিক আপডেট)
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Top 5%
              </span>
            </div>

            <div className="space-y-2.5">
              {LEADERBOARD_STUDENTS.map((stu) => (
                <div
                  key={stu.rank}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                    stu.isCurrentUser
                      ? 'bg-indigo-50/90 border-indigo-300 shadow-xs'
                      : 'bg-slate-50/70 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black ${
                        stu.rank === 1
                          ? 'bg-amber-400 text-slate-950'
                          : stu.isCurrentUser
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      #{stu.rank}
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                        <span>{stu.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                          {stu.badge}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {stu.location} • Predicted: {stu.band}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-slate-900">
                      {stu.score}
                    </div>
                    <div className="text-[10px] font-bold text-emerald-600">
                      Verified
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skill Breakdown Bars */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="text-xs font-extrabold text-slate-800">
                Your Module-Wise Band Trajectory (Tasnim Mahi)
              </div>
              {[
                { skill: 'Listening Accuracy (36/40)', band: 'Band 8.0', pct: '88%' },
                { skill: 'Academic Reading (34/40)', band: 'Band 7.5', pct: '82%' },
                { skill: 'Writing Task 1 & 2', band: 'Band 7.0', pct: '74%' },
                { skill: 'Speaking Fluency & Lexical', band: 'Band 7.5', pct: '80%' },
              ].map((item) => (
                <div key={item.skill} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-600">{item.skill}</span>
                    <span className="text-indigo-700 font-extrabold">{item.band}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: item.pct, backgroundColor: royalIndigo }}
                    />
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        )}

        {/* PART B: RESOURCE & LECTURE SHEET VAULT (ONE-CLICK PDF DOWNLOADS) */}
        {modeFilter !== 'exams' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-md space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                4. Resource &amp; Lecture Sheet Vault (পিডিএফ লেকচার শিট ও নোট ভল্ট)
              </h3>
              <p className="text-xs text-slate-500">
                Filter by Lecture Notes, Formula Sheets, or Past Papers and download directly for offline study.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(['All', 'Lecture Notes', 'Formula Sheets', 'Past Papers'] as const).map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setResourceCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                      resourceCategory === cat
                        ? 'text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                    }`}
                    style={
                      resourceCategory === cat
                        ? { backgroundColor: royalIndigo }
                        : undefined
                    }
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((res) => {
              const isDownloaded = downloadedIds.includes(res.id);
              return (
                <div
                  key={res.id}
                  className="p-4 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/90 transition flex flex-col justify-between space-y-4 shadow-2xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                        {res.category}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {res.moduleTag}
                      </span>
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                      {res.title}
                    </h4>
                    <p className="text-xs text-slate-600">{res.bnSubtitle}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between gap-2">
                    <div className="text-[10px] font-bold text-slate-500">
                      {res.pages} • {res.size} • {res.downloads} saved
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownloadResource(res.id)}
                      className="px-3.5 py-2 rounded-xl text-xs font-extrabold text-white transition flex items-center gap-1.5 cursor-pointer shrink-0"
                      style={{
                        backgroundColor: isDownloaded ? emeraldGreen : royalIndigo,
                      }}
                    >
                      {isDownloaded ? <Check size={13} /> : <Download size={13} />}
                      <span>{isDownloaded ? 'Downloaded PDF' : 'One-Click PDF'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        )}
      </div>
    </section>
  );
};
export default EduTeactStudentExamsResourcesSection;
