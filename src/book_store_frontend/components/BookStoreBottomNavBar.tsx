import React, { useEffect, useRef, useState } from 'react';
import { Home, FileText, ShoppingCart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookStoreBottomNavVariantId,
  useBookStoreDesignSystem,
} from '../styles/bookStoreDesignSystem';

export type BookStoreRootTabId = 'Home' | 'Category' | 'Cart' | 'Profile';

export interface BookStoreBottomNavBarProps {
  activeTab: BookStoreRootTabId;
  onSelectTab: (tab: BookStoreRootTabId) => void;
  variant?: BookStoreBottomNavVariantId;
  variantOverride?: BookStoreBottomNavVariantId;
  cartBadgeCount?: number;
}

const NAV_ITEMS: {
  id: BookStoreRootTabId;
  label: string;
  icon: React.FC<{ size?: number; strokeWidth?: number; className?: string }>;
}[] = [
  { id: 'Home', label: 'Home', icon: Home },
  { id: 'Category', label: 'Category', icon: FileText },
  { id: 'Cart', label: 'Cart', icon: ShoppingCart },
  { id: 'Profile', label: 'Profile', icon: User },
];

export const BookStoreBottomNavBar: React.FC<BookStoreBottomNavBarProps> = ({
  activeTab,
  onSelectTab,
  variant: variantProp,
  variantOverride,
  cartBadgeCount,
}) => {
  const { palette, bottomNavVariant, cartItems, isDark } =
    useBookStoreDesignSystem();
  const variant = variantOverride || variantProp || bottomNavVariant;

  const totalCartCount =
    typeof cartBadgeCount === 'number'
      ? cartBadgeCount
      : cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Track cart additions to trigger a subtle pop-up delta indicator & icon bounce
  const prevCountRef = useRef<number>(totalCartCount);
  const [addedDelta, setAddedDelta] = useState<number | null>(null);
  const [popTrigger, setPopTrigger] = useState<number>(0);

  useEffect(() => {
    if (totalCartCount > prevCountRef.current) {
      const diff = totalCartCount - prevCountRef.current;
      setAddedDelta(diff);
      setPopTrigger((p) => p + 1);
      const timer = setTimeout(() => setAddedDelta(null), 1100);
      prevCountRef.current = totalCartCount;
      return () => clearTimeout(timer);
    }
    prevCountRef.current = totalCartCount;
  }, [totalCartCount]);

  // Reusable animated Cart Icon + Pop-up Badge wrapper
  const renderCartIconWithBadge = (
    Icon: React.FC<{ size?: number; strokeWidth?: number; className?: string }>,
    size: number,
    strokeWidth: number,
    invertedBadge = false
  ) => (
    <motion.div
      key={`cart-icon-${popTrigger}`}
      initial={popTrigger > 0 ? { scale: 0.85, y: 2 } : false}
      animate={{ scale: [1, popTrigger > 0 ? 1.22 : 1, 1], y: [0, popTrigger > 0 ? -3 : 0, 0] }}
      transition={{ duration: 0.38, ease: 'easeOut' }}
      className="relative inline-flex items-center justify-center"
    >
      <Icon size={size} strokeWidth={strokeWidth} />

      {/* Subtle Pop-Up Badge on Cart Icon */}
      <AnimatePresence mode="popLayout">
        {totalCartCount > 0 && (
          <motion.span
            key={`badge-${totalCartCount}`}
            initial={{ scale: 0.35, opacity: 0, y: 4 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.35, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 520, damping: 15 }}
            className="absolute -top-1.5 -right-2.5 min-w-[16px] h-[16px] px-1 rounded-full text-[9px] font-extrabold flex items-center justify-center shadow-xs leading-none"
            style={{
              backgroundColor: invertedBadge ? '#FFFFFF' : palette.primary,
              color: invertedBadge ? palette.primary : palette.primaryText,
            }}
          >
            {totalCartCount}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Subtle Floating "+1" Pop-Up Pill when an item is added */}
      <AnimatePresence>
        {addedDelta !== null && (
          <motion.span
            key={`delta-${popTrigger}`}
            initial={{ opacity: 0, y: 2, scale: 0.7 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: -28, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold shadow-md pointer-events-none whitespace-nowrap"
            style={{
              backgroundColor: palette.primary,
              color: palette.primaryText,
            }}
          >
            +{addedDelta}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );

  // V2: Floating Plum Capsule
  if (variant === 'varient_2') {
    return (
      <div
        className="px-3 pb-3 pt-1 flex-shrink-0 z-30"
        style={{ backgroundColor: palette.background }}
      >
        <div
          className="h-14 rounded-full border px-2 flex items-center justify-around shadow-lg"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.border,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            const isCart = item.id === 'Cart';
            const labelText =
              isCart && totalCartCount > 0
                ? `Cart (${totalCartCount})`
                : item.label;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className="px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-bold transition cursor-pointer relative"
                style={{
                  backgroundColor: active ? palette.primary : 'transparent',
                  color: active ? palette.primaryText : palette.textSecondary,
                }}
              >
                {isCart ? (
                  renderCartIconWithBadge(Icon, 17, active ? 2.4 : 1.9, active)
                ) : (
                  <Icon size={17} strokeWidth={active ? 2.4 : 1.9} />
                )}
                {active && <span>{labelText}</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // V3: Top Indicator Line
  if (variant === 'varient_3') {
    return (
      <div
        className="h-[64px] border-t px-2 flex items-center justify-around flex-shrink-0 z-30"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          const isCart = item.id === 'Cart';
          const labelText =
            isCart && totalCartCount > 0
              ? `Cart (${totalCartCount})`
              : item.label;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className="h-full flex-1 flex flex-col items-center justify-center gap-1 relative cursor-pointer"
              style={{
                color: active ? palette.primary : palette.textMuted,
              }}
            >
              {active && (
                <span
                  className="absolute top-0 w-8 h-[3px] rounded-b-full"
                  style={{ backgroundColor: palette.primary }}
                />
              )}
              {isCart ? (
                renderCartIconWithBadge(Icon, 19, active ? 2.4 : 1.8)
              ) : (
                <Icon size={19} strokeWidth={active ? 2.4 : 1.8} />
              )}
              <span className="text-[11px] font-bold">{labelText}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // V4: Soft Tinted Pill Bar
  if (variant === 'varient_4') {
    return (
      <div
        className="h-[66px] border-t px-3 flex items-center justify-between gap-1 flex-shrink-0 z-30"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          const isCart = item.id === 'Cart';
          const labelText =
            isCart && totalCartCount > 0
              ? `Cart (${totalCartCount})`
              : item.label;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className="flex-1 py-2 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition cursor-pointer"
              style={{
                backgroundColor: active ? palette.primarySoft : 'transparent',
                color: active ? palette.primary : palette.textMuted,
              }}
            >
              {isCart ? (
                renderCartIconWithBadge(Icon, 18, active ? 2.4 : 1.8)
              ) : (
                <Icon size={18} strokeWidth={active ? 2.4 : 1.8} />
              )}
              <span className="text-[10px] font-extrabold">{labelText}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // V5: Minimal Dot Dock
  if (variant === 'varient_5') {
    return (
      <div
        className="h-[60px] border-t px-4 flex items-center justify-around flex-shrink-0 z-30"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          const isCart = item.id === 'Cart';
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className="flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              style={{
                color: active ? palette.primary : palette.textMuted,
              }}
            >
              {isCart ? (
                renderCartIconWithBadge(Icon, 20, active ? 2.5 : 1.8)
              ) : (
                <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
              )}
              <span
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{
                  backgroundColor: active ? palette.primary : 'transparent',
                }}
              />
            </button>
          );
        })}
      </div>
    );
  }

  // V6: Elevated Center Cart
  if (variant === 'varient_6') {
    return (
      <div
        className="h-[66px] border-t px-3 flex items-center justify-around flex-shrink-0 z-30 relative"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          const isCart = item.id === 'Cart';
          if (isCart) {
            return (
              <motion.button
                key={item.id}
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => onSelectTab(item.id)}
                className="-mt-6 w-12 h-12 rounded-full shadow-lg flex flex-col items-center justify-center cursor-pointer border-2 relative"
                style={{
                  backgroundColor: palette.primary,
                  color: palette.primaryText,
                  borderColor: palette.background,
                }}
              >
                {renderCartIconWithBadge(Icon, 19, 2.3, true)}
              </motion.button>
            );
          }
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className="flex flex-col items-center justify-center gap-1 cursor-pointer"
              style={{
                color: active ? palette.primary : palette.textMuted,
              }}
            >
              <Icon size={19} strokeWidth={active ? 2.4 : 1.8} />
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // V7: Brutalist Book Ledger
  if (variant === 'varient_7') {
    return (
      <div
        className="px-3 pb-3 pt-1 flex-shrink-0 z-30"
        style={{ backgroundColor: palette.background }}
      >
        <div
          className="h-14 rounded-xl border-2 px-2 flex items-center justify-around"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.primary,
            boxShadow: `3px 3px 0px ${palette.primary}`,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            const isCart = item.id === 'Cart';
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className="px-2.5 py-1 rounded-lg flex flex-col items-center justify-center cursor-pointer"
                style={{
                  backgroundColor: active ? palette.primary : 'transparent',
                  color: active ? palette.primaryText : palette.textPrimary,
                }}
              >
                {isCart ? (
                  renderCartIconWithBadge(Icon, 17, 2.2, active)
                ) : (
                  <Icon size={17} strokeWidth={2.2} />
                )}
                <span className="text-[10px] font-black">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // V8: Glassmorphic Blur Dock
  if (variant === 'varient_8') {
    return (
      <div
        className="h-[64px] border-t px-3 flex items-center justify-around backdrop-blur-md flex-shrink-0 z-30"
        style={{
          backgroundColor: isDark
            ? 'rgba(24, 21, 34, 0.86)'
            : 'rgba(255, 255, 255, 0.88)',
          borderColor: palette.border,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          const isCart = item.id === 'Cart';
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className="flex flex-col items-center justify-center gap-1 cursor-pointer"
              style={{
                color: active ? palette.primary : palette.textMuted,
              }}
            >
              {isCart ? (
                renderCartIconWithBadge(Icon, 19, active ? 2.4 : 1.8)
              ) : (
                <Icon size={19} strokeWidth={active ? 2.4 : 1.8} />
              )}
              <span className="text-[11px] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // V9: Split Compact Dock
  if (variant === 'varient_9') {
    return (
      <div
        className="px-3 pb-3 pt-1 flex items-center gap-2 flex-shrink-0 z-30"
        style={{ backgroundColor: palette.background }}
      >
        <div
          className="flex-1 h-13 rounded-2xl border px-2 flex items-center justify-around"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.border,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            const isCart = item.id === 'Cart';
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className="px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer"
                style={{
                  backgroundColor: active ? palette.primarySoft : 'transparent',
                  color: active ? palette.primary : palette.textMuted,
                }}
              >
                {isCart ? (
                  renderCartIconWithBadge(Icon, 17, active ? 2.4 : 1.9)
                ) : (
                  <Icon size={17} strokeWidth={active ? 2.4 : 1.9} />
                )}
                <span className="text-[10px] font-extrabold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // V10: Solid Royal Banner
  if (variant === 'varient_10') {
    return (
      <div
        className="h-[64px] px-3 flex items-center justify-around flex-shrink-0 z-30"
        style={{
          backgroundColor: palette.primary,
          color: palette.primaryText,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          const isCart = item.id === 'Cart';
          const labelText =
            isCart && totalCartCount > 0
              ? `Cart (${totalCartCount})`
              : item.label;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className="px-3 py-1.5 rounded-xl flex flex-col items-center justify-center gap-0.5 cursor-pointer transition"
              style={{
                backgroundColor: active
                  ? 'rgba(255,255,255,0.18)'
                  : 'transparent',
                color: palette.primaryText,
                opacity: active ? 1 : 0.72,
              }}
            >
              {isCart ? (
                renderCartIconWithBadge(Icon, 19, active ? 2.5 : 1.9, true)
              ) : (
                <Icon size={19} strokeWidth={active ? 2.5 : 1.9} />
              )}
              <span className="text-[10px] font-bold">{labelText}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // V1 (Default): Exact Bazar Classic 4-Tab Bar (Home | Category | Cart (3) | Profile)
  return (
    <div
      className="h-[66px] border-t px-4 flex items-center justify-around flex-shrink-0 z-30 transition-colors"
      style={{
        backgroundColor: palette.surface,
        borderColor: palette.border,
      }}
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = activeTab === item.id;
        const isCart = item.id === 'Cart';
        const labelText =
          isCart && totalCartCount > 0
            ? `Cart (${totalCartCount})`
            : item.label;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTab(item.id)}
            className="flex flex-col items-center justify-center gap-1 py-1 px-2 cursor-pointer transition relative"
            style={{
              color: active ? palette.primary : palette.textMuted,
            }}
          >
            {isCart ? (
              renderCartIconWithBadge(Icon, 20, active ? 2.4 : 1.9)
            ) : (
              <Icon size={20} strokeWidth={active ? 2.4 : 1.9} />
            )}
            <motion.span
              key={isCart ? `label-${totalCartCount}` : item.id}
              initial={isCart && popTrigger > 0 ? { scale: 0.9 } : false}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 450, damping: 22 }}
              className={`text-[11px] leading-tight ${
                active ? 'font-bold' : 'font-medium'
              }`}
            >
              {labelText}
            </motion.span>
          </button>
        );
      })}
    </div>
  );
};

export default BookStoreBottomNavBar;
