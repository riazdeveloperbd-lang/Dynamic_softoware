import React from 'react';
import CustomersVarient1, { CustomersVarient1Props } from '../varient_1';

export const CustomersVarient3: React.FC<CustomersVarient1Props> = (props) => (
  <CustomersVarient1 {...props} variant="varient_3" />
);

export default CustomersVarient3;
