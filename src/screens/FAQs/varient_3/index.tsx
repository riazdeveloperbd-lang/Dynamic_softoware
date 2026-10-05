import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Sparkles, ThumbsUp } from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  SearchBar,
  StatusBar,
} from '../../../component';
import { useTheme } from '../../../hooks';
import { useGetFaqsQuery } from '../../../store/api/dummyApi';

export const FAQsVarient3: React.FC = () => {
  const { data: faqs = [] } = useGetFaqsQuery();
  const { colors, isDark } = useTheme();
  const [query, setQuery] = useState('');
  const [helpfulIds, setHelpfulIds] = useState<string[]>(['f1']);

  const toggleHelpful = (id: string) => {
    setHelpfulIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <ScreenWrapper preset="list" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Instant Answers" showBorder={false} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder="Ask about sizing, shipping, returns..."
          />

          {/* Featured Instant Summary */}
          <View
            style={[
              styles.summaryCard,
              { backgroundColor: isDark ? '#242429' : '#18181B' },
            ]}
          >
            <View style={styles.summaryBadge}>
              <Sparkles size={13} color="#FFA928" />
              <Text style={styles.summaryBadgeText}>MOST ASKED THIS WEEK</Text>
            </View>
            <Text style={styles.summaryTitle}>
              Complimentary Express Returns Within 30 Days
            </Text>
            <Text style={styles.summaryDesc}>
              Every Define Studio order includes a prepaid DHL Express return label inside the parcel. Refunds are issued within 2 hours of courier drop-off scan.
            </Text>
          </View>

          {/* Article Cards with Helpful Votes */}
          <View style={styles.list}>
            {faqs.map((faq) => {
              const liked = helpfulIds.includes(faq.id);
              return (
                <View
                  key={faq.id}
                  style={[
                    styles.articleCard,
                    {
                      backgroundColor: colors.cardBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View style={styles.catRow}>
                    <Text
                      style={[
                        styles.catBadge,
                        {
                          backgroundColor: colors.surface,
                          color: colors.textSecondary,
                        },
                      ]}
                    >
                      {faq.category.toUpperCase()}
                    </Text>
                  </View>
                  <Text
                    style={[styles.question, { color: colors.textPrimary }]}
                  >
                    {faq.question}
                  </Text>
                  <Text
                    style={[styles.answer, { color: colors.textSecondary }]}
                  >
                    {faq.answer}
                  </Text>

                  <View
                    style={[
                      styles.footerRow,
                      { borderTopColor: colors.border },
                    ]}
                  >
                    <Text
                      style={[
                        styles.helpfulPrompt,
                        { color: colors.textMuted },
                      ]}
                    >
                      Was this helpful?
                    </Text>
                    <TouchableOpacity
                      onPress={() => toggleHelpful(faq.id)}
                      style={[
                        styles.helpfulBtn,
                        liked
                          ? { backgroundColor: colors.primary }
                          : { backgroundColor: colors.surface },
                      ]}
                    >
                      <ThumbsUp
                        size={13}
                        color={liked ? colors.primaryText : colors.textPrimary}
                      />
                      <Text
                        style={[
                          styles.helpfulBtnText,
                          {
                            color: liked
                              ? colors.primaryText
                              : colors.textPrimary,
                          },
                        ]}
                      >
                        {liked ? 'Helpful (24)' : 'Yes'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
    paddingTop: 4,
    paddingBottom: 24,
  },
  summaryCard: {
    borderRadius: 18,
    padding: 18,
    marginTop: 14,
    marginBottom: 18,
  },
  summaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  summaryBadgeText: {
    color: '#FFA928',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  summaryTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  summaryDesc: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    lineHeight: 18,
  },
  list: {
    gap: 12,
  },
  articleCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  catRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  catBadge: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  question: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  answer: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
  },
  helpfulPrompt: {
    fontSize: 12,
  },
  helpfulBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  helpfulBtnText: {
    fontSize: 11,
    fontWeight: '600',
  },
});

export default FAQsVarient3;
