import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import {
  EditableText,
  EditableButton,
  EditableImage,
} from './DoctorCanvaEditorContext';
import { DoctorVariantId } from './DoctorNavbar';

export interface DoctorAppointmentSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  accentTeal?: string;
  isDark?: boolean;
}

const DEFAULT_CLINIC_IMG =
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80';

export const DoctorAppointmentSection: React.FC<DoctorAppointmentSectionProps> = ({
  title = 'Schedule an Appointment',
  subtitle = 'Taking new patients and accepting most insurance plans. Book your appointment today and take the first step toward better health.',
  variant = 'varient_1',
  primaryColor = '#1D2B6B',
  accentTeal = '#48B89F',
  isDark = false,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [appointmentType, setAppointmentType] = useState('Annual Physical Exam');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const renderBookingForm = (customCardClass = '') => (
    <div className={customCardClass}>
      <EditableText
        id="doc_form_title"
        as="h3"
        defaultText="Request an Appointment"
        className="text-xl font-extrabold mb-6 block"
      />
      {submitted ? (
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
          <CheckCircle2 size={32} className="mx-auto text-emerald-600" />
          <div className="text-base font-extrabold text-emerald-900 dark:text-emerald-200">
            Appointment Request Received!
          </div>
          <p className="text-xs text-emerald-700 dark:text-emerald-300">
            Dr. Sarah Mitchell&apos;s care team will confirm your visit shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <EditableText id="doc_form_lbl_name" as="div" defaultText="Full Name *" className="block text-xs font-bold mb-1.5 opacity-80" />
            <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101726] text-slate-900 dark:text-white text-xs font-medium outline-none focus:border-[#48B89F]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <EditableText id="doc_form_lbl_email" as="div" defaultText="Email *" className="block text-xs font-bold mb-1.5 opacity-80" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101726] text-slate-900 dark:text-white text-xs font-medium outline-none focus:border-[#48B89F]" />
            </div>
            <div>
              <EditableText id="doc_form_lbl_phone" as="div" defaultText="Phone *" className="block text-xs font-bold mb-1.5 opacity-80" />
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101726] text-slate-900 dark:text-white text-xs font-medium outline-none focus:border-[#48B89F]" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <EditableText id="doc_form_lbl_type" as="div" defaultText="Appointment Type *" className="block text-xs font-bold mb-1.5 opacity-80" />
              <select value={appointmentType} onChange={(e) => setAppointmentType(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101726] text-slate-900 dark:text-white text-xs font-medium outline-none focus:border-[#48B89F]">
                <option>Annual Physical Exam</option>
                <option>New Patient Consultation</option>
                <option>Chronic Disease Follow-Up</option>
                <option>Same-Day Acute Care</option>
                <option>Telemedicine Video Visit</option>
              </select>
            </div>
            <div>
              <EditableText id="doc_form_lbl_date" as="div" defaultText="Preferred Date *" className="block text-xs font-bold mb-1.5 opacity-80" />
              <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101726] text-slate-900 dark:text-white text-xs font-medium outline-none focus:border-[#48B89F]" />
            </div>
          </div>
          <div>
            <EditableText id="doc_form_lbl_notes" as="div" defaultText="Additional Information" className="block text-xs font-bold mb-1.5 opacity-80" />
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Please share any specific concerns or questions..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101726] text-slate-900 dark:text-white text-xs font-medium outline-none focus:border-[#48B89F]" />
          </div>
          <EditableButton
            id="doc_form_submit_btn"
            defaultText="Request Appointment"
            onClickFallback={() => setSubmitted(true)}
            iconLeft={<Send size={14} />}
            className="w-full py-3.5 px-6 rounded-xl text-xs font-extrabold text-white shadow-md hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          />
          <EditableText id="doc_form_disclaimer" as="p" defaultText="By submitting this form, you agree to our privacy policy and consent to be contacted." className="text-[11px] text-center opacity-60 block" />
        </form>
      )}
    </div>
  );

  const renderFourContactCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className={`p-5 rounded-2xl border shadow-xs flex items-start gap-3.5 ${isDark ? 'bg-[#182238] border-white/10' : 'bg-white border-slate-200/80'}`}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: primaryColor }}>
          <Phone size={18} />
        </div>
        <div className="text-xs space-y-1">
          <EditableText id="doc_contact_phone_title" as="div" defaultText="Phone" className="font-extrabold text-sm" />
          <EditableText id="doc_contact_phone_main" as="div" defaultText="Main: (555) 123-4567" defaultLinkUrl="tel:5551234567" className="text-slate-600 dark:text-slate-300" />
          <EditableText id="doc_contact_phone_emg" as="div" defaultText="Emergency: (555) 987-6543" defaultLinkUrl="tel:5559876543" className="text-slate-500 dark:text-slate-400" />
        </div>
      </div>

      <div className={`p-5 rounded-2xl border shadow-xs flex items-start gap-3.5 ${isDark ? 'bg-[#182238] border-white/10' : 'bg-white border-slate-200/80'}`}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: accentTeal }}>
          <Mail size={18} />
        </div>
        <div className="text-xs space-y-1 min-w-0">
          <EditableText id="doc_contact_email_title" as="div" defaultText="Email" className="font-extrabold text-sm" />
          <EditableText id="doc_contact_email_info" as="div" defaultText="info@drsarahmitchell.com" defaultLinkUrl="mailto:info@drsarahmitchell.com" className="text-slate-600 dark:text-slate-300 truncate" />
          <EditableText id="doc_contact_email_appt" as="div" defaultText="appointments@drsarahmitchell.com" defaultLinkUrl="mailto:appointments@drsarahmitchell.com" className="text-slate-500 dark:text-slate-400 truncate" />
        </div>
      </div>

      <div className={`p-5 rounded-2xl border shadow-xs flex items-start gap-3.5 ${isDark ? 'bg-[#182238] border-white/10' : 'bg-white border-slate-200/80'}`}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: primaryColor }}>
          <MapPin size={18} />
        </div>
        <div className="text-xs space-y-1">
          <EditableText id="doc_contact_loc_title" as="div" defaultText="Location" className="font-extrabold text-sm" />
          <EditableText id="doc_contact_loc_line1" as="div" defaultText="123 Medical Plaza, Suite 400" className="text-slate-600 dark:text-slate-300" />
          <EditableText id="doc_contact_loc_line2" as="div" defaultText="San Francisco, CA 94102" className="text-slate-500 dark:text-slate-400" />
        </div>
      </div>

      <div className={`p-5 rounded-2xl border shadow-xs flex items-start gap-3.5 ${isDark ? 'bg-[#182238] border-white/10' : 'bg-white border-slate-200/80'}`}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: accentTeal }}>
          <Clock size={18} />
        </div>
        <div className="text-xs space-y-1">
          <EditableText id="doc_contact_hours_title" as="div" defaultText="Hours" className="font-extrabold text-sm" />
          <EditableText id="doc_contact_hours_wk" as="div" defaultText="Mon-Fri: 8:00 AM - 6:00 PM" className="text-slate-600 dark:text-slate-300" />
          <EditableText id="doc_contact_hours_sat" as="div" defaultText="Sat: 9:00 AM - 2:00 PM" className="text-slate-500 dark:text-slate-400" />
        </div>
      </div>
    </div>
  );

  /* VARIANT 2: Centered Booking Card + Full-Width Clinic Photo Banner & 4-Column Contact Strip */
  if (variant === 'varient_2') {
    return (
      <section id="contact" className={`py-20 px-6 ${isDark ? 'bg-[#0D1322] text-white' : 'bg-[#F4FAF8] text-[#1D2B6B]'}`}>
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <EditableText id="doc_appt_badge" as="div" defaultText="GET IN TOUCH" className="text-xs font-extrabold uppercase tracking-widest text-[#48B89F]" />
            <EditableText id="doc_appt_heading" as="h2" defaultText={title} className="text-3xl md:text-5xl font-black block" />
            <EditableText id="doc_appt_subtitle" as="p" defaultText={subtitle} className="text-sm text-slate-600 dark:text-slate-300 block" />
          </div>

          {renderFourContactCards()}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7">
              {renderBookingForm(`p-8 rounded-3xl border shadow-lg h-full ${isDark ? 'bg-[#162035] border-white/10' : 'bg-white border-slate-200/80'}`)}
            </div>
            <div className="lg:col-span-5 rounded-3xl overflow-hidden relative min-h-[380px] shadow-lg">
              <EditableImage id="doc_clinic_location_img" defaultSrc={DEFAULT_CLINIC_IMG} alt="San Francisco Medical Plaza" className="w-full h-full object-cover" />
              <div className="pointer-events-none absolute inset-0 p-7 flex flex-col justify-end text-white bg-gradient-to-t from-[#1D2B6B]/95 via-[#1D2B6B]/40 to-transparent">
                <div className="pointer-events-auto space-y-2">
                  <EditableText id="doc_loc_banner_title" as="h4" defaultText="Conveniently Located" className="text-xl font-extrabold block" />
                  <EditableText id="doc_loc_banner_desc" as="p" defaultText="Easy access with ample parking and public transit nearby." className="text-xs text-white/85 block" />
                  <EditableButton id="doc_loc_banner_btn" defaultText="Get Directions" defaultLinkUrl="https://maps.google.com" iconRight={<ArrowRight size={14} />} className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#48B89F] hover:underline cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 3: Brutalist Clinical Intake Dossier + Red Emergency Box */
  if (variant === 'varient_3') {
    return (
      <section id="contact" className={`py-20 px-6 border-b-2 border-slate-900 dark:border-white ${isDark ? 'bg-[#12192B] text-white' : 'bg-white text-slate-950'}`}>
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="border-2 border-slate-900 dark:border-white p-6 bg-[#48B89F] text-slate-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[6px_6px_0px_#1D2B6B]">
            <div>
              <EditableText id="doc_appt_badge" as="div" defaultText="PATIENT INTAKE // APPOINTMENT DESK" className="font-mono text-xs font-black uppercase" />
              <EditableText id="doc_appt_heading" as="h2" defaultText={title} className="text-3xl font-black uppercase block" />
            </div>
            <EditableButton id="doc_emergency_btn" defaultText="EMERGENCY: CALL 911" defaultLinkUrl="tel:911" iconLeft={<Phone size={14} />} className="px-5 py-3 border-2 border-slate-900 bg-[#D11124] text-white text-xs font-black uppercase cursor-pointer inline-flex items-center gap-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              {renderBookingForm('p-8 border-2 border-slate-900 dark:border-white bg-[#F8FAFC] dark:bg-[#162035] shadow-[6px_6px_0px_#1D2B6B]')}
            </div>
            <div className="lg:col-span-5 space-y-6">
              {renderFourContactCards()}
              <div className="h-56 border-2 border-slate-900 dark:border-white overflow-hidden relative">
                <EditableImage id="doc_clinic_location_img" defaultSrc={DEFAULT_CLINIC_IMG} alt="Medical Plaza" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 4: Bento Clinic Hub (Left Contact + Map Tiles, Right Form) */
  if (variant === 'varient_4') {
    return (
      <section id="contact" className={`py-20 px-6 ${isDark ? 'bg-[#0F1523] text-white' : 'bg-[#EEF5F4] text-[#1D2B6B]'}`}>
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div className="p-7 rounded-[28px] text-white space-y-2" style={{ backgroundColor: primaryColor }}>
                <EditableText id="doc_appt_badge" as="div" defaultText="GET IN TOUCH" className="text-xs font-extrabold uppercase tracking-widest text-[#48B89F]" />
                <EditableText id="doc_appt_heading" as="h2" defaultText={title} className="text-2xl font-black block" />
                <EditableText id="doc_appt_subtitle" as="p" defaultText={subtitle} className="text-xs text-white/80 block" />
              </div>
              {renderFourContactCards()}
              <div className="rounded-[24px] overflow-hidden h-48 relative shadow-sm">
                <EditableImage id="doc_clinic_location_img" defaultSrc={DEFAULT_CLINIC_IMG} alt="Clinic" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="lg:col-span-7">
              {renderBookingForm(`p-8 rounded-[28px] border shadow-md ${isDark ? 'bg-[#162035] border-white/10' : 'bg-white border-slate-200/80'}`)}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 5: Dark Executive Navy Patient Intake & Concierge Desk */
  if (variant === 'varient_5') {
    return (
      <section id="contact" className="py-20 px-6 bg-gradient-to-b from-[#0B1120] to-[#152244] text-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <EditableText id="doc_appt_badge" as="div" defaultText="GET IN TOUCH" className="text-xs font-extrabold uppercase tracking-widest text-[#48B89F]" />
            <EditableText id="doc_appt_heading" as="h2" defaultText={title} className="text-3xl md:text-5xl font-black block" />
            <EditableText id="doc_appt_subtitle" as="p" defaultText={subtitle} className="text-sm text-slate-300 block" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6">
              {renderBookingForm('p-8 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-md')}
            </div>
            <div className="lg:col-span-6 space-y-5">
              {renderFourContactCards()}
              <div className="rounded-3xl overflow-hidden h-56 relative border border-white/15">
                <EditableImage id="doc_clinic_location_img" defaultSrc={DEFAULT_CLINIC_IMG} alt="Clinic" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 6: Express Telehealth & In-Clinic Split Banner + Intake Form */
  if (variant === 'varient_6') {
    return (
      <section id="contact" className={`py-20 px-6 ${isDark ? 'bg-[#12192B] text-white' : 'bg-white text-[#1D2B6B]'}`}>
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="rounded-[28px] p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl" style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentTeal} 100%)` }}>
            <div className="space-y-2 max-w-xl">
              <EditableText id="doc_cta_welcome_title" as="h2" defaultText="New Patients Welcome — Schedule Your Visit" className="text-2xl md:text-3xl font-black block" />
              <EditableText id="doc_cta_welcome_desc" as="p" defaultText={subtitle} className="text-xs md:text-sm text-white/90 block" />
            </div>
            <div className="flex flex-wrap gap-3">
              <EditableButton id="doc_cta_call_us_btn" defaultText="Call: (555) 123-4567" defaultLinkUrl="tel:5551234567" className="px-6 py-3 rounded-xl bg-white text-xs font-extrabold cursor-pointer inline-flex items-center gap-2" style={{ color: primaryColor }} />
              <EditableButton id="doc_emergency_btn" defaultText="Emergency 911" defaultLinkUrl="tel:911" className="px-5 py-3 rounded-xl bg-[#D11124] text-white text-xs font-extrabold cursor-pointer inline-flex items-center gap-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              {renderBookingForm(`p-8 rounded-3xl border shadow-sm ${isDark ? 'bg-[#182238] border-white/10' : 'bg-[#F8FAFC] border-slate-200/80'}`)}
            </div>
            <div className="lg:col-span-5 space-y-4">
              {renderFourContactCards()}
              <div className="rounded-2xl overflow-hidden h-48 relative">
                <EditableImage id="doc_clinic_location_img" defaultSrc={DEFAULT_CLINIC_IMG} alt="Clinic" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 1 (Default Dribbble Video Layout): Form + 4 Contact Cards + Location Overlay + 911 Alert + New Patients CTA */
  return (
    <section id="contact" className={`py-20 px-6 transition-colors ${isDark ? 'bg-[#12192B] text-white' : 'bg-[#F8FAFC] text-[#1D2B6B]'}`}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <EditableText id="doc_appt_badge" as="div" defaultText="GET IN TOUCH" className="text-xs font-extrabold uppercase tracking-widest" style={{ color: accentTeal }} />
          <EditableText id="doc_appt_heading" as="h2" defaultText={title} className="text-3xl md:text-4xl font-extrabold tracking-tight block" style={{ color: isDark ? '#FFFFFF' : primaryColor }} />
          <EditableText id="doc_appt_subtitle" as="p" defaultText={subtitle} className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed block" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6">
            {renderBookingForm(`p-7 md:p-8 rounded-[24px] border shadow-md ${isDark ? 'bg-[#182238] border-white/10' : 'bg-white border-slate-200/80'}`)}
          </div>

          <div className="lg:col-span-6 space-y-4">
            {renderFourContactCards()}

            <div className="relative rounded-2xl overflow-hidden h-52 shadow-md group">
              <EditableImage id="doc_clinic_location_img" defaultSrc={DEFAULT_CLINIC_IMG} alt="San Francisco Medical Plaza" className="w-full h-full object-cover" />
              <div className="pointer-events-none absolute inset-0 p-6 flex flex-col justify-end text-white" style={{ background: 'linear-gradient(180deg, rgba(29,43,107,0.20) 0%, rgba(29,43,107,0.88) 100%)' }}>
                <div className="pointer-events-auto">
                  <EditableText id="doc_loc_banner_title" as="h4" defaultText="Conveniently Located" className="text-lg font-extrabold block" />
                  <EditableText id="doc_loc_banner_desc" as="p" defaultText="Easy access with ample parking and public transit nearby." className="text-xs text-white/85 mt-1 block" />
                  <EditableButton id="doc_loc_banner_btn" defaultText="Get Directions" defaultLinkUrl="https://maps.google.com" iconRight={<ArrowRight size={14} />} className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#48B89F] hover:underline cursor-pointer w-fit" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Emergency Red Alert Card */}
        <div className={`p-6 md:p-7 rounded-2xl border-l-4 border-l-[#D11124] border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${isDark ? 'bg-[#241623] border-white/10' : 'bg-[#FFF5F5] border-red-100'}`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-extrabold text-[#D11124]">
              <AlertTriangle size={17} />
              <EditableText id="doc_emergency_title" defaultText="Medical Emergency?" />
            </div>
            <EditableText id="doc_emergency_desc" as="p" defaultText="If you are experiencing a medical emergency, please call 911 or go to the nearest emergency room immediately. For urgent after-hours concerns for established patients, call our emergency line." className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed block" />
          </div>
          <EditableButton id="doc_emergency_btn" defaultText="Call 911" defaultLinkUrl="tel:911" iconLeft={<Phone size={14} />} className="px-5 py-2.5 rounded-xl bg-[#D11124] text-white text-xs font-extrabold inline-flex items-center gap-2 flex-shrink-0 shadow-xs hover:opacity-95 cursor-pointer" />
        </div>

        {/* New Patients Welcome Gradient CTA Banner */}
        <div className="rounded-[28px] p-8 md:p-12 text-center text-white shadow-xl space-y-5" style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentTeal} 100%)` }}>
          <EditableText id="doc_cta_welcome_title" as="h3" defaultText="New Patients Welcome" className="text-2xl md:text-3xl font-extrabold block" />
          <EditableText id="doc_cta_welcome_desc" as="p" defaultText="Ready to experience personalized, compassionate healthcare? Schedule your first appointment today and join our practice family." className="text-xs md:text-sm text-white/85 max-w-xl mx-auto leading-relaxed block" />
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
            <EditableButton id="doc_cta_book_online_btn" defaultText="Book Online" defaultLinkUrl="#contact" className="px-7 py-3 rounded-xl bg-white text-xs font-extrabold shadow-md hover:opacity-95 transition cursor-pointer inline-flex items-center gap-2" style={{ color: primaryColor }} />
            <EditableButton id="doc_cta_call_us_btn" defaultText="Call Us: (555) 123-4567" defaultLinkUrl="tel:5551234567" className="px-7 py-3 rounded-xl border-2 border-white text-white text-xs font-extrabold hover:bg-white/10 transition cursor-pointer inline-flex items-center gap-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorAppointmentSection;
