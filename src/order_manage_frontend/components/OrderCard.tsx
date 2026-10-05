import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Order } from '@/types/ledger';
import { Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';

interface OrderCardProps {
  order: Order;
  onPress?: () => void;
  onMarkDelivered?: (order: Order) => void;
}

export function OrderCard({ order, onPress, onMarkDelivered }: OrderCardProps) {
  const { colors, isDark } = useAppTheme();
  const isDelivered = order.status === 'delivered';
  const orderNumber = `TR-${String(order.serial).padStart(4, '0')}`;

  const copyRecipient = async () => {
    await Clipboard.setStringAsync(order.recipientNumber);
  };

  const riyalDue = Math.max(0, (order.riyal?.expected || 0) - (order.riyal?.received || 0));

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: order.emergency ? colors.crimson : colors.border,
        },
        order.emergency && {
          backgroundColor: isDark ? '#171113' : 'rgba(239, 68, 68, 0.04)',
        },
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.75 : 1}
      disabled={!onPress}>
      {/* Top Header */}
      <View style={styles.topRow}>
        <View>
          <View style={styles.serialRow}>
            <Text style={[styles.orderNo, { color: colors.text }]}>{orderNumber}</Text>
            {order.emergency && (
              <View style={[styles.urgentBadge, { backgroundColor: colors.crimson }]}>
                <Text style={styles.urgentText}>URGENT</Text>
              </View>
            )}
          </View>
          <Text style={[styles.serialSub, { color: colors.textMuted }]}>Serial #{order.serial}</Text>
        </View>

        <Text style={[styles.amount, { color: colors.primary }]}>
          ৳{order.amount.toLocaleString()}
        </Text>
      </View>

      {/* Meta Row */}
      <View style={styles.metaRow}>
        <Text style={[styles.metaText, { color: colors.textMuted }]}>
          {new Date(order.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          • {order.kind === 'agent' ? 'Agent' : 'Personal'}
        </Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: isDelivered ? colors.emeraldGlow : colors.primaryGlow,
            },
          ]}>
          <Text
            style={[
              styles.statusText,
              { color: isDelivered ? colors.emerald : colors.primary },
            ]}>
            {isDelivered ? 'Delivered' : 'New'}
          </Text>
        </View>
      </View>

      {/* Description & Account */}
      <View style={[styles.descBox, { borderTopColor: colors.border }]}>
        <Text style={[styles.detailLine, { color: colors.textSecondary }]}>
          <Text style={[styles.detailBold, { color: colors.text }]}>Customer: </Text>
          {order.customerName || '—'} • {order.customerMobile || '—'}
        </Text>

        <View style={styles.accountRow}>
          <Text style={[styles.detailLine, { color: colors.textSecondary }]}>
            <Text style={[styles.detailBold, { color: colors.text }]}>Recipient: </Text>
            {order.recipientNumber}
          </Text>
          <TouchableOpacity
            style={[
              styles.copyBtn,
              { backgroundColor: colors.cardElevated, borderColor: colors.border },
            ]}
            onPress={copyRecipient}>
            <Ionicons name="copy-outline" size={13} color={colors.primary} />
            <Text style={[styles.copyText, { color: colors.primary }]}>Copy</Text>
          </TouchableOpacity>
        </View>

        {order.description ? (
          <Text style={[styles.descText, { color: colors.textMuted }]} numberOfLines={2}>
            {order.description}
          </Text>
        ) : null}
      </View>

      {/* Delivery Methods Chips */}
      {order.deliveryMethods && order.deliveryMethods.length > 0 && (
        <View style={styles.tagsRow}>
          {order.deliveryMethods.map((m) => (
            <View
              key={m}
              style={[
                styles.tag,
                { backgroundColor: colors.cardElevated, borderColor: colors.border },
              ]}>
              <Text style={[styles.tagText, { color: colors.textSecondary }]}>
                {m.toUpperCase()}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Riyal Status */}
      {order.riyal && order.riyal.expected > 0 && (
        <View style={[styles.riyalBox, { borderTopColor: colors.border }]}>
          <Text style={[styles.riyalText, { color: colors.textSecondary }]}>
            Riyal: {order.riyal.expected} SAR exp. • {order.riyal.received} SAR rec.
          </Text>
          {riyalDue > 0 ? (
            <View
              style={[
                styles.riyalDueBadge,
                { backgroundColor: colors.crimsonGlow, borderColor: colors.crimson },
              ]}>
              <Text style={[styles.riyalDueText, { color: colors.crimson }]}>
                {riyalDue} SAR Due
              </Text>
            </View>
          ) : (
            <View style={[styles.riyalSettledBadge, { backgroundColor: colors.emeraldGlow }]}>
              <Text style={[styles.riyalSettledText, { color: colors.emerald }]}>Settled</Text>
            </View>
          )}
        </View>
      )}

      {/* Mark Delivered Action */}
      {!isDelivered && onMarkDelivered && (
        <TouchableOpacity
          style={[
            styles.deliverBtn,
            {
              borderColor: order.emergency ? colors.crimson : colors.primary,
              backgroundColor: order.emergency
                ? colors.crimson
                : colors.primaryGlow,
            },
          ]}
          onPress={() => onMarkDelivered(order)}
          activeOpacity={0.8}>
          <Ionicons
            name="checkmark-circle-outline"
            size={18}
            color={order.emergency ? '#fff' : colors.primary}
          />
          <Text
            style={[
              styles.deliverBtnText,
              { color: order.emergency ? '#fff' : colors.primary },
            ]}>
            Mark as Delivered
          </Text>
        </TouchableOpacity>
      )}

      {isDelivered && order.deliveredAt && (
        <View style={[styles.deliveredFooter, { borderTopColor: colors.border }]}>
          <Ionicons name="checkmark-done" size={14} color={colors.emerald} />
          <Text style={[styles.deliveredFootText, { color: colors.emerald }]}>
            Delivered {new Date(order.deliveredAt).toLocaleDateString()}
            {order.deliveryLast4 ? ` • Last 4: ${order.deliveryLast4}` : ''}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  serialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderNo: {
    fontSize: 16,
    fontWeight: '800',
  },
  serialSub: {
    fontSize: 11,
    marginTop: 2,
  },
  urgentBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  urgentText: {
    color: '#fff',
    fontSize: 9.5,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  amount: {
    fontSize: 18,
    fontWeight: '900',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 11.5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: Radius.full,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  descBox: {
    borderTopWidth: 1,
    paddingTop: 8,
    gap: 4,
  },
  detailLine: {
    fontSize: 12.5,
  },
  detailBold: {
    fontWeight: '700',
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.sm,
    borderWidth: 1,
  },
  copyText: {
    fontSize: 11,
    fontWeight: '700',
  },
  descText: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.sm,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
  },
  riyalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
  },
  riyalText: {
    fontSize: 11.5,
  },
  riyalDueBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  riyalDueText: {
    fontSize: 10.5,
    fontWeight: '800',
  },
  riyalSettledBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  riyalSettledText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  deliverBtn: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: Radius.md,
    borderWidth: 1.5,
  },
  deliverBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  deliveredFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
  },
  deliveredFootText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
