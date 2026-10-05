import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  MessageSquare,
  Package,
  RefreshCcw,
} from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const HelpCenterVarient3: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();

  return (
    <ScreenWrapper preset="list" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Self-Service Portal" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Active Support Ticket Card */}
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Active Support Ticket
          </Text>
          <TouchableOpacity
            onPress={() => navigateTo('CustomerService', 'varient_2')}
            style={[
              styles.ticketCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.ticketHeader}>
              <Text style={[styles.ticketId, { color: colors.textSecondary }]}>
                TICKET #CS-4091
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: 'rgba(12,148,9,0.12)' },
                ]}
              >
                <CheckCircle2 size={12} color={colors.success} />
                <Text style={[styles.statusText, { color: colors.success }]}>
                  Agent Replied
                </Text>
              </View>
            </View>
            <Text style={[styles.ticketSubject, { color: colors.textPrimary }]}>
              Size Exchange Request — Regular Fit Slogan Burger Tee
            </Text>
            <Text style={[styles.ticketPreview, { color: colors.textSecondary }]}>
              “We have reserved size L for you at our SoHo warehouse...”
            </Text>
          </TouchableOpacity>

          {/* Self-Service Quick Tools */}
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Automated Actions
          </Text>
          <View style={styles.toolsList}>
            {[
              {
                title: 'Start an Instant Return or Exchange',
                sub: 'Generate QR drop-off code in 30 seconds',
                icon: RefreshCcw,
                onPress: () => navigateTo('MyOrders', 'varient_1'),
              },
              {
                title: 'Track Active Courier Shipment',
                sub: 'Live GPS map & courier phone contact',
                icon: Package,
                onPress: () => navigateTo('TrackOrder', 'varient_1'),
              },
              {
                title: 'Download Tax & VAT Invoices',
                sub: 'PDF receipts for all completed orders',
                icon: FileText,
                onPress: () => navigateTo('MyOrders', 'varient_3'),
              },
              {
                title: 'Browse Complete FAQ Directory',
                sub: 'Answers to 50+ common questions',
                icon: MessageSquare,
                onPress: () => navigateTo('FAQs', 'varient_1'),
              },
            ].map((tool) => {
              const IconComp = tool.icon;
              return (
                <TouchableOpacity
                  key={tool.title}
                  onPress={tool.onPress}
                  style={[
                    styles.toolRow,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.toolIcon,
                      { backgroundColor: colors.surface },
                    ]}
                  >
                    <IconComp size={18} color={colors.textPrimary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[styles.toolTitle, { color: colors.textPrimary }]}
                    >
                      {tool.title}
                    </Text>
                    <Text
                      style={[styles.toolSub, { color: colors.textSecondary }]}
                    >
                      {tool.sub}
                    </Text>
                  </View>
                  <ArrowRight size={16} color={colors.textMuted} />
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
    paddingTop: 14,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  ticketCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 22,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketId: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  ticketSubject: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  ticketPreview: {
    fontSize: 12,
    lineHeight: 18,
  },
  toolsList: {
    gap: 10,
  },
  toolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  toolIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  toolSub: {
    fontSize: 11,
    marginTop: 2,
  },
});

export default HelpCenterVarient3;
