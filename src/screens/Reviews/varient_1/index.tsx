import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ChevronDown, Star } from 'lucide-react';
import {
  AppHeader,
  HomeIndicator,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useTheme } from '../../../hooks';
import { useGetReviewsQuery } from '../../../store/api/dummyApi';

export const ReviewsVarient1: React.FC = () => {
  const { data: reviews = [] } = useGetReviewsQuery();
  const { colors } = useTheme();

  const starBars = [
    { stars: 5, percent: '78%' },
    { stars: 4, percent: '52%' },
    { stars: 3, percent: '24%' },
    { stars: 2, percent: '11%' },
    { stars: 1, percent: '4%' },
  ];

  return (
    <ScreenWrapper preset="reviews">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Reviews" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.summaryRow}>
            <Text style={[styles.bigRating, { color: colors.textPrimary }]}>
              4.0
            </Text>
            <View style={styles.summaryRight}>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={20}
                    color={s <= 4 ? colors.warning : colors.border}
                    fill={s <= 4 ? colors.warning : colors.border}
                  />
                ))}
              </View>
              <Text
                style={[
                  styles.ratingsTotalText,
                  { color: colors.textSecondary },
                ]}
              >
                1034 Ratings
              </Text>
            </View>
          </View>

          <View style={styles.barsContainer}>
            {starBars.map((row) => (
              <View key={row.stars} style={styles.barRow}>
                <View style={styles.miniStarsRow}>
                  {[1, 2, 3, 4, 5].map((idx) => (
                    <Star
                      key={idx}
                      size={13}
                      color={
                        idx <= row.stars ? colors.warning : colors.border
                      }
                      fill={
                        idx <= row.stars ? colors.warning : colors.border
                      }
                    />
                  ))}
                </View>
                <View
                  style={[
                    styles.progressTrack,
                    { backgroundColor: colors.border },
                  ]}
                >
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: row.percent as any,
                        backgroundColor: colors.primary,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>

          <View
            style={[styles.divider, { backgroundColor: colors.divider }]}
          />

          <View style={styles.listHeaderRow}>
            <Text
              style={[
                styles.reviewsCountHeading,
                { color: colors.textPrimary },
              ]}
            >
              45 Reviews
            </Text>
            <TouchableOpacity style={styles.sortBtn}>
              <Text
                style={[styles.sortBtnText, { color: colors.textSecondary }]}
              >
                Most Relevant
              </Text>
              <ChevronDown size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {reviews.map((rev) => (
            <View
              key={rev.id}
              style={[
                styles.reviewCard,
                { borderBottomColor: colors.divider },
              ]}
            >
              <View style={styles.reviewStarsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={15}
                    color={s <= rev.rating ? colors.warning : colors.border}
                    fill={s <= rev.rating ? colors.warning : colors.border}
                  />
                ))}
              </View>
              <Text
                style={[styles.reviewComment, { color: colors.textSecondary }]}
              >
                {rev.comment}
              </Text>
              <View style={styles.reviewMetaRow}>
                <Text
                  style={[styles.reviewAuthor, { color: colors.textPrimary }]}
                >
                  {rev.author}
                </Text>
                <Text
                  style={[styles.reviewDot, { color: colors.textSecondary }]}
                >
                  •
                </Text>
                <Text
                  style={[styles.reviewDate, { color: colors.textSecondary }]}
                >
                  {rev.date}
                </Text>
              </View>
            </View>
          ))}
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
    paddingBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginBottom: 16,
  },
  bigRating: {
    fontSize: 56,
    fontWeight: '800',
    letterSpacing: -1.5,
  },
  summaryRight: {
    gap: 6,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 5,
  },
  ratingsTotalText: {
    fontSize: 15,
  },
  barsContainer: {
    gap: 10,
    marginBottom: 18,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  miniStarsRow: {
    flexDirection: 'row',
    gap: 3,
  },
  progressTrack: {
    flex: 1,
    height: 5,
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 99,
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  reviewsCountHeading: {
    fontSize: 17,
    fontWeight: '700',
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortBtnText: {
    fontSize: 14,
    fontWeight: '500',
  },
  reviewCard: {
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  reviewStarsRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14.5,
    lineHeight: 21,
    marginBottom: 8,
  },
  reviewMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reviewAuthor: {
    fontSize: 13,
    fontWeight: '700',
  },
  reviewDot: {
    fontSize: 13,
  },
  reviewDate: {
    fontSize: 13,
  },
});

export default ReviewsVarient1;
