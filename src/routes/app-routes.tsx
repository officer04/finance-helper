import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ProfileUser } from '../components/shared/profile-user';
import { Home } from '../components/shared';
import { PrivateRouter } from './private-routes';
import { ExpenseItemList } from '../components/shared/expense-item-list';
import { IncomeSourceList } from '../components/shared/income-source-list';
import { ApplicationRoutes } from '../types/shared/application-routes';

export const AppRoutes: FC = () => {
  return (
      <Routes>
        <Route element={<PrivateRouter />}>
          <Route path={ApplicationRoutes.PROFILE} element={<ProfileUser />} />
          <Route path={ApplicationRoutes.EXPENSE_ITEM} element={<ExpenseItemList />} />
          <Route path={ApplicationRoutes.INCOME_SOURCE} element={<IncomeSourceList />} />
        </Route>
        <Route path={ApplicationRoutes.HOME} element={<Home />} />
      </Routes>
  );
};
