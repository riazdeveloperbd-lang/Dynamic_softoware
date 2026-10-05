import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  CreditCard,
  Crown,
  Heart,
  HelpCircle,
  MapPin,
  Package,
  Settings,
} from 'lucide-react';
import {
  AppColorSelectorCard,
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const AccountVarient2: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors, isDark } = useTheme();

  const tiles = [
    {
      title: 'My Orders',
      sub: '5 Active Parcels',
      icon: Package,
      onPress: () => navigateTo('MyOrders', 'varient_2'),
    },
    {
      title: 'Saved Items',
      sub: '6 Curated Looks',
      icon: Heart,
      onPress: () => navigateTo('SavedItems', 'varient_2'),
    },
    {
      title: 'Addresses',
      sub: '4 Saved Locations',
      icon: MapPin,
      onPress: () => navigateTo('Address', 'varient_2'),
    },
    {
      title: 'Payment Vault',
      sub: '3 Linked Cards',
      icon: CreditCard,
      onPress: () => navigateTo('PaymentMethod', 'varient_2'),
    },
    {
      title: 'Preferences',
      sub: 'Alerts & Security',
      icon: Settings,
      onPress: () => navigateTo('NotificationSettings', 'varient_2'),
    },
    {
      title: 'Concierge',
      sub: '24/7 Support Desk',
      icon: HelpCircle,
      onPress: () => navigateTo('HelpCenter', 'varient_2'),
    },
  ];

  return (
    <ScreenWrapper preset="grid" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="VIP Studio Hub" showBorder={false} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* VIP Loyalty Tier Card */}
          <View
            style={[
              styles.vipHeroCard,
              { backgroundColor: isDark ? '#242429' : colors.primary },
            ]}
          >
            <View style={styles.vipTopRow}>
              <View style={styles.memberLeft}>
                <View style={styles.avatarRing}>
                  <Text style={styles.avatarInitials}>CF</Text>
                </View>
                <View>
                  <Text style={styles.memberName}>Cody Fisher</Text>
                  <View style={styles.tierRow}>
                    <Crown size={13} color="#FFA928" fill="#FFA928" />
                    <Text style={styles.tierText}>PLATINUM INSIDER</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => navigateTo('MyDetails', 'varient_2')}
                style={styles.editChip}
              >
                <Text style={styles.editChipText}>Profile</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCol}>
                <Text style={styles.statNum}>2,840</Text>
                <Text style={styles.statLabel}>STUDIO PTS</Text>
              </View>
              <View style={styles.statSep} />
              <View style={styles.statCol}>
                <Text style={styles.statNum}>$142</Text>
                <Text style={styles.statLabel}>CREDITS</Text>
              </View>
              <View style={styles.statSep} />
              <View style={styles.statCol}>
                <Text style={styles.statNum}>14</Text>
                <Text style={styles.statLabel}>DROPS COPPED</Text>
              </View>
            </View>
          </View>

          <AppColorSelectorCard compact />

          {/* 2-Column Bento Quick Action Grid */}
          <View style={styles.tilesGrid}>
            {tiles.map((t) => {
              const Icon = t.icon;
              return (
                <TouchableOpacity
                  key={t.title}
                  onPress={t.onPress}
                  activeOpacity={0.85}
                  style={[
                    styles.bentoTile,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.tileIconWrap,
                      { backgroundColor: colors.surface },
                    ]}
                  >
                    <Icon size={20} color={colors.textPrimary} />
                  </View>
                  <Text
                    style={[styles.tileTitle, { color: colors.textPrimary }]}
                  >
                    {t.title}
                  </Text>
                  <Text
                    style={[
                      styles.tileSub,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {t.sub}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
    gap: 16,
  },
  vipHeroCard: {
    borderRadius: 22,
    padding: 20,
    gap: 18,
  },
  vipTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarRing: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1.5,
    borderColor: '#FFA928',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  memberName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  tierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  tierText: {
    color: '#FFA928',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  editChip: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
  },
  editChipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.12)',
  },
  statCol: {
    alignItems: 'center',
    gap: 2,
  },
  statNum: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  statSep: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  tilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  bentoTile: {
    width: '48%',
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  tileIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  tileTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  tileSub: {
    fontSize: 12,
  },
});

export default AccountVarient2;
