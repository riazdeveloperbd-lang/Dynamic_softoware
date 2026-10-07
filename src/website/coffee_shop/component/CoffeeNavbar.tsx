import React, { useState } from 'react';
import {
  Leaf,
  Search,
  ShoppingBag,
  Menu,
  X,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import { useCoffeeShop } from './CoffeeShopContext';

export interface CoffeeNavbarProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const CoffeeNavbar: React.FC<CoffeeNavbarProps> = ({
  title = 'Velvet Bean Roasters',
  variant = 'varient_1',
  primaryColor = '#C86D51',
  isDark = false,
}) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    updateQuantity,
    removeItem,
    clearCart,
    cartCount,
    cartSubtotal,
  } = useCoffeeShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [orderPlacedReceipt, setOrderPlacedReceipt] = useState<string | null>(
    null
  );

  const navLinks = [
    { label: 'Menu', href: '#coffee-menu' },
    { label: 'Subscriptions', href: '#coffee-subscriptions' },
    { label: 'Locations', href: '#coffee-locations' },
    { label: 'Wholesale', href: '#coffee-wholesale' },
    { label: 'Our Story', href: '#coffee-story' },
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    if (typeof document !== 'undefined') {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const freeShippingThreshold = 40;
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - cartSubtotal
  );

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-colors border-b backdrop-blur-md ${
          isDark
            ? 'bg-[#1B1212]/90 border-[#3D2314] text-[#FAF8F5]'
            : 'bg-[#FAF8F5]/90 border-[#3D2314]/10 text-[#1B1212]'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6 ${
            variant === 'varient_2'
              ? 'my-1.5 rounded-2xl border border-[#3D2314]/15 dark:border-white/10'
              : ''
          }`}
        >
          {/* Zone 1: Brand Logo ("Velvet Bean Roasters" + minimalist coffee leaf icon) */}
          <a
            href="#coffee-hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#coffee-hero');
            }}
            className="text-lg sm:text-xl font-semibold tracking-tight whitespace-nowrap shrink-0 flex items-center gap-2.5"
            style={{ fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif" }}
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#FAF8F5]"
              style={{ backgroundColor: primaryColor }}
            >
              <Leaf size={15} />
            </span>
            <EditableText id="coffee_nav_brand" defaultText={title} />
          </a>

          {/* Zone 2: 5 Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`whitespace-nowrap shrink-0 transition-colors hover:underline underline-offset-8 ${
                  isDark
                    ? 'text-[#F7F3E9]/80 hover:text-[#FAF8F5]'
                    : 'text-[#3D2314]/80 hover:text-[#1B1212]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Utilities (Search, Cart Drawer Button with Counter, "Order Online" CTA) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                isDark
                  ? 'border-[#3D2314] hover:bg-[#3D2314]/50 text-[#F7F3E9]'
                  : 'border-[#3D2314]/15 hover:bg-[#F7F3E9] text-[#1B1212]'
              }`}
              aria-label="Search coffee beans and cafe menu"
            >
              <Search size={16} />
            </button>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className={`relative px-3 py-2 rounded-xl border inline-flex items-center gap-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isDark
                  ? 'border-[#3D2314] bg-[#261816] text-[#FAF8F5] hover:bg-[#3D2314]'
                  : 'border-[#3D2314]/15 bg-[#F7F3E9] text-[#1B1212] hover:bg-[#EFE8D8]'
              }`}
              aria-label="Open Roastery Cart Drawer"
            >
              <ShoppingBag size={15} style={{ color: primaryColor }} />
              <span className="font-mono tabular-nums">{cartCount}</span>
            </button>

            <EditableButton
              id="coffee_nav_order_cta"
              defaultText="Order Online"
              defaultLinkUrl="#coffee-menu"
              onClick={() => scrollToSection('#coffee-menu')}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#FAF8F5] whitespace-nowrap shrink-0 transition-opacity hover:opacity-95 cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            />

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2 rounded-xl border border-[#3D2314]/20 dark:border-white/15 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div
            className={`border-t px-6 py-3 ${
              isDark
                ? 'bg-[#1B1212] border-[#3D2314]'
                : 'bg-[#F7F3E9] border-[#3D2314]/10'
            }`}
          >
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search size={16} style={{ color: primaryColor }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  scrollToSection('#coffee-menu');
                }}
                placeholder="Search Cardamom Oat Latte, Ethiopian Yirgacheffe, Cold Brew, Croissant..."
                className="w-full bg-transparent text-xs sm:text-sm focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-semibold opacity-70 hover:opacity-100 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu Links */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden px-6 pb-5 pt-2 border-t space-y-2 ${
              isDark
                ? 'bg-[#1B1212] border-[#3D2314] text-[#FAF8F5]'
                : 'bg-[#FAF8F5] border-[#3D2314]/10 text-[#1B1212]'
            }`}
          >
            {navLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-2 text-sm font-medium hover:opacity-80 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Slide-Over Cart & Subscription Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-[1px]"
          />
          <div
            className={`relative z-10 w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l ${
              isDark
                ? 'bg-[#1B1212] border-[#3D2314] text-[#FAF8F5]'
                : 'bg-[#FAF8F5] border-[#3D2314]/15 text-[#1B1212]'
            }`}
          >
            {/* Drawer Header + Free Shipping Progress */}
            <div className="p-6 border-b border-[#3D2314]/15 dark:border-[#3D2314] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={18} style={{ color: primaryColor }} />
                  <h3
                    className="text-lg font-semibold"
                    style={{
                      fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                    }}
                  >
                    Your Roastery Bag ({cartCount})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-lg border border-[#3D2314]/15 dark:border-white/15 cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Free Shipping on Orders $40+ Meter */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-medium">
                  <span>
                    {remainingForFreeShipping === 0
                      ? '✓ Unlocked Free Roastery Express Shipping ($40+)'
                      : `Add $${remainingForFreeShipping.toFixed(2)} more for Free Shipping ($40+)`}
                  </span>
                  <span className="font-mono tabular-nums">
                    ${cartSubtotal.toFixed(2)} / $40.00
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#3D2314]/10 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (cartSubtotal / 40) * 100)}%`,
                      backgroundColor: primaryColor,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {orderPlacedReceipt ? (
                <div className="p-6 rounded-2xl border border-[#C86D51]/40 bg-[#F7F3E9] dark:bg-[#261816] text-center space-y-3">
                  <CheckCircle2
                    size={28}
                    className="mx-auto"
                    style={{ color: primaryColor }}
                  />
                  <div className="text-base font-semibold">
                    {orderPlacedReceipt}
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed">
                    Our roasters are preparing your small-batch beans and cafe order. You’ll receive SMS tracking shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setOrderPlacedReceipt(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="py-16 text-center space-y-3 opacity-75">
                  <ShoppingBag size={32} className="mx-auto opacity-50" />
                  <div className="text-sm font-semibold">
                    Your Velvet Bean bag is empty
                  </div>
                  <p className="text-xs max-w-xs mx-auto">
                    Customize a fresh micro-lot subscription or add a seasonal Cardamom Oat Latte from the cafe menu.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.id}_${item.subtitle}`}
                    className={`p-4 rounded-2xl border flex items-start justify-between gap-3 ${
                      isDark
                        ? 'bg-[#261816] border-[#3D2314]'
                        : 'bg-[#F7F3E9] border-[#3D2314]/10'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="text-sm font-semibold truncate">
                        {item.name}
                      </div>
                      <div className="text-xs opacity-75">{item.subtitle}</div>
                      <div
                        className="text-xs font-mono font-semibold tabular-nums pt-1"
                        style={{ color: primaryColor }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-lg border border-[#3D2314]/20 dark:border-white/15 flex items-center justify-center cursor-pointer"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-lg border border-[#3D2314]/20 dark:border-white/15 flex items-center justify-center cursor-pointer"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-rose-500 hover:opacity-80 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-[#3D2314]/15 dark:border-[#3D2314] space-y-4">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Subtotal</span>
                <span className="text-lg font-mono tabular-nums">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                disabled={cart.length === 0}
                onClick={() => {
                  const orderNum = Math.floor(1000 + Math.random() * 9000);
                  setOrderPlacedReceipt(
                    `Order #VB-${orderNum} Confirmed ($${cartSubtotal.toFixed(2)})`
                  );
                  clearCart();
                }}
                className="w-full py-3.5 px-5 rounded-xl text-sm font-semibold text-[#FAF8F5] disabled:opacity-50 inline-flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              >
                <span>Complete Roastery Order</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
