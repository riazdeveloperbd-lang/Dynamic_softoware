import onboardingModel from './images/onboarding_streetwear_model_1791167538578.jpg';
import navySloganTshirt from './images/product_navy_slogan_tshirt_1791167551962.jpg';
import tealPoloShirt from './images/product_teal_polo_shirt_1791167564380.jpg';
import blackSleevelessTshirt from './images/product_black_sleeveless_tshirt_1791167574621.jpg';
import blackVneckTshirt from './images/product_black_vneck_tshirt_1791167585813.jpg';
import pinkLongsleeveTshirt from './images/product_pink_longsleeve_tshirt_1791167599439.jpg';

export const IMAGES = {
  onboardingModel,
  navySloganTshirt,
  tealPoloShirt,
  blackSleevelessTshirt,
  blackVneckTshirt,
  pinkLongsleeveTshirt,
  white_tshirt: navySloganTshirt,
};

export interface Product {
  id: string;
  title: string;
  price: number;
  discount?: string;
  originalPrice?: number;
  category: 'Tshirts' | 'Jeans' | 'Shoes' | 'Hoodies';
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  sizes: ('S' | 'M' | 'L')[];
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  title: string;
  size: 'S' | 'M' | 'L';
  price: number;
  image: string;
  status: 'Packing' | 'Picked' | 'In Transit' | 'Completed';
  rating?: number;
}

export interface AddressItem {
  id: string;
  nickname: string;
  fullAddress: string;
  isDefault?: boolean;
}

export interface CardItem {
  id: string;
  brand: 'VISA' | 'Mastercard';
  last4: string;
  expiry: string;
  isDefault?: boolean;
}

