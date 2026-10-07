import React from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface OrderHistoryVarient1Props {
  variant?: BookStoreVariantId;
  onBack: () => void;
}

export const OrderHistoryVarient1: React.FC<OrderHistoryVarient1Props> = ({
  variant = 'varient_1',
  onBack,
}) => {
  const { palette, activeFont, orders } = useBookStoreDesignSystem();
  const scopeStyle = getBookStoreThemeScopeStyle(palette, activeFont);
  const cardStyle = getBookStoreVariantCardStyle(variant, palette);

  const getStatusColor = (status: string) => {
    if (status === 'Delivered') return '#10B981';
    if (status === 'On the way') return '#3B82F6';
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
      {/* Top Bar (9.4 Order History.png) */}
      <div className="flex items-center justify-between py-2.5 mb-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center -ml-1.5"
          style={{ color: palette.textPrimary }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-[18px] font-bold tracking-tight" style={{ fontFamily: activeFont.headingFont }}>
          Order History
        </h1>
        <div className="w-9" />
      </div>

      <h3 className="text-[15px] font-bold mb-3">October 2021</h3>

      <div
        className="rounded-2xl border divide-y"
        style={{ borderColor: palette.border }}
      >
        {orders.map((ord) => (
          <div key={ord.id} className="p-4 flex items-center gap-3.5">
            <img
              src={ord.coverImage}
              alt={ord.title}
              className="w-14 h-16 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-[15px] font-bold truncate">{ord.title}</h4>
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
  );
};

export default OrderHistoryVarient1;
