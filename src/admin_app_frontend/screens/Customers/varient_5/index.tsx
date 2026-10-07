import React from 'react';
import CustomersVarient1, { CustomersVarient1Props } from '../varient_1';

export const CustomersVarient5: React.FC<CustomersVarient1Props> = (props) => (
  <CustomersVarient1 {...props} variant="varient_5" />
);

export default CustomersVarient5;
