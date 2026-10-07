import React from "react";
import VendorsVarient1, { VendorsVarient1Props } from "../varient_1";

export const VendorsVarient4: React.FC<VendorsVarient1Props> = (props) => (
  <VendorsVarient1 {...props} variant="varient_4" />
);

export default VendorsVarient4;
