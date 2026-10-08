import React, { useState } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  Send,
  CheckCircle2,
  Award,
  Flame,
  Trophy,
  Star,
  Download,
  Share2,
  QrCode,
  ShieldCheck,
  GraduationCap,
  HelpCircle,
  Lock,
  Unlock,
  Sparkles,
  Check,
  X,
  UserCheck,
  Headphones,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface EduTeactStudentCommunityCertificateFooterSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
  embeddedMode?: boolean;
  modeFilter?: 'all' | 'community' | 'certificate' | 'footer_only';
}

interface DiscussionThread {
  id: string;
  studentName: string;
  batchTag: string;
  moduleRef: string;
  question: string;
  bnQuestion: string;
  taName: string;
  taRole: string;
  taReply: string;
  upvotes: number;
  resolved: boolean;
  timeAgo: string;
}

const INITIAL_THREADS: DiscussionThread[] = [
  {
    id: 'th-1',
    studentName: 'Rashedul Islam',
    batchTag: 'IELTS Batch 18',
    moduleRef: 'Module 02 • Writing Task 2',
    question:
      'In a "Discuss both views and give your opinion" essay, should I state my personal opinion in the introduction or only in the conclusion?',
    bnQuestion:
      'Discuss both views এসে-তে নিজের মতামত কি ইন্ট্রোডাকশনেই দিতে হবে নাকি শুধু কনক্লুশনে?',
    taName: 'Sadman Sakib',
    taRole: 'Lead Mentor (IELTS 8.5)',
    taReply:
      'State your clear position in BOTH the introduction (Thesis Statement) and the conclusion! Under the official Band 8 Task Response descriptor, your position must be clear throughout the entire essay, not held back as a surprise at the end.',
    upvotes: 34,
    resolved: true,
    timeAgo: '1h ago',
  },
  {
    id: 'th-2',
    studentName: 'Nusrat Jahan',
    batchTag: 'IELTS Batch 18',
    moduleRef: 'Module 01 • Reading Passage 3',
    question:
      'How do I distinguish between "FALSE" and "NOT GIVEN" when the passage uses a partial qualifier like "some scientists argue"?',
    bnQuestion:
      'প্যাসেজে "some scientists argue" থাকলে এবং প্রশ্নে "all scientists agree" থাকলে উত্তর কি FALSE হবে?',
    taName: 'Arafat Hossain',
    taRole: 'Senior Teaching Assistant (Band 8.0)',
    taReply:
      'Yes! Because "some" vs. "all" is a direct logical contradiction of quantity, the statement is FALSE. It is only NOT GIVEN when the target claim is completely absent from the text.',
    upvotes: 27,
    resolved: true,
    timeAgo: '3h ago',
  },
];

export const EduTeactStudentCommunityCertificateFooterSection: React.FC<
  EduTeactStudentCommunityCertificateFooterSectionProps
