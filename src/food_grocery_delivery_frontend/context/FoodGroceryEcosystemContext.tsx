import React, { createContext, useContext, useState } from 'react';

export type EcosystemActorRole = 'customer' | 'vendor' | 'driver' | 'system_flow';

export type DeliveryMode = 'food' | 'grocery';

export type SubstitutionRule = 'match_brand' | 'organic_upgrade' | 'refund' | 'contact_me';

export type OrderLifecycleStage =
  | 'order_confirmed'
  | 'kitchen_preparing'
  | 'ready_for_pickup'
  | 'driver_picked_up'
  | 'courier_nearby'
  | 'delivered';

export interface CatalogModifierGroup {
  id: string;
  name: string;
  required: boolean;
  options: { id: string; label: string; priceDelta: number }[];
}

export interface CatalogItem {
  id: string;
  vendorId: string;
  vendorName: string;
  mode: DeliveryMode;
  category: string;
  name: string;
  description: string;
  price: number;
  unitLabel: string;
  caloriesOrWeight: string;
  prepTimeMins: number;
  inStock: boolean; // Vendor 86-ing toggle updates this in real time
  badge?: string;
  accentGradient: string;
  modifiers?: CatalogModifierGroup[];
}

export interface CartOrderEntry {
  id: string;
  item: CatalogItem;
  quantity: number;
  selectedModifiers: string[];
  specialInstructions: string;
  substitutionRule: SubstitutionRule;
  unitTotal: number;
}

export interface KdsTicketOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerUnit: string;
  dropoffNote: string;
  mode: DeliveryMode;
  stage: 'new' | 'preparing' | 'ready';
  remainingMins: number;
  courierName: string;
  courierRating: number;
  courierVehicle: string;
  courierEtaToStoreMins: number;
  items: {
    name: string;
    qty: number;
    tags: string[];
    checkedByDriver: boolean;
  }[];
  payoutUsd: number;
  distanceMiles: number;
  tipPercent: number;
  proofOfDeliveryPhotoCaptured: boolean;
  proofTimestamp?: string;
}

export interface LifecycleSocketEvent {
  id: string;
  timestamp: string;
  actor: 'CUSTOMER_APP' | 'VENDOR_KDS' | 'COURIER_HUD' | 'DISPATCH_ENGINE';
  eventType: string;
  payloadSummary: string;
  pushNotificationText: string;
}

