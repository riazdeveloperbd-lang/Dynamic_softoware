import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Package, Star, X } from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  EmptyState,
  HomeIndicator,
  PrimaryButton,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';
import {
  useAddReviewMutation,
  useGetOrdersQuery,
} from '../../../store/api/dummyApi';

export interface MyOrdersViewProps {
  initialMode?: 'ongoing' | 'empty_ongoing' | 'completed' | 'review_sheet';
}

export const MyOrdersView: React.FC<MyOrdersViewProps> = ({
  initialMode = 'ongoing',
}) => {
  const { navigateTo, switchVariant } = useAppNavigation();
  const { colors } = useTheme();
  const { data: orders = [] } = useGetOrdersQuery();
  const [addReview] = useAddReviewMutation();

  const [activeTab, setActiveTab] = useState<'Ongoing' | 'Completed'>(
    initialMode === 'completed' || initialMode === 'review_sheet'
      ? 'Completed'
      : 'Ongoing'
  );
  const [reviewModalOpen, setReviewModalOpen] = useState(
    initialMode === 'review_sheet'
  );
  const [selectedOrderId, setSelectedOrderId] = useState<string>('ord-6');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (initialMode === 'completed') {
      setActiveTab('Completed');
      setReviewModalOpen(false);
    } else if (initialMode === 'review_sheet') {
      setActiveTab('Completed');
      setReviewModalOpen(true);
    } else {
      setActiveTab('Ongoing');
      setReviewModalOpen(false);
    }
  }, [initialMode]);

  const ongoingOrders =
    initialMode === 'empty_ongoing'
      ? []
      : orders.filter((o) => o.status !== 'Completed');
  const completedOrders = orders.filter((o) => o.status === 'Completed');

  const displayedOrders =
    activeTab === 'Ongoing' ? ongoingOrders : completedOrders;

  return (
    <ScreenWrapper preset="orders" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="My Orders" showBorder={false} />

        {/* Segmented Control */}
        <View style={styles.segmentWrap}>
          <View
            style={[styles.segmentBox, { backgroundColor: colors.surface }]}
          >
            <TouchableOpacity
              onPress={() => setActiveTab('Ongoing')}
              style={[
                styles.segmentBtn,
                activeTab === 'Ongoing' && {
                  backgroundColor: colors.cardBackground,
                },
              ]}
            >
              <Text
                style={[
                  styles.segmentText,
                  {
                    color:
                      activeTab === 'Ongoing'
                        ? colors.textPrimary
                        : colors.textSecondary,
                  },
                ]}
              >
                Ongoing
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('Completed')}
              style={[
                styles.segmentBtn,
                activeTab === 'Completed' && {
                  backgroundColor: colors.cardBackground,
                },
              ]}
            >
              <Text
                style={[
                  styles.segmentText,
                  {
                    color:
                      activeTab === 'Completed'
                        ? colors.textPrimary
                        : colors.textSecondary,
                  },
                ]}
              >
                Completed
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {displayedOrders.length > 0 ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {displayedOrders.map((order) => (
              <View
                key={order.id}
                style={[
                  styles.orderCard,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.cardBackground,
                  },
                ]}
              >
                <Image
                  source={{ uri: order.image }}
                  style={[
                    styles.orderThumb,
                    { backgroundColor: colors.productTile },
                  ]}
                  resizeMode="cover"
                />
                <View style={styles.orderInfo}>
                  <View style={styles.orderTopRow}>
                    <View>
                      <Text
                        style={[
                          styles.orderTitle,
                          { color: colors.textPrimary },
                        ]}
                      >
                        {order.title}
                      </Text>
                      <Text
                        style={[
                          styles.orderSize,
                          { color: colors.textSecondary },
                        ]}
                      >
                        Size {order.size}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.statusBadge,
                        order.status === 'Completed'
                          ? { backgroundColor: colors.successBg }
                          : { backgroundColor: colors.surface },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusBadgeText,
                          {
                            color:
                              order.status === 'Completed'
                                ? colors.success
                                : colors.textPrimary,
                          },
                        ]}
                      >
                        {order.status}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.orderBottomRow}>
                    <Text
                      style={[
                        styles.orderPrice,
                        { color: colors.textPrimary },
                      ]}
                    >
                      $ {order.price.toLocaleString()}
                    </Text>

                    {order.status !== 'Completed' ? (
                      <TouchableOpacity
                        onPress={() => navigateTo('TrackOrder', 'varient_1')}
                        style={[
                          styles.actionSmallBtn,
                          { backgroundColor: colors.primary },
                        ]}
                      >
                        <Text
                          style={[
                            styles.actionSmallBtnText,
                            { color: colors.primaryText },
                          ]}
                        >
                          Track Order
                        </Text>
                      </TouchableOpacity>
                    ) : order.rating ? (
                      <View
                        style={[
                          styles.ratingBadge,
                          {
                            borderColor: colors.border,
                            backgroundColor: colors.cardBackground,
                          },
                        ]}
                      >
                        <Star
                          size={14}
                          color={colors.warning}
                          fill={colors.warning}
                        />
                        <Text
                          style={[
                            styles.ratingBadgeText,
                            { color: colors.textPrimary },
                          ]}
                        >
                          {order.rating}/5
                        </Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedOrderId(order.id);
                          setReviewModalOpen(true);
                        }}
                        style={[
                          styles.actionSmallBtn,
                          { backgroundColor: colors.primary },
                        ]}
                      >
                        <Text
                          style={[
                            styles.actionSmallBtnText,
                            { color: colors.primaryText },
                          ]}
                        >
                          Leave Review
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <EmptyState
            icon={
              <Package size={64} color={colors.textMuted} strokeWidth={1.6} />
            }
            title="No Ongoing Orders!"
            subtitle={'You don’t have any ongoing orders\nat this time.'}
          />
        )}

        <BottomTabBar activeTab="Account" />

        {/* Leave a Review Bottom Sheet */}
        {reviewModalOpen && (
          <View
            style={[
              styles.sheetBackdrop,
              { backgroundColor: colors.overlay },
            ]}
          >
            <View
              style={[
                styles.reviewSheet,
                { backgroundColor: colors.surfaceElevated },
              ]}
            >
              <View
                style={[
                  styles.sheetGrabber,
                  { backgroundColor: colors.border },
                ]}
              />
              <View style={styles.sheetHeaderRow}>
                <Text
                  style={[styles.sheetTitle, { color: colors.textPrimary }]}
                >
                  Leave a Review
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setReviewModalOpen(false);
                    switchVariant('varient_3');
                  }}
                >
                  <X size={22} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>

              <View
                style={[styles.divider, { backgroundColor: colors.divider }]}
              />

              <Text
                style={[styles.reviewSubTitle, { color: colors.textPrimary }]}
              >
                How was your order?
              </Text>
              <Text
                style={[
                  styles.reviewSubCaption,
                  { color: colors.textSecondary },
                ]}
              >
                Please give your rating and also your review.
              </Text>

              <View style={styles.starsPickerRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <Star
                      size={36}
                      color={star <= rating ? colors.warning : colors.border}
                      fill={star <= rating ? colors.warning : colors.border}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <View
                style={[
                  styles.textareaBox,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.cardBackground,
                  },
                ]}
              >
                <TextInput
                  value={comment}
                  onChangeText={setComment}
                  placeholder="Write your review..."
                  placeholderTextColor={colors.textMuted}
                  multiline
                  style={[
                    styles.textareaInput,
                    { color: colors.textPrimary },
                  ]}
                />
              </View>

              <PrimaryButton
                title="Submit"
                onPress={() => {
                  addReview({ orderId: selectedOrderId, rating, comment });
                  setReviewModalOpen(false);
                  switchVariant('varient_3');
                }}
                style={{ marginTop: 16 }}
              />
              <HomeIndicator />
            </View>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export const MyOrdersVarient1: React.FC = () => (
  <MyOrdersView initialMode="ongoing" />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  segmentWrap: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  segmentBox: {
    height: 48,
    borderRadius: 10,
    padding: 4,
    flexDirection: 'row',
  },
  segmentBtn: {
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentText: {
    fontSize: 15,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 14,
  },
  orderCard: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 14,
  },
  orderThumb: {
    width: 82,
    height: 82,
    borderRadius: 8,
  },
  orderInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  orderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  orderSize: {
    fontSize: 13,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  orderBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  actionSmallBtn: {
    paddingHorizontal: 14,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionSmallBtnText: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
  },
  ratingBadgeText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  sheetBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 55,
  },
  reviewSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  sheetGrabber: {
    width: 64,
    height: 5,
    borderRadius: 99,
    alignSelf: 'center',
    marginBottom: 12,
  },
  sheetHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  reviewSubTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  reviewSubCaption: {
    fontSize: 14,
    marginTop: 4,
  },
  starsPickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 22,
  },
  textareaBox: {
    height: 108,
    borderRadius: 10,
    borderWidth: 1,
    padding: 14,
  },
  textareaInput: {
    flex: 1,
    fontSize: 15,
    outlineStyle: 'none',
  } as any,
});

export default MyOrdersVarient1;
