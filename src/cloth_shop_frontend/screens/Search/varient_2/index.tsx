import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ArrowUpRight, Flame, Sparkles, TrendingUp } from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  SearchBar,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';
import { useGetProductsQuery } from '../../../store/api/dummyApi';

export const SearchVarient2: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const { data: products = [] } = useGetProductsQuery();
  const [query, setQuery] = useState('');

  const trendingTags = [
    '#HeavyweightTees',
    '#MinimalistPolo',
    '#OversizedFit',
    '#Archive2026',
    '#Monochrome',
    '#OrganicCotton',
  ];

  const visualCategories = [
    { name: 'Graphic Tees', count: '42 items', img: products[0]?.image },
    { name: 'Smart Polos', count: '18 items', img: products[1]?.image },
    { name: 'Gym Tanks', count: '24 items', img: products[2]?.image },
    { name: 'Long Sleeves', count: '31 items', img: products[4]?.image },
  ];

  const filtered = query.trim()
    ? products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 3);

  return (
    <ScreenWrapper preset="grid" showBottomTab activeTab="Search">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Visual Discovery" showBorder={false} />

        <View style={styles.searchBarWrap}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder="Search collections, fabrics, cuts..."
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Trending Hashtags */}
          <View style={styles.sectionHeader}>
            <TrendingUp size={17} color={colors.textPrimary} />
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Trending Studio Tags
            </Text>
          </View>

          <View style={styles.tagsWrap}>
            {trendingTags.map((tag) => (
              <TouchableOpacity
                key={tag}
                onPress={() => setQuery(tag.replace('#', ''))}
                style={[
                  styles.tagChip,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[styles.tagChipText, { color: colors.textPrimary }]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Visual Category Tiles */}
          <View style={[styles.sectionHeader, { marginTop: 20 }]}>
            <Sparkles size={17} color={colors.textPrimary} />
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Browse by Silhouette
            </Text>
          </View>

          <View style={styles.tilesGrid}>
            {visualCategories.map((cat) => (
              <TouchableOpacity
                key={cat.name}
                onPress={() => navigateTo('Homepage', 'varient_2')}
                activeOpacity={0.85}
                style={[
                  styles.catTile,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                {cat.img && (
                  <Image
                    source={{ uri: cat.img }}
                    style={[
                      styles.catTileImg,
                      { backgroundColor: colors.productTile },
                    ]}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.catTileFooter}>
                  <View>
                    <Text
                      style={[
                        styles.catTileName,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {cat.name}
                    </Text>
                    <Text
                      style={[
                        styles.catTileCount,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {cat.count}
                    </Text>
                  </View>
                  <ArrowUpRight size={16} color={colors.textPrimary} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Most Searched Drops */}
          <View style={[styles.sectionHeader, { marginTop: 20 }]}>
            <Flame size={17} color={colors.danger} />
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Most Searched Today
            </Text>
          </View>

          <View style={styles.rankedStack}>
            {filtered.map((item, idx) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigateTo('ProductDetails', 'varient_1', item.id)
                }
                style={[
                  styles.rankedRow,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[styles.rankNum, { color: colors.textSecondary }]}
                >
                  0{idx + 1}
                </Text>
                <Image
                  source={{ uri: item.image }}
                  style={[
                    styles.rankThumb,
                    { backgroundColor: colors.productTile },
                  ]}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.rankTitle, { color: colors.textPrimary }]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.rankPrice,
                      { color: colors.textSecondary },
                    ]}
                  >
                    $ {item.price.toLocaleString()}
                  </Text>
                </View>
                <ArrowUpRight size={18} color={colors.textPrimary} />
              </TouchableOpacity>
            ))}
          </View>
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
  searchBarWrap: {
    paddingHorizontal: 24,
    marginBottom: 14,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    borderWidth: 1,
  },
  tagChipText: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  tilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  catTile: {
    width: '48%',
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  catTileImg: {
    width: '100%',
    height: 110,
  },
  catTileFooter: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  catTileName: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  catTileCount: {
    fontSize: 11.5,
    marginTop: 1,
  },
  rankedStack: {
    gap: 10,
  },
  rankedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  rankNum: {
    fontSize: 14,
    fontWeight: '800',
    width: 24,
  },
  rankThumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  rankTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  rankPrice: {
    fontSize: 12.5,
    marginTop: 2,
  },
});

export default SearchVarient2;
