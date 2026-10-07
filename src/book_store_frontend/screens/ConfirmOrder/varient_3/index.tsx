import React from "react";
import ConfirmOrderVarient1, { ConfirmOrderVarient1Props } from "../varient_1";

export const ConfirmOrderVarient3: React.FC<ConfirmOrderVarient1Props> = (props) => (
  <ConfirmOrderVarient1 {...props} variant="varient_3" />
);

export default ConfirmOrderVarient3;
