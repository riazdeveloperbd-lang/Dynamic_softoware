import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ArrowLeft, CheckCircle2, RefreshCw, Shield } from 'lucide-react';
import {
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const VerificationCodeVarient3: React.FC = () => {
  const { goBack, navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const [digits, setDigits] = useState(['1', '4', '2', '0']);

  return (
    <ScreenWrapper preset="form" showHeader={false}>
      <View
        style={[styles.container, { backgroundColor: colors.surface }]}
      >
        <StatusBar />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <ArrowLeft size={24} color={colors.textPrimary} />
          </TouchableOpacity>

          <View
            style={[
              styles.cardContainer,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.shieldCircle,
                { backgroundColor: colors.surface },
              ]}
            >
              <Shield size={28} color={colors.textPrimary} />
            </View>

            <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
              Two-Factor Authentication
            </Text>
            <Text style={[styles.cardSub, { color: colors.textSecondary }]}>
              We detected a password reset request for{' '}
              <Text style={{ color: colors.textPrimary, fontWeight: '700' }}>
                cody.fisher45@example.com
              </Text>
            </Text>

            {/* Elevated 4-Digit Vault Slots */}
            <View style={styles.codeRow}>
              {digits.map((d, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.codeBox,
                    {
                      borderColor: colors.primary,
                      backgroundColor: colors.surface,
                    },
                  ]}
                >
                  <Text
                    style={[styles.codeText, { color: colors.textPrimary }]}
                  >
                    {d}
                  </Text>
                </View>
              ))}
            </View>

            <View
              style={[
                styles.statusStrip,
                { backgroundColor: colors.successBg },
              ]}
            >
              <CheckCircle2 size={16} color={colors.success} />
              <Text style={[styles.statusStripText, { color: colors.success }]}>
                4-Digit Security Token Auto-Filled from Mail
              </Text>
            </View>

            <PrimaryButton
              title="Authorize Password Reset"
              onPress={() => navigateTo('ResetPassword', 'varient_3')}
              style={{ width: '100%', marginTop: 20 }}
            />

            <TouchableOpacity
              onPress={() => setDigits(['8', '3', '9', '1'])}
              style={styles.refreshRow}
            >
              <RefreshCw size={15} color={colors.textSecondary} />
              <Text
                style={[styles.refreshText, { color: colors.textSecondary }]}
              >
                Request a new security code
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
    marginBottom: 12,
  },
  cardContainer: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
  },
  shieldCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  cardSub: {
    fontSize: 13.5,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
  },
  codeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  codeBox: {
    width: 62,
    height: 66,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeText: {
    fontSize: 26,
    fontWeight: '800',
  },
  statusStrip: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  statusStripText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  refreshRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 18,
  },
  refreshText: {
    fontSize: 13.5,
    fontWeight: '600',
  },
});

export default VerificationCodeVarient3;
