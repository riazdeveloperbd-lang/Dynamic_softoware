import React, { useState, useEffect } from 'react';
import {
  CalendarClock,
  MapPin,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Lock,
  CheckCircle2,
  ArrowRight,
  Building2,
  Stethoscope,
  RefreshCw,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface CareSerialChamberSchedulerSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface ChamberTabConfig {
  id: 'dhanmondi' | 'gulshan' | 'chattogram';
  tabTitle: string;
  hospitalName: string;
  hubArea: string;
  roomDetails: string;
  visitingDays: string;
  visitingHours: string;
  shiftType: 'Evening Shift' | 'Morning & Afternoon Shift';
  slots: {
    id: string;
    timeLabel: string;
    serialNum: number;
    estimatedConsultTime: string;
    status: 'available' | 'booked' | 'scarcity';
    scarcityBadge?: string;
  }[];
}

const CHAMBER_TABS: ChamberTabConfig[] = [
  {
    id: 'dhanmondi',
    tabTitle: 'Popular Diagnostic Center (Dhanmondi)',
    hospitalName: 'Popular Diagnostic Center, Dhanmondi',
    hubArea: 'House 16, Road 2, Dhanmondi, Dhaka-1205',
    roomDetails: 'Room 402 (Building-2, Lift-4)',
    visitingDays: 'Sat, Mon, Wed',
    visitingHours: '5:00 PM – 9:00 PM',
    shiftType: 'Evening Shift',
    slots: [
      {
        id: 'dhan-1',
        timeLabel: '5:30 PM',
        serialNum: 4,
        estimatedConsultTime: '5:35 PM',
        status: 'booked',
      },
      {
        id: 'dhan-2',
        timeLabel: '5:45 PM',
        serialNum: 6,
        estimatedConsultTime: '5:50 PM',
        status: 'booked',
      },
      {
        id: 'dhan-3',
        timeLabel: '6:00 PM',
        serialNum: 9,
        estimatedConsultTime: '6:05 PM',
        status: 'available',
      },
      {
        id: 'dhan-4',
        timeLabel: '6:15 PM',
        serialNum: 11,
        estimatedConsultTime: '6:22 PM',
        status: 'available',
      },
      {
        id: 'dhan-5',
        timeLabel: '6:30 PM',
        serialNum: 12,
        estimatedConsultTime: '6:38 PM',
        status: 'booked',
      },
      {
        id: 'dhan-6',
        timeLabel: '6:45 PM',
        serialNum: 12,
        estimatedConsultTime: '6:45 PM',
        status: 'available',
      },
      {
        id: 'dhan-7',
        timeLabel: '7:05 PM',
        serialNum: 14,
        estimatedConsultTime: '7:10 PM',
        status: 'scarcity',
        scarcityBadge: 'Only 2 Slots Left!',
      },
      {
        id: 'dhan-8',
        timeLabel: '7:30 PM',
        serialNum: 17,
        estimatedConsultTime: '7:38 PM',
        status: 'available',
      },
      {
        id: 'dhan-9',
        timeLabel: '8:00 PM',
        serialNum: 21,
        estimatedConsultTime: '8:08 PM',
        status: 'scarcity',
        scarcityBadge: 'Only 2 Slots Left!',
      },
      {
        id: 'dhan-10',
        timeLabel: '8:30 PM',
        serialNum: 24,
        estimatedConsultTime: '8:35 PM',
        status: 'booked',
      },
    ],
  },
  {
    id: 'gulshan',
    tabTitle: 'Labaid Specialized Hospital (Gulshan)',
    hospitalName: 'Labaid Specialized Hospital, Gulshan-2',
    hubArea: 'House 13/A, Road 35, Gulshan-2, Dhaka-1212',
    roomDetails: 'Room 308 (Cardiac & Specialist Wing)',
    visitingDays: 'Sun, Tue, Thu',
    visitingHours: '6:00 PM – 9:00 PM',
    shiftType: 'Evening Shift',
    slots: [
      {
        id: 'gul-1',
        timeLabel: '6:00 PM',
        serialNum: 2,
        estimatedConsultTime: '6:05 PM',
        status: 'booked',
      },
      {
        id: 'gul-2',
        timeLabel: '6:15 PM',
        serialNum: 5,
        estimatedConsultTime: '6:20 PM',
        status: 'available',
      },
      {
        id: 'gul-3',
        timeLabel: '6:30 PM',
        serialNum: 7,
        estimatedConsultTime: '6:35 PM',
        status: 'booked',
      },
      {
        id: 'gul-4',
        timeLabel: '6:45 PM',
        serialNum: 9,
        estimatedConsultTime: '6:50 PM',
        status: 'available',
      },
      {
        id: 'gul-5',
        timeLabel: '7:05 PM',
        serialNum: 14,
        estimatedConsultTime: '7:10 PM',
        status: 'scarcity',
        scarcityBadge: 'Only 2 Slots Left!',
      },
      {
        id: 'gul-6',
        timeLabel: '7:30 PM',
        serialNum: 16,
        estimatedConsultTime: '7:35 PM',
        status: 'available',
      },
      {
        id: 'gul-7',
        timeLabel: '8:00 PM',
        serialNum: 19,
        estimatedConsultTime: '8:05 PM',
        status: 'available',
      },
      {
        id: 'gul-8',
        timeLabel: '8:30 PM',
        serialNum: 22,
        estimatedConsultTime: '8:35 PM',
        status: 'booked',
      },
    ],
  },
  {
    id: 'chattogram',
    tabTitle: 'Chevron Clinical Lab (Chattogram)',
    hospitalName: 'Chevron Clinical Laboratory, Panchlaish, Chattogram',
    hubArea: '12/12 O.R. Nizam Road, Panchlaish, Chattogram',
    roomDetails: 'VIP Consultation Suite 204 (2nd Floor)',
    visitingDays: 'Friday Only',
    visitingHours: '10:00 AM – 4:00 PM',
    shiftType: 'Morning & Afternoon Shift',
    slots: [
      {
        id: 'ctg-1',
        timeLabel: '10:15 AM',
        serialNum: 3,
        estimatedConsultTime: '10:20 AM',
        status: 'booked',
      },
      {
        id: 'ctg-2',
        timeLabel: '10:45 AM',
        serialNum: 6,
        estimatedConsultTime: '10:50 AM',
        status: 'available',
      },
      {
        id: 'ctg-3',
        timeLabel: '11:15 AM',
        serialNum: 9,
        estimatedConsultTime: '11:20 AM',
        status: 'available',
      },
      {
        id: 'ctg-4',
        timeLabel: '11:45 AM',
        serialNum: 12,
        estimatedConsultTime: '11:52 AM',
        status: 'scarcity',
        scarcityBadge: 'Only 2 Slots Left!',
      },
      {
        id: 'ctg-5',
        timeLabel: '12:15 PM',
        serialNum: 14,
        estimatedConsultTime: '12:25 PM',
        status: 'booked',
      },
      {
        id: 'ctg-6',
        timeLabel: '2:30 PM',
        serialNum: 18,
        estimatedConsultTime: '2:38 PM',
        status: 'available',
      },
      {
        id: 'ctg-7',
        timeLabel: '3:00 PM',
        serialNum: 21,
        estimatedConsultTime: '3:08 PM',
        status: 'scarcity',
        scarcityBadge: 'Only 2 Slots Left!',
      },
      {
        id: 'ctg-8',
        timeLabel: '3:30 PM',
        serialNum: 25,
        estimatedConsultTime: '3:35 PM',
        status: 'available',
      },
    ],
  },
];

// Generate 14-day horizontal date strip starting with Sat, 12 Oct
const NEXT_14_DAYS = [
  { id: 'd1', dayShort: 'Sat', dateLabel: '12 Oct', fullLabel: 'Sat, 12 Oct', slotsOpen: 7 },
  { id: 'd2', dayShort: 'Sun', dateLabel: '13 Oct', fullLabel: 'Sun, 13 Oct', slotsOpen: 5 },
  { id: 'd3', dayShort: 'Mon', dateLabel: '14 Oct', fullLabel: 'Mon, 14 Oct', slotsOpen: 8 },
  { id: 'd4', dayShort: 'Tue', dateLabel: '15 Oct', fullLabel: 'Tue, 15 Oct', slotsOpen: 6 },
  { id: 'd5', dayShort: 'Wed', dateLabel: '16 Oct', fullLabel: 'Wed, 16 Oct', slotsOpen: 9 },
  { id: 'd6', dayShort: 'Thu', dateLabel: '17 Oct', fullLabel: 'Thu, 17 Oct', slotsOpen: 4 },
  { id: 'd7', dayShort: 'Fri', dateLabel: '18 Oct', fullLabel: 'Fri, 18 Oct', slotsOpen: 6 },
  { id: 'd8', dayShort: 'Sat', dateLabel: '19 Oct', fullLabel: 'Sat, 19 Oct', slotsOpen: 10 },
  { id: 'd9', dayShort: 'Sun', dateLabel: '20 Oct', fullLabel: 'Sun, 20 Oct', slotsOpen: 7 },
  { id: 'd10', dayShort: 'Mon', dateLabel: '21 Oct', fullLabel: 'Mon, 21 Oct', slotsOpen: 11 },
  { id: 'd11', dayShort: 'Tue', dateLabel: '22 Oct', fullLabel: 'Tue, 22 Oct', slotsOpen: 8 },
  { id: 'd12', dayShort: 'Wed', dateLabel: '23 Oct', fullLabel: 'Wed, 23 Oct', slotsOpen: 9 },
  { id: 'd13', dayShort: 'Thu', dateLabel: '24 Oct', fullLabel: 'Thu, 24 Oct', slotsOpen: 6 },
  { id: 'd14', dayShort: 'Fri', dateLabel: '25 Oct', fullLabel: 'Fri, 25 Oct', slotsOpen: 5 },
];

export const CareSerialChamberSchedulerSection: React.FC<
  CareSerialChamberSchedulerSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [selectedDoctorName, setSelectedDoctorName] = useState<string>(
    'Prof. Dr. A. K. Khan (Cardiology)'
  );
  const [activeChamberTabId, setActiveChamberTabId] = useState<
    'dhanmondi' | 'gulshan' | 'chattogram'
  >('dhanmondi');
  const [selectedDateId, setSelectedDateId] = useState<string>('d1');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('dhan-6');
  const [lockSecondsRemaining, setLockSecondsRemaining] = useState<number>(300);

  const medicalTeal = primaryColor || '#0D9488';
  const softEmerald = '#10B981';
  const isBrutalist = variant === 'varient_3';

  const activeChamber =
    CHAMBER_TABS.find((t) => t.id === activeChamberTabId) || CHAMBER_TABS[0];
  const activeDateObj =
    NEXT_14_DAYS.find((d) => d.id === selectedDateId) || NEXT_14_DAYS[0];
  const activeSlotObj =
    activeChamber.slots.find((s) => s.id === selectedSlotId) ||
    activeChamber.slots.find((s) => s.status !== 'booked') ||
    activeChamber.slots[0];

  // Listen for doctor selection from Directory Cards
  useEffect(() => {
    const handleSelectDoc = (e: Event) => {
      const customEvent = e as CustomEvent<{
        doctorName: string;
        specialtyLabel: string;
        defaultHub: string;
      }>;
      if (!customEvent.detail) return;
      const { doctorName, specialtyLabel, defaultHub } = customEvent.detail;
      setSelectedDoctorName(`${doctorName} (${specialtyLabel.split('&')[0].trim()})`);
      if (defaultHub.toLowerCase().includes('gulshan')) {
        setActiveChamberTabId('gulshan');
        setSelectedSlotId('gul-5');
      } else if (defaultHub.toLowerCase().includes('chattogram')) {
        setActiveChamberTabId('chattogram');
        setSelectedSlotId('ctg-4');
      } else {
        setActiveChamberTabId('dhanmondi');
        setSelectedSlotId('dhan-6');
      }
      setLockSecondsRemaining(300);
    };

    window.addEventListener('careserial:select-doctor-slot', handleSelectDoc);
    return () =>
      window.removeEventListener('careserial:select-doctor-slot', handleSelectDoc);
  }, []);

  // 5-minute real-time inventory lock countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setLockSecondsRemaining((prev) => (prev > 1 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedSlotId, activeChamberTabId, selectedDateId]);

  const formatCountdown = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSelectChamberTab = (tabId: 'dhanmondi' | 'gulshan' | 'chattogram') => {
    setActiveChamberTabId(tabId);
    const targetTab = CHAMBER_TABS.find((t) => t.id === tabId);
    const firstOpen = targetTab?.slots.find((s) => s.status !== 'booked');
    if (firstOpen) {
      setSelectedSlotId(firstOpen.id);
    }
    setLockSecondsRemaining(300);
  };

  const handleProceedToPatientIntake = () => {
    window.dispatchEvent(
      new CustomEvent('careserial:sync-slot-to-intake', {
        detail: {
          doctorDisplay: selectedDoctorName,
          chamberDisplay: activeChamber.hospitalName,
          dateDisplay: activeDateObj.fullLabel,
          timeDisplay: activeSlotObj.estimatedConsultTime,
          serialNum: activeSlotObj.serialNum,
        },
      })
    );
    const intakeEl = document.getElementById('careserial-intake');
    if (intakeEl) {
      intakeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="careserial-scheduler"
      className={`py-16 sm:py-24 scroll-mt-20 border-t transition-colors ${
        isDark
          ? 'bg-[#0B1120] text-slate-100 border-slate-800'
          : 'bg-white text-[#0F172A] border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white"
            style={{ backgroundColor: medicalTeal }}
          >
            <CalendarClock size={13} />
            MULTI-CHAMBER SCHEDULE & REAL-TIME SLOT PICKER
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            <EditableText
              id="careserial_scheduler_title"
              defaultText={
                title ||
                'Switch Practice Chambers & Lock Your Exact Serial Number'
              }
            />
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            <EditableText
              id="careserial_scheduler_subtitle"
              defaultText={
                subtitle ||
                'Select between Dhanmondi, Gulshan, and Chattogram chambers, browse the 14-day schedule strip, and reserve your time slot with a 5-minute real-time inventory lock.'
              }
            />
          </p>
        </div>

        {/* Main Scheduler Container */}
        <div
          className={`overflow-hidden border shadow-xl ${
            isBrutalist
              ? 'rounded-none border-2 border-[#0F172A] shadow-[6px_6px_0px_#0D9488]'
              : 'rounded-3xl border-slate-200 dark:border-slate-800'
          } ${isDark ? 'bg-slate-900' : 'bg-[#F8FAFC]'}`}
        >
          {/* Top Selected Doctor Bar & 5-Min Inventory Lock Banner */}
          <div
            className="p-4 sm:p-6 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            style={{ backgroundColor: '#0F172A' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: medicalTeal }}
              >
                <Stethoscope size={20} />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400 block">
                  ACTIVE CHAMBER QUEUE FOR:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black">
                    {selectedDoctorName}
                  </h3>
                  <select
                    aria-label="Switch Doctor for Chamber Scheduler"
                    value={selectedDoctorName}
                    onChange={(e) => setSelectedDoctorName(e.target.value)}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800 text-teal-300 border border-slate-700 cursor-pointer"
                  >
                    <option value="Prof. Dr. A. K. Khan (Cardiology)">
                      Switch: Prof. Dr. A. K. Khan (Cardiology)
                    </option>
                    <option value="Assoc. Prof. Dr. Nusrat Jahan (Gynecology)">
                      Switch: Assoc. Prof. Dr. Nusrat Jahan (Gynecology)
                    </option>
                    <option value="Dr. Tanvir Ahmed Chowdhury (Dental Care)">
                      Switch: Dr. Tanvir Ahmed Chowdhury (Dental Care)
                    </option>
                    <option value="Assoc. Prof. Dr. Mahmudul Hasan (Pediatrics)">
                      Switch: Assoc. Prof. Dr. Mahmudul Hasan (Pediatrics)
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* 5-Minute Inventory Lock Timer */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-400/30">
              <Lock size={16} className="text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="text-emerald-300 font-extrabold block">
                  Real-Time Inventory Lock Active:{' '}
                  <strong className="text-white font-mono text-sm">
                    {formatCountdown(lockSecondsRemaining)}
                  </strong>
                </span>
                <span className="text-[11px] text-slate-300">
                  Slot held for 5 minutes to prevent double-booking
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLockSecondsRemaining(300)}
                title="Refresh 5-Minute Hold"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <RefreshCw size={13} />
              </button>
            </div>
          </div>

          {/* 1. MULTI-TAB CHAMBER SELECTOR */}
          <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
              1. Select Practice Chamber Location (Switch Tabs):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {CHAMBER_TABS.map((tab, idx) => {
                const isSelected = activeChamberTabId === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleSelectChamberTab(tab.id)}
                    className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                      isSelected
                        ? 'border-2 text-white shadow-md'
                        : isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-teal-500/50'
                        : 'bg-[#F8FAFC] border-slate-200 text-[#0F172A] hover:border-[#0D9488]'
                    }`}
                    style={
                      isSelected
                        ? {
                            backgroundColor: medicalTeal,
                            borderColor: medicalTeal,
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          isSelected
                            ? 'bg-black/25 text-white'
                            : 'bg-teal-500/10 text-teal-700 dark:text-teal-300'
                        }`}
                      >
                        Tab {idx + 1} · {tab.visitingDays}
                      </span>
                      <span
                        className={`text-[11px] font-extrabold ${
                          isSelected ? 'text-emerald-200' : 'text-slate-500'
                        }`}
                      >
                        {tab.visitingHours}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-black">
                      {tab.tabTitle}
                    </p>
                    <p
                      className={`text-[11px] mt-0.5 ${
                        isSelected ? 'text-teal-100' : 'text-slate-500'
                      }`}
                    >
                      {tab.roomDetails}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. HORIZONTAL 14-DAY DATE STRIP */}
          <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between gap-2 mb-3">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                2. Select Date (Next 14 Days Real-Time Availability):
              </p>
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400">
                Selected: {activeDateObj.fullLabel} · {activeChamber.shiftType}
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {NEXT_14_DAYS.map((day) => {
                const active = selectedDateId === day.id;
                return (
                  <button
                    key={day.id}
                    type="button"
                    onClick={() => {
                      setSelectedDateId(day.id);
                      setLockSecondsRemaining(300);
                    }}
                    className={`min-w-[86px] p-3 rounded-2xl border text-center shrink-0 transition cursor-pointer ${
                      active
                        ? 'text-white border-transparent shadow-sm'
                        : isDark
                        ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-teal-500'
                        : 'bg-white border-slate-200 text-[#0F172A] hover:border-[#0D9488]'
                    }`}
                    style={
                      active ? { backgroundColor: '#0F172A' } : undefined
                    }
                  >
                    <span
                      className={`text-[10px] font-extrabold uppercase block ${
                        active ? 'text-teal-400' : 'text-slate-400'
                      }`}
                    >
                      {day.dayShort}
                    </span>
                    <span className="text-xs sm:text-sm font-black block mt-0.5">
                      {day.dateLabel}
                    </span>
                    <span
                      className={`text-[10px] font-bold block mt-1 ${
                        active ? 'text-emerald-400' : 'text-emerald-600'
                      }`}
                    >
                      {day.slotsOpen} Open
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. REAL-TIME SLOT GRID & SERIAL NUMBER ESTIMATOR */}
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Cols: Color-Coded Time Slots */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm sm:text-base font-black">
                    3. Pick Your Chamber Time Slot ({activeChamber.shiftType})
                  </h4>
                  <p className="text-xs text-slate-500">
                    {activeChamber.hospitalName} · {activeChamber.roomDetails}
                  </p>
                </div>

                {/* Color Legend */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: softEmerald }}
                    />
                    Green: Available
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Yellow: Only 2 Left!
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                    Strikethrough: Booked
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {activeChamber.slots.map((slot) => {
                  const isBooked = slot.status === 'booked';
                  const isScarcity = slot.status === 'scarcity';
                  const isSelected = activeSlotObj.id === slot.id && !isBooked;

                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={isBooked}
                      onClick={() => {
                        if (!isBooked) {
                          setSelectedSlotId(slot.id);
                          setLockSecondsRemaining(300);
                        }
                      }}
                      className={`relative p-3.5 rounded-2xl border text-center transition flex flex-col items-center justify-center min-h-[88px] ${
                        isBooked
                          ? 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400 cursor-not-allowed opacity-65'
                          : isSelected
                          ? 'border-2 text-white shadow-md cursor-pointer'
                          : isDark
                          ? 'bg-slate-900 border-emerald-500/40 text-slate-100 hover:border-emerald-400 cursor-pointer'
                          : 'bg-emerald-50/70 border-emerald-500/40 text-[#0F172A] hover:border-emerald-600 cursor-pointer'
                      }`}
                      style={
                        isSelected
                          ? {
                              backgroundColor: softEmerald,
                              borderColor: '#059669',
                            }
                          : undefined
                      }
                    >
                      {/* Yellow Scarcity Badge */}
                      {isScarcity && !isBooked && (
                        <span className=" -top-2.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-amber-400 text-slate-950 shadow-xs mb-1">
                          {slot.scarcityBadge}
                        </span>
                      )}

                      <span
                        className={`text-sm sm:text-base font-black ${
                          isBooked ? 'line-through' : ''
                        }`}
                      >
                        {slot.timeLabel}
                      </span>

                      <span
                        className={`text-[10px] font-extrabold mt-0.5 ${
                          isBooked
                            ? 'text-slate-400'
                            : isSelected
                            ? 'text-white'
                            : 'text-emerald-700 dark:text-emerald-400'
                        }`}
                      >
                        {isBooked ? 'Booked' : `Serial #${slot.serialNum}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right 4 Cols: Serial Number Estimator & Instant Lock Card */}
            <div
              className="lg:col-span-4 p-5 sm:p-6 rounded-3xl text-white space-y-4 shadow-lg"
              style={{ backgroundColor: '#0F172A' }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-400">
                  SERIAL NUMBER ESTIMATOR
                </span>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-black uppercase text-white"
                  style={{ backgroundColor: softEmerald }}
                >
                  5-MIN HOLD ACTIVE
                </span>
              </div>

              {/* Exact Required Readout: Selected Slot: Serial #14 — Est. Time 7:10 PM */}
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 space-y-1.5">
                <p className="text-[11px] font-bold text-emerald-300 uppercase">
                  Live Queue Sequence Calculation
                </p>
                <p className="text-base sm:text-lg font-black text-white">
                  Selected Slot: Serial #{activeSlotObj.serialNum} — Est. Time{' '}
                  {activeSlotObj.estimatedConsultTime}
                </p>
                <p className="text-[11px] text-slate-300">
                  {activeDateObj.fullLabel} · {activeChamber.hospitalName}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Practice Chamber:</span>
                  <strong className="text-white text-right">
                    {activeChamber.tabTitle}
                  </strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Room & Floor:</span>
                  <strong className="text-white">{activeChamber.roomDetails}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Inventory Hold Timer:</span>
                  <strong className="text-amber-400 font-mono">
                    {formatCountdown(lockSecondsRemaining)} remaining
                  </strong>
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceedToPatientIntake}
                className="w-full py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-black text-white shadow-md flex items-center justify-center gap-2 transition hover:opacity-95 cursor-pointer"
                style={{ backgroundColor: medicalTeal }}
              >
                <span>
                  Confirm Serial #{activeSlotObj.serialNum} & Enter Patient Details
                </span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
