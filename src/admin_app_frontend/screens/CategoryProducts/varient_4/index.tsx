import React from 'react';
import CategoryProductsVarient1, { CategoryProductsVarient1Props } from '../varient_1';

export const CategoryProductsVarient4: React.FC<CategoryProductsVarient1Props> = (props) => (
  <CategoryProductsVarient1 {...props} variant="varient_4" />
);

export default CategoryProductsVarient4;
