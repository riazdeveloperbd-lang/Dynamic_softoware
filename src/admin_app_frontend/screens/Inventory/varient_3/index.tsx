import React from 'react';
import InventoryVarient1, { InventoryVarient1Props } from '../varient_1';

export const InventoryVarient3: React.FC<InventoryVarient1Props> = (props) => (
  <InventoryVarient1 {...props} variant="varient_3" />
);

export default InventoryVarient3;
