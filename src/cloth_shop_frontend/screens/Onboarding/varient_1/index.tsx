import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../../../assets';
import {
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const OnboardingVarient1: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors, isDark } = useTheme();

  return (
    <ScreenWrapper preset="hero" showHeader={false}>
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />

        <View style={styles.wavesLayer}>
          <svg width="390" height="580" viewBox="0 0 390 580" fill="none">
            <path
              d="M20 260 C 160 190, 290 210, 410 340"
              stroke={isDark ? '#27272A' : '#EBEBEB'}
              strokeWidth="1.5"
            />
            <path
              d="M20 310 C 160 240, 290 260, 410 390"
              stroke={isDark ? '#27272A' : '#EBEBEB'}
              strokeWidth="1.5"
            />
            <path
              d="M20 360 C 160 290, 290 310, 410 440"
              stroke={isDark ? '#27272A' : '#EBEBEB'}
              strokeWidth="1.5"
            />
            <path
              d="M20 410 C 160 340, 290 360, 410 490"
              stroke={isDark ? '#27272A' : '#EBEBEB'}
              strokeWidth="1.5"
            />
          </svg>
        </View>

        <View style={styles.heroBody}>
          <View style={styles.headlineWrap}>
            <Text style={[styles.headline, { color: colors.textPrimary }]}>
              Define{'\n'}yourself in{'\n'}your unique{'\n'}way.
            </Text>
          </View>

          <Image
            source={{ uri: IMAGES.onboardingModel }}
            style={styles.modelImage}
            resizeMode="cover"
          />
        </View>

        <View
          style={[
            styles.bottomCtaBar,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
            },
          ]}
        >
          <PrimaryButton
            title="Get Started"
            onPress={() => navigateTo('SignUp', 'varient_1')}
            rightIcon={
              <ArrowRight
                size={20}
                color={colors.primaryText}
                strokeWidth={2.2}
              />
            }
          />
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
    position: 'relative',
  },
  wavesLayer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
  },
  heroBody: {
    flex: 1,
    position: 'relative',
  },
  headlineWrap: {
    paddingHorizontal: 24,
    paddingTop: 12,
    zIndex: 2,
  },
  headline: {
    fontSize: 54,
    fontWeight: '800',
    lineHeight: 54,
    letterSpacing: -1.8,
  },
  modelImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '92%',
    height: '78%',
    zIndex: 3,
  },
  bottomCtaBar: {
    borderTopWidth: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    zIndex: 10,
  },
});

export default OnboardingVarient1;
