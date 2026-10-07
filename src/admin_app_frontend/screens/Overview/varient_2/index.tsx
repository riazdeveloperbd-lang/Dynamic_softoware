import React from 'react';
import OverviewVarient1, { OverviewVarient1Props } from '../varient_1';

export const OverviewVarient2: React.FC<OverviewVarient1Props> = (props) => (
  <OverviewVarient1 {...props} variant="varient_2" />
);

export default OverviewVarient2;
