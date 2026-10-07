import React from "react";
import ProfileVarient1, { ProfileVarient1Props } from "../varient_1";

export const ProfileVarient3: React.FC<ProfileVarient1Props> = (props) => (
  <ProfileVarient1 {...props} variant="varient_3" />
);

export default ProfileVarient3;