> = ({ title, subtitle, primaryColor, embeddedMode = false, modeFilter = 'all' }) => {
  const [threads, setThreads] = useState<DiscussionThread[]>(INITIAL_THREADS);
  const [upvotedIds, setUpvotedIds] = useState<string[]>([]);
  const [doubtModule, setDoubtModule] = useState<string>('Module 02 • Writing Task 2');
  const [doubtCategory, setDoubtCategory] = useState<'Academic Doubt' | 'Technical Support'>(
    'Academic Doubt'
  );
  const [doubtQuestion, setDoubtQuestion] = useState<string>('');
  const [ticketSubmittedToast, setTicketSubmittedToast] = useState<boolean>(false);

  // Certificate unlock simulation state
  const [simulate100Percent, setSimulate100Percent] = useState<boolean>(true);
  const [isCertificatePreviewOpen, setIsCertificatePreviewOpen] = useState<boolean>(false);
  const [linkedInShared, setLinkedInShared] = useState<boolean>(false);

  const royalIndigo = primaryColor || '#4F46E5';
  const darkSlate = '#0F172A';
  const emeraldGreen = '#10B981';

  const handleUpvote = (id: string) => {
    const already = upvotedIds.includes(id);
    setUpvotedIds((prev) =>
      already ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setThreads((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, upvotes: already ? t.upvotes - 1 : t.upvotes + 1 } : t
      )
    );
  };

  const handleCreateDoubtTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtQuestion.trim()) return;
    const newThread: DiscussionThread = {
      id: `th-${Date.now()}`,
      studentName: 'Tasnim Mahi (You)',
      batchTag: 'IELTS Batch 18',
      moduleRef: `${doubtCategory} • ${doubtModule}`,
      question: doubtQuestion.trim(),
      bnQuestion: 'আপনার প্রশ্নটি টিচিং অ্যাসিস্ট্যান্ট (TA) টিমের কাছে পাঠানো হয়েছে।',
      taName: 'TA Support Desk',
      taRole: 'Auto-Assigned Mentor Queue',
      taReply:
        'Thank you, Tasnim! Ticket #TA-9042 has been logged. Our Teaching Assistant on duty will post an annotated solution within 20 minutes.',
      upvotes: 1,
      resolved: true,
      timeAgo: 'Just now',
    };
    setThreads((prev) => [newThread, ...prev]);
    setDoubtQuestion('');
    setTicketSubmittedToast(true);
    setTimeout(() => setTicketSubmittedToast(false), 3500);
  };

  return (
    <section
      id="eduteact-community-certificate"
      className={
        embeddedMode
          ? 'w-full'
          : modeFilter === 'footer_only'
          ? 'w-full'
          : 'w-full pt-10 sm:pt-12 bg-white border-t border-slate-200/80'
      }
    >
      {modeFilter !== 'footer_only' && (
      <div className={embeddedMode ? 'space-y-8' : 'max-w-7xl mx-auto px-4 sm:px-6 space-y-12 pb-14'}>
        {/* Section Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold">
            <MessageSquare size={13} />
            <span>
              {modeFilter === 'certificate'
                ? 'Gamification Badges & QR-Verified Course Certificate'
                : modeFilter === 'community'
                ? '24/7 Teaching Assistant Doubt-Solving Forum & Support Ticket'
                : '5 & 6. Community Doubt-Solving Forum, Gamification & QR Certificate'}
            </span>
          </div>
          <EditableText
            as="h2"
            defaultValue={
              modeFilter === 'certificate'
                ? 'Official QR-Verified Course Completion Certificate & Earned Badges'
                : title ||
                  '24/7 Teaching Assistant Doubt-Solving Forum & QR-Verified Course Certificate'
            }
            className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900"
          />
          <EditableText
            as="p"
            defaultValue={
              modeFilter === 'certificate'
                ? 'কোর্সের সব মডিউল ও মক টেস্ট সম্পন্ন করে ভেরিফাইড QR কোড সার্টিফিকেট ডাউনলোড করুন এবং সরাসরি LinkedIn প্রোফাইলে শেয়ার করুন।'
                : subtitle ||
                  'যেকোনো লেসনে বুঝতে সমস্যা হলে সরাসরি মেন্টর ও টিচিং অ্যাসিস্ট্যান্টদের প্রশ্ন করুন এবং কোর্স শেষে QR কোড ভেরিফাইড সার্টিফিকেট ডাউনলোড করে LinkedIn-এ শেয়ার করুন।'
            }
            className="text-xs sm:text-sm text-slate-600 max-w-3xl"
          />
        </div>

        {/* 5. COMMUNITY & DOUBT-SOLVING Q&A + DIRECT TA TICKET FORM */}
        {modeFilter !== 'certificate' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Lesson-Specific Q&A Thread & Upvoting (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl border border-slate-200/90 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Batch 18 Peer &amp; Mentor Q&amp;A Thread
                </h3>
                <p className="text-xs text-slate-500">
                  শিক্ষার্থীদের প্রশ্ন এবং মেন্টরদের ভেরিফাইড উত্তরসমূহ
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                Avg. TA Reply: 18 mins
              </span>
            </div>

            <div className="space-y-4">
              {threads.map((item) => {
                const isUpvoted = upvotedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-slate-900">
                          {item.studentName}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700">
                          {item.moduleRef}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {item.timeAgo}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                        {item.question}
                      </p>
                      <p className="text-[11px] text-slate-500">{item.bnQuestion}</p>
                    </div>

                    {/* TA / Mentor Verified Answer Box */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold text-emerald-900 flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-600" />
                          {item.taName} • {item.taRole}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700">
                          Verified Solution ✓
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {item.taReply}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => handleUpvote(item.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition flex items-center gap-1.5 cursor-pointer ${
                          isUpvoted
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <ThumbsUp size={13} />
                        <span>Helpful ({item.upvotes})</span>
                      </button>

                      <span className="text-[11px] font-semibold text-slate-400">
                        Batch 18 Discussion
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Direct Mentor / TA Support Ticket Form (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-md p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: royalIndigo }}
              >
                <Headphones size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Direct TA &amp; Mentor Support Ticket
                </h3>
                <p className="text-[11px] text-slate-500">
                  সরাসরি টিচিং অ্যাসিস্ট্যান্টের কাছে কোর্স বা টেকনিক্যাল সমস্যার কথা জানান
                </p>
              </div>
            </div>

            {ticketSubmittedToast && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>
                  Your question has been posted to the live thread &amp; assigned to a TA!
                </span>
              </div>
            )}

            <form onSubmit={handleCreateDoubtTicket} className="space-y-3.5">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Ticket Type (সমস্যার ধরন)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Academic Doubt', 'Technical Support'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setDoubtCategory(cat)}
                      className={`py-2 px-3 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                        doubtCategory === cat
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-900'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Select Module / Lesson (কোন লেসনে সমস্যা?)
                </label>
                <select
                  value={doubtModule}
                  onChange={(e) => setDoubtModule(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Module 01 • Reading Passage Traps">
                    Module 01 • Reading Passage Traps
                  </option>
                  <option value="Module 02 • Writing Task 2">
                    Module 02 • Writing Task 2 Structure
                  </option>
                  <option value="Module 03 • Speaking Part 2 Cue Cards">
                    Module 03 • Speaking Part 2 Cue Cards
                  </option>
                  <option value="Video Player / PDF Download Issue">
                    Video Player / PDF Download Issue
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Describe Your Doubt or Question (বাংলা বা ইংরেজিতে লিখুন)
                </label>
                <textarea
                  rows={4}
                  required
                  value={doubtQuestion}
                  onChange={(e) => setDoubtQuestion(e.target.value)}
                  placeholder="Example: ভাইয়া, Writing Task 2-তে কি 4টা প্যারাগ্রাফ লেখা ভালো নাকি 5টা প্যারাগ্রাফ?"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-extrabold text-white shadow-md hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: royalIndigo }}
              >
                <Send size={14} />
                <span>Submit Question to TA Desk</span>
              </button>
            </form>
          </div>
        </div>
        )}

        {/* 6. GAMIFICATION & QR-VERIFIED COURSE CERTIFICATE UNLOCK CARD */}
        {modeFilter !== 'community' && (
        <div
          className="rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-400/30"
          style={{
            background: `linear-gradient(135deg, ${darkSlate} 0%, #1E1B4B 60%, #312E81 100%)`,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info & Badges (6 Cols) */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold">
                <Award size={14} />
                <span>6. Gamification &amp; Verifiable QR Credential</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Unlock Your Official QR-Verified Course Completion Certificate
              </h3>

              <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
                ১০০% মডিউল ও মক টেস্ট সম্পন্ন করার সাথে সাথেই আপনার নামে ইউনিক QR কোড ও ভেরিফিকেশন আইডি সহ অফিশিয়াল সার্টিফিকেট আনলক হয়ে যাবে, যা সরাসরি সিভি এবং LinkedIn প্রোফাইলে যুক্ত করতে পারবেন।
              </p>

              {/* Earned Gamification Badges Row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    icon: Flame,
                    name: '7-Day Streak 🔥',
                    sub: 'Unlocked',
                    color: 'text-amber-400',
                  },
                  {
                    icon: Trophy,
                    name: 'Quiz Master 🏆',
                    sub: 'Top 5% Rank',
                    color: 'text-emerald-400',
                  },
                  {
                    icon: Star,
                    name: 'Top Contributor ⭐',
                    sub: '14 Peer Helps',
                    color: 'text-indigo-300',
                  },
                ].map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.name}
                      className="p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs"
                    >
                      <Icon size={18} className={badge.color} />
                      <div className="text-xs font-extrabold mt-1.5">{badge.name}</div>
                      <div className="text-[10px] text-indigo-200">{badge.sub}</div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Toggle to Preview 68% In-Progress vs 100% Unlocked State */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setSimulate100Percent(!simulate100Percent)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-extrabold text-white flex items-center gap-2 cursor-pointer"
                >
                  {simulate100Percent ? <Unlock size={14} /> : <Lock size={14} />}
                  <span>
                    {simulate100Percent
                      ? 'Showing: 100% Completed Certificate (Click to test 68% Lock)'
                      : 'Showing: 68% Progress Lock (Click to Unlock 100% Preview)'}
                  </span>
                </button>
              </div>
            </div>

            {/* Right: Verifiable Certificate Replica Card (6 Cols) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl bg-white text-slate-900 p-6 sm:p-7 shadow-2xl border-4 border-amber-300/80 space-y-5">
                {!simulate100Percent && (
                  <div className="absolute inset-0 z-10 rounded-xl bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                    <Lock size={32} className="text-amber-400" />
                    <h4 className="text-base font-black">
                      Complete Remaining 8 Modules to Unlock Certificate (68% Done)
                    </h4>
                    <p className="text-xs text-slate-300 max-w-sm">
                      Finish Modules 19–26 to activate your verifiable PDF credential and 1-click LinkedIn badge.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSimulate100Percent(true)}
                      className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-extrabold cursor-pointer"
                    >
                      Simulate 100% Completion Now
                    </button>
                  </div>
                )}

                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: royalIndigo }}
                    >
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600">
                        EduTeact Bangladesh • Official Credential
                      </div>
                      <div className="text-sm font-black text-slate-900">
                        Certificate of Academic Excellence
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono font-bold text-slate-500">
                      ID: ET-2025-88412-BD
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck size={11} />
                      QR Verified
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-center py-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    This is proudly presented to
                  </div>
                  <div className="text-2xl font-black tracking-tight text-slate-900">
                    Tasnim Mahi (তাসনিম মাহি)
                  </div>
                  <p className="text-xs text-slate-600 max-w-md mx-auto pt-1">
                    For successfully completing all 26 modules, live workshops, and mock assessments of{' '}
                    <span className="font-extrabold text-slate-900">
                      IELTS Intensive Batch 18 (Academic Track)
                    </span>{' '}
                    with a 92% attendance record.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
                  <div>
                    <div className="font-black text-slate-900">Sadman Sakib</div>
                    <div className="text-[10px] text-slate-500">
                      Lead Instructor • IELTS Band 8.5
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">
                    <QrCode size={24} className="text-slate-800" />
                    <div className="text-left">
                      <div className="text-[9px] font-extrabold uppercase text-slate-500">
                        Scan to Verify
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-900">
                        eduteact.bd/v/88412
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download PDF & Share on LinkedIn CTAs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCertificatePreviewOpen(true)}
                    className="py-2.5 px-4 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    style={{ backgroundColor: royalIndigo }}
                  >
                    <Download size={14} />
                    <span>Download Certificate (PDF)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLinkedInShared(true)}
                    className="py-2.5 px-4 rounded-xl text-xs font-extrabold bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Share2 size={14} />
                    <span>
                      {linkedInShared ? 'Added to LinkedIn Profile ✓' : 'Share on LinkedIn'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
      )}

      {/* Portal Footer */}
      {!embeddedMode && (
      <footer
        className="w-full py-8 px-4 sm:px-6 text-slate-400 text-xs border-t border-slate-800"
        style={{ backgroundColor: darkSlate }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: royalIndigo }}
            >
              <GraduationCap size={15} />
            </div>
            <span className="font-extrabold text-white">
              EduTeact Student Portal (স্টুডেন্ট ড্যাশবোর্ড)
            </span>
            <span>•</span>
            <span>Low-Latency BD CDN Video &amp; Mock Exam Engine</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Helpline: 09612-884400 (9 AM – 11 PM)</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">SSL Secured Portal</span>
          </div>
        </div>
      </footer>
      )}

      {/* High-Res Certificate Modal */}
      {isCertificatePreviewOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 size={24} />
            </div>
            <h4 className="text-lg font-black text-slate-900">
              Official PDF Certificate Generated!
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              আপনার সার্টিফিকেট (<span className="font-mono font-bold">ET-2025-88412-BD.pdf</span>) ভেরিফাইড QR কোডসহ প্রস্তুত করা হয়েছে।
            </p>
            <button
              type="button"
              onClick={() => setIsCertificatePreviewOpen(false)}
              className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
              style={{ backgroundColor: royalIndigo }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
export default EduTeactStudentCommunityCertificateFooterSection;
