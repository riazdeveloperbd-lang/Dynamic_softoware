import React from 'react';
import OrdersVarient1, { OrdersVarient1Props } from '../varient_1';

export const OrdersVarient4: React.FC<OrdersVarient1Props> = (props) => (
  <OrdersVarient1 {...props} variant="varient_4" />
);

export default OrdersVarient4;
