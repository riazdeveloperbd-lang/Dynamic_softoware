import React from "react";
import SignUpVarient1, { SignUpVarient1Props } from "../varient_1";

export const SignUpVarient3: React.FC<SignUpVarient1Props> = (props) => (
  <SignUpVarient1 {...props} variant="varient_3" />
);

export default SignUpVarient3;
