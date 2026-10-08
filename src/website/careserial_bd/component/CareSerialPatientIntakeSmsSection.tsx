import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  UserCheck,
  Users,
  CheckCircle2,
  CalendarPlus,
  Download,
  ShieldCheck,
  CreditCard,
  Banknote,
  FileText,
  PhoneCall,
  Sparkles,
  Check,
  QrCode,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface CareSerialPatientIntakeSmsSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

type PatientTargetType = 'myself' | 'family';
type AppointmentVisitType =
  | 'New Consultation'
  | 'Report Show / Follow-up'
  | 'Second Opinion';
type BdPaymentOption = 'chamber_cash' | 'mfs_prepay';
type MfsGatewayBrand = 'bKash' | 'Nagad' | 'Rocket' | 'Visa/Mastercard';

export const CareSerialPatientIntakeSmsSection: React.FC<
  CareSerialPatientIntakeSmsSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  // Synced Chamber Slot Details
  const [doctorDisplay, setDoctorDisplay] = useState<string>(
    'Prof. Dr. A. K. Khan (Cardiology)'
  );
  const [chamberDisplay, setChamberDisplay] = useState<string>(
    'Popular Diagnostic, Dhanmondi'
  );
  const [dateDisplay, setDateDisplay] = useState<string>('Sat, 12 Oct');
  const [timeDisplay, setTimeDisplay] = useState<string>('6:45 PM');
  const [serialNum, setSerialNum] = useState<number>(12);

  // Patient Intake Form Fields
  const [patientType, setPatientType] = useState<PatientTargetType>('myself');
  const [patientFullName, setPatientFullName] = useState<string>(
    'মোঃ রাশেদুল ইসলাম / Md. Rashedul Islam'
  );
  const [patientAge, setPatientAge] = useState<string>('38');
  const [patientGender, setPatientGender] = useState<string>('Male');
  const [bdMobileNumber, setBdMobileNumber] = useState<string>('01711489201');
  const [appointmentType, setAppointmentType] =
    useState<AppointmentVisitType>('New Consultation');
  const [chiefComplaint, setChiefComplaint] = useState<string>(
    'Chest pain for 2 days and elevated blood pressure readings in the evening.'
  );

  // Payment Integration
  const [paymentOption, setPaymentOption] =
    useState<BdPaymentOption>('mfs_prepay');
  const [mfsGateway, setMfsGateway] = useState<MfsGatewayBrand>('bKash');

  // Confirmation & Action Feedback States
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [calendarSavedToast, setCalendarSavedToast] = useState<boolean>(false);
  const [pdfDownloadedToast, setPdfDownloadedToast] = useState<boolean>(false);

  const medicalTeal = primaryColor || '#0D9488';
  const softEmerald = '#10B981';
  const isBrutalist = variant === 'varient_3';

  // Listen for slot selection from Chamber Scheduler
  useEffect(() => {
    const handleSlotSync = (e: Event) => {
      const customEvent = e as CustomEvent<{
        doctorDisplay: string;
        chamberDisplay: string;
        dateDisplay: string;
        timeDisplay: string;
        serialNum: number;
      }>;
      if (!customEvent.detail) return;
      setDoctorDisplay(customEvent.detail.doctorDisplay);
      setChamberDisplay(customEvent.detail.chamberDisplay);
      setDateDisplay(customEvent.detail.dateDisplay);
      setTimeDisplay(customEvent.detail.timeDisplay);
      setSerialNum(customEvent.detail.serialNum);
    };

    window.addEventListener('careserial:sync-slot-to-intake', handleSlotSync);
    return () =>
      window.removeEventListener(
        'careserial:sync-slot-to-intake',
        handleSlotSync
      );
  }, []);

  // Bangladeshi 11-digit mobile validation (013-019XXXXXXXX)
  const cleanDigits = bdMobileNumber.replace(/\D/g, '');
  const isValidBdMobile = /^01[3-9]\d{8}$/.test(cleanDigits);

  const consultationFeeAmount =
    appointmentType === 'Report Show / Follow-up'
      ? 800
      : appointmentType === 'Second Opinion'
      ? 1000
      : 1200;

  const effectiveSerialNumber =
    paymentOption === 'mfs_prepay' ? serialNum : serialNum + 3;

  const handleConfirmAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  const handleSaveToGoogleCalendar = () => {
    setCalendarSavedToast(true);
    setTimeout(() => setCalendarSavedToast(false), 3500);
  };

  const handleDownloadAppointmentPass = () => {
    setPdfDownloadedToast(true);
    setTimeout(() => setPdfDownloadedToast(false), 3500);
  };

  return (
    <section
      id="careserial-intake"
      className={`py-16 sm:py-24 scroll-mt-20 border-t transition-colors ${
        isDark
          ? 'bg-[#0F172A] text-slate-100 border-slate-800'
          : 'bg-[#F8FAFC] text-[#0F172A] border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white"
            style={{ backgroundColor: medicalTeal }}
          >
            <Smartphone size={13} />
            PATIENT INTAKE FORM & AUTOMATED SMS PREVIEW
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            <EditableText
              id="careserial_intake_title"
              defaultText={
                title ||
                'Complete Patient Intake & Receive Instant SMS Serial Pass'
              }
            />
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            <EditableText
              id="careserial_intake_subtitle"
              defaultText={
                subtitle ||
                'Supports Bangla & English patient names, 11-digit BD mobile verification, Pay-at-Chamber or bKash/Nagad pre-booking, and real-time SMS chamber queue tracking.'
              }
            />
          </p>
        </div>

        {/* Main 12-Col Grid: Left 7 Cols Intake Form | Right 5 Cols Automated SMS Replica & Pass */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 COLS: STREAMLINED PATIENT INTAKE & PAYMENT FORM */}
          <form
            onSubmit={handleConfirmAppointment}
            className={`lg:col-span-7 p-6 sm:p-8 border shadow-xl space-y-6 ${
              isBrutalist
                ? 'rounded-none border-2 border-[#0F172A] shadow-[6px_6px_0px_#0D9488]'
                : 'rounded-3xl border-slate-200 dark:border-slate-800'
            } ${isDark ? 'bg-slate-900' : 'bg-white'}`}
          >
            {/* 1. Patient Type Toggle: [ For Myself ] vs [ For Family Member/Other ] */}
            <div className="space-y-2.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                1. Who Is This Appointment For? (রোগীর ধরন নির্বাচন করুন)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPatientType('myself');
                    setPatientFullName('মোঃ রাশেদুল ইসলাম / Md. Rashedul Islam');
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                    patientType === 'myself'
                      ? 'border-2 text-white shadow-sm'
                      : isDark
                      ? 'bg-slate-950 border-slate-800 text-slate-300'
                      : 'bg-[#F8FAFC] border-slate-200 text-[#0F172A]'
                  }`}
                  style={
                    patientType === 'myself'
                      ? { backgroundColor: medicalTeal, borderColor: medicalTeal }
                      : undefined
                  }
                >
                  <UserCheck size={18} />
                  <div>
                    <span className="text-xs sm:text-sm font-black block">
                      [ For Myself ]
                    </span>
                    <span
                      className={`text-[10px] font-bold block ${
                        patientType === 'myself'
                          ? 'text-teal-100'
                          : 'text-slate-500'
                      }`}
                    >
                      নিজের জন্য সিরিয়াল
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPatientType('family');
                    setPatientFullName('আনোয়ারা বেগম / Mrs. Anwara Begum');
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                    patientType === 'family'
                      ? 'border-2 text-white shadow-sm'
                      : isDark
                      ? 'bg-slate-950 border-slate-800 text-slate-300'
                      : 'bg-[#F8FAFC] border-slate-200 text-[#0F172A]'
                  }`}
                  style={
                    patientType === 'family'
                      ? { backgroundColor: medicalTeal, borderColor: medicalTeal }
                      : undefined
                  }
                >
                  <Users size={18} />
                  <div>
                    <span className="text-xs sm:text-sm font-black block">
                      [ For Family Member/Other ]
                    </span>
                    <span
                      className={`text-[10px] font-bold block ${
                        patientType === 'family'
                          ? 'text-teal-100'
                          : 'text-slate-500'
                      }`}
                    >
                      পরিবারের সদস্যের জন্য
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Full Patient Name & Age / Gender / +880 Mobile Number */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 block mb-1.5">
                  Full Patient Name (English / বাংলা নাম সমর্থিত) *
                </label>
                <input
                  type="text"
                  required
                  value={patientFullName}
                  onChange={(e) => setPatientFullName(e.target.value)}
                  placeholder="e.g., Md. Rashedul Islam / মোঃ রাশেদুল ইসলাম"
                  className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm font-bold border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-950 focus:outline-none focus:border-[#0D9488]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                {/* Age */}
                <div className="sm:col-span-3">
                  <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 block mb-1.5">
                    Age (বয়স) *
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={120}
                    required
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-950"
                  />
                </div>

                {/* Gender */}
                <div className="sm:col-span-4">
                  <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 block mb-1.5">
                    Gender (লিঙ্গ) *
                  </label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-950"
                  >
                    <option value="Male">Male (পুরুষ)</option>
                    <option value="Female">Female (মহিলা)</option>
                    <option value="Child">Child / Infant (শিশু)</option>
                  </select>
                </div>

                {/* Bangladeshi 11-Digit +880 Mobile Number */}
                <div className="sm:col-span-5">
                  <label className="flex items-center justify-between text-xs font-extrabold text-slate-600 dark:text-slate-300 mb-1.5">
                    <span>BD Mobile (+880) *</span>
                    <span
                      className={`text-[10px] font-black ${
                        isValidBdMobile ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      {isValidBdMobile ? '✓ Valid 11-Digit' : 'Enter 01XXXXXXXXX'}
                    </span>
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-950 overflow-hidden">
                    <span className="px-2.5 py-3 text-xs font-black bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-r border-slate-300 dark:border-slate-700">
                      +88
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={11}
                      value={bdMobileNumber}
                      onChange={(e) => setBdMobileNumber(e.target.value)}
                      placeholder="01711000000"
                      className="w-full px-3 py-3 text-xs sm:text-sm font-mono font-bold bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Type Dropdown & Brief Chief Complaint */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="sm:col-span-5">
                <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 block mb-1.5">
                  Appointment Type *
                </label>
                <select
                  value={appointmentType}
                  onChange={(e) =>
                    setAppointmentType(e.target.value as AppointmentVisitType)
                  }
                  className="w-full px-3.5 py-3 rounded-xl text-xs sm:text-sm font-extrabold border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-950"
                >
                  <option value="New Consultation">
                    [ New Consultation ] — ৳1,200
                  </option>
                  <option value="Report Show / Follow-up">
                    [ Report Show / Follow-up ] — ৳800
                  </option>
                  <option value="Second Opinion">
                    [ Second Opinion ] — ৳1,000
                  </option>
                </select>
              </div>

              <div className="sm:col-span-7">
                <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 block mb-1.5">
                  Brief Chief Complaint / Symptoms (সমস্যার সংক্ষিপ্ত বিবরণ)
                </label>
                <input
                  type="text"
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  placeholder="e.g., Chest pain for 2 days, Routine dental scaling..."
                  className="w-full px-3.5 py-3 rounded-xl text-xs sm:text-sm border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-950"
                />
              </div>
            </div>

            {/* 2. PAYMENT INTEGRATION: Pay at Chamber vs Pre-Pay via MFS (bKash, Nagad, Rocket, Visa/MC) */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                2. Select Payment Option (পেমেন্ট পদ্ধতি নির্বাচন করুন)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option 2: Pre-pay via Mobile Financial Services (Early Serial Priority) */}
                <button
                  type="button"
                  onClick={() => setPaymentOption('mfs_prepay')}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                    paymentOption === 'mfs_prepay'
                      ? 'border-2 bg-teal-50/50 dark:bg-teal-950/30'
                      : isDark
                      ? 'bg-slate-950 border-slate-800'
                      : 'bg-[#F8FAFC] border-slate-200'
                  }`}
                  style={
                    paymentOption === 'mfs_prepay'
                      ? { borderColor: medicalTeal }
                      : undefined
                  }
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-black uppercase text-white"
                      style={{ backgroundColor: softEmerald }}
                    >
                      EARLY SERIAL # GUARANTEED
                    </span>
                    <CreditCard size={16} style={{ color: medicalTeal }} />
                  </div>
                  <p className="text-xs sm:text-sm font-black">
                    Pre-pay via bKash / Nagad / Rocket / Card
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Locks Early Serial #{serialNum} immediately with zero chamber counter queue
                  </p>
                </button>

                {/* Option 1: Pay at Chamber (Cash on arrival) */}
                <button
                  type="button"
                  onClick={() => setPaymentOption('chamber_cash')}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                    paymentOption === 'chamber_cash'
                      ? 'border-2 bg-teal-50/50 dark:bg-teal-950/30'
                      : isDark
                      ? 'bg-slate-950 border-slate-800'
                      : 'bg-[#F8FAFC] border-slate-200'
                  }`}
                  style={
                    paymentOption === 'chamber_cash'
                      ? { borderColor: medicalTeal }
                      : undefined
                  }
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      CASH ON ARRIVAL
                    </span>
                    <Banknote size={16} className="text-slate-500" />
                  </div>
                  <p className="text-xs sm:text-sm font-black">
                    Pay at Chamber (চেম্বারে উপস্থিত হয়ে পেমেন্ট)
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Report 20 mins early at chamber desk (Standard Serial #{serialNum + 3})
                  </p>
                </button>
              </div>

              {/* MFS Gateway Selector Pills when Pre-pay is active */}
              {paymentOption === 'mfs_prepay' && (
                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-slate-500">
                    Choose Instant Gateway:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(
                      ['bKash', 'Nagad', 'Rocket', 'Visa/Mastercard'] as MfsGatewayBrand[]
                    ).map((gw) => {
                      const active = mfsGateway === gw;
                      const brandBg =
                        gw === 'bKash'
                          ? '#E2136E'
                          : gw === 'Nagad'
                          ? '#F37021'
                          : gw === 'Rocket'
                          ? '#8C3494'
                          : '#0F172A';
                      return (
                        <button
                          key={gw}
                          type="button"
                          onClick={() => setMfsGateway(gw)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                            active
                              ? 'text-white shadow-xs'
                              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                          style={
                            active ? { backgroundColor: brandBg } : undefined
                          }
                        >
                          {gw}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Submit & Generate SMS Pass Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl text-sm sm:text-base font-black text-white shadow-lg flex items-center justify-center gap-2 transition hover:opacity-95 cursor-pointer"
                style={{ backgroundColor: medicalTeal }}
              >
                <CheckCircle2 size={18} />
                <span>
                  {paymentOption === 'mfs_prepay'
                    ? `Confirm Serial #${effectiveSerialNumber} via ${mfsGateway} (৳${consultationFeeAmount.toLocaleString()})`
                    : `Confirm Serial #${effectiveSerialNumber} (Pay ৳${consultationFeeAmount.toLocaleString()} at Chamber)`}
                </span>
              </button>

              {bookingConfirmed && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-center text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
                  ✓ Appointment Confirmed! Automated SMS dispatched to +88
                  {bdMobileNumber}. Inspect your live SMS pass on the right.
                </div>
              )}
            </div>
          </form>

          {/* RIGHT 5 COLS: 3. AUTOMATED SMS CONFIRMATION PREVIEW COMPONENT */}
          <div className="lg:col-span-5 space-y-5">
            <div
              className={`p-6 sm:p-7 text-white shadow-2xl border ${
                isBrutalist
                  ? 'rounded-none border-2 border-[#0D9488]'
                  : 'rounded-3xl border-slate-800'
              }`}
              style={{ backgroundColor: '#0F172A' }}
            >
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: softEmerald }}
                  >
                    <Smartphone size={16} />
                  </span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
                      LIVE SMS GATEWAY REPLICA
                    </span>
                    <h3 className="text-sm sm:text-base font-black">
                      Automated SMS Confirmation Preview
                    </h3>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300">
                  +88{bdMobileNumber}
                </span>
              </div>

              {/* Exact Replica of the SMS Sent to the Patient's Phone */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-teal-500/40 font-mono text-xs sm:text-[13px] leading-relaxed text-emerald-300 space-y-1.5 shadow-inner">
                <div className="text-slate-500 text-[11px] select-none">
                  --------------------------------------------
                </div>
                <p className="font-bold text-white">
                  &quot;Appointment Confirmed!
                </p>
                <p>
                  <span className="text-slate-400">Doctor:</span>{' '}
                  <strong className="text-emerald-300">{doctorDisplay}</strong>
                </p>
                <p>
                  <span className="text-slate-400">Chamber:</span>{' '}
                  <strong className="text-white">{chamberDisplay}</strong>
                </p>
                <p>
                  <span className="text-slate-400">Date:</span>{' '}
                  <strong className="text-amber-300">{dateDisplay}</strong> |{' '}
                  <span className="text-slate-400">Est. Time:</span>{' '}
                  <strong className="text-emerald-300">
                    {timeDisplay} (Serial #{effectiveSerialNumber})
                  </strong>
                </p>
                <p>
                  <span className="text-slate-400">Patient:</span>{' '}
                  <span className="text-slate-200">
                    {patientFullName} ({patientAge}Y/{patientGender})
                  </span>
                </p>
                <p>
                  <span className="text-slate-400">Serial Tracking Link:</span>{' '}
                  <span className="underline text-teal-300">
                    [shorthand.link/xyz]
                  </span>
                </p>
                <p>
                  <span className="text-slate-400">Helpline:</span>{' '}
                  <span className="text-white">01700000000&quot;</span>
                </p>
                <div className="text-slate-500 text-[11px] select-none">
                  --------------------------------------------
                </div>
              </div>

              {/* Digital Chamber Pass Summary Strip */}
              <div className="mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <QrCode size={28} className="text-teal-400 shrink-0" />
                  <div>
                    <p className="font-black text-white">
                      Chamber Gate Pass · Serial #{effectiveSerialNumber}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {appointmentType} · Fee: ৳{consultationFeeAmount} (
                      {paymentOption === 'mfs_prepay'
                        ? `Paid via ${mfsGateway}`
                        : 'Pay at Chamber'}
                      )
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500 text-slate-950">
                  VERIFIED
                </span>
              </div>

              {/* Required Buttons: "Save to Google Calendar" & "Download Appointment Pass (PDF)" */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleSaveToGoogleCalendar}
                  className="py-3 px-4 rounded-xl text-xs font-extrabold bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <CalendarPlus size={15} className="text-teal-400" />
                  <span>Save to Google Calendar</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadAppointmentPass}
                  className="py-3 px-4 rounded-xl text-xs font-extrabold text-slate-950 flex items-center justify-center gap-2 transition hover:opacity-95 cursor-pointer"
                  style={{ backgroundColor: softEmerald }}
                >
                  <Download size={15} />
                  <span>Download Appointment Pass (PDF)</span>
                </button>
              </div>

              {calendarSavedToast && (
                <div className="mt-3 p-2.5 rounded-xl bg-teal-500/20 border border-teal-400/40 text-center text-xs font-bold text-teal-200">
                  ✓ Added &quot;{doctorDisplay} — Serial #{effectiveSerialNumber}&quot; to Google Calendar!
                </div>
              )}

              {pdfDownloadedToast && (
                <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-center text-xs font-bold text-emerald-200">
                  ✓ Downloaded Official Chamber Pass PDF (Serial #{effectiveSerialNumber})!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
