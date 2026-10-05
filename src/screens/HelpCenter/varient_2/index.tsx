import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Clock,
  Globe,
  Headphones,
  Mail,
  MessageCircle,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const HelpCenterVarient2: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors, isDark } = useTheme();

  return (
    <ScreenWrapper preset="grid" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Concierge Desk" showBorder={false} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Live Status Banner */}
          <View
            style={[
              styles.statusHero,
              { backgroundColor: isDark ? '#242429' : '#18181B' },
            ]}
          >
            <View style={styles.liveTop}>
              <View style={styles.onlineDot} />
              <Text style={styles.liveLabel}>CONCIERGE ONLINE • &lt; 1 MIN WAIT</Text>
            </View>
            <Text style={styles.heroTitle}>
              Dedicated Stylists & Order Specialists
            </Text>
            <Text style={styles.heroSub}>
              Direct priority line for Platinum members in New York, London & Tokyo.
            </Text>
            <TouchableOpacity
              onPress={() => navigateTo('CustomerService', 'varient_1')}
              style={styles.startChatBtn}
            >
              <Sparkles size={16} color="#1A1A1A" />
              <Text style={styles.startChatText}>Start Live Chat</Text>
            </TouchableOpacity>
          </View>

          {/* Direct Channels Grid */}
          <View style={styles.grid}>
            {[
              {
                title: 'WhatsApp VIP',
                sub: 'Instant photo & sizing help',
                icon: MessageCircle,
                action: () => navigateTo('CustomerService', 'varient_2'),
              },
              {
                title: 'Voice Callback',
                sub: 'Request call in 2 mins',
                icon: PhoneCall,
                action: () => navigateTo('CustomerService', 'varient_3'),
              },
              {
                title: 'Email Desk',
                sub: 'vip@defineatelier.com',
                icon: Mail,
                action: () => navigateTo('CustomerService', 'varient_1'),
              },
              {
                title: 'Global Boutiques',
                sub: '14 Flagship locations',
                icon: Globe,
                action: () => navigateTo('Address', 'varient_2'),
              },
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <TouchableOpacity
                  key={item.title}
                  onPress={item.action}
                  style={[
                    styles.channelCard,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: colors.surface },
                    ]}
                  >
                    <IconComp size={20} color={colors.textPrimary} />
                  </View>
                  <Text
                    style={[
                      styles.channelTitle,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.channelSub,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {item.sub}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Operating Hours Footer */}
          <View
            style={[
              styles.hoursCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Clock size={18} color={colors.textPrimary} />
            <Text style={[styles.hoursText, { color: colors.textSecondary }]}>
              24/7 Multilingual Support • English, Français, 日本語
            </Text>
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
    paddingTop: 4,
    paddingBottom: 24,
  },
  statusHero: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
  },
  liveTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0C9409',
  },
  liveLabel: {
    color: '#0C9409',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 6,
  },
  heroSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
  startChatBtn: {
    backgroundColor: '#FFFFFF',
    height: 44,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  startChatText: {
    color: '#1A1A1A',
    fontSize: 14,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginBottom: 16,
  },
  channelCard: {
    width: '48%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  channelTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  channelSub: {
    fontSize: 11,
    lineHeight: 16,
  },
  hoursCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  hoursText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default HelpCenterVarient2;
