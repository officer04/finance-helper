import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ProfileUser } from '../components/shared/profile-user';
import { Home } from '../components/shared';
import { PrivateRouter } from './private-routes';
import { ApplicationRoutes } from '../lib/constants';
import { ExpenseItemList } from '../components/shared/expense-item-list';

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<PrivateRouter />}>
        <Route path={ApplicationRoutes.PROFILE} element={<ProfileUser />} />
        <Route path={ApplicationRoutes.EXPENSE_ITEM} element={<ExpenseItemList />} />
      </Route>
      <Route path={ApplicationRoutes.HOME} element={<Home />} />
    </Routes>
  );
};
