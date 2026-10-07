import React from 'react';
import CategoryProductsVarient1, { CategoryProductsVarient1Props } from '../varient_1';

export const CategoryProductsVarient5: React.FC<CategoryProductsVarient1Props> = (props) => (
  <CategoryProductsVarient1 {...props} variant="varient_5" />
);

export default CategoryProductsVarient5;
