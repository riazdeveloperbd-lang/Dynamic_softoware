import React from 'react';
import {
  ShieldCheck,
  Clock,
  PhoneCall,
  MapPin,
  UtensilsCrossed,
  Thermometer,
  CheckCircle2,
  Truck,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface KhabarDirectTrustHygieneFooterSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

const HYGIENE_GALLERY = [
  {
    title: 'BSTI & DNCC Grade-A Stainless Steel Kitchen Line',
    bnSub: 'বিএসটিআই ও সিটি কর্পোরেশন অনুমোদিত হাইজিনিক কিচেন',
    desc: 'Every cloud kitchen station is sanitized every 2 hours with food-grade disinfectant. Chefs wear hairnets, masks, and nitrile gloves at all times.',
    metric: '100% Open Audit Score',
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: '72°C Thermal Foil & Tamper-Evident Security Seal',
    bnSub: '৭২° সেলসিয়াস থার্মাল ফয়েল ও টেম্পার-প্রুফ সিল',
    desc: 'Every burger, kacchi box, and beverage is sealed with a dated tamper-evident strip before leaving our kitchen counter so your meal arrives piping hot.',
    metric: 'Tamper-Proof Guarantee',
    image:
      'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: '100% Halal Certified Meat & Daily Morning Produce',
    bnSub: '১০০% হালাল সার্টিফাইড মাংস ও প্রতিদিনের তাজা উপকরণ',
    desc: 'Grass-fed beef, farm-fresh chicken, and French Normandy butter sourced daily—zero frozen pre-cooked patties or artificial preservatives.',
    metric: 'Halal Foundation Verified',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  },
];

const KITCHEN_HUBS = [
  {
    hub: 'Banani Flagship Cloud Hub',
    address: 'Plot 34, Road 11, Block F, Banani, Dhaka 1213',
    hours: '11:00 AM – 11:45 PM Daily',
    hotline: '+880 1711-984320',
    zones: 'Banani, Gulshan 1 & 2, Baridhara, Mohakhali DOHS',
  },
  {
    hub: 'Dhanmondi & Central Hub',
    address: 'House 19, Road 27 (Old), Satmasjid Road, Dhanmondi, Dhaka 1209',
    hours: '11:00 AM – 11:30 PM Daily',
    hotline: '+880 1711-984321',
    zones: 'Dhanmondi, Lalmatia, Mohammadpur, Green Road, Bailey Road',
  },
  {
    hub: 'Uttara & Bashundhara Hub',
    address: 'House 14, Rabindra Sarani, Sector 7, Uttara, Dhaka 1230',
    hours: '11:00 AM – 11:30 PM Daily',
    hotline: '+880 1711-984322',
    zones: 'Uttara Sectors 1–14, Airport, Bashundhara R/A, Nikunja',
  },
  {
    hub: 'Chattogram GEC Express Hub',
    address: 'CDA Avenue, Near GEC Circle, Nasirabad, Chattogram 4000',
    hours: '11:30 AM – 11:30 PM Daily',
    hotline: '+880 1711-984325',
    zones: 'GEC, Khulshi, Nasirabad, Panchlaish, Agrabad, Halishahar',
  },
];

export const KhabarDirectTrustHygieneFooterSection: React.FC<
  KhabarDirectTrustHygieneFooterSectionProps
> = ({ title, subtitle, primaryColor }) => {
  const crimsonPrimary = primaryColor || '#E11D48';
  const deepCharcoal = '#18181B';
  const emeraldAccent = '#10B981';

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="khabardirect-hygiene-footer"
      className="w-full text-white"
      style={{ backgroundColor: deepCharcoal }}
    >
      {/* 1. KITCHEN HYGIENE PHOTOS & 30-45 MINS DELIVERY GUARANTEE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16 space-y-10 border-b border-zinc-800">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="text-xs font-semibold" style={{ color: emeraldAccent }}>
              Clinical-Grade Kitchen Hygiene &amp; Direct Dispatch Guarantee
            </div>
            <EditableText
              as="h2"
              defaultValue={
                title || 'Inside Our Certified Cloud Kitchens & 30–45 Min Delivery Promise'
              }
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
            />
            <EditableText
              as="p"
              defaultValue={
                subtitle ||
                'Every order is cooked fresh, sealed with a tamper-evident thermal strip, and delivered by our dedicated rider fleet.'
              }
              className="text-sm text-zinc-400"
            />
          </div>

          {/* Average Preparation Time Guarantee Callout */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-3.5 shrink-0">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ backgroundColor: crimsonPrimary }}
            >
              <Clock size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                30–45 Mins Average Delivery Guarantee
              </div>
              <div className="text-[11px] text-zinc-400">
                Late beyond 50 mins? Get ৳100 instant voucher on your next order.
              </div>
            </div>
          </div>
        </div>

        {/* 3 Kitchen Hygiene Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HYGIENE_GALLERY.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="h-48 w-full overflow-hidden bg-zinc-800 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 text-xs font-semibold text-emerald-300 bg-black/75 px-2.5 py-1 rounded-lg">
                    {item.metric}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-zinc-400">{item.bnSub}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. MULTI-HUB CLOUD KITCHEN DIRECTORY & OPERATING HOURS */}
        <div className="pt-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-bold text-white">
              Active Cloud Kitchen Dispatch Hubs &amp; Direct Hotlines
            </h3>
            <span className="text-xs text-zinc-400">
              Operating Hours: <strong className="text-white">11:00 AM – 11:30 PM (7 Days a Week)</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {KITCHEN_HUBS.map((hub) => (
              <div
                key={hub.hub}
                className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2 text-xs"
              >
                <div className="font-bold text-white flex items-center gap-1.5">
                  <MapPin size={13} style={{ color: crimsonPrimary }} />
                  <span>{hub.hub}</span>
                </div>
                <p className="text-zinc-400 leading-relaxed">{hub.address}</p>
                <p className="text-[11px] text-zinc-500">Covers: {hub.zones}</p>
                <div className="pt-2 border-t border-zinc-800/90 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-emerald-400">{hub.hotline}</span>
                  <span className="text-zinc-400">Open Now</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM BRAND FOOTER & DIRECT ORDER LINKS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
            style={{ backgroundColor: crimsonPrimary }}
          >
            <UtensilsCrossed size={16} />
          </div>
          <div>
            <span className="font-bold text-white">KhabarDirect BD</span>
            <span className="mx-2 text-zinc-600">·</span>
            <span>Commission-Free Direct Restaurant &amp; Cloud Kitchen Ordering Platform</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <a
            href="tel:+8801711984320"
            className="hover:text-white transition inline-flex items-center gap-1.5"
          >
            <PhoneCall size={13} className="text-emerald-400" />
            <span>Order Tracking Hotline: +880 1711-984320</span>
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="text-zinc-300 hover:text-white font-semibold cursor-pointer"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
