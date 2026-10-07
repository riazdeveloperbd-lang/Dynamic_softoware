import React, { useState } from 'react';
import { Search, Bell, Star, Heart, ArrowUpRight, Sparkles, BookOpen } from 'lucide-react';
import {
  BookItem,
  AuthorItem,
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface HomeVarient1Props {
  variant?: BookStoreVariantId;
  onOpenSearch?: () => void;
  onOpenNotifications?: () => void;
  onOpenBookDetail?: (book: BookItem) => void;
  onSelectBook?: (book: BookItem) => void;
  onOpenVendors?: () => void;
  onSeeAllVendors?: () => void;
  onOpenAuthors?: () => void;
  onSeeAllAuthors?: () => void;
  onOpenAuthorDetail?: (author: AuthorItem) => void;
  onSelectAuthor?: (author: AuthorItem) => void;
  onOpenCategory?: () => void;
  onTriggerToast?: (msg: string) => void;
}

export const HomeVarient1: React.FC<HomeVarient1Props> = ({
  variant = 'varient_1',
  onOpenSearch,
  onOpenNotifications,
  onOpenBookDetail,
  onSelectBook,
  onOpenVendors,
  onSeeAllVendors,
  onOpenAuthors,
  onSeeAllAuthors,
  onOpenAuthorDetail,
  onSelectAuthor,
  onOpenCategory,
}) => {
  const {
    palette,
    activeFont,
    isDark,
    colorPresetId,
    books,
    vendors,
    authors,
    setSelectedBook,
    setSelectedAuthor,
    favoriteBookIds,
    toggleFavoriteBook,
  } = useBookStoreDesignSystem();

  const [bannerIdx, setBannerIdx] = useState(0);
  const heroBook = books[bannerIdx % books.length] || books[0];

  const handleBookClick = (book: BookItem) => {
    setSelectedBook(book);
    onSelectBook?.(book);
    onOpenBookDetail?.(book);
  };

  const handleAuthorClick = (author: AuthorItem) => {
    setSelectedAuthor(author);
    onSelectAuthor?.(author);
    onOpenAuthorDetail?.(author);
  };

  const handleVendorsClick = () => {
    onSeeAllVendors?.();
    onOpenVendors?.();
  };

  const handleAuthorsListClick = () => {
    onSeeAllAuthors?.();
    onOpenAuthors?.();
  };

  const cardStyle = getBookStoreVariantCardStyle(variant, palette);

  return (
    <div
      className="bookstore-theme-scope pb-6 select-none"
      style={getBookStoreThemeScopeStyle(palette, activeFont)}
      data-bookstore-dark={isDark ? 'true' : 'false'}
      data-bookstore-preset={colorPresetId}
    >
      {/* 1. TOP HEADER BAR (6 Variant Styles) */}
      {variant === 'varient_4' ? (
        /* V4: Solid Brand Luxe Header Banner */
        <div
          className="px-5 pt-4 pb-6 rounded-b-3xl shadow-md mb-5"
          style={{ backgroundColor: palette.primary, color: palette.primaryText }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BookOpen size={20} />
              <h1 className="text-[19px] font-extrabold tracking-tight">Bazar Home</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenSearch}
                className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center cursor-pointer"
              >
                <Search size={18} />
              </button>
              <button
                type="button"
                onClick={onOpenNotifications}
                className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center relative cursor-pointer"
              >
                <Bell size={18} />
                <span className="w-2 h-2 rounded-full bg-red-400 absolute top-1.5 right-2" />
              </button>
            </div>
          </div>
          <div
            onClick={onOpenSearch}
            className="px-3.5 py-2.5 rounded-xl bg-white/15 flex items-center gap-2.5 text-xs cursor-pointer"
          >
            <Search size={15} className="opacity-80" />
            <span className="opacity-85">Search books, novelists, or publishers...</span>
          </div>
        </div>
      ) : (
        <div className="px-5 pt-3 pb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition hover:opacity-80"
            style={{
              color: palette.textPrimary,
              backgroundColor:
                variant === 'varient_2' || variant === 'varient_6'
                  ? palette.surface
                  : 'transparent',
            }}
            title="Search Books"
          >
            <Search size={20} strokeWidth={2.2} />
          </button>

          <div className="text-center">
            {variant === 'varient_3' && (
              <span
                className="block text-[9px] font-mono uppercase tracking-widest"
                style={{ color: palette.primary }}
              >
                EDITION // 01
              </span>
            )}
            <h1
              className="text-[19px] font-extrabold tracking-tight"
              style={{ color: palette.textPrimary }}
            >
              Home
            </h1>
          </div>

          <button
            type="button"
            onClick={onOpenNotifications}
            className="w-9 h-9 rounded-xl flex items-center justify-center relative cursor-pointer transition hover:opacity-80"
            style={{
              color: palette.textPrimary,
              backgroundColor:
                variant === 'varient_2' || variant === 'varient_6'
                  ? palette.surface
                  : 'transparent',
            }}
            title="Notifications"
          >
            <Bell size={20} strokeWidth={2.2} />
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-2" />
          </button>
        </div>
      )}

      <div className="px-5 space-y-6">
        {/* 2. SPECIAL OFFER HERO BANNER (6 Distinct Variant Layouts) */}
        {variant === 'varient_2' ? (
          /* V2: Bento Split Hero */
          <div className="grid grid-cols-12 gap-3">
            <div
              onClick={() => handleBookClick(heroBook)}
              className="col-span-7 rounded-2xl p-4 flex flex-col justify-between cursor-pointer"
              style={{ backgroundColor: palette.primary, color: palette.primaryText }}
            >
              <div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 mb-2">
                  <Sparkles size={11} /> 25% OFF
                </span>
                <h2 className="text-[18px] font-extrabold leading-tight">
                  Special Offer
                </h2>
                <p className="text-[11px] opacity-85 mt-1 truncate">
                  {heroBook.title}
                </p>
              </div>
              <button
                type="button"
                className="mt-3 w-fit px-4 py-1.5 rounded-full text-[11px] font-extrabold bg-white"
                style={{ color: palette.primary }}
              >
                Order Now
              </button>
            </div>
            <div
              onClick={() => handleBookClick(heroBook)}
              className="col-span-5 rounded-2xl overflow-hidden relative cursor-pointer h-[148px]"
            >
              <img
                src={heroBook.coverImage}
                alt={heroBook.title}
                className="w-full h-full object-cover"
              />
              <span
                className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-[11px] font-extrabold shadow"
                style={{ backgroundColor: palette.cardBackground, color: palette.primary }}
              >
                ${heroBook.price.toFixed(2)}
              </span>
            </div>
          </div>
        ) : variant === 'varient_3' ? (
          /* V3: Brutalist Literary Frame Hero */
          <div
            onClick={() => handleBookClick(heroBook)}
            className="p-4 flex items-center justify-between gap-4 cursor-pointer"
            style={cardStyle}
          >
            <div className="space-y-1.5">
              <span
                className="inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase border"
                style={{
                  borderColor: palette.textPrimary,
                  backgroundColor: palette.primarySoft,
                  color: palette.primary,
                }}
              >
                FLASH DEAL · -25%
              </span>
              <h2 className="text-[19px] font-black uppercase tracking-tight">
                Special Offer
              </h2>
              <p className="text-[12px] font-semibold" style={{ color: palette.textSecondary }}>
                {heroBook.title}
              </p>
              <button
                type="button"
                className="mt-2 px-5 py-2 text-[12px] font-black uppercase border-2"
                style={{
                  backgroundColor: palette.primary,
                  color: palette.primaryText,
                  borderColor: palette.textPrimary,
                }}
              >
                Order Now →
              </button>
            </div>
            <img
              src={heroBook.coverImage}
              alt={heroBook.title}
              className="w-[96px] h-[132px] object-cover border-2 flex-shrink-0"
              style={{ borderColor: palette.textPrimary }}
            />
          </div>
        ) : variant === 'varient_5' ? (
          /* V5: Minimalist Atelier Left-Rail Showcase */
          <div
            onClick={() => handleBookClick(heroBook)}
            className="p-4 flex items-center gap-4 cursor-pointer"
            style={cardStyle}
          >
            <img
              src={heroBook.coverImage}
              alt={heroBook.title}
              className="w-[88px] h-[124px] rounded-lg object-cover shadow-md flex-shrink-0"
            />
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: palette.primary }}>
                Featured Pick · 25% Off
              </div>
              <h2 className="text-[18px] font-extrabold truncate">{heroBook.title}</h2>
              <p className="text-[12px] line-clamp-2" style={{ color: palette.textSecondary }}>
                {heroBook.description}
              </p>
              <button
                type="button"
                className="px-4 py-1.5 rounded-lg text-[12px] font-bold"
                style={{ backgroundColor: palette.primary, color: palette.primaryText }}
              >
                Order Now · ${heroBook.price.toFixed(2)}
              </button>
            </div>
          </div>
        ) : (
          /* V1 / V4 / V6 Classic & Compact Hero Banner */
          <div className="space-y-2.5">
            <div
              onClick={() => handleBookClick(heroBook)}
              className="rounded-2xl p-4 flex items-center justify-between gap-4 cursor-pointer"
              style={
                variant === 'varient_6'
                  ? cardStyle
                  : { backgroundColor: palette.primarySoft }
              }
            >
              <div className="space-y-1.5 pl-1">
                <h2
                  className="text-[20px] font-extrabold leading-tight"
                  style={{ color: palette.textPrimary }}
                >
                  Special Offer
                </h2>
                <p
                  className="text-[13px] font-medium"
                  style={{ color: palette.textSecondary }}
                >
                  Discount 25%
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookClick(heroBook);
                    }}
                    className="px-6 py-2.5 rounded-full text-[13px] font-bold shadow-xs cursor-pointer transition active:scale-95"
                    style={{
                      backgroundColor: palette.primary,
                      color: palette.primaryText,
                    }}
                  >
                    Order Now
                  </button>
                </div>
              </div>

              <img
                src={heroBook.coverImage}
                alt={heroBook.title}
                className="w-[100px] h-[136px] rounded-xl object-cover shadow-md flex-shrink-0"
              />
            </div>

            <div className="flex items-center justify-center gap-1.5">
              {[0, 1, 2].map((dot) => (
                <button
                  key={dot}
                  type="button"
                  onClick={() => setBannerIdx(dot)}
                  className="rounded-full transition-all cursor-pointer"
                  style={{
                    width: bannerIdx === dot ? '14px' : '5px',
                    height: '5px',
                    backgroundColor:
                      bannerIdx === dot ? palette.primary : palette.border,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* 3. TOP OF WEEK BOOKS SECTION (6 Distinct Card & Grid Designs) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3
              className="text-[17px] font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              Top of Week
            </h3>
            <button
              type="button"
              onClick={onOpenCategory}
              className="text-[13px] font-bold cursor-pointer"
              style={{ color: palette.primary }}
            >
              See all
            </button>
          </div>

          {variant === 'varient_2' ? (
            /* V2: 2-Column Bento Cards with Heart & Rating Chip */
            <div className="grid grid-cols-2 gap-3">
              {books.slice(0, 4).map((book) => {
                const isFav = favoriteBookIds.includes(book.id);
                return (
                  <div
                    key={book.id}
                    onClick={() => handleBookClick(book)}
                    className="p-2.5 cursor-pointer group transition-all hover:-translate-y-0.5"
                    style={cardStyle}
                  >
                    <div className="relative h-[138px] rounded-xl overflow-hidden mb-2">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
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
                    </div>
                    <div className="text-[13px] font-bold truncate">{book.title}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[13px] font-extrabold" style={{ color: palette.primary }}>
                        ${book.price.toFixed(2)}
                      </span>
                      <span className="text-[11px] font-bold flex items-center gap-0.5 text-amber-500">
                        <Star size={11} fill="currentColor" /> {book.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : variant === 'varient_4' ? (
            /* V4: Horizontal Wide Cards with Quick View CTA */
            <div className="space-y-2.5">
              {books.slice(0, 4).map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleBookClick(book)}
                  className="p-3 flex items-center gap-3.5 cursor-pointer transition hover:opacity-95"
                  style={cardStyle}
                >
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-14 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span
                      className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: palette.primarySoft, color: palette.primary }}
                    >
                      {book.category}
                    </span>
                    <div className="text-[14px] font-extrabold truncate mt-1">
                      {book.title}
                    </div>
                    <div className="text-[12px] truncate" style={{ color: palette.textSecondary }}>
                      {book.authorName}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-extrabold" style={{ color: palette.primary }}>
                      ${book.price.toFixed(2)}
                    </div>
                    <span
                      className="inline-flex items-center gap-0.5 text-[11px] font-bold mt-1"
                      style={{ color: palette.textSecondary }}
                    >
                      Details <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* V1 / V3 / V5 / V6 Horizontal Book Rail with Variant Card Styling */
            <div className="flex items-start gap-3.5 overflow-x-auto no-scrollbar pb-1">
              {books.slice(0, 5).map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleBookClick(book)}
                  className="w-[132px] flex-shrink-0 cursor-pointer group p-2 transition-all"
                  style={variant === 'varient_1' ? undefined : cardStyle}
                >
                  <div className="w-full h-[164px] rounded-xl overflow-hidden shadow-xs mb-2 relative">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {variant === 'varient_6' && (
                      <span
                        className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold"
                        style={{ backgroundColor: palette.primary, color: palette.primaryText }}
                      >
                        ★ {book.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <div
                    className="text-[13px] font-bold truncate"
                    style={{ color: palette.textPrimary }}
                  >
                    {book.title}
                  </div>
                  <div
                    className="text-[13px] font-extrabold mt-0.5"
                    style={{ color: palette.primary }}
                  >
                    ${book.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. BEST VENDORS STRIP */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3
              className="text-[17px] font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              Best Vendors
            </h3>
            <button
              type="button"
              onClick={handleVendorsClick}
              className="text-[13px] font-bold cursor-pointer"
              style={{ color: palette.primary }}
            >
              See all
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {vendors.slice(0, 4).map((vendor) => (
              <button
                key={vendor.id}
                type="button"
                onClick={handleVendorsClick}
                className="h-[68px] rounded-xl flex items-center justify-center p-2 text-center cursor-pointer transition hover:opacity-90"
                style={
                  variant === 'varient_1'
                    ? { backgroundColor: palette.surface }
                    : cardStyle
                }
              >
                <span
                  className="text-[11px] font-extrabold leading-tight"
                  style={{ color: vendor.accentColor }}
                >
                  {vendor.shortTag}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 5. AUTHORS STRIP */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3
              className="text-[17px] font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              Authors
            </h3>
            <button
              type="button"
              onClick={handleAuthorsListClick}
              className="text-[13px] font-bold cursor-pointer"
              style={{ color: palette.primary }}
            >
              See all
            </button>
          </div>

          <div className="flex items-start gap-4 overflow-x-auto no-scrollbar pb-1">
            {authors.slice(0, 4).map((author) => (
              <div
                key={author.id}
                onClick={() => handleAuthorClick(author)}
                className="w-[104px] flex-shrink-0 cursor-pointer p-2 text-center"
                style={variant === 'varient_1' ? undefined : cardStyle}
              >
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-[82px] h-[82px] mx-auto rounded-full object-cover mb-2 shadow-xs"
                />
                <div
                  className="text-[13px] font-bold truncate"
                  style={{ color: palette.textPrimary }}
                >
                  {author.name}
                </div>
                <div
                  className="text-[11px] mt-0.5 truncate"
                  style={{ color: palette.textSecondary }}
                >
                  {author.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeVarient1;
