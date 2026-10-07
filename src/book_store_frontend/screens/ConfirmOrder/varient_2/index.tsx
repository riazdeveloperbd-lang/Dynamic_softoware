import React from "react";
import ConfirmOrderVarient1, { ConfirmOrderVarient1Props } from "../varient_1";

export const ConfirmOrderVarient2: React.FC<ConfirmOrderVarient1Props> = (props) => (
  <ConfirmOrderVarient1 {...props} variant="varient_2" />
);

export default ConfirmOrderVarient2;
