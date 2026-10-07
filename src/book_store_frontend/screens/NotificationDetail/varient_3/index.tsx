import React from "react";
import NotificationDetailVarient1, { NotificationDetailVarient1Props } from "../varient_1";

export const NotificationDetailVarient3: React.FC<NotificationDetailVarient1Props> = (props) => (
  <NotificationDetailVarient1 {...props} variant="varient_3" />
);

export default NotificationDetailVarient3;
