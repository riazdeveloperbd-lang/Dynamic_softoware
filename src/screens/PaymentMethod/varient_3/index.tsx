import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { CheckCircle2, Coins, Smartphone, Sparkles, Wallet } from 'lucide-react';
import {
  AppHeader,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const PaymentMethodVarient3: React.FC = () => {
  const { goBack } = useAppNavigation();
  const { colors } = useTheme();
  const [selectedWallet, setSelectedWallet] = useState('apple');

  const wallets = [
    {
      id: 'apple',
      title: 'Apple Pay Express',
      sub: 'Instant Face ID Biometric Settlement',
      badge: '0% Fee',
      icon: Smartphone,
    },
    {
      id: 'credits',
      title: 'Define Studio Store Balance',
      sub: 'Available Balance: $1,420.00 USD',
      badge: '+5% Cashback',
      icon: Wallet,
    },
    {
      id: 'klarna',
      title: 'Klarna / Afterpay Split-4',
      sub: '4 interest-free payments every 2 weeks',
      badge: 'Pre-Approved',
      icon: Sparkles,
    },
    {
      id: 'usdc',
      title: 'USDC / Digital Currency Pass',
      sub: 'Zero-fee instant Web3 settlement',
      badge: 'Instant',
      icon: Coins,
    },
  ];

  return (
    <ScreenWrapper preset="list">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Digital Wallets & Credits" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Store Balance Banner */}
          <View
            style={[
              styles.balanceHero,
              {
                backgroundColor: colors.primary,
              },
            ]}
          >
            <Text style={[styles.balanceKicker, { color: colors.primaryText }]}>
              STUDIO REWARD CREDITS
            </Text>
            <Text style={[styles.balanceVal, { color: colors.primaryText }]}>
              $ 1,420.00
            </Text>
            <Text style={[styles.balanceSub, { color: colors.primaryText }]}>
              Can be combined automatically with any card at checkout
            </Text>
          </View>

          <View style={styles.walletsStack}>
            {wallets.map((w) => {
              const Icon = w.icon;
              const active = selectedWallet === w.id;
              return (
                <TouchableOpacity
                  key={w.id}
                  onPress={() => setSelectedWallet(w.id)}
                  style={[
                    styles.walletCard,
                    {
                      borderColor: active ? colors.primary : colors.border,
                      backgroundColor: active
                        ? colors.surface
                        : colors.cardBackground,
                    },
                  ]}
                >
                  <Icon size={22} color={colors.textPrimary} />
                  <View style={{ flex: 1 }}>
                    <View style={styles.walletTitleRow}>
                      <Text
                        style={[
                          styles.walletTitle,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {w.title}
                      </Text>
                      <Text
                        style={[
                          styles.walletBadge,
                          { color: colors.success },
                        ]}
                      >
                        {w.badge}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.walletSub,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {w.sub}
                    </Text>
                  </View>
                  {active && (
                    <CheckCircle2 size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View
          style={[styles.bottomBar, { backgroundColor: colors.background }]}
        >
          <PrimaryButton title="Activate Payment Method" onPress={goBack} />
          <HomeIndicator />
        </View>
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
    gap: 16,
  },
  balanceHero: {
    borderRadius: 20,
    padding: 20,
    gap: 4,
  },
  balanceKicker: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 1.2,
    opacity: 0.8,
  },
  balanceVal: {
    fontSize: 28,
    fontWeight: '800',
  },
  balanceSub: {
    fontSize: 12.5,
    opacity: 0.8,
  },
  walletsStack: {
    gap: 10,
  },
  walletCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  walletTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletTitle: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  walletBadge: {
    fontSize: 11.5,
    fontWeight: '800',
  },
  walletSub: {
    fontSize: 12.5,
    marginTop: 2,
  },
  bottomBar: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
});

export default PaymentMethodVarient3;
