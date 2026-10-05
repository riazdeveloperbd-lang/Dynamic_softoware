import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  FormInput,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  SocialAuthButtons,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export interface LoginFormProps {
  initialState?: 'empty' | 'error' | 'success';
}

export const LoginFormView: React.FC<LoginFormProps> = ({
  initialState = 'empty',
}) => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();

  const [email, setEmail] = useState(
    initialState === 'empty'
      ? ''
      : initialState === 'error'
      ? 'cody.fisher45@example'
      : 'cody.fisher45@example.com'
  );
  const [password, setPassword] = useState(
    initialState === 'empty' ? '' : '56772809hjs'
  );

  useEffect(() => {
    if (initialState === 'empty') {
      setEmail('');
      setPassword('');
    } else if (initialState === 'error') {
      setEmail('cody.fisher45@example');
      setPassword('56772809hjs');
    } else {
      setEmail('cody.fisher45@example.com');
      setPassword('56772809hjs');
    }
  }, [initialState]);

  const isEmailValid = email.includes('@') && email.includes('.');
  const hasError = email.length > 0 && !isEmailValid;
  const isSuccess = isEmailValid && password.length >= 6;

  return (
    <ScreenWrapper preset="form" showHeader={false}>
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Login to your account
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            It’s great to see you again.
          </Text>

          <View style={styles.formStack}>
            <FormInput
              label="Email"
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
              status={
                hasError ? 'error' : isSuccess ? 'success' : 'default'
              }
              errorMessage={
                hasError ? 'Please enter valid email address' : undefined
              }
            />

            <FormInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              type={initialState === 'empty' ? 'password' : 'text'}
              status={isSuccess ? 'success' : 'default'}
            />
          </View>

          <View style={styles.forgotRow}>
            <Text style={[styles.forgotText, { color: colors.textPrimary }]}>
              Forgot your password?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigateTo('ForgotPassword', 'varient_1')}
            >
              <Text style={[styles.forgotLink, { color: colors.textPrimary }]}>
                Reset your password
              </Text>
            </TouchableOpacity>
          </View>

          <PrimaryButton
            title="Login"
            disabled={!isSuccess}
            onPress={() => navigateTo('Homepage', 'varient_1')}
            style={{ marginTop: 22 }}
          />

          <View style={{ marginTop: 18 }}>
            <SocialAuthButtons
              mode="Login"
              onPress={() => navigateTo('Homepage', 'varient_1')}
            />
          </View>

          <View style={styles.footerRow}>
            <Text style={[styles.footerMuted, { color: colors.textSecondary }]}>
              Don’t have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigateTo('SignUp', 'varient_1')}>
              <Text style={[styles.footerLink, { color: colors.textPrimary }]}>
                Join
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <HomeIndicator />
      </View>
    </ScreenWrapper>
  );
};

export const LoginVarient1: React.FC = () => (
  <LoginFormView initialState="empty" />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 24,
  },
  formStack: {
    gap: 16,
  },
  forgotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  forgotText: {
    fontSize: 14,
  },
  forgotLink: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 84,
  },
  footerMuted: {
    fontSize: 15,
  },
  footerLink: {
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default LoginVarient1;
