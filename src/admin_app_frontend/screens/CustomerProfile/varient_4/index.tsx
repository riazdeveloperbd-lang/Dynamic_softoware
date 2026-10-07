import React from 'react';
import CustomerProfileVarient1, { CustomerProfileVarient1Props } from '../varient_1';

export const CustomerProfileVarient4: React.FC<CustomerProfileVarient1Props> = (props) => (
  <CustomerProfileVarient1 {...props} variant="varient_4" />
);

export default CustomerProfileVarient4;
