import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ArrowRight, Fingerprint, KeyRound, ShieldCheck } from 'lucide-react';
import {
  FormInput,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const LoginVarient3: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const [passcode, setPasscode] = useState('56772809hjs');

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
          <Text style={[styles.kicker, { color: colors.textSecondary }]}>
            INSTANT PASSKEY ACCESS
          </Text>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            One-Tap Studio Sign In
          </Text>

          {/* Recognised Member Card */}
          <View
            style={[
              styles.profileCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.avatarCircle,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text style={[styles.avatarText, { color: colors.primaryText }]}>
                CF
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.verifiedRow}>
                <Text
                  style={[styles.memberName, { color: colors.textPrimary }]}
                >
                  Cody Fisher
                </Text>
                <ShieldCheck size={16} color={colors.success} />
              </View>
              <Text
                style={[styles.memberEmail, { color: colors.textSecondary }]}
              >
                cody.fisher45@example.com
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigateTo('Login', 'varient_1')}>
              <Text style={[styles.switchBtn, { color: colors.textPrimary }]}>
                Switch
              </Text>
            </TouchableOpacity>
          </View>

          {/* Biometric FaceID / TouchID Card */}
          <TouchableOpacity
            onPress={() => navigateTo('Homepage', 'varient_1')}
            activeOpacity={0.85}
            style={[
              styles.biometricBox,
              {
                borderColor: colors.border,
                backgroundColor: colors.cardBackground,
              },
            ]}
          >
            <View
              style={[
                styles.bioIconCircle,
                { backgroundColor: colors.surface },
              ]}
            >
              <Fingerprint size={34} color={colors.textPrimary} />
            </View>
            <Text style={[styles.bioTitle, { color: colors.textPrimary }]}>
              Unlock with Biometric Passkey
            </Text>
            <Text style={[styles.bioSubtitle, { color: colors.textSecondary }]}>
              Tap to authenticate with Face ID or Touch ID
            </Text>
          </TouchableOpacity>

          <View style={styles.passwordSection}>
            <FormInput
              label="Or Enter Master Password"
              value={passcode}
              onChangeText={setPasscode}
              type="password"
              rightIcon={<KeyRound size={18} color={colors.textMuted} />}
            />

            <View style={styles.linksRow}>
              <TouchableOpacity
                onPress={() => navigateTo('ForgotPassword', 'varient_3')}
              >
                <Text
                  style={[styles.linkText, { color: colors.textSecondary }]}
                >
                  Reset Passkey
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateTo('SignUp', 'varient_1')}
              >
                <Text style={[styles.linkText, { color: colors.textPrimary }]}>
                  New Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <PrimaryButton
            title="Continue as Cody"
            rightIcon={<ArrowRight size={18} color={colors.primaryText} />}
            onPress={() => navigateTo('Homepage', 'varient_1')}
            style={{ marginTop: 22 }}
          />
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  kicker: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.6,
    marginTop: 4,
    marginBottom: 20,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    marginBottom: 18,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 17,
    fontWeight: '800',
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '700',
  },
  memberEmail: {
    fontSize: 13,
    marginTop: 2,
  },
  switchBtn: {
    fontSize: 13,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  biometricBox: {
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 26,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 22,
  },
  bioIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  bioTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  bioSubtitle: {
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
  passwordSection: {
    gap: 10,
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  linkText: {
    fontSize: 13.5,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default LoginVarient3;
