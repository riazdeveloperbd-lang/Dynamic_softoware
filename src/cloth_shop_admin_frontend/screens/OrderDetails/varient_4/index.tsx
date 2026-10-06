import React from 'react';
import OrderDetailsVarient1, { AdminScreenVariantProps } from '../varient_1';

export const OrderDetailsVarient4: React.FC<AdminScreenVariantProps> = (props) => (
  <OrderDetailsVarient1 {...props} />
);

export default OrderDetailsVarient4;
