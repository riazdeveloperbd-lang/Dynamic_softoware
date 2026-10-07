import React from "react";
import OrderStatusVarient1, { OrderStatusVarient1Props } from "../varient_1";

export const OrderStatusVarient5: React.FC<OrderStatusVarient1Props> = (props) => (
  <OrderStatusVarient1 {...props} variant="varient_5" />
);

export default OrderStatusVarient5;
