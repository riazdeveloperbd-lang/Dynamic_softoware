import React from 'react';
import OrderDetailVarient1, { OrderDetailVarient1Props } from '../varient_1';

export const OrderDetailVarient3: React.FC<OrderDetailVarient1Props> = (props) => (
  <OrderDetailVarient1 {...props} variant="varient_3" />
);

export default OrderDetailVarient3;
