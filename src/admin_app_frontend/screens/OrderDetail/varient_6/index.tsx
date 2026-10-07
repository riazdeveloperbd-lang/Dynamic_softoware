import React from 'react';
import OrderDetailVarient1, { OrderDetailVarient1Props } from '../varient_1';

export const OrderDetailVarient6: React.FC<OrderDetailVarient1Props> = (props) => (
  <OrderDetailVarient1 {...props} variant="varient_6" />
);

export default OrderDetailVarient6;
