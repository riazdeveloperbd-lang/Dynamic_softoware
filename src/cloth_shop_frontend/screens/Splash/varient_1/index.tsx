import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar, HomeIndicator, ScreenWrapper } from '../../../component';
import { useAppNavigation, useAppSelector, useTheme } from '../../../hooks';

export const SplashVarient1: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { isDark } = useTheme();
  const appBranding = useAppSelector((s) => s.app.appBranding);

  return (
    <ScreenWrapper preset="hero" showHeader={false}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => navigateTo('Onboarding', 'varient_1')}
        style={[
          styles.container,
          { backgroundColor: isDark ? '#09090B' : '#1A1A1A' },
        ]}
      >
        <StatusBar dark />

        <View style={styles.wavesWrap}>
          <svg width="390" height="320" viewBox="0 0 390 320" fill="none">
            <path
              d="M-20 80 C 120 20, 240 40, 410 190"
              stroke="#2B2B2B"
              strokeWidth="1.5"
            />
            <path
              d="M-20 120 C 120 60, 240 80, 410 230"
              stroke="#2B2B2B"
              strokeWidth="1.5"
            />
            <path
              d="M-20 160 C 120 100, 240 120, 410 270"
              stroke="#2B2B2B"
              strokeWidth="1.5"
            />
            <path
              d="M-20 200 C 120 140, 240 160, 410 310"
              stroke="#2B2B2B"
              strokeWidth="1.5"
            />
          </svg>
        </View>

        <View style={styles.centerLogoWrap}>
          {appBranding?.appLogoUri ? (
            <Image
              source={{ uri: appBranding.appLogoUri }}
              style={styles.customLogoImg}
              resizeMode="contain"
            />
          ) : (
            <svg width="134" height="134" viewBox="0 0 134 134" fill="none">
              <path
                d="M50 0H88V46H134V84C102 84 84 102 84 134H46V88H0V50C32 50 50 32 50 0Z"
                fill="#FFFFFF"
              />
            </svg>
          )}
          <Text style={styles.appTitleText}>
            {(appBranding?.appName || 'DEFINE ATELIER').toUpperCase()}
          </Text>
        </View>

        <View style={styles.spinnerWrap}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="19" stroke="#333333" strokeWidth="5" />
            <path
              d="M24 5 A19 19 0 1 0 24 43"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </View>

        <HomeIndicator light />
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  wavesWrap: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
  },
  centerLogoWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    gap: 16,
  },
  customLogoImg: {
    width: 112,
    height: 112,
    borderRadius: 24,
  },
  appTitleText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 2.5,
    marginTop: 12,
  },
  spinnerWrap: {
    alignItems: 'center',
    marginBottom: 44,
  },
});

export default SplashVarient1;
