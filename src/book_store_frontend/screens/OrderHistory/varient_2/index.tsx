import React from "react";
import OrderHistoryVarient1, { OrderHistoryVarient1Props } from "../varient_1";

export const OrderHistoryVarient2: React.FC<OrderHistoryVarient1Props> = (props) => (
  <OrderHistoryVarient1 {...props} variant="varient_2" />
);

export default OrderHistoryVarient2;
