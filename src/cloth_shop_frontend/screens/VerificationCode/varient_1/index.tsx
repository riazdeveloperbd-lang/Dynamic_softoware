import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react';
import {
  IOSKeyboard,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const VerificationCodeVarient1: React.FC = () => {
  const { goBack, navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const [digits, setDigits] = useState(['1', '4', '2', '0']);

  return (
    <ScreenWrapper preset="form" showHeader={false}>
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <View style={styles.body}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <ArrowLeft size={24} color={colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>

          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Enter 4 Digit Code
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Enter 4 digit code that your receive on your email (
            <Text style={[styles.emailText, { color: colors.textPrimary }]}>
              cody.fisher45@example.com
            </Text>
            ).
          </Text>

          <View style={styles.otpRow}>
            {digits.map((digit, index) => (
              <View
                key={index}
                style={[
                  styles.otpBox,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.cardBackground,
                  },
                ]}
              >
                <Text
                  style={[styles.otpDigit, { color: colors.textPrimary }]}
                >
                  {digit}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.resendRow}>
            <Text style={[styles.resendMuted, { color: colors.textSecondary }]}>
              Email not received?{' '}
            </Text>
            <TouchableOpacity onPress={() => setDigits(['1', '4', '2', '0'])}>
              <Text style={[styles.resendLink, { color: colors.textPrimary }]}>
                Resend code
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.spacer} />

          <PrimaryButton
            title="Continue"
            onPress={() => navigateTo('ResetPassword', 'varient_1')}
            style={{ marginBottom: 18 }}
          />
        </View>

        <IOSKeyboard />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginLeft: -6,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
  emailText: {
    fontWeight: '500',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginTop: 28,
  },
  otpBox: {
    width: 64,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpDigit: {
    fontSize: 28,
    fontWeight: '700',
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  resendMuted: {
    fontSize: 14.5,
  },
  resendLink: {
    fontSize: 14.5,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  spacer: {
    flex: 1,
  },
});

export default VerificationCodeVarient1;
