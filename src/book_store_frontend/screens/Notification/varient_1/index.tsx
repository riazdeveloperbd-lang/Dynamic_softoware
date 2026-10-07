import React, { useState } from 'react';
import { ArrowLeft, Bell, ChevronRight } from 'lucide-react';
import {
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface NotificationVarient1Props {
  variant?: BookStoreVariantId;
  onBack: () => void;
  onOpenPromoDetail: () => void;
}

export const NotificationVarient1: React.FC<NotificationVarient1Props> = ({
  variant = 'varient_1',
  onBack,
  onOpenPromoDetail,
}) => {
  const { palette, activeFont, orders } = useBookStoreDesignSystem();
  const scopeStyle = getBookStoreThemeScopeStyle(palette, activeFont);
  const cardStyle = getBookStoreVariantCardStyle(variant, palette);

  const [activeTab, setActiveTab] = useState<'delivery' | 'news' | 'empty'>('delivery');

  const currentOrders = orders.filter((o) => o.monthGroup === 'Current');
  const pastOrders = orders.filter((o) => o.monthGroup !== 'Current');

  const getStatusColor = (status: string) => {
    if (status === 'On the way') return '#3B82F6';
    if (status === 'Delivered') return '#10B981';
    return '#EF4444';
  };

  return (
    <div
      style={{
        ...scopeStyle,
        backgroundColor: palette.background,
        color: palette.textPrimary,
        fontFamily: activeFont.fontFamily,
      }}
      className="min-h-full flex flex-col px-6 pt-3 pb-8"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between py-2.5 mb-2">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center -ml-1.5"
          style={{ color: palette.textPrimary }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-[18px] font-bold tracking-tight" style={{ fontFamily: activeFont.headingFont }}>
          Notification
        </h1>
        <button
          onClick={() => setActiveTab(activeTab === 'empty' ? 'delivery' : 'empty')}
          className="text-[11px] font-semibold underline opacity-70"
          style={{ color: palette.textSecondary }}
        >
          {activeTab === 'empty' ? 'Restore' : 'Empty'}
        </button>
      </div>

      {/* Delivery | News & Promo Segment Tabs (8. Notification - Delivery.png & 8.1 News & Promo.png) */}
      {activeTab !== 'empty' && (
        <div
          className="grid grid-cols-2 p-1 rounded-xl mb-5"
          style={{ backgroundColor: palette.surface }}
        >
          <button
            onClick={() => setActiveTab('delivery')}
            className="py-2 rounded-lg text-[13px] font-bold transition-all"
            style={{
              backgroundColor: activeTab === 'delivery' ? palette.cardBackground : 'transparent',
              color: activeTab === 'delivery' ? palette.textPrimary : palette.textSecondary,
            }}
          >
            Delivery
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className="py-2 rounded-lg text-[13px] font-bold transition-all"
            style={{
              backgroundColor: activeTab === 'news' ? palette.cardBackground : 'transparent',
              color: activeTab === 'news' ? palette.textPrimary : palette.textSecondary,
            }}
          >
            News & Promo
          </button>
        </div>
      )}

      {activeTab === 'empty' && (
        /* Notifications Empty.png */
        <div className="flex-1 flex flex-col items-center justify-center text-center py-14">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center mb-5"
            style={{ backgroundColor: palette.surface }}
          >
            <Bell className="w-14 h-14 stroke-[1.5]" style={{ color: palette.textMuted }} />
          </div>
          <p className="text-[15px] font-bold mb-4">There is no notifications</p>
          <button
            onClick={() => setActiveTab('delivery')}
            className="px-5 py-2.5 rounded-full text-[13px] font-bold"
            style={{ backgroundColor: palette.primary, color: palette.primaryText }}
          >
            Load Notifications
          </button>
        </div>
      )}

      {activeTab === 'delivery' && (
        /* 8. Notification - Delivery.png */
        <div className="space-y-5">
          <div>
            <h3 className="text-[15px] font-bold mb-2.5">Current</h3>
            <div
              className="rounded-2xl border divide-y"
              style={{ borderColor: palette.border }}
            >
              {currentOrders.map((ord) => (
                <div key={ord.id} className="p-3.5 flex items-center gap-3.5">
                  <img
                    src={ord.coverImage}
                    alt={ord.title}
                    className="w-12 h-14 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold truncate">{ord.title}</h4>
                    <div className="flex items-center gap-2 text-[12px] mt-1">
                      <span className="font-semibold" style={{ color: getStatusColor(ord.status) }}>
                        {ord.status}
                      </span>
                      <span style={{ color: palette.textMuted }}>•</span>
                      <span style={{ color: palette.textSecondary }}>{ord.itemsCount} items</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[15px] font-bold mb-2.5">October 2021</h3>
            <div
              className="rounded-2xl border divide-y"
              style={{ borderColor: palette.border }}
            >
              {pastOrders.map((ord) => (
                <div key={ord.id} className="p-3.5 flex items-center gap-3.5">
                  <img
                    src={ord.coverImage}
                    alt={ord.title}
                    className="w-12 h-14 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold truncate">{ord.title}</h4>
                    <div className="flex items-center gap-2 text-[12px] mt-1">
                      <span className="font-semibold" style={{ color: getStatusColor(ord.status) }}>
                        {ord.status}
                      </span>
                      <span style={{ color: palette.textMuted }}>•</span>
                      <span style={{ color: palette.textSecondary }}>{ord.itemsCount} items</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'news' && (
        /* 8.1 Notification - News & Promo.png */
        <div className="space-y-5">
          <div>
            <h3 className="text-[15px] font-bold mb-2.5">Current</h3>
            <button
              onClick={onOpenPromoDetail}
              className="w-full text-left p-4 rounded-2xl border space-y-2 transition-all hover:opacity-90"
              style={{ borderColor: palette.border }}
            >
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span style={{ color: palette.primary }}>Promotion</span>
                <span style={{ color: palette.textSecondary }}>Oct 21 • 08.00</span>
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-[14px] font-bold">Today 50% discount on all Books</h4>
                <ChevronRight className="w-4 h-4 opacity-60 flex-shrink-0" />
              </div>
              <p className="text-[12px] leading-relaxed" style={{ color: palette.textSecondary }}>
                Excuse me... Who could ever resist a discount feast? 👀 Hear me out. Today, October 21, 2021, Bazar has a 50% discount for any book...
              </p>
            </button>
          </div>

          <div>
            <h3 className="text-[15px] font-bold mb-2.5">October 2021</h3>
            <div
              className="rounded-2xl border divide-y"
              style={{ borderColor: palette.border }}
            >
              <button
                onClick={onOpenPromoDetail}
                className="w-full text-left p-4 space-y-2"
              >
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span style={{ color: palette.primary }}>Promotion</span>
                  <span style={{ color: palette.textSecondary }}>Oct 16 • 11.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-[14px] font-bold">Buy 2 get 1 free for since books</h4>
                  <ChevronRight className="w-4 h-4 opacity-60 flex-shrink-0" />
                </div>
                <p className="text-[12px] leading-relaxed" style={{ color: palette.textSecondary }}>
                  Excuse me... Who could ever resist a discount feast? 👀 Hear me out. Today, October 16, 2021, Bazar has a 50% discount for any book. What are you waiting for, let's order now before it runs out.
                </p>
              </button>

              <div className="p-4 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-sky-500">Information</span>
                  <span style={{ color: palette.textSecondary }}>Sept 06 • 14.30</span>
                </div>
                <h4 className="text-[14px] font-bold">There is a new book now are available</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationVarient1;
