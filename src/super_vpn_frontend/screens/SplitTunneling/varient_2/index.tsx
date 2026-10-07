import React from 'react';
import SplitTunnelingVarient1, {
  SplitTunnelingVarient1Props,
} from '../varient_1';

export const SplitTunnelingVarient2: React.FC<SplitTunnelingVarient1Props> = (
  props
) => <SplitTunnelingVarient1 {...props} variant="varient_2" />;

export default SplitTunnelingVarient2;
