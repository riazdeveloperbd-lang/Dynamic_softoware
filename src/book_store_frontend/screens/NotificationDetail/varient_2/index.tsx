import React from "react";
import NotificationDetailVarient1, { NotificationDetailVarient1Props } from "../varient_1";

export const NotificationDetailVarient2: React.FC<NotificationDetailVarient1Props> = (props) => (
  <NotificationDetailVarient1 {...props} variant="varient_2" />
);

export default NotificationDetailVarient2;