export interface NotificationItem {
  id: string;
  group: 'Today' | 'Yesterday' | 'June 7, 2023';
  title: string;
  subtitle: string;
  iconType: 'tag' | 'wallet' | 'pin' | 'card' | 'user';
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Account' | 'Service' | 'Payment';
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  time?: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Regular Fit Slogan',
    price: 1190,
    category: 'Tshirts',
    image: IMAGES.navySloganTshirt,
    rating: 4.0,
    reviewsCount: 45,
    description:
      'The name says it all, the right size slightly snugs the body leaving enough room for comfort in the sleeves and waist.',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 'prod-2',
    title: 'Regular Fit Polo',
    price: 1100,
    discount: '-52%',
    originalPrice: 2290,
    category: 'Tshirts',
    image: IMAGES.tealPoloShirt,
    rating: 4.5,
    reviewsCount: 38,
    description:
      'Breathable piqué cotton polo shirt crafted for everyday refinement with a structured collar and clean silhouette.',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 'prod-3',
    title: 'Regular Fit Black',
    price: 1690,
    category: 'Tshirts',
    image: IMAGES.blackSleevelessTshirt,
    rating: 4.2,
    reviewsCount: 29,
    description:
      'Minimalist matte black sleeveless cotton tee engineered with reinforced seams and relaxed shoulder mobility.',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 'prod-4',
    title: 'Regular Fit V-Neck',
    price: 1290,
    category: 'Tshirts',
    image: IMAGES.blackVneckTshirt,
    rating: 4.6,
    reviewsCount: 52,
    description:
      'Contrast-trimmed V-neck t-shirt featuring crisp white striped ribbing at the neckline and cuffs for sharp casual wear.',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 'prod-5',
    title: 'Regular Fit Pink',
    price: 1341,
    category: 'Hoodies',
    image: IMAGES.pinkLongsleeveTshirt,
    rating: 3.5,
    reviewsCount: 19,
    description:
      'Soft heavyweight cotton long-sleeve pullover in salmon pink with subtle graphic detailing along the chest and sleeve.',
    sizes: ['M', 'L'],
  },
  {
    id: 'prod-6',
    title: 'Regular Fit Crew',
    price: 1190,
    category: 'Jeans',
    image: IMAGES.navySloganTshirt,
    rating: 4.1,
    reviewsCount: 24,
    description:
      'Classic everyday denim-paired staple cut from organic combed cotton with a balanced drape and durable ribbed collar.',
    sizes: ['S', 'L'],
  },
  {
    id: 'prod-7',
    title: 'Selvedge Tapered Jeans',
    price: 1540,
    discount: '-20%',
    originalPrice: 1920,
    category: 'Jeans',
    image: IMAGES.blackSleevelessTshirt,
    rating: 4.8,
    reviewsCount: 64,
    description:
      'Japanese 14oz raw selvedge denim tailored with a modern tapered leg and custom matte hardware.',
    sizes: ['M', 'L'],
  },
  {
    id: 'prod-8',
    title: 'Atelier Leather Low-Top',
    price: 1850,
    category: 'Shoes',
    image: IMAGES.blackVneckTshirt,
    rating: 4.9,
    reviewsCount: 82,
    description:
      'Hand-stitched Italian calfskin minimalist low-top sneakers with tonal rubber cupsole and memory foam footbed.',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 'prod-9',
    title: 'Monolith Suede Runner',
    price: 1420,
    discount: '-15%',
    originalPrice: 1670,
    category: 'Shoes',
    image: IMAGES.tealPoloShirt,
    rating: 4.7,
    reviewsCount: 41,
    description:
      'Sculpted sole athletic runner combining brushed suede overlays with breathable technical mesh.',
    sizes: ['S', 'M'],
  },
  {
    id: 'prod-10',
    title: 'Heavyweight Boxy Hoodie',
    price: 1620,
    category: 'Hoodies',
    image: IMAGES.onboardingModel,
    rating: 4.9,
    reviewsCount: 93,
    description:
      '480GSM loopback French terry hoodie engineered with drop shoulders and a double-lined structured hood.',
    sizes: ['S', 'M', 'L'],
  },
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Wade Warren',
    rating: 5,
    comment: 'The item is very good, my son likes it very much and plays every day.',
    date: '6 days ago',
  },
  {
    id: 'rev-2',
    author: 'Guy Hawkins',
    rating: 4,
    comment: 'The seller is very fast in sending packet, I just bought it and the item arrived in just 1 day!',
    date: '1 week ago',
  },
  {
    id: 'rev-3',
    author: 'Robert Fox',
    rating: 4,
    comment: 'I just bought it and the stuff is really good! I highly recommend it!',
    date: '2 weeks ago',
  },
];

export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord-1',
    productId: 'prod-1',
    title: 'Regular Fit Slogan',
    size: 'M',
    price: 1190,
    image: IMAGES.navySloganTshirt,
    status: 'In Transit',
  },
  {
    id: 'ord-2',
    productId: 'prod-2',
    title: 'Regular Fit Polo',
    size: 'L',
    price: 1100,
    image: IMAGES.tealPoloShirt,
    status: 'Picked',
  },
  {
    id: 'ord-3',
    productId: 'prod-3',
    title: 'Regular Fit Black',
    size: 'L',
    price: 1690,
    image: IMAGES.blackSleevelessTshirt,
    status: 'In Transit',
  },
  {
    id: 'ord-4',
    productId: 'prod-4',
    title: 'Regular Fit V-Neck',
    size: 'S',
    price: 1290,
    image: IMAGES.blackVneckTshirt,
    status: 'Packing',
  },
  {
    id: 'ord-5',
    productId: 'prod-5',
    title: 'Regular Fit Pink',
    size: 'M',
    price: 1341,
    image: IMAGES.pinkLongsleeveTshirt,
    status: 'Picked',
  },
  {
    id: 'ord-6',
    productId: 'prod-1',
    title: 'Regular Fit Slogan',
    size: 'M',
    price: 1190,
    image: IMAGES.navySloganTshirt,
    status: 'Completed',
  },
  {
    id: 'ord-7',
    productId: 'prod-2',
    title: 'Regular Fit Polo',
    size: 'L',
    price: 1100,
    image: IMAGES.tealPoloShirt,
    status: 'Completed',
    rating: 4.5,
  },
  {
    id: 'ord-8',
    productId: 'prod-3',
    title: 'Regular Fit Black',
    size: 'L',
    price: 1690,
    image: IMAGES.blackSleevelessTshirt,
    status: 'Completed',
  },
  {
    id: 'ord-9',
    productId: 'prod-4',
    title: 'Regular Fit V-Neck',
    size: 'S',
    price: 1290,
    image: IMAGES.blackVneckTshirt,
    status: 'Completed',
  },
  {
    id: 'ord-10',
    productId: 'prod-5',
    title: 'Regular Fit Pink',
    size: 'M',
    price: 1341,
    image: IMAGES.pinkLongsleeveTshirt,
    status: 'Completed',
    rating: 3.5,
  },
];

