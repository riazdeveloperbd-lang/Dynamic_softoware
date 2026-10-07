import React from "react";
import AddressVarient1, { AddressVarient1Props } from "../varient_1";

export const AddressVarient5: React.FC<AddressVarient1Props> = (props) => (
  <AddressVarient1 {...props} variant="varient_5" />
);

export default AddressVarient5;
