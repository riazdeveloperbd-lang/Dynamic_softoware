import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { CheckCircle2, Package, Send, Sparkles } from 'lucide-react';
import { IMAGES } from '../../../assets';
import {
  AppHeader,
  HomeIndicator,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import {
  useAppDispatch,
  useAppNavigation,
  useAppSelector,
  useTheme,
} from '../../../hooks';
import { sendChatMessage } from '../../../store/slices/appSlice';

export const CustomerServiceVarient2: React.FC = () => {
  const dispatch = useAppDispatch();
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const messages = useAppSelector((s) => s.app.chatMessages);
  const [input, setInput] = useState('');

  const quickReplies = [
    'Track my order',
    'Exchange size',
    'Request invoice',
    'Speak to stylist',
  ];

  const handleSend = (textToSend?: string) => {
    const val = (textToSend ?? input).trim();
    if (!val) return;
    dispatch(sendChatMessage(val));
    setInput('');
  };

  return (
    <ScreenWrapper preset="chat">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="VIP Concierge Chat" />

        {/* Agent Header Banner */}
        <View
          style={[
            styles.agentBanner,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <View style={[styles.agentAvatar, { backgroundColor: colors.primary }]}>
            <Sparkles size={16} color={colors.primaryText} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.agentName, { color: colors.textPrimary }]}>
              Camille Laurent • Senior Stylist
            </Text>
            <Text style={[styles.agentStatus, { color: colors.success }]}>
              ● Online • Replies in seconds
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Context Order Card Inside Chat */}
          <TouchableOpacity
            onPress={() => navigateTo('TrackOrder', 'varient_1')}
            style={[
              styles.orderCard,
              {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              },
            ]}
          >
            <Image
              source={{ uri: IMAGES.white_tshirt }}
              style={[
                styles.orderThumb,
                { backgroundColor: colors.productTile },
              ]}
              resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
              <View style={styles.orderTagRow}>
                <Package size={12} color={colors.success} />
                <Text style={[styles.orderTag, { color: colors.success }]}>
                  LINKED ORDER #DF-9942
                </Text>
              </View>
              <Text
                style={[styles.orderTitle, { color: colors.textPrimary }]}
                numberOfLines={1}
              >
                Regular Fit Slogan • Size M
              </Text>
              <Text style={[styles.orderSub, { color: colors.textSecondary }]}>
                In Transit • Arriving Today
              </Text>
            </View>
            <CheckCircle2 size={18} color={colors.success} />
          </TouchableOpacity>

          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <View
                key={msg.id}
                style={[
                  styles.msgWrap,
                  isUser ? styles.msgRight : styles.msgLeft,
                ]}
              >
                <View
                  style={[
                    styles.bubble,
                    isUser
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
                      styles.bubbleText,
                      {
                        color: isUser ? colors.primaryText : colors.textPrimary,
                      },
                    ]}
                  >
                    {msg.text}
                  </Text>
                </View>
                <Text style={[styles.msgTime, { color: colors.textMuted }]}>
                  {msg.time}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        {/* Quick Reply Chips */}
        <View style={styles.quickRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickScroll}
          >
            {quickReplies.map((chip) => (
              <TouchableOpacity
                key={chip}
                onPress={() => handleSend(chip)}
                style={[
                  styles.quickChip,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[styles.quickChipText, { color: colors.textPrimary }]}
                >
                  {chip}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Input Bar */}
        <View
          style={[
            styles.inputBar,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
            },
          ]}
        >
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Message your stylist..."
            placeholderTextColor={colors.textMuted}
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                color: colors.textPrimary,
              },
            ]}
          />
          <TouchableOpacity
            onPress={() => handleSend()}
            style={[styles.sendBtn, { backgroundColor: colors.primary }]}
          >
            <Send size={16} color={colors.primaryText} />
          </TouchableOpacity>
        </View>
        <HomeIndicator />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  agentBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  agentAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agentName: {
    fontSize: 13,
    fontWeight: '700',
  },
  agentStatus: {
    fontSize: 11,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 16,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    marginBottom: 18,
  },
  orderThumb: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
  orderTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  orderTag: {
    fontSize: 10,
    fontWeight: '700',
  },
  orderTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  orderSub: {
    fontSize: 11,
    marginTop: 2,
  },
  msgWrap: {
    marginBottom: 12,
    maxWidth: '80%',
  },
  msgLeft: {
    alignSelf: 'flex-start',
  },
  msgRight: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  bubbleText: {
    fontSize: 13,
    lineHeight: 19,
  },
  msgTime: {
    fontSize: 10,
    marginTop: 4,
  },
  quickRow: {
    paddingVertical: 8,
  },
  quickScroll: {
    paddingHorizontal: 24,
    gap: 8,
  },
  quickChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
  },
  quickChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 6,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 13,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomerServiceVarient2;
