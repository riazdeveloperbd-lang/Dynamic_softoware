import React, { useState } from 'react';
import {
  Stethoscope,
  ShieldCheck,
  Search,
  MapPin,
  Calendar,
  HeartPulse,
  Sparkles,
  Baby,
  Microscope,
  Smile,
  Activity,
  CheckCircle2,
  ArrowRight,
  Clock,
  Smartphone,
  Eye,
  X,
  Building2,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface CareSerialHeroDirectorySectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

export interface SpecialtyQuickCard {
  id: string;
  name: string;
  banglaName: string;
  iconName: 'cardiology' | 'dental' | 'gynecology' | 'pediatrics' | 'dermatology' | 'diagnostics';
  activeSpecialistsCount: string;
  startingFeeBdt: string;
  topChambers: string[];
  commonProcedures: string[];
  avgWaitReduction: string;
}

export interface BdDoctorListing {
  id: string;
  name: string;
  banglaName: string;
  specialtyId: string;
  specialtyLabel: string;
  bmdcRegNumber: string;
  qualifications: string;
  designation: string;
  avatar: string;
  experienceYears: string;
  rating: string;
  verifiedPatientsCount: string;
  chambers: {
    hub: 'Dhanmondi' | 'Gulshan' | 'Uttara' | 'Banani' | 'Chattogram';
    chamberName: string;
    roomNumber: string;
    scheduleDays: string;
    shiftHours: string;
  }[];
  feeNewBdt: number;
  feeReportBdt: number;
  nextAvailableLabel: string;
  nextAvailableSerial: number;
  clinicalExpertise: string[];
  educationTimeline: string[];
  languages: string[];
}

const SPECIALTY_CARDS: SpecialtyQuickCard[] = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    banglaName: 'হৃদরোগ ও মেডিসিন বিশেষজ্ঞ',
    iconName: 'cardiology',
    activeSpecialistsCount: '28 BMDC Specialists',
    startingFeeBdt: '৳1,000 – ৳1,500',
    topChambers: [
      'Popular Diagnostic Center, Dhanmondi',
      'Labaid Cardiac Hospital, Gulshan & Dhanmondi',
      'Evercare Hospital, Bashundhara',
    ],
    commonProcedures: [
      'Clinical Hypertension & Chest Pain Evaluation',
      '2D/4D Color Doppler Echocardiography & ECG Review',
      'Post-Angioplasty & Bypass Follow-Up Management',
    ],
    avgWaitReduction: 'Saves ~95 mins chamber waiting time',
  },
  {
    id: 'dental',
    name: 'Dental Care',
    banglaName: 'ডেন্টাল ও অর্থোডন্টিক্স ক্লিনিক',
    iconName: 'dental',
    activeSpecialistsCount: '24 BDS / FCPS Surgeons',
    startingFeeBdt: '৳800 – ৳1,200',
    topChambers: [
      'Gulshan Avenue Aesthetic Dental Studio',
      'Banani Road 11 Advanced Implant Center',
      'Dhanmondi 27 Class-B Autoclave Dental Care',
    ],
    commonProcedures: [
      'Ultrasonic Scaling, Polishing & Airflow Stain Removal',
      'Painless Single-Sitting Root Canal Treatment (RCT)',
      'Swiss/Korean Dental Implants & 3D Clear Aligners',
    ],
    avgWaitReduction: '100% Pre-Sterilized Chair Slot Guarantee',
  },
  {
    id: 'gynecology',
    name: 'Gynecology & Obstetrics',
    banglaName: 'স্ত্রীরোগ ও প্রসূতি বিদ্যা',
    iconName: 'gynecology',
    activeSpecialistsCount: '22 Female Specialists',
    startingFeeBdt: '৳1,000 – ৳1,500',
    topChambers: [
      'Square Hospitals Ltd., Panthapath',
      'Ibn Sina Diagnostic & Consultation, Uttara',
      'Chevron Clinical Laboratory, Chattogram',
    ],
    commonProcedures: [
      'Antenatal High-Risk Pregnancy Care & Anomaly Scan Review',
      'PCOS, Hormonal Imbalance & Fertility Counseling',
      'Laparoscopic Gynecological Surgery Consultation',
    ],
    avgWaitReduction: 'Dedicated Female Nursing & Priority Serial',
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    banglaName: 'শিশু ও নবজাতক বিশেষজ্ঞ',
    iconName: 'pediatrics',
    activeSpecialistsCount: '19 MD / FCPS Pediatricians',
    startingFeeBdt: '৳800 – ৳1,200',
    topChambers: [
      'Popular Diagnostic Center, Uttara Sector 4',
      'Labaid Specialized Hospital, Dhanmondi',
      'Max Hospital & Diagnostics, Chattogram',
    ],
    commonProcedures: [
      'Newborn Growth, Nutrition & EPI/Private Vaccination',
      'Pediatric Asthma, Nebulization & Seasonal Viral Fever',
      'Childhood Developmental Milestone Assessment',
    ],
    avgWaitReduction: 'Zero-Crowd Isolated Pediatric Waiting Zone',
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    banglaName: 'চর্ম, অ্যালার্জি ও লেজার বিশেষজ্ঞ',
    iconName: 'dermatology',
    activeSpecialistsCount: '16 DDV / FCPS Specialists',
    startingFeeBdt: '৳1,000 – ৳1,400',
    topChambers: [
      'Banani Aesthetic & Clinical Dermatology Hub',
      'Green Life Hospital Chamber, Dhanmondi',
      'Gulshan-2 Laser & Clinical Skin Center',
    ],
    commonProcedures: [
      'Chronic Eczema, Psoriasis & Fungal Infection Treatment',
      'Acne Scar Revision, PRP & Medical Peels',
      'Pediatric & Adult Allergy Patch Testing',
    ],
    avgWaitReduction: 'Direct Evening Chamber Serial Confirmation',
  },
  {
    id: 'diagnostics',
    name: 'Diagnostic Imaging / Lab Tests',
    banglaName: 'এমআরআই, সিটি স্ক্যান ও ব্লাড টেস্ট',
    iconName: 'diagnostics',
    activeSpecialistsCount: '18 ISO-Certified Centers',
    startingFeeBdt: '20% Partner Discount',
    topChambers: [
      'Popular Diagnostic (Dhanmondi, Uttara, Mirpur)',
      'Labaid Diagnostics (Gulshan, Banani, Dhanmondi)',
      'Chevron Clinical Lab (Panchlaish, Chattogram)',
    ],
    commonProcedures: [
      '3.0 Tesla Silent MRI, 128-Slice CT Scan & Digital X-Ray',
      'Complete Executive Health Checkup & Fasting Lipid/HbA1c',
      'Home Blood Sample Collection across Dhaka & Chattogram',
    ],
    avgWaitReduction: 'Digital PDF Smart Report on SMS & WhatsApp',
  },
];

