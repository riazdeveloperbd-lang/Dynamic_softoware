import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Bell,
  HelpCircle,
  Lock,
  MapPin,
  Package,
  ShieldCheck,
  User,
} from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const AccountVarient5: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'Overview' | 'Orders' | 'Security'>(
    'Overview'
  );

  return (
    <ScreenWrapper preset="list" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Segmented Control Hub" showBorder={false} />

        {/* Segmented Control Tabs */}
        <View style={styles.segmentBar}>
          {(['Overview', 'Orders', 'Security'] as const).map((tab) => {
            const active = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.segmentBtn,
                  active
                    ? { backgroundColor: colors.primary }
                    : {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                        borderWidth: 1,
                      },
                ]}
              >
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color: active ? colors.primaryText : colors.textPrimary,
                    },
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === 'Overview' && (
            <View style={styles.stack}>
              {[
                {
                  title: 'Personal Profile & Fit Matrix',
                  sub: 'Cody Fisher • Regular L / 42 EU',
                  icon: User,
                  onPress: () => navigateTo('MyDetails', 'varient_2'),
                },
                {
                  title: 'Saved Delivery Locations',
                  sub: 'Home, Office & Studio Loft',
                  icon: MapPin,
                  onPress: () => navigateTo('Address', 'varient_2'),
                },
              ].map((item) => {
                const IconComp = item.icon;
                return (
                  <TouchableOpacity
                    key={item.title}
                    onPress={item.onPress}
                    style={[
                      styles.card,
                      {
                        backgroundColor: colors.cardBackground,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <IconComp size={20} color={colors.primary} />
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          styles.cardTitle,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={[
                          styles.cardSub,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {item.sub}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {activeTab === 'Orders' && (
            <View style={styles.stack}>
              <TouchableOpacity
                onPress={() => navigateTo('MyOrders', 'varient_2')}
                style={[
                  styles.card,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Package size={20} color={colors.primary} />
                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.cardTitle, { color: colors.textPrimary }]}
                  >
                    Active Shipments & Tracking
                  </Text>
                  <Text
                    style={[styles.cardSub, { color: colors.textSecondary }]}
                  >
                    5 parcels currently in transit
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === 'Security' && (
            <View style={styles.stack}>
              {[
                {
                  title: 'Passkey & Biometric Vault',
                  sub: 'FaceID enabled for 1-tap checkout',
                  icon: ShieldCheck,
                  onPress: () => navigateTo('Login', 'varient_3'),
                },
                {
                  title: 'Reset Account Password',
                  sub: 'Last updated 14 days ago',
                  icon: Lock,
                  onPress: () => navigateTo('ResetPassword', 'varient_2'),
                },
                {
                  title: 'Push & Quiet Hours Alerts',
                  sub: 'Customize marketing & order pings',
                  icon: Bell,
                  onPress: () => navigateTo('NotificationSettings', 'varient_3'),
                },
                {
                  title: '24/7 Support & FAQ Center',
                  sub: 'Instant help from our specialists',
                  icon: HelpCircle,
                  onPress: () => navigateTo('HelpCenter', 'varient_2'),
                },
              ].map((item) => {
                const IconComp = item.icon;
                return (
                  <TouchableOpacity
                    key={item.title}
                    onPress={item.onPress}
                    style={[
                      styles.card,
                      {
                        backgroundColor: colors.cardBackground,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <IconComp size={20} color={colors.primary} />
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          styles.cardTitle,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={[
                          styles.cardSub,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {item.sub}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>

        <BottomTabBar activeTab="Account" />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  segmentBar: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 8,
  },
  segmentBtn: {
    flex: 1,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  stack: {
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  cardSub: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default AccountVarient5;
