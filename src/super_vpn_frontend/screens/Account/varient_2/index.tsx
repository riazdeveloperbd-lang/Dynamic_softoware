import React from 'react';
import AccountVarient1, { AccountVarient1Props } from '../varient_1';

export const AccountVarient2: React.FC<AccountVarient1Props> = (props) => (
  <AccountVarient1 {...props} variant="varient_2" />
);

export default AccountVarient2;
