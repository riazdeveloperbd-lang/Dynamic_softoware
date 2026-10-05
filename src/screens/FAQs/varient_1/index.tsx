import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  SearchBar,
  StatusBar,
} from '../../../component';
import { useTheme } from '../../../hooks';
import { useGetFaqsQuery } from '../../../store/api/dummyApi';

export const FAQsVarient1: React.FC = () => {
  const { data: faqs = [] } = useGetFaqsQuery();
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string>('faq-1');

  const categories = ['General', 'Account', 'Service', 'Payment'];

  const filteredFaqs = faqs.filter((f) =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScreenWrapper preset="list" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="FAQs" />

        {/* Category Pills */}
        <View style={styles.pillsWrap}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pillsScroll}
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={[
                    styles.pill,
                    active
                      ? { backgroundColor: colors.primary }
                      : {
                          backgroundColor: colors.cardBackground,
                          borderWidth: 1,
                          borderColor: colors.border,
                        },
                  ]}
                >
                  <Text
                    style={[
                      styles.pillText,
                      {
                        color: active
                          ? colors.primaryText
                          : colors.textPrimary,
                      },
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Search Questions */}
        <View style={styles.searchWrap}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for questions..."
          />
        </View>

        {/* Accordion Cards */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <TouchableOpacity
                key={faq.id}
                activeOpacity={0.85}
                onPress={() => setOpenId(isOpen ? '' : faq.id)}
                style={[
                  styles.faqCard,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.cardBackground,
                  },
                ]}
              >
                <View style={styles.faqHeaderRow}>
                  <Text
                    style={[styles.faqQuestion, { color: colors.textPrimary }]}
                  >
                    {faq.question}
                  </Text>
                  {isOpen ? (
                    <ChevronUp size={20} color={colors.textPrimary} />
                  ) : (
                    <ChevronDown size={20} color={colors.textPrimary} />
                  )}
                </View>
                {isOpen && (
                  <Text
                    style={[styles.faqAnswer, { color: colors.textSecondary }]}
                  >
                    {faq.answer}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
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
  pillsWrap: {
    marginBottom: 14,
  },
  pillsScroll: {
    paddingHorizontal: 24,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 20,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    fontSize: 15,
    fontWeight: '600',
  },
  searchWrap: {
    paddingHorizontal: 24,
    marginBottom: 14,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  faqCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  faqHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
});

export default FAQsVarient1;
