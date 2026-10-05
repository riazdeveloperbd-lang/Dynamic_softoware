import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { CheckCircle2, Fingerprint, KeyRound, QrCode, Shield } from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useAppSelector, useTheme } from '../../../hooks';

export const MyDetailsVarient3: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors, isDark } = useTheme();
  const profile = useAppSelector((s) => s.app.userProfile);

  return (
    <ScreenWrapper preset="form" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="VIP Digital Member Card" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Metallic Digital Pass Card */}
          <View
            style={[
              styles.passCard,
              { backgroundColor: isDark ? '#242429' : '#18181B' },
            ]}
          >
            <View style={styles.passTop}>
              <View>
                <Text style={styles.passKicker}>DEFINE ATELIER PASSPORT</Text>
                <Text style={styles.passName}>{profile.fullName}</Text>
              </View>
              <QrCode size={42} color="#FFFFFF" />
            </View>

            <View style={styles.passGrid}>
              <View>
                <Text style={styles.passLabel}>MEMBER EMAIL</Text>
                <Text style={styles.passVal}>{profile.email}</Text>
              </View>
              <View>
                <Text style={styles.passLabel}>BIRTHDAY PERK</Text>
                <Text style={styles.passVal}>{profile.dob}</Text>
              </View>
            </View>
          </View>

          {/* Security & Biometric Controls */}
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Security & Privacy Credentials
          </Text>

          <View style={styles.cardsStack}>
            {[
              {
                title: 'Biometric Passkey Enabled',
                sub: 'Face ID & Touch ID active on iPhone 16 Pro',
                icon: Fingerprint,
              },
              {
                title: 'Two-Factor Authentication (2FA)',
                sub: `Protected via ${profile.phone}`,
                icon: Shield,
              },
              {
                title: 'Master Password Rotation',
                sub: 'Last rotated 14 days ago',
                icon: KeyRound,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <View
                  key={item.title}
                  style={[
                    styles.secRow,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Icon size={22} color={colors.textPrimary} />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[styles.secTitle, { color: colors.textPrimary }]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[styles.secSub, { color: colors.textSecondary }]}
                    >
                      {item.sub}
                    </Text>
                  </View>
                  <CheckCircle2 size={18} color={colors.success} />
                </View>
              );
            })}
          </View>

          <PrimaryButton
            title="Edit Personal Details"
            onPress={() => navigateTo('MyDetails', 'varient_1')}
            style={{ marginTop: 12 }}
          />
        </ScrollView>

        <BottomTabBar activeTab="Account" />
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
    paddingBottom: 24,
    gap: 16,
  },
  passCard: {
    borderRadius: 22,
    padding: 20,
    gap: 18,
  },
  passTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passKicker: {
    color: '#FFA928',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  passName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 4,
  },
  passGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.14)',
  },
  passLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  passVal: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  cardsStack: {
    gap: 10,
  },
  secRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  secTitle: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  secSub: {
    fontSize: 12.5,
    marginTop: 2,
  },
});

export default MyDetailsVarient3;
