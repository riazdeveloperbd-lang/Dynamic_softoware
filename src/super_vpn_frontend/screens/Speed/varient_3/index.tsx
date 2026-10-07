import React from 'react';
import SpeedVarient1, { SpeedVarient1Props } from '../varient_1';

export const SpeedVarient3: React.FC<SpeedVarient1Props> = (props) => (
  <SpeedVarient1 {...props} variant="varient_3" />
);

export default SpeedVarient3;
