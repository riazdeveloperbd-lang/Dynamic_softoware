import React from "react";
import SearchVarient1, { SearchVarient1Props } from "../varient_1";

export const SearchVarient2: React.FC<SearchVarient1Props> = (props) => (
  <SearchVarient1 {...props} variant="varient_2" />
);

export default SearchVarient2;
