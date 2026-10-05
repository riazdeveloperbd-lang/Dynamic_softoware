import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Sparkles } from 'lucide-react';
import { IMAGES } from '../../../assets';
import { HomeIndicator, ScreenWrapper, StatusBar } from '../../../component';
import { useAppNavigation, useAppSelector } from '../../../hooks';

export const SplashVarient3: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const appBranding = useAppSelector((s) => s.app.appBranding);

  return (
    <ScreenWrapper preset="hero" showHeader={false}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => navigateTo('Onboarding', 'varient_3')}
        style={styles.container}
      >
        <Image
          source={{ uri: IMAGES.onboardingModel }}
          style={styles.bgPhoto}
          resizeMode="cover"
        />
        <View style={styles.darkOverlay} />

        <StatusBar dark />

        <View style={styles.topPillWrap}>
          <View style={styles.glassPill}>
            <Sparkles size={13} color="#FFFFFF" />
            <Text style={styles.glassPillText}>AUTUMN / WINTER RUNWAY</Text>
          </View>
        </View>

        <View style={styles.bottomCardWrap}>
          <View style={styles.glassCard}>
            <View style={styles.logoBadge}>
              {appBranding?.appLogoUri ? (
                <Image
                  source={{ uri: appBranding.appLogoUri }}
                  style={{ width: 36, height: 36, borderRadius: 8 }}
                  resizeMode="contain"
                />
              ) : (
                <svg width="32" height="32" viewBox="0 0 134 134" fill="none">
                  <path
                    d="M50 0H88V46H134V84C102 84 84 102 84 134H46V88H0V50C32 50 50 32 50 0Z"
                    fill="#FFFFFF"
                  />
                </svg>
              )}
            </View>
            <Text style={styles.heroTitle}>
              {(appBranding?.appName || 'DEFINE STUDIO').toUpperCase()}
            </Text>
            <Text style={styles.heroSubtitle}>
              Curated luxury essentials engineered for everyday movement.
            </Text>

            <View style={styles.loaderDots}>
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
          <HomeIndicator light />
        </View>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B',
    justifyContent: 'space-between',
    position: 'relative',
  },
  bgPhoto: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.65,
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  topPillWrap: {
    alignItems: 'center',
    marginTop: 8,
  },
  glassPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
  },
  glassPillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  bottomCardWrap: {
    paddingHorizontal: 20,
    paddingBottom: 6,
  },
  glassCard: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: 'rgba(18,18,20,0.82)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 2,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13.5,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 6,
  },
  loaderDots: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 18,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#FFFFFF',
  },
});

export default SplashVarient3;
