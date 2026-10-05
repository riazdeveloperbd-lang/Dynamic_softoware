import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Order,
  Customer,
  CustomerLedgerEntry,
  Payment,
  ActivityItem,
  AppSettings,
  UserProfile,
  DashboardTotals,
} from '@/types/ledger';
import {
  INITIAL_USER,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS,
  INITIAL_LEDGER,
  INITIAL_PAYMENTS,
  INITIAL_ACTIVITY,
} from '@/constants/initialData';

const STORAGE_KEYS = {
  USER: 'trc_mobile_user_v1',
  ORDERS: 'trc_mobile_orders_v1',
  CUSTOMERS: 'trc_mobile_customers_v1',
  LEDGER: 'trc_mobile_ledger_v1',
  PAYMENTS: 'trc_mobile_payments_v1',
  ACTIVITY: 'trc_mobile_activity_v1',
  SETTINGS: 'trc_mobile_settings_v1',
  AUTH_SESSION: 'trc_mobile_session_v1',
  LOCKOUT: 'trc_mobile_lockout_v1',
};

interface LedgerContextType {
  // State
  user: UserProfile;
  orders: Order[];
  customers: Customer[];
  customerLedger: CustomerLedgerEntry[];
  payments: Payment[];
  activity: ActivityItem[];
  settings: AppSettings;
  totals: DashboardTotals;
  isReady: boolean;

  // Auth State
  isAuthenticated: boolean;
  pinAttempts: number;
  lockUntil: number;
  loginWithPin: (pin: string) => { success: boolean; error?: string; remainingAttempts?: number };
  logout: () => void;
  updateProfile: (name: string, mobile: string, email: string) => Promise<void>;
  changePin: (oldPin: string, newPin: string) => { success: boolean; error?: string };

  // Ledger Actions
  addOrder: (orderData: {
    kind: 'personal' | 'agent';
    deliveryNumber: string;
    deliveryMethods: ('bkash' | 'nagad' | 'rocket' | 'upay' | 'bank')[];
    amount: number;
    customerId: string;
    customerName: string;
    customerMobile: string;
    riyalReceived: number;
    riyalDue: number;
    riyalDescription: string;
    description: string;
    emergency: boolean;
  }) => Promise<Order>;

  confirmDelivery: (params: {
    orderId: string;
    last4?: string;
    proof?: string | null;
    deliveryDescription?: string;
  }) => Promise<boolean>;

  addPayment: (params: {
    amount: number;
    method: string;
    description?: string;
    proof?: string | null;
  }) => Promise<Payment>;

  settleRiyal: (ledgerId: string, amount: number) => Promise<boolean>;

  addCustomer: (name: string, mobile: string) => Promise<Customer>;

  updateExchangeRate: (rate: number) => Promise<void>;

  clearActivity: () => Promise<void>;

  resetAllData: (email: string, username: string, pin: string) => { success: boolean; error?: string };
}

const LedgerContext = createContext<LedgerContextType | null>(null);

