import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Sparkles, ShieldCheck } from 'lucide-react';
import {
  FormInput,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  SocialAuthButtons,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const SignUpVarient2: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors, isDark } = useTheme();
  const [fullName, setFullName] = useState('Cody Fisher');
  const [email, setEmail] = useState('cody.fisher45@example.com');
  const [password, setPassword] = useState('56772809hjs');

  return (
    <ScreenWrapper preset="form" showHeader={false}>
      <View
        style={[styles.container, { backgroundColor: colors.surface }]}
      >
        {/* Top Hero Banner */}
        <View
          style={[
            styles.heroBanner,
            { backgroundColor: isDark ? '#18181B' : '#1A1A1A' },
          ]}
        >
          <StatusBar dark />
          <View style={styles.heroBannerContent}>
            <View style={styles.clubPill}>
              <Sparkles size={13} color="#FFA928" />
              <Text style={styles.clubPillText}>DEFINE INSIDER CLUB</Text>
            </View>
            <Text style={styles.heroHeading}>Join the Studio</Text>
            <Text style={styles.heroSub}>
              Get 15% off your first order & free express delivery.
            </Text>
          </View>
        </View>

        {/* Elevated Floating Card Form */}
        <ScrollView
          contentContainerStyle={styles.scrollWrap}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.floatingFormCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.formStack}>
              <FormInput
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
                status="success"
              />
              <FormInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                status="success"
              />
              <FormInput
                label="Create Password"
                value={password}
                onChangeText={setPassword}
                type="password"
                status="success"
              />
            </View>

            <View
              style={[
                styles.perkStrip,
                { backgroundColor: colors.surface },
              ]}
            >
              <ShieldCheck size={16} color={colors.success} />
              <Text
                style={[styles.perkText, { color: colors.textSecondary }]}
              >
                256-bit encrypted member profile
              </Text>
            </View>

            <PrimaryButton
              title="Complete Registration"
              onPress={() => navigateTo('Homepage', 'varient_1')}
              style={{ marginTop: 16 }}
            />

            <View style={styles.dividerRow}>
              <View
                style={[styles.line, { backgroundColor: colors.divider }]}
              />
              <Text
                style={[styles.orText, { color: colors.textSecondary }]}
              >
                OR QUICK JOIN
              </Text>
              <View
                style={[styles.line, { backgroundColor: colors.divider }]}
              />
            </View>

            <SocialAuthButtons
              mode="Sign Up"
              onPress={() => navigateTo('Homepage', 'varient_1')}
            />
          </View>

          <View style={styles.bottomSwitchRow}>
            <Text
              style={[styles.switchLabel, { color: colors.textSecondary }]}
            >
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigateTo('Login', 'varient_2')}>
              <Text
                style={[styles.switchAction, { color: colors.textPrimary }]}
              >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroBanner: {
    paddingBottom: 38,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroBannerContent: {
    paddingHorizontal: 24,
    paddingTop: 6,
  },
  clubPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
    marginBottom: 10,
  },
  clubPillText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroHeading: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  heroSub: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 13.5,
    marginTop: 4,
  },
  scrollWrap: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: -24,
  },
  floatingFormCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  formStack: {
    gap: 14,
  },
  perkStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 14,
  },
  perkText: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
  },
  orText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  bottomSwitchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  switchLabel: {
    fontSize: 14,
  },
  switchAction: {
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

export default SignUpVarient2;
