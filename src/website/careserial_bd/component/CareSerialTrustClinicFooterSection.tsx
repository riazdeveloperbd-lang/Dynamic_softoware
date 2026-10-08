import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  Star,
  CheckCircle2,
  PhoneCall,
  AlertTriangle,
  Lock,
  Eye,
  X,
  Stethoscope,
  Sparkles,
  MapPin,
  FileText,
  Clock,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface CareSerialTrustClinicFooterSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface ClinicWalkthroughCard {
  id: string;
  title: string;
  banglaSubtitle: string;
  hubBadge: string;
  certificationBadge: string;
  image: string;
  shortDesc: string;
  sterilizationStandards: string[];
  equipmentHighlights: string[];
  waitingAreaFeatures: string[];
}

interface VerifiedPatientReview {
  id: string;
  patientName: string;
  hubLocation: string;
  doctorVisited: string;
  chamberName: string;
  serialTag: string;
  rating: number;
  reviewHeadline: string;
  reviewBody: string;
  timeSavedMetric: string;
}

const CLINIC_WALKTHROUGH_CARDS: ClinicWalkthroughCard[] = [
  {
    id: 'walk-dental-sterilization',
    title: 'Class-B Autoclave Dental Sterilization & Implant Suite',
    banglaSubtitle: '১০০% জীবাণুমুক্ত ডেন্টাল ও ইমপ্ল্যান্ট ওটি',
    hubBadge: 'Gulshan-2 & Banani Road 11',
    certificationBadge: 'European EN-13060 Class-B Sterile',
    image:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=85',
    shortDesc:
      'Every dental handpiece and surgical instrument undergoes 4-stage ultrasonic enzymatic cleaning, individual pouch sealing, and vacuum Class-B autoclaving opened in front of the patient.',
    sterilizationStandards: [
      'Individual sterile indicator pouches unsealed chairside in front of every patient',
      'HEPA-14 medical air filtration & UV-C overnight operatory sanitization',
      '100% disposable saliva ejectors, bibs, and barrier films per serial slot',
    ],
    equipmentHighlights: [
      'Carestream 3D CBCT Full-Jaw Digital X-Ray (Low Radiation)',
      'Carl Zeiss Endodontic Microscope for Painless Single-Visit Root Canal',
      'Swiss EMS Piezon No-Pain Ultrasonic Scaling System',
    ],
    waitingAreaFeatures: [
      'Max 2 patients in lounge at a time via timed serial slots',
      'Dedicated child-friendly dental recovery corner',
    ],
  },
  {
    id: 'walk-diagnostic-imaging',
    title: '3.0 Tesla MRI, 128-Slice Cardiac CT & Automated Pathology',
    banglaSubtitle: 'আধুনিক ডায়াগনস্টিক ও অটোমেটেড ল্যাবরেটরি',
    hubBadge: 'Dhanmondi, Uttara & Chattogram',
    certificationBadge: 'ISO 15189 & RIQAS Quality Lab',
    image:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=85',
    shortDesc:
      'Zero sample mix-ups with barcoded vacutainer tubes and fully automated Roche Cobas analyzers. Digital smart reports are delivered via SMS link before your evening doctor serial.',
    sterilizationStandards: [
      'Single-use vacuum blood collection needles with instant barcode labeling',
      'Dedicated female phlebotomist and female ultrasonography suites',
      'Same-day 4-hour emergency cardiac troponin, lipid & HbA1c turnaround',
    ],
    equipmentHighlights: [
      'Siemens Magnetom 3.0T Wide-Bore Silent MRI (Claustrophobia-Friendly)',
      'GE Healthcare 4D Color Doppler Echocardiography & Anomaly Scan',
      'Roche Cobas 8000 Automated Clinical Chemistry & Immunoassay Line',
    ],
    waitingAreaFeatures: [
      'Live digital LED serial display boards outside every room',
      'Complimentary fasting breakfast box after morning blood sample collection',
    ],
  },
  {
    id: 'walk-waiting-lounge',
    title: 'Smart Serial Waiting Lounge & Elderly/Mother Care Zone',
    banglaSubtitle: 'স্মার্ট সিরিয়াল ডিসপ্লে ও ভিড়মুক্ত ওয়েটিং লাউঞ্জ',
    hubBadge: 'All Dhaka & Chattogram Partner Hubs',
    certificationBadge: 'Live SMS Queue Sync',
    image:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=85',
    shortDesc:
      'Instead of waiting 3 hours in a crowded corridor, track the doctor’s live running serial on your mobile phone and arrive just 15 minutes before your turn.',
    sterilizationStandards: [
      'Wheelchair-accessible lift lobbies and dedicated elderly seating',
      'Private breastfeeding and baby-changing station on pediatric floors',
      'Hospital-grade air conditioning with CO2 & humidity monitoring',
    ],
    equipmentHighlights: [
      'Live Chamber Queue TV synced with CareSerial SMS link',
      'Automated kiosk check-in for bKash/Nagad pre-paid patients',
      'On-site model pharmacy with cold-chain insulin & vaccine storage',
    ],
    waitingAreaFeatures: [
      'Average in-chamber wait time reduced from 2.5 hours to 14 minutes',
      'Dedicated prayer room (Namaz corner) & filtered drinking water',
    ],
  },
];

