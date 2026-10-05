import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MapPin, Phone, Truck, Warehouse, X } from 'lucide-react';
import {
  AppHeader,
  HomeIndicator,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const TrackOrderVarient1: React.FC = () => {
  const { goBack } = useAppNavigation();
  const { colors, isDark } = useTheme();

  const timelineSteps = [
    {
      title: 'Packing',
      address: '2336 Jack Warren Rd, Delta Junction, Alaska 9...',
      done: true,
    },
    {
      title: 'Picked',
      address: '2417 Tongass Ave #111, Ketchikan, Alaska 99901...',
      done: true,
    },
    {
      title: 'In Transit',
      address: '16 Rr 2, Ketchikan, Alaska 99901, USA',
      done: true,
    },
    {
      title: 'Delivered',
      address: '925 S Chugach St #APT 10, Alaska 99645',
      done: false,
    },
  ];

  return (
    <ScreenWrapper preset="map">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Track Order" showBorder={false} />

        {/* Route Map Canvas */}
        <View style={styles.mapArea}>
          <svg width="390" height="320" viewBox="0 0 390 320" fill="none">
            <rect
              width="390"
              height="320"
              fill={isDark ? '#1A1A1E' : '#F3F3F3'}
            />
            <rect
              x="28"
              y="88"
              width="38"
              height="58"
              fill={isDark ? '#27272C' : '#E6E6E6'}
            />
            <rect
              x="128"
              y="138"
              width="44"
              height="32"
              fill={isDark ? '#27272C' : '#E6E6E6'}
            />
            <rect
              x="190"
              y="138"
              width="44"
              height="32"
              fill={isDark ? '#27272C' : '#E6E6E6'}
            />
            <rect
              x="242"
              y="138"
              width="44"
              height="80"
              fill={isDark ? '#27272C' : '#E6E6E6'}
            />
            <rect
              x="52"
              y="218"
              width="60"
              height="44"
              fill={isDark ? '#27272C' : '#E6E6E6'}
            />
            <rect
              x="176"
              y="246"
              width="48"
              height="44"
              fill={isDark ? '#27272C' : '#E6E6E6'}
            />

            <path
              d="M142 246 L104 246 L98 190 L102 106 L302 104 L302 68 L340 68"
              stroke={colors.primary}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <View
            style={[
              styles.mapMarkerDark,
              {
                top: 226,
                left: 128,
                backgroundColor: colors.primary,
              },
            ]}
          >
            <Warehouse size={18} color={colors.primaryText} />
          </View>

          <View
            style={[
              styles.mapMarkerTruck,
              {
                top: 82,
                left: 164,
                backgroundColor: colors.cardBackground,
                borderColor: colors.primary,
              },
            ]}
          >
            <Truck size={22} color={colors.textPrimary} />
          </View>

          <View
            style={[
              styles.mapMarkerDark,
              {
                top: 48,
                left: 320,
                backgroundColor: colors.primary,
              },
            ]}
          >
            <MapPin size={18} color={colors.primaryText} />
          </View>
        </View>

        {/* Order Status Bottom Sheet */}
        <View
          style={[
            styles.statusSheet,
            { backgroundColor: colors.surfaceElevated },
          ]}
        >
          <View
            style={[styles.sheetGrabber, { backgroundColor: colors.border }]}
          />
          <View style={styles.sheetHeaderRow}>
            <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>
              Order Status
            </Text>
            <TouchableOpacity onPress={goBack}>
              <X size={22} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <View
            style={[styles.divider, { backgroundColor: colors.divider }]}
          />

          <View style={styles.timelineWrap}>
            {timelineSteps.map((step, idx) => (
              <View key={step.title} style={styles.stepRow}>
                <View style={styles.stepIndicatorCol}>
                  <View
                    style={[
                      styles.stepCircleOuter,
                      {
                        borderColor: step.done
                          ? colors.primary
                          : colors.border,
                      },
                    ]}
                  >
                    {step.done && (
                      <View
                        style={[
                          styles.stepCircleInner,
                          { backgroundColor: colors.primary },
                        ]}
                      />
                    )}
                  </View>
                  {idx < timelineSteps.length - 1 && (
                    <View
                      style={[
                        styles.stepDashedLine,
                        {
                          backgroundColor: step.done
                            ? colors.primary
                            : colors.border,
                        },
                      ]}
                    />
                  )}
                </View>

                <View style={styles.stepTextCol}>
                  <Text
                    style={[styles.stepTitle, { color: colors.textPrimary }]}
                  >
                    {step.title}
                  </Text>
                  <Text
                    style={[
                      styles.stepAddress,
                      { color: colors.textSecondary },
                    ]}
                    numberOfLines={1}
                  >
                    {step.address}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View
            style={[styles.divider, { backgroundColor: colors.divider }]}
          />

          <View style={styles.courierRow}>
            <View style={styles.courierLeft}>
              <View
                style={[
                  styles.courierAvatar,
                  { backgroundColor: colors.surface },
                ]}
              >
                <Text
                  style={[
                    styles.courierInitials,
                    { color: colors.textPrimary },
                  ]}
                >
                  JJ
                </Text>
              </View>
              <View>
                <Text
                  style={[styles.courierName, { color: colors.textPrimary }]}
                >
                  Jacob Jones
                </Text>
                <Text
                  style={[styles.courierRole, { color: colors.textSecondary }]}
                >
                  Delivery Guy
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.callCircleBtn,
                { backgroundColor: colors.surface },
              ]}
              activeOpacity={0.8}
            >
              <Phone
                size={20}
                color={colors.textPrimary}
                fill={colors.textPrimary}
              />
            </TouchableOpacity>
          </View>

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
  mapArea: {
    height: 295,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  mapMarkerDark: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(26,26,26,0.2)',
  },
  mapMarkerTruck: {
    position: 'absolute',
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusSheet: {
    flex: 1,
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  sheetGrabber: {
    width: 64,
    height: 5,
    borderRadius: 99,
    alignSelf: 'center',
    marginBottom: 10,
  },
  sheetHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  timelineWrap: {
    gap: 2,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 12,
  },
  stepIndicatorCol: {
    alignItems: 'center',
    width: 22,
  },
  stepCircleOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  stepDashedLine: {
    width: 2,
    height: 36,
    marginVertical: 2,
  },
  stepTextCol: {
    flex: 1,
    paddingBottom: 14,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  stepAddress: {
    fontSize: 13,
    marginTop: 2,
  },
  courierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  courierLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  courierAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courierInitials: {
    fontSize: 16,
    fontWeight: '700',
  },
  courierName: {
    fontSize: 16,
    fontWeight: '700',
  },
  courierRole: {
    fontSize: 13.5,
  },
  callCircleBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TrackOrderVarient1;
