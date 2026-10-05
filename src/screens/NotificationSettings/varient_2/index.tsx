import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Bell, Shield, Tag } from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppDispatch, useAppSelector, useTheme } from '../../../hooks';
import { toggleNotificationSetting } from '../../../store/slices/appSlice';

export const NotificationSettingsVarient2: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const settings = useAppSelector((s) => s.app.notificationSettings);

  const groups = [
    {
      title: 'Device Alert Behavior',
      icon: Bell,
      items: [
        { key: 'general' as const, label: 'Push Banner Alerts' },
        { key: 'sound' as const, label: 'Tactile Chime Sound' },
        { key: 'vibrate' as const, label: 'Haptic Vibration' },
      ],
    },
    {
      title: 'Exclusive Drops & Rewards',
      icon: Tag,
      items: [
        { key: 'specialOffers' as const, label: 'Friday Capsule Drops' },
        { key: 'promoDiscounts' as const, label: 'Private VIP Vouchers' },
        { key: 'cashback' as const, label: 'Store Credit Cashback' },
      ],
    },
    {
      title: 'Security & Order Telemetry',
      icon: Shield,
      items: [
        { key: 'payments' as const, label: 'Card Vault Authorizations' },
        { key: 'appUpdates' as const, label: 'Courier Live GPS Alerts' },
      ],
    },
  ];

  return (
    <ScreenWrapper preset="list" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Grouped Alert Modules" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {groups.map((grp) => {
            const Icon = grp.icon;
            return (
              <View
                key={grp.title}
                style={[
                  styles.moduleCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.moduleHeader}>
                  <Icon size={18} color={colors.textPrimary} />
                  <Text
                    style={[
                      styles.moduleTitle,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {grp.title}
                  </Text>
                </View>

                {grp.items.map((item, idx) => {
                  const isOn = settings[item.key];
                  return (
                    <View
                      key={item.key}
                      style={[
                        styles.switchRow,
                        idx < grp.items.length - 1 && {
                          borderBottomWidth: 1,
                          borderBottomColor: colors.divider,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.switchLabel,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {item.label}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          dispatch(toggleNotificationSetting(item.key))
                        }
                        style={[
                          styles.track,
                          {
                            backgroundColor: isOn
                              ? colors.primary
                              : colors.border,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.thumb,
                            {
                              alignSelf: isOn ? 'flex-end' : 'flex-start',
                              backgroundColor: isOn
                                ? colors.primaryText
                                : '#FFFFFF',
                            },
                          ]}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            );
          })}
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
    gap: 14,
  },
  moduleCard: {
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 4,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  moduleTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  switchRow: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  track: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default NotificationSettingsVarient2;
