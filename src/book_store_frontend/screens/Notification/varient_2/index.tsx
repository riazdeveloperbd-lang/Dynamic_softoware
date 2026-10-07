import React from "react";
import NotificationVarient1, { NotificationVarient1Props } from "../varient_1";

export const NotificationVarient2: React.FC<NotificationVarient1Props> = (props) => (
  <NotificationVarient1 {...props} variant="varient_2" />
);

export default NotificationVarient2;
