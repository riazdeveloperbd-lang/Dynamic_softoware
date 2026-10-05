import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Award,
  CreditCard,
  Gift,
  Palette,
  ShoppingBag,
  Sparkles,
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

export const AccountVarient4: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors, colorPreset, presets } = useTheme();
  const currentPreset =
    presets.find((p) => p.id === colorPreset) || presets[0];

  return (
    <ScreenWrapper preset="hero" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Brand Theme & Rewards" showBorder={false} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Dynamic Brand Color Hero Card */}
          <View
            style={[
              styles.brandHero,
              { backgroundColor: colors.primary },
            ]}
          >
            <View style={styles.heroBadgeRow}>
              <Palette size={14} color={colors.primaryText} />
              <Text
                style={[styles.heroBadgeText, { color: colors.primaryText }]}
              >
                ACTIVE THEME • {currentPreset.name.toUpperCase()}
              </Text>
            </View>
            <Text style={[styles.heroTitle, { color: colors.primaryText }]}>
              Cody Fisher’s Personal Atelier
            </Text>
            <Text
              style={[
                styles.heroSub,
                { color: colors.primaryText, opacity: 0.85 },
              ]}
            >
              Select any color palette below to customize buttons, cards, badges, and surfaces across the entire application.
            </Text>
          </View>

          {/* Interactive App Color Selector */}
          <AppColorSelectorCard compact />

          {/* Rewards & Studio Milestones */}
          <View style={styles.cardsRow}>
            <TouchableOpacity
              onPress={() => navigateTo('MyOrders', 'varient_4')}
              style={[
                styles.miniCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <Award size={20} color={colors.primary} />
              <Text style={[styles.miniValue, { color: colors.textPrimary }]}>
                Tier IV
              </Text>
              <Text style={[styles.miniLabel, { color: colors.textSecondary }]}>
                Founder Circle
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigateTo('PaymentMethod', 'varient_3')}
              style={[
                styles.miniCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <Gift size={20} color={colors.primary} />
              <Text style={[styles.miniValue, { color: colors.textPrimary }]}>
                $240.00
              </Text>
              <Text style={[styles.miniLabel, { color: colors.textSecondary }]}>
                Reward Balance
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quick Shortcuts */}
          {[
            {
              title: 'Recent Orders & Returns',
              sub: 'Track active courier & past receipts',
              icon: Truck,
              onPress: () => navigateTo('MyOrders', 'varient_1'),
            },
            {
              title: 'Saved Curated Wardrobe',
              sub: '6 seasonal pieces in wishlist',
              icon: ShoppingBag,
              onPress: () => navigateTo('SavedItems', 'varient_1'),
            },
            {
              title: 'Cards & Apple Pay Vault',
              sub: 'Manage default checkout methods',
              icon: CreditCard,
              onPress: () => navigateTo('PaymentMethod', 'varient_1'),
            },
          ].map((row) => {
            const IconComp = row.icon;
            return (
              <TouchableOpacity
                key={row.title}
                onPress={row.onPress}
                style={[
                  styles.shortcutRow,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.shortcutIcon,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  <IconComp size={18} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.shortcutTitle,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {row.title}
                  </Text>
                  <Text
                    style={[
                      styles.shortcutSub,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {row.sub}
                  </Text>
                </View>
                <Sparkles size={16} color={colors.primary} />
              </TouchableOpacity>
            );
          })}
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
  brandHero: {
    borderRadius: 20,
    padding: 20,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  heroBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  heroSub: {
    fontSize: 12,
    lineHeight: 18,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  miniCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 4,
  },
  miniValue: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },
  miniLabel: {
    fontSize: 11,
  },
  shortcutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  shortcutIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutTitle: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  shortcutSub: {
    fontSize: 11.5,
    marginTop: 2,
  },
});

export default AccountVarient4;
