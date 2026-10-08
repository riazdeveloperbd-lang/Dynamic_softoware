import React from 'react';
import { CareSerialNavbar } from '../component/CareSerialNavbar';
import { CareSerialHeroDirectorySection } from '../component/CareSerialHeroDirectorySection';
import { CareSerialChamberSchedulerSection } from '../component/CareSerialChamberSchedulerSection';
import { CareSerialPatientIntakeSmsSection } from '../component/CareSerialPatientIntakeSmsSection';
import { CareSerialTrustClinicFooterSection } from '../component/CareSerialTrustClinicFooterSection';
import { WebsiteSectionVariantId } from '../../doctor_profile';

export interface CareSerialLandingPageProps {
  primaryColor?: string;
  isDark?: boolean;
  variant?: WebsiteSectionVariantId;
}

export const CareSerialLandingPage: React.FC<CareSerialLandingPageProps> = ({
  primaryColor = '#0D9488',
  isDark = false,
  variant = 'varient_1',
}) => {
  return (
    <div
      className={`min-h-screen ${
        isDark ? 'bg-[#0F172A] text-slate-100' : 'bg-[#F8FAFC] text-[#0F172A]'
      }`}
    >
      <CareSerialNavbar
        title="CareSerial BD"
        subtitle="Specialist Chambers · Dental Clinics · Diagnostic Labs · Dhaka & Chattogram"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <CareSerialHeroDirectorySection
        title="Skip the Waiting Room. Book Trusted Doctors & Diagnostics in Minutes."
        subtitle="Real-time appointment scheduling for top specialist doctors, dental clinics, and diagnostic tests across Dhaka & Chattogram."
        ctaText="Find Serial"
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <CareSerialChamberSchedulerSection
        title="Switch Practice Chambers & Lock Your Exact Serial Number"
        subtitle="Select between Dhanmondi, Gulshan, and Chattogram chambers, browse the 14-day schedule strip, and reserve your time slot with a 5-minute real-time inventory lock."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <CareSerialPatientIntakeSmsSection
        title="Complete Patient Intake & Receive Instant SMS Serial Pass"
        subtitle="Supports Bangla & English patient names, 11-digit BD mobile verification, Pay-at-Chamber or bKash/Nagad pre-booking, and real-time SMS chamber queue tracking."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
      <CareSerialTrustClinicFooterSection
        title="Inside Our Partner Chambers, Sterile Dental Suites & Diagnostic Labs"
        subtitle="Click any facility card below to inspect our Class-B dental autoclave protocols, 3.0T MRI diagnostic accuracy, and verified patient booking reviews."
        variant={variant}
        primaryColor={primaryColor}
        isDark={isDark}
      />
    </div>
  );
};
