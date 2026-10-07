import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import {
  AuthorItem,
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface AuthorsVarient1Props {
  variant?: BookStoreVariantId;
  onBack?: () => void;
  onOpenSearch?: () => void;
  onSelectAuthor?: (author: AuthorItem) => void;
}

const AUTHOR_TABS = [
  'All',
  'Poets',
  'Playwrights',
  'Novelists',
  'Journalist',
] as const;

export const AuthorsVarient1: React.FC<AuthorsVarient1Props> = ({
  variant = 'varient_1',
  onBack,
  onOpenSearch,
  onSelectAuthor,
}) => {
  const {
    palette,
    activeFont,
    isDark,
    colorPresetId,
    authors,
    setSelectedAuthor,
  } = useBookStoreDesignSystem();
  const [selectedTab, setSelectedTab] = useState<string>('All');
  const cardStyle = getBookStoreVariantCardStyle(variant, palette);

  const filteredAuthors =
    selectedTab === 'All'
      ? authors
      : authors.filter((a) =>
          selectedTab === 'Novelists'
            ? a.role === 'Novelist'
            : a.role === selectedTab
        );

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
        <button
          type="button"
          onClick={onOpenSearch}
          className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
          style={{ color: palette.textPrimary }}
        >
          <Search size={20} />
        </button>
      </div>

      {/* Subheader */}
      <div>
        <p
          className="text-[13px] font-medium"
          style={{ color: palette.textSecondary }}
        >
          Check the authors
        </p>
        <h2
          className="text-[22px] font-extrabold mt-0.5"
          style={{ color: palette.primary }}
        >
          Authors
        </h2>
      </div>

      {/* Role Filter Tabs */}
      <div
        className="flex items-center gap-5 overflow-x-auto no-scrollbar border-b pb-2"
        style={{ borderColor: palette.border }}
      >
        {AUTHOR_TABS.map((tab) => {
          const active = selectedTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedTab(tab)}
              className="text-[14px] whitespace-nowrap pb-1 relative cursor-pointer transition"
              style={{
                color: active ? palette.textPrimary : palette.textSecondary,
                fontWeight: active ? 800 : 500,
              }}
            >
              {tab}
              {active && (
                <span
                  className="absolute bottom-[-9px] left-0 right-0 h-[2.5px] rounded-full"
                  style={{ backgroundColor: palette.primary }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Authors List / Grid (Variant-aware) */}
      <div
        className={
          variant === 'varient_2' || variant === 'varient_6'
            ? 'grid grid-cols-2 gap-3.5 pt-1'
            : 'space-y-3.5 pt-1'
        }
      >
        {filteredAuthors.map((author) => (
          <div
            key={author.id}
            onClick={() => {
              setSelectedAuthor(author);
              onSelectAuthor?.(author);
            }}
            className={`cursor-pointer group ${
              variant === 'varient_2' || variant === 'varient_6'
                ? 'p-3 flex flex-col items-center text-center space-y-2'
                : variant === 'varient_1'
                ? 'flex items-center gap-3.5'
                : 'p-3 flex items-center gap-3.5'
            }`}
            style={variant === 'varient_1' ? undefined : cardStyle}
          >
            <img
              src={author.avatar}
              alt={author.name}
              className="w-[62px] h-[62px] rounded-full object-cover flex-shrink-0 shadow-xs"
            />
            <div className="min-w-0 flex-1">
              <h3
                className="text-[15px] font-extrabold group-hover:underline truncate"
                style={{ color: palette.textPrimary }}
              >
                {author.name}
              </h3>
              <p
                className="text-[12px] line-clamp-2 mt-0.5 leading-snug"
                style={{ color: palette.textSecondary }}
              >
                {author.shortBio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorsVarient1;
