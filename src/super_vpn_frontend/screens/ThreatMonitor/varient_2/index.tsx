import React from 'react';
import ThreatMonitorVarient1, {
  ThreatMonitorVarient1Props,
} from '../varient_1';

export const ThreatMonitorVarient2: React.FC<ThreatMonitorVarient1Props> = (
  props
) => <ThreatMonitorVarient1 {...props} variant="varient_2" />;

export default ThreatMonitorVarient2;