export function LedgerProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinAttempts, setPinAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState(0);

  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [customerLedger, setCustomerLedger] = useState<CustomerLedgerEntry[]>(INITIAL_LEDGER);
  const [payments, setPayments] = useState<Payment[]>(INITIAL_PAYMENTS);
  const [activity, setActivity] = useState<ActivityItem[]>(INITIAL_ACTIVITY);
  const [settings, setSettings] = useState<AppSettings>({ exchangeRate: 32 });

  // Load from AsyncStorage on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [
          savedUser,
          savedOrders,
          savedCustomers,
          savedLedger,
          savedPayments,
          savedActivity,
          savedSettings,
          savedSession,
          savedLock,
        ] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.USER),
          AsyncStorage.getItem(STORAGE_KEYS.ORDERS),
          AsyncStorage.getItem(STORAGE_KEYS.CUSTOMERS),
          AsyncStorage.getItem(STORAGE_KEYS.LEDGER),
          AsyncStorage.getItem(STORAGE_KEYS.PAYMENTS),
          AsyncStorage.getItem(STORAGE_KEYS.ACTIVITY),
          AsyncStorage.getItem(STORAGE_KEYS.SETTINGS),
          AsyncStorage.getItem(STORAGE_KEYS.AUTH_SESSION),
          AsyncStorage.getItem(STORAGE_KEYS.LOCKOUT),
        ]);

        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedOrders) setOrders(JSON.parse(savedOrders));
        if (savedCustomers) setCustomers(JSON.parse(savedCustomers));
        if (savedLedger) setCustomerLedger(JSON.parse(savedLedger));
        if (savedPayments) setPayments(JSON.parse(savedPayments));
        if (savedActivity) setActivity(JSON.parse(savedActivity));
        if (savedSettings) setSettings(JSON.parse(savedSettings));

        if (savedSession === 'true') {
          setIsAuthenticated(true);
        }

        if (savedLock) {
          const { lockUntilTime, attempts } = JSON.parse(savedLock);
          if (lockUntilTime && Date.now() < lockUntilTime) {
            setLockUntil(lockUntilTime);
            setPinAttempts(attempts || 0);
          }
        }
      } catch (e) {
        console.error('Failed to load ledger data:', e);
      } finally {
        setIsReady(true);
      }
    }
    loadData();
  }, []);

  // Compute Totals
  const totals: DashboardTotals = useMemo(() => {
    const totalOrders = orders.length;
    const deliveredOrders = orders.filter((o) => o.status === 'delivered');
    const totalDeliveries = deliveredOrders.length;
    const newOrders = orders.filter((o) => o.status === 'new');
    const totalOrderAmt = orders.reduce((acc, o) => acc + Number(o.amount || 0), 0);
    const totalDeliveryAmt = deliveredOrders.reduce((acc, o) => acc + Number(o.amount || 0), 0);
    const newOrderAmt = newOrders.reduce((acc, o) => acc + Number(o.amount || 0), 0);
    const totalPaid = payments.reduce((acc, p) => acc + Number(p.amount || 0), 0);
    const totalDue = Math.max(0, totalDeliveryAmt - totalPaid);

    const todayStr = new Date().toDateString();
    const todayNewOrders = orders.filter(
      (o) => o.status === 'new' && new Date(o.createdAt).toDateString() === todayStr
    ).length;

    const riyalReceived = customerLedger.reduce((acc, x) => acc + Number(x.received || 0), 0);
    const riyalDue = customerLedger.reduce(
      (acc, x) => acc + Math.max(0, Number(x.expected || 0) - Number(x.received || 0)),
      0
    );

    const rate = Number(settings.exchangeRate) || 32;
    const riyalValue = riyalReceived * rate;
    const profitLoss = riyalValue - totalDeliveryAmt;
    const allRecordsCount = totalOrders + totalDeliveries + payments.length;

    return {
      totalOrders,
      totalDeliveries,
      newOrdersCount: newOrders.length,
      totalOrderAmt,
      totalDeliveryAmt,
      newOrderAmt,
      totalPaid,
      totalDue,
      riyalReceived,
      riyalDue,
      todayNewOrders,
      exchangeRate: rate,
      riyalValue,
      profitLoss,
      allRecordsCount,
    };
  }, [orders, payments, customerLedger, settings]);

  // Auth: Login with PIN
  const loginWithPin = (enteredPin: string) => {
    if (lockUntil && Date.now() < lockUntil) {
      const waitSec = Math.ceil((lockUntil - Date.now()) / 1000);
      return { success: false, error: `Account locked. Please wait ${waitSec}s.` };
    }

    if (enteredPin === user.pin) {
      setIsAuthenticated(true);
      setPinAttempts(0);
      setLockUntil(0);
      AsyncStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'true');
      AsyncStorage.removeItem(STORAGE_KEYS.LOCKOUT);
      return { success: true };
    }

    const nextAttempts = pinAttempts + 1;
    setPinAttempts(nextAttempts);

    if (nextAttempts >= 3) {
      const lockoutTime = Date.now() + 60000;
      setLockUntil(lockoutTime);
      AsyncStorage.setItem(
        STORAGE_KEYS.LOCKOUT,
        JSON.stringify({ lockUntilTime: lockoutTime, attempts: nextAttempts })
      );
      return { success: false, error: 'Too many incorrect attempts. Locked for 60s.' };
    }

    const remaining = 3 - nextAttempts;
    return {
      success: false,
      error: `Incorrect PIN (${remaining} attempt${remaining === 1 ? '' : 's'} remaining)`,
      remainingAttempts: remaining,
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    AsyncStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
  };

  const updateProfile = async (name: string, mobile: string, email: string) => {
    const updated = { ...user, name, mobile, email };
    setUser(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
  };

  const changePin = (oldPin: string, newPin: string) => {
    if (oldPin !== user.pin) {
      return { success: false, error: 'Current PIN is incorrect.' };
    }
    if (!/^\d{4}$/.test(newPin)) {
      return { success: false, error: 'New PIN must be exactly 4 digits.' };
    }
    const updated = { ...user, pin: newPin };
    setUser(updated);
    AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
    return { success: true };
  };

  // Add Order
  const addOrder = async (orderData: {
    kind: 'personal' | 'agent';
    deliveryNumber: string;
    deliveryMethods: ('bkash' | 'nagad' | 'rocket' | 'upay' | 'bank')[];
    amount: number;
    customerId: string;
    customerName: string;
    customerMobile: string;
    riyalReceived: number;
    riyalDue: number;
    riyalDescription: string;
    description: string;
    emergency: boolean;
  }) => {
    const nextSerial = orders.length > 0 ? Math.max(...orders.map((o) => o.serial)) + 1 : 1;
    const orderId = 'ord_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6);
    const riyalExpected = Number(orderData.riyalReceived || 0) + Number(orderData.riyalDue || 0);

    const newOrder: Order = {
      id: orderId,
      serial: nextSerial,
      kind: orderData.kind,
      amount: Number(orderData.amount),
      customerId: orderData.customerId,
      customerName: orderData.customerName,
      customerMobile: orderData.customerMobile,
      deliveryMethods: orderData.deliveryMethods,
      recipientNumber: orderData.deliveryNumber,
      description: orderData.description,
      emergency: orderData.emergency,
      riyal: {
        expected: riyalExpected,
        received: Number(orderData.riyalReceived || 0),
        description: orderData.riyalDescription,
      },
      status: 'new',
      createdAt: new Date().toISOString(),
      createdBy: user.username,
      deliveredAt: null,
      deliveredBy: null,
      deliveryLast4: null,
      deliveryProof: null,
      deliveryDescription: null,
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    await AsyncStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updatedOrders));

    if (riyalExpected > 0) {
      const newLedgerEntry: CustomerLedgerEntry = {
        id: 'led_' + Date.now().toString(36),
        customerId: orderData.customerId,
        orderId: orderId,
        expected: riyalExpected,
        received: Number(orderData.riyalReceived || 0),
        description: orderData.riyalDescription,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedLedger = [newLedgerEntry, ...customerLedger];
      setCustomerLedger(updatedLedger);
      await AsyncStorage.setItem(STORAGE_KEYS.LEDGER, JSON.stringify(updatedLedger));
    }

    // Activity
    const actText = `New order TR-${String(nextSerial).padStart(4, '0')} added — ৳${Number(orderData.amount).toLocaleString()}`;
    const newAct: ActivityItem = {
      id: 'act_' + Date.now(),
      text: actText,
      icon: 'order',
      createdAt: new Date().toISOString(),
    };
    const updatedActivity = [newAct, ...activity].slice(0, 100);
    setActivity(updatedActivity);
    await AsyncStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(updatedActivity));

    return newOrder;
  };

  // Confirm Delivery
  const confirmDelivery = async ({
    orderId,
    last4,
    proof,
    deliveryDescription,
  }: {
    orderId: string;
    last4?: string;
    proof?: string | null;
    deliveryDescription?: string;
  }) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return false;

    const nowIso = new Date().toISOString();
    const updatedOrders = orders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            status: 'delivered' as const,
            deliveredAt: nowIso,
            deliveredBy: user.username,
            deliveryLast4: last4 || null,
            deliveryProof: proof || null,
            deliveryDescription: deliveryDescription || null,
          }
        : o
    );

    setOrders(updatedOrders);
    await AsyncStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updatedOrders));

    const actText = `Order TR-${String(targetOrder.serial).padStart(4, '0')} delivered — ৳${targetOrder.amount.toLocaleString()}`;
    const newAct: ActivityItem = {
      id: 'act_' + Date.now(),
      text: actText,
      icon: 'delivery',
      createdAt: nowIso,
    };
    const updatedActivity = [newAct, ...activity].slice(0, 100);
    setActivity(updatedActivity);
    await AsyncStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(updatedActivity));

    return true;
  };

  // Add Payment
  const addPayment = async ({
    amount,
    method,
    description = '',
    proof = null,
  }: {
    amount: number;
    method: string;
    description?: string;
    proof?: string | null;
  }) => {
    const newPay: Payment = {
      id: 'pay_' + Date.now().toString(36),
      amount: Number(amount),
      method,
      description,
      proof,
      date: new Date().toISOString(),
      addedBy: user.username,
    };

    const updatedPayments = [newPay, ...payments];
    setPayments(updatedPayments);
    await AsyncStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(updatedPayments));

    const actText = `Payment made — ৳${Number(amount).toLocaleString()} via ${method}`;
    const newAct: ActivityItem = {
      id: 'act_' + Date.now(),
      text: actText,
      icon: 'coin',
      createdAt: new Date().toISOString(),
    };
    const updatedActivity = [newAct, ...activity].slice(0, 100);
    setActivity(updatedActivity);
    await AsyncStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(updatedActivity));

    return newPay;
  };

  // Settle Riyal
  const settleRiyal = async (ledgerId: string, amount: number) => {
    const entry = customerLedger.find((l) => l.id === ledgerId);
    if (!entry) return false;

    const newReceived = Number(entry.received || 0) + Number(amount);
    const updatedLedger = customerLedger.map((l) =>
      l.id === ledgerId
        ? {
            ...l,
            received: newReceived,
            updatedAt: new Date().toISOString(),
          }
        : l
    );
    setCustomerLedger(updatedLedger);
    await AsyncStorage.setItem(STORAGE_KEYS.LEDGER, JSON.stringify(updatedLedger));

    // Update corresponding order
    if (entry.orderId) {
      const updatedOrders = orders.map((o) =>
        o.id === entry.orderId
          ? {
              ...o,
              riyal: { ...o.riyal, received: newReceived },
            }
          : o
      );
      setOrders(updatedOrders);
      await AsyncStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updatedOrders));
    }

    const actText = `Riyal received ${amount} SAR for customer ledger`;
    const newAct: ActivityItem = {
      id: 'act_' + Date.now(),
      text: actText,
      icon: 'riyal',
      createdAt: new Date().toISOString(),
    };
    const updatedActivity = [newAct, ...activity].slice(0, 100);
    setActivity(updatedActivity);
    await AsyncStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(updatedActivity));

    return true;
  };

  // Add Customer
  const addCustomer = async (name: string, mobile: string) => {
    const existing = customers.find((c) => c.mobile === mobile);
    if (existing) {
      return existing;
    }
    const newCust: Customer = {
      id: 'c_' + Date.now().toString(36),
      name,
      mobile,
      createdAt: new Date().toISOString(),
    };
    const updated = [newCust, ...customers];
    setCustomers(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(updated));
    return newCust;
  };

  // Update Exchange Rate
  const updateExchangeRate = async (rate: number) => {
    const updated = { ...settings, exchangeRate: rate };
    setSettings(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  };

  // Clear Activity
  const clearActivity = async () => {
    setActivity([]);
    await AsyncStorage.removeItem(STORAGE_KEYS.ACTIVITY);
  };

  // Reset All Data
  const resetAllData = (email: string, username: string, pin: string) => {
    if (email.trim().toLowerCase() !== user.email.toLowerCase()) {
      return { success: false, error: 'Email does not match profile email.' };
    }
    if (username.trim() !== user.username) {
      return { success: false, error: 'Username is incorrect.' };
    }
    if (pin.trim() !== user.pin) {
      return { success: false, error: 'PIN is incorrect.' };
    }

    setOrders([]);
    setCustomerLedger([]);
    setPayments([]);
    setCustomers([]);
    setActivity([
      {
        id: 'act_' + Date.now(),
        text: 'Full ledger data reset completed',
        icon: 'restore',
        createdAt: new Date().toISOString(),
      },
    ]);

    AsyncStorage.removeItem(STORAGE_KEYS.ORDERS);
    AsyncStorage.removeItem(STORAGE_KEYS.LEDGER);
    AsyncStorage.removeItem(STORAGE_KEYS.PAYMENTS);
    AsyncStorage.removeItem(STORAGE_KEYS.CUSTOMERS);
    AsyncStorage.removeItem(STORAGE_KEYS.ACTIVITY);

    return { success: true };
  };

  return (
    <LedgerContext.Provider
      value={{
        user,
        orders,
        customers,
        customerLedger,
        payments,
        activity,
        settings,
        totals,
        isReady,
        isAuthenticated,
        pinAttempts,
        lockUntil,
        loginWithPin,
        logout,
        updateProfile,
        changePin,
        addOrder,
        confirmDelivery,
        addPayment,
        settleRiyal,
        addCustomer,
        updateExchangeRate,
        clearActivity,
        resetAllData,
      }}>
      {children}
    </LedgerContext.Provider>
  );
}

export function useLedger() {
  const context = useContext(LedgerContext);
  if (!context) {
    throw new Error('useLedger must be used within a LedgerProvider');
  }
  return context;
}
