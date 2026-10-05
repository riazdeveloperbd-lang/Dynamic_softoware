import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowUpRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { IMAGES } from '../../../assets';
import {
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const OnboardingVarient3: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();

  return (
    <ScreenWrapper preset="hero" showHeader={false}>
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />

        <View style={styles.headerRow}>
          <Text style={[styles.brandTitle, { color: colors.textPrimary }]}>
            DEFINE®
          </Text>
          <View
            style={[styles.seasonBadge, { backgroundColor: colors.surface }]}
          >
            <Text style={[styles.seasonText, { color: colors.textPrimary }]}>
              COLLECTION ’26
            </Text>
          </View>
        </View>

        {/* Bento Mosaic Grid */}
        <View style={styles.bentoGrid}>
          <View style={styles.bentoTopRow}>
            <View
              style={[
                styles.bentoMainCard,
                { backgroundColor: colors.productTile },
              ]}
            >
              <Image
                source={{ uri: IMAGES.onboardingModel }}
                style={styles.bentoImage}
                resizeMode="cover"
              />
              <View style={styles.bentoOverlayBadge}>
                <Sparkles size={12} color="#FFFFFF" />
                <Text style={styles.bentoOverlayText}>NEW ARRIVALS</Text>
              </View>
            </View>

            <View style={styles.bentoRightCol}>
              <View
                style={[
                  styles.bentoSmallCard,
                  { backgroundColor: colors.productTile },
                ]}
              >
                <Image
                  source={{ uri: IMAGES.blackVneckTshirt }}
                  style={styles.bentoImage}
                  resizeMode="cover"
                />
              </View>
              <View
                style={[
                  styles.bentoStatCard,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text
                  style={[styles.statBig, { color: colors.primaryText }]}
                >
                  4.9★
                </Text>
                <Text
                  style={[styles.statSub, { color: colors.primaryText }]}
                >
                  50k+ Verified Stylists
                </Text>
              </View>
            </View>
          </View>

          {/* Feature Pillars */}
          <View style={styles.pillarsRow}>
            <View
              style={[
                styles.pillarChip,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Zap size={15} color={colors.textPrimary} />
              <Text style={[styles.pillarText, { color: colors.textPrimary }]}>
                Fast Dispatch
              </Text>
            </View>
            <View
              style={[
                styles.pillarChip,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <ShieldCheck size={15} color={colors.textPrimary} />
              <Text style={[styles.pillarText, { color: colors.textPrimary }]}>
                100% Cotton
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <Text style={[styles.headline, { color: colors.textPrimary }]}>
            Curated Streetwear For Bold Creators.
          </Text>
          <Text style={[styles.subline, { color: colors.textSecondary }]}>
            Join the club to unlock member pricing and instant checkout.
          </Text>

          <PrimaryButton
            title="Explore Collection"
            onPress={() => navigateTo('Homepage', 'varient_1')}
            rightIcon={<ArrowUpRight size={20} color={colors.primaryText} />}
            style={{ marginTop: 16 }}
          />

          <TouchableOpacity
            onPress={() => navigateTo('Login', 'varient_1')}
            style={styles.loginLinkRow}
          >
            <Text
              style={[styles.loginLinkText, { color: colors.textSecondary }]}
            >
              Already a member?{' '}
              <Text style={{ color: colors.textPrimary, fontWeight: '700' }}>
                Log In
              </Text>
            </Text>
          </TouchableOpacity>
          <HomeIndicator />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerRow: {
    paddingHorizontal: 24,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
  },
  seasonBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  seasonText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  bentoGrid: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 14,
    gap: 12,
  },
  bentoTopRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  bentoMainCard: {
    flex: 1.3,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  bentoRightCol: {
    flex: 1,
    gap: 12,
  },
  bentoSmallCard: {
    flex: 1.2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  bentoStatCard: {
    flex: 0.8,
    borderRadius: 20,
    padding: 14,
    justifyContent: 'center',
  },
  statBig: {
    fontSize: 26,
    fontWeight: '800',
  },
  statSub: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.85,
    marginTop: 4,
  },
  bentoImage: {
    width: '100%',
    height: '100%',
  },
  bentoOverlayBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  bentoOverlayText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  pillarsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pillarChip: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  pillarText: {
    fontSize: 13,
    fontWeight: '600',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  headline: {
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
    letterSpacing: -0.6,
  },
  subline: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  loginLinkRow: {
    alignItems: 'center',
    paddingTop: 12,
  },
  loginLinkText: {
    fontSize: 14,
  },
});

export default OnboardingVarient3;
