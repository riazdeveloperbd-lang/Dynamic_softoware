import React from "react";
import OrderHistoryVarient1, { OrderHistoryVarient1Props } from "../varient_1";

export const OrderHistoryVarient5: React.FC<OrderHistoryVarient1Props> = (props) => (
  <OrderHistoryVarient1 {...props} variant="varient_5" />
);

export default OrderHistoryVarient5;
