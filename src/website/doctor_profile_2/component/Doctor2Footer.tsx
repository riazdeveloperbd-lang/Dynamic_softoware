import React from 'react';
import { PhoneCall, HeartPulse } from 'lucide-react';
import { EditableText } from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface Doctor2FooterProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const Doctor2Footer: React.FC<Doctor2FooterProps> = ({
  title = '© 2026 Dr. Arjun Mehta.',
  subtitle = 'All rights reserved.',
  variant = 'varient_1',
  primaryColor = '#118C74',
}) => {
  const footerLinks = [
    { id: 'privacy', label: 'Privacy Policy', href: '#home' },
    { id: 'terms', label: 'Terms of Use', href: '#home' },
    { id: 'disclaimer', label: 'Disclaimer', href: '#home' },
    { id: 'sitemap', label: 'Sitemap', href: '#home' },
  ];

  /* VARIANT 2: Soft Mint / Navy Split Footer */
  if (variant === 'varient_2' || variant === 'varient_5') {
    return (
      <footer className="bg-[#0F1E32] text-white py-8 px-4 sm:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-xs">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: primaryColor }}
            >
              <HeartPulse size={18} />
            </div>
            <div>
              <EditableText
                id="doc2_ft_v2_name"
                as="div"
                defaultText="Dr. Arjun Mehta · Interventional Cardiologist"
                className="font-extrabold text-white"
              />
              <EditableText
                id="doc2_ft_v2_emg"
                as="div"
                defaultText="Emergency Helpline: +1 (555) 123-4567"
                defaultLinkUrl="tel:15551234567"
                className="text-rose-400 font-semibold"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-slate-300">
            {footerLinks.map((lnk) => (
              <EditableText
                key={lnk.id}
                id={`doc2_ft_v2_${lnk.id}`}
                defaultText={lnk.label}
                defaultLinkUrl={lnk.href}
              />
            ))}
          </div>

          <div className="text-slate-400">
            <EditableText id="doc2_ft_v2_copy" defaultText={`${title} ${subtitle}`} />
          </div>
        </div>
      </footer>
    );
  }

  /* VARIANT 3: Minimal Centered Dark Cardiology Bar */
  if (variant === 'varient_3' || variant === 'varient_6') {
    return (
      <footer className="bg-[#070E1A] text-white py-8 px-4 sm:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center space-y-4 text-xs">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 text-rose-400 font-bold">
            <PhoneCall size={13} />
            <EditableText
              id="doc2_ft_v3_emg"
              defaultText="Emergency Helpline: +1 (555) 123-4567"
              defaultLinkUrl="tel:15551234567"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 font-semibold">
            {footerLinks.map((lnk) => (
              <EditableText
                key={lnk.id}
                id={`doc2_ft_v3_${lnk.id}`}
                defaultText={lnk.label}
                defaultLinkUrl={lnk.href}
              />
            ))}
          </div>
          <div className="text-slate-400">
            <EditableText id="doc2_ft_v3_copy" defaultText={`${title} ${subtitle}`} />
          </div>
        </div>
      </footer>
    );
  }

  /* ========================================================================
   * VARIANT 1 (Exact Dribbble Screenshot Dark Navy Rounded Footer Bar):
   * Left: Red Phone Icon + "Emergency Helpline" / "+1 (555) 123-4567"
   * Center: Privacy Policy · Terms of Use · Disclaimer · Sitemap
   * Right: © 2026 Dr. Arjun Mehta. All rights reserved.
   * ======================================================================== */
  return (
    <footer className="bg-[#0D1B2A] text-white py-6 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-xs">
        {/* Left: Emergency Helpline */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0">
            <PhoneCall size={15} />
          </div>
          <div className="leading-tight">
            <EditableText
              id="doc2_ft_emg_lbl"
              as="div"
              defaultText="Emergency Helpline"
              className="text-[11px] font-bold text-rose-400"
            />
            <EditableText
              id="doc2_ft_emg_num"
              as="div"
              defaultText="+1 (555) 123-4567"
              defaultLinkUrl="tel:15551234567"
              className="text-xs font-extrabold text-white mt-0.5"
            />
          </div>
        </div>

        {/* Center Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] sm:text-xs font-semibold text-slate-300">
          {footerLinks.map((lnk) => (
            <EditableText
              key={lnk.id}
              id={`doc2_ft_link_${lnk.id}`}
              defaultText={lnk.label}
              defaultLinkUrl={lnk.href}
              className="hover:text-white transition cursor-pointer"
            />
          ))}
        </div>

        {/* Right Copyright */}
        <div className="text-right leading-tight text-[11px] text-slate-300">
          <EditableText
            id="doc2_ft_copy_1"
            as="div"
            defaultText={title}
            className="font-bold text-white"
          />
          <EditableText
            id="doc2_ft_copy_2"
            as="div"
            defaultText={subtitle}
            className="text-slate-400"
          />
        </div>
      </div>
    </footer>
  );
};

export default Doctor2Footer;
