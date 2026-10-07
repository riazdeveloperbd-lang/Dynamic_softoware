import React from 'react';
import CategoryProductsVarient1, { CategoryProductsVarient1Props } from '../varient_1';

export const CategoryProductsVarient2: React.FC<CategoryProductsVarient1Props> = (props) => (
  <CategoryProductsVarient1 {...props} variant="varient_2" />
);

export default CategoryProductsVarient2;
