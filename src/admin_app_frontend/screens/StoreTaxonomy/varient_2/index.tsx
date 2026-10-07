import React from 'react';
import StoreTaxonomyVarient1, { StoreTaxonomyVarient1Props } from '../varient_1';

export const StoreTaxonomyVarient2: React.FC<StoreTaxonomyVarient1Props> = (props) => (
  <StoreTaxonomyVarient1 {...props} variant="varient_2" />
);

export default StoreTaxonomyVarient2;
