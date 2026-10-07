import React from "react";
import AuthorDetailVarient1, { AuthorDetailVarient1Props } from "../varient_1";

export const AuthorDetailVarient4: React.FC<AuthorDetailVarient1Props> = (props) => (
  <AuthorDetailVarient1 {...props} variant="varient_4" />
);

export default AuthorDetailVarient4;
