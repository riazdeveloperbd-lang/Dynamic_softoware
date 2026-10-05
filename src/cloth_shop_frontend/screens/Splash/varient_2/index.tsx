import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowRight } from 'lucide-react';
import { HomeIndicator, ScreenWrapper, StatusBar } from '../../../component';
import { useAppNavigation, useAppSelector, useTheme } from '../../../hooks';

export const SplashVarient2: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors, isDark } = useTheme();
  const appBranding = useAppSelector((s) => s.app.appBranding);

  return (
    <ScreenWrapper preset="hero" showHeader={false}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => navigateTo('Onboarding', 'varient_2')}
        style={[
          styles.container,
          { backgroundColor: isDark ? '#141416' : '#F6F5F2' },
        ]}
      >
        <StatusBar />

        <View style={styles.topMetaRow}>
          <Text style={[styles.editionCode, { color: colors.textSecondary }]}>
            EST. 2026 / ARCHIVE 01
          </Text>
          <View
            style={[styles.liveDot, { backgroundColor: colors.textPrimary }]}
          />
        </View>

        <View style={styles.centerEditorial}>
          <View
            style={[
              styles.emblemBox,
              {
                borderColor: colors.border,
                backgroundColor: colors.cardBackground,
              },
            ]}
          >
            {appBranding?.appLogoUri ? (
              <Image
                source={{ uri: appBranding.appLogoUri }}
                style={{ width: 64, height: 64, borderRadius: 14 }}
                resizeMode="contain"
              />
            ) : (
              <svg width="64" height="64" viewBox="0 0 134 134" fill="none">
                <path
                  d="M50 0H88V46H134V84C102 84 84 102 84 134H46V88H0V50C32 50 50 32 50 0Z"
                  fill={colors.textPrimary}
                />
              </svg>
            )}
          </View>

          <Text style={[styles.brandWordmark, { color: colors.textPrimary }]}>
            {(appBranding?.appName || 'DEFINE').toUpperCase()}
          </Text>
          <Text style={[styles.brandTagline, { color: colors.textSecondary }]}>
            CONTEMPORARY ATELIER & STREETWEAR
          </Text>

          <View style={styles.progressBarWrap}>
            <View
              style={[styles.progressTrack, { backgroundColor: colors.border }]}
            >
              <View
                style={[
                  styles.progressFill,
                  { backgroundColor: colors.primary },
                ]}
              />
            </View>
            <Text style={[styles.loadingPct, { color: colors.textSecondary }]}>
              INITIALIZING STUDIO • 100%
            </Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.enterChip}>
            <Text style={[styles.enterText, { color: colors.textPrimary }]}>
              Tap anywhere to enter
            </Text>
            <ArrowRight size={16} color={colors.textPrimary} />
          </View>
          <HomeIndicator />
        </View>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topMetaRow: {
    paddingHorizontal: 24,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editionCode: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  centerEditorial: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emblemBox: {
    width: 112,
    height: 112,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  brandWordmark: {
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 6,
  },
  brandTagline: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.2,
    marginTop: 8,
    textAlign: 'center',
  },
  progressBarWrap: {
    width: 200,
    marginTop: 40,
    alignItems: 'center',
    gap: 10,
  },
  progressTrack: {
    width: '100%',
    height: 3,
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressFill: {
    width: '72%',
    height: '100%',
  },
  loadingPct: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  bottomRow: {
    alignItems: 'center',
    gap: 12,
  },
  enterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  enterText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default SplashVarient2;