const VERIFIED_PATIENT_REVIEWS: VerifiedPatientReview[] = [
  {
    id: 'rev-1',
    patientName: 'Farhana Yasmin',
    hubLocation: 'Dhanmondi, Dhaka',
    doctorVisited: 'Prof. Dr. A. K. Khan (Cardiology)',
    chamberName: 'Popular Diagnostic Center, Dhanmondi — Room 402',
    serialTag: 'Verified Booking · Serial #12 (bKash Pre-paid)',
    rating: 5,
    reviewHeadline:
      '“No more calling the chamber assistant 20 times! Walked in 15 minutes before Serial #12.”',
    reviewBody:
      'Booking my father’s cardiology follow-up at Popular Dhanmondi used to mean sending someone in the morning just to write his name on a paper register. With CareSerial BD, I locked Serial #12 via bKash, tracked the live queue on SMS, and we entered Room 402 at 6:48 PM sharp.',
    timeSavedMetric: 'Saved 2+ hours of waiting with an elderly cardiac patient',
  },
  {
    id: 'rev-2',
    patientName: 'Engr. Tariqul Islam',
    hubLocation: 'Gulshan-2, Dhaka',
    doctorVisited: 'Dr. Tanvir Ahmed Chowdhury (Dental Care)',
    chamberName: 'Gulshan Avenue Dental & Implant Center',
    serialTag: 'Verified Booking · Serial #5 (Evening Shift)',
    rating: 5,
    reviewHeadline:
      '“Hospital-grade autoclave sterilization opened right in front of me. Zero pain RCT.”',
    reviewBody:
      'I was nervous about hygiene for my wisdom tooth and root canal treatment. Seeing the Class-B sterile pouches unsealed in front of me and knowing the exact ৳1,000 consultation fee upfront gave me complete peace of mind.',
    timeSavedMetric: 'Zero chair wait · Transparent fee breakdown',
  },
  {
    id: 'rev-3',
    patientName: 'Sadia Afrin & Family',
    hubLocation: 'Panchlaish, Chattogram',
    doctorVisited: 'Assoc. Prof. Dr. Mahmudul Hasan (Pediatrics)',
    chamberName: 'Chevron Clinical Lab, Chattogram',
    serialTag: 'Verified Booking · Friday Special Chamber (#14)',
    rating: 5,
    reviewHeadline:
      '“Friday specialist serials in Chattogram used to be impossible—booked in 90 seconds.”',
    reviewBody:
      'Getting a Friday serial at Chevron Panchlaish for visiting Dhaka professors was always a nightmare. CareSerial showed us the exact remaining Friday slots, locked our serial for 5 minutes while I entered my baby’s details, and sent the SMS pass immediately.',
    timeSavedMetric: 'Instant Friday VIP Chamber confirmation in Chattogram',
  },
];

