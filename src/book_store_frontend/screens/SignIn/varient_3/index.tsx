import React from "react";
import SignInVarient1, { SignInVarient1Props } from "../varient_1";

export const SignInVarient3: React.FC<SignInVarient1Props> = (props) => (
  <SignInVarient1 {...props} variant="varient_3" />
);

export default SignInVarient3;
