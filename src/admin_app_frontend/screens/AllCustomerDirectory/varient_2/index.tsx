import React from 'react';
import AllCustomerDirectoryVarient1, { AllCustomerDirectoryVarient1Props } from '../varient_1';

export const AllCustomerDirectoryVarient2: React.FC<AllCustomerDirectoryVarient1Props> = (props) => (
  <AllCustomerDirectoryVarient1 {...props} variant="varient_2" />
);

export default AllCustomerDirectoryVarient2;
