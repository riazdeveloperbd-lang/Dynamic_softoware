import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  GraduationCap,
  Award,
  BookOpen,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import {
  EditableText,
  EditableImage,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import teacherVideoThumb from '../../../assets/images/teacher_video_thumb_1791386024459.jpg';
import teacherCampusLab from '../../../assets/images/teacher_campus_lab_1791386046593.jpg';

export interface TeacherAboutVideoCredentialsSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

const VIDEO_CHAPTERS = [
  {
    id: 'ch_1',
    time: 0,
    timeLabel: '00:00',
    title: '01. Welcome & Diagnostic Approach',
    caption:
      '“Welcome to my Cambridge 3D Lightboard Studio! In our first 15 minutes together, we pinpoint the exact geometric concepts holding back your problem-solving speed.”',
  },
  {
    id: 'ch_2',
    time: 26,
    timeLabel: '00:26',
    title: '02. Why 3D Visual Intuition Beats Memorization',
    caption:
      '“Instead of memorizing 40 derivative and electromagnetic formulas, you will see how gradients, flux, and torque behave in three-dimensional space right on the glass board.”',
  },
  {
    id: 'ch_3',
    time: 54,
    timeLabel: '00:54',
    title: '03. Personalized Study Roadmap & Annotated Replays',
    caption:
      '“After every session, you receive a high-definition video replay, LaTeX-typeset problem sets, and targeted past-paper drills tailored to your exam date.”',
  },
];

export const TeacherAboutVideoCredentialsSection: React.FC<
  TeacherAboutVideoCredentialsSectionProps
> = ({
  title = 'Teaching Philosophy, 75-Second Welcome & Academic Credentials',
  subtitle = 'Combining rigorous MIT research training with 12 years of one-on-one mentorship to transform how students experience mathematics and physics.',
  variant = 'varient_1',
  primaryColor = '#2563EB',
  isDark = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(14);
  const [showTranscript, setShowTranscript] = useState(false);
  const [activeCredTab, setActiveCredTab] = useState<
    'all' | 'degrees' | 'certifications' | 'achievements'
  >('all');

  const totalDuration = 75; // 75-second (1:15) Introductory Video

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => {
        if (prev >= totalDuration) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentChapter =
    elapsedSeconds >= 54
      ? VIDEO_CHAPTERS[2]
      : elapsedSeconds >= 26
      ? VIDEO_CHAPTERS[1]
      : VIDEO_CHAPTERS[0];

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  const credentialsList = [
    {
      id: 'cred_deg_1',
      category: 'degrees' as const,
      index: '01.',
      typeLabel: 'Doctoral Degree',
      title: 'Ph.D. in Applied Mathematics & Computational Physics',
      institution: 'Massachusetts Institute of Technology (MIT)',
      year: '2012 – 2016',
      detail:
        'Dissertation on Geometric Symmetries in Nonlinear Partial Differential Equations. Recipient of the Goodwin Medal for Distinguished Teaching.',
    },
    {
      id: 'cred_deg_2',
      category: 'degrees' as const,
      index: '02.',
      typeLabel: 'Undergraduate Degree',
      title: 'B.S. in Physics & Mathematics (Summa Cum Laude)',
      institution: 'Stanford University',
      year: '2008 – 2012',
      detail:
        'Phi Beta Kappa inductee. Undergraduate research fellow at SLAC National Accelerator Laboratory.',
    },
    {
      id: 'cred_cert_1',
      category: 'certifications' as const,
      index: '03.',
      typeLabel: 'State & National Licensure',
      title: 'National Board Certified Teacher (AYA/Mathematics & Physics)',
      institution: 'Massachusetts DESE License #MA-88412 & NY State Certified',
      year: 'Active through 2029',
      detail:
        'Certified for Advanced Placement (AP Calculus AB/BC, AP Physics C: Mechanics & E&M) and International Baccalaureate (IB HL) instruction.',
    },
    {
      id: 'cred_cert_2',
      category: 'certifications' as const,
      index: '04.',
      typeLabel: 'International Pedagogy Certification',
      title: '150-Hour Master TEFL / CLIL STEM Educator Credential',
      institution: 'Cambridge Assessment International Education',
      year: 'Certified 2017',
      detail:
        'Specialized in teaching complex English-medium STEM terminology to international students across 28 countries.',
    },
    {
      id: 'cred_ach_1',
      category: 'achievements' as const,
      index: '05.',
      typeLabel: 'Olympiad & Competition Mentorship',
      title: '34 AIME, USAMO & USAPhO National Finalists Coached',
      institution: 'Mathematical Association of America & AAPT',
      year: '2016 – 2026',
      detail:
        'Designed custom proof-writing and mechanics problem sets that guided 34 high school learners into top 1% national rankings.',
    },
    {
      id: 'cred_ach_2',
      category: 'achievements' as const,
      index: '06.',
      typeLabel: 'Published Curriculum Author',
      title: 'Author of “Visualizing Vector Calculus & Classical Fields”',
      institution: 'Adopted by 42 Independent Prep Schools & University Labs',
      year: '2023 Edition',
      detail:
        'Interactive 3D problem workbook bridging high school AP Calculus BC with first-year university engineering physics.',
    },
  ];

  const filteredCredentials =
    activeCredTab === 'all'
      ? credentialsList
      : credentialsList.filter((c) => c.category === activeCredTab);

  return (
    <section
      id="teacher-about"
      className={`py-20 px-6 border-t transition-colors ${
        isDark
          ? 'bg-[#0E1422] border-white/10 text-slate-100'
          : 'bg-white border-slate-200/80 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-24">
        {/* =============================================================== */}
        {/* PART 1: ABOUT / BIO & TEACHING PHILOSOPHY                       */}
        {/* =============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div
            className={`${
              variant === 'varient_2' ? 'lg:col-span-6 lg:order-2' : 'lg:col-span-7'
            } space-y-6`}
          >
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span style={{ color: primaryColor }} className="font-semibold">
                About &amp; Teaching Philosophy
              </span>
              <span aria-hidden="true">·</span>
              <span>12+ Years Experience</span>
              <span aria-hidden="true">·</span>
              <span>Former MIT Teaching Fellow</span>
            </div>

            <h2
              className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight max-w-2xl"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                textWrap: 'balance',
              }}
            >
              <EditableText id="teacher_about_heading" defaultText={title} />
            </h2>

            <EditableText
              id="teacher_about_sub"
              as="p"
              defaultText={subtitle}
              className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl block"
            />

            <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              <EditableText
                id="teacher_bio_para_1"
                as="p"
                defaultText="Most students struggle in mathematics and physics not because they lack talent, but because formulas are taught as static rules to memorize rather than dynamic physical structures. Over the past 12 years—first as a Graduate Teaching Fellow at MIT, then as a Senior Physics Instructor at Phillips Exeter, and now in my private 3D Lightboard Studio—I have refined a visual-first pedagogy."
                className="block"
              />
              <EditableText
                id="teacher_bio_para_2"
                as="p"
                defaultText="Every concept begins with a tangible 3D geometric model or real-world physical simulation. Once a learner can see why a derivative measures local curvature or how conservation of angular momentum governs planetary orbits, the algebra becomes effortless and exam confidence follows naturally."
                className="block"
              />
            </div>

            {/* 3 Core Pillars of Pedagogy */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              {[
                {
                  num: '01.',
                  head: 'First-Principles Clarity',
                  body: 'Derive every theorem visually so you never blank out on unfamiliar exam problems.',
                },
                {
                  num: '02.',
                  head: '3D Lightboard Sessions',
                  body: 'Live dual-camera setup where I draw in 3D space while facing you directly.',
                },
                {
                  num: '03.',
                  head: 'Measurable Score Gains',
                  body: 'Bi-weekly timed diagnostic drills benchmarked against official College Board & IB rubrics.',
                },
              ].map((pillar) => (
                <div
                  key={pillar.num}
                  className={`p-4 rounded-2xl border transition-transform hover:-translate-y-1 ${
                    isDark
                      ? 'bg-[#131B2E] border-white/10 shadow-[0_6px_0_0_#1E293B]'
                      : 'bg-[#F8FAFC] border-slate-200/90 shadow-[0_6px_0_0_#E2E8F0]'
                  }`}
                >
                  <div
                    className="text-xs font-mono font-semibold tabular-nums"
                    style={{ color: primaryColor }}
                  >
                    {pillar.num}
                  </div>
                  <h3 className="text-sm font-semibold mt-1">{pillar.head}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Architectural Seminar Studio Card */}
          <div
            className={`${
              variant === 'varient_2' ? 'lg:col-span-6 lg:order-1' : 'lg:col-span-5'
            }`}
          >
            <div
              className={`rounded-3xl p-5 border ${
                isDark
                  ? 'bg-[#131B2E] border-white/15 shadow-[0_12px_0_0_#1E293B]'
                  : 'bg-[#F8FAFC] border-slate-200/90 shadow-[0_12px_0_0_#E2E8F0]'
              } space-y-4`}
            >
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-800 relative">
                <EditableImage
                  id="teacher_campus_lab_img"
                  defaultSrc={teacherCampusLab}
                  alt="Cambridge Mathematics and Physics Seminar Studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between text-xs">
                  <span className="font-semibold">
                    Cambridge Seminar Room &amp; Lightboard Lab
                  </span>
                  <span className="font-mono tabular-nums text-sky-300">
                    EST. 2014
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div
                  className={`p-3.5 rounded-xl border ${
                    isDark
                      ? 'bg-[#0B0F19] border-white/10'
                      : 'bg-white border-slate-200/80'
                  }`}
                >
                  <div className="text-slate-400 font-medium">Alma Mater</div>
                  <div className="text-sm font-semibold mt-0.5">
                    MIT Ph.D. &amp; Stanford B.S.
                  </div>
                </div>
                <div
                  className={`p-3.5 rounded-xl border ${
                    isDark
                      ? 'bg-[#0B0F19] border-white/10'
                      : 'bg-white border-slate-200/80'
                  }`}
                >
                  <div className="text-slate-400 font-medium">UniversityPlacements</div>
                  <div className="text-sm font-semibold mt-0.5">
                    MIT, Caltech, Oxford, ETH
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* PART 2: INTRODUCTORY VIDEO (60-TO-90-SECOND WELCOME PLAYER)     */}
        {/* =============================================================== */}
        <div id="teacher-video" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span style={{ color: primaryColor }} className="font-semibold">
                  Introductory Video
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">01:15 Duration (75 Seconds)</span>
                <span aria-hidden="true">·</span>
                <span>4K Lightboard Studio Demonstration</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-semibold tracking-tight"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                <EditableText
                  id="teacher_video_title"
                  defaultText="Watch How a 3D Lightboard Tutoring Session Works"
                />
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setShowTranscript((v) => !v)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                isDark
                  ? 'bg-[#131B2E] border-white/15 text-slate-200 hover:bg-white/10'
                  : 'bg-[#F8FAFC] border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FileText size={14} style={{ color: primaryColor }} />
              <span>{showTranscript ? 'Hide Video Transcript' : 'Read Full Transcript'}</span>
            </button>
          </div>

          {/* 3D Extruded Video Stage + Chapter Selector */}
          <div
            className={`rounded-3xl p-5 sm:p-7 border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
              isDark
                ? 'bg-[#131B2E] border-white/15 shadow-[0_14px_0_0_#1E293B]'
                : 'bg-[#F8FAFC] border-slate-200/90 shadow-[0_14px_0_0_#E2E8F0]'
            }`}
          >
            {/* Left 16:9 Interactive Video Stage */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10">
                <EditableImage
                  id="teacher_intro_video_img"
                  defaultSrc={teacherVideoThumb}
                  alt="75-Second Welcome Video — Prof. Julian Vance Lightboard Session"
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isPlaying ? 'scale-105' : 'scale-100'
                  }`}
                />

                {/* Contrast Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" />

                {/* Top Live Chapter Indicator */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/15">
                    {currentChapter.title}
                  </span>
                  <span className="font-mono tabular-nums bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/15">
                    {formatTime(elapsedSeconds)} / 01:15
                  </span>
                </div>

                {/* Center Play/Pause 3D Trigger */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    className="w-20 h-20 rounded-full text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                    style={{
                      backgroundColor: primaryColor,
                      boxShadow:
                        '0 8px 0 0 #1E3A8A, 0 20px 40px rgba(0,0,0,0.6)',
                    }}
                    aria-label={isPlaying ? 'Pause welcome video' : 'Play welcome video'}
                  >
                    {isPlaying ? <Pause size={30} /> : <Play size={30} className="ml-1" />}
                  </button>
                </div>

                {/* Live Closed-Caption Overlay */}
                <div className="absolute bottom-14 inset-x-6 text-center pointer-events-none">
                  <p className="inline-block max-w-2xl px-4 py-2 rounded-xl bg-black/75 backdrop-blur-xs text-xs sm:text-sm text-slate-100 leading-relaxed border border-white/10">
                    {currentChapter.caption}
                  </p>
                </div>

                {/* Bottom Transport Controls Bar */}
                <div className="absolute bottom-0 inset-x-0 px-4 py-3 bg-black/80 backdrop-blur-sm flex items-center gap-3 text-white">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    className="p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setElapsedSeconds(0);
                      setIsPlaying(true);
                    }}
                    className="p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
                    title="Restart 75s Video"
                  >
                    <RotateCcw size={14} />
                  </button>

                  <input
                    type="range"
                    min={0}
                    max={totalDuration}
                    value={elapsedSeconds}
                    onChange={(e) => setElapsedSeconds(Number(e.target.value))}
                    className="flex-1 accent-blue-500 cursor-pointer"
                    aria-label="Video timeline scrubber"
                  />

                  <span className="text-xs font-mono tabular-nums">
                    {formatTime(elapsedSeconds)} / 01:15
                  </span>

                  <button
                    type="button"
                    onClick={() => setIsMuted((m) => !m)}
                    className="p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Video Chapters */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Interactive Video Chapters (75s)
              </div>
              <div className="space-y-3">
                {VIDEO_CHAPTERS.map((chap) => {
                  const isCurrent = currentChapter.id === chap.id;
                  return (
                    <button
                      key={chap.id}
                      type="button"
                      onClick={() => {
                        setElapsedSeconds(chap.time);
                        setIsPlaying(true);
                      }}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                        isCurrent
                          ? isDark
                            ? 'bg-[#1D2842] border-blue-500 text-white shadow-[0_5px_0_0_#1E3A8A]'
                            : 'bg-white border-blue-600 text-slate-900 shadow-[0_5px_0_0_#DBEAFE]'
                          : isDark
                          ? 'bg-[#0B0F19] border-white/10 text-slate-300 hover:bg-white/5'
                          : 'bg-white/70 border-slate-200/80 text-slate-700 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono tabular-nums mb-1">
                        <span style={{ color: primaryColor }} className="font-semibold">
                          Timestamp {chap.timeLabel}
                        </span>
                        <span>{isCurrent ? '● Playing' : 'Jump to section'}</span>
                      </div>
                      <div className="text-sm font-semibold">{chap.title}</div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {chap.caption}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Expandable Full Transcript Panel */}
          {showTranscript && (
            <div
              className={`p-6 rounded-2xl border text-xs sm:text-sm space-y-3 leading-relaxed ${
                isDark
                  ? 'bg-[#0B0F19] border-white/10 text-slate-300'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="font-semibold text-slate-900 dark:text-white">
                Complete 75-Second Welcome Transcript:
              </div>
              {VIDEO_CHAPTERS.map((ch) => (
                <p key={ch.id}>
                  <strong className="font-mono mr-2" style={{ color: primaryColor }}>
                    [{ch.timeLabel}]
                  </strong>
                  {ch.caption}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* =============================================================== */}
        {/* PART 3: CREDENTIALS & QUALIFICATIONS                            */}
        {/* =============================================================== */}
        <div id="teacher-credentials" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span style={{ color: primaryColor }} className="font-semibold">
                  Credentials &amp; Qualifications
                </span>
                <span aria-hidden="true">·</span>
                <span>Verified Academic &amp; State Licensure</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-semibold tracking-tight"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                <EditableText
                  id="teacher_cred_heading"
                  defaultText="Academic Degrees, Teaching Licenses & Olympiad Track Record"
                />
              </h3>
            </div>

            {/* Interactive Filter Tabs (Functional Buttons) */}
            <div
              className={`inline-flex items-center gap-1 p-1.5 rounded-xl border self-start ${
                isDark
                  ? 'bg-[#0B0F19] border-white/10'
                  : 'bg-slate-100 border-slate-200/80'
              }`}
            >
              {(
                [
                  { id: 'all', label: 'All Credentials (6)' },
                  { id: 'degrees', label: 'Degrees' },
                  { id: 'certifications', label: 'Licenses & TEFL' },
                  { id: 'achievements', label: 'Achievements' },
                ] as const
              ).map((tab) => {
                const active = activeCredTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCredTab(tab.id)}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCredentials.map((cred) => (
              <div
                key={cred.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 transition-transform hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#131B2E] border-white/10 shadow-[0_8px_0_0_#1E293B]'
                    : 'bg-[#F8FAFC] border-slate-200/90 shadow-[0_8px_0_0_#E2E8F0]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span
                      className="font-mono font-semibold tabular-nums"
                      style={{ color: primaryColor }}
                    >
                      {cred.index} {cred.typeLabel}
                    </span>
                    <span className="font-mono tabular-nums">{cred.year}</span>
                  </div>

                  <h4 className="text-base sm:text-lg font-semibold leading-snug">
                    {cred.title}
                  </h4>

                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {cred.institution}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {cred.detail}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <CheckCircle2 size={14} style={{ color: primaryColor }} />
                    <span>Verified Credential</span>
                  </span>
                  {cred.category === 'degrees' ? (
                    <GraduationCap size={16} />
                  ) : cred.category === 'certifications' ? (
                    <Award size={16} />
                  ) : (
                    <BookOpen size={16} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
