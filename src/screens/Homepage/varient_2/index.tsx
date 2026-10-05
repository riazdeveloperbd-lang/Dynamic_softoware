import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ArrowUpRight,
  Bell,
  Flame,
  Heart,
  Search,
  Sparkles,
} from 'lucide-react';
import { IMAGES } from '../../../assets';
import { BottomTabBar, ScreenWrapper, StatusBar } from '../../../component';
import {
  useAppDispatch,
  useAppNavigation,
  useAppSelector,
  useTheme,
} from '../../../hooks';
import { useGetProductsQuery } from '../../../store/api/dummyApi';
import { toggleSavedProduct } from '../../../store/slices/appSlice';

export const HomepageVarient2: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors, isDark } = useTheme();
  const filters = useAppSelector((s) => s.app.filters);
  const savedIds = useAppSelector((s) => s.app.savedProductIds);
  const [activeCollection, setActiveCollection] = useState('All');

  const collections = ['All', 'Tshirts', 'Jeans', 'Shoes', 'Hoodies'];

  const { data: products = [] } = useGetProductsQuery({
    category: activeCollection,
    sortBy: filters.sortBy,
    minPrice: filters.priceRange[0],
    maxPrice: filters.priceRange[1],
    size: filters.size,
  });

  return (
    <ScreenWrapper preset="hero" showHeader showBottomTab activeTab="Home">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />

        {/* Editorial Top Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.kicker, { color: colors.textSecondary }]}>
              EDITORIAL ATELIER
            </Text>
            <Text style={[styles.brandTitle, { color: colors.textPrimary }]}>
              DEFINE LOOKBOOK
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={() => navigateTo('Search', 'varient_2')}
              style={[
                styles.circleBtn,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Search size={19} color={colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateTo('Notifications', 'varient_2')}
              style={[
                styles.circleBtn,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Bell size={19} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Spotlight Banner */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              navigateTo('ProductDetails', 'varient_2', 'prod-1')
            }
            style={[
              styles.heroBanner,
              { backgroundColor: isDark ? '#1E1E22' : '#18181B' },
            ]}
          >
            <Image
              source={{ uri: IMAGES.onboardingModel }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay}>
              <View style={styles.dropChip}>
                <Sparkles size={12} color="#FFA928" />
                <Text style={styles.dropChipText}>LIMITED CAPSULE 04</Text>
              </View>
              <View>
                <Text style={styles.heroBannerTitle}>
                  Minimalist{'\n'}Street Silhouettes
                </Text>
                <View style={styles.shopNowBtn}>
                  <Text style={styles.shopNowText}>Explore Lookbook</Text>
                  <ArrowUpRight size={16} color="#1A1A1A" />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Horizontal Capsule Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsRow}
          >
            {collections.map((col) => {
              const active = activeCollection === col;
              return (
                <TouchableOpacity
                  key={col}
                  onPress={() => setActiveCollection(col)}
                  style={[
                    styles.tabChip,
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
                      styles.tabChipText,
                      {
                        color: active
                          ? colors.primaryText
                          : colors.textPrimary,
                      },
                    ]}
                  >
                    {col}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Horizontal Featured Carousel */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Flame size={18} color={colors.danger} />
              <Text
                style={[styles.sectionTitle, { color: colors.textPrimary }]}
              >
                Trending Editorial Picks
              </Text>
            </View>
            <Text style={[styles.seeAll, { color: colors.textSecondary }]}>
              Swipe →
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselScroll}
          >
            {products.slice(0, 4).map((item) => {
              const saved = savedIds.includes(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.88}
                  onPress={() =>
                    navigateTo('ProductDetails', 'varient_2', item.id)
                  }
                  style={[
                    styles.editorialCard,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.editorialImgBox,
                      { backgroundColor: colors.productTile },
                    ]}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={styles.editorialImg}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      onPress={() => dispatch(toggleSavedProduct(item.id))}
                      style={[
                        styles.wishBtn,
                        { backgroundColor: colors.surfaceElevated },
                      ]}
                    >
                      <Heart
                        size={16}
                        color={saved ? colors.danger : colors.textPrimary}
                        fill={saved ? colors.danger : 'none'}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.editorialMeta}>
                    <Text
                      style={[
                        styles.editorialItemTitle,
                        { color: colors.textPrimary },
                      ]}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        styles.editorialItemPrice,
                        { color: colors.textSecondary },
                      ]}
                    >
                      $ {item.price.toLocaleString()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Wide Curated List Cards */}
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textPrimary,
                paddingHorizontal: 24,
                marginTop: 18,
                marginBottom: 10,
              },
            ]}
          >
            Curated Studio Essentials
          </Text>

          <View style={styles.wideStack}>
            {products.slice(2, 6).map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigateTo('ProductDetails', 'varient_2', item.id)
                }
                activeOpacity={0.85}
                style={[
                  styles.wideCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={[
                    styles.wideThumb,
                    { backgroundColor: colors.productTile },
                  ]}
                  resizeMode="cover"
                />
                <View style={{ flex: 1, gap: 4 }}>
                  <Text
                    style={[
                      styles.wideBadge,
                      { color: colors.textSecondary },
                    ]}
                  >
                    ORGANIC COTTON • {item.category.toUpperCase()}
                  </Text>
                  <Text
                    style={[styles.wideTitle, { color: colors.textPrimary }]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[styles.widePrice, { color: colors.textPrimary }]}
                  >
                    $ {item.price.toLocaleString()}
                  </Text>
                </View>
                <View
                  style={[
                    styles.arrowBox,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  <ArrowUpRight size={18} color={colors.textPrimary} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <BottomTabBar activeTab="Home" />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kicker: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  heroBanner: {
    marginHorizontal: 24,
    height: 210,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    position: 'absolute',
    right: -10,
    bottom: 0,
    width: '62%',
    height: '100%',
  },
  heroOverlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  dropChip: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 99,
  },
  dropChipText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  heroBannerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 28,
  },
  shopNowBtn: {
    alignSelf: 'flex-start',
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 99,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shopNowText: {
    color: '#1A1A1A',
    fontSize: 12.5,
    fontWeight: '700',
  },
  tabsRow: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    gap: 8,
  },
  tabChip: {
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabChipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  seeAll: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  carouselScroll: {
    paddingHorizontal: 24,
    gap: 14,
  },
  editorialCard: {
    width: 190,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  editorialImgBox: {
    width: '100%',
    height: 190,
    position: 'relative',
  },
  editorialImg: {
    width: '100%',
    height: '100%',
  },
  wishBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editorialMeta: {
    padding: 12,
  },
  editorialItemTitle: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  editorialItemPrice: {
    fontSize: 13.5,
    fontWeight: '600',
    marginTop: 2,
  },
  wideStack: {
    paddingHorizontal: 24,
    gap: 10,
  },
  wideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  wideThumb: {
    width: 72,
    height: 72,
    borderRadius: 12,
  },
  wideBadge: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  wideTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  widePrice: {
    fontSize: 14.5,
    fontWeight: '800',
  },
  arrowBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomepageVarient2;
