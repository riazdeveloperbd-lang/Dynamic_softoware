import React, { useState } from 'react';
import { ArrowLeft, Heart, Minus, Plus, Star, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface BookDetailVarient1Props {
  variant?: BookStoreVariantId;
  onClose?: () => void;
  onContinueShopping?: () => void;
  onGoToCart?: () => void;
  onViewCart?: () => void;
  onTriggerToast?: (msg: string) => void;
}

export const BookDetailVarient1: React.FC<BookDetailVarient1Props> = ({
  variant = 'varient_1',
  onClose,
  onContinueShopping,
  onGoToCart,
  onViewCart,
  onTriggerToast,
}) => {
  const {
    palette,
    activeFont,
    isDark,
    colorPresetId,
    selectedBook,
    favoriteBookIds,
    toggleFavoriteBook,
    addToCart,
  } = useBookStoreDesignSystem();

  const [qty, setQty] = useState<number>(1);
  const [addingAction, setAddingAction] = useState<'none' | 'continue' | 'view_cart'>('none');
  const [showFlyChip, setShowFlyChip] = useState(false);
  const isFav = favoriteBookIds.includes(selectedBook.id);

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else if (onContinueShopping) {
      onContinueShopping();
    }
  };

  const handleOpenCart = () => {
    if (addingAction !== 'none') return;
    setAddingAction('view_cart');
    setShowFlyChip(true);
    addToCart(selectedBook, qty);
    onTriggerToast?.(`Added ${qty}x ${selectedBook.title} to Cart`);
    setTimeout(() => {
      setShowFlyChip(false);
      setAddingAction('none');
      if (onGoToCart) {
        onGoToCart();
      } else if (onViewCart) {
        onViewCart();
      }
    }, 520);
  };

  const handleAddAndContinue = () => {
    if (addingAction !== 'none') return;
    setAddingAction('continue');
    setShowFlyChip(true);
    addToCart(selectedBook, qty);
    onTriggerToast?.(`Added ${qty}x ${selectedBook.title} to Cart`);
    setTimeout(() => {
      setShowFlyChip(false);
    }, 650);
    setTimeout(() => {
      setAddingAction('none');
      handleBack();
    }, 780);
  };

  const cardStyle = getBookStoreVariantCardStyle(variant, palette);

  return (
    <motion.div
      key={`${selectedBook.id}-${variant}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="bookstore-theme-scope min-h-[640px] px-5 pt-3 pb-6 flex flex-col justify-between select-none relative overflow-hidden"
      style={getBookStoreThemeScopeStyle(palette, activeFont)}
      data-bookstore-dark={isDark ? 'true' : 'false'}
      data-bookstore-preset={colorPresetId}
    >
      {/* Smooth Floating Add-to-Cart Confirmation Chip */}
      <AnimatePresence>
        {showFlyChip && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.7 }}
            transition={{ type: 'spring', stiffness: 420, damping: 24 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 px-3.5 py-2 rounded-full shadow-lg flex items-center gap-2.5 pointer-events-none"
            style={{
              backgroundColor: palette.primary,
              color: palette.primaryText,
            }}
          >
            <img
              src={selectedBook.coverImage}
              alt={selectedBook.title}
              className="w-6 h-8 rounded object-cover shadow-xs"
            />
            <span className="text-[12px] font-extrabold whitespace-nowrap">
              +{qty} Added to Cart
            </span>
            <Sparkles size={13} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {/* Top Bar with Back Arrow + Drag Pill + Favorite */}
        <div className="flex items-center justify-between">
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition hover:opacity-80"
            style={{ backgroundColor: palette.surface, color: palette.textPrimary }}
            title="Back"
          >
            <ArrowLeft size={18} />
          </motion.button>

          <div
            className="w-12 h-1.5 rounded-full"
            style={{ backgroundColor: palette.border }}
          />

          <motion.button
            type="button"
            whileTap={{ scale: 0.82 }}
            onClick={() => toggleFavoriteBook(selectedBook.id)}
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition"
            style={{ backgroundColor: palette.surface }}
          >
            <Heart
              size={18}
              fill={isFav ? palette.primary : 'none'}
              color={isFav ? palette.primary : palette.textMuted}
            />
          </motion.button>
        </div>

        {/* Cover & Header Presentation (6 Variant Layouts) */}
        {variant === 'varient_2' || variant === 'varient_5' ? (
          /* V2 / V5: Split Side-by-Side Book Header Card */
          <motion.div
            layout
            className="p-4 flex items-start gap-4"
            style={cardStyle}
          >
            <motion.img
              layoutId={`book-cover-${selectedBook.id}`}
              src={selectedBook.coverImage}
              alt={selectedBook.title}
              animate={
                addingAction !== 'none'
                  ? { scale: [1, 1.05, 0.98], rotate: [0, -1.5, 0] }
                  : { scale: 1, rotate: 0 }
              }
              transition={{ duration: 0.36 }}
              className="w-[116px] h-[168px] rounded-xl object-cover shadow-md flex-shrink-0"
            />
            <div className="flex-1 min-w-0 space-y-2">
              <span
                className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase"
                style={{ backgroundColor: palette.primary, color: palette.primaryText }}
              >
                {selectedBook.category}
              </span>
              <h1 className="text-[18px] font-extrabold leading-tight">
                {selectedBook.title}
              </h1>
              <p className="text-[12px] font-semibold" style={{ color: palette.textSecondary }}>
                by {selectedBook.authorName}
              </p>
              <div
                className="text-[14px] font-black"
                style={{ color: selectedBook.vendorColor || '#EA580C' }}
              >
                {selectedBook.vendorLogoText}
              </div>
              <div className="flex items-center gap-1 pt-1">
                <Star size={14} fill="#FACC15" color="#FACC15" />
                <span className="text-[13px] font-bold">
                  {selectedBook.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* V1 / V3 / V4 / V6: Centered Showcase Cover */
          <>
            <div
              className="flex justify-center py-2 rounded-2xl"
              style={
                variant === 'varient_4'
                  ? { backgroundColor: palette.primarySoft }
                  : variant === 'varient_3' || variant === 'varient_6'
                  ? cardStyle
                  : undefined
              }
            >
              <motion.img
                layoutId={`book-cover-${selectedBook.id}`}
                src={selectedBook.coverImage}
                alt={selectedBook.title}
                animate={
                  addingAction !== 'none'
                    ? { scale: [1, 1.06, 0.97], y: [0, -6, 0] }
                    : { scale: 1, y: 0 }
                }
                transition={{ duration: 0.36, ease: 'easeOut' }}
                className="w-[196px] h-[268px] rounded-2xl object-cover shadow-lg"
              />
            </div>

            <div className="flex items-start justify-between gap-3 pt-1">
              <div>
                <h1
                  className="text-[20px] font-extrabold leading-tight"
                  style={{ color: palette.textPrimary }}
                >
                  {selectedBook.title}
                </h1>
                <p className="text-[12px] font-semibold mt-0.5" style={{ color: palette.textSecondary }}>
                  by {selectedBook.authorName} · {selectedBook.category}
                </p>
              </div>
              <div
                className="text-[16px] font-black tracking-tight flex-shrink-0"
                style={{ color: selectedBook.vendorColor || '#EA580C' }}
              >
                {selectedBook.vendorLogoText}
              </div>
            </div>
          </>
        )}

        {/* Book Description */}
        <div
          className={variant === 'varient_1' ? '' : 'p-3.5'}
          style={variant === 'varient_1' ? undefined : cardStyle}
        >
          <p
            className="text-[13px] leading-relaxed"
            style={{ color: palette.textSecondary }}
          >
            {selectedBook.description}
          </p>
        </div>

        {/* Review Stars */}
        <div className="space-y-1.5">
          <h3
            className="text-[15px] font-extrabold"
            style={{ color: palette.textPrimary }}
          >
            Review
          </h3>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={18}
                fill={s <= Math.round(selectedBook.rating) ? '#FACC15' : '#CBD5E1'}
                color={s <= Math.round(selectedBook.rating) ? '#FACC15' : '#CBD5E1'}
              />
            ))}
            <span
              className="text-[13px] font-bold ml-1"
              style={{ color: palette.textPrimary }}
            >
              ({selectedBook.rating.toFixed(1)})
            </span>
          </div>
        </div>

        {/* Quantity Stepper + Live Animated Price */}
        <div className="flex items-center justify-between pt-1">
          <div
            className="h-10 px-2.5 rounded-xl flex items-center gap-3.5"
            style={{ backgroundColor: palette.surface }}
          >
            <motion.button
              type="button"
              whileTap={{ scale: 0.85 }}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: palette.border,
                color: palette.textSecondary,
              }}
            >
              <Minus size={13} strokeWidth={2.5} />
            </motion.button>

            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={qty}
                initial={{ y: -8, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 8, opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 500, damping: 26 }}
                className="text-[15px] font-bold min-w-[16px] text-center"
                style={{ color: palette.textPrimary }}
              >
                {qty}
              </motion.span>
            </AnimatePresence>

            <motion.button
              type="button"
              whileTap={{ scale: 0.85 }}
              onClick={() => setQty((q) => q + 1)}
              className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: palette.primary,
                color: palette.primaryText,
              }}
            >
              <Plus size={13} strokeWidth={2.5} />
            </motion.button>
          </div>

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={(selectedBook.price * qty).toFixed(2)}
              initial={{ scale: 0.88, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 450, damping: 24 }}
              className="text-[19px] font-extrabold"
              style={{ color: palette.primary }}
            >
              ${(selectedBook.price * qty).toFixed(2)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Dual CTA Buttons with Smooth Framer Motion Add-to-Cart Transition */}
      <div className="flex items-center gap-3 pt-5">
        <motion.button
          type="button"
          layout
          whileTap={{ scale: 0.96 }}
          onClick={handleAddAndContinue}
          className="flex-1 h-[48px] rounded-full text-[14px] font-bold shadow-sm cursor-pointer flex items-center justify-center gap-1.5 overflow-hidden"
          style={{
            backgroundColor:
              addingAction === 'continue' ? palette.success : palette.primary,
            color: palette.primaryText,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {addingAction === 'continue' ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                className="flex items-center gap-1.5"
              >
                <Check size={16} strokeWidth={2.8} />
                <span>Added to Bag!</span>
              </motion.span>
            ) : (
              <motion.span
                key="continue"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
              >
                Continue shopping
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button
          type="button"
          layout
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenCart}
          className="px-6 h-[48px] rounded-full text-[14px] font-bold cursor-pointer flex items-center gap-1.5 overflow-hidden"
          style={{
            backgroundColor:
              addingAction === 'view_cart' ? palette.primary : palette.primarySoft,
            color:
              addingAction === 'view_cart' ? palette.primaryText : palette.primary,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {addingAction === 'view_cart' ? (
              <motion.span
                key="opening"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                className="flex items-center gap-1.5"
              >
                <Check size={15} strokeWidth={2.6} />
                <span>Opening...</span>
              </motion.span>
            ) : (
              <motion.span
                key="view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5"
              >
                <ShoppingBag size={15} />
                <span>View cart</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BookDetailVarient1;
