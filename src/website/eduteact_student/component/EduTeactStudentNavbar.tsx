import React, { useState } from 'react';
import {
  GraduationCap,
  Bell,
  ChevronDown,
  Flame,
  Trophy,
  Award,
  CheckCircle2,
  Sparkles,
  BookOpen,
  PlayCircle,
  FileText,
  HelpCircle,
  MessageSquare,
  Search,
  User,
  ShieldCheck,
  X,
  Calendar,
  Zap,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface EduTeactStudentNavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface BatchOption {
  id: string;
  name: string;
  bnName: string;
  shift: string;
  progress: number;
  mentor: string;
  status: string;
}

const ACTIVE_BATCHES: BatchOption[] = [
  {
    id: 'ielts-b18',
    name: 'IELTS Intensive Batch 18 — Evening Shift',
    bnName: 'আইইএলটিএস ইনটেনসিভ ব্যাচ ১৮ (সন্ধ্যা শিফট)',
    shift: 'Sat, Mon, Wed • 8:00 PM BST',
    progress: 68,
    mentor: 'Sadman Sakib (IELTS 8.5)',
    status: 'Active Cohort',
  },
  {
    id: 'bcs-b47',
    name: '47th BCS Preliminary Foundation Batch 09',
    bnName: '৪৭তম বিসিএস প্রিলিমিনারি ফাউন্ডেশন ব্যাচ ০৯',
    shift: 'Sun, Tue, Thu • 9:00 PM BST',
    progress: 42,
    mentor: 'farhan Kabir (BCS Admin Cadre)',
    status: 'Enrolled',
  },
  {
    id: 'fullstack-b12',
    name: 'Full-Stack MERN Career Track Batch 12',
    bnName: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট ক্যারিয়ার ট্র্যাক ১২',
    shift: 'Fri & Sat • 8:30 PM BST',
    progress: 85,
    mentor: 'Tanvir Hasan (Ex-ShopUp Eng)',
    status: 'Capstone Phase',
  },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Live Class Starting in 45 Mins!',
    bnText: 'রাত ৮:০০ টায় Module 04: Writing Task 2 Argumentative Essay লাইভ ক্লাস শুরু হবে।',
    time: '12m ago',
    type: 'live',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Writing Task 1 Script Evaluated (Band 7.5)',
    bnText: 'মেন্টর সাদমান সাকিব আপনার Bar Chart অ্যাসাইনমেন্ট চেক করে ফিডব্যাক দিয়েছেন।',
    time: '2h ago',
    type: 'feedback',
    unread: true,
  },
  {
    id: 'n3',
    title: 'Mock Test #06 Leaderboard Published',
    bnText: 'অভিনন্দন! আপনি ৪২০ জন শিক্ষার্থীর মধ্যে ১৪তম স্থান অর্জন করেছেন।',
    time: 'Yesterday',
    type: 'exam',
    unread: false,
  },
];

