import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Bell, ChevronDown, RotateCcw, Search, X } from 'lucide-react';
import {
  BottomTabBar,
  HomeIndicator,
  PrimaryButton,
  ProductCard,
  ScreenWrapper,
  SearchBar,
  StatusBar,
} from '../../../component';
import {
  useAppDispatch,
  useAppNavigation,
  useAppSelector,
  useTheme,
} from '../../../hooks';
import { useGetProductsQuery } from '../../../store/api/dummyApi';
import { resetFilters, updateFilters } from '../../../store/slices/appSlice';

export interface HomepageViewProps {
  mode?: 'default' | 'filters' | 'permission';
}

const PRICE_PRESETS: { label: string; range: [number, number] }[] = [
  { label: 'All Prices', range: [0, 2000] },
  { label: 'Under $1,250', range: [0, 1250] },
  { label: '$1,250 – $1,550', range: [1250, 1550] },
  { label: '$1,550+', range: [1550, 2000] },
];

export const HomepageView: React.FC<HomepageViewProps> = ({
  mode = 'default',
}) => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const filters = useAppSelector((state) => state.app.filters);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(true);
  const [overlayMode, setOverlayMode] = useState<
    'default' | 'filters' | 'permission'
  >(mode);

  useEffect(() => {
    setOverlayMode(mode);
  }, [mode]);

  const { data: products = [] } = useGetProductsQuery({
    category: selectedCategory,
    search: searchQuery,
    sortBy: filters.sortBy,
    minPrice: filters.priceRange[0],
    maxPrice: filters.priceRange[1],
    size: filters.size,
  });

  const categories = ['All', 'Tshirts', 'Jeans', 'Shoes', 'Hoodies'];
  const sortOptions: (
    | 'Relevance'
    | 'Price: Low - High'
    | 'Price: High - Low'
  )[] = ['Relevance', 'Price: Low - High', 'Price: High - Low'];
  const sizeOptions: ('All' | 'S' | 'M' | 'L')[] = ['All', 'S', 'M', 'L'];

  const hasActiveFilters =
    filters.sortBy !== 'Relevance' ||
    filters.size !== 'All' ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 2000;

  // Calculate slider visual percentages (0 to 2000)
  const leftPercent = Math.max(
    0,
    Math.min(85, Math.round((filters.priceRange[0] / 2000) * 100))
  );
  const rightPercent = Math.max(
    0,
    Math.min(85, Math.round(((2000 - filters.priceRange[1]) / 2000) * 100))
  );

  return (
    <ScreenWrapper preset="grid" showHeader showBottomTab activeTab="Home">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />

        <View style={styles.topHeader}>
          <Text style={[styles.discoverTitle, { color: colors.textPrimary }]}>
            Discover
          </Text>
          <View style={styles.headerRightActions}>
            <TouchableOpacity
              onPress={() => navigateTo('Search', 'varient_1')}
              style={[
                styles.iconActionBtn,
                { backgroundColor: colors.surface },
              ]}
            >
              <Search size={18} color={colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateTo('Notifications', 'varient_1')}
              style={styles.bellBtn}
            >
              <Bell size={24} color={colors.textPrimary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchSection}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={() => setOverlayMode('filters')}
          />
        </View>

        {/* Category Filter Pills */}
        <View style={styles.categoriesWrap}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  activeOpacity={0.8}
                  style={[
                    styles.categoryPill,
                    active
                      ? { backgroundColor: colors.primary }
                      : {
                          backgroundColor: colors.cardBackground,
                          borderWidth: 1,
                          borderColor: colors.border,
                        },
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      {
                        color: active
                          ? colors.primaryText
                          : colors.textPrimary,
                      },
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Active Filter Summary Bar */}
        {(hasActiveFilters || selectedCategory !== 'All' || searchQuery.trim() !== '') && (
          <View style={styles.activeFiltersRow}>
            <Text
              style={[styles.resultsCountText, { color: colors.textSecondary }]}
            >
              Showing {products.length} item{products.length === 1 ? '' : 's'}
              {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
              {filters.size !== 'All' ? ` • Size ${filters.size}` : ''}
              {filters.sortBy !== 'Relevance' ? ` • ${filters.sortBy}` : ''}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                dispatch(resetFilters());
              }}
              style={[
                styles.clearFiltersChip,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <RotateCcw size={12} color={colors.primary} />
              <Text
                style={[styles.clearFiltersText, { color: colors.primary }]}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView
          contentContainerStyle={styles.productGrid}
          showsVerticalScrollIndicator={false}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <View style={styles.emptyWrap}>
              <Text
                style={[styles.emptyTitle, { color: colors.textPrimary }]}
              >
                No Matching Clothes Found
              </Text>
              <Text
                style={[styles.emptySub, { color: colors.textSecondary }]}
              >
                Try selecting a different category, size, or price range.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  dispatch(resetFilters());
                }}
                style={[
                  styles.emptyResetBtn,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text
                  style={[
                    styles.emptyResetBtnText,
                    { color: colors.primaryText },
                  ]}
                >
                  Reset All Filters
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        <BottomTabBar activeTab="Home" />

        {overlayMode === 'filters' && (
          <View
            style={[
              styles.sheetBackdrop,
              { backgroundColor: colors.overlay },
            ]}
          >
            <View
              style={[
                styles.filterSheet,
                { backgroundColor: colors.surfaceElevated },
              ]}
            >
              <View
                style={[
                  styles.sheetGrabber,
                  { backgroundColor: colors.border },
                ]}
              />

              <View style={styles.sheetHeaderRow}>
                <Text
                  style={[styles.sheetTitle, { color: colors.textPrimary }]}
                >
                  Filters
                </Text>
                <View style={styles.sheetHeaderRight}>
                  {hasActiveFilters && (
                    <TouchableOpacity
                      onPress={() => dispatch(resetFilters())}
                      style={[
                        styles.resetSheetBtn,
                        { backgroundColor: colors.surface },
                      ]}
                    >
                      <Text
                        style={[
                          styles.resetSheetBtnText,
                          { color: colors.primary },
                        ]}
                      >
                        Reset
                      </Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={() => setOverlayMode('default')}
                  >
                    <X size={24} color={colors.textPrimary} />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={[
                  styles.sheetDivider,
                  { backgroundColor: colors.divider },
                ]}
              />

              {/* Sort By */}
              <Text
                style={[
                  styles.filterSectionLabel,
                  { color: colors.textPrimary },
                ]}
              >
                Sort By
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.sortPillsRow}
              >
                {sortOptions.map((opt) => {
                  const isSelected = filters.sortBy === opt;
                  return (
                    <TouchableOpacity
                      key={opt}
                      onPress={() => dispatch(updateFilters({ sortBy: opt }))}
                      style={[
                        styles.sortPill,
                        isSelected
                          ? { backgroundColor: colors.primary }
                          : {
                              backgroundColor: colors.cardBackground,
                              borderWidth: 1,
                              borderColor: colors.border,
                            },
                      ]}
                    >
                      <Text
                        style={[
                          styles.sortPillText,
                          {
                            color: isSelected
                              ? colors.primaryText
                              : colors.textPrimary,
                          },
                        ]}
                      >
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <View
                style={[
                  styles.sheetDivider,
                  { backgroundColor: colors.divider },
                ]}
              />

              {/* Price Range */}
              <View style={styles.priceHeaderRow}>
                <Text
                  style={[
                    styles.filterSectionLabel,
                    { color: colors.textPrimary },
                  ]}
                >
                  Price
                </Text>
                <Text
                  style={[
                    styles.priceRangeValue,
                    { color: colors.textSecondary },
                  ]}
                >
                  $ {filters.priceRange[0].toLocaleString()} - ${' '}
                  {filters.priceRange[1].toLocaleString()}
                </Text>
              </View>

              {/* Visual Slider Track */}
              <View style={styles.sliderTrackWrap}>
                <View
                  style={[
                    styles.sliderTrackBg,
                    { backgroundColor: colors.border },
                  ]}
                />
                <View
                  style={[
                    styles.sliderTrackActive,
                    {
                      backgroundColor: colors.primary,
                      left: `${leftPercent}%`,
                      right: `${rightPercent}%`,
                    },
                  ]}
                />
                <TouchableOpacity
                  onPress={() => {
                    const nextMin =
                      filters.priceRange[0] >= 1200
                        ? 0
                        : filters.priceRange[0] + 400;
                    if (nextMin < filters.priceRange[1]) {
                      dispatch(
                        updateFilters({
                          priceRange: [nextMin, filters.priceRange[1]],
                        })
                      );
                    }
                  }}
                  style={[
                    styles.sliderThumb,
                    {
                      left: `${leftPercent}%`,
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.primary,
                    },
                  ]}
                />
                <TouchableOpacity
                  onPress={() => {
                    const nextMax =
                      filters.priceRange[1] <= 1300
                        ? 2000
                        : filters.priceRange[1] - 250;
                    if (nextMax > filters.priceRange[0]) {
                      dispatch(
                        updateFilters({
                          priceRange: [filters.priceRange[0], nextMax],
                        })
                      );
                    }
                  }}
                  style={[
                    styles.sliderThumb,
                    {
                      right: `${rightPercent}%`,
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.primary,
                    },
                  ]}
                />
              </View>

              {/* Interactive Price Range Presets */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.pricePresetsRow}
              >
                {PRICE_PRESETS.map((preset) => {
                  const isCurrentRange =
                    filters.priceRange[0] === preset.range[0] &&
                    filters.priceRange[1] === preset.range[1];
                  return (
                    <TouchableOpacity
                      key={preset.label}
                      onPress={() =>
                        dispatch(updateFilters({ priceRange: preset.range }))
                      }
                      style={[
                        styles.pricePresetChip,
                        isCurrentRange
                          ? { backgroundColor: colors.primary }
                          : {
                              backgroundColor: colors.surface,
                              borderColor: colors.border,
                              borderWidth: 1,
                            },
                      ]}
                    >
                      <Text
                        style={[
                          styles.pricePresetText,
                          {
                            color: isCurrentRange
                              ? colors.primaryText
                              : colors.textPrimary,
                          },
                        ]}
                      >
                        {preset.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <View
                style={[
                  styles.sheetDivider,
                  { backgroundColor: colors.divider },
                ]}
              />

              {/* Size Selector */}
              <View style={styles.sizeRow}>
                <Text
                  style={[
                    styles.filterSectionLabel,
                    { color: colors.textPrimary },
                  ]}
                >
                  Size
                </Text>
                <TouchableOpacity
                  onPress={() => setSizeDropdownOpen((o) => !o)}
                  style={styles.sizeSelector}
                >
                  <Text
                    style={[styles.sizeValue, { color: colors.primary }]}
                  >
                    {filters.size === 'All' ? 'All Sizes' : filters.size}
                  </Text>
                  <ChevronDown size={18} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              {sizeDropdownOpen && (
                <View style={styles.sizePillsRow}>
                  {sizeOptions.map((sz) => {
                    const active = filters.size === sz;
                    return (
                      <TouchableOpacity
                        key={sz}
                        onPress={() => dispatch(updateFilters({ size: sz }))}
                        style={[
                          styles.sizePillBtn,
                          active
                            ? { backgroundColor: colors.primary }
                            : {
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                                borderWidth: 1,
                              },
                        ]}
                      >
                        <Text
                          style={[
                            styles.sizePillText,
                            {
                              color: active
                                ? colors.primaryText
                                : colors.textPrimary,
                            },
                          ]}
                        >
                          {sz === 'All' ? 'All Sizes' : `Size ${sz}`}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}

              <PrimaryButton
                title={`Apply Filters (${products.length} Items)`}
                onPress={() => setOverlayMode('default')}
                style={{ marginTop: 14 }}
              />
              <HomeIndicator />
            </View>
          </View>
        )}

        {overlayMode === 'permission' && (
          <View
            style={[
              styles.iosAlertBackdrop,
              { backgroundColor: colors.overlay },
            ]}
          >
            <View style={styles.iosAlertCard}>
              <View style={styles.iosAlertBody}>
                <Text style={styles.iosAlertTitle}>
                  “App” Would Like To Send You Notifications
                </Text>
                <Text style={styles.iosAlertMessage}>
                  Notifications may include alerts, sounds, and icon badges.
                  These can be configured in Settings.
                </Text>
              </View>
              <View style={styles.iosAlertActions}>
                <TouchableOpacity
                  onPress={() => setOverlayMode('default')}
                  style={styles.iosAlertBtnLeft}
                >
                  <Text style={styles.iosAlertBtnTextRegular}>
                    Don’t Allow
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setOverlayMode('default');
                    navigateTo('Notifications', 'varient_1');
                  }}
                  style={styles.iosAlertBtnRight}
                >
                  <Text style={styles.iosAlertBtnTextBold}>Allow</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export const HomepageVarient1: React.FC = () => (
  <HomepageView mode="default" />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  topHeader: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  discoverTitle: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -6,
  },
  searchSection: {
    paddingHorizontal: 24,
    marginBottom: 14,
  },
  categoriesWrap: {
    marginBottom: 12,
  },
  categoriesScroll: {
    paddingHorizontal: 24,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 20,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '600',
  },
  activeFiltersRow: {
    paddingHorizontal: 24,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultsCountText: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  clearFiltersChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  clearFiltersText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  productGrid: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyWrap: {
    width: '100%',
    paddingVertical: 48,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  emptySub: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyResetBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  emptyResetBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  sheetBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 50,
  },
  filterSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  sheetGrabber: {
    width: 64,
    height: 5,
    borderRadius: 99,
    alignSelf: 'center',
    marginBottom: 14,
  },
  sheetHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sheetHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resetSheetBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  resetSheetBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  sheetDivider: {
    height: 1,
    marginVertical: 12,
  },
  filterSectionLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  sortPillsRow: {
    gap: 8,
    marginTop: 10,
  },
  sortPill: {
    paddingHorizontal: 16,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortPillText: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  priceRangeValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  sliderTrackWrap: {
    height: 24,
    justifyContent: 'center',
    position: 'relative',
    marginHorizontal: 4,
    marginBottom: 10,
  },
  sliderTrackBg: {
    height: 4,
    borderRadius: 2,
    width: '100%',
    position: 'absolute',
  },
  sliderTrackActive: {
    height: 4,
    borderRadius: 2,
    position: 'absolute',
  },
  sliderThumb: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
  },
  pricePresetsRow: {
    gap: 8,
    paddingTop: 2,
  },
  pricePresetChip: {
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pricePresetText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sizeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sizeValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  sizePillsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  sizePillBtn: {
    flex: 1,
    height: 36,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizePillText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  iosAlertBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 48,
    zIndex: 60,
  },
  iosAlertCard: {
    width: '100%',
    backgroundColor: 'rgba(245,245,245,0.96)',
    borderRadius: 14,
    overflow: 'hidden',
  },
  iosAlertBody: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: 'center',
  },
  iosAlertTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 6,
  },
  iosAlertMessage: {
    fontSize: 13,
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 18,
  },
  iosAlertActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB',
    height: 44,
  },
  iosAlertBtnLeft: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iosAlertBtnRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iosAlertBtnTextRegular: {
    fontSize: 17,
    color: '#007AFF',
  },
  iosAlertBtnTextBold: {
    fontSize: 17,
    fontWeight: '600',
    color: '#007AFF',
  },
});

export default HomepageVarient1;
