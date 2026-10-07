import React from 'react';
import { Bell, ShoppingCart, Minus, Plus, RotateCcw } from 'lucide-react';
import {
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface CartVarient1Props {
  variant?: BookStoreVariantId;
  onGoToConfirmOrder: () => void;
  onGoToNotifications: () => void;
  onGoToCategory: () => void;
}

export const CartVarient1: React.FC<CartVarient1Props> = ({
  variant = 'varient_1',
  onGoToConfirmOrder,
  onGoToNotifications,
  onGoToCategory,
}) => {
  const { palette, activeFont, cartItems, updateCartQty, clearCart, restoreDemoCart } =
    useBookStoreDesignSystem();
  const scopeStyle = getBookStoreThemeScopeStyle(palette, activeFont);
  const cardStyle = getBookStoreVariantCardStyle(variant, palette);

  const subtotal = cartItems.reduce((sum, entry) => sum + entry.book.price * entry.quantity, 0);
  const shipping = cartItems.length > 0 ? 2 : 0;
  const total = subtotal + shipping;

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
        <div className="w-8">
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              title="Empty Cart State Preview"
              className="text-[11px] font-semibold underline opacity-60 hover:opacity-100"
              style={{ color: palette.textSecondary }}
            >
              Empty
            </button>
          )}
        </div>
        <h1 className="text-[18px] font-bold tracking-tight" style={{ fontFamily: activeFont.headingFont }}>
          My Cart
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

      {cartItems.length === 0 ? (
        /* Empty Cart State (matches Cart Empty.png) */
        <div className="flex-1 flex flex-col items-center justify-center text-center py-14">
          <div className="relative w-36 h-36 flex items-center justify-center mb-5">
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center"
              style={{ backgroundColor: palette.surface }}
            >
              <ShoppingCart className="w-16 h-16 stroke-[1.5]" style={{ color: palette.textMuted }} />
            </div>
            <span
              className="w-3.5 h-3.5 rounded-full absolute top-4 left-4"
              style={{ backgroundColor: palette.border }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full absolute bottom-6 right-3"
              style={{ backgroundColor: palette.border }}
            />
          </div>
          <p className="text-[15px] font-semibold mb-6" style={{ color: palette.textPrimary }}>
            There is no products
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={restoreDemoCart}
              className="px-5 py-2.5 rounded-full text-[13px] font-bold flex items-center gap-1.5"
              style={{ backgroundColor: palette.primary, color: palette.primaryText }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restore Demo Books
            </button>
            <button
              onClick={onGoToCategory}
              className="px-5 py-2.5 rounded-full text-[13px] font-bold border"
              style={{ borderColor: palette.border, color: palette.textPrimary }}
            >
              Browse Books
            </button>
          </div>
        </div>
      ) : (
        /* Active Cart List + Order Summary */
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-4 mt-2">
            {cartItems.map((entry) => (
              <div
                key={entry.book.id}
                className="flex items-center gap-3.5 p-3 rounded-2xl border"
                style={cardStyle}
              >
                <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={entry.book.coverImage}
                    alt={entry.book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-bold truncate" style={{ color: palette.textPrimary }}>
                    {entry.book.title}
                  </h3>
                  <p className="text-[12px] mt-0.5 truncate" style={{ color: palette.textSecondary }}>
                    {entry.book.author}
                  </p>
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-[14px] font-bold" style={{ color: palette.primary }}>
                      ${(entry.book.price * entry.quantity).toFixed(2)}
                    </span>
                    <div
                      className="flex items-center gap-2.5 px-2 py-1 rounded-lg"
                      style={{ backgroundColor: palette.surface }}
                    >
                      <button
                        onClick={() => updateCartQty(entry.book.id, -1)}
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: palette.border, color: palette.textPrimary }}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-[12px] font-bold w-4 text-center">
                        {entry.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQty(entry.book.id, 1)}
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: palette.primary, color: palette.primaryText }}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Summary Block */}
            <div
              className="p-4 rounded-2xl border space-y-2.5 mt-4"
              style={{
                backgroundColor: palette.surface,
                borderColor: palette.border,
              }}
            >
              <div className="flex items-center justify-between text-[13px]">
                <span style={{ color: palette.textSecondary }}>Price</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span style={{ color: palette.textSecondary }}>Shipping</span>
                <span className="font-semibold">${shipping.toFixed(2)}</span>
              </div>
              <div
                className="pt-2.5 border-t flex items-center justify-between text-[15px] font-bold"
                style={{ borderColor: palette.border }}
              >
                <span>Total Payment</span>
                <span style={{ color: palette.primary }}>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onGoToConfirmOrder}
            className="w-full py-3.5 rounded-full text-[15px] font-bold mt-6 transition-transform active:scale-[0.99]"
            style={{
              backgroundColor: palette.primary,
              color: palette.primaryText,
            }}
          >
            Pay Now (${total.toFixed(2)})
          </button>
        </div>
      )}
    </div>
  );
};

export default CartVarient1;
