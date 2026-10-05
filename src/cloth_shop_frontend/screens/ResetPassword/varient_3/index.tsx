import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { CheckCircle2, Lock, Smartphone } from 'lucide-react';
import {
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const ResetPasswordVarient3: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();

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
          <View style={styles.heroBadgeWrap}>
            <View
              style={[
                styles.successCircle,
                { backgroundColor: colors.successBg },
              ]}
            >
              <CheckCircle2 size={46} color={colors.success} />
            </View>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Credentials Updated!
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Your Define Apparel master password has been rotated across all active sessions.
            </Text>
          </View>

          {/* Security Audit Summary Card */}
          <View
            style={[
              styles.auditCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.auditHeading, { color: colors.textPrimary }]}>
              SECURITY AUDIT SUMMARY
            </Text>

            <View style={styles.auditRow}>
              <Lock size={18} color={colors.textPrimary} />
              <View style={{ flex: 1 }}>
                <Text
                  style={[styles.auditItemTitle, { color: colors.textPrimary }]}
                >
                  256-Bit Key Rotation
                </Text>
                <Text
                  style={[
                    styles.auditItemSub,
                    { color: colors.textSecondary },
                  ]}
                >
                  Completed today at 9:41 AM
                </Text>
              </View>
            </View>

            <View
              style={[styles.divider, { backgroundColor: colors.divider }]}
            />

            <View style={styles.auditRow}>
              <Smartphone size={18} color={colors.textPrimary} />
              <View style={{ flex: 1 }}>
                <Text
                  style={[styles.auditItemTitle, { color: colors.textPrimary }]}
                >
                  Trusted Primary Device
                </Text>
                <Text
                  style={[
                    styles.auditItemSub,
                    { color: colors.textSecondary },
                  ]}
                >
                  iPhone 16 Pro • Alaska, USA
                </Text>
              </View>
            </View>
          </View>

          <PrimaryButton
            title="Proceed to Account Login"
            onPress={() => navigateTo('Login', 'varient_1')}
            style={{ marginTop: 24 }}
          />

          <TouchableOpacity
            onPress={() => navigateTo('Homepage', 'varient_1')}
            style={styles.skipBtn}
          >
            <Text style={[styles.skipBtnText, { color: colors.textPrimary }]}>
              Go Directly to Discover Feed
            </Text>
          </TouchableOpacity>
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
    paddingTop: 28,
    paddingBottom: 24,
  },
  heroBadgeWrap: {
    alignItems: 'center',
    marginBottom: 28,
  },
  successCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14.5,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 8,
  },
  auditCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    gap: 12,
  },
  auditHeading: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  auditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  auditItemTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  auditItemSub: {
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    height: 1,
  },
  skipBtn: {
    alignItems: 'center',
    marginTop: 18,
  },
  skipBtnText: {
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

export default ResetPasswordVarient3;
