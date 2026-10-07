import React from 'react';
import { Leaf, PhoneCall, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { EditableText } from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import { useStoreEcommerce } from './StoreEcommerceContext';

export interface StoreFooterProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const StoreFooter: React.FC<StoreFooterProps> = ({
  title = 'Bazar — বাজার',
  subtitle = 'বাংলাদেশের সবচেয়ে বিশ্বস্ত ১০০% খাঁটি ও নিরাপদ অর্গানিক ফুড স্টোর।',
  primaryColor = '#F37021',
}) => {
  const { setActivePage, openCategoryPage } = useStoreEcommerce();

  return (
    <footer className="bg-[#111827] text-slate-300 pt-12 pb-8 px-4 sm:px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/10">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <Leaf size={18} />
              </div>
              <EditableText
                id="bazar_footer_brand"
                defaultText={title}
                className="text-base font-black text-white"
              />
            </div>
            <EditableText
              id="store_footer_sub"
              as="p"
              defaultText={subtitle}
              className="text-xs text-slate-400 leading-relaxed block"
            />
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold pt-1">
              <ShieldCheck size={15} />
              <span>DBID Verified &amp; BSTI Certified Organic Store</span>
            </div>
          </div>

          {/* Col 2: Top Categories */}
          <div className="space-y-2.5 text-xs">
            <div className="font-extrabold text-white uppercase tracking-wider">
              Popular Categories
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => openCategoryPage('honey')}
                  className="hover:text-white cursor-pointer"
                >
                  Sundarban &amp; Natural Honey (মধু)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openCategoryPage('ghee')}
                  className="hover:text-white cursor-pointer"
                >
                  Pabna Deshi Gawa Ghee (গাওয়া ঘি)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openCategoryPage('oil')}
                  className="hover:text-white cursor-pointer"
                >
                  Wood-Pressed Mustard Oil (সরিষার তেল)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openCategoryPage('dates')}
                  className="hover:text-white cursor-pointer"
                >
                  Ajwa &amp; Medjool Dates (খেজুর)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Pages */}
          <div className="space-y-2.5 text-xs">
            <div className="font-extrabold text-white uppercase tracking-wider">
              Customer Service
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('offer_zone')}
                  className="hover:text-white cursor-pointer"
                >
                  OFFER ZONE (অফার জোন)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('track_order')}
                  className="hover:text-white cursor-pointer"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('cart')}
                  className="hover:text-white cursor-pointer"
                >
                  View Shopping Bag
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePage('about_contact')}
                  className="hover:text-white cursor-pointer"
                >
                  Return &amp; Refund Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-2.5 text-xs">
            <div className="font-extrabold text-white uppercase tracking-wider">
              Contact &amp; Helpline
            </div>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-center gap-2">
                <PhoneCall size={14} style={{ color: primaryColor }} />
                <EditableText
                  id="store_footer_phone"
                  defaultText="Hotline: 09642-922922 / +8801321208940"
                />
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} style={{ color: primaryColor }} />
                <EditableText
                  id="bazar_footer_email"
                  defaultText="support@bazar.com"
                />
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} style={{ color: primaryColor }} />
                <EditableText
                  id="store_footer_addr"
                  defaultText="Banasree, Rampura, Dhaka-1219"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <EditableText
            id="bazar_footer_copy"
            defaultText="© 2026 Bazar (বাজার). All Rights Reserved."
          />
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-white/10 text-white font-bold">
              Cash on Delivery
            </span>
            <span className="px-2.5 py-1 rounded bg-pink-600 text-white font-bold">
              bKash
            </span>
            <span className="px-2.5 py-1 rounded bg-orange-600 text-white font-bold">
              Nagad
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StoreFooter;
