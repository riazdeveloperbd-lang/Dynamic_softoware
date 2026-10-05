import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  CreditCard,
  HelpCircle,
  Package,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const FAQsVarient2: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();

  const topics = [
    {
      title: 'Orders & Tracking',
      count: '12 Articles',
      icon: Truck,
      desc: 'Courier timelines, international customs, and live GPS tracking.',
    },
    {
      title: 'Returns & Exchanges',
      count: '9 Articles',
      icon: RefreshCcw,
      desc: '30-day complimentary studio returns and instant size swaps.',
    },
    {
      title: 'Payment & Billing',
      count: '8 Articles',
      icon: CreditCard,
      desc: 'Split payments, Apple Pay, VAT invoices, and gift vouchers.',
    },
    {
      title: 'Product Care & Sizing',
      count: '15 Articles',
      icon: Sparkles,
      desc: 'Garment measurements, dry-cleaning guides, and fabric origins.',
    },
    {
      title: 'Authenticity & Warranty',
      count: '6 Articles',
      icon: ShieldCheck,
      desc: 'Serialised NFC garment tags and 2-year seam guarantee.',
    },
    {
      title: 'Packaging & Gifting',
      count: '5 Articles',
      icon: Package,
      desc: 'Signature magnetic gift boxes and personalized notes.',
    },
  ];

  return (
    <ScreenWrapper preset="grid" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Knowledge Base" showBorder={false} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Browse curated help topics by department
          </Text>

          <View style={styles.grid}>
            {topics.map((topic) => {
              const IconComp = topic.icon;
              return (
                <TouchableOpacity
                  key={topic.title}
                  onPress={() => navigateTo('FAQs', 'varient_1')}
                  style={[
                    styles.topicCard,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.iconWrap,
                      { backgroundColor: colors.surface },
                    ]}
                  >
                    <IconComp size={20} color={colors.textPrimary} />
                  </View>
                  <Text
                    style={[styles.topicTitle, { color: colors.textPrimary }]}
                  >
                    {topic.title}
                  </Text>
                  <Text
                    style={[styles.topicDesc, { color: colors.textSecondary }]}
                    numberOfLines={2}
                  >
                    {topic.desc}
                  </Text>
                  <Text
                    style={[styles.topicCount, { color: colors.textPrimary }]}
                  >
                    {topic.count} →
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Still need help banner */}
          <View
            style={[
              styles.conciergeBanner,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <HelpCircle size={22} color={colors.textPrimary} />
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.conciergeTitle, { color: colors.textPrimary }]}
              >
                Can’t find your answer?
              </Text>
              <Text
                style={[styles.conciergeSub, { color: colors.textSecondary }]}
              >
                Chat live with our 24/7 Client Concierge team
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigateTo('CustomerService', 'varient_1')}
              style={[styles.chatBtn, { backgroundColor: colors.primary }]}
            >
              <Text
                style={[styles.chatBtnText, { color: colors.primaryText }]}
              >
                Chat
              </Text>
            </TouchableOpacity>
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
  subtitle: {
    fontSize: 13,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginBottom: 20,
  },
  topicCard: {
    width: '48%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  topicTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  topicDesc: {
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 10,
  },
  topicCount: {
    fontSize: 11,
    fontWeight: '700',
  },
  conciergeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  conciergeTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  conciergeSub: {
    fontSize: 12,
    marginTop: 2,
  },
  chatBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  chatBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default FAQsVarient2;
