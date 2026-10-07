import React from "react";
import SignUpVarient1, { SignUpVarient1Props } from "../varient_1";

export const SignUpVarient2: React.FC<SignUpVarient1Props> = (props) => (
  <SignUpVarient1 {...props} variant="varient_2" />
);

export default SignUpVarient2;
