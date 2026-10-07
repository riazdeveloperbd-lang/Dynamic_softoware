import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Car,
  Accessibility,
  Clock,
  Calendar,
} from 'lucide-react';
import {
  EditableText,
  EditableButton,
  EditableImage,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface Doctor2LocationSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

const DEFAULT_MAP_GRAPHIC =
  'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=900&q=80';

export const Doctor2LocationSection: React.FC<Doctor2LocationSectionProps> = ({
  title = 'Location & Hours',
  subtitle = 'Visit HeartCare Clinic in New York or book an appointment online.',
  variant = 'varient_1',
  primaryColor = '#118C74',
  isDark = false,
}) => {
  /* VARIANT 2: Centered Map Banner + 2-Column Clinic & Hours Cards */
  if (variant === 'varient_2' || variant === 'varient_5') {
    return (
      <section
        id="location"
        className={`py-14 px-4 sm:px-8 ${
          isDark ? 'bg-[#0B1320] text-white' : 'bg-[#F6FBF9] text-slate-900'
        }`}
      >
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <EditableText
              id="doc2_loc_heading_v2"
              as="h2"
              defaultText={title}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight block"
            />
            <EditableButton
              id="doc2_loc_book_v2"
              defaultText="Schedule Visit"
              defaultLinkUrl="tel:12125557890"
              iconLeft={<Calendar size={14} />}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-white cursor-pointer inline-flex items-center gap-2 self-start"
              style={{ backgroundColor: primaryColor }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            <div className="md:col-span-5 rounded-3xl overflow-hidden relative min-h-[220px] border border-slate-200 dark:border-white/10">
              <EditableImage
                id="doc2_loc_map_img"
                defaultSrc={DEFAULT_MAP_GRAPHIC}
                alt="HeartCare Clinic Map"
                className="w-full h-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-teal-950/15">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white shadow-xl"
                  style={{ backgroundColor: primaryColor }}
                >
                  <MapPin size={22} />
                </div>
              </div>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div
                className={`p-6 rounded-3xl border space-y-3 ${
                  isDark
                    ? 'bg-[#131F33] border-white/10'
                    : 'bg-white border-slate-200/80'
                }`}
              >
                <EditableText
                  id="doc2_clinic_name"
                  as="h3"
                  defaultText="HeartCare Clinic"
                  className="text-base font-extrabold block"
                />
                <EditableText
                  id="doc2_clinic_addr1"
                  as="p"
                  defaultText="102 Ass Avenue, Suite 206, New York, NY 10003, USA"
                  className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed block"
                />
                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="flex items-center gap-2">
                    <Phone size={13} style={{ color: primaryColor }} />
                    <EditableText
                      id="doc2_clinic_phone"
                      defaultText="+1 (212) 555-7890"
                      defaultLinkUrl="tel:12125557890"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={13} style={{ color: primaryColor }} />
                    <EditableText
                      id="doc2_clinic_email"
                      defaultText="info@drarjun.com"
                      defaultLinkUrl="mailto:info@drarjun.com"
                    />
                  </div>
                </div>
              </div>

              <div
                className={`p-6 rounded-3xl border space-y-3 ${
                  isDark
                    ? 'bg-[#131F33] border-white/10'
                    : 'bg-white border-slate-200/80'
                }`}
              >
                <EditableText
                  id="doc2_hours_title"
                  as="h3"
                  defaultText="Clinic Hours"
                  className="text-base font-extrabold block"
                />
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <EditableText id="doc2_hr_d1" defaultText="Mon - Fri" className="text-slate-500" />
                    <EditableText id="doc2_hr_t1" defaultText="9:00 AM - 6:00 PM" className="font-bold" />
                  </div>
                  <div className="flex justify-between">
                    <EditableText id="doc2_hr_d2" defaultText="Saturday" className="text-slate-500" />
                    <EditableText id="doc2_hr_t2" defaultText="9:00 AM - 1:00 PM" className="font-bold" />
                  </div>
                  <div className="flex justify-between">
                    <EditableText id="doc2_hr_d3" defaultText="Sunday" className="text-slate-500" />
                    <EditableText id="doc2_hr_t3" defaultText="Closed" className="font-bold text-rose-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* VARIANT 3: Dark Executive Location & Hours Panel */
  if (variant === 'varient_3' || variant === 'varient_6') {
    return (
      <section id="location" className="py-14 px-4 sm:px-8 bg-[#0E182B] text-white">
        <div className="max-w-6xl mx-auto space-y-8">
          <EditableText
            id="doc2_loc_heading_v3"
            as="h2"
            defaultText={title}
            className="text-2xl sm:text-3xl font-extrabold block"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10">
            <div className="lg:col-span-4 h-52 rounded-2xl overflow-hidden relative">
              <EditableImage
                id="doc2_loc_map_img"
                defaultSrc={DEFAULT_MAP_GRAPHIC}
                alt="HeartCare Clinic Map"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-4 space-y-2.5 text-xs">
              <EditableText
                id="doc2_clinic_name"
                as="h3"
                defaultText="HeartCare Clinic"
                className="text-base font-extrabold text-emerald-400 block"
              />
              <EditableText
                id="doc2_clinic_addr1"
                as="p"
                defaultText="102 Ass Avenue, Suite 206, New York, NY 10003, USA"
                className="text-slate-300 block"
              />
              <div className="pt-1 space-y-1">
                <div>
                  <EditableText
                    id="doc2_clinic_phone"
                    defaultText="+1 (212) 555-7890"
                    defaultLinkUrl="tel:12125557890"
                  />
                </div>
                <div>
                  <EditableText
                    id="doc2_clinic_email"
                    defaultText="info@drarjun.com"
                    defaultLinkUrl="mailto:info@drarjun.com"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-2.5 text-xs">
              <EditableText
                id="doc2_hours_title"
                as="h3"
                defaultText="Clinic Hours"
                className="text-base font-extrabold text-emerald-400 block"
              />
              <div className="space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <EditableText id="doc2_hr_d1" defaultText="Mon - Fri" />
                  <EditableText id="doc2_hr_t1" defaultText="9:00 AM - 6:00 PM" />
                </div>
                <div className="flex justify-between">
                  <EditableText id="doc2_hr_d2" defaultText="Saturday" />
                  <EditableText id="doc2_hr_t2" defaultText="9:00 AM - 1:00 PM" />
                </div>
                <div className="flex justify-between">
                  <EditableText id="doc2_hr_d3" defaultText="Sunday" />
                  <EditableText id="doc2_hr_t3" defaultText="Closed" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ========================================================================
   * VARIANT 1 (Exact Dribbble Screenshot Layout):
   * "Location & Hours" + 3 Columns:
   * 1. Rounded Map Card with Teal Location Pin
   * 2. HeartCare Clinic Address, Phone, Email + Free Parking Available
   * 3. Clinic Hours Table + Wheelchair Accessible
   * ======================================================================== */
  return (
    <section
      id="location"
      className={`py-12 px-4 sm:px-8 transition-colors ${
        isDark ? 'bg-[#0B1320] text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-7">
        <EditableText
          id="doc2_loc_heading"
          as="h2"
          defaultText={title}
          className="text-xl sm:text-2xl font-extrabold tracking-tight block"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: Map Preview with Pin */}
          <div className="md:col-span-4">
            <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xs bg-slate-100">
              <EditableImage
                id="doc2_loc_map_img"
                defaultSrc={DEFAULT_MAP_GRAPHIC}
                alt="HeartCare Clinic Map"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg ring-4 ring-white/80"
                  style={{ backgroundColor: primaryColor }}
                >
                  <MapPin size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Middle: HeartCare Clinic Info + Free Parking Badge */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <EditableText
              id="doc2_clinic_name"
              as="h3"
              defaultText="HeartCare Clinic"
              className="text-sm font-extrabold text-slate-900 dark:text-white block"
            />
            <div className="space-y-0.5 text-slate-500 dark:text-slate-400">
              <EditableText
                id="doc2_clinic_addr1"
                as="div"
                defaultText="102 Ass Avenue, Suite 206"
              />
              <EditableText
                id="doc2_clinic_addr2"
                as="div"
                defaultText="New York, NY 10003, USA"
              />
            </div>

            <div className="space-y-1.5 pt-1 text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Phone size={13} style={{ color: primaryColor }} />
                <EditableText
                  id="doc2_clinic_phone"
                  defaultText="+1 (212) 555-7890"
                  defaultLinkUrl="tel:12125557890"
                />
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} style={{ color: primaryColor }} />
                <EditableText
                  id="doc2_clinic_email"
                  defaultText="info@drarjun.com"
                  defaultLinkUrl="mailto:info@drarjun.com"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <Car size={14} style={{ color: primaryColor }} />
              <EditableText
                id="doc2_badge_parking"
                defaultText="Free Parking Available"
              />
            </div>
          </div>

          {/* Right: Clinic Hours + Wheelchair Accessible Badge */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <EditableText
              id="doc2_hours_title"
              as="h3"
              defaultText="Clinic Hours"
              className="text-sm font-extrabold text-slate-900 dark:text-white block"
            />

            <div className="space-y-2 text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between gap-4">
                <EditableText
                  id="doc2_hr_d1"
                  defaultText="Mon - Fri"
                  className="text-slate-500 dark:text-slate-400"
                />
                <EditableText
                  id="doc2_hr_t1"
                  defaultText="9:00 AM - 6:00 PM"
                  className="font-semibold"
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <EditableText
                  id="doc2_hr_d2"
                  defaultText="Saturday"
                  className="text-slate-500 dark:text-slate-400"
                />
                <EditableText
                  id="doc2_hr_t2"
                  defaultText="9:00 AM - 1:00 PM"
                  className="font-semibold"
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <EditableText
                  id="doc2_hr_d3"
                  defaultText="Sunday"
                  className="text-slate-500 dark:text-slate-400"
                />
                <EditableText
                  id="doc2_hr_t3"
                  defaultText="Closed"
                  className="font-semibold text-slate-400"
                />
              </div>
            </div>

            <div className="pt-5 flex items-center gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <Accessibility size={14} style={{ color: primaryColor }} />
              <EditableText
                id="doc2_badge_wheelchair"
                defaultText="Wheelchair Accessible"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctor2LocationSection;
