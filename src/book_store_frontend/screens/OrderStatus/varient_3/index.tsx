import React from "react";
import OrderStatusVarient1, { OrderStatusVarient1Props } from "../varient_1";

export const OrderStatusVarient3: React.FC<OrderStatusVarient1Props> = (props) => (
  <OrderStatusVarient1 {...props} variant="varient_3" />
);

export default OrderStatusVarient3;
