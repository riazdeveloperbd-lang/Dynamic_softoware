import React from 'react';
import InventoryVarient1, { InventoryVarient1Props } from '../varient_1';

export const InventoryVarient5: React.FC<InventoryVarient1Props> = (props) => (
  <InventoryVarient1 {...props} variant="varient_5" />
);

export default InventoryVarient5;
