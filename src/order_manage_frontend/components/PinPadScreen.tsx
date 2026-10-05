import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

export function PinPadScreen() {
  const { user, loginWithPin, lockUntil } = useLedger();
  const { colors, isDark } = useAppTheme();
  const [pin, setPin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Lockout countdown
  useEffect(() => {
    if (lockUntil && Date.now() < lockUntil) {
      const updateTimer = () => {
        const remaining = Math.max(0, Math.ceil((lockUntil - Date.now()) / 1000));
        setCountdown(remaining);
      };
      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    } else {
      setCountdown(0);
    }
  }, [lockUntil]);

  const handleKeyPress = (num: number) => {
    if (pin.length >= 4 || countdown > 0) return;
    const newPin = pin + String(num);
    setPin(newPin);
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {}

    if (newPin.length === 4) {
      setTimeout(() => {
        const result = loginWithPin(newPin);
        if (!result.success) {
          try {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          } catch (e) {}
          setErrorMessage(result.error || 'Incorrect PIN');
          setPin('');
        }
      }, 150);
    }
  };

  const handleBackspace = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  const handleClear = () => {
    setPin('');
    setErrorMessage('');
  };

  const handleQuickDemoLogin = () => {
    loginWithPin('1234');
  };

  const isLocked = countdown > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.cardContainer}>
        {/* Brand Header */}
        <View style={styles.brandContainer}>
          <View style={[styles.seal, { backgroundColor: colors.primary }]}>
            <Ionicons name="shield-checkmark" size={32} color="#ffffff" />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>TR Connect</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Executive Shop & Remittance Ledger</Text>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              shadowColor: isDark ? '#000' : 'rgba(0,0,0,0.08)',
            },
          ]}>
          <Text style={[styles.cardLabel, { color: colors.textSecondary }]}>
            {isLocked ? 'Account Security Lock' : 'Enter 4-digit PIN to authenticate'}
          </Text>

          {isLocked ? (
            <View style={styles.lockBox}>
              <Ionicons name="lock-closed" size={36} color={colors.crimson} />
              <Text style={[styles.lockText, { color: colors.textSecondary }]}>
                Too many incorrect attempts.{'\n'}Try again in{' '}
                <Text style={[styles.countdownText, { color: colors.crimson }]}>{countdown}s</Text>
              </Text>
            </View>
          ) : (
            <>
              {/* PIN Dots */}
              <View style={styles.dotsRow}>
                {[0, 1, 2, 3].map((i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      { borderColor: colors.primary },
                      i < pin.length && [styles.dotFilled, { backgroundColor: colors.primary }],
                    ]}
                  />
                ))}
              </View>

              {/* Numeric Keypad */}
              <View style={styles.keypad}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <TouchableOpacity
                    key={n}
                    style={[
                      styles.key,
                      {
                        backgroundColor: colors.cardElevated,
                        borderColor: colors.border,
                      },
                    ]}
                    onPress={() => handleKeyPress(n)}
                    activeOpacity={0.65}>
                    <Text style={[styles.keyNumber, { color: colors.text }]}>{n}</Text>
                  </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.keyAction} onPress={handleClear}>
                  <Text style={[styles.keyActionText, { color: colors.textSecondary }]}>Clear</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.key,
                    {
                      backgroundColor: colors.cardElevated,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => handleKeyPress(0)}
                  activeOpacity={0.65}>
                  <Text style={[styles.keyNumber, { color: colors.text }]}>0</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.keyAction} onPress={handleBackspace}>
                  <Ionicons name="backspace-outline" size={22} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </>
          )}

          {errorMessage ? <Text style={[styles.errText, { color: colors.crimson }]}>{errorMessage}</Text> : null}

          {/* Quick Demo Login Option */}
          <TouchableOpacity
            style={[
              styles.quickLoginBtn,
              {
                backgroundColor: colors.primaryGlow,
                borderColor: colors.borderPrimary,
              },
            ]}
            onPress={handleQuickDemoLogin}>
            <Ionicons name="finger-print-outline" size={16} color={colors.primaryLight} />
            <Text style={[styles.quickLoginText, { color: colors.primaryLight }]}>One-Tap Demo Login (1234)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerNote}>
          <Text style={[styles.footerText, { color: colors.textMuted }]}>Enterprise Bank-Grade Cryptographic Ledger</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
  },
  cardContainer: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  seal: {
    width: 64,
    height: 64,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: '500',
  },
  card: {
    width: '100%',
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    borderWidth: 1,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  cardLabel: {
    fontSize: 13.5,
    fontWeight: '600',
    marginBottom: 20,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 26,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  dotFilled: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 2,
  },
  keypad: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  key: {
    width: '30%',
    height: 56,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  keyNumber: {
    fontSize: 23,
    fontWeight: '700',
  },
  keyAction: {
    width: '30%',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyActionText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  errText: {
    marginTop: 14,
    fontSize: 12.5,
    fontWeight: '700',
    textAlign: 'center',
  },
  quickLoginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 18,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  quickLoginText: {
    fontSize: 12,
    fontWeight: '700',
  },
  lockBox: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  lockText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  countdownText: {
    fontWeight: '800',
    fontSize: 18,
  },
  footerNote: {
    marginTop: 20,
  },
  footerText: {
    fontSize: 11,
  },
});
