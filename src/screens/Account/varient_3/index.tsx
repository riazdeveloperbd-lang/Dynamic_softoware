import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ArrowUpRight,
  Gift,
  LogOut,
  Moon,
  Sparkles,
  Sun,
  Truck,
} from 'lucide-react';
import {
  AppColorSelectorCard,
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const AccountVarient3: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <ScreenWrapper preset="list" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Atelier Concierge" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <AppColorSelectorCard compact />

          {/* Active Shipment Live Widget */}
          <TouchableOpacity
            onPress={() => navigateTo('TrackOrder', 'varient_2')}
            style={[
              styles.shipmentCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.shipTop}>
              <View style={styles.shipTitleRow}>
                <Truck size={18} color={colors.success} />
                <Text
                  style={[styles.shipTitle, { color: colors.textPrimary }]}
                >
                  Order #DF-9942 In Transit
                </Text>
              </View>
              <ArrowUpRight size={18} color={colors.textPrimary} />
            </View>
            <Text style={[styles.shipSub, { color: colors.textSecondary }]}>
              Courier Jacob Jones • Arriving today by 7:00 PM
            </Text>
          </TouchableOpacity>

          {/* Referral & Perks Card */}
          <View
            style={[
              styles.referralCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <Gift size={22} color={colors.warning} />
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.referralTitle, { color: colors.textPrimary }]}
              >
                Give $50, Get $50 Studio Credit
              </Text>
              <Text
                style={[styles.referralSub, { color: colors.textSecondary }]}
              >
                Invite friends to Define Atelier with code CODY50
              </Text>
            </View>
          </View>

          {/* Executive Links */}
          <View
            style={[
              styles.linksCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            {[
              {
                label: 'Personal Measurements & Fit',
                onPress: () => navigateTo('MyDetails', 'varient_3'),
              },
              {
                label: 'Order History & Digital Receipts',
                onPress: () => navigateTo('MyOrders', 'varient_3'),
              },
              {
                label: 'Saved Payment Wallets',
                onPress: () => navigateTo('PaymentMethod', 'varient_3'),
              },
              {
                label: 'Live Stylist Chat',
                onPress: () => navigateTo('CustomerService', 'varient_2'),
              },
            ].map((item, i) => (
              <TouchableOpacity
                key={item.label}
                onPress={item.onPress}
                style={[
                  styles.linkRow,
                  i < 3 && {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.divider,
                  },
                ]}
              >
                <Text
                  style={[styles.linkLabel, { color: colors.textPrimary }]}
                >
                  {item.label}
                </Text>
                <ArrowUpRight size={17} color={colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick Theme & Logout Bar */}
          <View style={styles.bottomActionsRow}>
            <TouchableOpacity
              onPress={toggleTheme}
              style={[
                styles.halfBtn,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              {isDark ? (
                <Sun size={18} color={colors.warning} />
              ) : (
                <Moon size={18} color={colors.textPrimary} />
              )}
              <Text
                style={[styles.halfBtnText, { color: colors.textPrimary }]}
              >
                {isDark ? 'Dark Theme' : 'Light Theme'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigateTo('Login', 'varient_1')}
              style={[
                styles.halfBtn,
                {
                  backgroundColor: colors.dangerBg,
                  borderColor: colors.border,
                },
              ]}
            >
              <LogOut size={18} color={colors.danger} />
              <Text style={[styles.halfBtnText, { color: colors.danger }]}>
                Sign Out
              </Text>
            </TouchableOpacity>
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
  shipmentCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  shipTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shipTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  shipTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  shipSub: {
    fontSize: 13,
  },
  referralCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },
  referralTitle: {
    fontSize: 14.5,
    fontWeight: '800',
  },
  referralSub: {
    fontSize: 12.5,
    marginTop: 2,
  },
  linksCard: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  linkRow: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkLabel: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  bottomActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  halfBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
});

export default AccountVarient3;
