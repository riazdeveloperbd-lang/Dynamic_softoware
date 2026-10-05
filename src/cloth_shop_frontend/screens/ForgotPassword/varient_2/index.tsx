import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ArrowLeft, CheckCircle2, Mail, MessageSquare } from 'lucide-react';
import {
  FormInput,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';

export const ForgotPasswordVarient2: React.FC = () => {
  const { goBack, navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const [channel, setChannel] = useState<'email' | 'sms'>('email');
  const [contact, setContact] = useState('cody.fisher45@example.com');

  return (
    <ScreenWrapper preset="form" showHeader={false}>
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <ArrowLeft size={24} color={colors.textPrimary} />
          </TouchableOpacity>

          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Account Recovery
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Select how you would like to receive your 4-digit recovery code.
          </Text>

          {/* Channel Selection Cards */}
          <View style={styles.channelsStack}>
            <TouchableOpacity
              onPress={() => {
                setChannel('email');
                setContact('cody.fisher45@example.com');
              }}
              activeOpacity={0.85}
              style={[
                styles.channelCard,
                {
                  borderColor:
                    channel === 'email' ? colors.primary : colors.border,
                  backgroundColor:
                    channel === 'email'
                      ? colors.surface
                      : colors.cardBackground,
                },
              ]}
            >
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Mail size={22} color={colors.textPrimary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={[styles.channelTitle, { color: colors.textPrimary }]}
                >
                  Recovery via Email
                </Text>
                <Text
                  style={[styles.channelSub, { color: colors.textSecondary }]}
                >
                  cody.•••••@example.com
                </Text>
              </View>
              {channel === 'email' && (
                <CheckCircle2 size={22} color={colors.primary} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setChannel('sms');
                setContact('+1 (234) 453-2315');
              }}
              activeOpacity={0.85}
              style={[
                styles.channelCard,
                {
                  borderColor:
                    channel === 'sms' ? colors.primary : colors.border,
                  backgroundColor:
                    channel === 'sms' ? colors.surface : colors.cardBackground,
                },
              ]}
            >
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <MessageSquare size={22} color={colors.textPrimary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={[styles.channelTitle, { color: colors.textPrimary }]}
                >
                  Recovery via SMS
                </Text>
                <Text
                  style={[styles.channelSub, { color: colors.textSecondary }]}
                >
                  +1 (234) •••-2315
                </Text>
              </View>
              {channel === 'sms' && (
                <CheckCircle2 size={22} color={colors.primary} />
              )}
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 22 }}>
            <FormInput
              label={
                channel === 'email'
                  ? 'Confirm Email Address'
                  : 'Confirm Phone Number'
              }
              value={contact}
              onChangeText={setContact}
            />
          </View>

          <PrimaryButton
            title="Send Recovery Code"
            onPress={() => navigateTo('VerificationCode', 'varient_2')}
            style={{ marginTop: 28 }}
          />
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
    paddingTop: 8,
    paddingBottom: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginLeft: -6,
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 14.5,
    lineHeight: 21,
    marginTop: 6,
    marginBottom: 22,
  },
  channelsStack: {
    gap: 12,
  },
  channelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    gap: 14,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  channelTitle: {
    fontSize: 15.5,
    fontWeight: '700',
  },
  channelSub: {
    fontSize: 13,
    marginTop: 2,
  },
});

export default ForgotPasswordVarient2;
