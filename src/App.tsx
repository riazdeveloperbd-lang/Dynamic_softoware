import React from 'react';
import ClothShopApp from './cloth_shop_frontend/ClothShopApp';

/**
 * Root App component
 * Acts as the application shell and router, rendering the modular cloth_shop_frontend
 * workspace dashboard while allowing future applications to be plugged in seamlessly.
 */
export default function App() {
  return <ClothShopApp />;
}