export const INITIAL_ADDRESSES: AddressItem[] = [
  {
    id: 'addr-1',
    nickname: 'Home',
    fullAddress: '925 S Chugach St #APT 10, Alaska 99645',
    isDefault: true,
  },
  {
    id: 'addr-2',
    nickname: 'Office',
    fullAddress: '2438 6th Ave, Ketchikan, Alaska 99901',
  },
  {
    id: 'addr-3',
    nickname: 'Apartment',
    fullAddress: '2551 Vista Dr #B301, Juneau, Alaska 99801',
  },
  {
    id: 'addr-4',
    nickname: "Parent's House",
    fullAddress: '4821 Ridge Top Cir, Anchorage, Alaska 99508',
  },
];

export const INITIAL_CARDS: CardItem[] = [
  {
    id: 'card-1',
    brand: 'VISA',
    last4: '2512',
    expiry: '07/23',
    isDefault: true,
  },
  {
    id: 'card-2',
    brand: 'Mastercard',
    last4: '5421',
    expiry: '11/25',
  },
  {
    id: 'card-3',
    brand: 'VISA',
    last4: '2512',
    expiry: '09/26',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    group: 'Today',
    title: '30% Special Discount!',
    subtitle: 'Special promotion only valid today.',
    iconType: 'tag',
  },
  {
    id: 'notif-2',
    group: 'Yesterday',
    title: 'Top Up E-wallet Successfully!',
    subtitle: 'You have top up your e-wallet.',
    iconType: 'wallet',
  },
  {
    id: 'notif-3',
    group: 'Yesterday',
    title: 'New Service Available!',
    subtitle: 'Now you can track order in real-time.',
    iconType: 'pin',
  },
  {
    id: 'notif-4',
    group: 'June 7, 2023',
    title: 'Credit Card Connected!',
    subtitle: 'Credit card has been linked.',
    iconType: 'card',
  },
  {
    id: 'notif-5',
    group: 'June 7, 2023',
    title: 'Account Setup Successfully!',
    subtitle: 'Your account has been created.',
    iconType: 'user',
  },
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'How do I make a purchase?',
    answer:
      'When you find a product you want to purchase, tap on it to view the product details. Check the price, description, and available options (if applicable), and then tap the "Add to Cart" button. Follow the on-screen instructions to complete the purchase, including providing shipping details and payment information.',
  },
  {
    id: 'faq-2',
    category: 'General',
    question: 'What payment methods are accepted?',
    answer:
      'We accept major credit and debit cards (Visa, Mastercard), Apple Pay, and Cash on Delivery for eligible locations.',
  },
  {
    id: 'faq-3',
    category: 'General',
    question: 'How do I track my orders?',
    answer:
      'Navigate to Account > My Orders and tap "Track Order" on any ongoing shipment to view live courier status and map updates.',
  },
  {
    id: 'faq-4',
    category: 'General',
    question: 'Can I cancel or return an order?',
    answer:
      'Orders can be cancelled prior to dispatch or returned within 14 days of delivery in unworn condition with original tags.',
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'How can I contact customer support for assistance?',
    answer:
      'Visit the Help Center in your Account tab to start a live Customer Service chat or connect via WhatsApp, Website, or social channels.',
  },
];