export const CareSerialTrustClinicFooterSection: React.FC<
  CareSerialTrustClinicFooterSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [selectedWalkthroughModal, setSelectedWalkthroughModal] =
    useState<ClinicWalkthroughCard | null>(null);

  const medicalTeal = primaryColor || '#0D9488';
  const softEmerald = '#10B981';
  const isBrutalist = variant === 'varient_3';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="careserial-clinics"
      className={`pt-16 sm:pt-24 border-t transition-colors ${
        isDark
          ? 'bg-[#0B1120] text-slate-100 border-slate-800'
          : 'bg-white text-[#0F172A] border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ================= 4. PATIENT TRUST & CLINIC SHOWCASE ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white"
            style={{ backgroundColor: medicalTeal }}
          >
            <Building2 size={13} />
            PATIENT TRUST, STERILIZATION & CLINIC WALKTHROUGH
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            <EditableText
              id="careserial_trust_title"
              defaultText={
                title ||
                'Inside Our Partner Chambers, Sterile Dental Suites & Diagnostic Labs'
              }
            />
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            <EditableText
              id="careserial_trust_subtitle"
              defaultText={
                subtitle ||
                'Click any facility card below to inspect our Class-B dental autoclave protocols, 3.0T MRI diagnostic accuracy, and verified patient booking reviews.'
              }
            />
          </p>
        </div>

        {/* 3 Facility Walkthrough Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {CLINIC_WALKTHROUGH_CARDS.map((clinic) => (
            <div
              key={clinic.id}
              onClick={() => setSelectedWalkthroughModal(clinic)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedWalkthroughModal(clinic);
                }
              }}
              className={`group cursor-pointer overflow-hidden border transition-all duration-200 flex flex-col justify-between ${
                isBrutalist
                  ? 'rounded-none border-2 border-[#0F172A] shadow-[5px_5px_0px_#0D9488]'
                  : 'rounded-3xl border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1'
              } ${isDark ? 'bg-slate-900' : 'bg-[#F8FAFC]'}`}
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-200">
                  <img
                    src={clinic.image}
                    alt={clinic.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span
                      className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase text-white shadow"
                      style={{ backgroundColor: medicalTeal }}
                    >
                      {clinic.certificationBadge}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-black/65 text-white">
                      {clinic.hubBadge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-bold text-teal-300">
                      {clinic.banglaSubtitle}
                    </p>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-black text-[#0F172A] dark:text-white group-hover:text-[#0D9488] transition-colors">
                    {clinic.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {clinic.shortDesc}
                  </p>
                  <ul className="space-y-1.5 pt-2 border-t border-slate-200/70 dark:border-slate-800">
                    {clinic.sterilizationStandards.slice(0, 2).map((std) => (
                      <li
                        key={std}
                        className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2
                          size={14}
                          className="shrink-0 mt-0.5"
                          style={{ color: softEmerald }}
                        />
                        <span>{std}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-xs font-extrabold">
                <span className="text-slate-500">
                  {clinic.waitingAreaFeatures[0]}
                </span>
                <span
                  className="inline-flex items-center gap-1 shrink-0"
                  style={{ color: medicalTeal }}
                >
                  <Eye size={14} />
                  <span>Inspect Facility</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Patient Reviews Grid */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-black">
                Verified Patient Reviews Across Dhaka & Chattogram
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Every review is linked to a completed SMS chamber serial token.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-black text-emerald-700 dark:text-emerald-300">
              <span>★ 4.96 / 5.0 Average Patient Satisfaction</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {VERIFIED_PATIENT_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 ${
                  isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-[#F8FAFC] border-slate-200'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill="#F59E0B"
                          stroke="#F59E0B"
                        />
                      ))}
                    </div>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-black text-white"
                      style={{ backgroundColor: softEmerald }}
                    >
                      ✓ {rev.serialTag}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-black leading-snug">
                    {rev.reviewHeadline}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rev.reviewBody}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-black">
                    <span>{rev.patientName}</span>
                    <span className="text-teal-600 dark:text-teal-400">
                      {rev.hubLocation}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {rev.doctorVisited} · {rev.chamberName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 5. FOOTER & COMPLIANCE (BMDC, EMERGENCY HOTLINES & PRIVACY) ================= */}
      <footer
        className="mt-20 text-white border-t border-slate-800"
        style={{ backgroundColor: '#0F172A' }}
      >
        {/* Emergency Hotline Callout Banner */}
        <div className="border-b border-slate-800 bg-slate-950/70 py-6 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                <AlertTriangle size={22} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-red-300">
                  24/7 Emergency Medical & Ambulance Hotlines (জরুরি স্বাস্থ্যসেবা ও অ্যাম্বুলেন্স)
                </p>
                <p className="text-xs text-slate-300 mt-0.5">
                  For acute chest pain, stroke symptoms, or obstetric emergencies, do not wait for an outpatient chamber serial. Call emergency dispatch immediately:
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <span className="px-3.5 py-2 rounded-xl bg-red-600 text-white text-xs font-black flex items-center gap-1.5">
                <PhoneCall size={14} />
                National Emergency: 999
              </span>
              <span className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-teal-300 text-xs font-black">
                Shastho Batayon: 16263
              </span>
              <span className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-emerald-300 text-xs font-black">
                CareSerial ICU Helpline: 10666
              </span>
            </div>
          </div>
        </div>

        {/* Main Compliance & Sitemap Columns */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: medicalTeal }}
              >
                <Stethoscope size={18} />
              </div>
              <div>
                <p className="text-base font-black text-white">
                  CareSerial BD · প্রাইভেট ডাক্তার ও ডায়াগনস্টিক পোর্টাল
                </p>
                <p className="text-[11px] text-slate-400">
                  Gulshan · Dhanmondi · Uttara · Banani · Chattogram
                </p>
              </div>
            </div>

            {/* BMDC Registration Disclaimer */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 text-[11px] text-slate-300 leading-relaxed">
              <p className="font-black text-teal-400 flex items-center gap-1.5">
                <ShieldCheck size={14} />
                BMDC Registration & Clinical Verification Disclaimer
              </p>
              <p>
                Every physician and dental surgeon listed on CareSerial BD holds an active Bangladesh Medical & Dental Council (BMDC) registration certificate verified against official credentials. Consultation fees and chamber timings are set directly by the respective hospital/diagnostic centers.
              </p>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <p className="font-black uppercase tracking-wider text-slate-400">
              Major Urban Chamber Hubs
            </p>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('careserial-directory')}
                  className="hover:text-teal-400 cursor-pointer"
                >
                  Dhanmondi (Popular / Labaid / Ibn Sina)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('careserial-directory')}
                  className="hover:text-teal-400 cursor-pointer"
                >
                  Gulshan-1 & 2 Specialist Chambers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('careserial-directory')}
                  className="hover:text-teal-400 cursor-pointer"
                >
                  Uttara Sector 4 & 7 Diagnostic Hubs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('careserial-directory')}
                  className="hover:text-teal-400 cursor-pointer"
                >
                  Banani Road 11 Dental & Skin Studios
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('careserial-directory')}
                  className="hover:text-teal-400 cursor-pointer"
                >
                  Chattogram Panchlaish (Chevron / Max)
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <p className="font-black uppercase tracking-wider text-slate-400">
              Patient Intake Data Privacy & Security Policy
            </p>
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5 text-[11px] text-slate-300 leading-relaxed">
              <p className="font-black text-emerald-400 flex items-center gap-1.5">
                <Lock size={13} />
                Encrypted Patient Intake & Chief Complaint Protection
              </p>
              <p>
                Patient names, +880 mobile numbers, diagnostic reports, and chief symptom notes are encrypted in transit and shared exclusively with your booked chamber desk and consulting specialist. We never sell or disclose patient health records to third-party advertisers.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 py-5 px-4 sm:px-6 text-[11px] text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              © {new Date().getFullYear()} CareSerial BD Healthcare Network. All BMDC & DGHS guidelines respected.
            </span>
            <span>
              Instant Serial Booking via bKash · Nagad · Rocket · Visa/Mastercard
            </span>
          </div>
        </div>
      </footer>

      {/* ================= FACILITY WALKTHROUGH MODAL ================= */}
      {selectedWalkthroughModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedWalkthroughModal(null)}
        >
          <div
            className={`max-w-2xl w-full rounded-3xl overflow-hidden border shadow-2xl ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-slate-100'
                : 'bg-white border-slate-200 text-[#0F172A]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="p-6 text-white flex items-start justify-between gap-4"
              style={{ backgroundColor: medicalTeal }}
            >
              <div>
                <span className="px-2.5 py-0.5 rounded bg-black/25 text-[10px] font-black uppercase">
                  {selectedWalkthroughModal.certificationBadge} ·{' '}
                  {selectedWalkthroughModal.hubBadge}
                </span>
                <h3 className="text-xl font-black mt-1">
                  {selectedWalkthroughModal.title}
                </h3>
                <p className="text-xs text-teal-100">
                  {selectedWalkthroughModal.banglaSubtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedWalkthroughModal(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
              <img
                src={selectedWalkthroughModal.image}
                alt={selectedWalkthroughModal.title}
                className="w-full h-52 object-cover rounded-2xl"
              />

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedWalkthroughModal.shortDesc}
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  Infection Control & Sterilization Protocols
                </h4>
                <ul className="space-y-1.5 text-xs">
                  {selectedWalkthroughModal.sterilizationStandards.map((s) => (
                    <li key={s} className="flex items-start gap-2">
                      <CheckCircle2
                        size={14}
                        className="shrink-0 mt-0.5"
                        style={{ color: softEmerald }}
                      />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  Installed Medical & Diagnostic Technology
                </h4>
                <ul className="space-y-1.5 text-xs">
                  {selectedWalkthroughModal.equipmentHighlights.map((eq) => (
                    <li key={eq} className="flex items-start gap-2">
                      <CheckCircle2
                        size={14}
                        className="shrink-0 mt-0.5"
                        style={{ color: medicalTeal }}
                      />
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedWalkthroughModal(null);
                    scrollToSection('careserial-scheduler');
                  }}
                  className="px-6 py-3 rounded-xl text-xs font-black text-white cursor-pointer"
                  style={{ backgroundColor: medicalTeal }}
                >
                  Book Chamber Slot at This Facility →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
