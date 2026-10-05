import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ArrowRight, Check, Gift, Truck } from 'lucide-react';
import {
  FormInput,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const SignUpVarient3: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const [stylePref, setStylePref] = useState<'Streetwear' | 'Minimal' | 'Athleisure'>('Streetwear');
  const [fullName, setFullName] = useState('Cody Fisher');
  const [email, setEmail] = useState('cody.fisher45@example.com');
  const [password, setPassword] = useState('56772809hjs');

  const prefs: ('Streetwear' | 'Minimal' | 'Athleisure')[] = [
    'Streetwear',
    'Minimal',
    'Athleisure',
  ];

  return (
    <ScreenWrapper preset="form" showHeader={false}>
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />

        {/* Stepper Header */}
        <View style={styles.stepperHeader}>
          <View style={styles.stepLabelsRow}>
            <Text style={[styles.stepTag, { color: colors.textPrimary }]}>
              STEP 02 OF 02
            </Text>
            <Text style={[styles.stepName, { color: colors.textSecondary }]}>
              Style Profile & Credentials
            </Text>
          </View>
          <View
            style={[styles.progressBarBg, { backgroundColor: colors.surface }]}
          >
            <View
              style={[
                styles.progressBarFill,
                { backgroundColor: colors.primary },
              ]}
            />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Personalize Your Feed
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Choose your primary aesthetic so we can curate drops for you.
          </Text>

          {/* Style Preference Selector Pills */}
          <View style={styles.prefGrid}>
            {prefs.map((p) => {
              const active = stylePref === p;
              return (
                <TouchableOpacity
                  key={p}
                  onPress={() => setStylePref(p)}
                  style={[
                    styles.prefCard,
                    active
                      ? {
                          backgroundColor: colors.primary,
                          borderColor: colors.primary,
                        }
                      : {
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                        },
                  ]}
                >
                  <Text
                    style={[
                      styles.prefCardText,
                      {
                        color: active
                          ? colors.primaryText
                          : colors.textPrimary,
                      },
                    ]}
                  >
                    {p}
                  </Text>
                  {active && <Check size={14} color={colors.primaryText} />}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Benefits Strip */}
          <View style={styles.perksRow}>
            <View
              style={[
                styles.perkBadge,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Gift size={16} color={colors.textPrimary} />
              <Text style={[styles.perkBadgeText, { color: colors.textPrimary }]}>
                Welcome Gift
              </Text>
            </View>
            <View
              style={[
                styles.perkBadge,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Truck size={16} color={colors.textPrimary} />
              <Text style={[styles.perkBadgeText, { color: colors.textPrimary }]}>
                Free Express
              </Text>
            </View>
          </View>

          {/* Compact Inputs */}
          <View style={styles.formStack}>
            <FormInput
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
            <FormInput
              label="Email"
              value={email}
              onChangeText={setEmail}
            />
            <FormInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              type="password"
            />
          </View>

          <PrimaryButton
            title="Launch My Studio"
            rightIcon={<ArrowRight size={18} color={colors.primaryText} />}
            onPress={() => navigateTo('Homepage', 'varient_1')}
            style={{ marginTop: 22 }}
          />

          <TouchableOpacity
            onPress={() => navigateTo('Login', 'varient_3')}
            style={styles.footerLink}
          >
            <Text
              style={[styles.footerLinkText, { color: colors.textSecondary }]}
            >
              Have a VIP Pass?{' '}
              <Text style={{ color: colors.textPrimary, fontWeight: '700' }}>
                Sign In Here
              </Text>
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
  stepperHeader: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 8,
  },
  stepLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepTag: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  stepName: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressBarBg: {
    height: 6,
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
    marginBottom: 16,
  },
  prefGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  prefCard: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  prefCardText: {
    fontSize: 13,
    fontWeight: '700',
  },
  perksRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  perkBadge: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  perkBadgeText: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  formStack: {
    gap: 14,
  },
  footerLink: {
    alignItems: 'center',
    marginTop: 16,
  },
  footerLinkText: {
    fontSize: 14,
  },
});

export default SignUpVarient3;
