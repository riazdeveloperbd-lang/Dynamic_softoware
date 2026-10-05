import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Image as ImageIcon, Mic } from 'lucide-react';
import {
  AppHeader,
  HomeIndicator,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppDispatch, useAppSelector, useTheme } from '../../../hooks';
import { sendChatMessage } from '../../../store/slices/appSlice';

export const CustomerServiceVarient1: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const messages = useAppSelector((s) => s.app.chatMessages);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    dispatch(sendChatMessage(inputText));
    setInputText('');
  };

  return (
    <ScreenWrapper preset="chat">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Customer Service" rightAction="phone" />

        <ScrollView
          contentContainerStyle={styles.chatScroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Today Badge */}
          <View
            style={[styles.todayChip, { backgroundColor: colors.surface }]}
          >
            <Text style={[styles.todayChipText, { color: colors.textPrimary }]}>
              Today
            </Text>
          </View>

          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <View
                key={msg.id}
                style={[
                  styles.msgBlock,
                  isUser ? styles.msgBlockRight : styles.msgBlockLeft,
                ]}
              >
                <View
                  style={[
                    styles.bubble,
                    isUser
                      ? [
                          styles.bubbleUser,
                          { backgroundColor: colors.primary },
                        ]
                      : [
                          styles.bubbleAgent,
                          { backgroundColor: colors.surface },
                        ],
                  ]}
                >
                  <Text
                    style={[
                      styles.bubbleText,
                      {
                        color: isUser
                          ? colors.primaryText
                          : colors.textPrimary,
                      },
                    ]}
                  >
                    {msg.text}
                  </Text>
                </View>
                {msg.time && (
                  <Text
                    style={[
                      styles.timestamp,
                      {
                        color: colors.textSecondary,
                        textAlign: isUser ? 'right' : 'left',
                      },
                    ]}
                  >
                    {msg.time}
                  </Text>
                )}
              </View>
            );
          })}
        </ScrollView>

        {/* Bottom Message Composer */}
        <View
          style={[styles.composerBar, { backgroundColor: colors.background }]}
        >
          <View style={styles.composerRow}>
            <View
              style={[
                styles.inputWrap,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.cardBackground,
                },
              ]}
            >
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={handleSend}
                placeholder="Write your message..."
                placeholderTextColor={colors.textMuted}
                style={[styles.textInput, { color: colors.textPrimary }]}
              />
              <TouchableOpacity onPress={handleSend}>
                <ImageIcon size={22} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleSend}
              activeOpacity={0.85}
              style={[styles.micBtn, { backgroundColor: colors.primary }]}
            >
              <Mic size={22} color={colors.primaryText} />
            </TouchableOpacity>
          </View>
          <HomeIndicator />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatScroll: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  todayChip: {
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 16,
  },
  todayChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  msgBlock: {
    marginBottom: 10,
    maxWidth: '78%',
  },
  msgBlockLeft: {
    alignSelf: 'flex-start',
  },
  msgBlockRight: {
    alignSelf: 'flex-end',
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  bubbleAgent: {
    borderBottomLeftRadius: 2,
  },
  bubbleUser: {
    borderBottomRightRadius: 2,
  },
  bubbleText: {
    fontSize: 14.5,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 6,
  },
  composerBar: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  composerRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  inputWrap: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    height: '100%',
    outlineStyle: 'none',
  } as any,
  micBtn: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomerServiceVarient1;
