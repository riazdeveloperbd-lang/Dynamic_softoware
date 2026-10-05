import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Check, Mail, MessageSquare, Moon, Smartphone } from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useTheme } from '../../../hooks';

export const NotificationSettingsVarient3: React.FC = () => {
  const { colors } = useTheme();
  const [quietHours, setQuietHours] = useState(true);
  const [channels, setChannels] = useState({
    push: true,
    sms: true,
    email: false,
  });

  return (
    <ScreenWrapper preset="list" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Quiet Hours & Channel Matrix" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Quiet Hours Schedule Card */}
          <TouchableOpacity
            onPress={() => setQuietHours(!quietHours)}
            style={[
              styles.dndCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.dndHeader}>
              <View style={styles.dndTitleRow}>
                <Moon size={20} color={colors.warning} />
                <Text style={[styles.dndTitle, { color: colors.textPrimary }]}>
                  Scheduled Quiet Hours
                </Text>
              </View>
              <Text
                style={[
                  styles.dndStatus,
                  { color: quietHours ? colors.success : colors.textMuted },
                ]}
              >
                {quietHours ? 'ACTIVE' : 'OFF'}
              </Text>
            </View>
            <Text style={[styles.dndSub, { color: colors.textSecondary }]}>
              Mute non-urgent promotional drops between 10:00 PM – 8:00 AM
            </Text>
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Delivery Channels
          </Text>

          <View style={styles.channelStack}>
            {[
              {
                key: 'push' as const,
                title: 'iOS Instant Push Notifications',
                sub: 'Lock screen banners & Live Activity island',
                icon: Smartphone,
              },
              {
                key: 'sms' as const,
                title: 'SMS Courier Dispatch Text',
                sub: '+1 (234) 453-2315 • Real-time arrival PIN',
                icon: MessageSquare,
              },
              {
                key: 'email' as const,
                title: 'Weekly Editorial Lookbook Digest',
                sub: 'cody.fisher45@example.com',
                icon: Mail,
              },
            ].map((ch) => {
              const Icon = ch.icon;
              const active = channels[ch.key];
              return (
                <TouchableOpacity
                  key={ch.key}
                  onPress={() =>
                    setChannels((p) => ({ ...p, [ch.key]: !p[ch.key] }))
                  }
                  style={[
                    styles.channelCard,
                    {
                      borderColor: active ? colors.primary : colors.border,
                      backgroundColor: colors.cardBackground,
                    },
                  ]}
                >
                  <Icon size={22} color={colors.textPrimary} />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.channelTitle,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {ch.title}
                    </Text>
                    <Text
                      style={[
                        styles.channelSub,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {ch.sub}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.checkBox,
                      {
                        backgroundColor: active
                          ? colors.primary
                          : colors.surface,
                      },
                    ]}
                  >
                    {active && <Check size={14} color={colors.primaryText} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
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
  dndCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  dndHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dndTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dndTitle: {
    fontSize: 15.5,
    fontWeight: '800',
  },
  dndStatus: {
    fontSize: 12,
    fontWeight: '800',
  },
  dndSub: {
    fontSize: 13,
    lineHeight: 19,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  channelStack: {
    gap: 10,
  },
  channelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  channelTitle: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  channelSub: {
    fontSize: 12.5,
    marginTop: 2,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotificationSettingsVarient3;
