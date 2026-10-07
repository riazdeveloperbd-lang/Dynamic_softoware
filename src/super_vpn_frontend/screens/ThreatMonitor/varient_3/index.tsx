import React from 'react';
import ThreatMonitorVarient1, {
  ThreatMonitorVarient1Props,
} from '../varient_1';

export const ThreatMonitorVarient3: React.FC<ThreatMonitorVarient1Props> = (
  props
) => <ThreatMonitorVarient1 {...props} variant="varient_3" />;

export default ThreatMonitorVarient3;
