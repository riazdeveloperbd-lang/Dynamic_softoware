import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react';
import {
  FormInput,
  IOSKeyboard,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const ForgotPasswordVarient1: React.FC = () => {
  const { goBack, navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const [email, setEmail] = useState('cody.fisher45@example.com');

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
            Forgot password
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Enter your email for the verification process. We will send 4 digits
            code to your email.
          </Text>

          <View style={{ marginTop: 24 }}>
            <FormInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
            />
          </View>

          <View style={styles.spacer} />

          <PrimaryButton
            title="Send Code"
            onPress={() => navigateTo('VerificationCode', 'varient_1')}
            style={{ marginBottom: 18 }}
          />
        </View>

        <IOSKeyboard
          onKeyPress={(k) => {
            if (k === 'BACKSPACE') {
              setEmail((prev) => prev.slice(0, -1));
            } else {
              setEmail((prev) => prev + k.toLowerCase());
            }
          }}
        />
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
  spacer: {
    flex: 1,
  },
});

export default ForgotPasswordVarient1;
