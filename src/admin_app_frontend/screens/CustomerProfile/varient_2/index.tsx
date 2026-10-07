import React from 'react';
import CustomerProfileVarient1, { CustomerProfileVarient1Props } from '../varient_1';

export const CustomerProfileVarient2: React.FC<CustomerProfileVarient1Props> = (props) => (
  <CustomerProfileVarient1 {...props} variant="varient_2" />
);

export default CustomerProfileVarient2;
