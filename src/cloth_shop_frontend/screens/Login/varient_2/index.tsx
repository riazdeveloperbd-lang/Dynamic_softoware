import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Lock } from 'lucide-react';
import {
  FormInput,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  SocialAuthButtons,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const LoginVarient2: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors, isDark } = useTheme();
  const [mode, setMode] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('cody.fisher45@example.com');
  const [password, setPassword] = useState('56772809hjs');

  return (
    <ScreenWrapper preset="form" showHeader={false}>
      <View
        style={[styles.container, { backgroundColor: colors.surface }]}
      >
        {/* Top Monogram Header */}
        <View
          style={[
            styles.topBanner,
            { backgroundColor: isDark ? '#18181B' : '#1A1A1A' },
          ]}
        >
          <StatusBar dark />
          <View style={styles.bannerInner}>
            <View style={styles.logoCircle}>
              <Lock size={20} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.bannerTitle}>Welcome Back</Text>
              <Text style={styles.bannerSub}>
                Sign in to access your saved wardrobe & orders
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.cardBox,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            {/* Segmented Mode Switcher */}
            <View
              style={[
                styles.segmentBar,
                { backgroundColor: colors.surface },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  setMode('email');
                  setIdentifier('cody.fisher45@example.com');
                }}
                style={[
                  styles.segmentBtn,
                  mode === 'email' && {
                    backgroundColor: colors.cardBackground,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color:
                        mode === 'email'
                          ? colors.textPrimary
                          : colors.textSecondary,
                    },
                  ]}
                >
                  Email Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setMode('phone');
                  setIdentifier('+1 (234) 453-2315');
                }}
                style={[
                  styles.segmentBtn,
                  mode === 'phone' && {
                    backgroundColor: colors.cardBackground,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color:
                        mode === 'phone'
                          ? colors.textPrimary
                          : colors.textSecondary,
                    },
                  ]}
                >
                  Phone ID
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formStack}>
              <FormInput
                label={mode === 'email' ? 'Email Address' : 'Phone Number'}
                value={identifier}
                onChangeText={setIdentifier}
                status="success"
              />
              <FormInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                type="password"
                status="success"
              />
            </View>

            <TouchableOpacity
              onPress={() => navigateTo('ForgotPassword', 'varient_2')}
              style={styles.forgotLinkWrap}
            >
              <Text
                style={[styles.forgotLinkText, { color: colors.textPrimary }]}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>

            <PrimaryButton
              title="Sign In to Studio"
              onPress={() => navigateTo('Homepage', 'varient_1')}
              style={{ marginTop: 14 }}
            />

            <View style={styles.orDivider}>
              <View
                style={[styles.line, { backgroundColor: colors.divider }]}
              />
              <Text
                style={[styles.orLabel, { color: colors.textSecondary }]}
              >
                OR CONTINUE WITH
              </Text>
              <View
                style={[styles.line, { backgroundColor: colors.divider }]}
              />
            </View>

            <SocialAuthButtons
              mode="Login"
              onPress={() => navigateTo('Homepage', 'varient_1')}
            />
          </View>

          <View style={styles.footerRow}>
            <Text
              style={[styles.footerText, { color: colors.textSecondary }]}
            >
              New to Define?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigateTo('SignUp', 'varient_2')}>
              <Text
                style={[styles.footerAction, { color: colors.textPrimary }]}
              >
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <HomeIndicator />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBanner: {
    paddingBottom: 36,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  bannerInner: {
    paddingHorizontal: 24,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  bannerSub: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 13,
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: -22,
  },
  cardBox: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
  },
  segmentBar: {
    height: 44,
    borderRadius: 10,
    padding: 4,
    flexDirection: 'row',
    marginBottom: 18,
  },
  segmentBtn: {
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  formStack: {
    gap: 14,
  },
  forgotLinkWrap: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotLinkText: {
    fontSize: 13.5,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
  },
  orLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
  },
  footerAction: {
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

export default LoginVarient2;
