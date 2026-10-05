import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../../../assets';
import { HomeIndicator, ScreenWrapper, StatusBar } from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const OnboardingVarient2: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const [step, setStep] = useState(0);

  const slides = [
    {
      tag: '01 / CURATED SILHOUETTES',
      title: 'Elevate Your Everyday Wardrobe',
      desc: 'Minimalist cuts and heavyweight organic fabrics tailored for modern streetwear.',
      image: IMAGES.navySloganTshirt,
    },
    {
      tag: '02 / SEASONAL DROPS',
      title: 'Limited Capsules Every Friday',
      desc: 'Unlock priority member access to exclusive studio collaborations.',
      image: IMAGES.tealPoloShirt,
    },
    {
      tag: '03 / INSTANT DISPATCH',
      title: 'Express Same-Day Courier Delivery',
      desc: 'Real-time GPS order tracking from our warehouse straight to your door.',
      image: IMAGES.onboardingModel,
    },
  ];

  const current = slides[step];

  return (
    <ScreenWrapper preset="hero" showHeader={false}>
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />

        <View style={styles.topRow}>
          <View style={styles.stepDots}>
            {slides.map((_, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setStep(idx)}
                style={[
                  styles.dot,
                  {
                    width: step === idx ? 26 : 8,
                    backgroundColor:
                      step === idx ? colors.primary : colors.border,
                  },
                ]}
              />
            ))}
          </View>
          <TouchableOpacity onPress={() => navigateTo('SignUp', 'varient_1')}>
            <Text style={[styles.skipText, { color: colors.textSecondary }]}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardFrameWrap}>
          <View
            style={[
              styles.imageFrame,
              {
                backgroundColor: colors.productTile,
                borderColor: colors.border,
              },
            ]}
          >
            <Image
              source={{ uri: current.image }}
              style={styles.slideImage}
              resizeMode="cover"
            />
            <View
              style={[
                styles.floatingTag,
                { backgroundColor: colors.surfaceElevated },
              ]}
            >
              <Text
                style={[styles.floatingTagText, { color: colors.textPrimary }]}
              >
                {current.tag}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSheet}>
          <Text style={[styles.slideTitle, { color: colors.textPrimary }]}>
            {current.title}
          </Text>
          <Text style={[styles.slideDesc, { color: colors.textSecondary }]}>
            {current.desc}
          </Text>

          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={() => navigateTo('Login', 'varient_1')}
              style={[
                styles.secondaryBtn,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.cardBackground,
                },
              ]}
            >
              <Text
                style={[
                  styles.secondaryBtnText,
                  { color: colors.textPrimary },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (step < slides.length - 1) setStep(step + 1);
                else navigateTo('SignUp', 'varient_1');
              }}
              style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            >
              <Text
                style={[styles.primaryBtnText, { color: colors.primaryText }]}
              >
                {step < slides.length - 1 ? 'Next Slide' : 'Create Account'}
              </Text>
              <ArrowRight size={18} color={colors.primaryText} />
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
    justifyContent: 'space-between',
  },
  topRow: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepDots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardFrameWrap: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  imageFrame: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  floatingTag: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  floatingTagText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  bottomSheet: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    letterSpacing: -0.6,
  },
  slideDesc: {
    fontSize: 14.5,
    lineHeight: 21,
    marginTop: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 4,
  },
  secondaryBtn: {
    height: 54,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontSize: 15,
    fontWeight: '700',
  },
  primaryBtn: {
    flex: 1,
    height: 54,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryBtnText: {
    fontSize: 15,
    fontWeight: '700',
  },
});

export default OnboardingVarient2;
