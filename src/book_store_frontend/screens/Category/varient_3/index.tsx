import React from "react";
import CategoryVarient1, { CategoryVarient1Props } from "../varient_1";

export const CategoryVarient3: React.FC<CategoryVarient1Props> = (props) => (
  <CategoryVarient1 {...props} variant="varient_3" />
);

export default CategoryVarient3;
