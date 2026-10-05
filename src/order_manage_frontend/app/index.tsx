import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLedger } from '@/context/LedgerContext';
import { useAppTheme } from '@/context/ThemeContext';

// Components
import { PinPadScreen } from '@/components/PinPadScreen';
import { Header } from '@/components/Header';
import { BottomNav, AppTab } from '@/components/BottomNav';
import { ProfileModal } from '@/components/ProfileModal';
import { AddOrderModal } from '@/components/AddOrderModal';
import { DeliverConfirmModal } from '@/components/DeliverConfirmModal';
import { PaymentModal } from '@/components/PaymentModal';
import { RiyalSettleModal } from '@/components/RiyalSettleModal';
import { ExportModal } from '@/components/ExportModal';
import { ResetDataModal } from '@/components/ResetDataModal';

// Tabs
import { HomeTab } from '@/views/HomeTab';
import { OrdersTab } from '@/views/OrdersTab';
import { FinanceTab } from '@/views/FinanceTab';
import { CustomersTab } from '@/views/CustomersTab';
import { MoreTab } from '@/views/MoreTab';

// Subviews
import { CalculatorView } from '@/views/CalculatorView';
import { ProfitLossView } from '@/views/ProfitLossView';
import { ActivityView } from '@/views/ActivityView';
import { HistoryView } from '@/views/HistoryView';

import { CustomerLedgerEntry, Order } from '@/types/ledger';

export default function AppIndex() {
  const { isAuthenticated, isReady } = useLedger();
  const { colors } = useAppTheme();

  // Navigation state
  const [currentTab, setCurrentTab] = useState<AppTab>('dashboard');
  const [activeSubView, setActiveSubView] = useState<'calculator' | 'profit-loss' | 'activity' | 'history' | null>(null);

  // Modals state
  const [profileOpen, setProfileOpen] = useState(false);
  const [addOrderOpen, setAddOrderOpen] = useState(false);
  const [deliverOrder, setDeliverOrder] = useState<Order | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [settleEntry, setSettleEntry] = useState<CustomerLedgerEntry | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  if (!isReady) {
    return <View style={styles.loadingContainer} />;
  }

  // PIN Lock Gate
  if (!isAuthenticated) {
    return (
      <View style={[styles.outerContainer, { backgroundColor: colors.backdrop }]}>
        <View style={[styles.mobileFrame, { backgroundColor: colors.bg }]}>
          <PinPadScreen />
        </View>
      </View>
    );
  }

  const renderContent = () => {
    // Sub-views take priority if active
    if (activeSubView === 'calculator') {
      return <CalculatorView onBack={() => setActiveSubView(null)} />;
    }
    if (activeSubView === 'profit-loss') {
      return <ProfitLossView onBack={() => setActiveSubView(null)} />;
    }
    if (activeSubView === 'activity') {
      return <ActivityView onBack={() => setActiveSubView(null)} />;
    }
    if (activeSubView === 'history') {
      return <HistoryView onBack={() => setActiveSubView(null)} />;
    }

    // Main Tabs
    switch (currentTab) {
      case 'orders':
        return (
          <OrdersTab
            onMarkDelivered={(order) => setDeliverOrder(order)}
            onOpenNewOrder={() => setAddOrderOpen(true)}
          />
        );
      case 'finance':
        return (
          <FinanceTab
            onOpenMakePayment={() => setPaymentOpen(true)}
            onOpenSettleModal={(entry) => setSettleEntry(entry)}
          />
        );
      case 'customers':
        return <CustomersTab />;
      case 'more':
        return (
          <MoreTab
            onOpenCalculator={() => setActiveSubView('calculator')}
            onOpenExport={() => setExportOpen(true)}
            onOpenActivity={() => setActiveSubView('activity')}
            onOpenProfile={() => setProfileOpen(true)}
            onOpenReset={() => setResetOpen(true)}
          />
        );
      case 'dashboard':
      default:
        return (
          <HomeTab
            onOpenNewOrder={() => setAddOrderOpen(true)}
            onOpenMakePayment={() => setPaymentOpen(true)}
            onOpenReceiveRiyal={() => {
              setCurrentTab('finance');
            }}
            onOpenCalculator={() => setActiveSubView('calculator')}
            onNavigateToTab={(tab) => {
              if (tab === 'orders') setCurrentTab('orders');
              else if (tab === 'finance') setCurrentTab('finance');
              else if (tab === 'customers') setCurrentTab('customers');
              else if (tab === 'more') setCurrentTab('more');
            }}
            onMarkDelivered={(order) => setDeliverOrder(order)}
          />
        );
    }
  };

  return (
    <View style={[styles.outerContainer, { backgroundColor: colors.backdrop }]}>
      <SafeAreaView
        style={[styles.mobileFrame, { backgroundColor: colors.bg }]}
        edges={['top', 'left', 'right']}>
        {/* Top Header */}
        {!activeSubView && (
          <Header
            onOpenProfile={() => setProfileOpen(true)}
            onOpenActivity={() => setActiveSubView('activity')}
            onOpenNewOrder={() => setAddOrderOpen(true)}
          />
        )}

        {/* Content Body */}
        <View style={styles.body}>{renderContent()}</View>

        {/* Bottom Navigation */}
        {!activeSubView && (
          <BottomNav
            currentTab={currentTab}
            onSelectTab={(tab) => {
              setActiveSubView(null);
              setCurrentTab(tab);
            }}
            onOpenNewOrder={() => setAddOrderOpen(true)}
          />
        )}

        {/* Global Modals */}
        <ProfileModal visible={profileOpen} onClose={() => setProfileOpen(false)} />
        <AddOrderModal visible={addOrderOpen} onClose={() => setAddOrderOpen(false)} />
        <DeliverConfirmModal
          order={deliverOrder}
          visible={deliverOrder !== null}
          onClose={() => setDeliverOrder(null)}
        />
        <PaymentModal visible={paymentOpen} onClose={() => setPaymentOpen(false)} />
        <RiyalSettleModal
          entry={settleEntry}
          visible={settleEntry !== null}
          onClose={() => setSettleEntry(null)}
        />
        <ExportModal visible={exportOpen} onClose={() => setExportOpen(false)} />
        <ResetDataModal visible={resetOpen} onClose={() => setResetOpen(false)} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#060910', // Deep executive backdrop on wide displays
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileFrame: {
    flex: 1,
    width: '100%',
    maxWidth: 480, // Crisp mobile viewport max width
  },
  loadingContainer: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
});
