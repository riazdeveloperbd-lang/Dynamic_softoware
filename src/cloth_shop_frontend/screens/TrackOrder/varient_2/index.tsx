import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { MessageSquare, Phone, ShieldCheck, Truck } from 'lucide-react';
import {
  AppHeader,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const TrackOrderVarient2: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors, isDark } = useTheme();

  return (
    <ScreenWrapper preset="map">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Split Radar & Courier Card" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Live ETA Countdown Hero */}
          <View
            style={[
              styles.etaHero,
              { backgroundColor: isDark ? '#242429' : '#18181B' },
            ]}
          >
            <View style={styles.etaTop}>
              <View style={styles.livePulseChip}>
                <View style={styles.greenDot} />
                <Text style={styles.livePulseText}>LIVE GPS TELEMETRY</Text>
              </View>
              <Text style={styles.parcelId}>#DF-9942</Text>
            </View>

            <Text style={styles.etaTime}>14 Mins Away</Text>
            <Text style={styles.etaDest}>
              3 Stops Remaining • Heading to S Chugach St
            </Text>

            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>

          {/* Verified Courier Profile Card */}
          <View
            style={[
              styles.courierCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.courierTop}>
              <View
                style={[
                  styles.avatarBox,
                  { backgroundColor: colors.surface },
                ]}
              >
                <Text
                  style={[styles.avatarText, { color: colors.textPrimary }]}
                >
                  JJ
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.verifiedRow}>
                  <Text
                    style={[styles.courierName, { color: colors.textPrimary }]}
                  >
                    Jacob Jones
                  </Text>
                  <ShieldCheck size={16} color={colors.success} />
                </View>
                <Text
                  style={[
                    styles.vehicleMeta,
                    { color: colors.textSecondary },
                  ]}
                >
                  Mercedes Sprinter Van • Plate AK-4821
                </Text>
              </View>
            </View>

            <View style={styles.courierActions}>
              <TouchableOpacity
                onPress={() => navigateTo('CustomerService', 'varient_1')}
                style={[
                  styles.contactBtn,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <MessageSquare size={16} color={colors.textPrimary} />
                <Text
                  style={[styles.contactText, { color: colors.textPrimary }]}
                >
                  Message Driver
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.contactBtn,
                  {
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                  },
                ]}
              >
                <Phone size={16} color={colors.primaryText} />
                <Text
                  style={[styles.contactText, { color: colors.primaryText }]}
                >
                  Call Courier
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Checkpoint Log */}
          <View
            style={[
              styles.logCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.logRow}>
              <Truck size={18} color={colors.textPrimary} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.logTitle, { color: colors.textPrimary }]}>
                  Departed Ketchikan Distribution Hub
                </Text>
                <Text
                  style={[styles.logSub, { color: colors.textSecondary }]}
                >
                  Scanned at 09:18 AM • Temperature Controlled Van
                </Text>
              </View>
            </View>
          </View>

          <PrimaryButton
            title="View Digital Delivery Pass"
            onPress={() => navigateTo('TrackOrder', 'varient_3')}
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
  etaHero: {
    borderRadius: 22,
    padding: 20,
    gap: 8,
  },
  etaTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  livePulseChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#32D74B',
  },
  livePulseText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  parcelId: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '700',
  },
  etaTime: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 4,
  },
  etaDest: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 13,
  },
  progressTrack: {
    height: 6,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    width: '78%',
    height: '100%',
    backgroundColor: '#32D74B',
  },
  courierCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 14,
  },
  courierTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '800',
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  courierName: {
    fontSize: 16,
    fontWeight: '800',
  },
  vehicleMeta: {
    fontSize: 12.5,
    marginTop: 2,
  },
  courierActions: {
    flexDirection: 'row',
    gap: 10,
  },
  contactBtn: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  contactText: {
    fontSize: 13,
    fontWeight: '700',
  },
  logCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  logSub: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default TrackOrderVarient2;
