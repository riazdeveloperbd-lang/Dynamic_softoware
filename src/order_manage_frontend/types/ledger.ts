export type OrderKind = 'personal' | 'agent';
export type OrderStatus = 'new' | 'delivered';
export type DeliveryMethod = 'bkash' | 'nagad' | 'rocket' | 'upay' | 'bank';

export interface RiyalInfo {
  expected: number;
  received: number;
  description: string;
}

export interface Order {
  id: string;
  serial: number;
  kind: OrderKind;
  amount: number;
  customerId: string;
  customerName: string;
  customerMobile: string;
  deliveryMethods: DeliveryMethod[];
  recipientNumber: string;
  description: string;
  emergency: boolean;
  riyal: RiyalInfo;
  status: OrderStatus;
  createdAt: string;
  createdBy: string;
  deliveredAt: string | null;
  deliveredBy: string | null;
  deliveryLast4: string | null;
  deliveryProof: string | null;
  deliveryDescription: string | null;
}

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  createdAt: string;
}

export interface CustomerLedgerEntry {
  id: string;
  customerId: string;
  orderId: string;
  expected: number;
  received: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  amount: number;
  method: string;
  description: string;
  proof: string | null;
  date: string;
  addedBy: string;
}

export interface ActivityItem {
  id: string;
  text: string;
  icon: 'coin' | 'order' | 'delivery' | 'riyal' | 'restore';
  createdAt: string;
}

export interface AppSettings {
  exchangeRate: number;
}

export interface UserProfile {
  username: string;
  name: string;
  mobile: string;
  email: string;
  pin: string;
  createdAt: string;
}

export interface DashboardTotals {
  totalOrders: number;
  totalDeliveries: number;
  newOrdersCount: number;
  totalOrderAmt: number;
  totalDeliveryAmt: number;
  newOrderAmt: number;
  totalPaid: number;
  totalDue: number;
  riyalReceived: number;
  riyalDue: number;
  todayNewOrders: number;
  exchangeRate: number;
  riyalValue: number;
  profitLoss: number;
  allRecordsCount: number;
}
