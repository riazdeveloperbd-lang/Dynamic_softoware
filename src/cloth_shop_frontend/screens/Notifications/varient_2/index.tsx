import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { CreditCard, MapPin, Tag, Wallet } from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useTheme } from '../../../hooks';
import { useGetNotificationsQuery } from '../../../store/api/dummyApi';

export const NotificationsVarient2: React.FC = () => {
  const { data: notifications = [] } = useGetNotificationsQuery();
  const { colors } = useTheme();
  const [tab, setTab] = useState<'All' | 'Promos' | 'Account'>('All');

  const renderIcon = (type: string) => {
    switch (type) {
      case 'tag':
        return <Tag size={20} color={colors.warning} />;
      case 'wallet':
        return <Wallet size={20} color={colors.success} />;
      case 'pin':
        return <MapPin size={20} color={colors.textPrimary} />;
      default:
        return <CreditCard size={20} color={colors.textPrimary} />;
    }
  };

  return (
    <ScreenWrapper preset="list" showBottomTab activeTab="Home">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Categorized Inbox" showBorder={false} />

        {/* Filter Pills */}
        <View style={styles.tabsRow}>
          {(['All', 'Promos', 'Account'] as const).map((t) => {
            const active = tab === t;
            return (
              <TouchableOpacity
                key={t}
                onPress={() => setTab(t)}
                style={[
                  styles.tabChip,
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
                    styles.tabChipText,
                    {
                      color: active
                        ? colors.primaryText
                        : colors.textPrimary,
                    },
                  ]}
                >
                  {t} Alerts
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {notifications.map((item) => (
            <View
              key={item.id}
              style={[
                styles.inboxCard,
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
                {renderIcon(item.iconType)}
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.titleRow}>
                  <Text
                    style={[styles.cardTitle, { color: colors.textPrimary }]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.groupTag,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {item.group}
                  </Text>
                </View>
                <Text
                  style={[styles.cardSub, { color: colors.textSecondary }]}
                >
                  {item.subtitle}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <BottomTabBar activeTab="Home" />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 14,
  },
  tabChip: {
    flex: 1,
    height: 36,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabChipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 10,
  },
  inboxCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  groupTag: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardSub: {
    fontSize: 13,
    marginTop: 2,
  },
});

export default NotificationsVarient2;
