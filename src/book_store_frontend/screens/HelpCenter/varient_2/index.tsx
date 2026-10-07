import React from "react";
import HelpCenterVarient1, { HelpCenterVarient1Props } from "../varient_1";

export const HelpCenterVarient2: React.FC<HelpCenterVarient1Props> = (props) => (
  <HelpCenterVarient1 {...props} variant="varient_2" />
);

export default HelpCenterVarient2;
