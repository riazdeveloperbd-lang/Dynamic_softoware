import React from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import {
  BookItem,
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface AuthorDetailVarient1Props {
  variant?: BookStoreVariantId;
  onBack?: () => void;
  onOpenBookDetail?: (book: BookItem) => void;
  onSelectBook?: (book: BookItem) => void;
}

export const AuthorDetailVarient1: React.FC<AuthorDetailVarient1Props> = ({
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
    selectedAuthor,
    books,
    setSelectedBook,
  } = useBookStoreDesignSystem();

  const authorBooks = books.slice(2, 6);
  const cardStyle = getBookStoreVariantCardStyle(variant, palette);

  const handleBookClick = (book: BookItem) => {
    setSelectedBook(book);
    onSelectBook?.(book);
    onOpenBookDetail?.(book);
  };

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
          className="text-[18px] font-extrabold"
          style={{ color: palette.textPrimary }}
        >
          Authors
        </h1>
        <div className="w-9" />
      </div>

      {/* Centered Author Avatar & Rating */}
      <div
        className={`flex flex-col items-center text-center space-y-2 ${
          variant === 'varient_1' ? '' : 'p-4'
        }`}
        style={variant === 'varient_1' ? undefined : cardStyle}
      >
        <img
          src={selectedAuthor.avatar}
          alt={selectedAuthor.name}
          className="w-24 h-24 rounded-full object-cover shadow-md"
        />
        <span
          className="text-[13px] font-medium pt-1"
          style={{ color: palette.textSecondary }}
        >
          {selectedAuthor.role}
        </span>
        <h2
          className="text-[20px] font-extrabold"
          style={{ color: palette.textPrimary }}
        >
          {selectedAuthor.name}
        </h2>
        <div className="flex items-center gap-1.5 pt-1">
          {[1, 2, 3, 4, 5].map((starIdx) => (
            <Star
              key={starIdx}
              size={18}
              fill={starIdx <= 4 ? '#FACC15' : '#1E293B'}
              color={starIdx <= 4 ? '#FACC15' : '#1E293B'}
            />
          ))}
          <span
            className="text-[14px] font-bold ml-1"
            style={{ color: palette.textPrimary }}
          >
            ({selectedAuthor.rating.toFixed(1)})
          </span>
        </div>
      </div>

      {/* About Section */}
      <div className="space-y-1.5">
        <h3
          className="text-[16px] font-extrabold"
          style={{ color: palette.textPrimary }}
        >
          About
        </h3>
        <p
          className="text-[13px] leading-relaxed"
          style={{ color: palette.textSecondary }}
        >
          {selectedAuthor.about}
        </p>
      </div>

      {/* Products Grid */}
      <div className="space-y-3 pt-1">
        <h3
          className="text-[16px] font-extrabold"
          style={{ color: palette.textPrimary }}
        >
          Products
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {authorBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => handleBookClick(book)}
              className={`space-y-2 cursor-pointer group ${
                variant === 'varient_1' ? '' : 'p-2.5'
              }`}
              style={variant === 'varient_1' ? undefined : cardStyle}
            >
              <div className="h-[180px] rounded-xl overflow-hidden shadow-xs">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div
                className="text-[14px] font-bold truncate"
                style={{ color: palette.textPrimary }}
              >
                {book.title}
              </div>
              <div
                className="text-[14px] font-extrabold"
                style={{ color: palette.primary }}
              >
                ${book.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorDetailVarient1;
