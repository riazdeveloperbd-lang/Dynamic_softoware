import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  MapPin,
  Calendar,
  CreditCard,
  ChevronRight,
  Check,
  X,
} from 'lucide-react';
import {
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface ConfirmOrderVarient1Props {
  variant?: BookStoreVariantId;
  onBack: () => void;
  onGoToSetLocation: () => void;
  onOrderPlaced: () => void;
  onGoToNotifications: () => void;
}

export const ConfirmOrderVarient1: React.FC<ConfirmOrderVarient1Props> = ({
  variant = 'varient_1',
  onBack,
  onGoToSetLocation,
  onOrderPlaced,
  onGoToNotifications,
}) => {
  const {
    palette,
    activeFont,
    cartItems,
    deliveryAddress,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    selectedDeliveryDate,
    setSelectedDeliveryDate,
    selectedDeliveryTime,
    setSelectedDeliveryTime,
  } = useBookStoreDesignSystem();
  const scopeStyle = getBookStoreThemeScopeStyle(palette, activeFont);
  const cardStyle = getBookStoreVariantCardStyle(variant, palette);

  const [activeSheet, setActiveSheet] = useState<
    'none' | 'payment_details' | 'date_time' | 'payment_method'
  >('none');

  const itemsTotal =
    cartItems.length > 0
      ? cartItems.reduce((sum, i) => sum + i.book.price * i.quantity, 0)
      : 87.1;
  const shipping = 2;
  const totalPayment = itemsTotal + shipping;

  const dateOptions = ['Today\n12 Jan', 'Tomorrow\n13 Jan', 'Pick\na date'];
  const timeOptions = ['Between\n10PM : 11PM', 'Between\n11PM : 12PM'];

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
      {/* Top Header */}
      <div className="flex items-center justify-between py-2.5 mb-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center -ml-1.5"
          style={{ color: palette.textPrimary }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-[18px] font-bold tracking-tight" style={{ fontFamily: activeFont.headingFont }}>
          Confirm Order
        </h1>
        <button
          onClick={onGoToNotifications}
          className="w-9 h-9 rounded-full flex items-center justify-center relative"
          style={{ color: palette.textPrimary }}
        >
          <Bell className="w-5 h-5" />
          <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2 right-2" />
        </button>
      </div>

      <div className="space-y-4 flex-1">
        {/* Address Card (6.1 Cart - Confirm Order.png) */}
        <div
          className="p-4 rounded-2xl border"
          style={cardStyle}
        >
          <h3 className="text-[15px] font-bold mb-3">Address</h3>
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: palette.primarySoft, color: palette.primary }}
            >
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-[14px] font-bold truncate">{deliveryAddress.streetTitle}</h4>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </div>
              <p className="text-[12px] leading-relaxed mt-1" style={{ color: palette.textSecondary }}>
                {deliveryAddress.fullAddress}
              </p>
              <button
                onClick={onGoToSetLocation}
                className="mt-3 px-4 py-1.5 rounded-full text-[12px] font-bold"
                style={{ backgroundColor: palette.primarySoft, color: palette.primary }}
              >
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div
          className="p-4 rounded-2xl border space-y-2.5"
          style={cardStyle}
        >
          <h3 className="text-[15px] font-bold mb-1">Summary</h3>
          <div className="flex items-center justify-between text-[13px]">
            <span style={{ color: palette.textSecondary }}>Price</span>
            <span className="font-semibold">${itemsTotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span style={{ color: palette.textSecondary }}>Shipping</span>
            <span className="font-semibold">${shipping}</span>
          </div>
          <div
            className="pt-2.5 border-t flex items-center justify-between text-[14px] font-bold"
            style={{ borderColor: palette.border }}
          >
            <span>Total Payment</span>
            <span>${totalPayment.toFixed(2)}</span>
          </div>
          <button
            onClick={() => setActiveSheet('payment_details')}
            className="pt-1 flex items-center gap-1 text-[13px] font-bold"
            style={{ color: palette.primary }}
          >
            See details <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Date and Time Selector Card */}
        <button
          onClick={() => setActiveSheet('date_time')}
          className="w-full p-4 rounded-2xl border text-left flex items-center justify-between"
          style={{ borderColor: palette.border, backgroundColor: palette.cardBackground }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: palette.primarySoft, color: palette.primary }}
            >
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold">Date and time</h4>
              <p className="text-[12px] mt-0.5" style={{ color: palette.textSecondary }}>
                {selectedDeliveryDate.replace('\n', ' ')} · {selectedDeliveryTime.replace('\n', ' ')}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 opacity-50" />
        </button>

        {/* Payment Method Card */}
        <button
          onClick={() => setActiveSheet('payment_method')}
          className="w-full p-4 rounded-2xl border text-left flex items-center justify-between"
          style={{ borderColor: palette.border, backgroundColor: palette.cardBackground }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: palette.primarySoft, color: palette.primary }}
            >
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold">Payment</h4>
              <p className="text-[12px] mt-0.5" style={{ color: palette.textSecondary }}>
                {selectedPaymentMethod}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 opacity-50" />
        </button>
      </div>

      {/* Order CTA */}
      <button
        onClick={onOrderPlaced}
        className="w-full py-3.5 rounded-full text-[15px] font-bold mt-6 transition-transform active:scale-[0.99]"
        style={{ backgroundColor: palette.primary, color: palette.primaryText }}
      >
        Order
      </button>

      {/* Bottom Sheet Modals (6.2 See details, 6.3 Date & Time, 6.3 Payment Method) */}
      {activeSheet !== 'none' && (
        <div
          onClick={() => setActiveSheet('none')}
          className="fixed inset-0 z-40 bg-black/45 flex items-end justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full rounded-t-3xl p-6 space-y-4 animate-in slide-in-from-bottom duration-200 max-h-[85%] overflow-y-auto"
            style={{ backgroundColor: palette.cardBackground, color: palette.textPrimary }}
          >
            <div className="w-12 h-1.5 rounded-full mx-auto opacity-30 bg-current" />
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-bold">
                {activeSheet === 'payment_details'
                  ? 'Payment Details'
                  : activeSheet === 'date_time'
                  ? 'Delivery date'
                  : 'Your Payments'}
              </h3>
              <button
                onClick={() => setActiveSheet('none')}
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: palette.surface }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {activeSheet === 'payment_details' && (
              <div
                className="p-4 rounded-2xl border space-y-3 text-[13px]"
                style={{ borderColor: palette.border }}
              >
                <div className="flex items-center justify-between font-semibold">
                  <span>Price</span>
                  <span>${itemsTotal.toFixed(2)}</span>
                </div>
                {(cartItems.length > 0
                  ? cartItems
                  : [
                      { book: { id: '1', title: 'Squid Sweet and Sour Salad', price: 19.99 }, quantity: 1 },
                      { book: { id: '2', title: 'Japan Hainanese Sashimi', price: 39.99 }, quantity: 1 },
                      { book: { id: '3', title: 'Black pepper Beef Lumpia', price: 27.12 }, quantity: 1 },
                    ]
                ).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-[12px]"
                    style={{ color: palette.textSecondary }}
                  >
                    <span>
                      {item.quantity}x {item.book.title}
                    </span>
                    <span>${(item.book.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div
                  className="pt-2.5 border-t flex items-center justify-between font-semibold"
                  style={{ borderColor: palette.border }}
                >
                  <span>Shipping</span>
                  <span>${shipping}</span>
                </div>
                <div
                  className="pt-2.5 border-t flex items-center justify-between text-[14px] font-bold"
                  style={{ borderColor: palette.border }}
                >
                  <span>Total Payment</span>
                  <span>${totalPayment.toFixed(2)}</span>
                </div>
              </div>
            )}

            {activeSheet === 'date_time' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2.5">
                  {dateOptions.map((d) => {
                    const isSelected = selectedDeliveryDate === d.replace('\n', ' ');
                    return (
                      <button
                        key={d}
                        onClick={() => setSelectedDeliveryDate(d.replace('\n', ' '))}
                        className="py-3 px-2 rounded-xl border text-[13px] font-bold whitespace-pre-line text-center"
                        style={{
                          borderColor: isSelected ? palette.primary : palette.border,
                          backgroundColor: isSelected ? palette.primarySoft : 'transparent',
                          color: palette.textPrimary,
                        }}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
                <h4 className="text-[15px] font-bold pt-1">Delivery time</h4>
                <div className="grid grid-cols-2 gap-3">
                  {timeOptions.map((t) => {
                    const isSelected = selectedDeliveryTime === t.replace('\n', ' ');
                    return (
                      <button
                        key={t}
                        onClick={() => setSelectedDeliveryTime(t.replace('\n', ' '))}
                        className="py-3 px-3 rounded-xl border text-[13px] font-bold whitespace-pre-line text-center"
                        style={{
                          borderColor: isSelected ? palette.primary : palette.border,
                          backgroundColor: isSelected ? palette.primarySoft : 'transparent',
                          color: palette.textPrimary,
                        }}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setActiveSheet('none')}
                  className="w-full py-3.5 rounded-full text-[14px] font-bold mt-2"
                  style={{ backgroundColor: palette.primary, color: palette.primaryText }}
                >
                  Confirm
                </button>
              </div>
            )}

            {activeSheet === 'payment_method' && (
              <div className="space-y-3">
                {(['KNET', 'Credit Card'] as const).map((method) => {
                  const active = selectedPaymentMethod === method;
                  return (
                    <button
                      key={method}
                      onClick={() => {
                        setSelectedPaymentMethod(method);
                        setActiveSheet('none');
                      }}
                      className="w-full p-4 rounded-2xl border flex items-center justify-between"
                      style={{
                        borderColor: active ? palette.primary : palette.border,
                        backgroundColor: active ? palette.primarySoft : 'transparent',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-[11px] text-white"
                          style={{
                            backgroundColor: method === 'KNET' ? '#0284C7' : '#F59E0B',
                          }}
                        >
                          {method === 'KNET' ? 'KNET' : 'VISA'}
                        </div>
                        <span className="text-[15px] font-bold">{method}</span>
                      </div>
                      <div
                        className="w-6 h-6 rounded-full border flex items-center justify-center"
                        style={{
                          borderColor: active ? palette.primary : palette.border,
                          backgroundColor: active ? palette.primary : 'transparent',
                          color: '#FFFFFF',
                        }}
                      >
                        {active && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmOrderVarient1;
