import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Award, ShieldCheck, Star, ThumbsUp } from 'lucide-react';
import {
  AppHeader,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';
import { useGetReviewsQuery } from '../../../store/api/dummyApi';

export const ReviewsVarient3: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { data: reviews = [] } = useGetReviewsQuery();
  const { colors } = useTheme();

  const metrics = [
    { label: 'Fabric Weight & Softness', score: '4.9 / 5.0', pct: '96%' },
    { label: 'Collar Stitching Durability', score: '4.8 / 5.0', pct: '92%' },
    { label: 'True-to-Size Fit Accuracy', score: '4.7 / 5.0', pct: '89%' },
  ];

  return (
    <ScreenWrapper preset="reviews">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Quality & Fit Scorecard" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Fit & Quality Scorecard Hero */}
          <View
            style={[
              styles.scoreHero,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.scoreTopRow}>
              <View>
                <Text
                  style={[styles.recommendPct, { color: colors.textPrimary }]}
                >
                  98% Recommend
                </Text>
                <Text
                  style={[
                    styles.recommendSub,
                    { color: colors.textSecondary },
                  ]}
                >
                  Based on 1,034 verified studio purchases
                </Text>
              </View>
              <View
                style={[
                  styles.awardBadge,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Award size={20} color={colors.primaryText} />
              </View>
            </View>

            {/* Fit Spectrum Slider Indicator */}
            <View style={styles.fitSpectrumWrap}>
              <View style={styles.spectrumLabels}>
                <Text
                  style={[
                    styles.spectrumText,
                    { color: colors.textSecondary },
                  ]}
                >
                  Runs Small
                </Text>
                <Text
                  style={[
                    styles.spectrumTextBold,
                    { color: colors.textPrimary },
                  ]}
                >
                  True to Size (89%)
                </Text>
                <Text
                  style={[
                    styles.spectrumText,
                    { color: colors.textSecondary },
                  ]}
                >
                  Runs Large
                </Text>
              </View>
              <View
                style={[
                  styles.spectrumTrack,
                  { backgroundColor: colors.border },
                ]}
              >
                <View
                  style={[
                    styles.spectrumKnob,
                    { backgroundColor: colors.primary },
                  ]}
                />
              </View>
            </View>

            {/* Metric Breakdown Bars */}
            <View style={styles.metricsList}>
              {metrics.map((m) => (
                <View key={m.label} style={{ gap: 6 }}>
                  <View style={styles.metricLine}>
                    <Text
                      style={[
                        styles.metricName,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {m.label}
                    </Text>
                    <Text
                      style={[
                        styles.metricScore,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {m.score}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.metricTrack,
                      { backgroundColor: colors.border },
                    ]}
                  >
                    <View
                      style={[
                        styles.metricFill,
                        {
                          width: m.pct as any,
                          backgroundColor: colors.success,
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Highlighted Top Reviews */}
          <Text
            style={[
              styles.sectionHeading,
              { color: colors.textPrimary },
            ]}
          >
            Most Helpful Buyer Insights
          </Text>

          <View style={styles.insightsStack}>
            {reviews.slice(0, 3).map((r) => (
              <View
                key={r.id}
                style={[
                  styles.insightCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.insightHeader}>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        color={colors.warning}
                        fill={colors.warning}
                      />
                    ))}
                  </View>
                  <View style={styles.helpfulChip}>
                    <ThumbsUp size={12} color={colors.textSecondary} />
                    <Text
                      style={[
                        styles.helpfulText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Helpful (24)
                    </Text>
                  </View>
                </View>

                <Text
                  style={[styles.insightComment, { color: colors.textPrimary }]}
                >
                  “{r.comment}”
                </Text>

                <View style={styles.insightFooter}>
                  <ShieldCheck size={14} color={colors.success} />
                  <Text
                    style={[
                      styles.insightAuthor,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {r.author} • {r.dateAgo}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <PrimaryButton
            title="Write a Verified Review"
            onPress={() => navigateTo('MyOrders', 'varient_3')}
            style={{ marginTop: 18 }}
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
    paddingBottom: 24,
  },
  scoreHero: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    gap: 16,
  },
  scoreTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recommendPct: {
    fontSize: 24,
    fontWeight: '800',
  },
  recommendSub: {
    fontSize: 12.5,
    marginTop: 2,
  },
  awardBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fitSpectrumWrap: {
    gap: 8,
  },
  spectrumLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spectrumText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  spectrumTextBold: {
    fontSize: 12,
    fontWeight: '800',
  },
  spectrumTrack: {
    height: 8,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spectrumKnob: {
    width: 28,
    height: 12,
    borderRadius: 6,
  },
  metricsList: {
    gap: 10,
  },
  metricLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricName: {
    fontSize: 13,
    fontWeight: '600',
  },
  metricScore: {
    fontSize: 13,
    fontWeight: '800',
  },
  metricTrack: {
    height: 6,
    borderRadius: 99,
    overflow: 'hidden',
  },
  metricFill: {
    height: '100%',
    borderRadius: 99,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 20,
    marginBottom: 12,
  },
  insightsStack: {
    gap: 12,
  },
  insightCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  helpfulChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  helpfulText: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightComment: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  insightFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  insightAuthor: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ReviewsVarient3;
