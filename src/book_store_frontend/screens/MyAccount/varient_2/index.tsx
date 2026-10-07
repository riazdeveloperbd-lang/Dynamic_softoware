import React from "react";
import MyAccountVarient1, { MyAccountVarient1Props } from "../varient_1";

export const MyAccountVarient2: React.FC<MyAccountVarient1Props> = (props) => (
  <MyAccountVarient1 {...props} variant="varient_2" />
);

export default MyAccountVarient2;
