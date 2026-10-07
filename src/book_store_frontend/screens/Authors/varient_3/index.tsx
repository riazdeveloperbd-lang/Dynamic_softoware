import React from "react";
import AuthorsVarient1, { AuthorsVarient1Props } from "../varient_1";

export const AuthorsVarient3: React.FC<AuthorsVarient1Props> = (props) => (
  <AuthorsVarient1 {...props} variant="varient_3" />
);

export default AuthorsVarient3;
