import React from 'react';
import { BookStoreVariantId } from '../../../styles/bookStoreDesignSystem';
import { SetLocationVarient1 } from '../../SetLocation/varient_1';

export interface AddressVarient1Props {
  variant?: BookStoreVariantId;
  onBack: () => void;
  onGoToNotifications: () => void;
}

export const AddressVarient1: React.FC<AddressVarient1Props> = ({
  variant = 'varient_1',
  onBack,
  onGoToNotifications,
}) => {
  return (
    <SetLocationVarient1
      variant={variant}
      onBack={onBack}
      onGoToNotifications={onGoToNotifications}
    />
  );
};

export default AddressVarient1;
