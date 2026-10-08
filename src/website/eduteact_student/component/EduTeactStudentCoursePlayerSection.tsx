import React, { useState } from 'react';
import {
  Play,
  Pause,
  CheckCircle2,
  Bookmark,
  ChevronDown,
  FileText,
  HelpCircle,
  Sparkles,
  Volume2,
  Maximize2,
  Settings,
  Download,
  Plus,
  Trash2,
  Lock,
  Check,
  Clock,
  Wifi,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface EduTeactStudentCoursePlayerSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
  embeddedMode?: boolean;
}

interface LessonItem {
  id: string;
  moduleId: string;
  title: string;
  bnTitle: string;
  duration: string;
  videoPoster: string;
  keyTakeaways: string[];
  pdfSlideName: string;
  pdfSize: string;
  locked?: boolean;
}

interface ModuleGroup {
  id: string;
  title: string;
  bnTitle: string;
  lessons: LessonItem[];
}

interface TimestampNote {
  id: string;
  lessonId: string;
  timestamp: string;
  text: string;
}

const COURSE_MODULES: ModuleGroup[] = [
  {
    id: 'mod-1',
    title: 'Module 01: IELTS Reading Band 8.5 Speed Strategies',
    bnTitle: 'মডিউল ০১: রিডিং প্যাসেজ স্কিমিং ও ট্রু/ফলস/নট গিভেন কৌশল',
    lessons: [
      {
        id: 'les-101',
        moduleId: 'mod-1',
        title: '01. Skimming vs. Scanning: Eliminating Trap Answers in Passage 1',
        bnTitle: 'লেসন ০১: মাত্র ১২ মিনিটে প্যাসেজ ১ শেষ করার প্রমাণিত টেকনিক',
        duration: '24:15',
        videoPoster:
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        keyTakeaways: [
          'Always underline qualifying adverbs (solely, predominantly, rarely) before reading the passage.',
          'True/False/Not Given questions follow strict chronological order in Cambridge tests.',
          'Spend no more than 15 minutes on Passage 1 to save 25 minutes for Passage 3.',
        ],
        pdfSlideName: 'Module_01_Reading_Trap_Words_Sheet.pdf',
        pdfSize: '2.4 MB',
      },
      {
        id: 'les-102',
        moduleId: 'mod-1',
        title: '02. Matching Headings Without Reading Every Paragraph Line',
        bnTitle: 'লেসন ০২: পুরো প্যারাগ্রাফ না পড়েও Matching Headings মেলানোর নিয়ম',
        duration: '31:40',
        videoPoster:
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
        keyTakeaways: [
          'Read the first two sentences and last sentence of each paragraph first.',
          'Cross out example headings immediately to avoid duplicate confusion.',
          'Match synonyms of abstract nouns rather than exact keyword repetitions.',
        ],
        pdfSlideName: 'Module_01_Matching_Headings_Drill.pdf',
        pdfSize: '3.1 MB',
      },
    ],
  },
  {
    id: 'mod-2',
    title: 'Module 02: Academic Writing Task 2 — Band 8.0 Structure',
    bnTitle: 'মডিউল ০২: রাইটিং টাস্ক ২ — ২৫০+ শব্দের হাই-স্কোরিং এসে স্ট্রাকচার',
    lessons: [
      {
        id: 'les-201',
        moduleId: 'mod-2',
        title: '03. The 4-Sentence Paraphrase & Thesis Statement Formula',
        bnTitle: 'লেসন ০৩: মাত্র ৫ মিনিটে ব্যান্ড ৮ মানের ইন্ট্রোডাকশন লেখার নিয়ম',
        duration: '28:50',
        videoPoster:
          'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
        keyTakeaways: [
          'Never copy more than 3 consecutive words from the official IELTS prompt.',
          'State your clear position in Sentence 2 of the introduction for Opinion essays.',
          'Use complex subordinating conjunctions (Whereas, Whilst, Despite the fact that).',
        ],
        pdfSlideName: 'Writing_Task2_Thesis_Templates_Bangla.pdf',
        pdfSize: '1.9 MB',
      },
      {
        id: 'les-202',
        moduleId: 'mod-2',
        title: '04. Lexical Resource: Replacing Common Band 6.0 Words',
        bnTitle: 'লেসন ০৪: সাধারণ শব্দের বদলে একাডেমিক কোলোকেশন ব্যবহারের তালিকা',
        duration: '35:10',
        videoPoster:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
        keyTakeaways: [
          'Replace "very important" with "of paramount significance" or "indispensable".',
          'Avoid memorized idioms like "every coin has two sides" in Academic Writing.',
        ],
        pdfSlideName: '150_Academic_Collocations_Band8.pdf',
        pdfSize: '4.2 MB',
      },
    ],
  },
  {
    id: 'mod-3',
    title: 'Module 03: Speaking Part 2 Cue Card & Fluency Mastery',
    bnTitle: 'মডিউল ০৩: স্পিকিং পার্ট ২ কিউ কার্ড এবং জড়তা কাটানোর প্র্যাকটিস',
    lessons: [
      {
        id: 'les-301',
        moduleId: 'mod-3',
        title: '05. The PPF (Past-Present-Future) Framework for Any Cue Card',
        bnTitle: 'লেসন ০৫: যেকোনো অপরিচিত Cue Card-এ ২ মিনিট না থেমে কথা বলার কৌশল',
        duration: '26:05',
        videoPoster:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
        keyTakeaways: [
          'Use your 1-minute prep time to write 6 trigger verbs, not full sentences.',
          'Transition smoothly into a future hypothetical scenario if you run out of stories at 1:20.',
        ],
        pdfSlideName: 'Sep_Dec_2025_Predicted_CueCards.pdf',
        pdfSize: '5.0 MB',
      },
    ],
  },
];

