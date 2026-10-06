import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';
import { Radius, Spacing } from '@/constants/theme';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';
import { AppModal } from './AppModal';

interface ExportModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ExportModal({ visible, onClose }: ExportModalProps) {
  const { totals, orders, payments, customers } = useLedger();
  const { colors, isDark } = useAppTheme();
  const [copied, setCopied] = useState(false);

  const generatePDF = async () => {
    try {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 24px; color: #1e293b; background: #fff; }
            h1 { font-size: 22px; color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 8px; margin-bottom: 4px; }
            .date { color: #64748b; font-size: 12px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            th, td { border: 1px solid #e2e8f0; padding: 10px; text-align: left; font-size: 13px; }
            th { background-color: #f1f5f9; color: #0f172a; font-weight: bold; }
            .stat-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
            .stat-box { flex: 1; min-width: 140px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; }
            .stat-title { font-size: 11px; text-transform: uppercase; color: #64748b; }
            .stat-val { font-size: 18px; font-weight: bold; color: #0f172a; margin-top: 4px; }
          </style>
        </head>
        <body>
          <h1>TR Connect — Executive Ledger Report</h1>
          <div class="date">Generated on: ${new Date().toLocaleString()}</div>

          <div class="stat-grid">
            <div class="stat-box">
              <div class="stat-title">Total Orders</div>
              <div class="stat-val">৳${totals.totalOrderAmt.toLocaleString()} (${totals.totalOrders})</div>
            </div>
            <div class="stat-box">
              <div class="stat-title">Total Delivered</div>
              <div class="stat-val">৳${totals.totalDeliveryAmt.toLocaleString()} (${totals.totalDeliveries})</div>
            </div>
            <div class="stat-box">
              <div class="stat-title">Total Paid</div>
              <div class="stat-val">৳${totals.totalPaid.toLocaleString()}</div>
            </div>
            <div class="stat-box">
              <div class="stat-title">Due to Pay</div>
              <div class="stat-val" style="color: #dc2626;">৳${totals.totalDue.toLocaleString()}</div>
            </div>
            <div class="stat-box">
              <div class="stat-title">Riyal Received</div>
              <div class="stat-val" style="color: #059669;">${totals.riyalReceived} SAR</div>
            </div>
            <div class="stat-box">
              <div class="stat-title">Riyal Due</div>
              <div class="stat-val" style="color: #dc2626;">${totals.riyalDue} SAR</div>
            </div>
            <div class="stat-box">
              <div class="stat-title">Net Profit/Loss</div>
              <div class="stat-val" style="color: ${totals.profitLoss >= 0 ? '#059669' : '#dc2626'};">
                ৳${Math.abs(totals.profitLoss).toLocaleString()} (${totals.profitLoss >= 0 ? 'Profit' : 'Loss'})
              </div>
            </div>
          </div>

          <h3>Recent Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order No</th>
                <th>Recipient</th>
                <th>Amount (BDT)</th>
                <th>Customer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${orders
                .slice(0, 15)
                .map(
                  (o) => `
                <tr>
                  <td>TR-${String(o.serial).padStart(4, '0')}</td>
                  <td>${o.recipientNumber}</td>
                  <td>৳${o.amount.toLocaleString()}</td>
                  <td>${o.customerName}</td>
                  <td>${o.status.toUpperCase()}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </body>
        </html>
      `;

      if (Platform.OS === 'web') {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(html);
          printWindow.document.close();
          printWindow.print();
        }
      } else {
        const { uri } = await Print.printToFileAsync({ html });
        await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
      }
    } catch (e) {
      console.error('PDF export failed:', e);
    }
  };

  const copyCSVData = async () => {
    let csv = 'Order No,Serial,Recipient,Amount,Customer,Mobile,Status,Emergency,Date\n';
    orders.forEach((o) => {
      csv += `TR-${String(o.serial).padStart(4, '0')},${o.serial},${o.recipientNumber},${o.amount},"${o.customerName}","${o.customerMobile}",${o.status},${o.emergency},"${o.createdAt}"\n`;
    });
    await Clipboard.setStringAsync(csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AppModal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.sheet, { backgroundColor: colors.cardElevated }]}>
          <View
            style={[
              styles.handle,
              { backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' },
            ]}
          />

          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.title, { color: colors.text }]}>Export Reports</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <View
              style={[
                styles.snapshotCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}>
              <Text style={[styles.snapshotTitle, { color: colors.text }]}>Account Snapshot</Text>
              <Text style={[styles.snapshotDesc, { color: colors.textSecondary }]}>
                {totals.totalOrders} Orders • {totals.totalDeliveries} Deliveries •{' '}
                {payments.length} Payments • {customers.length} Customers
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.exportBtn, { backgroundColor: colors.primary }]}
              onPress={generatePDF}
              activeOpacity={0.8}>
              <Ionicons name="document-text-outline" size={22} color="#ffffff" />
              <View style={{ flex: 1 }}>
                <Text style={styles.exportBtnTitle}>Download / Print PDF Summary</Text>
                <Text style={styles.exportBtnSub}>Complete ledger breakdown with tables</Text>
              </View>
              <Ionicons name="download-outline" size={18} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.outlineBtn,
                { backgroundColor: colors.card, borderColor: colors.borderPrimary },
              ]}
              onPress={copyCSVData}
              activeOpacity={0.8}>
              <Ionicons name="grid-outline" size={20} color={colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.outlineBtnTitle, { color: colors.primaryLight }]}>
                  {copied ? 'Copied CSV to Clipboard ✓' : 'Copy CSV Spreadsheet Data'}
                </Text>
                <Text style={[styles.outlineBtnSub, { color: colors.textMuted }]}>
                  Paste into Excel or Google Sheets
                </Text>
              </View>
              <Ionicons name="copy-outline" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingBottom: Spacing.xl,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  closeBtn: {
    padding: 4,
  },
  body: {
    padding: Spacing.lg,
    gap: 14,
  },
  snapshotCard: {
    padding: 14,
    borderRadius: Radius.md,
    borderWidth: 1,
    gap: 4,
  },
  snapshotTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  snapshotDesc: {
    fontSize: 12.5,
  },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    padding: 14,
    gap: 12,
  },
  exportBtnTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#ffffff',
  },
  exportBtnSub: {
    fontSize: 11.5,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 1,
  },
  outlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    padding: 14,
    borderWidth: 1.5,
    gap: 12,
  },
  outlineBtnTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  outlineBtnSub: {
    fontSize: 11.5,
    marginTop: 1,
  },
});
