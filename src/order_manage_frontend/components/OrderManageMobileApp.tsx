import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useLedger, LedgerProvider } from '@/context/LedgerContext';
import { useAppTheme, AppThemeProvider } from '@/context/ThemeContext';

// Components & Modals
import { Header } from '@/components/Header';
import { AppTab } from '@/components/BottomNav';
import { OrderManageBottomNavVariants, BottomNavVariantId } from '@/components/OrderManageBottomNavVariants';
import { PinPadScreen } from '@/components/PinPadScreen';
import { AddOrderModal } from '@/components/AddOrderModal';
import { DeliverConfirmModal } from '@/components/DeliverConfirmModal';
import { RiyalSettleModal } from '@/components/RiyalSettleModal';
import { PaymentModal } from '@/components/PaymentModal';
import { CustomerPickerModal } from '@/components/CustomerPickerModal';
import { ProfileModal } from '@/components/ProfileModal';
import { ExportModal } from '@/components/ExportModal';
import { ResetDataModal } from '@/components/ResetDataModal';
import { MenuModal } from '@/components/MenuModal';

// Views
import { HomeTab } from '@/views/HomeTab';
import { OrdersTab } from '@/views/OrdersTab';
import { FinanceTab } from '@/views/FinanceTab';
import { CustomersTab } from '@/views/CustomersTab';
import { MoreTab } from '@/views/MoreTab';
import { ActivityView } from '@/views/ActivityView';
import { CalculatorView } from '@/views/CalculatorView';
import { CustomerDetailView } from '@/views/CustomerDetailView';
import { DeliveriesView } from '@/views/DeliveriesView';
import { DueView } from '@/views/DueView';
import { HistoryView } from '@/views/HistoryView';
import { PaymentsView } from '@/views/PaymentsView';
import { ProfitLossView } from '@/views/ProfitLossView';
import { QueueView } from '@/views/QueueView';
import { RiyalView } from '@/views/RiyalView';

// Screen Variants Catalog
import { ORDER_MANAGE_SCREEN_VARIANTS } from '../screens';

import { Order, Customer, CustomerLedgerEntry } from '@/types/ledger';

export type SubViewType =
  | null
  | 'activity'
  | 'calculator'
  | 'customerDetail'
  | 'deliveries'
  | 'due'
  | 'history'
  | 'payments'
  | 'profitLoss'
  | 'queue'
  | 'riyal';

interface OrderManageMobileAppProps {
  forcedTab?: AppTab;
  forcedSubView?: SubViewType;
  variantsMap?: Record<string, 'v1' | 'v2' | 'v3'>;
  activeVariant?: 'v1' | 'v2' | 'v3';
  bottomNavVariant?: BottomNavVariantId;
  bypassAuth?: boolean;
  showHeader?: boolean;
}

