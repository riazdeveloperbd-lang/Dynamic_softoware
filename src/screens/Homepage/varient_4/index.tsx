import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Bell, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import {
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

export const HomepageVarient4: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const { data: products = [] } = useGetProductsQuery();
  const savedIds = useAppSelector((s) => s.app.savedProductIds);
  const [selectedSizes, setSelectedSizes] = useState<
    Record<string, 'S' | 'M' | 'L'>
  >({});

  const getSize = (id: string) => selectedSizes[id] || 'M';

  return (
    <ScreenWrapper preset="hero" showBottomTab activeTab="Home">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />

        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.editionTag, { color: colors.primary }]}>
              RUNWAY ISSUE № 04
            </Text>
            <Text style={[styles.brandTitle, { color: colors.textPrimary }]}>
              Magazine Feed
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={() => navigateTo('Notifications', 'varient_1')}
              style={[styles.iconCircle, { backgroundColor: colors.surface }]}
            >
              <Bell size={18} color={colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateTo('MyCart', 'varient_1')}
              style={[styles.iconCircle, { backgroundColor: colors.primary }]}
            >
              <ShoppingBag size={18} color={colors.primaryText} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Full-Width Magazine Cards with Inline Size Picker & Add to Bag */}
          {products.map((item, idx) => {
            const isSaved = savedIds.includes(item.id);
            const currentSize = getSize(item.id);
            return (
              <View
                key={item.id}
                style={[
                  styles.magCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    navigateTo('ProductDetails', 'varient_1', item.id)
                  }
                  style={[
                    styles.imageBox,
                    { backgroundColor: colors.productTile },
                  ]}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.heroImg}
                    resizeMode="cover"
                  />
                  <View
                    style={[
                      styles.lookNumberBadge,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    <Sparkles size={11} color={colors.primaryText} />
                    <Text
                      style={[
                        styles.lookNumberText,
                        { color: colors.primaryText },
                      ]}
                    >
                      LOOK 0{idx + 1}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => dispatch(toggleSavedProduct(item.id))}
                    style={[
                      styles.heartBtn,
                      { backgroundColor: colors.cardBackground },
                    ]}
                  >
                    <Heart
                      size={18}
                      color={isSaved ? colors.danger : colors.textPrimary}
                      fill={isSaved ? colors.danger : 'none'}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>

                <View style={styles.cardBody}>
                  <View style={styles.titleRow}>
                    <Text
                      style={[styles.prodTitle, { color: colors.textPrimary }]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[styles.prodPrice, { color: colors.primary }]}
                    >
                      ${item.price.toLocaleString()}
                    </Text>
                  </View>

                  <View style={styles.actionFooter}>
                    <View style={styles.sizeRow}>
                      {(['S', 'M', 'L'] as const).map((sz) => {
                        const active = currentSize === sz;
                        return (
                          <TouchableOpacity
                            key={sz}
                            onPress={() =>
                              setSelectedSizes((prev) => ({
                                ...prev,
                                [item.id]: sz,
                              }))
                            }
                            style={[
                              styles.sizeChip,
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
                                styles.sizeChipText,
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

                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          addToCart({
                            productId: item.id,
                            title: item.title,
                            size: currentSize,
                            price: item.price,
                            image: item.image,
                          })
                        );
                        navigateTo('MyCart', 'varient_1');
                      }}
                      style={[
                        styles.quickAddBtn,
                        { backgroundColor: colors.primary },
                      ]}
                    >
                      <ShoppingBag size={14} color={colors.primaryText} />
                      <Text
                        style={[
                          styles.quickAddText,
                          { color: colors.primaryText },
                        ]}
                      >
                        Quick Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <BottomTabBar activeTab="Home" />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editionTag: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 6,
    paddingBottom: 24,
    gap: 18,
  },
  magCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageBox: {
    height: 210,
    width: '100%',
    position: 'relative',
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  lookNumberBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  lookNumberText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  heartBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    padding: 16,
    gap: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prodTitle: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  prodPrice: {
    fontSize: 16,
    fontWeight: '800',
  },
  actionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  sizeChip: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  quickAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    height: 34,
    borderRadius: 10,
  },
  quickAddText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default HomepageVarient4;
