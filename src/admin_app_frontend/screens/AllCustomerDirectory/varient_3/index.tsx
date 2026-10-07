import React from 'react';
import AllCustomerDirectoryVarient1, { AllCustomerDirectoryVarient1Props } from '../varient_1';

export const AllCustomerDirectoryVarient3: React.FC<AllCustomerDirectoryVarient1Props> = (props) => (
  <AllCustomerDirectoryVarient1 {...props} variant="varient_3" />
);

export default AllCustomerDirectoryVarient3;
