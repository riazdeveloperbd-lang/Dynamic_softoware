import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  CheckCircle2,
  Headphones,
  MessageSquare,
  PhoneCall,
  Video,
} from 'lucide-react';
import {
  AppHeader,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const CustomerServiceVarient3: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors, isDark } = useTheme();
  const [topic, setTopic] = useState('Sizing & Fit Styling');
  const [requested, setRequested] = useState(false);

  return (
    <ScreenWrapper preset="chat">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Priority Callback & Video" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Stylist Video Card */}
          <View
            style={[
              styles.videoHero,
              { backgroundColor: isDark ? '#242429' : '#18181B' },
            ]}
          >
            <View style={styles.avatarCircle}>
              <Headphones size={28} color="#FFFFFF" />
            </View>
            <Text style={styles.heroTitle}>1-on-1 Live Atelier Session</Text>
            <Text style={styles.heroSub}>
              Connect via voice or live boutique video stream to inspect fabrics and fit in real time.
            </Text>

            <View style={styles.modeRow}>
              <View style={styles.modePill}>
                <PhoneCall size={14} color="#FFA928" />
                <Text style={styles.modePillText}>Voice Callback (2m)</Text>
              </View>
              <View style={styles.modePill}>
                <Video size={14} color="#FFA928" />
                <Text style={styles.modePillText}>Boutique Video</Text>
              </View>
            </View>
          </View>

          {/* Select Consultation Topic */}
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Select Consultation Topic
          </Text>
          <View style={styles.topicList}>
            {[
              'Sizing & Fit Styling',
              'Expedited Courier Dispatch',
              'Return & Instant Exchange',
              'Private Collection Inquiry',
            ].map((item) => {
              const selected = topic === item;
              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => setTopic(item)}
                  style={[
                    styles.topicCard,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: selected ? colors.primary : colors.border,
                      borderWidth: selected ? 1.5 : 1,
                    },
                  ]}
                >
                  <Text
                    style={[styles.topicText, { color: colors.textPrimary }]}
                  >
                    {item}
                  </Text>
                  <View
                    style={[
                      styles.radioOuter,
                      {
                        borderColor: selected ? colors.primary : colors.border,
                      },
                    ]}
                  >
                    {selected ? (
                      <View
                        style={[
                          styles.radioInner,
                          { backgroundColor: colors.primary },
                        ]}
                      />
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {requested ? (
            <View
              style={[
                styles.confirmBox,
                {
                  backgroundColor: 'rgba(12,148,9,0.1)',
                  borderColor: colors.success,
                },
              ]}
            >
              <CheckCircle2 size={20} color={colors.success} />
              <View style={{ flex: 1 }}>
                <Text
                  style={[styles.confirmTitle, { color: colors.textPrimary }]}
                >
                  Callback Scheduled!
                </Text>
                <Text
                  style={[styles.confirmSub, { color: colors.textSecondary }]}
                >
                  Specialist Camille will call +1 (234) 453-231506 in ~90 seconds.
                </Text>
              </View>
            </View>
          ) : null}

          <View style={styles.btnStack}>
            <PrimaryButton
              title={
                requested ? 'Open Text Chat Instead' : 'Request Instant Callback'
              }
              onPress={() =>
                requested
                  ? navigateTo('CustomerService', 'varient_1')
                  : setRequested(true)
              }
            />
            <TouchableOpacity
              onPress={() => navigateTo('CustomerService', 'varient_2')}
              style={[
                styles.secondaryBtn,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <MessageSquare size={16} color={colors.textPrimary} />
              <Text
                style={[styles.secondaryText, { color: colors.textPrimary }]}
              >
                Switch to Rich Concierge Chat
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <HomeIndicator />
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
    paddingTop: 10,
    paddingBottom: 24,
  },
  videoHero: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  heroSub: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 14,
  },
  modeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  modePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  modePillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  topicList: {
    gap: 10,
    marginBottom: 18,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 14,
  },
  topicText: {
    fontSize: 14,
    fontWeight: '600',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  confirmBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
  },
  confirmTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  confirmSub: {
    fontSize: 11,
    marginTop: 2,
  },
  btnStack: {
    gap: 10,
  },
  secondaryBtn: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CustomerServiceVarient3;
