import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  PlayCircle,
  FileCheck2,
  FolderDown,
  MessageSquare,
  Award,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Trophy,
  Star,
  Calendar,
  Video,
  ArrowRight,
  Sparkles,
  BookOpen,
  Users,
  Check,
  X,
  ExternalLink,
  BellRing,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';
import { EduTeactStudentNavbar } from './EduTeactStudentNavbar';
import { EduTeactStudentCoursePlayerSection } from './EduTeactStudentCoursePlayerSection';
import { EduTeactStudentExamsResourcesSection } from './EduTeactStudentExamsResourcesSection';
import { EduTeactStudentCommunityCertificateFooterSection } from './EduTeactStudentCommunityCertificateFooterSection';

export interface EduTeactStudentOverviewWorkspaceSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface ActionItem {
  id: string;
  title: string;
  bnSubtitle: string;
  type: 'assignment' | 'quiz' | 'live';
  dueText: string;
  urgency: 'amber' | 'emerald' | 'indigo';
  points: string;
  completed: boolean;
  moduleRef: string;
}

const INITIAL_ACTION_ITEMS: ActionItem[] = [
  {
    id: 'act-1',
    title: 'Submit Writing Task 2 Essay (Opinion vs. Discussion)',
    bnSubtitle: '২৫০ শব্দের এসে লিখে PDF বা ডক ফাইল আপলোড করুন — মেন্টর মার্কিং করবেন',
    type: 'assignment',
    dueText: 'Due Tonight, 11:59 PM',
    urgency: 'amber',
    points: '+50 XP',
    completed: false,
    moduleRef: 'Module 04 • Lesson 02',
  },
  {
    id: 'act-2',
    title: 'Attempt Mock Test #07: Cambridge Reading Passage 1–3',
    bnSubtitle: '৪০টি প্রশ্ন • ৬০ মিনিট টাইমার • তাৎক্ষণিক ব্যান্ড স্কোর ও ব্যাখ্যা',
    type: 'quiz',
    dueText: 'Closes Tomorrow, 8:00 PM',
    urgency: 'amber',
    points: '+100 XP',
    completed: false,
    moduleRef: 'Mock Exam Portal',
  },
  {
    id: 'act-3',
    title: 'Download Lecture Sheet 08: 120 High-Scoring Lexical Idioms',
    bnSubtitle: 'স্পিকিং পার্ট ২ এবং রাইটিং টাস্ক ২-এর জন্য ভোকাবুলারি শিট',
    type: 'live',
    dueText: 'New Resource Unlocked',
    urgency: 'indigo',
    points: '+20 XP',
    completed: true,
    moduleRef: 'Resource Vault',
  },
];

export const EduTeactStudentOverviewWorkspaceSection: React.FC<
  EduTeactStudentOverviewWorkspaceSectionProps
