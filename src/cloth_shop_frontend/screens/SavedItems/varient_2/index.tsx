import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ShoppingBag, Trash2 } from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import {
  useAppDispatch,
  useAppNavigation,
  useAppSelector,
  useTheme,
} from '../../../hooks';
import { useGetProductsQuery } from '../../../store/api/dummyApi';
import { addToCart, toggleSavedProduct } from '../../../store/slices/appSlice';

export const SavedItemsVarient2: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const { data: products = [] } = useGetProductsQuery();
  const savedIds = useAppSelector((s) => s.app.savedProductIds);

  const savedProducts = products.filter((p) => savedIds.includes(p.id));

  return (
    <ScreenWrapper preset="list" showBottomTab activeTab="Saved">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Curated Wishlist" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.summaryBanner,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View>
              <Text
                style={[styles.bannerTitle, { color: colors.textPrimary }]}
              >
                {savedProducts.length} Saved Essentials
              </Text>
              <Text
                style={[styles.bannerSub, { color: colors.textSecondary }]}
              >
                Ready for one-tap bag transfer
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                savedProducts.forEach((p) =>
                  dispatch(addToCart({ product: p, size: 'M' }))
                );
                navigateTo('MyCart', 'varient_1');
              }}
              style={[
                styles.moveAllBtn,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text
                style={[styles.moveAllText, { color: colors.primaryText }]}
              >
                Add All to Bag
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardsStack}>
            {savedProducts.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.88}
                onPress={() =>
                  navigateTo('ProductDetails', 'varient_1', item.id)
                }
                style={[
                  styles.editorialRowCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={[
                    styles.thumb,
                    { backgroundColor: colors.productTile },
                  ]}
                  resizeMode="cover"
                />

                <View style={styles.infoCol}>
                  <View style={styles.topRow}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          styles.itemTitle,
                          { color: colors.textPrimary },
                        ]}
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={[
                          styles.itemMeta,
                          { color: colors.textSecondary },
                        ]}
                      >
                        In Stock • Size M / L
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => dispatch(toggleSavedProduct(item.id))}
                    >
                      <Trash2 size={17} color={colors.textMuted} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.bottomRow}>
                    <Text
                      style={[styles.itemPrice, { color: colors.textPrimary }]}
                    >
                      $ {item.price.toLocaleString()}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        dispatch(addToCart({ product: item, size: 'M' }));
                        navigateTo('MyCart', 'varient_1');
                      }}
                      style={[
                        styles.bagBtn,
                        { backgroundColor: colors.primary },
                      ]}
                    >
                      <ShoppingBag size={14} color={colors.primaryText} />
                      <Text
                        style={[
                          styles.bagBtnText,
                          { color: colors.primaryText },
                        ]}
                      >
                        Move to Bag
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <BottomTabBar activeTab="Saved" />
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
    gap: 14,
  },
  summaryBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  bannerSub: {
    fontSize: 12.5,
    marginTop: 2,
  },
  moveAllBtn: {
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moveAllText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  cardsStack: {
    gap: 12,
  },
  editorialRowCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    gap: 14,
  },
  thumb: {
    width: 92,
    height: 96,
    borderRadius: 12,
  },
  infoCol: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  itemMeta: {
    fontSize: 12.5,
    marginTop: 3,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '800',
  },
  bagBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 8,
  },
  bagBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default SavedItemsVarient2;
