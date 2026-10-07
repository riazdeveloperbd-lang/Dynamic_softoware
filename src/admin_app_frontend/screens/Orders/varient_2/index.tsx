import React from 'react';
import OrdersVarient1, { OrdersVarient1Props } from '../varient_1';

export const OrdersVarient2: React.FC<OrdersVarient1Props> = (props) => (
  <OrdersVarient1 {...props} variant="varient_2" />
);

export default OrdersVarient2;
