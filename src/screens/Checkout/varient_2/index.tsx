import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Check, Clock, CreditCard, MapPin, Truck, Zap } from 'lucide-react';
import {
  AppHeader,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const CheckoutVarient2: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const [speed, setSpeed] = useState<'same_day' | 'standard'>('same_day');

  return (
    <ScreenWrapper preset="cart">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Step Checkout" showBorder={false} />

        {/* Horizontal 3-Step Progress Bar */}
        <View style={styles.stepperRow}>
          {[
            { num: '1', label: 'Address', done: true },
            { num: '2', label: 'Courier', done: true },
            { num: '3', label: 'Review', done: false },
          ].map((s, idx) => (
            <React.Fragment key={s.label}>
              <View style={styles.stepItem}>
                <View
                  style={[
                    styles.stepCircle,
                    {
                      backgroundColor: s.done
                        ? colors.primary
                        : colors.surface,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  {s.done ? (
                    <Check size={13} color={colors.primaryText} />
                  ) : (
                    <Text
                      style={[
                        styles.stepNumText,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {s.num}
                    </Text>
                  )}
                </View>
                <Text
                  style={[styles.stepLabel, { color: colors.textPrimary }]}
                >
                  {s.label}
                </Text>
              </View>
              {idx < 2 && (
                <View
                  style={[
                    styles.stepLine,
                    { backgroundColor: colors.primary },
                  ]}
                />
              )}
            </React.Fragment>
          ))}
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Delivery Speed Tier Cards */}
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Select Dispatch Speed
          </Text>

          <View style={styles.tiersRow}>
            <TouchableOpacity
              onPress={() => setSpeed('same_day')}
              style={[
                styles.tierCard,
                {
                  borderColor:
                    speed === 'same_day' ? colors.primary : colors.border,
                  backgroundColor:
                    speed === 'same_day'
                      ? colors.surface
                      : colors.cardBackground,
                },
              ]}
            >
              <Zap size={20} color={colors.warning} fill={colors.warning} />
              <Text style={[styles.tierName, { color: colors.textPrimary }]}>
                Same-Day VIP
              </Text>
              <Text
                style={[styles.tierTime, { color: colors.textSecondary }]}
              >
                Arrives by 7:00 PM
              </Text>
              <Text style={[styles.tierFee, { color: colors.textPrimary }]}>
                $80.00
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSpeed('standard')}
              style={[
                styles.tierCard,
                {
                  borderColor:
                    speed === 'standard' ? colors.primary : colors.border,
                  backgroundColor:
                    speed === 'standard'
                      ? colors.surface
                      : colors.cardBackground,
                },
              ]}
            >
              <Truck size={20} color={colors.textPrimary} />
              <Text style={[styles.tierName, { color: colors.textPrimary }]}>
                Standard Studio
              </Text>
              <Text
                style={[styles.tierTime, { color: colors.textSecondary }]}
              >
                2–3 Business Days
              </Text>
              <Text style={[styles.tierFee, { color: colors.success }]}>
                FREE
              </Text>
            </TouchableOpacity>
          </View>

          {/* Destination & Card Summary Box */}
          <View
            style={[
              styles.summaryBox,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => navigateTo('Address', 'varient_2')}
              style={styles.boxLine}
            >
              <MapPin size={18} color={colors.textPrimary} />
              <View style={{ flex: 1 }}>
                <Text
                  style={[styles.boxLineTitle, { color: colors.textPrimary }]}
                >
                  925 S Chugach St #APT 10
                </Text>
                <Text
                  style={[
                    styles.boxLineSub,
                    { color: colors.textSecondary },
                  ]}
                >
                  Home Address • Alaska 99645
                </Text>
              </View>
              <Text style={[styles.editLink, { color: colors.textPrimary }]}>
                Edit
              </Text>
            </TouchableOpacity>

            <View
              style={[styles.divider, { backgroundColor: colors.divider }]}
            />

            <TouchableOpacity
              onPress={() => navigateTo('PaymentMethod', 'varient_2')}
              style={styles.boxLine}
            >
              <CreditCard size={18} color={colors.textPrimary} />
              <View style={{ flex: 1 }}>
                <Text
                  style={[styles.boxLineTitle, { color: colors.textPrimary }]}
                >
                  VISA Platinum •••• 2512
                </Text>
                <Text
                  style={[
                    styles.boxLineSub,
                    { color: colors.textSecondary },
                  ]}
                >
                  Instant 1-Tap Authorization
                </Text>
              </View>
              <Text style={[styles.editLink, { color: colors.textPrimary }]}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          {/* Delivery Window Pill */}
          <View
            style={[
              styles.etaStrip,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Clock size={16} color={colors.textPrimary} />
            <Text style={[styles.etaText, { color: colors.textPrimary }]}>
              Courier Jacob Jones is standing by near Delta Junction
            </Text>
          </View>

          <PrimaryButton
            title="Authorize & Dispatch ($5,950)"
            onPress={() => navigateTo('TrackOrder', 'varient_1')}
            style={{ marginTop: 20 }}
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
  stepperRow: {
    paddingHorizontal: 28,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: {
    fontSize: 11,
    fontWeight: '800',
  },
  stepLabel: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  stepLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 8,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  tiersRow: {
    flexDirection: 'row',
    gap: 12,
  },
  tierCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 14,
    gap: 4,
  },
  tierName: {
    fontSize: 14.5,
    fontWeight: '800',
    marginTop: 4,
  },
  tierTime: {
    fontSize: 12,
  },
  tierFee: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 4,
  },
  summaryBox: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  boxLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  boxLineTitle: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  boxLineSub: {
    fontSize: 12.5,
    marginTop: 2,
  },
  editLink: {
    fontSize: 13,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
  },
  etaStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  etaText: {
    fontSize: 12.5,
    fontWeight: '600',
    flex: 1,
  },
});

export default CheckoutVarient2;
