import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Check, MapPin, Truck } from 'lucide-react';
import {
  AppHeader,
  BottomTabBar,
  ScreenWrapper,
  StatusBar,
} from '../../../component';
import { useAppNavigation, useTheme } from '../../../hooks';
import { useGetOrdersQuery } from '../../../store/api/dummyApi';

export const MyOrdersVarient2: React.FC = () => {
  const { navigateTo } = useAppNavigation();
  const { colors } = useTheme();
  const { data: orders = [] } = useGetOrdersQuery();

  const ongoing = orders.filter((o) => o.status !== 'Completed');

  return (
    <ScreenWrapper preset="orders" showBottomTab activeTab="Account">
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar />
        <AppHeader title="Live Parcel Progress" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {ongoing.map((order, idx) => (
            <View
              key={order.id}
              style={[
                styles.timelineCard,
                {
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <Image
                  source={{ uri: order.image }}
                  style={[
                    styles.thumb,
                    { backgroundColor: colors.productTile },
                  ]}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.orderCode, { color: colors.textSecondary }]}
                  >
                    PARCEL #DF-2026-0{idx + 1}
                  </Text>
                  <Text
                    style={[styles.orderTitle, { color: colors.textPrimary }]}
                  >
                    {order.title}
                  </Text>
                  <Text
                    style={[styles.orderMeta, { color: colors.textSecondary }]}
                  >
                    Size {order.size} • ${order.price.toLocaleString()}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigateTo('TrackOrder', 'varient_2')}
                  style={[
                    styles.liveBtn,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <MapPin size={13} color={colors.primaryText} />
                  <Text
                    style={[styles.liveBtnText, { color: colors.primaryText }]}
                  >
                    Map
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 4-Stage Visual Progress Bar */}
              <View style={styles.stagesRow}>
                {['Packed', 'Picked', 'In Transit', 'Arriving'].map(
                  (stage, sIdx) => {
                    const done = sIdx <= 2;
                    return (
                      <View key={stage} style={styles.stageCol}>
                        <View
                          style={[
                            styles.stageDot,
                            {
                              backgroundColor: done
                                ? colors.success
                                : colors.border,
                            },
                          ]}
                        >
                          {done && <Check size={10} color="#FFFFFF" />}
                        </View>
                        <Text
                          style={[
                            styles.stageLabel,
                            {
                              color: done
                                ? colors.textPrimary
                                : colors.textSecondary,
                            },
                          ]}
                        >
                          {stage}
                        </Text>
                      </View>
                    );
                  }
                )}
              </View>

              <View
                style={[
                  styles.etaFoot,
                  { backgroundColor: colors.surface },
                ]}
              >
                <Truck size={15} color={colors.textPrimary} />
                <Text
                  style={[styles.etaFootText, { color: colors.textPrimary }]}
                >
                  Courier Jacob Jones • 16 Rr 2, Ketchikan, Alaska
                </Text>
              </View>
            </View>
          ))}
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
    paddingBottom: 24,
    gap: 14,
  },
  timelineCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    gap: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  orderCode: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  orderTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  orderMeta: {
    fontSize: 12.5,
    marginTop: 2,
  },
  liveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    height: 32,
    borderRadius: 8,
  },
  liveBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  stagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  stageCol: {
    alignItems: 'center',
    gap: 4,
  },
  stageDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  etaFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  etaFootText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default MyOrdersVarient2;