export const INITIAL_CATALOG_ITEMS: CatalogItem[] = [
  // Restaurant Food Mode Items
  {
    id: 'food_1',
    vendorId: 'v_smash',
    vendorName: 'Smash & Sear Craft Kitchen',
    mode: 'food',
    category: 'Burgers & Grill',
    name: 'Double Truffle Wagyu Smashburger',
    description:
      'Two 4oz caramelized Wagyu patties, aged Gruyère, black truffle aioli, charred shallots on toasted brioche.',
    price: 16.5,
    unitLabel: 'Single Entrée',
    caloriesOrWeight: '780 kcal',
    prepTimeMins: 12,
    inStock: true,
    badge: 'Top Rated · 4.9★',
    accentGradient: 'from-amber-500/25 via-orange-500/15 to-rose-500/20',
    modifiers: [
      {
        id: 'mod_temp',
        name: 'Patty Sear & Temperature',
        required: true,
        options: [
          { id: 'med_well', label: 'Crispy Lace Smash (Medium-Well)', priceDelta: 0 },
          { id: 'med', label: 'Juicy Pink Center (Medium)', priceDelta: 0 },
          { id: 'well', label: 'Extra Charred Well-Done', priceDelta: 0 },
        ],
      },
      {
        id: 'mod_toppings',
        name: 'Add-On Modifiers & Sides',
        required: false,
        options: [
          { id: 'bacon', label: 'Thick-Cut Smoked Applewood Bacon', priceDelta: 3.0 },
          { id: 'no_onions', label: 'NO ONIONS / Shallots (Kitchen Alert)', priceDelta: 0 },
          { id: 'truffle_fries', label: 'Side of Parm-Truffle Shoestring Fries', priceDelta: 4.5 },
        ],
      },
    ],
  },
  {
    id: 'food_2',
    vendorId: 'v_smash',
    vendorName: 'Smash & Sear Craft Kitchen',
    mode: 'food',
    category: 'Wood-Fired Bowls',
    name: 'Charred Miso Glazed Salmon Donburi',
    description:
      'Wild king salmon belly, heirloom sushi rice, pickled ginger, crispy lotus root, soft onsen egg.',
    price: 19.0,
    unitLabel: 'Bowl',
    caloriesOrWeight: '640 kcal',
    prepTimeMins: 14,
    inStock: true,
    badge: 'High Protein',
    accentGradient: 'from-rose-500/25 via-orange-500/15 to-amber-500/20',
    modifiers: [
      {
        id: 'mod_rice',
        name: 'Base Selection',
        required: true,
        options: [
          { id: 'sushi_rice', label: 'Seasoned Koshihikari Sushi Rice', priceDelta: 0 },
          { id: 'greens', label: 'Half Baby Kale & Quinoa Base', priceDelta: 1.5 },
        ],
      },
    ],
  },
  {
    id: 'food_3',
    vendorId: 'v_smash',
    vendorName: 'Smash & Sear Craft Kitchen',
    mode: 'food',
    category: 'Artisan Pizza',
    name: 'Hot Honey & Calabrian Soppressata Pie',
    description:
      '72-hour cold-fermented sourdough crust, San Marzano DOP, fior di latte, wildflower chili honey.',
    price: 21.0,
    unitLabel: '12" Wood-Fired',
    caloriesOrWeight: '890 kcal',
    prepTimeMins: 15,
    inStock: true,
    badge: 'Chef Special',
    accentGradient: 'from-red-500/25 via-orange-500/15 to-yellow-500/20',
  },

  // Fresh Grocery Mode Items
  {
    id: 'groc_1',
    vendorId: 'v_greenmarket',
    vendorName: 'GreenCrate Organic Market',
    mode: 'grocery',
    category: 'Organic Produce',
    name: 'Hass Avocados (4-Pack Bag · Ripe Tonight)',
    description:
      'Hand-selected California organic Hass avocados, pressure-checked for immediate slicing.',
    price: 6.99,
    unitLabel: '4 ct Bag',
    caloriesOrWeight: '24 oz',
    prepTimeMins: 4,
    inStock: true,
    badge: 'USDA Organic',
    accentGradient: 'from-emerald-500/25 via-teal-500/15 to-lime-500/20',
  },
  {
    id: 'groc_2',
    vendorId: 'v_greenmarket',
    vendorName: 'GreenCrate Organic Market',
    mode: 'grocery',
    category: 'Dairy & Eggs',
    name: 'Pasture-Raised Heirloom Brown Eggs',
    description:
      'Certified humane, omega-3 rich deep amber yolks from small family farms.',
    price: 7.49,
    unitLabel: '12 Large Eggs',
    caloriesOrWeight: '24 oz Carton',
    prepTimeMins: 3,
    inStock: true,
    badge: 'Farm Direct',
    accentGradient: 'from-amber-500/25 via-yellow-500/15 to-emerald-500/20',
  },
  {
    id: 'groc_3',
    vendorId: 'v_greenmarket',
    vendorName: 'GreenCrate Organic Market',
    mode: 'grocery',
    category: 'Artisan Bakery',
    name: 'Tartine-Style Country Sourdough Boule',
    description:
      'Baked fresh at 5:00 AM daily with organic stone-milled wheat and natural levain starter.',
    price: 8.5,
    unitLabel: '1 Whole Loaf',
    caloriesOrWeight: '750g',
    prepTimeMins: 3,
    inStock: true,
    badge: 'Baked 5 AM',
    accentGradient: 'from-orange-500/25 via-amber-500/15 to-stone-500/20',
  },
  {
    id: 'groc_4',
    vendorId: 'v_greenmarket',
    vendorName: 'GreenCrate Organic Market',
    mode: 'grocery',
    category: 'Cold-Pressed & Milk',
    name: 'Barista Edition Organic Oat Milk',
    description:
      'Unsweetened, micro-foaming organic oat milk with zero seed oils or gums.',
    price: 5.29,
    unitLabel: '32 fl oz Carton',
    caloriesOrWeight: '946 mL',
    prepTimeMins: 2,
    inStock: false, // Pre-marked 86'd to demonstrate substitution & stock toggle
    badge: '86’d / Low Stock',
    accentGradient: 'from-sky-500/25 via-cyan-500/15 to-emerald-500/20',
  },
];

