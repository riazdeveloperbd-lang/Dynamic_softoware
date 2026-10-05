import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AddressItem,
  CardItem,
  FAQItem,
  INITIAL_ADDRESSES,
  INITIAL_CARDS,
  INITIAL_FAQS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  NotificationItem,
  OrderItem,
  Product,
  ReviewItem,
} from '../../assets';

// Mutable in-memory store for RTK Query dummy API simulation
let dbProducts = [...INITIAL_PRODUCTS];
let dbReviews = [...INITIAL_REVIEWS];
let dbOrders = [...INITIAL_ORDERS];
let dbAddresses = [...INITIAL_ADDRESSES];
let dbCards = [...INITIAL_CARDS];
let dbNotifications = [...INITIAL_NOTIFICATIONS];
let dbFaqs = [...INITIAL_FAQS];

export const dummyApi = createApi({
  reducerPath: 'dummyApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Products', 'Reviews', 'Orders', 'Addresses', 'Cards', 'Notifications', 'FAQs'],
  endpoints: (builder) => ({
    getProducts: builder.query<
      Product[],
      {
        category?: string;
        search?: string;
        sortBy?: 'Relevance' | 'Price: Low - High' | 'Price: High - Low';
        minPrice?: number;
        maxPrice?: number;
        size?: 'All' | 'S' | 'M' | 'L';
      } | void
    >({
      queryFn: (params) => {
        let filtered = [...dbProducts];
        if (params) {
          if (params.category && params.category !== 'All') {
            filtered = filtered.filter(
              (p) => p.category.toLowerCase() === params.category!.toLowerCase()
            );
          }
          if (params.search && params.search.trim()) {
            const q = params.search.trim().toLowerCase();
            filtered = filtered.filter(
              (p) =>
                p.title.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q)
            );
          }
          if (typeof params.minPrice === 'number') {
            filtered = filtered.filter((p) => p.price >= params.minPrice!);
          }
          if (typeof params.maxPrice === 'number') {
            filtered = filtered.filter((p) => p.price <= params.maxPrice!);
          }
          if (params.size && params.size !== 'All') {
            filtered = filtered.filter((p) =>
              p.sizes.includes(params.size as 'S' | 'M' | 'L')
            );
          }
          if (params.sortBy === 'Price: Low - High') {
            filtered.sort((a, b) => a.price - b.price);
          } else if (params.sortBy === 'Price: High - Low') {
            filtered.sort((a, b) => b.price - a.price);
          }
        }
        return { data: filtered };
      },
      providesTags: ['Products'],
    }),
    getProductById: builder.query<Product | undefined, string>({
      queryFn: (id) => {
        const product = dbProducts.find((p) => p.id === id) || dbProducts[0];
        return { data: product };
      },
      providesTags: ['Products'],
    }),
    getReviews: builder.query<ReviewItem[], void>({
      queryFn: () => ({ data: dbReviews }),
      providesTags: ['Reviews'],
    }),
    addReview: builder.mutation<ReviewItem, { orderId?: string; rating: number; comment: string }>({
      queryFn: ({ orderId, rating, comment }) => {
        const newRev: ReviewItem = {
          id: `rev-${Date.now()}`,
          author: 'Cody Fisher',
          rating,
          comment: comment || 'Great quality and fit!',
          date: 'Just now',
        };
        dbReviews = [newRev, ...dbReviews];
        if (orderId) {
          dbOrders = dbOrders.map((o) => (o.id === orderId ? { ...o, rating } : o));
        }
        return { data: newRev };
      },
      invalidatesTags: ['Reviews', 'Orders'],
    }),
    getOrders: builder.query<OrderItem[], void>({
      queryFn: () => ({ data: dbOrders }),
      providesTags: ['Orders'],
    }),
    placeOrder: builder.mutation<OrderItem[], { items: { product: Product; size: 'S' | 'M' | 'L'; quantity: number }[] }>({
      queryFn: ({ items }) => {
        const created: OrderItem[] = items.map((item, idx) => ({
          id: `ord-${Date.now()}-${idx}`,
          productId: item.product.id,
          title: item.product.title,
          size: item.size,
          price: item.product.price * item.quantity,
          image: item.product.image,
          status: 'In Transit',
        }));
        dbOrders = [...created, ...dbOrders];
        return { data: created };
      },
      invalidatesTags: ['Orders'],
    }),
    getAddresses: builder.query<AddressItem[], void>({
      queryFn: () => ({ data: dbAddresses }),
      providesTags: ['Addresses'],
    }),
    addAddress: builder.mutation<AddressItem, { nickname: string; fullAddress: string; isDefault: boolean }>({
      queryFn: ({ nickname, fullAddress, isDefault }) => {
        if (isDefault) {
          dbAddresses = dbAddresses.map((a) => ({ ...a, isDefault: false }));
        }
        const newAddr: AddressItem = {
          id: `addr-${Date.now()}`,
          nickname,
          fullAddress,
          isDefault,
        };
        dbAddresses = [...dbAddresses, newAddr];
        return { data: newAddr };
      },
      invalidatesTags: ['Addresses'],
    }),
    getCards: builder.query<CardItem[], void>({
      queryFn: () => ({ data: dbCards }),
      providesTags: ['Cards'],
    }),
    addCard: builder.mutation<CardItem, { number: string; expiry: string; cvc: string }>({
      queryFn: ({ number, expiry }) => {
        const clean = number.replace(/\D/g, '');
        const last4 = clean.slice(-4) || '2512';
        const newCard: CardItem = {
          id: `card-${Date.now()}`,
          brand: 'VISA',
          last4,
          expiry: expiry || '07/23',
          isDefault: false,
        };
        dbCards = [...dbCards, newCard];
        return { data: newCard };
      },
      invalidatesTags: ['Cards'],
    }),
    getNotifications: builder.query<NotificationItem[], void>({
      queryFn: () => ({ data: dbNotifications }),
      providesTags: ['Notifications'],
    }),
    getFaqs: builder.query<FAQItem[], void>({
      queryFn: () => ({ data: dbFaqs }),
      providesTags: ['FAQs'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetReviewsQuery,
  useAddReviewMutation,
  useGetOrdersQuery,
  usePlaceOrderMutation,
  useGetAddressesQuery,
  useAddAddressMutation,
  useGetCardsQuery,
  useAddCardMutation,
  useGetNotificationsQuery,
  useGetFaqsQuery,
} = dummyApi;
