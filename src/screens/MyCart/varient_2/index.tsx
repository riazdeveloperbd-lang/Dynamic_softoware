import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ArrowRight,
  Gift,
  Minus,
  Plus,
  Trash2,
  Truck,
} from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
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
import {
  removeFromCart,
  updateCartQuantity,
} from '../../../store/slices/appSlice';

export const MyCartVarient2: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const cartItems = useAppSelector((s) => s.app.cart);

  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <ScreenWrapper preset="cart" showBottomTab activeTab="Cart">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Shopping Bag" showBorder={false} />

        {/* Free Express Shipping Progress Strip */}
        <View
          style={[
            styles.shippingMeter,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.meterTopRow}>
            <Truck size={16} color={colors.success} />
            <Text style={[styles.meterTitle, { color: colors.textPrimary }]}>
              Unlocked Free Express Courier + Complimentary Gift Wrap!
            </Text>
          </View>
          <View
            style={[styles.meterBarBg, { backgroundColor: colors.border }]}
          >
            <View
              style={[
                styles.meterBarFill,
                { backgroundColor: colors.success },
              ]}
            />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.itemsStack}>
            {cartItems.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.compactRow,
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

                <View style={{ flex: 1, gap: 4 }}>
                  <Text
                    style={[styles.itemTitle, { color: colors.textPrimary }]}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[styles.itemMeta, { color: colors.textSecondary }]}
                  >
                    Size {item.size} • Ready to Ship
                  </Text>
                  <Text
                    style={[styles.itemPrice, { color: colors.textPrimary }]}
                  >
                    $ {(item.price * item.quantity).toLocaleString()}
                  </Text>
                </View>

                <View style={styles.rightCol}>
                  <TouchableOpacity
                    onPress={() => dispatch(removeFromCart(item.id))}
                  >
                    <Trash2 size={16} color={colors.textMuted} />
                  </TouchableOpacity>

                  <View
                    style={[
                      styles.pillStepper,
                      {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        dispatch(
                          updateCartQuantity({ id: item.id, delta: -1 })
                        )
                      }
                      style={styles.stepTap}
                    >
                      <Minus size={12} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text
                      style={[styles.qtyText, { color: colors.textPrimary }]}
                    >
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        dispatch(
                          updateCartQuantity({ id: item.id, delta: 1 })
                        )
                      }
                      style={styles.stepTap}
                    >
                      <Plus size={12} color={colors.textPrimary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Gift Note Option */}
          <View
            style={[
              styles.giftCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Gift size={18} color={colors.textPrimary} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.giftTitle, { color: colors.textPrimary }]}>
                Studio Signature Gift Box Included
              </Text>
              <Text
                style={[styles.giftSub, { color: colors.textSecondary }]}
              >
                Magnetic matte black box with tissue seal
              </Text>
            </View>
          </View>

          {/* Sticky Summary Card */}
          <View
            style={[
              styles.totalCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.totalRow}>
              <Text
                style={[styles.totalSubLabel, { color: colors.textSecondary }]}
              >
                Estimated Bag Total ({cartItems.length} items)
              </Text>
              <Text
                style={[styles.totalBigVal, { color: colors.textPrimary }]}
              >
                $ {subTotal.toLocaleString()}
              </Text>
            </View>

            <PrimaryButton
              title="Express Checkout"
              rightIcon={<ArrowRight size={18} color={colors.primaryText} />}
              onPress={() => navigateTo('Checkout', 'varient_2')}
              style={{ marginTop: 12 }}
            />
          </View>
        </ScrollView>

        <BottomTabBar activeTab="Cart" />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shippingMeter: {
    marginHorizontal: 24,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
    marginBottom: 14,
  },
  meterTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  meterTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    flex: 1,
  },
  meterBarBg: {
    height: 6,
    borderRadius: 99,
    overflow: 'hidden',
  },
  meterBarFill: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 14,
  },
  itemsStack: {
    gap: 10,
  },
  compactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  thumb: {
    width: 68,
    height: 68,
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  itemMeta: {
    fontSize: 12,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '800',
  },
  rightCol: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 64,
  },
  pillStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 99,
    borderWidth: 1,
    height: 28,
    paddingHorizontal: 6,
    gap: 8,
  },
  stepTap: {
    padding: 2,
  },
  qtyText: {
    fontSize: 13,
    fontWeight: '700',
  },
  giftCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  giftTitle: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  giftSub: {
    fontSize: 12,
    marginTop: 2,
  },
  totalCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalSubLabel: {
    fontSize: 13.5,
    fontWeight: '600',
  },
  totalBigVal: {
    fontSize: 20,
    fontWeight: '800',
  },
});

export default MyCartVarient2;
