import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, Delete, ShieldCheck } from 'lucide-react';
import {
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const VerificationCodeVarient2: React.FC = () => {
  const { goBack, navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const [digits, setDigits] = useState<string[]>(['1', '4', '2', '0']);

  const handleDigitPress = (num: string) => {
    setDigits((prev) => {
      const next = [...prev];
      const emptyIdx = next.findIndex((d) => d === '');
      if (emptyIdx !== -1) {
        next[emptyIdx] = num;
      } else {
        next[3] = num;
      }
      return next;
    });
  };

  const handleBackspace = () => {
    setDigits((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i >= 0; i--) {
        if (next[i] !== '') {
          next[i] = '';
          break;
        }
      }
      return next;
    });
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <ScreenWrapper preset="form" showHeader={false}>
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />

        <View style={styles.topHeader}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <ArrowLeft size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <View
            style={[styles.timerPill, { backgroundColor: colors.surface }]}
          >
            <ShieldCheck size={14} color={colors.success} />
            <Text style={[styles.timerText, { color: colors.textPrimary }]}>
              00:48s remaining
            </Text>
          </View>
        </View>

        <View style={styles.centerSection}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Verify Security PIN
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Sent to cody.fisher45@example.com
          </Text>

          <View style={styles.pinCirclesRow}>
            {[0, 1, 2, 3].map((i) => {
              const val = digits[i];
              return (
                <View
                  key={i}
                  style={[
                    styles.pinSlot,
                    {
                      borderColor: val ? colors.primary : colors.border,
                      backgroundColor: val
                        ? colors.surface
                        : colors.cardBackground,
                    },
                  ]}
                >
                  <Text
                    style={[styles.pinDigit, { color: colors.textPrimary }]}
                  >
                    {val || '•'}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Custom Tactile Numeric Dialpad */}
        <View style={styles.keypadWrap}>
          <View style={styles.keypadGrid}>
            {keys.map((k) => (
              <TouchableOpacity
                key={k}
                onPress={() => handleDigitPress(k)}
                style={[
                  styles.numKey,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[styles.numKeyText, { color: colors.textPrimary }]}
                >
                  {k}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => setDigits(['1', '4', '2', '0'])}
              style={[
                styles.numKey,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[styles.resendKeyText, { color: colors.textSecondary }]}
              >
                RESEND
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleDigitPress('0')}
              style={[
                styles.numKey,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.numKeyText, { color: colors.textPrimary }]}>
                0
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleBackspace}
              style={[
                styles.numKey,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Delete size={22} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <PrimaryButton
            title="Verify & Continue"
            onPress={() => navigateTo('ResetPassword', 'varient_1')}
            style={{ marginTop: 16 }}
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
  },
  topHeader: {
    paddingHorizontal: 24,
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginLeft: -6,
  },
  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
  },
  timerText: {
    fontSize: 12,
    fontWeight: '700',
  },
  centerSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 24,
  },
  pinCirclesRow: {
    flexDirection: 'row',
    gap: 14,
  },
  pinSlot: {
    width: 66,
    height: 68,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinDigit: {
    fontSize: 28,
    fontWeight: '800',
  },
  keypadWrap: {
    paddingHorizontal: 24,
  },
  keypadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  numKey: {
    width: '31%',
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numKeyText: {
    fontSize: 22,
    fontWeight: '700',
  },
  resendKeyText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
});

export default VerificationCodeVarient2;
