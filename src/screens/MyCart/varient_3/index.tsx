import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Plus, Sparkles, Tag } from 'lucide-react';
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
import { useGetProductsQuery } from '../../../store/api/dummyApi';
import { addToCart } from '../../../store/slices/appSlice';

export const MyCartVarient3: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const cartItems = useAppSelector((s) => s.app.cart);
  const { data: products = [] } = useGetProductsQuery();

  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const memberDiscount = Math.round(subTotal * 0.1);
  const finalTotal = subTotal - memberDiscount;

  return (
    <ScreenWrapper preset="cart" showBottomTab activeTab="Cart">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Atelier Bundle Bag" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Horizontal Bag Preview Strip */}
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Selected Items ({cartItems.length})
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalItems}
          >
            {cartItems.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.miniBagCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={[
                    styles.miniBagImg,
                    { backgroundColor: colors.productTile },
                  ]}
                  resizeMode="cover"
                />
                <Text
                  style={[styles.miniBagTitle, { color: colors.textPrimary }]}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.miniBagMeta,
                    { color: colors.textSecondary },
                  ]}
                >
                  Size {item.size} × {item.quantity} • ${item.price}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Complete the Look Upsell */}
          <View style={styles.upsellHeader}>
            <Sparkles size={16} color={colors.warning} />
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Complete the Look (Add-On 15% Off)
            </Text>
          </View>

          <View style={styles.upsellStack}>
            {products.slice(3, 5).map((up) => (
              <View
                key={up.id}
                style={[
                  styles.upsellRow,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Image
                  source={{ uri: up.image }}
                  style={[
                    styles.upsellThumb,
                    { backgroundColor: colors.productTile },
                  ]}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.upsellTitle, { color: colors.textPrimary }]}
                  >
                    {up.title}
                  </Text>
                  <Text
                    style={[
                      styles.upsellPrice,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Bundle Price: ${up.price.toLocaleString()}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    dispatch(addToCart({ product: up, size: 'M' }))
                  }
                  style={[
                    styles.addBtn,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <Plus size={14} color={colors.primaryText} />
                  <Text
                    style={[styles.addBtnText, { color: colors.primaryText }]}
                  >
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* VIP Savings Receipt */}
          <View
            style={[
              styles.receiptCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.voucherStrip}>
              <Tag size={15} color={colors.success} />
              <Text style={[styles.voucherText, { color: colors.success }]}>
                VIP10 STUDIO MEMBER PERK APPLIED (-10%)
              </Text>
            </View>

            <View style={styles.receiptRow}>
              <Text
                style={[styles.receiptLabel, { color: colors.textSecondary }]}
              >
                Bag Subtotal
              </Text>
              <Text
                style={[styles.receiptVal, { color: colors.textPrimary }]}
              >
                $ {subTotal.toLocaleString()}
              </Text>
            </View>
            <View style={styles.receiptRow}>
              <Text
                style={[styles.receiptLabel, { color: colors.textSecondary }]}
              >
                Member 10% Savings
              </Text>
              <Text style={[styles.receiptVal, { color: colors.success }]}>
                - $ {memberDiscount.toLocaleString()}
              </Text>
            </View>

            <View
              style={[styles.divider, { backgroundColor: colors.divider }]}
            />

            <View style={styles.receiptRow}>
              <Text
                style={[styles.netLabel, { color: colors.textPrimary }]}
              >
                Net Payable
              </Text>
              <Text
                style={[styles.netVal, { color: colors.textPrimary }]}
              >
                $ {finalTotal.toLocaleString()}
              </Text>
            </View>

            <PrimaryButton
              title="Proceed to Express Checkout"
              onPress={() => navigateTo('Checkout', 'varient_3')}
              style={{ marginTop: 14 }}
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 15.5,
    fontWeight: '800',
  },
  horizontalItems: {
    gap: 12,
    paddingVertical: 4,
  },
  miniBagCard: {
    width: 145,
    borderRadius: 14,
    borderWidth: 1,
    padding: 10,
    gap: 6,
  },
  miniBagImg: {
    width: '100%',
    height: 110,
    borderRadius: 10,
  },
  miniBagTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  miniBagMeta: {
    fontSize: 11.5,
  },
  upsellHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  upsellStack: {
    gap: 8,
  },
  upsellRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
  upsellThumb: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  upsellTitle: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  upsellPrice: {
    fontSize: 12,
    marginTop: 2,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 8,
  },
  addBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  receiptCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginTop: 6,
    gap: 8,
  },
  voucherStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  voucherText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  receiptLabel: {
    fontSize: 13.5,
  },
  receiptVal: {
    fontSize: 14,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
  netLabel: {
    fontSize: 16,
    fontWeight: '800',
  },
  netVal: {
    fontSize: 18,
    fontWeight: '800',
  },
});

export default MyCartVarient3;
