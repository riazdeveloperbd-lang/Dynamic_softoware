import React from 'react';
import ShieldVarient1, { ShieldVarient1Props } from '../varient_1';

export const ShieldVarient3: React.FC<ShieldVarient1Props> = (props) => (
  <ShieldVarient1 {...props} variant="varient_3" />
);

export default ShieldVarient3;
