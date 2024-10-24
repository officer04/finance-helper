import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { ApplicationRoutes } from '../../lib/constants';

export const Footer: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="p-2">
      {location.pathname === ApplicationRoutes.HOME && (
        <Typography variant="body1" component="p" align="center">
          {`${currentYear}`} || {t('footerText')}
        </Typography>
      )}
    </footer>
  );
};
