import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ArrowUpRight, Flame, Sparkles, Truck } from 'lucide-react';
import { IMAGES } from '../../../assets';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const NotificationsVarient3: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();

  return (
    <ScreenWrapper preset="list" showBottomTab activeTab="Home">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="VIP Drops & Radar Feed" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Featured Drop Visual Alert */}
          <TouchableOpacity
            onPress={() => navigateTo('Homepage', 'varient_2')}
            style={[
              styles.dropBanner,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <Image
              source={{ uri: IMAGES.navySloganTshirt }}
              style={[
                styles.dropImg,
                { backgroundColor: colors.productTile },
              ]}
              resizeMode="cover"
            />
            <View style={styles.dropContent}>
              <View style={styles.dropBadgeRow}>
                <Flame size={14} color={colors.danger} />
                <Text style={[styles.dropBadge, { color: colors.danger }]}>
                  BACK IN STOCK ALERT
                </Text>
              </View>
              <Text style={[styles.dropTitle, { color: colors.textPrimary }]}>
                Regular Fit Slogan Tee Restocked in Size M
              </Text>
              <Text
                style={[styles.dropSub, { color: colors.textSecondary }]}
              >
                Tap to reserve before capsule sells out again.
              </Text>
            </View>
          </TouchableOpacity>

          {/* Live Courier Dispatch Alert */}
          <TouchableOpacity
            onPress={() => navigateTo('TrackOrder', 'varient_1')}
            style={[
              styles.radarAlert,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Truck size={22} color={colors.success} />
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.radarTitle, { color: colors.textPrimary }]}
              >
                Courier Dispatched • 14 Mins Away
              </Text>
              <Text
                style={[styles.radarSub, { color: colors.textSecondary }]}
              >
                Jacob Jones is en route to 925 S Chugach St
              </Text>
            </View>
            <ArrowUpRight size={18} color={colors.textPrimary} />
          </TouchableOpacity>

          {/* Exclusive Voucher Alert */}
          <TouchableOpacity
            onPress={() => navigateTo('Checkout', 'varient_3')}
            style={[
              styles.radarAlert,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <Sparkles size={22} color={colors.warning} />
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.radarTitle, { color: colors.textPrimary }]}
              >
                30% Private Atelier Voucher Unlocked
              </Text>
              <Text
                style={[styles.radarSub, { color: colors.textSecondary }]}
              >
                Use promo code DEFINE30 at checkout today
              </Text>
            </View>
            <ArrowUpRight size={18} color={colors.textPrimary} />
          </TouchableOpacity>
        </ScrollView>

        <BottomTabBar activeTab="Home" />
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
  dropBanner: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  dropImg: {
    width: '100%',
    height: 150,
  },
  dropContent: {
    padding: 16,
    gap: 4,
  },
  dropBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dropBadge: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  dropTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  dropSub: {
    fontSize: 13,
  },
  radarAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  radarTitle: {
    fontSize: 14.5,
    fontWeight: '800',
  },
  radarSub: {
    fontSize: 12.5,
    marginTop: 2,
  },
});

export default NotificationsVarient3;
