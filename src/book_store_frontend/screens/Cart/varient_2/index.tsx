import React from "react";
import CartVarient1, { CartVarient1Props } from "../varient_1";

export const CartVarient2: React.FC<CartVarient1Props> = (props) => (
  <CartVarient1 {...props} variant="varient_2" />
);

export default CartVarient2;
