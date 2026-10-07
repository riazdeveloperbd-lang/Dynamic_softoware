import React, { useState } from 'react';
import {
  User,
  MapPin,
  Percent,
  Heart,
  FileText,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';
import {
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface ProfileVarient1Props {
  variant?: BookStoreVariantId;
  onGoToMyAccount: () => void;
  onGoToAddress: () => void;
  onGoToOffers: () => void;
  onGoToFavorites: () => void;
  onGoToOrderHistory: () => void;
  onGoToHelpCenter: () => void;
  onLogout: () => void;
}

export const ProfileVarient1: React.FC<ProfileVarient1Props> = ({
  variant = 'varient_1',
  onGoToMyAccount,
  onGoToAddress,
  onGoToOffers,
  onGoToFavorites,
  onGoToOrderHistory,
  onGoToHelpCenter,
  onLogout,
}) => {
  const { palette, activeFont, userProfile } = useBookStoreDesignSystem();
  const scopeStyle = getBookStoreThemeScopeStyle(palette, activeFont);
  const cardStyle = getBookStoreVariantCardStyle(variant, palette);

  const [logoutSheetOpen, setLogoutSheetOpen] = useState(false);

  const menuRows = [
    { id: 'account', label: 'My Account', icon: User, action: onGoToMyAccount },
    { id: 'address', label: 'Address', icon: MapPin, action: onGoToAddress },
    { id: 'offers', label: 'Offers & Promos', icon: Percent, action: onGoToOffers },
    { id: 'favorites', label: 'Your Favorites', icon: Heart, action: onGoToFavorites },
    { id: 'history', label: 'Order History', icon: FileText, action: onGoToOrderHistory },
    { id: 'help', label: 'Help Center', icon: MessageCircle, action: onGoToHelpCenter },
  ];

  return (
    <div
      style={{
        ...scopeStyle,
        backgroundColor: palette.background,
        color: palette.textPrimary,
        fontFamily: activeFont.fontFamily,
      }}
      className="min-h-full flex flex-col px-6 pt-3 pb-8 relative"
    >
      {/* Top Title (9. Profile.png) */}
      <div className="py-2.5 text-center mb-2">
        <h1 className="text-[18px] font-bold tracking-tight" style={{ fontFamily: activeFont.headingFont }}>
          Profile
        </h1>
      </div>

      {/* User Header Row */}
      <div
        className="py-4 border-y flex items-center justify-between mb-4"
        style={{ borderColor: palette.border }}
      >
        <div className="flex items-center gap-3.5">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h2 className="text-[16px] font-bold">{userProfile.name}</h2>
            <p className="text-[13px] mt-0.5" style={{ color: palette.textSecondary }}>
              {userProfile.phone}
            </p>
          </div>
        </div>
        <button
          onClick={() => setLogoutSheetOpen(true)}
          className="text-[14px] font-bold text-red-500"
        >
          Logout
        </button>
      </div>

      {/* Menu List / Grid (Variant-aware) */}
      <div
        className={
          variant === 'varient_2' || variant === 'varient_6'
            ? 'grid grid-cols-2 gap-3 flex-1 content-start'
            : 'space-y-2 flex-1'
        }
      >
        {menuRows.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`w-full py-3 flex items-center justify-between rounded-xl transition-opacity hover:opacity-80 ${
                variant === 'varient_1' ? '' : 'px-3'
              }`}
              style={variant === 'varient_1' ? undefined : cardStyle}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: palette.primarySoft, color: palette.primary }}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="text-[15px] font-bold">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: palette.textMuted }} />
            </button>
          );
        })}
      </div>

      {/* 9.6 Logout.png Bottom Sheet Confirmation */}
      {logoutSheetOpen && (
        <div
          onClick={() => setLogoutSheetOpen(false)}
          className="fixed inset-0 z-40 bg-black/45 flex items-end justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full rounded-t-3xl p-6 space-y-4 animate-in slide-in-from-bottom duration-200"
            style={{ backgroundColor: palette.cardBackground, color: palette.textPrimary }}
          >
            <div className="w-12 h-1.5 rounded-full mx-auto opacity-30 bg-current" />
            <h3 className="text-[18px] font-bold">Logout</h3>
            <p className="text-[14px] leading-relaxed" style={{ color: palette.textSecondary }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  setLogoutSheetOpen(false);
                  onLogout();
                }}
                className="w-full py-3.5 rounded-full text-[15px] font-bold"
                style={{ backgroundColor: palette.primary, color: palette.primaryText }}
              >
                Logout
              </button>
              <button
                onClick={() => setLogoutSheetOpen(false)}
                className="w-full py-3.5 rounded-full text-[15px] font-bold"
                style={{ backgroundColor: palette.primarySoft, color: palette.primary }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileVarient1;
