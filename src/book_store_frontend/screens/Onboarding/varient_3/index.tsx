import React from "react";
import OnboardingVarient1, { OnboardingVarient1Props } from "../varient_1";

export const OnboardingVarient3: React.FC<OnboardingVarient1Props> = (props) => (
  <OnboardingVarient1 {...props} variant="varient_3" />
);

export default OnboardingVarient3;
