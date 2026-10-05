import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Banknote, CreditCard, MapPin, Pencil, Tag } from 'lucide-react';
import {
  AppHeader,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
  StatusModal,
} from '../../../component';
import {
  useAppDispatch,
  useAppNavigation,
  useAppSelector,
  useTheme,
} from '../../../hooks';
import {
  useGetAddressesQuery,
  useGetCardsQuery,
} from '../../../store/api/dummyApi';
import { setPaymentType, setPromoCode } from '../../../store/slices/appSlice';

export const CheckoutView: React.FC<{ showSuccessModal?: boolean }> = ({
  showSuccessModal = false,
}) => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();

  const { data: addresses = [] } = useGetAddressesQuery();
  const { data: cards = [] } = useGetCardsQuery();

  const selectedAddressId = useAppSelector((s) => s.app.selectedAddressId);
  const selectedCardId = useAppSelector((s) => s.app.selectedCardId);
  const paymentType = useAppSelector((s) => s.app.paymentType);
  const promoCode = useAppSelector((s) => s.app.promoCode);

  const [modalVisible, setModalVisible] = useState(showSuccessModal);

  useEffect(() => {
    setModalVisible(showSuccessModal);
  }, [showSuccessModal]);

  const currentAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0];
  const currentCard = cards.find((c) => c.id === selectedCardId) || cards[0];

  return (
    <ScreenWrapper preset="cart">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Checkout" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Delivery Address Section */}
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
              Delivery Address
            </Text>
            <TouchableOpacity onPress={() => navigateTo('Address', 'varient_1')}>
              <Text style={[styles.changeLink, { color: colors.textPrimary }]}>
                Change
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.addressDisplayRow}>
            <MapPin
              size={20}
              color={colors.textSecondary}
              style={{ marginTop: 2 }}
            />
            <View style={styles.addressTextCol}>
              <Text
                style={[styles.addressNickname, { color: colors.textPrimary }]}
              >
                {currentAddress?.nickname || 'Home'}
              </Text>
              <Text
                style={[styles.addressFull, { color: colors.textSecondary }]}
              >
                {currentAddress?.fullAddress ||
                  '925 S Chugach St #APT 10, Alaska 99645'}
              </Text>
            </View>
          </View>

          <View
            style={[styles.divider, { backgroundColor: colors.divider }]}
          />

          {/* Payment Method Section */}
          <Text
            style={[
              styles.sectionHeading,
              { marginBottom: 12, color: colors.textPrimary },
            ]}
          >
            Payment Method
          </Text>

          <View style={styles.paymentTabsRow}>
            <TouchableOpacity
              onPress={() => dispatch(setPaymentType('Card'))}
              style={[
                styles.payTabBtn,
                paymentType === 'Card'
                  ? { backgroundColor: colors.primary }
                  : {
                      backgroundColor: colors.cardBackground,
                      borderWidth: 1,
                      borderColor: colors.border,
                    },
              ]}
            >
              <CreditCard
                size={18}
                color={
                  paymentType === 'Card'
                    ? colors.primaryText
                    : colors.textPrimary
                }
              />
              <Text
                style={[
                  styles.payTabText,
                  {
                    color:
                      paymentType === 'Card'
                        ? colors.primaryText
                        : colors.textPrimary,
                  },
                ]}
              >
                Card
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => dispatch(setPaymentType('Cash'))}
              style={[
                styles.payTabBtn,
                paymentType === 'Cash'
                  ? { backgroundColor: colors.primary }
                  : {
                      backgroundColor: colors.cardBackground,
                      borderWidth: 1,
                      borderColor: colors.border,
                    },
              ]}
            >
              <Banknote
                size={18}
                color={
                  paymentType === 'Cash'
                    ? colors.primaryText
                    : colors.textPrimary
                }
              />
              <Text
                style={[
                  styles.payTabText,
                  {
                    color:
                      paymentType === 'Cash'
                        ? colors.primaryText
                        : colors.textPrimary,
                  },
                ]}
              >
                Cash
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => dispatch(setPaymentType('ApplePay'))}
              style={[
                styles.payTabBtn,
                paymentType === 'ApplePay'
                  ? { backgroundColor: colors.primary }
                  : {
                      backgroundColor: colors.cardBackground,
                      borderWidth: 1,
                      borderColor: colors.border,
                    },
              ]}
            >
              <Text
                style={[
                  styles.payTabText,
                  {
                    color:
                      paymentType === 'ApplePay'
                        ? colors.primaryText
                        : colors.textPrimary,
                  },
                ]}
              >
                 Pay
              </Text>
            </TouchableOpacity>
          </View>

          {/* Selected Card Box */}
          <TouchableOpacity
            onPress={() => navigateTo('PaymentMethod', 'varient_1')}
            style={[
              styles.selectedCardBox,
              {
                borderColor: colors.border,
                backgroundColor: colors.cardBackground,
              },
            ]}
            activeOpacity={0.8}
          >
            <View style={styles.cardLeftRow}>
              <Text
                style={[styles.visaWordmark, { color: colors.textPrimary }]}
              >
                {currentCard?.brand || 'VISA'}
              </Text>
              <Text
                style={[styles.maskedCardText, { color: colors.textPrimary }]}
              >
                **** **** **** {currentCard?.last4 || '2512'}
              </Text>
            </View>
            <Pencil size={18} color={colors.textPrimary} />
          </TouchableOpacity>

          <View
            style={[styles.divider, { backgroundColor: colors.divider }]}
          />

          {/* Order Summary Section */}
          <Text
            style={[
              styles.sectionHeading,
              { marginBottom: 14, color: colors.textPrimary },
            ]}
          >
            Order Summary
          </Text>

          <View style={styles.summaryRows}>
            <View style={styles.summaryLine}>
              <Text
                style={[styles.summaryLabel, { color: colors.textSecondary }]}
              >
                Sub-total
              </Text>
              <Text
                style={[styles.summaryValue, { color: colors.textPrimary }]}
              >
                $ 5,870
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
                $ 80
              </Text>
            </View>

            <View
              style={[
                styles.dividerSmall,
                { backgroundColor: colors.divider },
              ]}
            />

            <View style={styles.summaryLine}>
              <Text style={[styles.totalLabel, { color: colors.textPrimary }]}>
                Total
              </Text>
              <Text style={[styles.totalValue, { color: colors.textPrimary }]}>
                $ 5,950
              </Text>
            </View>
          </View>

          {/* Promo Code Row */}
          <View style={styles.promoRow}>
            <View
              style={[
                styles.promoInputBox,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.cardBackground,
                },
              ]}
            >
              <Tag size={18} color={colors.textMuted} />
              <TextInput
                value={promoCode}
                onChangeText={(t) => dispatch(setPromoCode(t))}
                placeholder="Enter promo code"
                placeholderTextColor={colors.textMuted}
                style={[styles.promoInput, { color: colors.textPrimary }]}
              />
            </View>
            <TouchableOpacity
              style={[styles.promoAddBtn, { backgroundColor: colors.primary }]}
              activeOpacity={0.85}
            >
              <Text
                style={[styles.promoAddText, { color: colors.primaryText }]}
              >
                Add
              </Text>
            </TouchableOpacity>
          </View>

          <PrimaryButton
            title="Place Order"
            onPress={() => setModalVisible(true)}
            style={{ marginTop: 28 }}
          />
        </ScrollView>

        <HomeIndicator />

        {modalVisible && (
          <StatusModal
            type="success"
            title="Congratulations!"
            message="Your order has been placed."
            primaryButtonText="Track Your Order"
            onPrimaryPress={() => {
              setModalVisible(false);
              navigateTo('TrackOrder', 'varient_1');
            }}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export const CheckoutVarient1: React.FC = () => (
  <CheckoutView showSuccessModal={false} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
  },
  changeLink: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  addressDisplayRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  addressTextCol: {
    flex: 1,
  },
  addressNickname: {
    fontSize: 15,
    fontWeight: '700',
  },
  addressFull: {
    fontSize: 14,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginVertical: 18,
  },
  dividerSmall: {
    height: 1,
    marginVertical: 4,
  },
  paymentTabsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  payTabBtn: {
    flex: 1,
    height: 38,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  payTabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedCardBox: {
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  visaWordmark: {
    fontSize: 16,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  maskedCardText: {
    fontSize: 15,
    fontWeight: '600',
  },
  summaryRows: {
    gap: 10,
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
  totalLabel: {
    fontSize: 16,
  },
  totalValue: {
    fontSize: 17,
    fontWeight: '700',
  },
  promoRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  promoInputBox: {
    flex: 1,
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  promoInput: {
    flex: 1,
    fontSize: 15,
    height: '100%',
    outlineStyle: 'none',
  } as any,
  promoAddBtn: {
    width: 84,
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoAddText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default CheckoutVarient1;
