import React from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import {
  BookItem,
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface FavoritesVarient1Props {
  variant?: BookStoreVariantId;
  onBack: () => void;
  onSelectBook: (book: BookItem) => void;
}

export const FavoritesVarient1: React.FC<FavoritesVarient1Props> = ({
  variant = 'varient_1',
  onBack,
  onSelectBook,
}) => {
  const {
    palette,
    activeFont,
    books,
    favoriteBookIds,
    toggleFavoriteBook,
    setSelectedBook,
  } = useBookStoreDesignSystem();
  const scopeStyle = getBookStoreThemeScopeStyle(palette, activeFont);
  const cardStyle = getBookStoreVariantCardStyle(variant, palette);

  const favoriteBooks = books.filter((b) => favoriteBookIds.includes(b.id));

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
      {/* Top Bar (9.3 Your Favorites.png) */}
      <div className="flex items-center justify-between py-2.5 mb-2">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center -ml-1.5"
          style={{ color: palette.textPrimary }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-[18px] font-bold tracking-tight" style={{ fontFamily: activeFont.headingFont }}>
          Your Favorites
        </h1>
        <div className="w-9" />
      </div>

      {/* Favorites List */}
      <div className="divide-y" style={{ borderColor: palette.border }}>
        {(favoriteBooks.length > 0 ? favoriteBooks : books.slice(0, 4)).map((book) => {
          const isFav = favoriteBookIds.includes(book.id);
          return (
            <div
              key={book.id}
              className={`py-4 flex items-center justify-between gap-3.5 ${
                variant === 'varient_1' ? '' : 'px-3.5 my-2'
              }`}
              style={variant === 'varient_1' ? undefined : cardStyle}
            >
              <button
                onClick={() => {
                  setSelectedBook(book);
                  onSelectBook(book);
                }}
                className="flex items-center gap-3.5 flex-1 text-left min-w-0"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-16 h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold truncate">{book.title}</h3>
                  <p
                    className="text-[14px] font-bold mt-1"
                    style={{ color: palette.primary }}
                  >
                    ${book.price.toFixed(2)}
                  </p>
                </div>
              </button>

              <button
                onClick={() => toggleFavoriteBook(book.id)}
                className="w-9 h-9 rounded-full flex items-center justify-center"
              >
                <Heart
                  className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`}
                  style={{ color: palette.primary }}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritesVarient1;
