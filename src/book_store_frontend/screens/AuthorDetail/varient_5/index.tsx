import React from "react";
import AuthorDetailVarient1, { AuthorDetailVarient1Props } from "../varient_1";

export const AuthorDetailVarient5: React.FC<AuthorDetailVarient1Props> = (props) => (
  <AuthorDetailVarient1 {...props} variant="varient_5" />
);

export default AuthorDetailVarient5;