export const INITIAL_KDS_ORDERS: KdsTicketOrder[] = [
  {
    id: 'ord_4092',
    orderNumber: '#4092',
    customerName: 'Aria Montgomery',
    customerUnit: '742 Evergreen Terrace · Apt 4B (Gate Code #1942)',
    dropoffNote: 'Leave at front door on the woven mat, ring smart doorbell once.',
    mode: 'food',
    stage: 'preparing',
    remainingMins: 8,
    courierName: 'Mateo Silva',
    courierRating: 4.9,
    courierVehicle: 'Honda PCX Electric Scooter · Plate 8X-992',
    courierEtaToStoreMins: 2,
    payoutUsd: 14.85,
    distanceMiles: 1.8,
    tipPercent: 18,
    proofOfDeliveryPhotoCaptured: false,
    items: [
      {
        name: 'Double Truffle Wagyu Smashburger',
        qty: 2,
        tags: ['NO ONIONS', 'Crispy Lace Smash', '+ Applewood Bacon'],
        checkedByDriver: true,
      },
      {
        name: 'Parm-Truffle Shoestring Fries',
        qty: 1,
        tags: ['Extra Rosemary Salt', 'Truffle Aioli Cup'],
        checkedByDriver: true,
      },
      {
        name: 'Charred Miso Glazed Salmon Donburi',
        qty: 1,
        tags: ['Half Kale & Quinoa Base', 'Sauce on Side'],
        checkedByDriver: false,
      },
    ],
  },
  {
    id: 'ord_4095',
    orderNumber: '#4095',
    customerName: 'Devon Sterling',
    customerUnit: '1200 Oak Street · Penthouse 12A',
    dropoffNote: 'Hand directly to concierge desk in North Lobby.',
    mode: 'grocery',
    stage: 'new',
    remainingMins: 14,
    courierName: 'Elena Rostova',
    courierRating: 4.95,
    courierVehicle: 'Prius Prime Hybrid · Insulated Cold Bags',
    courierEtaToStoreMins: 6,
    payoutUsd: 18.4,
    distanceMiles: 2.4,
    tipPercent: 20,
    proofOfDeliveryPhotoCaptured: false,
    items: [
      {
        name: 'Hass Avocados (4-Pack Bag · Ripe Tonight)',
        qty: 2,
        tags: ['SUB RULE: Replace with Organic Brand'],
        checkedByDriver: false,
      },
      {
        name: 'Pasture-Raised Heirloom Brown Eggs (12 ct)',
        qty: 1,
        tags: ['SUB RULE: Contact Me via Masked Chat'],
        checkedByDriver: false,
      },
      {
        name: 'Tartine-Style Country Sourdough Boule',
        qty: 1,
        tags: ['Sliced Thick (1/2 inch)'],
        checkedByDriver: false,
      },
    ],
  },
  {
    id: 'ord_4088',
    orderNumber: '#4088',
    customerName: 'Marcus Vance',
    customerUnit: '450 Mission St · Suite 900',
    dropoffNote: 'Leave at reception table — contactless drop-off photo required.',
    mode: 'food',
    stage: 'ready',
    remainingMins: 0,
    courierName: 'Mateo Silva',
    courierRating: 4.9,
    courierVehicle: 'Honda PCX Electric Scooter · Plate 8X-992',
    courierEtaToStoreMins: 0,
    payoutUsd: 11.2,
    distanceMiles: 1.1,
    tipPercent: 15,
    proofOfDeliveryPhotoCaptured: false,
    items: [
      {
        name: 'Hot Honey & Calabrian Soppressata Pie (12")',
        qty: 1,
        tags: ['Well Done Crust', '+ Extra Chili Honey Drizzle'],
        checkedByDriver: true,
      },
    ],
  },
];

