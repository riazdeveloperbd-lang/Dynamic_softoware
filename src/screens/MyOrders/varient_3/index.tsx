import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { RotateCcw, Star } from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import {
  useAppDispatch,
  useAppNavigation,
  useTheme,
} from '../../../hooks';
import {
  useGetOrdersQuery,
  useGetProductsQuery,
} from '../../../store/api/dummyApi';
import { addToCart } from '../../../store/slices/appSlice';

export const MyOrdersVarient3: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const { data: orders = [] } = useGetOrdersQuery();
  const { data: products = [] } = useGetProductsQuery();

  const completed = orders.filter((o) => o.status === 'Completed');

  return (
    <ScreenWrapper preset="orders" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Buy Again & Archive" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.spendBanner,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View>
              <Text
                style={[styles.spendTitle, { color: colors.textPrimary }]}
              >
                {completed.length} Delivered Studio Orders
              </Text>
              <Text
                style={[styles.spendSub, { color: colors.textSecondary }]}
              >
                Instant 1-tap reorder in your saved size
              </Text>
            </View>
          </View>

          <View style={styles.gridWrap}>
            {completed.map((ord, idx) => (
              <View
                key={ord.id}
                style={[
                  styles.archiveCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Image
                  source={{ uri: ord.image }}
                  style={[
                    styles.archiveImg,
                    { backgroundColor: colors.productTile },
                  ]}
                  resizeMode="cover"
                />
                <View style={styles.archiveBody}>
                  <Text
                    style={[
                      styles.archiveTitle,
                      { color: colors.textPrimary },
                    ]}
                    numberOfLines={1}
                  >
                    {ord.title}
                  </Text>
                  <View style={styles.metaRow}>
                    <Text
                      style={[
                        styles.archivePrice,
                        { color: colors.textPrimary },
                      ]}
                    >
                      ${ord.price}
                    </Text>
                    <View style={styles.starInline}>
                      <Star
                        size={12}
                        color={colors.warning}
                        fill={colors.warning}
                      />
                      <Text
                        style={[
                          styles.starText,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {ord.rating || '5.0'}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      const prod = products[idx % products.length];
                      if (prod) {
                        dispatch(addToCart({ product: prod, size: ord.size }));
                      }
                      navigateTo('MyCart', 'varient_1');
                    }}
                    style={[
                      styles.reorderBtn,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    <RotateCcw size={13} color={colors.primaryText} />
                    <Text
                      style={[
                        styles.reorderBtnText,
                        { color: colors.primaryText },
                      ]}
                    >
                      Reorder ({ord.size})
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <BottomTabBar activeTab="Account" />
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
  spendBanner: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  spendTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  spendSub: {
    fontSize: 12.5,
    marginTop: 2,
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  archiveCard: {
    width: '48%',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  archiveImg: {
    width: '100%',
    height: 135,
  },
  archiveBody: {
    padding: 10,
    gap: 6,
  },
  archiveTitle: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  archivePrice: {
    fontSize: 14,
    fontWeight: '800',
  },
  starInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  starText: {
    fontSize: 12,
    fontWeight: '700',
  },
  reorderBtn: {
    height: 34,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 2,
  },
  reorderBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default MyOrdersVarient3;
