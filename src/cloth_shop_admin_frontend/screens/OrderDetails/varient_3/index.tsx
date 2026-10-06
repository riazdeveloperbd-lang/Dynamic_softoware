import React from 'react';
import OrderDetailsVarient1, { AdminScreenVariantProps } from '../varient_1';

export const OrderDetailsVarient3: React.FC<AdminScreenVariantProps> = (props) => (
  <OrderDetailsVarient1 {...props} />
);

export default OrderDetailsVarient3;
