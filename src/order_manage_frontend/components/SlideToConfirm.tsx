import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Radius } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';

interface SlideToConfirmProps {
  onConfirm: () => void;
  disabled?: boolean;
  text?: string;
}

export function SlideToConfirm({
  onConfirm,
  disabled = false,
  text = 'Slide to confirm order',
}: SlideToConfirmProps) {
  const { colors, isDark } = useAppTheme();
  const [trackWidth, setTrackWidth] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const pan = useRef(new Animated.Value(0)).current;

  const thumbSize = 48;
  const maxSlide = Math.max(0, trackWidth - thumbSize - 6);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled && !isConfirmed,
      onMoveShouldSetPanResponder: () => !disabled && !isConfirmed,
      onPanResponderMove: (_, gestureState) => {
        if (disabled || isConfirmed) return;
        const newX = Math.max(0, Math.min(maxSlide, gestureState.dx));
        pan.setValue(newX);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (disabled || isConfirmed) return;
        if (gestureState.dx >= maxSlide - 8) {
          // Trigger confirmation
          Animated.spring(pan, {
            toValue: maxSlide,
            useNativeDriver: false,
          }).start();
          setIsConfirmed(true);
          try {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          } catch (e) {}
          setTimeout(() => {
            onConfirm();
          }, 350);
        } else {
          // Snap back
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const onLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  return (
    <View
      style={[
        styles.track,
        {
          backgroundColor: colors.cardElevated,
          borderColor: isConfirmed ? colors.emerald : colors.borderPrimary,
        },
        disabled && styles.trackDisabled,
      ]}
      onLayout={onLayout}>
      <Animated.View
        style={[
          styles.fill,
          {
            width: pan.interpolate({
              inputRange: [0, maxSlide || 1],
              outputRange: [thumbSize, trackWidth || thumbSize],
              extrapolate: 'clamp',
            }),
            backgroundColor: isConfirmed ? colors.emerald : colors.primaryGlow,
          },
        ]}
      />

      <View style={styles.labelContainer} pointerEvents="none">
        <Text
          style={[
            styles.label,
            { color: colors.text },
            isConfirmed && styles.labelConfirmed,
          ]}>
          {isConfirmed ? 'Order Confirmed!' : text}
        </Text>
      </View>

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.thumb,
          {
            transform: [{ translateX: pan }],
            backgroundColor: isConfirmed ? colors.emerald : colors.primary,
          },
        ]}>
        <Ionicons
          name={isConfirmed ? 'checkmark-sharp' : 'arrow-forward-sharp'}
          size={24}
          color="#ffffff"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 56,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginTop: 16,
  },
  trackDisabled: {
    opacity: 0.45,
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: Radius.full,
  },
  labelContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  labelConfirmed: {
    color: '#ffffff',
  },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: 24,
    position: 'absolute',
    left: 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
});
