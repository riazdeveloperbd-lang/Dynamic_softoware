import React, { useState } from 'react';
import { ArrowLeft, Search, Clock } from 'lucide-react';
import {
  BookItem,
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface SearchVarient1Props {
  variant?: BookStoreVariantId;
  onBack?: () => void;
  onOpenBookDetail?: (book: BookItem) => void;
  onSelectBook?: (book: BookItem) => void;
}

export const SearchVarient1: React.FC<SearchVarient1Props> = ({
  variant = 'varient_1',
  onBack,
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
    recentSearches,
    addRecentSearch,
  } = useBookStoreDesignSystem();

  const [query, setQuery] = useState('');

  const matchedBooks = query.trim()
    ? books.filter(
        (b) =>
          b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.authorName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleBookClick = (book: BookItem) => {
    setSelectedBook(book);
    onSelectBook?.(book);
    onOpenBookDetail?.(book);
  };

  const cardStyle = getBookStoreVariantCardStyle(variant, palette);

  return (
    <div
      className="bookstore-theme-scope min-h-[640px] px-5 pt-3 pb-6 space-y-5 select-none"
      style={getBookStoreThemeScopeStyle(palette, activeFont)}
      data-bookstore-dark={isDark ? 'true' : 'false'}
      data-bookstore-preset={colorPresetId}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
          style={{ color: palette.textPrimary }}
        >
          <ArrowLeft size={20} />
        </button>
        <h1
          className="text-[19px] font-extrabold"
          style={{ color: palette.textPrimary }}
        >
          Search
        </h1>
        <div className="w-9" />
      </div>

      {/* Search Box */}
      <div
        className="h-[48px] px-4 rounded-xl border flex items-center gap-3"
        style={
          variant === 'varient_1'
            ? {
                backgroundColor: palette.inputBackground,
                borderColor: palette.border,
              }
            : cardStyle
        }
      >
        <Search size={19} style={{ color: palette.primary }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && query.trim()) {
              addRecentSearch(query.trim());
            }
          }}
          placeholder="Search books or authors..."
          className="flex-1 bg-transparent text-[14px] focus:outline-none"
          style={{ color: palette.textPrimary }}
        />
      </div>

      {/* Recent Searches or Matching Books */}
      {!query.trim() ? (
        <div className="space-y-4 pt-1">
          <h2
            className="text-[15px] font-extrabold"
            style={{ color: palette.textPrimary }}
          >
            Recent Searches
          </h2>
          <div className="divide-y" style={{ borderColor: palette.border }}>
            {recentSearches.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuery(item)}
                className="w-full py-3.5 text-left text-[14px] font-medium flex items-center gap-2.5 cursor-pointer transition hover:opacity-80"
                style={{ color: palette.textSecondary }}
              >
                <Clock size={14} />
                {item}
              </button>
            ))}
          </div>

          <h2
            className="text-[15px] font-extrabold pt-2"
            style={{ color: palette.textPrimary }}
          >
            Popular Books
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {books.slice(0, 4).map((book) => (
              <div
                key={book.id}
                onClick={() => handleBookClick(book)}
                className={`space-y-2 cursor-pointer ${
                  variant === 'varient_1' ? '' : 'p-2.5'
                }`}
                style={variant === 'varient_1' ? undefined : cardStyle}
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-[170px] rounded-xl object-cover shadow-xs"
                />
                <div
                  className="text-[14px] font-bold truncate"
                  style={{ color: palette.textPrimary }}
                >
                  {book.title}
                </div>
                <div
                  className="text-[13px] font-extrabold"
                  style={{ color: palette.primary }}
                >
                  ${book.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 pt-1">
          {matchedBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => handleBookClick(book)}
              className={`space-y-2 cursor-pointer ${
                variant === 'varient_1' ? '' : 'p-2.5'
              }`}
              style={variant === 'varient_1' ? undefined : cardStyle}
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-[180px] rounded-xl object-cover shadow-xs"
              />
              <div
                className="text-[14px] font-bold truncate"
                style={{ color: palette.textPrimary }}
              >
                {book.title}
              </div>
              <div
                className="text-[13px] font-extrabold"
                style={{ color: palette.primary }}
              >
                ${book.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchVarient1;
