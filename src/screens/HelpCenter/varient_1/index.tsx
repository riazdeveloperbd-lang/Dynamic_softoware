import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Facebook,
  Globe,
  Headphones,
  Instagram,
  MessageCircle,
  Twitter,
} from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const HelpCenterVarient1: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();

  const channels = [
    {
      label: 'Customer Service',
      icon: Headphones,
      onPress: () => navigateTo('CustomerService', 'varient_1'),
    },
    {
      label: 'Whatsapp',
      icon: MessageCircle,
      onPress: () => navigateTo('CustomerService', 'varient_1'),
    },
    {
      label: 'Website',
      icon: Globe,
      onPress: () => navigateTo('CustomerService', 'varient_1'),
    },
    {
      label: 'Facebook',
      icon: Facebook,
      onPress: () => navigateTo('CustomerService', 'varient_1'),
    },
    {
      label: 'Twitter',
      icon: Twitter,
      onPress: () => navigateTo('CustomerService', 'varient_1'),
    },
    {
      label: 'Instagram',
      icon: Instagram,
      onPress: () => navigateTo('CustomerService', 'varient_1'),
    },
  ];

  return (
    <ScreenWrapper preset="list" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Help Center" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <TouchableOpacity
                key={ch.label}
                onPress={ch.onPress}
                activeOpacity={0.8}
                style={[
                  styles.channelCard,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.cardBackground,
                  },
                ]}
              >
                <Icon size={22} color={colors.textPrimary} />
                <Text
                  style={[styles.channelLabel, { color: colors.textPrimary }]}
                >
                  {ch.label}
                </Text>
              </TouchableOpacity>
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
    paddingTop: 6,
    paddingBottom: 24,
    gap: 14,
  },
  channelCard: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  channelLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HelpCenterVarient1;