const INITIAL_NOTES: TimestampNote[] = [
  {
    id: 'note-1',
    lessonId: 'les-101',
    timestamp: '06:42',
    text: 'গুরুত্বপূর্ণ: "Not Given" মানে প্যাসেজে ওই তথ্যের কোনো প্রমাণ বা বিপরীত তথ্য কিছুই নেই।',
  },
  {
    id: 'note-2',
    lessonId: 'les-101',
    timestamp: '14:18',
    text: 'Cambridge 18 Test 2-তে এই কৌশলটি প্রয়োগ করে সময় বাঁচাতে হবে।',
  },
];

export const EduTeactStudentCoursePlayerSection: React.FC<
  EduTeactStudentCoursePlayerSectionProps
> = ({ title, subtitle, primaryColor, embeddedMode = false }) => {
  const allLessons = COURSE_MODULES.flatMap((m) => m.lessons);
  const [activeLesson, setActiveLesson] = useState<LessonItem>(allLessons[0]);
  const [openModuleId, setOpenModuleId] = useState<string>('mod-1');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<'1x' | '1.25x' | '1.5x' | '2x'>('1.25x');
  const [videoQuality, setVideoQuality] = useState<'360p' | '720p' | '1080p'>('720p');
  const [currentTimeDisplay, setCurrentTimeDisplay] = useState<string>('08:24');
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(['les-101']);
  const [bookmarkedLessonIds, setBookmarkedLessonIds] = useState<string[]>(['les-201']);
  const [notes, setNotes] = useState<TimestampNote[]>(INITIAL_NOTES);
  const [newNoteInput, setNewNoteInput] = useState<string>('');

  const royalIndigo = primaryColor || '#4F46E5';
  const darkSlate = '#0F172A';
  const emeraldGreen = '#10B981';

  const isCurrentCompleted = completedLessonIds.includes(activeLesson.id);
  const isCurrentBookmarked = bookmarkedLessonIds.includes(activeLesson.id);

  const toggleLessonCompleted = (lessonId: string) => {
    setCompletedLessonIds((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const toggleBookmark = (lessonId: string) => {
    setBookmarkedLessonIds((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;
    const newEntry: TimestampNote = {
      id: `note-${Date.now()}`,
      lessonId: activeLesson.id,
      timestamp: currentTimeDisplay,
      text: newNoteInput.trim(),
    };
    setNotes((prev) => [newEntry, ...prev]);
    setNewNoteInput('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const currentLessonNotes = notes.filter((n) => n.lessonId === activeLesson.id);

  return (
    <section
      id="eduteact-course-player"
      className={
        embeddedMode
          ? 'w-full'
          : 'w-full py-10 sm:py-12 px-4 sm:px-6 bg-white border-t border-slate-200/80'
      }
    >
      <div className={embeddedMode ? 'space-y-6' : 'max-w-7xl mx-auto space-y-6'}>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-extrabold">
              <Wifi size={13} />
              <span>2. Interactive Course Player &amp; Low-Bandwidth BD Video Engine</span>
            </div>
            <EditableText
              as="h2"
              defaultValue={
                title ||
                'Interactive Classroom Player — Watch in 360p/720p/1080p & Save Timestamped Notes'
              }
              className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900"
            />
            <EditableText
              as="p"
              defaultValue={
                subtitle ||
                'মোবাইল ডাটা সাশ্রয়ের জন্য ৩৬০পি লো-ডাটা মোড থেকে ১০৮০পি ফুল এইচডি এবং ১.২৫x–২x স্পিড কন্ট্রোলসহ প্রতিটি লেসনের সাথেই থাকছে পিডিএফ স্লাইড ও ব্যক্তিগত নোটপ্যাড।'
              }
              className="text-xs sm:text-sm text-slate-600 max-w-3xl"
            />
          </div>

          {/* Progress Pill */}
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 shrink-0">
            <div className="text-right">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Syllabus Progress
              </div>
              <div className="text-xs font-black text-slate-900">
                {completedLessonIds.length} of {allLessons.length} Core Lessons Completed
              </div>
            </div>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black"
              style={{ backgroundColor: emeraldGreen }}
            >
              {Math.round((completedLessonIds.length / allLessons.length) * 100)}%
            </div>
          </div>
        </div>

        {/* Split-Screen Course Player Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: CUSTOM VIDEO PLAYER + CONTROLS + NOTES PAD (7 COLS) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Video Player Container */}
            <div
              className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl text-white"
              style={{ backgroundColor: darkSlate }}
            >
              {/* Video Viewport */}
              <div className="relative aspect-video w-full bg-slate-950 overflow-hidden group">
                <img
                  src={activeLesson.videoPoster}
                  alt={activeLesson.title}
                  className={`w-full h-full object-cover transition duration-500 ${
                    isPlaying ? 'scale-105 opacity-60' : 'opacity-75'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />

                {/* Top Overlay Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-slate-900/85 border border-white/15 text-white backdrop-blur-md">
                    {activeLesson.title}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/90 text-white">
                    {videoQuality === '360p'
                      ? '360p BD Data Saver (110MB/hr)'
                      : videoQuality === '720p'
                      ? '720p HD Stream'
                      : '1080p Full HD'}
                  </span>
                </div>

                {/* Center Play/Pause Trigger */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white shadow-2xl transition transform hover:scale-110 cursor-pointer"
                  style={{ backgroundColor: royalIndigo }}
                >
                  {isPlaying ? <Pause size={30} /> : <Play size={30} className="ml-1" />}
                </button>

                {/* Simulated Live Subtitle Caption */}
                <div className="absolute bottom-16 inset-x-6 text-center pointer-events-none">
                  <span className="inline-block px-3.5 py-1.5 rounded-xl bg-black/75 text-white text-xs sm:text-sm font-semibold backdrop-blur-xs">
                    {isPlaying
                      ? `▶ Playing at ${playbackSpeed} (${videoQuality}): "${activeLesson.bnTitle}"`
                      : '⏸ প্লে বাটনে ক্লিক করে এইচডি ভিডিও লেসনটি শুরু করুন'}
                  </span>
                </div>

                {/* Bottom Scrubber & Controls Bar */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-slate-950 to-transparent space-y-2">
                  {/* Interactive Progress Scrubber */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-indigo-300">
                      {currentTimeDisplay}
                    </span>
                    <div
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                        const mins = Math.floor(ratio * 24);
                        const secs = Math.floor((ratio * 24 * 60) % 60);
                        setCurrentTimeDisplay(
                          `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
                        );
                      }}
                      className="flex-1 h-2 rounded-full bg-white/20 cursor-pointer overflow-hidden"
                    >
                      <div
                        className="h-full rounded-full"
                        style={{ width: '38%', backgroundColor: royalIndigo }}
                      />
                    </div>
                    <span className="text-[11px] font-mono text-slate-300">
                      {activeLesson.duration}
                    </span>
                  </div>

                  {/* Speed Controls (1x, 1.25x, 1.5x, 2x) + Quality Selector (360p, 720p, 1080p) */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-extrabold flex items-center gap-1 cursor-pointer"
                      >
                        {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                        <span>{isPlaying ? 'Pause' : 'Play'}</span>
                      </button>

                      {/* Speed Switcher */}
                      <div className="flex items-center bg-slate-900/90 rounded-lg p-0.5 border border-white/10">
                        {(['1x', '1.25x', '1.5x', '2x'] as const).map((spd) => (
                          <button
                            key={spd}
                            type="button"
                            onClick={() => setPlaybackSpeed(spd)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold transition cursor-pointer ${
                              playbackSpeed === spd
                                ? 'bg-indigo-600 text-white'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {spd}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quality Selector (360p, 720p, 1080p) */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-slate-400 hidden sm:inline">
                        Quality:
                      </span>
                      <div className="flex items-center bg-slate-900/90 rounded-lg p-0.5 border border-white/10">
                        {(['360p', '720p', '1080p'] as const).map((q) => (
                          <button
                            key={q}
                            type="button"
                            onClick={() => setVideoQuality(q)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold transition cursor-pointer ${
                              videoQuality === q
                                ? 'bg-emerald-600 text-white'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar Below Video: Mark as Completed + Bookmark Lesson */}
              <div className="p-4 sm:p-5 bg-slate-900 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white">
                    {activeLesson.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {activeLesson.bnTitle}
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => toggleBookmark(activeLesson.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition flex items-center gap-1.5 cursor-pointer ${
                      isCurrentBookmarked
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <Bookmark
                      size={14}
                      className={isCurrentBookmarked ? 'fill-amber-400 text-amber-400' : ''}
                    />
                    <span>{isCurrentBookmarked ? 'Bookmarked' : 'Bookmark Lesson'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleLessonCompleted(activeLesson.id)}
                    className="px-4 py-2 rounded-xl text-xs font-extrabold text-white transition flex items-center gap-1.5 shadow-md cursor-pointer"
                    style={{
                      backgroundColor: isCurrentCompleted ? emeraldGreen : royalIndigo,
                    }}
                  >
                    <CheckCircle2 size={15} />
                    <span>
                      {isCurrentCompleted ? 'Completed ✓' : 'Mark as Completed'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Lesson Summary & Personal Timestamped Notes Pad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Key Takeaways + Attached PDF Slide */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Lesson Key Takeaways
                  </h4>
                  <span className="text-[11px] font-bold text-indigo-600">
                    Exam Tested
                  </span>
                </div>
                <ul className="space-y-2">
                  {activeLesson.keyTakeaways.map((pt, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed"
                    >
                      <Check
                        size={14}
                        className="text-emerald-600 shrink-0 mt-0.5"
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText size={16} className="text-indigo-600 shrink-0" />
                    <div className="truncate">
                      <div className="text-xs font-extrabold text-slate-900 truncate">
                        {activeLesson.pdfSlideName}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Class Slide • {activeLesson.pdfSize}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.dispatchEvent(
                          new CustomEvent('eduteact-student-switch-tab', {
                            detail: { tab: 'resources' },
                          })
                        );
                        window.dispatchEvent(
                          new CustomEvent('eduteact-student-sidebar-tab-changed', {
                            detail: { tab: 'resources' },
                          })
                        );
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-extrabold inline-flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <Download size={12} />
                    <span>Open PDF Vault</span>
                  </button>
                </div>
              </div>

              {/* Personal Timestamped Notes Pad */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between space-y-3">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Personal Timestamped Notes (নোটপ্যাড)
                    </h4>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-mono font-bold">
                      @{currentTimeDisplay}
                    </span>
                  </div>

                  <form onSubmit={handleAddNote} className="flex gap-2">
                    <input
                      type="text"
                      value={newNoteInput}
                      onChange={(e) => setNewNoteInput(e.target.value)}
                      placeholder={`Add note at ${currentTimeDisplay}...`}
                      className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 rounded-xl text-white text-xs font-extrabold flex items-center gap-1 cursor-pointer shrink-0"
                      style={{ backgroundColor: royalIndigo }}
                    >
                      <Plus size={14} />
                      <span>Save</span>
                    </button>
                  </form>

                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {currentLessonNotes.length === 0 ? (
                      <p className="text-[11px] text-slate-400 italic py-2">
                        No notes saved for this lesson yet. Type above to bookmark a timestamp!
                      </p>
                    ) : (
                      currentLessonNotes.map((n) => (
                        <div
                          key={n.id}
                          className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-start justify-between gap-2"
                        >
                          <div className="space-y-0.5">
                            <button
                              type="button"
                              onClick={() => setCurrentTimeDisplay(n.timestamp)}
                              className="text-[10px] font-mono font-extrabold text-indigo-600 hover:underline cursor-pointer"
                            >
                              ▶ Jump to {n.timestamp}
                            </button>
                            <p className="text-xs text-slate-700">{n.text}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteNote(n.id)}
                            className="text-slate-400 hover:text-rose-500 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: COLLAPSIBLE MODULE & LESSON TREE ACCORDION (5 COLS) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-3xl border border-slate-200/90 p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  Course Curriculum &amp; Module Tree
                </h3>
                <p className="text-[11px] text-slate-500">
                  যেকোনো লেসনে ক্লিক করে ভিডিও, পিডিএফ স্লাইড ও কুইজ ওপেন করুন
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                3 Modules
              </span>
            </div>

            <div className="space-y-3">
              {COURSE_MODULES.map((mod) => {
                const isOpen = openModuleId === mod.id;
                const modCompletedCount = mod.lessons.filter((l) =>
                  completedLessonIds.includes(l.id)
                ).length;

                return (
                  <div
                    key={mod.id}
                    className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenModuleId(isOpen ? '' : mod.id)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                          {mod.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {mod.bnTitle} • {modCompletedCount}/{mod.lessons.length} Done
                        </div>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-slate-400 transition-transform shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="divide-y divide-slate-100 border-t border-slate-100">
                        {mod.lessons.map((lesson) => {
                          const isCurrent = activeLesson.id === lesson.id;
                          const isDone = completedLessonIds.includes(lesson.id);
                          const isSaved = bookmarkedLessonIds.includes(lesson.id);

                          return (
                            <div
                              key={lesson.id}
                              onClick={() => {
                                setActiveLesson(lesson);
                                setIsPlaying(true);
                              }}
                              className={`p-3.5 transition flex items-start justify-between gap-3 cursor-pointer ${
                                isCurrent
                                  ? 'bg-indigo-50/90 border-l-4 border-l-indigo-600'
                                  : 'hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-start gap-2.5 min-w-0">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLessonCompleted(lesson.id);
                                  }}
                                  className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border shrink-0 cursor-pointer ${
                                    isDone
                                      ? 'bg-emerald-500 border-emerald-500 text-white'
                                      : 'bg-white border-slate-300'
                                  }`}
                                >
                                  {isDone && <Check size={12} />}
                                </button>

                                <div className="space-y-0.5 min-w-0">
                                  <div className="text-xs font-extrabold text-slate-900 leading-snug">
                                    {lesson.title}
                                  </div>
                                  <div className="text-[11px] text-slate-500 truncate">
                                    {lesson.bnTitle}
                                  </div>
                                  <div className="flex flex-wrap items-center gap-2 pt-1">
                                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500">
                                      <Clock size={10} />
                                      {lesson.duration}
                                    </span>
                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600">
                                      PDF Slide
                                    </span>
                                    {isSaved && (
                                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800">
                                        ★ Bookmarked
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <span
                                className={`px-2 py-1 rounded-lg text-[10px] font-extrabold shrink-0 ${
                                  isCurrent
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {isCurrent ? 'Playing' : 'Watch'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default EduTeactStudentCoursePlayerSection;
