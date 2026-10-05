import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ArrowLeft, Headphones, KeyRound, ShieldAlert } from 'lucide-react';
import {
  FormInput,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const ForgotPasswordVarient3: React.FC = () => {
  const { goBack, navigateTo } = useAppNavigation();
  const { colors, isDark } = useTheme();
  const [email, setEmail] = useState('cody.fisher45@example.com');

  return (
    <ScreenWrapper preset="form" showHeader={false}>
      <View
        style={[styles.container, { backgroundColor: colors.surface }]}
      >
        {/* Top Security Header */}
        <View
          style={[
            styles.topHero,
            { backgroundColor: isDark ? '#18181B' : '#1A1A1A' },
          ]}
        >
          <StatusBar dark />
          <View style={styles.heroBar}>
            <TouchableOpacity onPress={goBack} style={styles.backBtn}>
              <ArrowLeft size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.shieldPill}>
              <ShieldAlert size={14} color="#FFA928" />
              <Text style={styles.shieldPillText}>SECURITY VAULT</Text>
            </View>
          </View>

          <View style={styles.heroTextWrap}>
            <Text style={styles.heroTitle}>Restore Access</Text>
            <Text style={styles.heroDesc}>
              We’ll dispatch an encrypted one-time verification token to unlock your account.
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.vaultCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.iconBadge,
                { backgroundColor: colors.surface },
              ]}
            >
              <KeyRound size={24} color={colors.textPrimary} />
            </View>

            <Text style={[styles.cardHeading, { color: colors.textPrimary }]}>
              Registered Account Email
            </Text>
            <Text
              style={[styles.cardCaption, { color: colors.textSecondary }]}
            >
              Enter the email linked to your Define Apparel membership.
            </Text>

            <View style={{ width: '100%', marginTop: 18 }}>
              <FormInput
                label="Verified Email"
                value={email}
                onChangeText={setEmail}
                status="success"
              />
            </View>

            <PrimaryButton
              title="Dispatch Security Token"
              onPress={() => navigateTo('VerificationCode', 'varient_3')}
              style={{ width: '100%', marginTop: 20 }}
            />
          </View>

          {/* Concierge Help Box */}
          <TouchableOpacity
            onPress={() => navigateTo('CustomerService', 'varient_1')}
            style={[
              styles.supportBox,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <Headphones size={20} color={colors.textPrimary} />
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.supportTitle, { color: colors.textPrimary }]}
              >
                Need manual identity verification?
              </Text>
              <Text
                style={[styles.supportSub, { color: colors.textSecondary }]}
              >
                Chat live with our 24/7 Account Security Specialist
              </Text>
            </View>
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
  topHero: {
    paddingBottom: 38,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroBar: {
    paddingHorizontal: 24,
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 99,
  },
  shieldPillText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroTextWrap: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  heroDesc: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 13.5,
    lineHeight: 20,
    marginTop: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    marginTop: -22,
    gap: 14,
  },
  vaultCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 22,
    alignItems: 'center',
  },
  iconBadge: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardCaption: {
    fontSize: 13.5,
    textAlign: 'center',
    marginTop: 4,
  },
  supportBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  supportSub: {
    fontSize: 12.5,
    marginTop: 2,
  },
});

export default ForgotPasswordVarient3;
