import React from 'react';
import ServersVarient1, { ServersVarient1Props } from '../varient_1';

export const ServersVarient3: React.FC<ServersVarient1Props> = (props) => (
  <ServersVarient1 {...props} variant="varient_3" />
);

export default ServersVarient3;
