import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ArrowLeft, Heart, ShoppingBag, Star } from 'lucide-react';
import {
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

export const ProductDetailsVarient2: React.FC = () => {
  const dispatch = useAppDispatch();
  const { goBack, navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const selectedId = useAppSelector((s) => s.app.selectedProductId);
  const savedIds = useAppSelector((s) => s.app.savedProductIds);

  const { data: product } = useGetProductByIdQuery(selectedId);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('M');
  const [selectedColor, setSelectedColor] = useState('#1A1A1A');

  if (!product) return null;

  const isSaved = savedIds.includes(product.id);
  const swatches = ['#1A1A1A', '#2B4C7E', '#3D7A74', '#E88B84'];

  return (
    <ScreenWrapper preset="detail" showHeader={false}>
      <View style={styles.container}>
        {/* Full-bleed Lookbook Backdrop */}
        <Image
          source={{ uri: product.image }}
          style={styles.fullBackdropImg}
          resizeMode="cover"
        />

        <View style={styles.topFloatingHeader}>
          <StatusBar />
          <View style={styles.topBarActions}>
            <TouchableOpacity
              onPress={goBack}
              style={[
                styles.circleBtn,
                { backgroundColor: colors.surfaceElevated },
              ]}
            >
              <ArrowLeft size={20} color={colors.textPrimary} />
            </TouchableOpacity>

            <View
              style={[
                styles.editionChip,
                { backgroundColor: colors.surfaceElevated },
              ]}
            >
              <Text
                style={[styles.editionChipText, { color: colors.textPrimary }]}
              >
                ATELIER EDITION
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => dispatch(toggleSavedProduct(product.id))}
              style={[
                styles.circleBtn,
                { backgroundColor: colors.surfaceElevated },
              ]}
            >
              <Heart
                size={20}
                color={isSaved ? colors.danger : colors.textPrimary}
                fill={isSaved ? colors.danger : 'none'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Floating Bottom Editorial Sheet */}
        <View
          style={[
            styles.floatingSheet,
            {
              backgroundColor: colors.surfaceElevated,
              borderColor: colors.border,
            },
          ]}
        >
          <View
            style={[styles.sheetGrabber, { backgroundColor: colors.border }]}
          />

          <View style={styles.titlePriceRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.itemTitle, { color: colors.textPrimary }]}>
                {product.title}
              </Text>
              <TouchableOpacity
                onPress={() => navigateTo('Reviews', 'varient_2')}
                style={styles.ratingInline}
              >
                <Star
                  size={15}
                  color={colors.warning}
                  fill={colors.warning}
                />
                <Text
                  style={[styles.ratingBold, { color: colors.textPrimary }]}
                >
                  {product.rating.toFixed(1)}
                </Text>
                <Text
                  style={[
                    styles.ratingSub,
                    { color: colors.textSecondary },
                  ]}
                >
                  ({product.reviewsCount} verified reviews)
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.priceBadge}>
              <Text style={[styles.priceVal, { color: colors.textPrimary }]}>
                ${product.price.toLocaleString()}
              </Text>
            </View>
          </View>

          <Text style={[styles.descText, { color: colors.textSecondary }]}>
            {product.description}
          </Text>

          {/* Dual Selector Row: Color Swatches + Size Pills */}
          <View style={styles.selectorsRow}>
            <View>
              <Text
                style={[styles.selectorLabel, { color: colors.textSecondary }]}
              >
                COLORWAY
              </Text>
              <View style={styles.swatchesRow}>
                {swatches.map((hex) => (
                  <TouchableOpacity
                    key={hex}
                    onPress={() => setSelectedColor(hex)}
                    style={[
                      styles.swatchOuter,
                      {
                        borderColor:
                          selectedColor === hex
                            ? colors.primary
                            : 'transparent',
                      },
                    ]}
                  >
                    <View
                      style={[styles.swatchDot, { backgroundColor: hex }]}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View>
              <Text
                style={[styles.selectorLabel, { color: colors.textSecondary }]}
              >
                SELECT SIZE
              </Text>
              <View style={styles.sizesRow}>
                {(['S', 'M', 'L'] as const).map((sz) => {
                  const active = selectedSize === sz;
                  return (
                    <TouchableOpacity
                      key={sz}
                      onPress={() => setSelectedSize(sz)}
                      style={[
                        styles.sizeCircle,
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
                          styles.sizeText,
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
            </View>
          </View>

          <PrimaryButton
            title={`Add to Studio Bag • $${product.price.toLocaleString()}`}
            icon={<ShoppingBag size={18} color={colors.primaryText} />}
            onPress={() => {
              dispatch(addToCart({ product, size: selectedSize }));
              navigateTo('MyCart', 'varient_2');
            }}
            style={{ marginTop: 18 }}
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
    justifyContent: 'space-between',
    position: 'relative',
    backgroundColor: '#E5E5E5',
  },
  fullBackdropImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '62%',
    width: '100%',
  },
  topFloatingHeader: {
    zIndex: 10,
  },
  topBarActions: {
    paddingHorizontal: 20,
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  editionChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
  },
  editionChipText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  floatingSheet: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopWidth: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  sheetGrabber: {
    width: 56,
    height: 5,
    borderRadius: 99,
    alignSelf: 'center',
    marginBottom: 14,
  },
  titlePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  ratingInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  ratingBold: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  ratingSub: {
    fontSize: 13,
  },
  priceBadge: {
    paddingTop: 2,
  },
  priceVal: {
    fontSize: 24,
    fontWeight: '800',
  },
  descText: {
    fontSize: 13.5,
    lineHeight: 20,
    marginTop: 12,
  },
  selectorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  selectorLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  swatchesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  swatchOuter: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatchDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  sizesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '700',
  },
});

export default ProductDetailsVarient2;
