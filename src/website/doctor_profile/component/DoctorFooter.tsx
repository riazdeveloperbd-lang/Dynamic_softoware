import React from 'react';
import { Home, Phone, Mail, MapPin } from 'lucide-react';
import { EditableText, EditableButton } from './DoctorCanvaEditorContext';
import { DoctorVariantId } from './DoctorNavbar';

export interface DoctorFooterProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  accentTeal?: string;
  isDark?: boolean;
}

export const DoctorFooter: React.FC<DoctorFooterProps> = ({
  title = 'Dr. Sarah Mitchell',
  subtitle = 'Medical License #MD-12345 · Board Certified Internal Medicine',
  variant = 'varient_1',
  primaryColor = '#1D2B6B',
  accentTeal = '#48B89F',
  isDark = false,
}) => {
  /* VARIANT 2: 4-Column Clinical Sitemap Footer */
  if (variant === 'varient_2') {
    return (
      <footer className="py-14 px-6 text-white" style={{ backgroundColor: primaryColor }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/15">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <Home size={18} className="text-[#48B89F]" />
              <EditableText id="doc_footer_v2_title" defaultText={title} className="text-lg font-extrabold" />
            </div>
            <EditableText id="doc_footer_license" as="p" defaultText={subtitle} className="text-xs text-white/75 max-w-sm block" />
          </div>
          <div className="space-y-2 text-xs">
            <div className="font-extrabold uppercase tracking-wider text-[#48B89F]">Navigation</div>
            <div className="flex flex-col gap-1.5 text-white/85">
              <EditableText id="doc_f_nav_1" defaultText="Home" defaultLinkUrl="#home" />
              <EditableText id="doc_f_nav_2" defaultText="About Dr. Mitchell" defaultLinkUrl="#about" />
              <EditableText id="doc_f_nav_3" defaultText="Medical Services" defaultLinkUrl="#services" />
              <EditableText id="doc_f_nav_4" defaultText="Book Appointment" defaultLinkUrl="#contact" />
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="font-extrabold uppercase tracking-wider text-[#48B89F]">Clinic Direct</div>
            <div className="flex flex-col gap-1.5 text-white/85">
              <EditableText id="doc_f_phone" defaultText="(555) 123-4567" defaultLinkUrl="tel:5551234567" />
              <EditableText id="doc_f_email" defaultText="info@drsarahmitchell.com" defaultLinkUrl="mailto:info@drsarahmitchell.com" />
              <EditableText id="doc_f_addr" defaultText="123 Medical Plaza, San Francisco" />
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-6 text-xs text-white/70 flex flex-wrap justify-between gap-2">
          <EditableText id="doc_footer_copyright" defaultText={`© ${new Date().getFullYear()} ${title}. All rights reserved.`} />
          <EditableText id="doc_footer_privacy" defaultText="HIPAA Compliant Practice · Privacy Policy" />
        </div>
      </footer>
    );
  }

  /* VARIANT 3: Brutalist Framed Medical Footer */
  if (variant === 'varient_3') {
    return (
      <footer className="py-10 px-6 border-t-2 border-slate-900 bg-[#48B89F] text-slate-950">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs font-black uppercase">
          <EditableText id="doc_footer_copyright" defaultText={`© ${new Date().getFullYear()} ${title} // ALL RIGHTS RESERVED`} />
          <EditableText id="doc_footer_license" defaultText={subtitle} />
        </div>
      </footer>
    );
  }

  /* VARIANT 4: Floating Bento Footer Card */
  if (variant === 'varient_4') {
    return (
      <footer className={`py-8 px-6 ${isDark ? 'bg-[#0F1523]' : 'bg-[#EEF5F4]'}`}>
        <div className="max-w-6xl mx-auto p-8 rounded-[28px] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg" style={{ backgroundColor: primaryColor }}>
          <div>
            <EditableText id="doc_footer_copyright" as="div" defaultText={`© ${new Date().getFullYear()} ${title}. All rights reserved.`} className="text-sm font-extrabold" />
            <EditableText id="doc_footer_license" as="div" defaultText={subtitle} className="text-xs text-white/75 mt-1" />
          </div>
          <EditableButton id="doc_footer_v4_btn" defaultText="Schedule Visit" defaultLinkUrl="#contact" className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white cursor-pointer" style={{ backgroundColor: accentTeal }} />
        </div>
      </footer>
    );
  }

  /* VARIANT 5: Dark Luxury Centered Wordmark Footer */
  if (variant === 'varient_5') {
    return (
      <footer className="py-14 px-6 bg-[#070B14] text-white text-center space-y-4 border-t border-white/10">
        <EditableText id="doc_footer_v5_brand" as="div" defaultText="DR. SARAH MITCHELL, MD" className="text-2xl font-black tracking-[0.25em] text-[#48B89F]" />
        <EditableText id="doc_footer_license" as="div" defaultText={subtitle} className="text-xs text-slate-400" />
        <EditableText id="doc_footer_copyright" as="div" defaultText={`© ${new Date().getFullYear()} ${title}. All rights reserved.`} className="text-xs text-slate-500 pt-2" />
      </footer>
    );
  }

  /* VARIANT 6: Split Contact Pills + Copyright Bar */
  if (variant === 'varient_6') {
    return (
      <footer className="py-10 px-6 text-white" style={{ backgroundColor: primaryColor }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <EditableText id="doc_footer_copyright" as="div" defaultText={`© ${new Date().getFullYear()} ${title}. All rights reserved.`} className="text-xs font-extrabold" />
            <EditableText id="doc_footer_license" as="div" defaultText={subtitle} className="text-[11px] text-white/75" />
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-white/10 inline-flex items-center gap-1.5">
              <Phone size={12} className="text-[#48B89F]" />
              <EditableText id="doc_f6_phone" defaultText="(555) 123-4567" defaultLinkUrl="tel:5551234567" />
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 inline-flex items-center gap-1.5">
              <Mail size={12} className="text-[#48B89F]" />
              <EditableText id="doc_f6_email" defaultText="info@drsarahmitchell.com" defaultLinkUrl="mailto:info@drsarahmitchell.com" />
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 inline-flex items-center gap-1.5">
              <MapPin size={12} className="text-[#48B89F]" />
              <EditableText id="doc_f6_loc" defaultText="San Francisco, CA" />
            </span>
          </div>
        </div>
      </footer>
    );
  }

  /* VARIANT 1 (Default Dribbble Video Footer) */
  return (
    <footer className="py-8 px-6 text-white text-center" style={{ backgroundColor: primaryColor }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/85">
        <EditableText id="doc_footer_copyright" as="div" defaultText={`© ${new Date().getFullYear()} ${title}. All rights reserved.`} className="font-semibold" />
        <EditableText id="doc_footer_license" as="div" defaultText={subtitle} className="text-white/75" />
      </div>
    </footer>
  );
};

export default DoctorFooter;
