import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ProfileUser } from '../components/shared/profile-user';
import { Home } from '../components/shared';
import { PrivateRouter } from './private-routes';
import { ApplicationRoutes } from '../lib/constants';

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<PrivateRouter />}>
        <Route path={ApplicationRoutes.PROFILE} element={<ProfileUser />} />
      </Route>
      <Route path={ApplicationRoutes.HOME} element={<Home />} />
    </Routes>
  );
};
