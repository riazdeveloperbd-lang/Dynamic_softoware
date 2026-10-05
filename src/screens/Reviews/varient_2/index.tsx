import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Camera, CheckCircle2, Star } from 'lucide-react';
import { IMAGES } from '../../../assets';
import {
  AppHeader,
  HomeIndicator,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useTheme } from '../../../hooks';
import { useGetReviewsQuery } from '../../../store/api/dummyApi';

export const ReviewsVarient2: React.FC = () => {
  const { data: reviews = [] } = useGetReviewsQuery();
  const { colors } = useTheme();
  const [filterStar, setFilterStar] = useState('All Photos');

  const filters = ['All Photos', '5 Stars', 'True to Size', 'Heavyweight'];
  const galleryPhotos = [
    IMAGES.navySloganTshirt,
    IMAGES.tealPoloShirt,
    IMAGES.blackVneckTshirt,
    IMAGES.pinkLongsleeveTshirt,
  ];

  return (
    <ScreenWrapper preset="reviews">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Photo & Fit Reviews" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Customer Photo Strip */}
          <View style={styles.photoSectionHeader}>
            <View style={styles.photoTitleRow}>
              <Camera size={17} color={colors.textPrimary} />
              <Text
                style={[styles.sectionTitle, { color: colors.textPrimary }]}
              >
                Customer Streetwear Gallery (148)
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photoScroll}
          >
            {galleryPhotos.map((uri, i) => (
              <View
                key={i}
                style={[
                  styles.photoTile,
                  { backgroundColor: colors.productTile },
                ]}
              >
                <Image
                  source={{ uri }}
                  style={styles.photoImg}
                  resizeMode="cover"
                />
                <View style={styles.photoStarChip}>
                  <Star size={10} color="#FFA928" fill="#FFA928" />
                  <Text style={styles.photoStarText}>5.0</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Filter Pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {filters.map((f) => {
              const active = filterStar === f;
              return (
                <TouchableOpacity
                  key={f}
                  onPress={() => setFilterStar(f)}
                  style={[
                    styles.filterChip,
                    active
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
                      styles.filterChipText,
                      {
                        color: active
                          ? colors.primaryText
                          : colors.textPrimary,
                      },
                    ]}
                  >
                    {f}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Boxed Buyer Review Cards */}
          <View style={styles.cardsStack}>
            {reviews.map((rev) => (
              <View
                key={rev.id}
                style={[
                  styles.reviewCard,
                  {
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.cardTopRow}>
                  <View style={styles.authorLeft}>
                    <View
                      style={[
                        styles.avatarCircle,
                        { backgroundColor: colors.surface },
                      ]}
                    >
                      <Text
                        style={[
                          styles.avatarInitials,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {rev.author
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </Text>
                    </View>
                    <View>
                      <View style={styles.verifiedNameRow}>
                        <Text
                          style={[
                            styles.authorName,
                            { color: colors.textPrimary },
                          ]}
                        >
                          {rev.author}
                        </Text>
                        <CheckCircle2 size={14} color={colors.success} />
                      </View>
                      <Text
                        style={[
                          styles.fitMeta,
                          { color: colors.textSecondary },
                        ]}
                      >
                        Purchased Size M • True to Size
                      </Text>
                    </View>
                  </View>

                  <View style={styles.starsInline}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={13}
                        color={s <= rev.rating ? colors.warning : colors.border}
                        fill={s <= rev.rating ? colors.warning : colors.border}
                      />
                    ))}
                  </View>
                </View>

                <Text
                  style={[styles.commentBody, { color: colors.textPrimary }]}
                >
                  {rev.comment}
                </Text>

                <Text
                  style={[styles.dateLabel, { color: colors.textSecondary }]}
                >
                  Verified Buyer • {rev.dateAgo}
                </Text>
              </View>
            ))}
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
    paddingBottom: 24,
  },
  photoSectionHeader: {
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  photoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 15.5,
    fontWeight: '800',
  },
  photoScroll: {
    paddingHorizontal: 24,
    gap: 10,
  },
  photoTile: {
    width: 96,
    height: 112,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  photoImg: {
    width: '100%',
    height: '100%',
  },
  photoStarChip: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(0,0,0,0.72)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  photoStarText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  filterRow: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    height: 34,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  cardsStack: {
    paddingHorizontal: 24,
    gap: 12,
  },
  reviewCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  authorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: 13,
    fontWeight: '800',
  },
  verifiedNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  authorName: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  fitMeta: {
    fontSize: 12,
    marginTop: 1,
  },
  starsInline: {
    flexDirection: 'row',
    gap: 2,
  },
  commentBody: {
    fontSize: 13.5,
    lineHeight: 20,
  },
  dateLabel: {
    fontSize: 11.5,
    fontWeight: '600',
  },
});

export default ReviewsVarient2;
