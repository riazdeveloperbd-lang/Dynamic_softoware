import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ArrowUpRight, Palette, Search, ShoppingBag } from 'lucide-react';
import {
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import {
  useAppNavigation,
  useAppSelector,
  useTheme,
} from '../../../hooks';
import { useGetProductsQuery } from '../../../store/api/dummyApi';

export const HomepageVarient6: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors, colorPreset, presets } = useTheme();
  const { data: products = [] } = useGetProductsQuery();
  const cart = useAppSelector((s) => s.app.cart);
  const currentPreset =
    presets.find((p) => p.id === colorPreset) || presets[0];

  const totalItems = cart.reduce((acc, c) => acc + c.quantity, 0);

  return (
    <ScreenWrapper preset="list" showBottomTab activeTab="Home">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />

        {/* Minimalist Boutique Header */}
        <View style={styles.topBar}>
          <Text style={[styles.logo, { color: colors.textPrimary }]}>
            DEFINE®
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => navigateTo('Search', 'varient_2')}
              style={[styles.circleBtn, { backgroundColor: colors.surface }]}
            >
              <Search size={17} color={colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateTo('Account', 'varient_1')}
              style={[styles.circleBtn, { backgroundColor: colors.primary }]}
            >
              <Palette size={17} color={colors.primaryText} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Active Color Theme Pill Banner */}
          <TouchableOpacity
            onPress={() => navigateTo('Account', 'varient_4')}
            style={[
              styles.themePillBanner,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.swatchDot,
                { backgroundColor: currentPreset.swatch },
              ]}
            />
            <Text
              style={[styles.themeBannerText, { color: colors.textPrimary }]}
            >
              Theme: {currentPreset.name} • Tap to change app color
            </Text>
            <ArrowUpRight size={15} color={colors.primary} />
          </TouchableOpacity>

          {/* Compact 3-Column Visual Matrix */}
          <Text style={[styles.secTitle, { color: colors.textPrimary }]}>
            Archive Matrix (06)
          </Text>
          <View style={styles.matrixGrid}>
            {products.map((p, index) => (
              <TouchableOpacity
                key={p.id}
                onPress={() =>
                  navigateTo('ProductDetails', 'varient_1', p.id)
                }
                style={[
                  styles.matrixTile,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Image
                  source={{ uri: p.image }}
                  style={[
                    styles.matrixImg,
                    { backgroundColor: colors.productTile },
                  ]}
                  resizeMode="cover"
                />
                <Text
                  style={[styles.matrixCode, { color: colors.textSecondary }]}
                >
                  #0{index + 1}
                </Text>
                <Text
                  style={[styles.matrixPrice, { color: colors.primary }]}
                >
                  ${p.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Floating Bag Bar Inside Scroll */}
          <TouchableOpacity
            onPress={() => navigateTo('MyCart', 'varient_1')}
            style={[
              styles.bagBanner,
              { backgroundColor: colors.primary },
            ]}
          >
            <View style={styles.bagLeft}>
              <ShoppingBag size={18} color={colors.primaryText} />
              <Text
                style={[styles.bagBannerTitle, { color: colors.primaryText }]}
              >
                {totalItems} Items Reserved in Shopping Bag
              </Text>
            </View>
            <Text style={[styles.bagCta, { color: colors.primaryText }]}>
              Checkout →
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomTabBar activeTab="Home" />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 16,
  },
  themePillBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  swatchDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  themeBannerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  secTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  matrixGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  matrixTile: {
    width: '31.5%',
    borderRadius: 12,
    borderWidth: 1,
    padding: 6,
    alignItems: 'center',
  },
  matrixImg: {
    width: '100%',
    height: 92,
    borderRadius: 8,
    marginBottom: 6,
  },
  matrixCode: {
    fontSize: 10,
    fontWeight: '700',
  },
  matrixPrice: {
    fontSize: 12,
    fontWeight: '800',
  },
  bagBanner: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  bagLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bagBannerTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  bagCta: {
    fontSize: 13,
    fontWeight: '800',
  },
});

export default HomepageVarient6;
