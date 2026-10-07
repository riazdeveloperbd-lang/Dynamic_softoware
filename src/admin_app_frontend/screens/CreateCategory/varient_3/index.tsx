import React from 'react';
import CreateCategoryVarient1, { CreateCategoryVarient1Props } from '../varient_1';

export const CreateCategoryVarient3: React.FC<CreateCategoryVarient1Props> = (props) => (
  <CreateCategoryVarient1 {...props} variant="varient_3" />
);

export default CreateCategoryVarient3;
