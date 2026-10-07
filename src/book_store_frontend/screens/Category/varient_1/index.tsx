import React, { useState } from 'react';
import { Search, Bell, Heart, Star, ShoppingBag, ArrowUpRight } from 'lucide-react';
import {
  BookItem,
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface CategoryVarient1Props {
  variant?: BookStoreVariantId;
  onOpenSearch?: () => void;
  onOpenNotifications?: () => void;
  onOpenBookDetail?: (book: BookItem) => void;
  onSelectBook?: (book: BookItem) => void;
}

const CATEGORY_TABS = [
  'All',
  'Novels',
  'Self Love',
  'Science',
  'Romantic',
] as const;

export const CategoryVarient1: React.FC<CategoryVarient1Props> = ({
  variant = 'varient_1',
  onOpenSearch,
  onOpenNotifications,
  onOpenBookDetail,
  onSelectBook,
}) => {
  const {
    palette,
    activeFont,
    isDark,
    colorPresetId,
    books,
    setSelectedBook,
    favoriteBookIds,
    toggleFavoriteBook,
    addToCart,
  } = useBookStoreDesignSystem();
  const [selectedTab, setSelectedTab] = useState<string>('All');

  const filteredBooks =
    selectedTab === 'All'
      ? books
      : books.filter((b) => b.category === selectedTab);

  const handleBookSelect = (book: BookItem) => {
    setSelectedBook(book);
    onSelectBook?.(book);
    onOpenBookDetail?.(book);
  };

  const cardStyle = getBookStoreVariantCardStyle(variant, palette);

  return (
    <div
      className="bookstore-theme-scope min-h-[640px] pb-6 select-none"
      style={getBookStoreThemeScopeStyle(palette, activeFont)}
      data-bookstore-dark={isDark ? 'true' : 'false'}
      data-bookstore-preset={colorPresetId}
    >
      {/* Top Header Bar */}
      {variant === 'varient_4' ? (
        <div
          className="px-5 pt-4 pb-5 rounded-b-3xl mb-4"
          style={{ backgroundColor: palette.primary, color: palette.primaryText }}
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onOpenSearch}
              className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center cursor-pointer"
            >
              <Search size={19} />
            </button>
            <h1 className="text-[19px] font-extrabold">Category Catalog</h1>
            <button
              type="button"
              onClick={onOpenNotifications}
              className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center relative cursor-pointer"
            >
              <Bell size={19} />
              <span className="w-2 h-2 rounded-full bg-red-400 absolute top-1.5 right-2" />
            </button>
          </div>
        </div>
      ) : (
        <div className="px-5 pt-3 pb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
            style={{ color: palette.textPrimary }}
          >
            <Search size={21} strokeWidth={2.2} />
          </button>

          <h1
            className="text-[19px] font-extrabold"
            style={{ color: palette.textPrimary }}
          >
            Category
          </h1>

          <button
            type="button"
            onClick={onOpenNotifications}
            className="w-9 h-9 rounded-xl flex items-center justify-center relative cursor-pointer"
            style={{ color: palette.textPrimary }}
          >
            <Bell size={21} strokeWidth={2.2} />
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-2" />
          </button>
        </div>
      )}

      <div className="px-5 space-y-5">
        {/* Category Filter Tabs (Variant-aware) */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {CATEGORY_TABS.map((tab) => {
            const active = selectedTab === tab;
            if (variant === 'varient_2' || variant === 'varient_4' || variant === 'varient_6') {
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedTab(tab)}
                  className="px-3.5 py-1.5 rounded-full text-[13px] font-bold whitespace-nowrap cursor-pointer transition"
                  style={{
                    backgroundColor: active ? palette.primary : palette.surface,
                    color: active ? palette.primaryText : palette.textSecondary,
                  }}
                >
                  {tab}
                </button>
              );
            }
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedTab(tab)}
                className="text-[15px] whitespace-nowrap pb-1.5 pr-2 relative cursor-pointer transition"
                style={{
                  color: active ? palette.textPrimary : palette.textSecondary,
                  fontWeight: active ? 800 : 500,
                }}
              >
                {tab}
                {active && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2.5px] rounded-full"
                    style={{ backgroundColor: palette.primary }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Book Catalog Layout (6 Distinct Variant Layouts) */}
        {variant === 'varient_4' ? (
          /* V4: Horizontal Editorial List Cards */
          <div className="space-y-3">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => handleBookSelect(book)}
                className="p-3 flex items-center gap-3.5 cursor-pointer transition hover:opacity-95"
                style={cardStyle}
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-16 h-22 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: palette.primarySoft, color: palette.primary }}
                    >
                      {book.category}
                    </span>
                    <span className="text-[11px] font-bold text-amber-500 flex items-center gap-0.5">
                      <Star size={11} fill="currentColor" /> {book.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-[15px] font-extrabold truncate mt-1">
                    {book.title}
                  </div>
                  <div className="text-[12px] truncate" style={{ color: palette.textSecondary }}>
                    {book.authorName}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[14px] font-extrabold" style={{ color: palette.primary }}>
                      ${book.price.toFixed(2)}
                    </span>
                    <span className="text-[11px] font-bold flex items-center gap-0.5" style={{ color: palette.primary }}>
                      View Details <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'varient_5' ? (
          /* V5: Minimalist Left-Rail Magazine List */
          <div className="space-y-3">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => handleBookSelect(book)}
                className="p-3.5 flex items-start gap-4 cursor-pointer"
                style={cardStyle}
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-20 h-28 rounded-lg object-cover shadow-sm flex-shrink-0"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="text-[15px] font-extrabold truncate">{book.title}</div>
                  <div className="text-[12px]" style={{ color: palette.textSecondary }}>
                    by {book.authorName}
                  </div>
                  <p className="text-[11px] line-clamp-2" style={{ color: palette.textMuted }}>
                    {book.description}
                  </p>
                  <div className="pt-1.5 flex items-center justify-between">
                    <span className="text-[15px] font-extrabold" style={{ color: palette.primary }}>
                      ${book.price.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(book, 1);
                      }}
                      className="px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1"
                      style={{ backgroundColor: palette.primary, color: palette.primaryText }}
                    >
                      <ShoppingBag size={11} /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* V1 / V2 / V3 / V6 2-Column Book Cards with Distinct Card Frames */
          <div className="grid grid-cols-2 gap-4">
            {filteredBooks.map((book) => {
              const isFav = favoriteBookIds.includes(book.id);
              return (
                <div
                  key={book.id}
                  onClick={() => handleBookSelect(book)}
                  className={`space-y-2 cursor-pointer group transition-all ${
                    variant === 'varient_1' ? '' : 'p-2.5'
                  }`}
                  style={variant === 'varient_1' ? undefined : cardStyle}
                >
                  <div className="h-[184px] rounded-xl overflow-hidden shadow-xs relative">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {variant !== 'varient_1' && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavoriteBook(book.id);
                        }}
                        className="w-7 h-7 rounded-full bg-black/45 text-white flex items-center justify-center absolute top-2 right-2"
                      >
                        <Heart size={13} fill={isFav ? '#EF4444' : 'none'} />
                      </button>
                    )}
                  </div>
                  <div
                    className="text-[14px] font-bold truncate"
                    style={{ color: palette.textPrimary }}
                  >
                    {book.title}
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[14px] font-extrabold"
                      style={{ color: palette.primary }}
                    >
                      ${book.price.toFixed(2)}
                    </span>
                    {variant !== 'varient_1' && (
                      <span className="text-[11px] font-bold text-amber-500 flex items-center gap-0.5">
                        <Star size={11} fill="currentColor" /> {book.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryVarient1;