function InnerMobileApp({
  forcedTab,
  forcedSubView,
  variantsMap,
  activeVariant = 'v1',
  bottomNavVariant = 'varient_1',
  bypassAuth,
  showHeader = false,
}: OrderManageMobileAppProps) {
  const { isAuthenticated, isReady, customers, customerLedger } = useLedger();
  const { colors } = useAppTheme();

  const getVariantFor = (screenId: string): 'v1' | 'v2' | 'v3' => {
    return variantsMap?.[screenId] || activeVariant || 'v1';
  };

  // Navigation State
  const [currentTab, setCurrentTab] = useState<AppTab>(forcedTab || 'dashboard');
  const [activeSubView, setActiveSubView] = useState<SubViewType>(forcedSubView || null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [deliveringOrder, setDeliveringOrder] = useState<Order | null>(null);
  const [settleEntry, setSettleEntry] = useState<CustomerLedgerEntry | null>(null);

  // Sync forced props if passed
  React.useEffect(() => {
    if (forcedTab) setCurrentTab(forcedTab);
  }, [forcedTab]);

  React.useEffect(() => {
    if (forcedSubView !== undefined) setActiveSubView(forcedSubView);
  }, [forcedSubView]);

  // Modals
  const [addOrderOpen, setAddOrderOpen] = useState(false);
  const [deliverConfirmOpen, setDeliverConfirmOpen] = useState(false);
  const [riyalOpen, setRiyalOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [customerPickerOpen, setCustomerPickerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // If locked & not bypassing
  if (!isAuthenticated && !bypassAuth) {
    const PinPadComponent = ORDER_MANAGE_SCREEN_VARIANTS.pinLock[getVariantFor('pinLock')] || PinPadScreen;
    return <PinPadComponent />;
  }

  // Handle order delivery action
  const handleMarkDelivered = (order: Order) => {
    setDeliveringOrder(order);
    setDeliverConfirmOpen(true);
  };

  const activeCustomer = selectedCustomer || customers[0] || {
    id: 'cust-fallback',
    name: 'Customer',
    mobile: '01700000000',
    createdAt: new Date().toISOString(),
  };

  // Render active main content dynamically using selected Variant Component
  const renderContent = () => {
    if (activeSubView) {
      switch (activeSubView) {
        case 'activity': {
          const Comp = ORDER_MANAGE_SCREEN_VARIANTS.activity[getVariantFor('activity')] || ActivityView;
          return <Comp onBack={() => setActiveSubView(null)} />;
        }
        case 'calculator': {
          const Comp = ORDER_MANAGE_SCREEN_VARIANTS.calculator[getVariantFor('calculator')] || CalculatorView;
          return <Comp onBack={() => setActiveSubView(null)} />;
        }
        case 'customerDetail':
          return (
            <CustomerDetailView
              customer={activeCustomer}
              onBack={() => setActiveSubView(null)}
            />
          );
        case 'deliveries': {
          const Comp = ORDER_MANAGE_SCREEN_VARIANTS.deliveries[getVariantFor('deliveries')] || DeliveriesView;
          return <Comp onBack={() => setActiveSubView(null)} />;
        }
        case 'due':
          return (
            <DueView
              onBack={() => setActiveSubView(null)}
              onOpenMakePayment={() => setPaymentOpen(true)}
            />
          );
        case 'history':
          return <HistoryView onBack={() => setActiveSubView(null)} />;
        case 'payments':
          return (
            <PaymentsView
              onBack={() => setActiveSubView(null)}
              onOpenMakePayment={() => setPaymentOpen(true)}
            />
          );
        case 'profitLoss': {
          const Comp = ORDER_MANAGE_SCREEN_VARIANTS.profitLoss[getVariantFor('profitLoss')] || ProfitLossView;
          return <Comp onBack={() => setActiveSubView(null)} />;
        }
        case 'queue':
          return (
            <QueueView
              onBack={() => setActiveSubView(null)}
              onOpenDeliverModal={handleMarkDelivered}
            />
          );
        case 'riyal': {
          const Comp = ORDER_MANAGE_SCREEN_VARIANTS.riyal[getVariantFor('riyal')] || RiyalView;
          return (
            <Comp
              onBack={() => setActiveSubView(null)}
              onOpenSettleModal={(entry: any) => {
                setSettleEntry(entry);
                setRiyalOpen(true);
              }}
            />
          );
        }
        default:
          break;
      }
    }

    switch (currentTab) {
      case 'dashboard': {
        const Comp = ORDER_MANAGE_SCREEN_VARIANTS.dashboard[getVariantFor('dashboard')] || HomeTab;
        return (
          <Comp
            onOpenNewOrder={() => setAddOrderOpen(true)}
            onOpenMakePayment={() => setPaymentOpen(true)}
            onOpenReceiveRiyal={() => {
              setSettleEntry(customerLedger[0] || null);
              setRiyalOpen(true);
            }}
            onOpenCalculator={() => setActiveSubView('calculator')}
            onNavigateToTab={(tab: AppTab) => {
              setCurrentTab(tab);
              setActiveSubView(null);
            }}
            onMarkDelivered={handleMarkDelivered}
          />
        );
      }
      case 'orders': {
        const Comp = ORDER_MANAGE_SCREEN_VARIANTS.orders[getVariantFor('orders')] || OrdersTab;
        return (
          <Comp
            onOpenNewOrder={() => setAddOrderOpen(true)}
            onMarkDelivered={handleMarkDelivered}
          />
        );
      }
      case 'finance': {
        const Comp = ORDER_MANAGE_SCREEN_VARIANTS.finance[getVariantFor('finance')] || FinanceTab;
        return (
          <Comp
            onOpenMakePayment={() => setPaymentOpen(true)}
            onOpenSettleModal={(entry: any) => {
              setSettleEntry(entry);
              setRiyalOpen(true);
            }}
          />
        );
      }
      case 'customers': {
        const Comp = ORDER_MANAGE_SCREEN_VARIANTS.customers[getVariantFor('customers')] || CustomersTab;
        return <Comp />;
      }
      case 'more': {
        const Comp = ORDER_MANAGE_SCREEN_VARIANTS.more[getVariantFor('more')] || MoreTab;
        return (
          <Comp
            onOpenProfile={() => setProfileOpen(true)}
            onOpenExport={() => setExportOpen(true)}
            onOpenReset={() => setResetOpen(true)}
            onOpenCalculator={() => setActiveSubView('calculator')}
            onOpenActivity={() => setActiveSubView('activity')}
          />
        );
      }
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Top App Header (Only rendered when showHeader is true and not in a subview) */}
      {showHeader && !activeSubView && (
        <Header
          onOpenProfile={() => setProfileOpen(true)}
          onOpenActivity={() => setActiveSubView('activity')}
          onOpenNewOrder={() => setAddOrderOpen(true)}
        />
      )}

      {/* Main View Area */}
      <View style={styles.body}>{renderContent()}</View>

      {/* Bottom Tab Navigation Variants */}
      <OrderManageBottomNavVariants
        variantId={bottomNavVariant}
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setActiveSubView(null);
        }}
        onOpenNewOrder={() => setAddOrderOpen(true)}
      />

      {/* All Functional Modals */}
      <AddOrderModal
        visible={addOrderOpen}
        onClose={() => setAddOrderOpen(false)}
      />

      <DeliverConfirmModal
        visible={deliverConfirmOpen}
        order={deliveringOrder}
        onClose={() => {
          setDeliverConfirmOpen(false);
          setDeliveringOrder(null);
        }}
      />

      <RiyalSettleModal
        visible={riyalOpen}
        entry={settleEntry}
        onClose={() => {
          setRiyalOpen(false);
          setSettleEntry(null);
        }}
      />

      <PaymentModal
        visible={paymentOpen}
        onClose={() => setPaymentOpen(false)}
      />

      <CustomerPickerModal
        visible={customerPickerOpen}
        onClose={() => setCustomerPickerOpen(false)}
        onSelect={(cust) => {
          setSelectedCustomer(cust);
          setActiveSubView('customerDetail');
        }}
      />

      <ProfileModal
        visible={profileOpen}
        onClose={() => setProfileOpen(false)}
      />

      <ExportModal
        visible={exportOpen}
        onClose={() => setExportOpen(false)}
      />

      <ResetDataModal
        visible={resetOpen}
        onClose={() => setResetOpen(false)}
      />

      <MenuModal
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={(screen) => {
          setMenuOpen(false);
          if (screen === 'calculator' || screen === 'activity' || screen === 'history' || screen === 'due' || screen === 'payments') {
            setActiveSubView(screen as SubViewType);
          } else if (screen === 'orders' || screen === 'finance' || screen === 'customers' || screen === 'more') {
            setCurrentTab(screen as AppTab);
            setActiveSubView(null);
          }
        }}
      />
    </View>
  );
}

export function OrderManageMobileApp(props: OrderManageMobileAppProps) {
  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <LedgerProvider>
          <InnerMobileApp {...props} />
        </LedgerProvider>
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}

export default OrderManageMobileApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  body: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
});
