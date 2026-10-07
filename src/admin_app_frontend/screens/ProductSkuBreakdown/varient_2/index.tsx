import React from 'react';
import ProductSkuBreakdownVarient1, { ProductSkuBreakdownVarient1Props } from '../varient_1';

export const ProductSkuBreakdownVarient2: React.FC<ProductSkuBreakdownVarient1Props> = (props) => (
  <ProductSkuBreakdownVarient1 {...props} variant="varient_2" />
);

export default ProductSkuBreakdownVarient2;
