import { FC } from 'react';

import { HeaderBase } from './header-base';
import { HeaderAuth } from './header-auth';
import { useAppSelector } from '../../../redux/hooks';

export const Header: FC = () => {
  const { isAuth } = useAppSelector(({ user }) => user);
  const getHeader = () => {
    if (!isAuth) {
      return <HeaderBase />;
    } else {
      return <HeaderAuth />;
    }
  };

  return getHeader();
};
