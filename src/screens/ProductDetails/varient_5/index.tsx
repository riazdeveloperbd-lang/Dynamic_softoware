import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ruler, ShoppingBag, Sparkles } from 'lucide-react';
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
import { addToCart } from '../../../store/slices/appSlice';

export const ProductDetailsVarient5: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const selectedId = useAppSelector((s) => s.app.selectedProductId);
  const { data: product } = useGetProductByIdQuery(selectedId);
  const [fitPreference, setFitPreference] = useState<
    'Tailored' | 'Regular' | 'Oversized'
  >('Regular');

  if (!product) return null;

  return (
    <ScreenWrapper preset="detail">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Interactive Size Predictor" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={{ uri: product.image }}
            style={[styles.banner, { backgroundColor: colors.productTile }]}
            resizeMode="cover"
          />

          <View
            style={[
              styles.fitBox,
              {
                backgroundColor: colors.surface,
                borderColor: colors.primary,
              },
            ]}
          >
            <View style={styles.fitHeader}>
              <Ruler size={18} color={colors.primary} />
              <Text style={[styles.fitTitle, { color: colors.textPrimary }]}>
                98% Match for Cody Fisher (Size L)
              </Text>
            </View>
            <Text style={[styles.fitSub, { color: colors.textSecondary }]}>
              Based on your previous Regular Fit Polo purchase.
            </Text>

            <View style={styles.fitPills}>
              {(['Tailored', 'Regular', 'Oversized'] as const).map((fp) => {
                const active = fitPreference === fp;
                return (
                  <TouchableOpacity
                    key={fp}
                    onPress={() => setFitPreference(fp)}
                    style={[
                      styles.fitChip,
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
                        styles.fitChipText,
                        {
                          color: active
                            ? colors.primaryText
                            : colors.textPrimary,
                        },
                      ]}
                    >
                      {fp}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <PrimaryButton
            title={`Reserve Recommended Size L • $${product.price}`}
            icon={<ShoppingBag size={18} color={colors.primaryText} />}
            onPress={() => {
              dispatch(
                addToCart({
                  productId: product.id,
                  title: product.title,
                  size: 'L',
                  price: product.price,
                  image: product.image,
                })
              );
              navigateTo('MyCart', 'varient_1');
            }}
          />
        </ScrollView>
        <HomeIndicator />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 16,
  },
  banner: {
    width: '100%',
    height: 240,
    borderRadius: 18,
  },
  fitBox: {
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 16,
    gap: 10,
  },
  fitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fitTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  fitSub: {
    fontSize: 12,
  },
  fitPills: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  fitChip: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fitChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default ProductDetailsVarient5;
