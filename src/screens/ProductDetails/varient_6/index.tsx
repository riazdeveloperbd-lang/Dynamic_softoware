import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { MapPin, ShoppingBag, Zap } from 'lucide-react';
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

export const ProductDetailsVarient6: React.FC = () => {
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
        <AppHeader title="Boutique Stock & Pickup" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.heroBanner,
              { backgroundColor: colors.primary },
            ]}
          >
            <Zap size={16} color={colors.primaryText} />
            <Text style={[styles.heroBannerText, { color: colors.primaryText }]}>
              Ready for 1-Hour Pickup at SoHo Flagship Boutique
            </Text>
          </View>

          <Image
            source={{ uri: product.image }}
            style={[styles.image, { backgroundColor: colors.productTile }]}
            resizeMode="cover"
          />

          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {product.title} — ${product.price}
          </Text>

          {[
            { store: 'SoHo Flagship • 112 Mercer St', status: '3 Left in Size L' },
            { store: 'Fifth Ave Atelier • 590 5th Ave', status: 'In Stock (All Sizes)' },
          ].map((loc) => (
            <View
              key={loc.store}
              style={[
                styles.storeCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <MapPin size={18} color={colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.storeName, { color: colors.textPrimary }]}>
                  {loc.store}
                </Text>
                <Text style={[styles.storeSub, { color: colors.success }]}>
                  ● {loc.status}
                </Text>
              </View>
            </View>
          ))}

          <PrimaryButton
            title="Reserve for Pickup or Delivery"
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
              navigateTo('Checkout', 'varient_1');
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
    gap: 14,
  },
  heroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
  },
  heroBannerText: {
    fontSize: 12,
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: 210,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  storeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  storeName: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  storeSub: {
    fontSize: 11.5,
    fontWeight: '600',
    marginTop: 2,
  },
});

export default ProductDetailsVarient6;
