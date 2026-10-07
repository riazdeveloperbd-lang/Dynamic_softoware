import React from 'react';
import SpeedVarient1, { SpeedVarient1Props } from '../varient_1';

export const SpeedVarient2: React.FC<SpeedVarient1Props> = (props) => (
  <SpeedVarient1 {...props} variant="varient_2" />
);

export default SpeedVarient2;
