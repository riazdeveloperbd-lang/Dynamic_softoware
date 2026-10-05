import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { KeyRound, PackageCheck, QrCode, ShieldCheck } from 'lucide-react';
import {
  AppHeader,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const TrackOrderVarient3: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();

  return (
    <ScreenWrapper preset="map">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Digital Handover Pass" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Boarding-Pass Style Delivery Ticket */}
          <View
            style={[
              styles.passCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.passHeader}>
              <View>
                <Text
                  style={[styles.passKicker, { color: colors.textSecondary }]}
                >
                  EXPRESS COURIER MANIFEST
                </Text>
                <Text
                  style={[styles.passTitle, { color: colors.textPrimary }]}
                >
                  DEFINE STUDIO PARCEL
                </Text>
              </View>
              <PackageCheck size={24} color={colors.success} />
            </View>

            <View
              style={[styles.dashedLine, { borderColor: colors.border }]}
            />

            {/* Handover PIN & QR Box */}
            <View style={styles.qrSection}>
              <View
                style={[
                  styles.qrBox,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <QrCode size={84} color={colors.textPrimary} />
              </View>

              <Text style={[styles.pinLabel, { color: colors.textSecondary }]}>
                COURIER HANDOVER PIN
              </Text>
              <View style={styles.pinDigitsRow}>
                {['8', '4', '9', '2'].map((d, i) => (
                  <View
                    key={i}
                    style={[
                      styles.pinBadge,
                      { backgroundColor: colors.primary },
                    ]}
                  >
                    <Text
                      style={[
                        styles.pinBadgeText,
                        { color: colors.primaryText },
                      ]}
                    >
                      {d}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View
              style={[styles.dashedLine, { borderColor: colors.border }]}
            />

            <View style={styles.metaGrid}>
              <View>
                <Text
                  style={[styles.metaLabel, { color: colors.textSecondary }]}
                >
                  RECIPIENT
                </Text>
                <Text style={[styles.metaVal, { color: colors.textPrimary }]}>
                  Cody Fisher
                </Text>
              </View>
              <View>
                <Text
                  style={[styles.metaLabel, { color: colors.textSecondary }]}
                >
                  WEIGHT
                </Text>
                <Text style={[styles.metaVal, { color: colors.textPrimary }]}>
                  1.4 kg (3 Items)
                </Text>
              </View>
              <View>
                <Text
                  style={[styles.metaLabel, { color: colors.textSecondary }]}
                >
                  GATE CODE
                </Text>
                <Text style={[styles.metaVal, { color: colors.textPrimary }]}>
                  #4820
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.securityFoot}>
            <ShieldCheck size={16} color={colors.success} />
            <Text
              style={[styles.securityText, { color: colors.textSecondary }]}
            >
              Show this QR or 4-digit PIN to courier Jacob Jones upon delivery
            </Text>
          </View>

          <PrimaryButton
            title="Back to My Orders"
            onPress={() => navigateTo('MyOrders', 'varient_1')}
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
    gap: 16,
  },
  passCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    gap: 16,
  },
  passHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passKicker: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  passTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 2,
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  qrSection: {
    alignItems: 'center',
    gap: 10,
  },
  qrBox: {
    width: 128,
    height: 128,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginTop: 4,
  },
  pinDigitsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pinBadge: {
    width: 42,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinBadgeText: {
    fontSize: 20,
    fontWeight: '800',
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  metaVal: {
    fontSize: 13.5,
    fontWeight: '700',
    marginTop: 2,
  },
  securityFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  securityText: {
    fontSize: 12.5,
    flex: 1,
  },
});

export default TrackOrderVarient3;
