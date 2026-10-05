import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Heart, ShoppingBag, Star } from 'lucide-react';
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

export const ProductDetailsVarient1: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const selectedId = useAppSelector((state) => state.app.selectedProductId);
  const savedIds = useAppSelector((state) => state.app.savedProductIds);

  const { data: product } = useGetProductByIdQuery(selectedId);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('M');

  if (!product) return null;

  const isSaved = savedIds.includes(product.id);

  return (
    <ScreenWrapper preset="detail">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Details" showBorder={false} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.heroImageContainer,
              { backgroundColor: colors.productTile },
            ]}
          >
            <Image
              source={{ uri: product.image }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => dispatch(toggleSavedProduct(product.id))}
              style={[
                styles.heartButton,
                { backgroundColor: colors.surfaceElevated },
              ]}
              activeOpacity={0.8}
            >
              <Heart
                size={24}
                color={isSaved ? colors.danger : colors.textPrimary}
                fill={isSaved ? colors.danger : 'none'}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>

          <Text style={[styles.productTitle, { color: colors.textPrimary }]}>
            {product.title}
          </Text>

          <TouchableOpacity
            onPress={() => navigateTo('Reviews', 'varient_1')}
            style={styles.ratingRow}
            activeOpacity={0.7}
          >
            <Star size={18} color={colors.warning} fill={colors.warning} />
            <Text style={[styles.ratingScore, { color: colors.textPrimary }]}>
              {product.rating.toFixed(1)}/5
            </Text>
            <Text style={[styles.ratingCount, { color: colors.textSecondary }]}>
              ({product.reviewsCount} reviews)
            </Text>
          </TouchableOpacity>

          <Text
            style={[styles.descriptionText, { color: colors.textSecondary }]}
          >
            {product.description}
          </Text>

          <Text style={[styles.sizeHeading, { color: colors.textPrimary }]}>
            Choose size
          </Text>
          <View style={styles.sizeBoxesRow}>
            {(['S', 'M', 'L'] as const).map((sz) => {
              const active = selectedSize === sz;
              return (
                <TouchableOpacity
                  key={sz}
                  onPress={() => setSelectedSize(sz)}
                  style={[
                    styles.sizeBox,
                    active
                      ? {
                          borderColor: colors.primary,
                          backgroundColor: colors.primary,
                        }
                      : {
                          borderColor: colors.border,
                          backgroundColor: colors.cardBackground,
                        },
                  ]}
                >
                  <Text
                    style={[
                      styles.sizeBoxText,
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
        </ScrollView>

        <View
          style={[
            styles.bottomPurchaseBar,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
            },
          ]}
        >
          <View style={styles.bottomRow}>
            <View style={styles.priceColumn}>
              <Text
                style={[styles.priceCaption, { color: colors.textSecondary }]}
              >
                Price
              </Text>
              <Text style={[styles.priceBig, { color: colors.textPrimary }]}>
                $ {product.price.toLocaleString()}
              </Text>
            </View>
            <View style={styles.addBtnWrap}>
              <PrimaryButton
                title="Add to Cart"
                icon={
                  <ShoppingBag
                    size={20}
                    color={colors.primaryText}
                    strokeWidth={2}
                  />
                }
                onPress={() => {
                  dispatch(addToCart({ product, size: selectedSize }));
                  navigateTo('MyCart', 'varient_1');
                }}
              />
            </View>
          </View>
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
  heroImageContainer: {
    width: '100%',
    height: 368,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 46,
    height: 46,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    marginBottom: 12,
  },
  ratingScore: {
    fontSize: 15,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  ratingCount: {
    fontSize: 15,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  sizeHeading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  sizeBoxesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  sizeBox: {
    width: 50,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  sizeBoxText: {
    fontSize: 18,
    fontWeight: '600',
  },
  bottomPurchaseBar: {
    borderTopWidth: 1,
    paddingHorizontal: 24,
    paddingTop: 14,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  priceColumn: {
    justifyContent: 'center',
  },
  priceCaption: {
    fontSize: 13,
  },
  priceBig: {
    fontSize: 24,
    fontWeight: '700',
  },
  addBtnWrap: {
    flex: 1,
  },
});

export default ProductDetailsVarient1;
