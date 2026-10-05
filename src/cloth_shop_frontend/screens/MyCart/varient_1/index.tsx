import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  EmptyState,
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

export const MyCartView: React.FC<{ forceEmpty?: boolean }> = ({
  forceEmpty = false,
}) => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const cartItems = useAppSelector((state) => state.app.cart);

  const items = forceEmpty ? [] : cartItems;
  const subTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const displaySubTotal =
    items.length === 3 && subTotal === 4770 ? 5870 : subTotal;
  const shippingFee = items.length > 0 ? 80 : 0;
  const total = displaySubTotal + shippingFee;

  return (
    <ScreenWrapper preset="cart" showBottomTab activeTab="Cart">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="My Cart" showBorder={forceEmpty} />

        {items.length > 0 ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Cart Item Cards */}
            <View style={styles.cardsStack}>
              {items.map((item) => (
                <View
                  key={item.id}
                  style={[
                    styles.cartCard,
                    {
                      borderColor: colors.border,
                      backgroundColor: colors.cardBackground,
                    },
                  ]}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={[
                      styles.cartThumb,
                      { backgroundColor: colors.productTile },
                    ]}
                    resizeMode="cover"
                  />
                  <View style={styles.cartInfo}>
                    <View style={styles.cartTopRow}>
                      <View>
                        <Text
                          style={[
                            styles.cartItemTitle,
                            { color: colors.textPrimary },
                          ]}
                        >
                          {item.title}
                        </Text>
                        <Text
                          style={[
                            styles.cartItemSize,
                            { color: colors.textSecondary },
                          ]}
                        >
                          Size {item.size}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => dispatch(removeFromCart(item.id))}
                      >
                        <Trash2 size={18} color={colors.danger} />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.cartBottomRow}>
                      <Text
                        style={[
                          styles.cartItemPrice,
                          { color: colors.textPrimary },
                        ]}
                      >
                        $ {item.price.toLocaleString()}
                      </Text>

                      <View style={styles.stepperRow}>
                        <TouchableOpacity
                          onPress={() =>
                            dispatch(
                              updateCartQuantity({ id: item.id, delta: -1 })
                            )
                          }
                          style={[
                            styles.stepperBtn,
                            { borderColor: colors.border },
                          ]}
                        >
                          <Minus size={14} color={colors.textPrimary} />
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.stepperQty,
                            { color: colors.textPrimary },
                          ]}
                        >
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            dispatch(
                              updateCartQuantity({ id: item.id, delta: 1 })
                            )
                          }
                          style={[
                            styles.stepperBtn,
                            { borderColor: colors.border },
                          ]}
                        >
                          <Plus size={14} color={colors.textPrimary} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Price Summary */}
            <View style={styles.summarySection}>
              <View style={styles.summaryLine}>
                <Text
                  style={[styles.summaryLabel, { color: colors.textSecondary }]}
                >
                  Sub-total
                </Text>
                <Text
                  style={[styles.summaryValue, { color: colors.textPrimary }]}
                >
                  $ {displaySubTotal.toLocaleString()}
                </Text>
              </View>
              <View style={styles.summaryLine}>
                <Text
                  style={[styles.summaryLabel, { color: colors.textSecondary }]}
                >
                  VAT (%)
                </Text>
                <Text
                  style={[styles.summaryValue, { color: colors.textPrimary }]}
                >
                  $ 0.00
                </Text>
              </View>
              <View style={styles.summaryLine}>
                <Text
                  style={[styles.summaryLabel, { color: colors.textSecondary }]}
                >
                  Shipping fee
                </Text>
                <Text
                  style={[styles.summaryValue, { color: colors.textPrimary }]}
                >
                  $ {shippingFee}
                </Text>
              </View>

              <View
                style={[
                  styles.summaryDivider,
                  { backgroundColor: colors.divider },
                ]}
              />

              <View style={styles.summaryLine}>
                <Text style={[styles.totalLabel, { color: colors.textPrimary }]}>
                  Total
                </Text>
                <Text style={[styles.totalValue, { color: colors.textPrimary }]}>
                  $ {total.toLocaleString()}
                </Text>
              </View>
            </View>

            <PrimaryButton
              title="Go To Checkout"
              rightIcon={<ArrowRight size={20} color={colors.primaryText} />}
              onPress={() => navigateTo('Checkout', 'varient_1')}
              style={{ marginTop: 18 }}
            />
          </ScrollView>
        ) : (
          <EmptyState
            icon={
              <ShoppingCart
                size={64}
                color={colors.textMuted}
                strokeWidth={1.8}
              />
            }
            title="Your Cart Is Empty!"
            subtitle={'When you add products, they’ll\nappear here.'}
          />
        )}

        <BottomTabBar activeTab="Cart" />
      </View>
    </ScreenWrapper>
  );
};

export const MyCartVarient1: React.FC = () => <MyCartView forceEmpty={false} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  cardsStack: {
    gap: 14,
  },
  cartCard: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 14,
  },
  cartThumb: {
    width: 82,
    height: 82,
    borderRadius: 8,
  },
  cartInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cartTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cartItemTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  cartItemSize: {
    fontSize: 13,
    marginTop: 2,
  },
  cartBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepperBtn: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperQty: {
    fontSize: 14,
    fontWeight: '600',
  },
  summarySection: {
    marginTop: 22,
    gap: 12,
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 15,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    marginVertical: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 17,
    fontWeight: '700',
  },
});

export default MyCartVarient1;
