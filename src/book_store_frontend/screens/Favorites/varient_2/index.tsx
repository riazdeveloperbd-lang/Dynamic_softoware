import React from "react";
import FavoritesVarient1, { FavoritesVarient1Props } from "../varient_1";

export const FavoritesVarient2: React.FC<FavoritesVarient1Props> = (props) => (
  <FavoritesVarient1 {...props} variant="varient_2" />
);

export default FavoritesVarient2;
