import React from 'react';
import ShieldVarient1, { ShieldVarient1Props } from '../varient_1';

export const ShieldVarient2: React.FC<ShieldVarient1Props> = (props) => (
  <ShieldVarient1 {...props} variant="varient_2" />
);

export default ShieldVarient2;
