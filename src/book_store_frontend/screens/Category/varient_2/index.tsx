import React from "react";
import CategoryVarient1, { CategoryVarient1Props } from "../varient_1";

export const CategoryVarient2: React.FC<CategoryVarient1Props> = (props) => (
  <CategoryVarient1 {...props} variant="varient_2" />
);

export default CategoryVarient2;
