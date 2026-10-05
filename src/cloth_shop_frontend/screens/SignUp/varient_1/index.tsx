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

export interface SignUpFormProps {
  initialState?: 'empty' | 'error' | 'success';
}

export const SignUpFormView: React.FC<SignUpFormProps> = ({
  initialState = 'empty',
}) => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();

  const [fullName, setFullName] = useState(
    initialState === 'empty' ? '' : 'Cody Fisher'
  );
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
      setFullName('');
      setEmail('');
      setPassword('');
    } else if (initialState === 'error') {
      setFullName('Cody Fisher');
      setEmail('cody.fisher45@example');
      setPassword('56772809hjs');
    } else {
      setFullName('Cody Fisher');
      setEmail('cody.fisher45@example.com');
      setPassword('56772809hjs');
    }
  }, [initialState]);

  const isEmailValid = email.includes('@') && email.includes('.');
  const hasError = email.length > 0 && !isEmailValid;
  const isSuccess =
    fullName.trim().length > 1 && isEmailValid && password.length >= 6;

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
            Create an account
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Let’s create your account.
          </Text>

          <View style={styles.formStack}>
            <FormInput
              label="Full Name"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              status={isSuccess ? 'success' : 'default'}
            />

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

          <Text style={[styles.termsText, { color: colors.textPrimary }]}>
            By signing up you agree to our{' '}
            <Text style={styles.underlineText}>Terms</Text>,{' '}
            <Text style={styles.underlineText}>Privacy Policy</Text>, and{' '}
            <Text style={styles.underlineText}>Cookie Use</Text>
          </Text>

          <PrimaryButton
            title="Create an Account"
            disabled={!isSuccess}
            onPress={() => navigateTo('Homepage', 'varient_1')}
            style={{ marginTop: 18 }}
          />

          <View style={{ marginTop: 16 }}>
            <SocialAuthButtons
              mode="Sign Up"
              onPress={() => navigateTo('Homepage', 'varient_1')}
            />
          </View>

          <View style={styles.footerRow}>
            <Text style={[styles.footerMuted, { color: colors.textSecondary }]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigateTo('Login', 'varient_1')}>
              <Text style={[styles.footerLink, { color: colors.textPrimary }]}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <HomeIndicator />
      </View>
    </ScreenWrapper>
  );
};

export const SignUpVarient1: React.FC = () => (
  <SignUpFormView initialState="empty" />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 22,
  },
  formStack: {
    gap: 16,
  },
  termsText: {
    fontSize: 13.5,
    lineHeight: 20,
    marginTop: 14,
  },
  underlineText: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
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

export default SignUpVarient1;
