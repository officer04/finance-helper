import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ApplicationRoutes } from '../../types/shared/application-routes';
import { PageInfo } from '../../types/ui/router-breadcrumbs/page-info';

export function BreadcrumbsComponent() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const { t } = useTranslation();


  const breadcrumbNameMap: PageInfo[] = [
    { path: ApplicationRoutes.PROFILE, name: t('namePageProfile') },
    { path: ApplicationRoutes.INCOME_SOURCE, name: t('namePageIncomeSource') },
    { path: ApplicationRoutes.EXPENSE_ITEM, name: t('namePageExpenseItem') },
  ];

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const pageInfo = breadcrumbNameMap.find((item) => item.path === to);

        return last ? (
          <Typography key={to} sx={{ color: 'white' }}>
            {pageInfo?.name}
          </Typography>
        ) : (
          <Link to={to} key={to}>
            {pageInfo?.name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
