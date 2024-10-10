import React, { FC } from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';
import { PrivateRouter } from './private-routes';
import { ProfileUser } from '../components/shared/profile-user';
import { Home } from '../components/shared';

interface Props {}

export const AppRoutes: FC<Props> = ({}) => {
  return (
    <Routes>
      <Route element={<PrivateRouter />}>
        <Route path="/profile" element={<ProfileUser />} />
      </Route>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
