import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Check, ShieldCheck, ShoppingBag, Sparkles, Star } from 'lucide-react';
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

export const ProductDetailsVarient4: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const selectedId = useAppSelector((s) => s.app.selectedProductId);
  const { data: product } = useGetProductByIdQuery(selectedId);

  if (!product) return null;

  return (
    <ScreenWrapper preset="detail">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Atelier Comparison" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.splitCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <Image
              source={{ uri: product.image }}
              style={[
                styles.heroThumb,
                { backgroundColor: colors.productTile },
              ]}
              resizeMode="cover"
            />
            <View style={{ flex: 1, gap: 6 }}>
              <View
                style={[styles.badge, { backgroundColor: colors.primary }]}
              >
                <Sparkles size={11} color={colors.primaryText} />
                <Text style={[styles.badgeText, { color: colors.primaryText }]}>
                  LIMITED EDITION
                </Text>
              </View>
              <Text style={[styles.title, { color: colors.textPrimary }]}>
                {product.title}
              </Text>
              <Text style={[styles.price, { color: colors.primary }]}>
                ${product.price.toLocaleString()}
              </Text>
              <View style={styles.ratingRow}>
                <Star size={14} color="#FFA928" fill="#FFA928" />
                <Text
                  style={[styles.ratingText, { color: colors.textSecondary }]}
                >
                  {product.rating} ({product.reviewsCount} verified)
                </Text>
              </View>
            </View>
          </View>

          {/* Fit & Craftsmanship Matrix */}
          <View
            style={[
              styles.specCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            {[
              'Heavyweight 320GSM Combed Jersey',
              'Pre-shrunk Tailored Shoulder Seam',
              'Complimentary Express Courier & Returns',
            ].map((spec) => (
              <View key={spec} style={styles.specRow}>
                <Check size={15} color={colors.primary} />
                <Text style={[styles.specText, { color: colors.textPrimary }]}>
                  {spec}
                </Text>
              </View>
            ))}
          </View>

          <View
            style={[
              styles.authBox,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.primary,
              },
            ]}
          >
            <ShieldCheck size={20} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.authTitle, { color: colors.textPrimary }]}>
                NFC Digital Authenticity Certificate
              </Text>
              <Text style={[styles.authSub, { color: colors.textSecondary }]}>
                Embedded in garment care label
              </Text>
            </View>
          </View>

          <PrimaryButton
            title={`Add to Bag • $${product.price.toLocaleString()}`}
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
    paddingTop: 10,
    paddingBottom: 24,
    gap: 16,
  },
  splitCard: {
    flexDirection: 'row',
    gap: 14,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
  },
  heroThumb: {
    width: 110,
    height: 130,
    borderRadius: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 9.5,
    fontWeight: '800',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ratingText: {
    fontSize: 12,
  },
  specCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  specText: {
    fontSize: 13,
    fontWeight: '600',
  },
  authBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 14,
  },
  authTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  authSub: {
    fontSize: 11.5,
    marginTop: 2,
  },
});

export default ProductDetailsVarient4;
