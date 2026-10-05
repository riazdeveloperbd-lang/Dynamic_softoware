import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Bell,
  ChevronRight,
  CreditCard,
  Headphones,
  HelpCircle,
  Home,
  LogOut,
  Moon,
  Package,
  Sparkles,
  Sun,
  UserCheck,
} from 'lucide-react';
import {
  AppColorSelectorCard,
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
  StatusModal,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const AccountView: React.FC<{ showLogoutModal?: boolean }> = ({
  showLogoutModal = false,
}) => {
  const { navigateTo } = useAppNavigation();
  const { colors, isDark, toggleTheme, triggerSkeleton } = useTheme();
  const [logoutVisible, setLogoutVisible] = useState(showLogoutModal);

  useEffect(() => {
    setLogoutVisible(showLogoutModal);
  }, [showLogoutModal]);

  const group1 = [
    {
      label: 'My Orders',
      icon: Package,
      onPress: () => navigateTo('MyOrders', 'varient_1'),
    },
  ];

  const group2 = [
    {
      label: 'My Details',
      icon: UserCheck,
      onPress: () => navigateTo('MyDetails', 'varient_1'),
    },
    {
      label: 'Address Book',
      icon: Home,
      onPress: () => navigateTo('Address', 'varient_1'),
    },
    {
      label: 'Payment Methods',
      icon: CreditCard,
      onPress: () => navigateTo('PaymentMethod', 'varient_1'),
    },
    {
      label: 'Notifications',
      icon: Bell,
      onPress: () => navigateTo('NotificationSettings', 'varient_1'),
    },
  ];

  const group3 = [
    {
      label: 'FAQs',
      icon: HelpCircle,
      onPress: () => navigateTo('FAQs', 'varient_1'),
    },
    {
      label: 'Help Center',
      icon: Headphones,
      onPress: () => navigateTo('HelpCenter', 'varient_1'),
    },
  ];

  return (
    <ScreenWrapper preset="list" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Account" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Group 1: My Orders */}
          <View style={styles.sectionBlock}>
            {group1.map((item) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={item.label}
                  onPress={item.onPress}
                  style={styles.menuRow}
                >
                  <View style={styles.menuLeft}>
                    <Icon size={22} color={colors.textPrimary} />
                    <Text
                      style={[styles.menuLabel, { color: colors.textPrimary }]}
                    >
                      {item.label}
                    </Text>
                  </View>
                  <ChevronRight size={20} color={colors.textMuted} />
                </TouchableOpacity>
              );
            })}
          </View>

          <View
            style={[
              styles.thickSeparator,
              { backgroundColor: colors.thickSeparator },
            ]}
          />

          {/* Group 2: Details, Address, Payment, Notifications */}
          <View style={styles.sectionBlock}>
            {group2.map((item, idx) => {
              const Icon = item.icon;
              return (
                <View key={item.label}>
                  <TouchableOpacity
                    onPress={item.onPress}
                    style={styles.menuRow}
                  >
                    <View style={styles.menuLeft}>
                      <Icon size={22} color={colors.textPrimary} />
                      <Text
                        style={[
                          styles.menuLabel,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {item.label}
                      </Text>
                    </View>
                    <ChevronRight size={20} color={colors.textMuted} />
                  </TouchableOpacity>
                  {idx < group2.length - 1 && (
                    <View
                      style={[
                        styles.insetDivider,
                        { backgroundColor: colors.divider },
                      ]}
                    />
                  )}
                </View>
              );
            })}
          </View>

          <View
            style={[
              styles.thickSeparator,
              { backgroundColor: colors.thickSeparator },
            ]}
          />

          {/* Appearance Row */}
          <View style={styles.sectionBlock}>
            <TouchableOpacity onPress={toggleTheme} style={styles.menuRow}>
              <View style={styles.menuLeft}>
                {isDark ? (
                  <Sun size={22} color={colors.warning} />
                ) : (
                  <Moon size={22} color={colors.textPrimary} />
                )}
                <Text style={[styles.menuLabel, { color: colors.textPrimary }]}>
                  Appearance ({isDark ? 'Dark' : 'Light'} Mode)
                </Text>
              </View>
              <ChevronRight size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.thickSeparator,
              { backgroundColor: colors.thickSeparator },
            ]}
          />

          {/* Group 3: FAQs & Help Center */}
          <View style={styles.sectionBlock}>
            {group3.map((item, idx) => {
              const Icon = item.icon;
              return (
                <View key={item.label}>
                  <TouchableOpacity
                    onPress={item.onPress}
                    style={styles.menuRow}
                  >
                    <View style={styles.menuLeft}>
                      <Icon size={22} color={colors.textPrimary} />
                      <Text
                        style={[
                          styles.menuLabel,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {item.label}
                      </Text>
                    </View>
                    <ChevronRight size={20} color={colors.textMuted} />
                  </TouchableOpacity>
                  {idx < group3.length - 1 && (
                    <View
                      style={[
                        styles.insetDivider,
                        { backgroundColor: colors.divider },
                      ]}
                    />
                  )}
                </View>
              );
            })}
          </View>

          <View
            style={[
              styles.thickSeparator,
              { backgroundColor: colors.thickSeparator },
            ]}
          />

          {/* Logout Row */}
          <View style={styles.sectionBlock}>
            <TouchableOpacity
              onPress={() => setLogoutVisible(true)}
              style={styles.menuRow}
            >
              <View style={styles.menuLeft}>
                <LogOut size={22} color={colors.danger} />
                <Text style={[styles.logoutText, { color: colors.danger }]}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <BottomTabBar activeTab="Account" />

        {logoutVisible && (
          <StatusModal
            type="danger"
            title="Logout?"
            message="Are you sure you want to logout?"
            primaryButtonText="Yes, Logout"
            onPrimaryPress={() => {
              setLogoutVisible(false);
              navigateTo('Login', 'varient_1');
            }}
            secondaryButtonText="No, Cancel"
            onSecondaryPress={() => setLogoutVisible(false)}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export const AccountVarient1: React.FC = () => (
  <AccountView showLogoutModal={false} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionBlock: {
    paddingHorizontal: 24,
  },
  menuRow: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  insetDivider: {
    height: 1,
    marginLeft: 36,
  },
  thickSeparator: {
    height: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AccountVarient1;
