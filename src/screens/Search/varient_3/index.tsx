import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Check, RotateCcw, SlidersHorizontal, Star } from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  SearchBar,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';
import { useGetProductsQuery } from '../../../store/api/dummyApi';

export const SearchVarient3: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const { data: products = [] } = useGetProductsQuery();

  const [query, setQuery] = useState('Regular Fit');
  const [selectedSize, setSelectedSize] = useState<'All' | 'S' | 'M' | 'L'>('All');
  const [maxPrice, setMaxPrice] = useState<number>(2000);

  const filtered = products.filter(
    (p) =>
      p.price <= maxPrice &&
      (!query.trim() || p.title.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <ScreenWrapper preset="grid" showBottomTab activeTab="Search">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Advanced Catalog Filter" showBorder={false} />

        <View style={styles.searchSection}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder="Filter by keyword..."
          />
        </View>

        {/* Live Faceted Filter Bar */}
        <View
          style={[
            styles.facetPanel,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.facetHeaderRow}>
            <View style={styles.facetTitleLeft}>
              <SlidersHorizontal size={15} color={colors.textPrimary} />
              <Text
                style={[styles.facetHeading, { color: colors.textPrimary }]}
              >
                Quick Facets ({filtered.length} matches)
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setQuery('');
                setSelectedSize('All');
                setMaxPrice(2000);
              }}
              style={styles.resetBtn}
            >
              <RotateCcw size={13} color={colors.textSecondary} />
              <Text
                style={[styles.resetText, { color: colors.textSecondary }]}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.facetRow}>
            <Text style={[styles.facetLabel, { color: colors.textSecondary }]}>
              Size:
            </Text>
            <View style={styles.chipsRow}>
              {(['All', 'S', 'M', 'L'] as const).map((sz) => {
                const active = selectedSize === sz;
                return (
                  <TouchableOpacity
                    key={sz}
                    onPress={() => setSelectedSize(sz)}
                    style={[
                      styles.miniChip,
                      active
                        ? { backgroundColor: colors.primary }
                        : {
                            backgroundColor: colors.cardBackground,
                            borderColor: colors.border,
                            borderWidth: 1,
                          },
                    ]}
                  >
                    <Text
                      style={[
                        styles.miniChipText,
                        {
                          color: active
                            ? colors.primaryText
                            : colors.textPrimary,
                        },
                      ]}
                    >
                      {sz}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              onPress={() => setMaxPrice(maxPrice === 2000 ? 1000 : 2000)}
              style={[
                styles.priceCapChip,
                {
                  backgroundColor:
                    maxPrice === 1000 ? colors.primary : colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              {maxPrice === 1000 && (
                <Check size={12} color={colors.primaryText} />
              )}
              <Text
                style={[
                  styles.miniChipText,
                  {
                    color:
                      maxPrice === 1000
                        ? colors.primaryText
                        : colors.textPrimary,
                  },
                ]}
              >
                Under $1,000
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.resultsGrid}
          showsVerticalScrollIndicator={false}
        >
          {filtered.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigateTo('ProductDetails', 'varient_3', item.id)
              }
              activeOpacity={0.85}
              style={[
                styles.resultCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <Image
                source={{ uri: item.image }}
                style={[
                  styles.resultImg,
                  { backgroundColor: colors.productTile },
                ]}
                resizeMode="cover"
              />
              <View style={styles.resultBody}>
                <Text
                  style={[styles.resultTitle, { color: colors.textPrimary }]}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <View style={styles.metaLine}>
                  <Text
                    style={[styles.resultPrice, { color: colors.textPrimary }]}
                  >
                    ${item.price.toLocaleString()}
                  </Text>
                  <View style={styles.ratingInline}>
                    <Star
                      size={12}
                      color={colors.warning}
                      fill={colors.warning}
                    />
                    <Text
                      style={[
                        styles.ratingNum,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {item.rating.toFixed(1)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <BottomTabBar activeTab="Search" />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSection: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  facetPanel: {
    marginHorizontal: 24,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    gap: 10,
    marginBottom: 14,
  },
  facetHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  facetTitleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  facetHeading: {
    fontSize: 13,
    fontWeight: '700',
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resetText: {
    fontSize: 12,
    fontWeight: '600',
  },
  facetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  facetLabel: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  miniChip: {
    paddingHorizontal: 10,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  priceCapChip: {
    paddingHorizontal: 10,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resultsGrid: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  resultCard: {
    width: '48%',
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  resultImg: {
    width: '100%',
    height: 145,
  },
  resultBody: {
    padding: 10,
    gap: 4,
  },
  resultTitle: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  metaLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultPrice: {
    fontSize: 14,
    fontWeight: '800',
  },
  ratingInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingNum: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default SearchVarient3;