export const BD_DOCTORS_DIRECTORY: BdDoctorListing[] = [
  {
    id: 'dr-ak-khan',
    name: 'Prof. Dr. A. K. Khan',
    banglaName: 'প্রফেসর ডাঃ এ. কে. খান',
    specialtyId: 'cardiology',
    specialtyLabel: 'Cardiology & Clinical Medicine',
    bmdcRegNumber: 'BMDC Reg: A-28491',
    qualifications: 'MBBS (DMC), FCPS (Medicine), MD (Cardiology - NICVD), FACC (USA)',
    designation: 'Professor & Senior Consultant, Dept. of Cardiology, BSMMU',
    avatar:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=85',
    experienceYears: '22+ Years Experience',
    rating: '4.96',
    verifiedPatientsCount: '3,420+ Verified Chamber Bookings',
    chambers: [
      {
        hub: 'Dhanmondi',
        chamberName: 'Popular Diagnostic Center, Dhanmondi',
        roomNumber: 'Room 402 (Building 2, Lift-4)',
        scheduleDays: 'Sat, Mon, Wed',
        shiftHours: '5:00 PM – 9:00 PM',
      },
      {
        hub: 'Gulshan',
        chamberName: 'Labaid Specialized Hospital, Gulshan-2',
        roomNumber: 'Room 308 (Cardiac Wing)',
        scheduleDays: 'Sun, Tue, Thu',
        shiftHours: '6:00 PM – 9:00 PM',
      },
      {
        hub: 'Chattogram',
        chamberName: 'Chevron Clinical Lab, Panchlaish, Chattogram',
        roomNumber: 'VIP Consultation Suite 204',
        scheduleDays: 'Friday Only',
        shiftHours: '10:00 AM – 4:00 PM',
      },
    ],
    feeNewBdt: 1200,
    feeReportBdt: 800,
    nextAvailableLabel: 'Today, 6:30 PM',
    nextAvailableSerial: 12,
    clinicalExpertise: [
      'Resistant Hypertension & Coronary Artery Disease',
      'Heart Failure Management & Echocardiography Interpretation',
      'Pre-Operative Cardiac Risk Clearance & Lipid Disorders',
    ],
    educationTimeline: [
      'MBBS — Dhaka Medical College (DMC), Gold Medalist',
      'FCPS (Internal Medicine) — Bangladesh College of Physicians & Surgeons (BCPS)',
      'MD (Cardiology) — National Institute of Cardiovascular Diseases (NICVD)',
      'Fellowship in Interventional Cardiology — Singapore National Heart Centre',
    ],
    languages: ['Bangla (বাংলা)', 'English'],
  },
  {
    id: 'dr-nusrat-jahan',
    name: 'Assoc. Prof. Dr. Nusrat Jahan',
    banglaName: 'সহযোগী অধ্যাপক ডাঃ নুসরাত জাহান',
    specialtyId: 'gynecology',
    specialtyLabel: 'Gynecology, Obstetrics & Infertility',
    bmdcRegNumber: 'BMDC Reg: A-34109',
    qualifications: 'MBBS (SSMC), FCPS (Obs & Gynae), MS (Gynae), Fellowship in Laparoscopy (India)',
    designation: 'Associate Professor, Gynecology & Obstetrics, BSMMU (Ex-PG Hospital)',
    avatar:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=85',
    experienceYears: '16+ Years Experience',
    rating: '4.95',
    verifiedPatientsCount: '2,890+ Verified Chamber Bookings',
    chambers: [
      {
        hub: 'Uttara',
        chamberName: 'Popular Diagnostic Center, Uttara Sector 4',
        roomNumber: 'Room 506 (Mother & Child Floor)',
        scheduleDays: 'Sat, Mon, Wed',
        shiftHours: '5:30 PM – 9:00 PM',
      },
      {
        hub: 'Dhanmondi',
        chamberName: 'Ibn Sina Specialized Hospital, Dhanmondi 15',
        roomNumber: 'Room 312',
        scheduleDays: 'Sun, Tue, Thu',
        shiftHours: '6:00 PM – 9:30 PM',
      },
    ],
    feeNewBdt: 1200,
    feeReportBdt: 800,
    nextAvailableLabel: 'Today, 7:00 PM',
    nextAvailableSerial: 9,
    clinicalExpertise: [
      'High-Risk Pregnancy, Gestational Diabetes & Painless Delivery',
      'PCOS, Endometriosis & Fertility Workup',
      'Minimally Invasive Laparoscopic Ovarian & Fibroid Surgery',
    ],
    educationTimeline: [
      'MBBS — Sir Salimullah Medical College (SSMC)',
      'FCPS (Obs & Gynae) — BCPS Dhaka',
      'Advanced Laparoscopic & Hysteroscopic Training — Keil School, Germany',
    ],
    languages: ['Bangla (বাংলা)', 'English'],
  },
  {
    id: 'dr-tanvir-ahmed',
    name: 'Dr. Tanvir Ahmed Chowdhury',
    banglaName: 'ডাঃ তানভীর আহমেদ চৌধুরী',
    specialtyId: 'dental',
    specialtyLabel: 'Dental Implantology & Aesthetic Dentistry',
    bmdcRegNumber: 'BMDC Reg: D-06824',
    qualifications: 'BDS (Dhaka Dental College), FCPS (Oral & Maxillofacial Surgery), MPH (NSU)',
    designation: 'Chief Dental Surgeon & Implantologist, Gulshan Dental & Maxillofacial Studio',
    avatar:
      'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=85',
    experienceYears: '14+ Years Experience',
    rating: '4.98',
    verifiedPatientsCount: '1,940+ Verified Chamber Bookings',
    chambers: [
      {
        hub: 'Gulshan',
        chamberName: 'Gulshan Avenue Dental & Implant Center (Gulshan-2)',
        roomNumber: 'Suite 3B (Autoclave Sterile Wing)',
        scheduleDays: 'Sat – Thu',
        shiftHours: '4:00 PM – 9:30 PM',
      },
      {
        hub: 'Banani',
        chamberName: 'Praava & Banani Road 11 Specialist Clinic',
        roomNumber: 'Dental Suite 201',
        scheduleDays: 'Sun, Tue, Thu',
        shiftHours: '10:30 AM – 2:30 PM',
      },
    ],
    feeNewBdt: 1000,
    feeReportBdt: 600,
    nextAvailableLabel: 'Today, 6:15 PM',
    nextAvailableSerial: 5,
    clinicalExpertise: [
      'Single-Sitting Rotary Root Canal Treatment (Microscope Assisted)',
      'Straumann (Swiss) & Osstem (Korean) Guided Dental Implants',
      'Impacted Wisdom Tooth Surgery & Digital Smile Design Veneers',
    ],
    educationTimeline: [
      'BDS — Dhaka Dental College (1st Place Merit)',
      'FCPS (Oral & Maxillofacial Surgery) — BCPS',
      'Certificate in Advanced Implantology — Seoul National University Dental Hospital',
    ],
    languages: ['Bangla (বাংলা)', 'English'],
  },
  {
    id: 'dr-mahmudul-hasan',
    name: 'Assoc. Prof. Dr. Mahmudul Hasan',
    banglaName: 'সহযোগী অধ্যাপক ডাঃ মাহমুদুল হাসান',
    specialtyId: 'pediatrics',
    specialtyLabel: 'Pediatrics, Neonatology & Child Nutrition',
    bmdcRegNumber: 'BMDC Reg: A-31902',
    qualifications: 'MBBS (CMC), DCH, FCPS (Pediatrics), MD (Neonatology - BSMMU)',
    designation: 'Associate Professor, Dept. of Pediatrics, Dhaka Shishu (Children) Hospital',
    avatar:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=85',
    experienceYears: '15+ Years Experience',
    rating: '4.94',
    verifiedPatientsCount: '2,510+ Verified Chamber Bookings',
    chambers: [
      {
        hub: 'Dhanmondi',
        chamberName: 'Popular Diagnostic Center, Dhanmondi',
        roomNumber: 'Room 209 (Child Care Zone)',
        scheduleDays: 'Sat, Mon, Wed',
        shiftHours: '5:00 PM – 8:30 PM',
      },
      {
        hub: 'Chattogram',
        chamberName: 'Chevron Clinical Lab, Panchlaish, Chattogram',
        roomNumber: 'Room 105',
        scheduleDays: 'Friday Only',
        shiftHours: '9:30 AM – 3:30 PM',
      },
    ],
    feeNewBdt: 1000,
    feeReportBdt: 700,
    nextAvailableLabel: 'Today, 6:45 PM',
    nextAvailableSerial: 14,
    clinicalExpertise: [
      'Neonatal Jaundice, Premature Baby Follow-Up & Feeding Plans',
      'Childhood Bronchial Asthma, Allergic Rhinitis & Nebulization Therapy',
      'Catch-Up Vaccination & Pediatric Micronutrient Deficiency',
    ],
    educationTimeline: [
      'MBBS — Chattogram Medical College (CMC)',
      'FCPS (Pediatrics) — BCPS Dhaka',
      'MD (Neonatology) — Bangabandhu Sheikh Mujib Medical University (BSMMU)',
    ],
    languages: ['Bangla (বাংলা)', 'English'],
  },
];

