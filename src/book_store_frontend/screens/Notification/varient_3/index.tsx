import React from "react";
import NotificationVarient1, { NotificationVarient1Props } from "../varient_1";

export const NotificationVarient3: React.FC<NotificationVarient1Props> = (props) => (
  <NotificationVarient1 {...props} variant="varient_3" />
);

export default NotificationVarient3;
