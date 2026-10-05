import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Palette, Plus, Sparkles, Star } from 'lucide-react';
import {
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import {
  useAppDispatch,
  useAppNavigation,
  useTheme,
} from '../../../hooks';
import { useGetProductsQuery } from '../../../store/api/dummyApi';
import { addToCart } from '../../../store/slices/appSlice';

export const HomepageVarient5: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const { data: products = [] } = useGetProductsQuery();
  const [mood, setMood] = useState<'Streetwear' | 'Atelier' | 'Weekend'>(
    'Streetwear'
  );

  return (
    <ScreenWrapper preset="grid" showBottomTab activeTab="Home">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />

        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>
              CURATED FOR CODY FISHER
            </Text>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Stylist & Outfit Builder
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigateTo('Account', 'varient_4')}
            style={[styles.themeBtn, { backgroundColor: colors.primary }]}
          >
            <Palette size={16} color={colors.primaryText} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Occasion / Style Mood Selector */}
          <View style={styles.moodRow}>
            {(['Streetwear', 'Atelier', 'Weekend'] as const).map((m) => {
              const active = mood === m;
              return (
                <TouchableOpacity
                  key={m}
                  onPress={() => setMood(m)}
                  style={[
                    styles.moodChip,
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
                      styles.moodText,
                      {
                        color: active ? colors.primaryText : colors.textPrimary,
                      },
                    ]}
                  >
                    {m} Edit
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Complete Look Bundle Banner */}
          {products.length >= 2 && (
            <View
              style={[
                styles.bundleCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.primary,
                },
              ]}
            >
              <View style={styles.bundleTop}>
                <View style={styles.bundleTag}>
                  <Sparkles size={13} color={colors.primary} />
                  <Text
                    style={[styles.bundleTagText, { color: colors.primary }]}
                  >
                    {mood.toUpperCase()} CAPSULE DUO • SAVE 15%
                  </Text>
                </View>
              </View>

              <View style={styles.duoRow}>
                {products.slice(0, 2).map((p) => (
                  <TouchableOpacity
                    key={p.id}
                    onPress={() =>
                      navigateTo('ProductDetails', 'varient_2', p.id)
                    }
                    style={[
                      styles.duoItem,
                      {
                        backgroundColor: colors.cardBackground,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Image
                      source={{ uri: p.image }}
                      style={[
                        styles.duoImg,
                        { backgroundColor: colors.productTile },
                      ]}
                      resizeMode="cover"
                    />
                    <Text
                      style={[styles.duoTitle, { color: colors.textPrimary }]}
                      numberOfLines={1}
                    >
                      {p.title}
                    </Text>
                    <Text style={[styles.duoPrice, { color: colors.primary }]}>
                      ${p.price.toLocaleString()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => navigateTo('MyCart', 'varient_3')}
                style={[
                  styles.bundleBtn,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text
                  style={[styles.bundleBtnText, { color: colors.primaryText }]}
                >
                  Shop Complete {mood} Duo
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Individual Stylist Picks */}
          <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
            Top Rated Pieces
          </Text>
          <View style={styles.list}>
            {products.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigateTo('ProductDetails', 'varient_3', item.id)
                }
                style={[
                  styles.rowCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={[
                    styles.rowThumb,
                    { backgroundColor: colors.productTile },
                  ]}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.rowTitle, { color: colors.textPrimary }]}
                  >
                    {item.title}
                  </Text>
                  <View style={styles.ratingLine}>
                    <Star size={12} color="#FFA928" fill="#FFA928" />
                    <Text
                      style={[
                        styles.ratingText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      4.9 • 100% Organic Cotton
                    </Text>
                  </View>
                  <Text style={[styles.rowPrice, { color: colors.primary }]}>
                    ${item.price.toLocaleString()}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    dispatch(
                      addToCart({
                        productId: item.id,
                        title: item.title,
                        size: 'L',
                        price: item.price,
                        image: item.image,
                      })
                    )
                  }
                  style={[styles.plusBtn, { backgroundColor: colors.primary }]}
                >
                  <Plus size={16} color={colors.primaryText} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <BottomTabBar activeTab="Home" />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 21,
    fontWeight: '800',
  },
  themeBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 14,
  },
  moodRow: {
    flexDirection: 'row',
    gap: 8,
  },
  moodChip: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodText: {
    fontSize: 12,
    fontWeight: '700',
  },
  bundleCard: {
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 16,
    gap: 12,
  },
  bundleTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bundleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bundleTagText: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  duoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  duoItem: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 8,
    gap: 4,
  },
  duoImg: {
    width: '100%',
    height: 105,
    borderRadius: 8,
  },
  duoTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  duoPrice: {
    fontSize: 12,
    fontWeight: '800',
  },
  bundleBtn: {
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bundleBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 4,
  },
  list: {
    gap: 10,
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    padding: 10,
  },
  rowThumb: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  ratingLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginVertical: 3,
  },
  ratingText: {
    fontSize: 11,
  },
  rowPrice: {
    fontSize: 13.5,
    fontWeight: '800',
  },
  plusBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomepageVarient5;
