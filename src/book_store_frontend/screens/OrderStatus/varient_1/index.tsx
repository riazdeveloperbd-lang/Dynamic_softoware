import React, { useState } from 'react';
import { Star, Sparkles } from 'lucide-react';
import {
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface OrderStatusVarient1Props {
  variant?: BookStoreVariantId;
  onBackToHome: () => void;
  onGoToOrderHistory: () => void;
}

export const OrderStatusVarient1: React.FC<OrderStatusVarient1Props> = ({
  variant = 'varient_1',
  onBackToHome,
  onGoToOrderHistory,
}) => {
  const { palette, activeFont, cartItems } = useBookStoreDesignSystem();
  const scopeStyle = getBookStoreThemeScopeStyle(palette, activeFont);
  const cardStyle = getBookStoreVariantCardStyle(variant, palette);

  const [viewMode, setViewMode] = useState<'waiting' | 'details' | 'received'>('waiting');
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState('');

  const itemsTotal =
    cartItems.length > 0
      ? cartItems.reduce((sum, i) => sum + i.book.price * i.quantity, 0)
      : 87.1;
  const shipping = 2;
  const totalPayment = itemsTotal + shipping;

  return (
    <div
      style={{
        ...scopeStyle,
        backgroundColor: palette.background,
        color: palette.textPrimary,
        fontFamily: activeFont.fontFamily,
      }}
      className="min-h-full flex flex-col px-6 pt-4 pb-8"
    >
      {/* Top Mode Switcher Pills for testing 7 / 7.1 / 7.3 */}
      <div className="flex items-center justify-center gap-1.5 mb-4">
        {[
          { id: 'waiting', label: 'Waiting Shipper' },
          { id: 'details', label: 'Order Details' },
          { id: 'received', label: 'Received & Rate' },
        ].map((tab) => {
          const active = viewMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id as any)}
              className="px-3 py-1 rounded-full text-[11px] font-bold transition-all"
              style={{
                backgroundColor: active ? palette.primary : palette.surface,
                color: active ? palette.primaryText : palette.textSecondary,
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {viewMode === 'waiting' && (
        /* 7 Order Status - Order Success Waiting Shipper.png */
        <div className="flex-1 flex flex-col justify-between">
          <div
            className="p-6 rounded-2xl text-center space-y-1.5 mt-2"
            style={{ backgroundColor: palette.primarySoft }}
          >
            <p className="text-[13px]" style={{ color: palette.textSecondary }}>
              Thank you for your order! 👋
            </p>
            <h2
              className="text-[20px] font-bold"
              style={{ color: palette.primary, fontFamily: activeFont.headingFont }}
            >
              Order #2930541
            </h2>
          </div>

          <div className="text-center space-y-2 my-6">
            <p className="text-[13px]" style={{ color: palette.textSecondary }}>
              Do you want to cancel your order?{' '}
              <button
                onClick={onBackToHome}
                className="font-bold underline"
                style={{ color: palette.primary }}
              >
                Cancel
              </button>
            </p>
          </div>

          {/* Order Details Box */}
          <div
            className="p-4 rounded-2xl border space-y-2.5 text-[13px]"
            style={{ borderColor: palette.border }}
          >
            <h3 className="text-[15px] font-bold mb-1">Order Details</h3>
            <div className="flex items-center justify-between font-semibold">
              <span>Price</span>
              <span>${itemsTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-[12px]" style={{ color: palette.textSecondary }}>
              <span>1x Carrie Fisher</span>
              <span>$19.99</span>
            </div>
            <div className="flex items-center justify-between text-[12px]" style={{ color: palette.textSecondary }}>
              <span>1x The Da vinci Code</span>
              <span>$39.99</span>
            </div>
            <div className="flex items-center justify-between text-[12px]" style={{ color: palette.textSecondary }}>
              <span>1x Arcu ipsum feugiat leo</span>
              <span>$27.12</span>
            </div>
            <div
              className="pt-2 border-t flex items-center justify-between font-semibold"
              style={{ borderColor: palette.border }}
            >
              <span>Shipping</span>
              <span>${shipping}</span>
            </div>
            <div
              className="pt-2 border-t flex items-center justify-between text-[14px] font-bold"
              style={{ borderColor: palette.border }}
            >
              <span>Total Payment</span>
              <span style={{ color: palette.primary }}>${totalPayment.toFixed(2)}</span>
            </div>
            <div className="text-[12px] pt-1" style={{ color: palette.textSecondary }}>
              Delivery in <span className="font-semibold">10 – 15 mins</span>
              <br />
              Time: <span className="font-semibold">15:24 – 15:39</span>
            </div>
          </div>

          <button
            onClick={() => setViewMode('received')}
            className="w-full py-3.5 rounded-full text-[14px] font-bold mt-6"
            style={{ backgroundColor: palette.primarySoft, color: palette.primary }}
          >
            Order Status
          </button>
        </div>
      )}

      {viewMode === 'details' && (
        /* 7. Order Status.png */
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div
              className="p-5 rounded-2xl text-center"
              style={{ backgroundColor: palette.primarySoft }}
            >
              <p className="text-[13px]" style={{ color: palette.textSecondary }}>
                Bazar Book Courier Dispatched 🚚
              </p>
              <h2 className="text-[19px] font-bold mt-1" style={{ color: palette.primary }}>
                Order #2930541 · On the way
              </h2>
            </div>

            <div
              className="p-4 rounded-2xl border space-y-3 text-[13px]"
              style={{ borderColor: palette.border }}
            >
              <h3 className="text-[15px] font-bold">Live Shipment Summary</h3>
              <div className="flex items-center justify-between">
                <span style={{ color: palette.textSecondary }}>Courier Partner</span>
                <span className="font-bold">Bazar Express NY</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: palette.textSecondary }}>Estimated Arrival</span>
                <span className="font-bold">10 – 15 mins</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: palette.textSecondary }}>Total Paid</span>
                <span className="font-bold" style={{ color: palette.primary }}>
                  ${totalPayment.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 mt-6">
            <button
              onClick={onGoToOrderHistory}
              className="w-full py-3.5 rounded-full text-[14px] font-bold"
              style={{ backgroundColor: palette.primary, color: palette.primaryText }}
            >
              View Order History
            </button>
            <button
              onClick={onBackToHome}
              className="w-full py-3.5 rounded-full text-[14px] font-bold"
              style={{ backgroundColor: palette.primarySoft, color: palette.primary }}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      {viewMode === 'received' && (
        /* 7.3 Order Status - Order Received & Rating.png */
        <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
          <div
            className="w-28 h-28 rounded-3xl flex items-center justify-center mb-6 relative"
            style={{ backgroundColor: palette.primarySoft }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
              style={{ backgroundColor: palette.primary, color: '#FFFFFF' }}
            >
              <Sparkles className="w-8 h-8" />
            </div>
          </div>

          <h2
            className="text-[22px] font-bold tracking-tight"
            style={{ fontFamily: activeFont.headingFont }}
          >
            You Received The Order!
          </h2>
          <p className="text-[13px] mt-1 mb-6" style={{ color: palette.textSecondary }}>
            Order #2930541
          </p>

          {/* Feedback Card */}
          <div
            className="w-full p-5 rounded-2xl mb-6 space-y-3"
            style={{ backgroundColor: palette.primarySoft }}
          >
            <h3 className="text-[16px] font-bold" style={{ color: palette.primary }}>
              Tell us your feedback 🙌
            </h3>
            <p className="text-[12px]" style={{ color: palette.textSecondary }}>
              Lorem ipsum dolor sit amet consectetur. Dignissim magna vitae.
            </p>
            <div className="flex items-center justify-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)}>
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-neutral-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <input
              type="text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write something for us!"
              className="w-full px-3.5 py-2.5 rounded-xl text-[12px] outline-none border"
              style={{
                backgroundColor: palette.background,
                borderColor: palette.border,
                color: palette.textPrimary,
              }}
            />
          </div>

          <button
            onClick={onBackToHome}
            className="w-full py-3.5 rounded-full text-[15px] font-bold"
            style={{ backgroundColor: palette.primary, color: palette.primaryText }}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderStatusVarient1;
