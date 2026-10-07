import React from 'react';
import { Compass } from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface TeacherFooterProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const TeacherFooter: React.FC<TeacherFooterProps> = ({
  title = 'Prof. Julian Vance, Ph.D.',
  subtitle = 'MIT Applied Mathematics Ph.D. · National Board Certified Educator (#MA-88412) · Cambridge 3D Lightboard Studio.',
  primaryColor = '#2563EB',
  isDark = false,
}) => {
  return (
    <footer
      className={`py-14 px-6 border-t transition-colors ${
        isDark
          ? 'bg-[#080B12] border-white/10 text-slate-300'
          : 'bg-white border-slate-200/80 text-slate-700'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-200/80 dark:border-white/10">
          <div className="md:col-span-5 space-y-3">
            <div
              className="flex items-center gap-2.5 text-lg font-semibold text-slate-900 dark:text-white"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <Compass size={16} />
              </span>
              <EditableText id="teacher_footer_brand" defaultText={title} />
            </div>
            <EditableText
              id="teacher_footer_sub"
              as="p"
              defaultText={subtitle}
              className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed block"
            />
          </div>

          <div className="md:col-span-3 space-y-2.5 text-xs sm:text-sm">
            <div className="font-semibold text-slate-900 dark:text-white">
              Landing Page Sections
            </div>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li>
                <a href="#teacher-about" className="hover:underline">
                  About &amp; Philosophy
                </a>
              </li>
              <li>
                <a href="#teacher-video" className="hover:underline">
                  75s Introductory Video
                </a>
              </li>
              <li>
                <a href="#teacher-credentials" className="hover:underline">
                  Credentials &amp; Licensure
                </a>
              </li>
              <li>
                <a href="#teacher-pricing" className="hover:underline">
                  Services &amp; Pricing
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-xs sm:text-sm">
            <div className="font-semibold text-slate-900 dark:text-white">
              Studio &amp; Academic Office Hours
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Tuesday – Friday: 3:00 PM – 9:00 PM EST
              <br />
              Saturday – Sunday: 9:30 AM – 5:00 PM EST
              <br />
              Harvard Square Studio, Cambridge, MA 02138
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span>
            © {new Date().getFullYear()} Prof. Julian Vance, Ph.D. All rights reserved.
          </span>
          <span className="font-mono tabular-nums">
            Massachusetts Educator License #MA-88412 · TEFL Certified
          </span>
        </div>
      </div>
    </footer>
  );
};