> = ({ title, subtitle, primaryColor }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [activeNavTab, setActiveNavTab] = useState<
    'overview' | 'player' | 'exams' | 'resources' | 'community' | 'certificate'
  >('overview');
  const [countdownSeconds, setCountdownSeconds] = useState<number>(2 * 3600 + 14 * 60 + 38);
  const [actionItems, setActionItems] = useState<ActionItem[]>(INITIAL_ACTION_ITEMS);
  const [isLiveClassModalOpen, setIsLiveClassModalOpen] = useState<boolean>(false);
  const [selectedTaskModal, setSelectedTaskModal] = useState<ActionItem | null>(null);
  const [submissionText, setSubmissionText] = useState<string>('');
  const [batchName, setBatchName] = useState<string>(
    'IELTS Intensive Batch 18 — Evening Shift'
  );

  const royalIndigo = primaryColor || '#4F46E5';
  const darkSlate = '#0F172A';
  const emeraldGreen = '#10B981';
  const warmAmber = '#F59E0B';

  // Live class countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 7200));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Listen for navbar batch change or tab switch events
  useEffect(() => {
    const handleBatchChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.name) {
        setBatchName(detail.name);
      }
    };
    const handleSwitchTab = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.tab) {
        setActiveNavTab(detail.tab);
      }
    };
    window.addEventListener('eduteact-student-batch-change', handleBatchChange);
    window.addEventListener('eduteact-student-switch-tab', handleSwitchTab);
    return () => {
      window.removeEventListener('eduteact-student-batch-change', handleBatchChange);
      window.removeEventListener('eduteact-student-switch-tab', handleSwitchTab);
    };
  }, []);

  const hours = Math.floor(countdownSeconds / 3600);
  const minutes = Math.floor((countdownSeconds % 3600) / 60);
  const seconds = countdownSeconds % 60;

  const completedModulesCount = 18;
  const totalModulesCount = 26;
  const completedTasksCount = actionItems.filter((i) => i.completed).length;
  const overallPercentage = Math.min(
    100,
    Math.round(((completedModulesCount + completedTasksCount) / (totalModulesCount + 2)) * 100)
  );

  const jumpToSection = (
    tabId: 'overview' | 'player' | 'exams' | 'resources' | 'community' | 'certificate'
  ) => {
    setActiveNavTab(tabId);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('eduteact-student-sidebar-tab-changed', {
          detail: { tab: tabId },
        })
      );
    }
  };

  const toggleActionComplete = (id: string) => {
    setActionItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskModal) return;
    setActionItems((prev) =>
      prev.map((item) =>
        item.id === selectedTaskModal.id ? { ...item, completed: true } : item
      )
    );
    setSubmissionText('');
    setSelectedTaskModal(null);
  };

  return (
    <section
      id="eduteact-portal-workspace"
      className="w-full p-0 m-0"
      style={{ backgroundColor: '#F8FAFC' }}
    >
      <div className="w-full max-w-none m-0 p-0">
        {/* Full-Bleed SaaS Shell Container with Left Collapsible Dark Slate Sidebar + Right Dashboard Navbar & Content */}
        <div className="w-full bg-white flex flex-col lg:flex-row min-h-screen">
          {/* LEFT COLLAPSIBLE DARK SLATE SIDEBAR (#0F172A) */}
          <aside
            className={`flex flex-col justify-between transition-all duration-300 text-white shrink-0 border-b lg:border-b-0 lg:border-r border-slate-800 ${
              isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
            }`}
            style={{ backgroundColor: darkSlate }}
          >
            <div className="p-4 space-y-5">
              {/* Sidebar Brand & Collapse Toggle */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800/90">
                {!isSidebarCollapsed && (
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 block">
                      EduTeact Student
                    </span>
                    <span className="text-xs font-bold text-slate-300">
                      লার্নিং ড্যাশবোর্ড মেনু
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="hidden lg:flex p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 transition cursor-pointer ml-auto"
                  title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                >
                  {isSidebarCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
                </button>
              </div>

              {/* Navigation Menu Items */}
              <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1.5">
                {(
                  [
                    {
                      id: 'overview',
                      label: 'Dashboard Overview',
                      bn: 'হোম ও প্রোগ্রেস',
                      icon: LayoutDashboard,
                      badge: 'Live',
                    },
                    {
                      id: 'player',
                      label: 'Interactive Player',
                      bn: 'রেকর্ডেড ও লাইভ ক্লাস',
                      icon: PlayCircle,
                      badge: '26 Lessons',
                    },
                    {
                      id: 'exams',
                      label: 'Quizzes & Mock Tests',
                      bn: 'মক টেস্ট ও লিডারবোর্ড',
                      icon: FileCheck2,
                      badge: '2 Due',
                    },
                    {
                      id: 'resources',
                      label: 'Lecture Sheet Vault',
                      bn: 'পিডিএফ নোট ও স্লাইড',
                      icon: FolderDown,
                      badge: '18 PDFs',
                    },
                    {
                      id: 'community',
                      label: 'Q&A & Doubt Solver',
                      bn: 'মেন্টর সাপোর্ট ও প্রশ্ন',
                      icon: MessageSquare,
                      badge: '24/7 TA',
                    },
                    {
                      id: 'certificate',
                      label: 'Certificate & Badges',
                      bn: 'সার্টিফিকেট ও গ্যামিফিকেশন',
                      icon: Award,
                      badge: 'QR Ready',
                    },
                  ] as const
                ).map((nav) => {
                  const Icon = nav.icon;
                  const isActive = activeNavTab === nav.id;
                  return (
                    <button
                      key={nav.id}
                      type="button"
                      onClick={() => jumpToSection(nav.id)}
                      className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-left transition cursor-pointer ${
                        isActive
                          ? 'text-white shadow-md'
                          : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                      }`}
                      style={isActive ? { backgroundColor: royalIndigo } : undefined}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon size={17} className="shrink-0" />
                        {!isSidebarCollapsed && (
                          <div className="truncate">
                            <div className="text-xs font-extrabold leading-tight truncate">
                              {nav.label}
                            </div>
                            <div className="text-[10px] opacity-75 truncate">
                              {nav.bn}
                            </div>
                          </div>
                        )}
                      </div>
                      {!isSidebarCollapsed && nav.badge && (
                        <span
                          className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold shrink-0 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {nav.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Gamification & Bandwidth Saver Card in Sidebar */}
            {!isSidebarCollapsed && (
              <div className="p-4 m-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <Flame size={12} className="fill-amber-400" />
                    Weekly XP Goal
                  </span>
                  <span className="text-[11px] font-black text-white">
                    1,450 / 2,000 XP
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: '74%', backgroundColor: emeraldGreen }}
                  />
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed">
                  আর মাত্র ২টি কুইজ শেষ করলেই পাবেন{' '}
                  <span className="text-amber-300 font-bold">"Quiz Master 🏆"</span>{' '}
                  ব্যাজ!
                </p>
              </div>
            )}
          </aside>

          {/* RIGHT SIDE: INTEGRATED DASHBOARD NAVBAR + DYNAMIC CONTENT CANVAS (#F8FAFC) */}
          <div className="flex-1 flex flex-col bg-[#F8FAFC] min-w-0">
            {/* Dashboard Top Navbar integrated directly inside the right-side dashboard area */}
            <EduTeactStudentNavbar
              title="EduTeact Student"
              subtitle="IELTS Intensive Batch 18 (Evening Shift) • Low-Latency Bangladeshi Student Learning Portal"
              variant="varient_1"
              primaryColor={royalIndigo}
            />

            {/* Main Right Content Area */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 min-w-0">
            {/* Top Active Page Breadcrumb & Quick Switch Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <span className="text-slate-400">Student Portal</span>
                <span>/</span>
                <span
                  className="px-2.5 py-1 rounded-lg text-white font-extrabold shadow-2xs"
                  style={{ backgroundColor: royalIndigo }}
                >
                  {activeNavTab === 'overview' && 'Dashboard Overview (হোম ও প্রোগ্রেস)'}
                  {activeNavTab === 'player' && 'Interactive Course Player (রেকর্ডেড ও লাইভ ক্লাস)'}
                  {activeNavTab === 'exams' && 'Quizzes & Mock Tests (মক টেস্ট ও লিডারবোর্ড)'}
                  {activeNavTab === 'resources' && 'Lecture Sheet Vault (পিডিএফ নোট ও স্লাইড)'}
                  {activeNavTab === 'community' && 'Q&A & Doubt Solver (মেন্টর সাপোর্ট ও প্রশ্ন)'}
                  {activeNavTab === 'certificate' && 'Certificate & Badges (সার্টিফিকেট ও গ্যামিফিকেশন)'}
                </span>
              </div>

              {activeNavTab !== 'overview' && (
                <button
                  type="button"
                  onClick={() => jumpToSection('overview')}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-extrabold inline-flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                >
                  <ChevronLeft size={14} />
                  <span>Back to Dashboard Overview</span>
                </button>
              )}
            </div>

            {activeNavTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* 1. WELCOME HEADER & ACTIVE BATCH STATUS */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold text-white"
                    style={{ backgroundColor: royalIndigo }}
                  >
                    <Sparkles size={11} />
                    Active Batch: {batchName}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 size={11} />
                    Mentor: Sadman Sakib (IELTS 8.5)
                  </span>
                </div>

                <EditableText
                  as="h1"
                  defaultValue={title || 'Welcome back, Tasnim Mahi 👋'}
                  className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 pt-1"
                />
                <EditableText
                  as="p"
                  defaultValue={
                    subtitle ||
                    'আপনার আজকের লার্নিং টার্গেট: রাইটিং টাস্ক ২ লাইভ ক্লাসে অংশ নেওয়া এবং মক টেস্ট ০৭ সম্পন্ন করা।'
                  }
                  className="text-xs sm:text-sm text-slate-600"
                />
              </div>

              {/* Gamification Badges Strip */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <div className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center gap-2">
                  <Flame size={18} className="text-amber-500 fill-amber-500" />
                  <div>
                    <div className="text-xs font-black text-amber-900">
                      7-Day Streak 🔥
                    </div>
                    <div className="text-[10px] font-semibold text-amber-700">
                      Top 8% Consistency
                    </div>
                  </div>
                </div>

                <div className="px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-200/80 flex items-center gap-2">
                  <Trophy size={18} className="text-indigo-600" />
                  <div>
                    <div className="text-xs font-black text-indigo-900">
                      Quiz Master 🏆
                    </div>
                    <div className="text-[10px] font-semibold text-indigo-700">
                      Rank #14 of 420
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. NEXT LIVE CLASS BANNER WITH DYNAMIC COUNTDOWN TIMER */}
            <div
              className="rounded-2xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden border border-indigo-400/30"
              style={{
                background: `linear-gradient(135deg, ${darkSlate} 0%, #1E1B4B 55%, ${royalIndigo} 100%)`,
              }}
            >
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      Next Live Class • Tonight 8:00 PM BST
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/10 text-indigo-200 border border-white/15">
                      Module 04 • Academic Writing Task 2
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
                    Live Masterclass: Band 8.0 Argumentative Essay Blueprint &amp; Live Script Checking
                  </h2>
                  <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
                    আজকের লাইভ ক্লাসে সাদমান সাকিব ভাইয়া সরাসরি শিক্ষার্থীদের লেখা Essay চেক করবেন এবং Lexical Resource বাড়ানোর কৌশল দেখাবেন।
                  </p>
                </div>

                {/* Countdown + 1-Click Join Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                  <div className="flex items-center gap-2 bg-slate-950/60 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/15">
                    <Clock size={16} className="text-amber-400 shrink-0" />
                    <div className="text-left">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-slate-300">
                        Starts In (সময় বাকি)
                      </div>
                      <div className="text-sm sm:text-base font-black font-mono tracking-wider text-amber-300">
                        {String(hours).padStart(2, '0')}h : {String(minutes).padStart(2, '0')}m :{' '}
                        {String(seconds).padStart(2, '0')}s
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsLiveClassModalOpen(true)}
                    className="px-5 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm text-slate-950 shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
                    style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}
                  >
                    <Video size={17} />
                    <span>Join Live Class (Zoom / Meet)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 3. LEARNING PROGRESS METRICS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Overall Course Progress Gauge */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      Overall Course Progress
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                      {overallPercentage}% Completed
                    </h3>
                  </div>
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-xs shadow-sm"
                    style={{ backgroundColor: royalIndigo }}
                  >
                    18/26
                  </div>
                </div>

                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${overallPercentage}%`,
                      backgroundColor: royalIndigo,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>18/26 Modules Completed</span>
                  <button
                    type="button"
                    onClick={() => jumpToSection('player')}
                    className="text-indigo-600 font-extrabold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Resume Lesson</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Live Attendance Stat */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      Attendance &amp; Participation
                    </span>
                    <h3 className="text-2xl font-black text-emerald-600 mt-0.5">
                      Live Attendance: 92%
                    </h3>
                  </div>
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-emerald-700 bg-emerald-50 border border-emerald-200"
                  >
                    <CheckCircle2 size={20} />
                  </div>
                </div>

                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: '92%', backgroundColor: emeraldGreen }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Attended 22 of 24 Live Sessions</span>
                  <span className="text-emerald-700 font-extrabold">
                    Certificate Eligible ✓
                  </span>
                </div>
              </div>

              {/* Avg Quiz Score & Mock Band */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      Quiz &amp; Mock Performance
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                      Avg. Quiz Score: 8.5/10
                    </h3>
                  </div>
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-amber-600 bg-amber-50 border border-amber-200">
                    <Star size={20} className="fill-amber-500 text-amber-500" />
                  </div>
                </div>

                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: '85%', backgroundColor: warmAmber }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Predicted IELTS Band: 7.5–8.0</span>
                  <button
                    type="button"
                    onClick={() => jumpToSection('exams')}
                    className="text-amber-600 font-extrabold hover:underline cursor-pointer"
                  >
                    View Leaderboard →
                  </button>
                </div>
              </div>
            </div>

            {/* 4. PENDING ACTION ITEMS (DEADLINES & TASKS) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      Pending Action Items &amp; Deadlines (করণীয় তালিকা)
                    </h3>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-extrabold text-amber-900"
                      style={{ backgroundColor: '#FEF3C7' }}
                    >
                      {actionItems.filter((a) => !a.completed).length} Pending
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Complete your weekly writing submissions and mock tests on time to maintain your 7-day study streak.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => jumpToSection('exams')}
                  className="text-xs font-extrabold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  <span>Open Full Assessment Center</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div className="space-y-3">
                {actionItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      item.completed
                        ? 'bg-emerald-50/40 border-emerald-200/80'
                        : 'bg-slate-50/70 hover:bg-white border-slate-200/90'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <button
                        type="button"
                        onClick={() => toggleActionComplete(item.id)}
                        className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center border transition cursor-pointer shrink-0 ${
                          item.completed
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-white border-slate-300 hover:border-indigo-500'
                        }`}
                      >
                        {item.completed && <Check size={14} />}
                      </button>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-sm font-extrabold ${
                              item.completed
                                ? 'line-through text-slate-400'
                                : 'text-slate-900'
                            }`}
                          >
                            {item.title}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                            {item.moduleRef}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-50 text-emerald-700">
                            {item.points}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">{item.bnSubtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-extrabold ${
                          item.completed
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.urgency === 'amber'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        <Clock size={12} />
                        {item.completed ? 'Completed ✓' : item.dueText}
                      </span>

                      {!item.completed && (
                        <button
                          type="button"
                          onClick={() =>
                            item.type === 'quiz'
                              ? jumpToSection('exams')
                              : setSelectedTaskModal(item)
                          }
                          className="px-3.5 py-2 rounded-xl text-xs font-extrabold text-white shadow-xs hover:opacity-95 transition cursor-pointer"
                          style={{ backgroundColor: royalIndigo }}
                        >
                          {item.type === 'assignment' ? 'Submit Now' : 'Start Quiz'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
              </div>
            )}

            {/* VIEW 2: INTERACTIVE COURSE PLAYER */}
            {activeNavTab === 'player' && (
              <div className="animate-in fade-in duration-200">
                <EduTeactStudentCoursePlayerSection
                  title="Interactive Classroom Player — Watch in 360p/720p/1080p & Save Timestamped Notes"
                  subtitle="মোবাইল ডাটা সাশ্রয়ের জন্য ৩৬০পি লো-ডাটা মোড থেকে ১০৮০পি ফুল এইচডি এবং ১.২৫x–২x স্পিড কন্ট্রোলসহ প্রতিটি লেসনের সাথেই থাকছে পিডিএফ স্লাইড ও ব্যক্তিগত নোটপ্যাড।"
                  variant="varient_1"
                  primaryColor={royalIndigo}
                  embeddedMode
                />
              </div>
            )}

            {/* VIEW 3: QUIZZES, MOCK TESTS & LEADERBOARD */}
            {activeNavTab === 'exams' && (
              <div className="animate-in fade-in duration-200">
                <EduTeactStudentExamsResourcesSection
                  title="Timed Mock Assessments & Batch 18 Live Leaderboard"
                  subtitle="টাইমারসহ লাইভ এমসিকিউ মক টেস্টে অংশ নিয়ে তাৎক্ষণিক ব্যাখ্যাসহ ফলাফল দেখুন এবং ব্যাচের লিডারবোর্ডে নিজের অবস্থান যাচাই করুন।"
                  variant="varient_1"
                  primaryColor={royalIndigo}
                  embeddedMode
                  modeFilter="exams"
                />
              </div>
            )}

            {/* VIEW 4: LECTURE SHEET & PDF RESOURCE VAULT */}
            {activeNavTab === 'resources' && (
              <div className="animate-in fade-in duration-200">
                <EduTeactStudentExamsResourcesSection
                  title="Categorized Lecture Sheet & PDF Resource Vault"
                  subtitle="ক্লাস নোটস, শর্টকাট ফর্মুলা শিট এবং বিগত বছরের প্রশ্নপত্র ক্যাটাগরি অনুযায়ী ফিল্টার করে এক ক্লিকেই পিডিএফ ডাউনলোড করুন।"
                  variant="varient_1"
                  primaryColor={royalIndigo}
                  embeddedMode
                  modeFilter="resources"
                />
              </div>
            )}

            {/* VIEW 5: Q&A DOUBT-SOLVING FORUM & TA TICKET */}
            {activeNavTab === 'community' && (
              <div className="animate-in fade-in duration-200">
                <EduTeactStudentCommunityCertificateFooterSection
                  title="24/7 Teaching Assistant Doubt-Solving Forum & Support Desk"
                  subtitle="যেকোনো লেসনে বুঝতে সমস্যা হলে সরাসরি মেন্টর ও টিচিং অ্যাসিস্ট্যান্টদের প্রশ্ন করুন এবং সহপাঠীদের প্রশ্নের উত্তর দেখুন।"
                  variant="varient_1"
                  primaryColor={royalIndigo}
                  embeddedMode
                  modeFilter="community"
                />
              </div>
            )}

            {/* VIEW 6: GAMIFICATION BADGES & QR-VERIFIED CERTIFICATE */}
            {activeNavTab === 'certificate' && (
              <div className="animate-in fade-in duration-200">
                <EduTeactStudentCommunityCertificateFooterSection
                  title="Official QR-Verified Course Completion Certificate & Earned Badges"
                  subtitle="কোর্সের সব মডিউল ও মক টেস্ট সম্পন্ন করে ভেরিফাইড QR কোড সার্টিফিকেট ডাউনলোড করুন এবং সরাসরি LinkedIn প্রোফাইলে শেয়ার করুন।"
                  variant="varient_1"
                  primaryColor={royalIndigo}
                  embeddedMode
                  modeFilter="certificate"
                />
              </div>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Live Class Zoom/Meet Launch Modal */}
      {isLiveClassModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div
              className="p-6 text-white flex items-center justify-between"
              style={{ backgroundColor: darkSlate }}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                  <Video size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                    One-Click Live Classroom Bridge
                  </span>
                  <h3 className="text-base font-black">
                    IELTS Batch 18 — Zoom / Google Meet Room
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLiveClassModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-500">Topic:</span>
                  <span className="font-extrabold text-slate-900">
                    Module 04: Writing Task 2 Argumentative Essay
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-500">Instructor:</span>
                  <span className="font-extrabold text-slate-900">
                    Sadman Sakib (IELTS Band 8.5)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-500">Attendance Auto-Log:</span>
                  <span className="font-extrabold text-emerald-600">
                    Verified (#ET-88412 • Tasnim Mahi)
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                ক্লাসে জয়েন করার সাথে সাথে আপনার উপস্থিতি (Attendance) স্বয়ংক্রিয়ভাবে ৯২% থেকে আপডেট হয়ে যাবে। লো-ব্যান্ডউইথ কানেকশনের জন্য জুম লাইট মোড চালু আছে।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsLiveClassModalOpen(false);
                    jumpToSection('player');
                  }}
                  className="py-3 px-4 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-2 cursor-pointer"
                  style={{ backgroundColor: royalIndigo }}
                >
                  <ExternalLink size={14} />
                  <span>Launch Embedded Live Stream</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsLiveClassModalOpen(false)}
                  className="py-3 px-4 rounded-xl text-xs font-extrabold bg-emerald-600 text-white flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BellRing size={14} />
                  <span>Send SMS Reminder 10m Before</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Item Quick Submission Modal */}
      {selectedTaskModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div
              className="p-5 text-white flex items-center justify-between"
              style={{ backgroundColor: royalIndigo }}
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-200">
                  {selectedTaskModal.moduleRef} • {selectedTaskModal.points}
                </span>
                <h3 className="text-base font-black mt-0.5">
                  {selectedTaskModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTaskModal(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleTaskSubmit} className="p-6 space-y-4">
              <p className="text-xs text-slate-600">{selectedTaskModal.bnSubtitle}</p>
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Paste Essay Response / Google Doc Link (আপনার উত্তর বা ড্রাইভ লিংক দিন)
                </label>
                <textarea
                  rows={4}
                  required
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Write your Task 2 introduction & body paragraphs here or paste your PDF link..."
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTaskModal(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white cursor-pointer"
                  style={{ backgroundColor: emeraldGreen }}
                >
                  Submit for Mentor Evaluation ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
export default EduTeactStudentOverviewWorkspaceSection;
