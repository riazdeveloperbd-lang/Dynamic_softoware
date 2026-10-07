import React from 'react';
import ProtocolEngineVarient1, {
  ProtocolEngineVarient1Props,
} from '../varient_1';

export const ProtocolEngineVarient2: React.FC<ProtocolEngineVarient1Props> = (
  props
) => <ProtocolEngineVarient1 {...props} variant="varient_2" />;

export default ProtocolEngineVarient2;