export const INITIAL_SOCKET_EVENTS: LifecycleSocketEvent[] = [
  {
    id: 'evt_1',
    timestamp: '18:42:04.120',
    actor: 'CUSTOMER_APP',
    eventType: 'ORDER_CREATED_PAYLOAD',
    payloadSummary: 'Order #4092 · 3 items ($51.00) · Tip 18% · Apple Pay Token Verified',
    pushNotificationText: 'Order Confirmed! Smash & Sear received your order #4092.',
  },
  {
    id: 'evt_2',
    timestamp: '18:42:19.405',
    actor: 'VENDOR_KDS',
    eventType: 'KDS_STAGE_TRANSITION -> PREPARING',
    payloadSummary: 'Prep timer locked at 12m · Fired to Grill Station #2 (NO ONIONS tag)',
    pushNotificationText: 'Kitchen is preparing your Double Truffle Wagyu Smashburger.',
  },
  {
    id: 'evt_3',
    timestamp: '18:46:50.882',
    actor: 'DISPATCH_ENGINE',
    eventType: 'GEOFENCE_COURIER_APPROACHING (2_MIN_TRIGGER)',
    payloadSummary: 'Courier Mateo Silva (4.9★) entered 400m store geofence · Kalman GPS 60Hz',
    pushNotificationText: 'Courier Mateo is 2 mins from the restaurant for hot handoff.',
  },
];

interface FoodGroceryEcosystemContextValue {
  // Actor & Mode
  activeActor: EcosystemActorRole;
  setActiveActor: (role: EcosystemActorRole) => void;
  deliveryMode: DeliveryMode;
  setDeliveryMode: (mode: DeliveryMode) => void;

  // Customer Location & Schedule
  customerAddress: string;
  setCustomerAddress: (addr: string) => void;
  customerUnit: string;
  setCustomerUnit: (unit: string) => void;
  dropoffInstruction: string;
  setDropoffInstruction: (note: string) => void;
  deliveryScheduleMode: 'express' | 'scheduled';
  setDeliveryScheduleMode: (m: 'express' | 'scheduled') => void;
  scheduledSlot: string;
  setScheduledSlot: (slot: string) => void;

  // Catalog & Real-Time 86-ing
  catalog: CatalogItem[];
  toggleItemStock86: (itemId: string) => void;
  updateItemPrice: (itemId: string, newPrice: number) => void;

  // Cart & Substitution Rules
  cart: CartOrderEntry[];
  addToCart: (
    item: CatalogItem,
    qty: number,
    modifiers: string[],
    instructions: string,
    subRule: SubstitutionRule
  ) => void;
  removeFromCart: (entryId: string) => void;
  tipPercentage: number;
  setTipPercentage: (tip: number) => void;

  // Active Lifecycle & KDS Orders
  kdsOrders: KdsTicketOrder[];
  activeOrderLifecycle: OrderLifecycleStage;
  setActiveOrderLifecycle: (stage: OrderLifecycleStage) => void;
  advanceKdsOrderStage: (orderId: string) => void;
  toggleDriverBagCheck: (orderId: string, itemIdx: number) => void;
  captureProofOfDelivery: (orderId: string) => void;

  // Vendor Busy Mode & Prep Adjuster
  vendorBusyMode: boolean;
  setVendorBusyMode: (busy: boolean) => void;
  extraPrepBufferMins: number;
  setExtraPrepBufferMins: (mins: number) => void;

  // Live Telemetry & Masked Chat
  courierGpsProgress: number; // 0 to 100 smooth Kalman interpolated route progress
  setCourierGpsProgress: (val: number | ((prev: number) => number)) => void;
  maskedChatMessages: { id: string; sender: 'Customer' | 'Courier' | 'Vendor'; text: string; time: string }[];
  sendMaskedMessage: (sender: 'Customer' | 'Courier' | 'Vendor', text: string) => void;
  socketEvents: LifecycleSocketEvent[];
  emitLifecycleEvent: (
    actor: LifecycleSocketEvent['actor'],
    eventType: string,
    payloadSummary: string,
    pushNotificationText: string
  ) => void;
}

const FoodGroceryEcosystemContext = createContext<FoodGroceryEcosystemContextValue | null>(null);

