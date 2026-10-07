import React from "react";
import AuthorsVarient1, { AuthorsVarient1Props } from "../varient_1";

export const AuthorsVarient4: React.FC<AuthorsVarient1Props> = (props) => (
  <AuthorsVarient1 {...props} variant="varient_4" />
);

export default AuthorsVarient4;
