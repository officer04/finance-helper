import { FC } from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { ApplicationRoutes } from '../lib/constants';

export const PrivateRouter: FC<RouteProps> = () => {
  const { isAuth } = useAppSelector(({ user }) => user);
  return isAuth ? <Outlet /> : <Navigate to={ApplicationRoutes.HOME} />;
};
