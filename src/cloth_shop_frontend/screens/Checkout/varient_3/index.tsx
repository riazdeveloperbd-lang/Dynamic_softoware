import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ShieldCheck, Sparkles, Wallet } from 'lucide-react';
import {
  AppHeader,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const CheckoutVarient3: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors, isDark } = useTheme();
  const [plan, setPlan] = useState<'full' | 'bnpl'>('bnpl');

  return (
    <ScreenWrapper preset="cart">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="One-Tap Express Pay" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Dark Metallic Apple Pay / Studio Card */}
          <View
            style={[
              styles.blackCard,
              { backgroundColor: isDark ? '#222226' : '#18181B' },
            ]}
          >
            <View style={styles.cardTop}>
              <View style={styles.applePayChip}>
                <Wallet size={14} color="#FFFFFF" />
                <Text style={styles.applePayText}>DEFINE PAY WALLET</Text>
              </View>
              <Text style={styles.cardBrand}>VISA INFINITE</Text>
            </View>

            <Text style={styles.cardAmount}>$ 5,950.00</Text>
            <Text style={styles.cardSub}>
              Delivering to 925 S Chugach St #APT 10, Alaska
            </Text>

            <View style={styles.cardFooter}>
              <Text style={styles.cardHolder}>CODY FISHER</Text>
              <Text style={styles.cardDigits}>•••• 2512</Text>
            </View>
          </View>

          {/* Payment Plan Selector: Full vs 4 Interest-Free Installments */}
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Choose Payment Structure
          </Text>

          <TouchableOpacity
            onPress={() => setPlan('bnpl')}
            style={[
              styles.planBox,
              {
                borderColor: plan === 'bnpl' ? colors.primary : colors.border,
                backgroundColor:
                  plan === 'bnpl' ? colors.surface : colors.cardBackground,
              },
            ]}
          >
            <View style={styles.planHeader}>
              <View style={styles.planTitleRow}>
                <Sparkles size={16} color={colors.warning} />
                <Text
                  style={[styles.planTitle, { color: colors.textPrimary }]}
                >
                  Pay in 4 Interest-Free Installments
                </Text>
              </View>
              <Text style={[styles.planPrice, { color: colors.textPrimary }]}>
                $1,487.50 / mo
              </Text>
            </View>
            <Text style={[styles.planDesc, { color: colors.textSecondary }]}>
              0% APR • First payment today, next 3 every 2 weeks
            </Text>

            {/* 4 Installment Dots */}
            <View style={styles.installmentRow}>
              {['Today', 'In 2 wks', 'In 4 wks', 'In 6 wks'].map((lbl, i) => (
                <View key={lbl} style={styles.instCol}>
                  <View
                    style={[
                      styles.instDot,
                      {
                        backgroundColor:
                          i === 0 ? colors.primary : colors.border,
                      },
                    ]}
                  />
                  <Text
                    style={[styles.instLabel, { color: colors.textPrimary }]}
                  >
                    $1,487.50
                  </Text>
                  <Text
                    style={[styles.instSub, { color: colors.textSecondary }]}
                  >
                    {lbl}
                  </Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPlan('full')}
            style={[
              styles.planBox,
              {
                borderColor: plan === 'full' ? colors.primary : colors.border,
                backgroundColor:
                  plan === 'full' ? colors.surface : colors.cardBackground,
              },
            ]}
          >
            <View style={styles.planHeader}>
              <Text style={[styles.planTitle, { color: colors.textPrimary }]}>
                Pay Full Amount Today
              </Text>
              <Text style={[styles.planPrice, { color: colors.textPrimary }]}>
                $5,950.00
              </Text>
            </View>
            <Text style={[styles.planDesc, { color: colors.textSecondary }]}>
              Earn 595 Define Loyalty Points ($59.50 reward value)
            </Text>
          </TouchableOpacity>

          <View style={styles.securityNote}>
            <ShieldCheck size={16} color={colors.success} />
            <Text
              style={[styles.securityText, { color: colors.textSecondary }]}
            >
              Protected by Define Buyer Guarantee & Free 30-Day Returns
            </Text>
          </View>

          <PrimaryButton
            title={
              plan === 'bnpl'
                ? 'Pay $1,487.50 Today with  Pay'
                : 'Pay $5,950.00 with  Pay'
            }
            onPress={() => navigateTo('TrackOrder', 'varient_2')}
            style={{ marginTop: 14 }}
          />
        </ScrollView>

        <HomeIndicator />
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
  blackCard: {
    borderRadius: 22,
    padding: 20,
    gap: 8,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  applePayChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
  },
  applePayText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  cardBrand: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  cardAmount: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 6,
  },
  cardSub: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 12.5,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.14)',
  },
  cardHolder: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  cardDigits: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 4,
  },
  planBox: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
    gap: 8,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  planTitle: {
    fontSize: 14.5,
    fontWeight: '800',
  },
  planPrice: {
    fontSize: 14.5,
    fontWeight: '800',
  },
  planDesc: {
    fontSize: 12.5,
  },
  installmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.2)',
  },
  instCol: {
    alignItems: 'center',
    gap: 3,
  },
  instDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  instLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  instSub: {
    fontSize: 10.5,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  securityText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CheckoutVarient3;
