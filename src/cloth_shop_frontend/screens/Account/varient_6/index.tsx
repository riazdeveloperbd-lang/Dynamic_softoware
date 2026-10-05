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
  Compass,
  Heart,
  QrCode,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const AccountVarient6: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();

  return (
    <ScreenWrapper preset="grid" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Digital Boutique Pass" showBorder={false} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Boutique Pass Card */}
          <View
            style={[
              styles.passCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.primary,
              },
            ]}
          >
            <View style={styles.passTop}>
              <View>
                <Text
                  style={[styles.passLabel, { color: colors.textSecondary }]}
                >
                  IN-STORE & APP MEMBER ID
                </Text>
                <Text style={[styles.passName, { color: colors.textPrimary }]}>
                  CODY FISHER • #8841-NY
                </Text>
              </View>
              <View
                style={[styles.qrWrap, { backgroundColor: colors.primary }]}
              >
                <QrCode size={22} color={colors.primaryText} />
              </View>
            </View>
            <Text style={[styles.passNote, { color: colors.textSecondary }]}>
              Scan at any Define Flagship Boutique for instant fitting room sync & complimentary tailoring.
            </Text>
          </View>

          {/* 3-Tile Action Row */}
          <View style={styles.tripleRow}>
            {[
              {
                label: 'Explore',
                icon: Compass,
                onPress: () => navigateTo('Homepage', 'varient_1'),
              },
              {
                label: 'Wishlist',
                icon: Heart,
                onPress: () => navigateTo('SavedItems', 'varient_3'),
              },
              {
                label: 'My Bag',
                icon: ShoppingBag,
                onPress: () => navigateTo('MyCart', 'varient_2'),
              },
            ].map((btn) => {
              const IconComp = btn.icon;
              return (
                <TouchableOpacity
                  key={btn.label}
                  onPress={btn.onPress}
                  style={[
                    styles.tripleTile,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <IconComp size={20} color={colors.primary} />
                  <Text
                    style={[styles.tripleText, { color: colors.textPrimary }]}
                  >
                    {btn.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Concierge Link */}
          <TouchableOpacity
            onPress={() => navigateTo('CustomerService', 'varient_3')}
            style={[
              styles.conciergeCta,
              { backgroundColor: colors.primary },
            ]}
          >
            <Sparkles size={18} color={colors.primaryText} />
            <Text
              style={[styles.conciergeCtaText, { color: colors.primaryText }]}
            >
              Book 1-on-1 Live Stylist Session
            </Text>
            <ArrowUpRight size={18} color={colors.primaryText} />
          </TouchableOpacity>
        </ScrollView>

        <BottomTabBar activeTab="Account" />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  passCard: {
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 16,
    gap: 10,
  },
  passTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  passName: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
  qrWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passNote: {
    fontSize: 11.5,
    lineHeight: 17,
  },
  tripleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  tripleTile: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 6,
  },
  tripleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  conciergeCta: {
    height: 50,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  conciergeCtaText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
});

export default AccountVarient6;