export const EduTeactStudentNavbar: React.FC<EduTeactStudentNavbarProps> = ({
  title,
  subtitle,
  primaryColor,
}) => {
  const [selectedBatch, setSelectedBatch] = useState<BatchOption>(ACTIVE_BATCHES[0]);
  const [activeTopTab, setActiveTopTab] = useState<string>('overview');
  const [isBatchDropdownOpen, setIsBatchDropdownOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const royalIndigo = primaryColor || '#4F46E5';
  const darkSlate = '#0F172A';
  const emeraldGreen = '#10B981';
  const warmAmber = '#F59E0B';

  const unreadCount = notifications.filter((n) => n.unread).length;

  React.useEffect(() => {
    const handleSidebarChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.tab) {
        setActiveTopTab(detail.tab);
      }
    };
    window.addEventListener('eduteact-student-sidebar-tab-changed', handleSidebarChange);
    return () => {
      window.removeEventListener('eduteact-student-sidebar-tab-changed', handleSidebarChange);
    };
  }, []);

  const scrollToPortalSection = (sectionId: string, tabName?: string) => {
    if (tabName) {
      setActiveTopTab(tabName);
    }
    if (typeof window !== 'undefined') {
      if (tabName) {
        window.dispatchEvent(
          new CustomEvent('eduteact-student-switch-tab', {
            detail: { tab: tabName, batchId: selectedBatch.id },
          })
        );
      }
      const el = document.getElementById('eduteact-portal-workspace');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSelectBatch = (batch: BatchOption) => {
    setSelectedBatch(batch);
    setIsBatchDropdownOpen(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('eduteact-student-batch-change', { detail: batch })
      );
    }
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className="w-full sticky top-0 z-40 shadow-sm">
      {/* Top Low-Latency Portal Status Bar */}
      <div
        className="w-full py-1.5 px-4 sm:px-6 text-white text-[11px] font-semibold border-b border-white/10"
        style={{ backgroundColor: darkSlate }}
      >
        <div className="w-full flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white"
              style={{ backgroundColor: emeraldGreen }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              BD CDN Edge Active (18ms)
            </span>
            <EditableText
              as="span"
              defaultValue={subtitle}
              className="text-slate-200 font-medium truncate"
            />
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-300">
            <span className="inline-flex items-center gap-1.5 font-bold text-amber-400">
              <Flame size={13} className="fill-amber-400 text-amber-400" />
              <span>7-Day Study Streak! 🔥</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="inline-flex items-center gap-1.5">
              <Trophy size={12} className="text-indigo-400" />
              <span>Batch Rank: #14 / 420 Students</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCircle2 size={12} />
              <span>Student ID: #ET-88412</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main SaaS Student Portal Top Navigation Bar */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-2.5">
        <div className="w-full flex items-center justify-between gap-3">
          {/* Left: Brand Identity + Quick Batch Switcher */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => scrollToPortalSection('eduteact-portal-workspace', 'overview')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
                style={{ backgroundColor: royalIndigo }}
              >
                <GraduationCap size={21} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <EditableText
                    as="span"
                    defaultValue={title || 'EduTeact Student'}
                    className="text-base sm:text-lg font-black tracking-tight text-slate-900"
                  />
                  <span className="px-1.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                    LMS v4.2
                  </span>
                </div>
                <p className="text-[10px] font-semibold text-slate-500 hidden sm:block">
                  স্টুডেন্ট লার্নিং পোর্টাল • Live Class &amp; Exam Hub
                </p>
              </div>
            </button>

            {/* Quick Batch Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsBatchDropdownOpen(!isBatchDropdownOpen);
                  setIsNotificationOpen(false);
                }}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/90 transition cursor-pointer text-left"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <div className="max-w-[150px] sm:max-w-[230px]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">
                    Active Batch Switcher
                  </div>
                  <div className="text-xs font-extrabold text-slate-800 truncate mt-0.5">
                    {selectedBatch.name}
                  </div>
                </div>
                <ChevronDown
                  size={14}
                  className={`text-slate-500 transition-transform ${
                    isBatchDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isBatchDropdownOpen && (
                <div className="absolute left-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      Your Enrolled Batches (আপনার ব্যাচসমূহ)
                    </span>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      3 Active
                    </span>
                  </div>
                  <div className="py-1 space-y-1">
                    {ACTIVE_BATCHES.map((batch) => {
                      const isSelected = batch.id === selectedBatch.id;
                      return (
                        <button
                          key={batch.id}
                          type="button"
                          onClick={() => handleSelectBatch(batch)}
                          className={`w-full p-2.5 rounded-xl text-left transition flex items-start justify-between gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-50/90 border border-indigo-200'
                              : 'hover:bg-slate-50 border border-transparent'
                          }`}
                        >
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-extrabold text-slate-900 truncate">
                                {batch.name}
                              </span>
                            </div>
                            <p className="text-[11px] font-medium text-slate-500 truncate">
                              {batch.bnName}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-0.5">
                              <span>{batch.shift}</span>
                              <span>•</span>
                              <span className="font-bold text-indigo-600">
                                {batch.progress}% Complete
                              </span>
                            </div>
                          </div>
                          {isSelected && (
                            <span
                              className="px-2 py-0.5 rounded-full text-[10px] font-extrabold text-white shrink-0"
                              style={{ backgroundColor: royalIndigo }}
                            >
                              Active
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center: Quick Portal Navigation Pills */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/70">
            {[
              { id: 'overview', label: 'Dashboard', icon: Sparkles, target: 'eduteact-portal-workspace' },
              { id: 'player', label: 'Course Player', icon: PlayCircle, target: 'eduteact-portal-workspace' },
              { id: 'exams', label: 'Quizzes & Ranks', icon: FileText, target: 'eduteact-portal-workspace' },
              { id: 'resources', label: 'PDF Vault', icon: BookOpen, target: 'eduteact-portal-workspace' },
              { id: 'community', label: 'Doubt Solver', icon: MessageSquare, target: 'eduteact-portal-workspace' },
              { id: 'certificate', label: 'Certificate', icon: Award, target: 'eduteact-portal-workspace' },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTopTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToPortalSection(item.target, item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-2xs font-extrabold'
                      : 'text-slate-700 hover:text-indigo-600 hover:bg-white/70'
                  }`}
                >
                  <Icon size={13} className="text-indigo-600" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Search, Gamification Streak, Notification Bell & Student Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Box */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80 w-48 focus-within:w-56 focus-within:border-indigo-400 focus-within:bg-white transition-all">
              <Search size={13} className="text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    scrollToPortalSection('eduteact-course-player', 'player');
                  }
                }}
                placeholder="Search lessons, PDF..."
                className="w-full bg-transparent text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            {/* Streak Badge */}
            <div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-extrabold"
              style={{
                backgroundColor: '#FFFBEB',
                borderColor: '#FDE68A',
                color: '#B45309',
              }}
              title="7-Day Consecutive Study Streak"
            >
              <Flame size={14} className="fill-amber-500 text-amber-500" />
              <span>7d</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsBatchDropdownOpen(false);
                }}
                className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200/70 text-slate-700 transition cursor-pointer"
                aria-label="Notifications"
              >
                <Bell size={17} />
                {unreadCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-black text-white flex items-center justify-center"
                    style={{ backgroundColor: warmAmber }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">
                        Student Alerts &amp; Class Updates
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        লাইভ ক্লাস ও অ্যাসাইনমেন্ট নোটিফিকেশন
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={markAllRead}
                      className="text-[10px] font-bold text-indigo-600 hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setIsNotificationOpen(false);
                          scrollToPortalSection('eduteact-portal-workspace', 'overview');
                        }}
                        className={`p-2.5 rounded-xl border transition cursor-pointer ${
                          item.unread
                            ? 'bg-indigo-50/60 border-indigo-200/80'
                            : 'bg-slate-50/70 border-slate-200/60'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-extrabold text-slate-900">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                          {item.bnText}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Student Profile Pill */}
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Tasnim Mahi"
                className="w-7 h-7 rounded-lg object-cover border border-emerald-400"
              />
              <div className="text-left hidden sm:block">
                <div className="text-[11px] font-extrabold leading-none">
                  Tasnim Mahi
                </div>
                <div className="text-[9px] text-emerald-400 font-bold mt-0.5">
                  Target: Band 8.0
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Student Profile & Gamification Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div
              className="p-6 text-white flex items-center justify-between"
              style={{ backgroundColor: darkSlate }}
            >
              <div className="flex items-center gap-3.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                  alt="Tasnim Mahi"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-400"
                />
                <div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Verified Batch 18 Student
                  </span>
                  <h3 className="text-lg font-black mt-1">
                    Tasnim Mahi (তাসনিম মাহি)
                  </h3>
                  <p className="text-xs text-slate-300">
                    Student ID: #ET-88412 • Dhanmondi, Dhaka
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                  <div className="text-xl font-black text-indigo-600">68%</div>
                  <div className="text-[11px] font-bold text-slate-500">
                    Course Progress
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
                  <div className="text-xl font-black text-emerald-600">92%</div>
                  <div className="text-[11px] font-bold text-emerald-700">
                    Live Attendance
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-center">
                  <div className="text-xl font-black text-amber-600">8.5/10</div>
                  <div className="text-[11px] font-bold text-amber-700">
                    Avg. Quiz Score
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
                  Earned Gamification Badges (অর্জিত ব্যাজসমূহ)
                </h4>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    {
                      title: '7-Day Streak 🔥',
                      desc: 'Watched 7 days in a row',
                      color: 'bg-amber-50 border-amber-200 text-amber-800',
                    },
                    {
                      title: 'Quiz Master 🏆',
                      desc: 'Top 5% in Reading Mock',
                      color: 'bg-indigo-50 border-indigo-200 text-indigo-800',
                    },
                    {
                      title: 'Top Contributor ⭐',
                      desc: '14 helpful peer answers',
                      color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
                    },
                  ].map((b) => (
                    <div
                      key={b.title}
                      className={`p-3 rounded-xl border ${b.color} space-y-0.5`}
                    >
                      <div className="text-xs font-extrabold">{b.title}</div>
                      <div className="text-[10px] opacity-80">{b.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck size={15} className="text-emerald-600" />
                  <span>bKash TrxID Verified • Full Batch Access</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-white cursor-pointer"
                  style={{ backgroundColor: royalIndigo }}
                >
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default EduTeactStudentNavbar;
