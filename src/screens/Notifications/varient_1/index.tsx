import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Bell,
  CreditCard,
  MapPin,
  Tag,
  UserCircle2,
  Wallet,
} from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  EmptyState,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useTheme } from '../../../hooks';
import { useGetNotificationsQuery } from '../../../store/api/dummyApi';

export const NotificationsView: React.FC<{ forceEmpty?: boolean }> = ({
  forceEmpty = false,
}) => {
  const { data: notifications = [] } = useGetNotificationsQuery();
  const { colors } = useTheme();
  const list = forceEmpty ? [] : notifications;

  const groups: ('Today' | 'Yesterday' | 'June 7, 2023')[] = [
    'Today',
    'Yesterday',
    'June 7, 2023',
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'tag':
        return <Tag size={22} color={colors.textPrimary} />;
      case 'wallet':
        return <Wallet size={22} color={colors.textPrimary} />;
      case 'pin':
        return <MapPin size={22} color={colors.textPrimary} />;
      case 'card':
        return <CreditCard size={22} color={colors.textPrimary} />;
      default:
        return <UserCircle2 size={22} color={colors.textPrimary} />;
    }
  };

  return (
    <ScreenWrapper preset="list" showBottomTab activeTab="Home">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Notifications" />

        {list.length > 0 ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {groups.map((grp, gIdx) => {
              const items = list.filter((n) => n.group === grp);
              if (!items.length) return null;
              return (
                <View key={grp} style={styles.groupBlock}>
                  <Text
                    style={[
                      styles.groupHeading,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {grp}
                  </Text>
                  {items.map((item, idx) => (
                    <View
                      key={item.id}
                      style={[
                        styles.notifRow,
                        idx < items.length - 1 && {
                          borderBottomWidth: 1,
                          borderBottomColor: colors.divider,
                        },
                      ]}
                    >
                      <View style={styles.iconWrap}>
                        {renderIcon(item.iconType)}
                      </View>
                      <View style={styles.textCol}>
                        <Text
                          style={[
                            styles.notifTitle,
                            { color: colors.textPrimary },
                          ]}
                        >
                          {item.title}
                        </Text>
                        <Text
                          style={[
                            styles.notifSubtitle,
                            { color: colors.textSecondary },
                          ]}
                        >
                          {item.subtitle}
                        </Text>
                      </View>
                    </View>
                  ))}
                  {gIdx < groups.length - 1 && (
                    <View
                      style={[
                        styles.groupDivider,
                        { backgroundColor: colors.divider },
                      ]}
                    />
                  )}
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <EmptyState
            icon={<Bell size={64} color={colors.textMuted} strokeWidth={1.6} />}
            title={'You haven’t gotten any\nnotifications yet!'}
            subtitle={'We’ll alert you when something\ncool happens.'}
          />
        )}

        <BottomTabBar activeTab="Home" />
      </View>
    </ScreenWrapper>
  );
};

export const NotificationsVarient1: React.FC = () => (
  <NotificationsView forceEmpty={false} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  groupBlock: {
    marginBottom: 8,
  },
  groupHeading: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
  },
  iconWrap: {
    width: 28,
    alignItems: 'center',
  },
  textCol: {
    flex: 1,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  notifSubtitle: {
    fontSize: 13.5,
    marginTop: 2,
  },
  groupDivider: {
    height: 1,
    marginVertical: 10,
  },
});

export default NotificationsVarient1;
