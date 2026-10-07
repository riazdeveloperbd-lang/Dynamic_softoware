import React from 'react';
import AccountVarient1, { AccountVarient1Props } from '../varient_1';

export const AccountVarient5: React.FC<AccountVarient1Props> = (props) => (
  <AccountVarient1 {...props} variant="varient_5" />
);

export default AccountVarient5;
