import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function BreadcrumbsComponent() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const { t } = useTranslation();

  const breadcrumbNameMap: { [key: string]: string } = {
    '/income-source': t('namePageIncomeSource'),
    '/expense-item': t('namePageExpenseItem'),
    '/profile': t('namePageProfile'),
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography key={to} sx={{ color: "white" }}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <Link to={to} key={to}>
            {breadcrumbNameMap[to]}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
