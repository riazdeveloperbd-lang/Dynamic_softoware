import React from "react";
import ProfileVarient1, { ProfileVarient1Props } from "../varient_1";

export const ProfileVarient2: React.FC<ProfileVarient1Props> = (props) => (
  <ProfileVarient1 {...props} variant="varient_2" />
);

export default ProfileVarient2;
