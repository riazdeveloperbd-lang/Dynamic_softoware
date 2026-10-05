import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppDispatch, useAppSelector, useTheme } from '../../../hooks';
import { toggleNotificationSetting } from '../../../store/slices/appSlice';

export const NotificationSettingsVarient1: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const settings = useAppSelector((s) => s.app.notificationSettings);

  const toggleItems: {
    key: keyof typeof settings;
    label: string;
  }[] = [
    { key: 'general', label: 'General Notifications' },
    { key: 'sound', label: 'Sound' },
    { key: 'vibrate', label: 'Vibrate' },
    { key: 'specialOffers', label: 'Special Offers' },
    { key: 'promoDiscounts', label: 'Promo & Discounts' },
    { key: 'payments', label: 'Payments' },
    { key: 'cashback', label: 'Cahback' },
    { key: 'appUpdates', label: 'App Updates' },
    { key: 'newService', label: 'New Service Available' },
    { key: 'newTips', label: 'New Tips Available' },
  ];

  return (
    <ScreenWrapper preset="list" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Notifications" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {toggleItems.map((item, idx) => {
            const isOn = settings[item.key];
            return (
              <View
                key={item.key}
                style={[
                  styles.row,
                  idx < toggleItems.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.divider,
                  },
                ]}
              >
                <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>
                  {item.label}
                </Text>
                <TouchableOpacity
                  onPress={() => dispatch(toggleNotificationSetting(item.key))}
                  activeOpacity={0.8}
                  style={[
                    styles.switchTrack,
                    {
                      backgroundColor: isOn ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.switchThumb,
                      isOn ? styles.switchThumbOn : styles.switchThumbOff,
                      {
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
    paddingBottom: 20,
  },
  row: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  switchTrack: {
    width: 46,
    height: 26,
    borderRadius: 13,
    padding: 2,
    justifyContent: 'center',
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  switchThumbOn: {
    alignSelf: 'flex-end',
  },
  switchThumbOff: {
    alignSelf: 'flex-start',
  },
});

export default NotificationSettingsVarient1;
