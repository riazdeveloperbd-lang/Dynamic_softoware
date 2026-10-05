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
  Award,
  Heart,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from 'lucide-react';
import {
  AppHeader,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import {
  useAppDispatch,
  useAppNavigation,
  useAppSelector,
  useTheme,
} from '../../../hooks';
import { useGetProductByIdQuery } from '../../../store/api/dummyApi';
import { addToCart, toggleSavedProduct } from '../../../store/slices/appSlice';

export const ProductDetailsVarient3: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const selectedId = useAppSelector((s) => s.app.selectedProductId);
  const savedIds = useAppSelector((s) => s.app.savedProductIds);

  const { data: product } = useGetProductByIdQuery(selectedId);
  const [activeTab, setActiveTab] = useState<'Overview' | 'Specs' | 'Shipping'>(
    'Overview'
  );
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('L');

  if (!product) return null;
  const isSaved = savedIds.includes(product.id);

  return (
    <ScreenWrapper preset="detail">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Atelier Dossier" showBorder={false} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Split Gallery + Spec Card */}
          <View style={styles.splitTopRow}>
            <View
              style={[
                styles.mainThumbCard,
                { backgroundColor: colors.productTile },
              ]}
            >
              <Image
                source={{ uri: product.image }}
                style={styles.mainImg}
                resizeMode="cover"
              />
            </View>

            <View style={styles.sideSpecCol}>
              <View
                style={[
                  styles.specMiniBox,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Award size={18} color={colors.textPrimary} />
                <Text
                  style={[styles.specMiniVal, { color: colors.textPrimary }]}
                >
                  320 GSM
                </Text>
                <Text
                  style={[
                    styles.specMiniLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  Heavy Cotton
                </Text>
              </View>

              <View
                style={[
                  styles.specMiniBox,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Ruler size={18} color={colors.textPrimary} />
                <Text
                  style={[styles.specMiniVal, { color: colors.textPrimary }]}
                >
                  Boxy Fit
                </Text>
                <Text
                  style={[
                    styles.specMiniLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  Drop Shoulder
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => dispatch(toggleSavedProduct(product.id))}
                style={[
                  styles.specMiniBox,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Heart
                  size={20}
                  color={isSaved ? colors.danger : colors.textPrimary}
                  fill={isSaved ? colors.danger : 'none'}
                />
                <Text
                  style={[
                    styles.specMiniLabel,
                    { color: colors.textPrimary, marginTop: 4 },
                  ]}
                >
                  {isSaved ? 'Saved' : 'Wishlist'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.titleBlock}>
            <View style={styles.skuRow}>
              <Sparkles size={13} color={colors.warning} />
              <Text style={[styles.skuText, { color: colors.textSecondary }]}>
                SKU #DF-2026-{product.id.toUpperCase()}
              </Text>
            </View>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              {product.title}
            </Text>
          </View>

          {/* Segmented Spec Tabs */}
          <View
            style={[styles.tabsBar, { backgroundColor: colors.surface }]}
          >
            {(['Overview', 'Specs', 'Shipping'] as const).map((tab) => {
              const active = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[
                    styles.tabBtn,
                    active && { backgroundColor: colors.cardBackground },
                  ]}
                >
                  <Text
                    style={[
                      styles.tabBtnText,
                      {
                        color: active
                          ? colors.textPrimary
                          : colors.textSecondary,
                      },
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Dynamic Tab Body */}
          <View
            style={[
              styles.tabContentCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            {activeTab === 'Overview' && (
              <Text style={[styles.tabText, { color: colors.textSecondary }]}>
                {product.description} Pre-shrunk combed organic cotton with reinforced double-needle collar stitching.
              </Text>
            )}
            {activeTab === 'Specs' && (
              <View style={{ gap: 6 }}>
                <Text style={[styles.tabText, { color: colors.textPrimary }]}>
                  • 100% Organic Ring-Spun Cotton (320 GSM)
                </Text>
                <Text style={[styles.tabText, { color: colors.textPrimary }]}>
                  • Custom Ribbed Collar &Dropped Shoulders
                </Text>
                <Text style={[styles.tabText, { color: colors.textPrimary }]}>
                  • Cold Machine Wash Inside Out
                </Text>
              </View>
            )}
            {activeTab === 'Shipping' && (
              <View style={styles.shippingRow}>
                <Truck size={20} color={colors.success} />
                <Text
                  style={[
                    styles.tabText,
                    { flex: 1, color: colors.textPrimary },
                  ]}
                >
                  Complimentary Express Courier Dispatch within 24 hours.
                </Text>
              </View>
            )}
          </View>

          {/* Size Selector Row */}
          <View style={styles.sizeRowWrap}>
            <Text style={[styles.sizeHeading, { color: colors.textPrimary }]}>
              Select Studio Fit Size
            </Text>
            <View style={styles.sizePills}>
              {(['S', 'M', 'L'] as const).map((s) => {
                const active = selectedSize === s;
                return (
                  <TouchableOpacity
                    key={s}
                    onPress={() => setSelectedSize(s)}
                    style={[
                      styles.sizePill,
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
                        styles.sizePillText,
                        {
                          color: active
                            ? colors.primaryText
                            : colors.textPrimary,
                        },
                      ]}
                    >
                      Size {s}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigateTo('Reviews', 'varient_3')}
            style={[
              styles.reviewBanner,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <ShieldCheck size={18} color={colors.success} />
            <Text
              style={[styles.reviewBannerText, { color: colors.textPrimary }]}
            >
              Read {product.reviewsCount} Verified Fit & Fabric Reviews →
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <View
          style={[
            styles.bottomBar,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
            },
          ]}
        >
          <PrimaryButton
            title={`Reserve Now • $${product.price.toLocaleString()}`}
            icon={<ShoppingBag size={18} color={colors.primaryText} />}
            onPress={() => {
              dispatch(addToCart({ product, size: selectedSize }));
              navigateTo('MyCart', 'varient_3');
            }}
          />
          <HomeIndicator />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  splitTopRow: {
    flexDirection: 'row',
    gap: 12,
    height: 230,
  },
  mainThumbCard: {
    flex: 1.5,
    borderRadius: 18,
    overflow: 'hidden',
  },
  mainImg: {
    width: '100%',
    height: '100%',
  },
  sideSpecCol: {
    flex: 1,
    gap: 8,
  },
  specMiniBox: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  specMiniVal: {
    fontSize: 13,
    fontWeight: '800',
    marginTop: 4,
  },
  specMiniLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  titleBlock: {
    marginTop: 16,
    marginBottom: 12,
  },
  skuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  skuText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 2,
  },
  tabsBar: {
    height: 40,
    borderRadius: 10,
    padding: 4,
    flexDirection: 'row',
    marginBottom: 10,
  },
  tabBtn: {
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  tabContentCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  tabText: {
    fontSize: 13.5,
    lineHeight: 20,
  },
  shippingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sizeRowWrap: {
    marginTop: 16,
    gap: 8,
  },
  sizeHeading: {
    fontSize: 14,
    fontWeight: '700',
  },
  sizePills: {
    flexDirection: 'row',
    gap: 10,
  },
  sizePill: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizePillText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  reviewBanner: {
    marginTop: 14,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewBannerText: {
    fontSize: 13,
    fontWeight: '700',
  },
  bottomBar: {
    borderTopWidth: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
});

export default ProductDetailsVarient3;
