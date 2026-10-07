import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Send,
  Download,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface TeacherBookingContactSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

const CALENDAR_DAYS = [
  { id: 'tue', day: 'Tue', date: 'Oct 13', slots: ['4:30 PM EST', '6:00 PM EST', '7:30 PM EST'] },
  { id: 'wed', day: 'Wed', date: 'Oct 14', slots: ['5:00 PM EST', '6:30 PM EST'] },
  { id: 'thu', day: 'Thu', date: 'Oct 15', slots: ['4:00 PM EST', '5:30 PM EST', '8:00 PM EST'] },
  { id: 'sat', day: 'Sat', date: 'Oct 17', slots: ['10:00 AM EST', '1:30 PM EST', '3:00 PM EST'] },
  { id: 'sun', day: 'Sun', date: 'Oct 18', slots: ['11:00 AM EST', '2:00 PM EST'] },
];

export const TeacherBookingContactSection: React.FC<
  TeacherBookingContactSectionProps
> = ({
  title = 'Lock In a Calendar Slot or Send a Message',
  subtitle = 'Reserve your complimentary 30-minute 3D Lightboard diagnostic session or ask a question about curriculum fit, exam timelines, and group lab availability.',
  variant = 'varient_1',
  primaryColor = '#2563EB',
  isDark = false,
}) => {
  const [selectedDayId, setSelectedDayId] = useState<string>('tue');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('4:30 PM EST');
  const [studentName, setStudentName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [subjectCourse, setSubjectCourse] = useState<string>(
    'AP Calculus BC / Multivariable'
  );
  const [selectedPackage, setSelectedPackage] = useState<string>(
    'Free 30-Min Diagnostic Trial'
  );
  const [message, setMessage] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  const currentDayObj =
    CALENDAR_DAYS.find((d) => d.id === selectedDayId) || CALENDAR_DAYS[0];

  const handleSelectDay = (dayId: string) => {
    setSelectedDayId(dayId);
    const found = CALENDAR_DAYS.find((d) => d.id === dayId);
    if (found && found.slots[0]) {
      setSelectedTimeSlot(found.slots[0]);
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setFormError('Please enter the student or parent full name.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setFormError('Please enter a valid email address for the Zoom & calendar invite.');
      return;
    }
    setFormError(null);
    setBookingConfirmed(true);
  };

  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Prof Julian Vance 3D Lightboard Studio//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${selectedPackage} — ${subjectCourse} with Prof. Julian Vance`,
      `DESCRIPTION:Live 3D Lightboard Diagnostic & Tutoring Session for ${studentName}. Slot: ${currentDayObj.day} ${currentDayObj.date} at ${selectedTimeSlot}`,
      'LOCATION:Zoom 4K Lightboard Studio (Link sent to email)',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Prof-Julian-Vance-Tutoring-Session.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="teacher-booking"
      className={`py-20 px-6 border-t transition-colors ${
        isDark
          ? 'bg-[#0B0F19] border-white/10 text-slate-100'
          : 'bg-[#F8FAFC] border-slate-200/80 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span style={{ color: primaryColor }} className="font-semibold">
              Contact &amp; Direct Calendar Booking
            </span>
            <span aria-hidden="true">·</span>
            <span>Instant Zoom Lightboard Link</span>
            <span aria-hidden="true">·</span>
            <span>Response Within 2 Hours</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl font-semibold tracking-tight"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              textWrap: 'balance',
            }}
          >
            <EditableText id="teacher_booking_heading" defaultText={title} />
          </h2>

          <EditableText
            id="teacher_booking_sub"
            as="p"
            defaultText={subtitle}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed block"
          />
        </div>

        <div
          className={`grid grid-cols-1 ${
            variant === 'varient_2'
              ? 'lg:grid-cols-12 gap-10'
              : 'lg:grid-cols-12 gap-10'
          } items-start`}
        >
          {/* LEFT COLUMN: Interactive 3D Calendar Slot Picker & Studio Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`p-6 sm:p-7 rounded-3xl border space-y-6 ${
                isDark
                  ? 'bg-[#131B2E] border-white/15 shadow-[0_12px_0_0_#1E293B]'
                  : 'bg-white border-slate-200/90 shadow-[0_12px_0_0_#E2E8F0]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono uppercase text-slate-400">
                    Step 01 · Live Availability
                  </div>
                  <h3 className="text-lg font-semibold mt-0.5">
                    Select a Day &amp; Time Slot
                  </h3>
                </div>
                <Calendar size={20} style={{ color: primaryColor }} />
              </div>

              {/* Day Selector Row */}
              <div className="grid grid-cols-5 gap-2">
                {CALENDAR_DAYS.map((d) => {
                  const active = selectedDayId === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => handleSelectDay(d.id)}
                      className={`py-3 px-2 rounded-2xl border text-center transition-all cursor-pointer ${
                        active
                          ? 'text-white shadow-sm -translate-y-0.5'
                          : isDark
                          ? 'bg-[#0B0F19] border-white/10 text-slate-300 hover:bg-white/5'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                      style={
                        active
                          ? {
                              backgroundColor: primaryColor,
                              borderColor: primaryColor,
                            }
                          : undefined
                      }
                    >
                      <div className="text-[11px] font-medium opacity-85">
                        {d.day}
                      </div>
                      <div className="text-xs font-mono font-semibold tabular-nums mt-0.5">
                        {d.date}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Time Slots for Selected Day */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <Clock size={13} style={{ color: primaryColor }} />
                    <span>
                      Available Slots on {currentDayObj.day}, {currentDayObj.date}:
                    </span>
                  </span>
                  <span className="font-mono tabular-nums">EST (UTC-5)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {currentDayObj.slots.map((slot) => {
                    const active = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-mono font-semibold tabular-nums whitespace-nowrap transition cursor-pointer ${
                          active
                            ? 'text-white'
                            : isDark
                            ? 'bg-[#0B0F19] border-white/10 text-slate-200 hover:border-blue-400'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-blue-600'
                        }`}
                        style={
                          active
                            ? {
                                backgroundColor: primaryColor,
                                borderColor: primaryColor,
                              }
                            : undefined
                        }
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Direct Studio Contact Details */}
              <div className="pt-5 border-t border-slate-200/80 dark:border-white/10 space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <Mail size={16} style={{ color: primaryColor }} className="shrink-0" />
                  <span>julian.vance@mit-lightboard.edu</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <Phone size={16} style={{ color: primaryColor }} className="shrink-0" />
                  <span className="font-mono tabular-nums">+1 (617) 555-0184 · WhatsApp &amp; SMS</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <MapPin size={16} style={{ color: primaryColor }} className="shrink-0" />
                  <span>Harvard Square Studio, Cambridge, MA &amp; Worldwide via 4K Zoom</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Booking & Inquiry Form */}
          <div className="lg:col-span-7">
            <div
              className={`p-6 sm:p-8 rounded-3xl border ${
                isDark
                  ? 'bg-[#131B2E] border-white/15 shadow-[0_12px_0_0_#1E293B]'
                  : 'bg-white border-slate-200/90 shadow-[0_12px_0_0_#E2E8F0]'
              }`}
            >
              {bookingConfirmed ? (
                <div className="py-8 text-center space-y-5">
                  <div
                    className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <CheckCircle2 size={28} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
                      ● Session Slot Locked In
                    </div>
                    <h3 className="text-2xl font-semibold">
                      We’re Confirmed for {currentDayObj.day}, {currentDayObj.date} at{' '}
                      {selectedTimeSlot}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                      A calendar invitation and 4K Lightboard Zoom link have been sent to{' '}
                      <strong className="text-slate-900 dark:text-white">{email}</strong>{' '}
                      for <strong className="text-slate-900 dark:text-white">{studentName}</strong>.
                    </p>
                  </div>

                  <div
                    className={`max-w-md mx-auto p-4 rounded-2xl border text-left text-xs space-y-1.5 font-mono ${
                      isDark
                        ? 'bg-[#0B0F19] border-white/10 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>PACKAGE: {selectedPackage}</div>
                    <div>SUBJECT: {subjectCourse}</div>
                    <div>
                      TIME: {currentDayObj.day}, {currentDayObj.date} · {selectedTimeSlot}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleDownloadIcs}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white inline-flex items-center gap-2 cursor-pointer"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Download size={14} />
                      <span>Download .ICS Calendar File</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingConfirmed(false)}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 text-xs font-semibold cursor-pointer"
                    >
                      Book Another Slot
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitBooking} className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200/80 dark:border-white/10">
                    <div>
                      <div className="text-xs font-mono uppercase text-slate-400">
                        Step 02 · Student &amp; Course Details
                      </div>
                      <h3 className="text-lg font-semibold mt-0.5">
                        Complete Your Reservation or Inquiry
                      </h3>
                    </div>
                    <span
                      className="text-xs font-mono font-semibold tabular-nums"
                      style={{ color: primaryColor }}
                    >
                      Selected: {currentDayObj.day}, {currentDayObj.date} · {selectedTimeSlot}
                    </span>
                  </div>

                  {formError && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-semibold text-rose-600 dark:text-rose-300">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold">
                        Student or Parent Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Maya Lin / Dr. Sterling"
                        className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm focus:outline-none ${
                          isDark
                            ? 'bg-[#0B0F19] border-white/15 text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold">
                        Email Address (For Zoom &amp; Notes) *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@school.edu"
                        className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm focus:outline-none ${
                          isDark
                            ? 'bg-[#0B0F19] border-white/15 text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (617) 555-0199"
                        className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm focus:outline-none ${
                          isDark
                            ? 'bg-[#0B0F19] border-white/15 text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold">
                        Subject / Target Exam
                      </label>
                      <select
                        value={subjectCourse}
                        onChange={(e) => setSubjectCourse(e.target.value)}
                        className={`w-full px-3.5 py-3 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none ${
                          isDark
                            ? 'bg-[#0B0F19] border-white/15 text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      >
                        <option value="AP Calculus BC / Multivariable">
                          AP Calculus BC / Multivariable
                        </option>
                        <option value="AP Physics C (Mechanics & E&M)">
                          AP Physics C (Mechanics &amp; E&amp;M)
                        </option>
                        <option value="IB Mathematics / Physics HL">
                          IB Mathematics / Physics HL
                        </option>
                        <option value="AIME / USAMO / F=ma Olympiad">
                          AIME / USAMO / F=ma Olympiad
                        </option>
                        <option value="SAT / ACT Math Intensive">
                          SAT / ACT Math Intensive
                        </option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold">
                        Session Type
                      </label>
                      <select
                        value={selectedPackage}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                        className={`w-full px-3.5 py-3 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none ${
                          isDark
                            ? 'bg-[#0B0F19] border-white/15 text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      >
                        <option value="Free 30-Min Diagnostic Trial">
                          Free 30-Min Diagnostic Trial
                        </option>
                        <option value="1-on-1 Bespoke Tutoring">
                          1-on-1 Bespoke Tutoring
                        </option>
                        <option value="Small-Group Problem Lab">
                          Small-Group Problem Lab
                        </option>
                        <option value="Intensive Exam & Olympiad Package">
                          Intensive Exam &amp; Olympiad Package
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold">
                      Current Topics, Upcoming Exam Date, or Questions
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your current textbook, recent test scores, or specific topics you want to cover on the 3D lightboard..."
                      className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm focus:outline-none ${
                        isDark
                          ? 'bg-[#0B0F19] border-white/15 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl text-sm font-semibold text-white inline-flex items-center justify-center gap-2 transition-transform active:translate-y-0.5 cursor-pointer"
                    style={{
                      backgroundColor: primaryColor,
                      boxShadow: `0 6px 0 0 ${isDark ? '#1E3A8A' : '#1D4ED8'}`,
                    }}
                  >
                    <Send size={16} />
                    <span>
                      Lock In {currentDayObj.day}, {currentDayObj.date} at {selectedTimeSlot} &amp; Send Message
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
