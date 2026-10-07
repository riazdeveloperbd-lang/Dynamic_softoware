import React, { createContext, useContext, useState } from 'react';

export interface CoffeeCartItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  quantity: number;
  isSubscription?: boolean;
}

interface CoffeeShopContextValue {
  cart: CoffeeCartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  addToCart: (item: Omit<CoffeeCartItem, 'quantity'>) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
}

const DEFAULT_CART: CoffeeCartItem[] = [
  {
    id: 'init_velvet_sig',
    name: 'Velvet Signature Blend (12 oz)',
    subtitle: 'Whole Bean · Every 2 Weeks (Save 15%)',
    price: 18.7,
    quantity: 1,
    isSubscription: true,
  },
  {
    id: 'init_cardamom_latte',
    name: 'Cardamom Oat Latte',
    subtitle: 'Seasonal Drink · 12 oz Hot · Vegan',
    price: 6.5,
    quantity: 1,
    isSubscription: false,
  },
];

const CoffeeShopContext = createContext<CoffeeShopContextValue | null>(null);

export const CoffeeShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CoffeeCartItem[]>(DEFAULT_CART);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const addToCart = (newItem: Omit<CoffeeCartItem, 'quantity'>) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === newItem.id && i.subtitle === newItem.subtitle
      );
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id && i.subtitle === newItem.subtitle
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartSubtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CoffeeShopContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        searchQuery,
        setSearchQuery,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        cartCount,
        cartSubtotal,
      }}
    >
      {children}
    </CoffeeShopContext.Provider>
  );
};

export const useCoffeeShop = (): CoffeeShopContextValue => {
  const ctx = useContext(CoffeeShopContext);
  if (!ctx) {
    return {
      cart: DEFAULT_CART,
      isCartOpen: false,
      setIsCartOpen: () => {},
      searchQuery: '',
      setSearchQuery: () => {},
      addToCart: () => {},
      updateQuantity: () => {},
      removeItem: () => {},
      clearCart: () => {},
      cartCount: 2,
      cartSubtotal: 25.2,
    };
  }
  return ctx;
};