export const FoodGroceryEcosystemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeActor, setActiveActor] = useState<EcosystemActorRole>('customer');
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('food');

  const [customerAddress, setCustomerAddress] = useState('742 Evergreen Terrace, Oak District');
  const [customerUnit, setCustomerUnit] = useState('Apt 4B · Gate Code #1942');
  const [dropoffInstruction, setDropoffInstruction] = useState(
    'Leave at front door on woven mat, ring smart doorbell.'
  );
  const [deliveryScheduleMode, setDeliveryScheduleMode] = useState<'express' | 'scheduled'>(
    'express'
  );
  const [scheduledSlot, setScheduledSlot] = useState('Today · Express (18–24 mins)');

  const [catalog, setCatalog] = useState<CatalogItem[]>(INITIAL_CATALOG_ITEMS);
  const [cart, setCart] = useState<CartOrderEntry[]>([
    {
      id: 'cart_init_1',
      item: INITIAL_CATALOG_ITEMS[0],
      quantity: 2,
      selectedModifiers: ['Crispy Lace Smash (Medium-Well)', 'NO ONIONS / Shallots (Kitchen Alert)'],
      specialInstructions: 'Extra pickles on the side please.',
      substitutionRule: 'match_brand',
      unitTotal: 16.5,
    },
    {
      id: 'cart_init_2',
      item: INITIAL_CATALOG_ITEMS[3],
      quantity: 1,
      selectedModifiers: ['Ripe Tonight Checked'],
      specialInstructions: '',
      substitutionRule: 'organic_upgrade',
      unitTotal: 6.99,
    },
  ]);

  const [tipPercentage, setTipPercentage] = useState<number>(18);
  const [kdsOrders, setKdsOrders] = useState<KdsTicketOrder[]>(INITIAL_KDS_ORDERS);
  const [activeOrderLifecycle, setActiveOrderLifecycle] =
    useState<OrderLifecycleStage>('driver_picked_up');

  const [vendorBusyMode, setVendorBusyMode] = useState<boolean>(false);
  const [extraPrepBufferMins, setExtraPrepBufferMins] = useState<number>(0);

  const [courierGpsProgress, setCourierGpsProgress] = useState<number>(64);
  const [maskedChatMessages, setMaskedChatMessages] = useState<
    { id: string; sender: 'Customer' | 'Courier' | 'Vendor'; text: string; time: string }[]
  >([
    {
      id: 'm1',
      sender: 'Vendor',
      text: 'Order #4092 is sealed with thermal tamper tape (NO ONIONS verified).',
      time: '6:44 PM',
    },
    {
      id: 'm2',
      sender: 'Courier',
      text: 'Picked up your insulated hot bag from Smash & Sear! Gliding down Oak St now.',
      time: '6:47 PM',
    },
  ]);

  const [socketEvents, setSocketEvents] = useState<LifecycleSocketEvent[]>(INITIAL_SOCKET_EVENTS);

  const emitLifecycleEvent = (
    actor: LifecycleSocketEvent['actor'],
    eventType: string,
    payloadSummary: string,
    pushNotificationText: string
  ) => {
    const now = new Date();
    const ts = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;
    setSocketEvents((prev) => [
      {
        id: `evt_${Date.now()}`,
        timestamp: ts,
        actor,
        eventType,
        payloadSummary,
        pushNotificationText,
      },
      ...prev.slice(0, 14),
    ]);
  };

  const toggleItemStock86 = (itemId: string) => {
    setCatalog((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const nextStock = !item.inStock;
        emitLifecycleEvent(
          'VENDOR_KDS',
          nextStock ? 'ITEM_RESTOCKED_SYNC' : 'ITEM_86_OUT_OF_STOCK',
          `${item.name} marked ${nextStock ? 'IN STOCK' : '86 SOLD OUT'} across all customer menus`,
          nextStock
            ? `${item.name} is back in stock!`
            : `${item.name} was marked Sold Out (86'd) by merchant terminal.`
        );
        return { ...item, inStock: nextStock };
      })
    );
  };

  const updateItemPrice = (itemId: string, newPrice: number) => {
    if (Number.isNaN(newPrice) || newPrice <= 0) return;
    setCatalog((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, price: Number(newPrice.toFixed(2)) } : item))
    );
  };

  const addToCart = (
    item: CatalogItem,
    qty: number,
    modifiers: string[],
    instructions: string,
    subRule: SubstitutionRule
  ) => {
    const entry: CartOrderEntry = {
      id: `cart_${Date.now()}`,
      item,
      quantity: qty,
      selectedModifiers: modifiers,
      specialInstructions: instructions,
      substitutionRule: subRule,
      unitTotal: item.price,
    };
    setCart((prev) => [entry, ...prev]);
    emitLifecycleEvent(
      'CUSTOMER_APP',
      'CART_ITEM_CUSTOMIZED',
      `Added ${qty}x ${item.name} · SubRule: ${subRule.toUpperCase()}`,
      `Added ${item.name} to your ${item.mode} basket.`
    );
  };

  const removeFromCart = (entryId: string) => {
    setCart((prev) => prev.filter((c) => c.id !== entryId));
  };

  const advanceKdsOrderStage = (orderId: string) => {
    setKdsOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const nextStage =
          ord.stage === 'new' ? 'preparing' : ord.stage === 'preparing' ? 'ready' : 'ready';
        emitLifecycleEvent(
          'VENDOR_KDS',
          `KDS_ORDER_${nextStage.toUpperCase()}`,
          `Order ${ord.orderNumber} (${ord.customerName}) moved to ${nextStage.toUpperCase()}`,
          nextStage === 'preparing'
            ? `Kitchen started preparing Order ${ord.orderNumber}.`
            : `Order ${ord.orderNumber} is Ready for Courier Pickup at Counter!`
        );
        if (nextStage === 'ready') {
          setActiveOrderLifecycle('ready_for_pickup');
        }
        return { ...ord, stage: nextStage, remainingMins: nextStage === 'ready' ? 0 : 8 };
      })
    );
  };

  const toggleDriverBagCheck = (orderId: string, itemIdx: number) => {
    setKdsOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const updatedItems = ord.items.map((it, idx) =>
          idx === itemIdx ? { ...it, checkedByDriver: !it.checkedByDriver } : it
        );
        return { ...ord, items: updatedItems };
      })
    );
  };

  const captureProofOfDelivery = (orderId: string) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setKdsOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? { ...ord, proofOfDeliveryPhotoCaptured: true, proofTimestamp: nowStr }
          : ord
      )
    );
    setActiveOrderLifecycle('delivered');
    setCourierGpsProgress(100);
    emitLifecycleEvent(
      'COURIER_HUD',
      'PROOF_OF_DELIVERY_UPLOADED',
      `Order #4092 photo verified at door (${nowStr}) · Payout $14.85 released`,
      'Your order has been delivered at your front door! View photo proof.'
    );
  };

  const sendMaskedMessage = (sender: 'Customer' | 'Courier' | 'Vendor', text: string) => {
    if (!text.trim()) return;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMaskedChatMessages((prev) => [
      ...prev,
      { id: `msg_${Date.now()}`, sender, text: text.trim(), time: nowStr },
    ]);
    emitLifecycleEvent(
      sender === 'Customer'
        ? 'CUSTOMER_APP'
        : sender === 'Courier'
        ? 'COURIER_HUD'
        : 'VENDOR_KDS',
      'MASKED_RELAY_SMS_SENT',
      `[${sender} via Twilio Proxy +1-555-0199]: "${text.trim()}"`,
      `New masked message from ${sender}: "${text.trim()}"`
    );
  };

  return (
    <FoodGroceryEcosystemContext.Provider
      value={{
        activeActor,
        setActiveActor,
        deliveryMode,
        setDeliveryMode,
        customerAddress,
        setCustomerAddress,
        customerUnit,
        setCustomerUnit,
        dropoffInstruction,
        setDropoffInstruction,
        deliveryScheduleMode,
        setDeliveryScheduleMode,
        scheduledSlot,
        setScheduledSlot,
        catalog,
        toggleItemStock86,
        updateItemPrice,
        cart,
        addToCart,
        removeFromCart,
        tipPercentage,
        setTipPercentage,
        kdsOrders,
        activeOrderLifecycle,
        setActiveOrderLifecycle,
        advanceKdsOrderStage,
        toggleDriverBagCheck,
        captureProofOfDelivery,
        vendorBusyMode,
        setVendorBusyMode,
        extraPrepBufferMins,
        setExtraPrepBufferMins,
        courierGpsProgress,
        setCourierGpsProgress,
        maskedChatMessages,
        sendMaskedMessage,
        socketEvents,
        emitLifecycleEvent,
      }}
    >
      {children}
    </FoodGroceryEcosystemContext.Provider>
  );
};

export const useFoodGroceryEcosystem = () => {
  const ctx = useContext(FoodGroceryEcosystemContext);
  if (!ctx) {
    throw new Error('useFoodGroceryEcosystem must be used inside FoodGroceryEcosystemProvider');
  }
  return ctx;
};
