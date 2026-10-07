import React from 'react';
import ToolsVarient1, { ToolsVarient1Props } from '../varient_1';

export const ToolsVarient2: React.FC<ToolsVarient1Props> = (props) => (
  <ToolsVarient1 {...props} variant="varient_2" />
);

export default ToolsVarient2;
