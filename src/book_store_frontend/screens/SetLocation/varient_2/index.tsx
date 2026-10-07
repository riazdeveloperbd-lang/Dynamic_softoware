import React from "react";
import SetLocationVarient1, { SetLocationVarient1Props } from "../varient_1";

export const SetLocationVarient2: React.FC<SetLocationVarient1Props> = (props) => (
  <SetLocationVarient1 {...props} variant="varient_2" />
);

export default SetLocationVarient2;
