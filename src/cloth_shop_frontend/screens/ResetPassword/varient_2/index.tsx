import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import {
  FormInput,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const ResetPasswordVarient2: React.FC = () => {
  const { goBack, navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const [pass1, setPass1] = useState('DefineStudio#2026');
  const [pass2, setPass2] = useState('DefineStudio#2026');

  const rules = [
    { label: 'Minimum 8 characters', valid: pass1.length >= 8 },
    { label: 'At least 1 uppercase & lowercase letter', valid: /[A-Z]/.test(pass1) && /[a-z]/.test(pass1) },
    { label: 'At least 1 number or symbol (#, @, !)', valid: /[0-9#@!]/.test(pass1) },
    { label: 'Both passwords match', valid: pass1 === pass2 && pass1.length > 0 },
  ];

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
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <ArrowLeft size={24} color={colors.textPrimary} />
          </TouchableOpacity>

          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Create Strong Password
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Real-time cryptographic strength meter for your new studio password.
          </Text>

          <View style={styles.formStack}>
            <FormInput
              label="New Password"
              value={pass1}
              onChangeText={setPass1}
              type="text"
              status="success"
            />
            <FormInput
              label="Confirm Password"
              value={pass2}
              onChangeText={setPass2}
              type="password"
              status="success"
            />
          </View>

          {/* Strength Meter Bar */}
          <View
            style={[
              styles.meterCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.meterHeaderRow}>
              <View style={styles.meterLeft}>
                <ShieldCheck size={18} color={colors.success} />
                <Text
                  style={[styles.meterTitle, { color: colors.textPrimary }]}
                >
                  Password Strength: Strong
                </Text>
              </View>
              <Text style={[styles.meterScore, { color: colors.success }]}>
                100%
              </Text>
            </View>

            <View style={styles.barsRow}>
              {[1, 2, 3, 4].map((seg) => (
                <View
                  key={seg}
                  style={[
                    styles.barSegment,
                    { backgroundColor: colors.success },
                  ]}
                />
              ))}
            </View>

            <View style={styles.checklistStack}>
              {rules.map((r) => (
                <View key={r.label} style={styles.checkRow}>
                  <CheckCircle2
                    size={16}
                    color={r.valid ? colors.success : colors.textMuted}
                  />
                  <Text
                    style={[
                      styles.checkLabel,
                      {
                        color: r.valid
                          ? colors.textPrimary
                          : colors.textSecondary,
                      },
                    ]}
                  >
                    {r.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <PrimaryButton
            title="Save New Password"
            onPress={() => navigateTo('Login', 'varient_1')}
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
    paddingTop: 8,
    paddingBottom: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginLeft: -6,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
    marginBottom: 20,
  },
  formStack: {
    gap: 14,
  },
  meterCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginTop: 18,
    gap: 12,
  },
  meterHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  meterTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  meterScore: {
    fontSize: 13,
    fontWeight: '800',
  },
  barsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  barSegment: {
    flex: 1,
    height: 5,
    borderRadius: 99,
  },
  checklistStack: {
    gap: 8,
    marginTop: 4,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
});

export default ResetPasswordVarient2;