export const CareSerialHeroDirectorySection: React.FC<
  CareSerialHeroDirectorySectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [selectedSpecialtyFilter, setSelectedSpecialtyFilter] =
    useState<string>('all');
  const [selectedLocationFilter, setSelectedLocationFilter] =
    useState<string>('all');
  const [selectedDateFilter, setSelectedDateFilter] =
    useState<string>('Today (Instant Serial)');

  // Modals for full details when clicking any Specialty Card or Doctor Profile Card
  const [activeSpecialtyModal, setActiveSpecialtyModal] =
    useState<SpecialtyQuickCard | null>(null);
  const [activeDoctorModal, setActiveDoctorModal] =
    useState<BdDoctorListing | null>(null);

  const medicalTeal = primaryColor || '#0D9488';
  const softEmerald = '#10B981';
  const isBrutalist = variant === 'varient_3';

  const filteredDoctors = BD_DOCTORS_DIRECTORY.filter((doc) => {
    const matchSpec =
      selectedSpecialtyFilter === 'all' ||
      doc.specialtyId === selectedSpecialtyFilter;
    const matchLoc =
      selectedLocationFilter === 'all' ||
      doc.chambers.some(
        (c) => c.hub.toLowerCase() === selectedLocationFilter.toLowerCase()
      );
    return matchSpec && matchLoc;
  });

  const handleBookDoctorSlot = (doc: BdDoctorListing) => {
    window.dispatchEvent(
      new CustomEvent('careserial:select-doctor-slot', {
        detail: {
          doctorId: doc.id,
          doctorName: doc.name,
          specialtyLabel: doc.specialtyLabel,
          feeNewBdt: doc.feeNewBdt,
          feeReportBdt: doc.feeReportBdt,
          defaultHub: doc.chambers[0]?.hub || 'Dhanmondi',
        },
      })
    );
    const schedulerEl = document.getElementById('careserial-scheduler');
    if (schedulerEl) {
      schedulerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderSpecialtyIcon = (
    iconName: SpecialtyQuickCard['iconName'],
    size = 20
  ) => {
    switch (iconName) {
      case 'cardiology':
        return <HeartPulse size={size} />;
      case 'dental':
        return <Smile size={size} />;
      case 'gynecology':
        return <Activity size={size} />;
      case 'pediatrics':
        return <Baby size={size} />;
      case 'dermatology':
        return <Sparkles size={size} />;
      case 'diagnostics':
        return <Microscope size={size} />;
    }
  };

  return (
    <section
      className={`relative overflow-hidden py-12 sm:py-20 transition-colors ${
        isDark
          ? 'bg-[#0F172A] text-slate-100'
          : 'bg-[#F8FAFC] text-[#0F172A]'
      }`}
    >
      {/* Subtle clinical background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${medicalTeal} 0%, ${softEmerald} 60%, transparent 100%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* ================= 1. HERO SECTION & SEARCH BAR ================= */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider"
              style={{ backgroundColor: medicalTeal }}
            >
              <ShieldCheck size={11} />
              BANGLADESH PRIVATE HEALTHCARE PORTAL
            </span>
            <EditableText
              id="careserial_hero_eyebrow"
              defaultText="Gulshan · Dhanmondi · Uttara · Banani · Chattogram"
              className="text-slate-700 dark:text-slate-200 font-bold"
            />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.1] text-[#0F172A] dark:text-white">
            <EditableText
              id="careserial_hero_headline"
              defaultText={
                title ||
                'Skip the Waiting Room. Book Trusted Doctors & Diagnostics in Minutes.'
              }
            />
          </h1>

          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            <EditableText
              id="careserial_hero_subheadline"
              defaultText={
                subtitle ||
                'Real-time appointment scheduling for top specialist doctors, dental clinics, and diagnostic tests across Dhaka & Chattogram.'
              }
            />
          </p>

          {/* 3-Column Multi-Select Search & Filter Bar */}
          <div
            className={`mt-6 p-3 sm:p-4 border shadow-xl text-left ${
              isBrutalist
                ? 'rounded-none border-2 border-[#0F172A] shadow-[5px_5px_0px_#0D9488]'
                : 'rounded-3xl border-slate-200/90 dark:border-slate-800'
            } ${isDark ? 'bg-slate-900' : 'bg-white'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Dropdown 1: Specialty / Doctor Name */}
              <div className="md:col-span-4 p-2.5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <label className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                  <Stethoscope size={12} style={{ color: medicalTeal }} />
                  <span>Select Specialty / Doctor Name</span>
                </label>
                <select
                  value={selectedSpecialtyFilter}
                  onChange={(e) => setSelectedSpecialtyFilter(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-[#0F172A] dark:text-white focus:outline-none cursor-pointer"
                >
                  <option value="all">All Specialties & Top Doctors (100+)</option>
                  <option value="cardiology">Cardiology — Prof. Dr. A. K. Khan</option>
                  <option value="gynecology">Gynecology & Obs — Assoc. Prof. Dr. Nusrat Jahan</option>
                  <option value="dental">Dental Care — Dr. Tanvir Ahmed (BDS, FCPS)</option>
                  <option value="pediatrics">Pediatrics — Assoc. Prof. Dr. Mahmudul Hasan</option>
                  <option value="dermatology">Dermatology & Clinical Laser</option>
                  <option value="diagnostics">Diagnostic MRI / CT / Blood Tests</option>
                </select>
              </div>

              {/* Dropdown 2: Urban Hub Location */}
              <div className="md:col-span-3 p-2.5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <label className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                  <MapPin size={12} style={{ color: medicalTeal }} />
                  <span>Select Location Hub</span>
                </label>
                <select
                  value={selectedLocationFilter}
                  onChange={(e) => setSelectedLocationFilter(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-[#0F172A] dark:text-white focus:outline-none cursor-pointer"
                >
                  <option value="all">All Hubs (Dhaka & Ctg)</option>
                  <option value="Dhanmondi">Dhanmondi (Popular / Labaid / Ibn Sina)</option>
                  <option value="Gulshan">Gulshan-1 & 2 (Labaid / Praava)</option>
                  <option value="Uttara">Uttara Sector 4 & 7</option>
                  <option value="Banani">Banani Road 11</option>
                  <option value="Chattogram">Chattogram (Panchlaish / Chevron)</option>
                </select>
              </div>

              {/* Dropdown 3: Select Date */}
              <div className="md:col-span-3 p-2.5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <label className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                  <Calendar size={12} style={{ color: medicalTeal }} />
                  <span>Select Chamber Date</span>
                </label>
                <select
                  value={selectedDateFilter}
                  onChange={(e) => setSelectedDateFilter(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-[#0F172A] dark:text-white focus:outline-none cursor-pointer"
                >
                  <option value="Today (Instant Serial)">Today (Evening Shift Available)</option>
                  <option value="Tomorrow">Tomorrow (Morning & Evening)</option>
                  <option value="This Friday (Chattogram / Weekend)">This Friday (Special Chambers)</option>
                  <option value="Next 7 Days">Any Day in Next 7 Days</option>
                </select>
              </div>

              {/* Search CTA Button */}
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('careserial-directory');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full h-full min-h-[54px] px-4 py-3 rounded-2xl text-xs sm:text-sm font-black text-white shadow-md flex items-center justify-center gap-2 transition hover:opacity-95 cursor-pointer"
                  style={{ backgroundColor: medicalTeal }}
                >
                  <Search size={16} />
                  <span>Find Serial</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3 High-Trust Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {[
              {
                label: '100+ Verified BMDC-Registered Specialists',
                icon: ShieldCheck,
              },
              {
                label: 'Instant bKash/Nagad Pre-booking',
                icon: Smartphone,
              },
              {
                label: 'Automated SMS Chamber Confirmation',
                icon: CheckCircle2,
              },
            ].map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-xs font-extrabold shadow-2xs"
                >
                  <Icon size={15} style={{ color: softEmerald }} />
                  <span>{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= 2. SPECIALTY & CHAMBER QUICK-ACCESS CARDS ================= */}
        <div id="careserial-specialties" className="mt-16 sm:mt-20 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-white mb-2"
                style={{ backgroundColor: medicalTeal }}
              >
                <Sparkles size={12} />
                SPECIALTY & DIAGNOSTIC QUICK-ACCESS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                <EditableText
                  id="careserial_specialty_heading"
                  defaultText="Browse by Clinical Department & Diagnostic Lab"
                />
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Click any department card to filter doctors or inspect common procedures & fees.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {SPECIALTY_CARDS.map((spec) => {
              const isSelected = selectedSpecialtyFilter === spec.id;
              return (
                <div
                  key={spec.id}
                  onClick={() => {
                    setSelectedSpecialtyFilter(
                      isSelected ? 'all' : spec.id
                    );
                    setActiveSpecialtyModal(spec);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveSpecialtyModal(spec);
                    }
                  }}
                  className={`group cursor-pointer p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-2 bg-teal-50/60 dark:bg-teal-950/30 shadow-md'
                      : isDark
                      ? 'bg-slate-900 border-slate-800 hover:border-teal-500/60'
                      : 'bg-white border-slate-200/90 hover:border-[#0D9488] hover:shadow-md'
                  }`}
                  style={
                    isSelected ? { borderColor: medicalTeal } : undefined
                  }
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
                        style={{ backgroundColor: medicalTeal }}
                      >
                        {renderSpecialtyIcon(spec.iconName, 19)}
                      </div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                        {spec.startingFeeBdt}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-[#0F172A] dark:text-white group-hover:text-[#0D9488] transition-colors">
                        {spec.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                        {spec.banglaName}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-500">
                      {spec.activeSpecialistsCount}
                    </span>
                    <Eye size={13} style={{ color: medicalTeal }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= 3. DOCTOR PROFILE & DIRECTORY CARDS (LISTING VIEW) ================= */}
        <div id="careserial-directory" className="mt-16 sm:mt-20 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-white mb-2"
                style={{ backgroundColor: '#0F172A' }}
              >
                <ShieldCheck size={12} className="text-emerald-400" />
                VERIFIED BMDC SPECIALIST DIRECTORY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                <EditableText
                  id="careserial_directory_heading"
                  defaultText="Top Specialist Doctors & Multi-Chamber Schedules"
                />
              </h2>
            </div>

            {/* Active Filter Reset Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {['all', 'Dhanmondi', 'Gulshan', 'Uttara', 'Chattogram'].map(
                (hub) => {
                  const active = selectedLocationFilter === hub;
                  return (
                    <button
                      key={hub}
                      type="button"
                      onClick={() => setSelectedLocationFilter(hub)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                        active
                          ? 'text-white border-transparent'
                          : isDark
                          ? 'bg-slate-900 border-slate-800 text-slate-300'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-[#0D9488]'
                      }`}
                      style={
                        active ? { backgroundColor: medicalTeal } : undefined
                      }
                    >
                      {hub === 'all' ? 'All Hubs (4)' : hub}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Doctor Directory Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setActiveDoctorModal(doc)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveDoctorModal(doc);
                  }
                }}
                className={`group cursor-pointer overflow-hidden border transition-all duration-200 flex flex-col justify-between ${
                  isBrutalist
                    ? 'rounded-none border-2 border-[#0F172A] shadow-[5px_5px_0px_#0D9488]'
                    : 'rounded-3xl border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-0.5'
                } ${isDark ? 'bg-slate-900' : 'bg-white'}`}
              >
                <div className="p-6 space-y-5">
                  {/* Medical Credential Header */}
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-teal-500/40"
                      />
                      <span
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase text-white whitespace-nowrap shadow"
                        style={{ backgroundColor: softEmerald }}
                      >
                        ✓ BMDC Verified
                      </span>
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider text-white"
                          style={{ backgroundColor: medicalTeal }}
                        >
                          {doc.specialtyLabel}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {doc.bmdcRegNumber}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-[#0F172A] dark:text-white group-hover:text-[#0D9488] transition-colors">
                        {doc.name}
                      </h3>
                      <p className="text-xs font-bold text-teal-700 dark:text-teal-400">
                        {doc. qualifications}
                      </p>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {doc.designation}
                      </p>
                    </div>
                  </div>

                  {/* Chamber Locations Badges */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Active Practice Chambers & Room Numbers:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {doc.chambers.map((ch) => (
                        <div
                          key={`${doc.id}-${ch.chamberName}`}
                          className="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <Building2
                              size={14}
                              className="shrink-0"
                              style={{ color: medicalTeal }}
                            />
                            <span className="font-extrabold truncate">
                              {ch.chamberName} — {ch.roomNumber}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-slate-500 shrink-0">
                            {ch.scheduleDays} ({ch.shiftHours})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fee Transparency Tag */}
                  <div className="p-3.5 rounded-2xl bg-teal-500/5 border border-teal-500/20 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs">
                      <span className="font-bold text-slate-500 block text-[10px] uppercase">
                        Transparent Chamber Fee
                      </span>
                      <span className="font-black text-sm text-[#0F172A] dark:text-white">
                        Consultation Fee: ৳{doc.feeNewBdt.toLocaleString()} (New) / ৳
                        {doc.feeReportBdt.toLocaleString()} (Report)
                      </span>
                    </div>
                    <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400">
                      ★ {doc.rating} ({doc.verifiedPatientsCount})
                    </span>
                  </div>
                </div>

                {/* Real-Time Slot CTA Footer */}
                <div
                  className="px-6 py-4 bg-slate-50 dark:bg-slate-950/90 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => handleBookDoctorSlot(doc)}
                    className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black text-white shadow-sm flex items-center justify-center gap-2 transition hover:opacity-95 cursor-pointer"
                    style={{ backgroundColor: softEmerald }}
                  >
                    <Clock size={15} />
                    <span>
                      Book Next Available Slot: {doc.nextAvailableLabel} (Serial #
                      {doc.nextAvailableSerial})
                    </span>
                    <ArrowRight size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveDoctorModal(doc)}
                    className="py-3 px-3.5 rounded-xl text-xs font-extrabold border border-slate-300 dark:border-slate-700 hover:border-[#0D9488] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye size={14} style={{ color: medicalTeal }} />
                    <span>Full Profile</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= SPECIALTY FULL DETAILS MODAL ================= */}
      {activeSpecialtyModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveSpecialtyModal(null)}
        >
          <div
            className={`max-w-xl w-full rounded-3xl overflow-hidden border shadow-2xl ${
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
                  {activeSpecialtyModal.activeSpecialistsCount}
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-1">
                  {activeSpecialtyModal.name} ({activeSpecialtyModal.banglaName})
                </h3>
                <p className="text-xs text-teal-100 mt-0.5">
                  Standard Consultation Range: {activeSpecialtyModal.startingFeeBdt}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveSpecialtyModal(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                  Common Consultations & Diagnostic Procedures
                </h4>
                <ul className="space-y-2">
                  {activeSpecialtyModal.commonProcedures.map((proc) => (
                    <li key={proc} className="flex items-start gap-2 text-xs sm:text-sm">
                      <CheckCircle2
                        size={15}
                        className="shrink-0 mt-0.5"
                        style={{ color: softEmerald }}
                      />
                      <span>{proc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                  Partner Chambers & Centers
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeSpecialtyModal.topChambers.map((ch) => (
                    <span
                      key={ch}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <span className="text-xs font-extrabold text-emerald-600">
                  ✓ {activeSpecialtyModal.avgWaitReduction}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSpecialtyModal(null);
                    const el = document.getElementById('careserial-scheduler');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-black text-white cursor-pointer"
                  style={{ backgroundColor: medicalTeal }}
                >
                  Pick Chamber Slot →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= DOCTOR FULL PROFILE & CREDENTIALS MODAL ================= */}
      {activeDoctorModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveDoctorModal(null)}
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
              style={{ backgroundColor: '#0F172A' }}
            >
              <div className="flex items-center gap-4">
                <img
                  src={activeDoctorModal.avatar}
                  alt={activeDoctorModal.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-400"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-black uppercase"
                      style={{ backgroundColor: medicalTeal }}
                    >
                      {activeDoctorModal.bmdcRegNumber}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      ★ {activeDoctorModal.rating}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mt-1">
                    {activeDoctorModal.name} ({activeDoctorModal.banglaName})
                  </h3>
                  <p className="text-xs text-slate-300">
                    {activeDoctorModal.designation}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveDoctorModal(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">
                    New Consultation Fee
                  </span>
                  <strong className="text-base font-black text-teal-600">
                    ৳{activeDoctorModal.feeNewBdt}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">
                    Report / Follow-Up Fee
                  </span>
                  <strong className="text-base font-black text-emerald-600">
                    ৳{activeDoctorModal.feeReportBdt}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">
                    Next Chamber Slot
                  </span>
                  <strong className="text-sm font-black">
                    {activeDoctorModal.nextAvailableLabel} (#{activeDoctorModal.nextAvailableSerial})
                  </strong>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                  Academic & Fellowship Credentials
                </h4>
                <ul className="space-y-1.5 text-xs">
                  {activeDoctorModal.educationTimeline.map((edu) => (
                    <li key={edu} className="flex items-start gap-2">
                      <CheckCircle2
                        size={14}
                        className="shrink-0 mt-0.5"
                        style={{ color: medicalTeal }}
                      />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                  Clinical Sub-Specializations
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeDoctorModal.clinicalExpertise.map((exp) => (
                    <span
                      key={exp}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-500/10 text-teal-800 dark:text-teal-300"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                  All Chamber Locations & Visiting Hours
                </h4>
                <div className="space-y-2">
                  {activeDoctorModal.chambers.map((ch) => (
                    <div
                      key={ch.chamberName}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-black">
                          {ch.chamberName} ({ch.roomNumber})
                        </p>
                        <p className="text-slate-500">
                          {ch.scheduleDays} · {ch.shiftHours}
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 font-black">
                        {ch.hub}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const doc = activeDoctorModal;
                    setActiveDoctorModal(null);
                    handleBookDoctorSlot(doc);
                  }}
                  className="px-6 py-3 rounded-xl text-xs sm:text-sm font-black text-white cursor-pointer"
                  style={{ backgroundColor: softEmerald }}
                >
                  Lock Slot ({activeDoctorModal.nextAvailableLabel}) →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
