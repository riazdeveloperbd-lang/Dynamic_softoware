import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Clock,
  Crown,
  Heart,
  Plus,
  ShoppingBag,
  SlidersHorizontal,
  Zap,
} from 'lucide-react';
import { BottomTabBar, ScreenWrapper, StatusBar } from '../../../component';
import {
  useAppDispatch,
  useAppNavigation,
  useAppSelector,
  useTheme,
} from '../../../hooks';
import { useGetProductsQuery } from '../../../store/api/dummyApi';
import { addToCart, toggleSavedProduct } from '../../../store/slices/appSlice';

export const HomepageVarient3: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const filters = useAppSelector((s) => s.app.filters);
  const { data: products = [] } = useGetProductsQuery({
    sortBy: filters.sortBy,
    minPrice: filters.priceRange[0],
    maxPrice: filters.priceRange[1],
    size: filters.size,
  });
  const savedIds = useAppSelector((s) => s.app.savedProductIds);
  const cartCount = useAppSelector((s) =>
    s.app.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <ScreenWrapper preset="grid" showHeader showBottomTab activeTab="Home">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />

        {/* VIP Greeting Bar */}
        <View style={styles.greetingBar}>
          <View style={styles.userLeft}>
            <View
              style={[
                styles.avatarBadge,
                { backgroundColor: colors.primary },
              ]}
            >
              <Crown size={18} color={colors.primaryText} />
            </View>
            <View>
              <Text
                style={[styles.greetingSub, { color: colors.textSecondary }]}
              >
                VIP STUDIO MEMBER
              </Text>
              <Text
                style={[styles.greetingName, { color: colors.textPrimary }]}
              >
                Morning, Cody
              </Text>
            </View>
          </View>

          <View style={styles.rightActions}>
            <TouchableOpacity
              onPress={() => navigateTo('Search', 'varient_3')}
              style={[
                styles.iconBtn,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <SlidersHorizontal size={18} color={colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateTo('MyCart', 'varient_1')}
              style={[
                styles.iconBtn,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <ShoppingBag size={18} color={colors.textPrimary} />
              {cartCount > 0 && (
                <View
                  style={[
                    styles.cartDot,
                    { backgroundColor: colors.danger },
                  ]}
                >
                  <Text style={styles.cartDotText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Flash Drop Countdown Strip */}
          <View
            style={[
              styles.flashBanner,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.flashLeft}>
              <Zap size={18} color={colors.warning} fill={colors.warning} />
              <View>
                <Text
                  style={[styles.flashTitle, { color: colors.textPrimary }]}
                >
                  Flash Studio Drop Live
                </Text>
                <Text
                  style={[styles.flashSub, { color: colors.textSecondary }]}
                >
                  Up to 52% off selected archive tees
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.countdownBox,
                { backgroundColor: colors.primary },
              ]}
            >
              <Clock size={12} color={colors.primaryText} />
              <Text
                style={[styles.countdownText, { color: colors.primaryText }]}
              >
                04:18:52
              </Text>
            </View>
          </View>

          {/* Bento Asymmetric Product Showcase */}
          <View style={styles.bentoColumns}>
            {/* Left Column */}
            <View style={styles.bentoCol}>
              {products
                .filter((_, idx) => idx % 2 === 0)
                .map((product, i) => {
                  const isSaved = savedIds.includes(product.id);
                  const tall = i % 2 === 0;
                  return (
                    <TouchableOpacity
                      key={product.id}
                      activeOpacity={0.88}
                      onPress={() =>
                        navigateTo('ProductDetails', 'varient_3', product.id)
                      }
                      style={[
                        styles.bentoCard,
                        {
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.bentoImgWrap,
                          {
                            height: tall ? 195 : 150,
                            backgroundColor: colors.productTile,
                          },
                        ]}
                      >
                        <Image
                          source={{ uri: product.image }}
                          style={styles.bentoImg}
                          resizeMode="cover"
                        />
                        <TouchableOpacity
                          onPress={() =>
                            dispatch(toggleSavedProduct(product.id))
                          }
                          style={[
                            styles.heartChip,
                            { backgroundColor: colors.surfaceElevated },
                          ]}
                        >
                          <Heart
                            size={15}
                            color={
                              isSaved ? colors.danger : colors.textPrimary
                            }
                            fill={isSaved ? colors.danger : 'none'}
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.bentoInfo}>
                        <Text
                          style={[
                            styles.bentoTitle,
                            { color: colors.textPrimary },
                          ]}
                          numberOfLines={1}
                        >
                          {product.title}
                        </Text>
                        <View style={styles.bentoPriceRow}>
                          <Text
                            style={[
                              styles.bentoPrice,
                              { color: colors.textPrimary },
                            ]}
                          >
                            ${product.price.toLocaleString()}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              dispatch(addToCart({ product, size: 'M' }))
                            }
                            style={[
                              styles.quickAddBtn,
                              { backgroundColor: colors.primary },
                            ]}
                          >
                            <Plus size={14} color={colors.primaryText} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </View>

            {/* Right Column */}
            <View style={styles.bentoCol}>
              {products
                .filter((_, idx) => idx % 2 === 1)
                .map((product, i) => {
                  const isSaved = savedIds.includes(product.id);
                  const tall = i % 2 === 1;
                  return (
                    <TouchableOpacity
                      key={product.id}
                      activeOpacity={0.88}
                      onPress={() =>
                        navigateTo('ProductDetails', 'varient_3', product.id)
                      }
                      style={[
                        styles.bentoCard,
                        {
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.bentoImgWrap,
                          {
                            height: tall ? 195 : 150,
                            backgroundColor: colors.productTile,
                          },
                        ]}
                      >
                        <Image
                          source={{ uri: product.image }}
                          style={styles.bentoImg}
                          resizeMode="cover"
                        />
                        <TouchableOpacity
                          onPress={() =>
                            dispatch(toggleSavedProduct(product.id))
                          }
                          style={[
                            styles.heartChip,
                            { backgroundColor: colors.surfaceElevated },
                          ]}
                        >
                          <Heart
                            size={15}
                            color={
                              isSaved ? colors.danger : colors.textPrimary
                            }
                            fill={isSaved ? colors.danger : 'none'}
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.bentoInfo}>
                        <Text
                          style={[
                            styles.bentoTitle,
                            { color: colors.textPrimary },
                          ]}
                          numberOfLines={1}
                        >
                          {product.title}
                        </Text>
                        <View style={styles.bentoPriceRow}>
                          <Text
                            style={[
                              styles.bentoPrice,
                              { color: colors.textPrimary },
                            ]}
                          >
                            ${product.price.toLocaleString()}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              dispatch(addToCart({ product, size: 'M' }))
                            }
                            style={[
                              styles.quickAddBtn,
                              { backgroundColor: colors.primary },
                            ]}
                          >
                            <Plus size={14} color={colors.primaryText} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </View>
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
  greetingBar: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingSub: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  greetingName: {
    fontSize: 18,
    fontWeight: '800',
  },
  rightActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartDot: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartDotText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  flashBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  flashLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  flashTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  flashSub: {
    fontSize: 12,
    marginTop: 1,
  },
  countdownBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  countdownText: {
    fontSize: 11.5,
    fontWeight: '800',
  },
  bentoColumns: {
    flexDirection: 'row',
    gap: 12,
  },
  bentoCol: {
    flex: 1,
    gap: 12,
  },
  bentoCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  bentoImgWrap: {
    width: '100%',
    position: 'relative',
  },
  bentoImg: {
    width: '100%',
    height: '100%',
  },
  heartChip: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bentoInfo: {
    padding: 10,
    gap: 6,
  },
  bentoTitle: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  bentoPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bentoPrice: {
    fontSize: 14,
    fontWeight: '800',
  },
  quickAddBtn: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomepageVarient3;
