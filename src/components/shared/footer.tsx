import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';

export const Footer: FC = () => {
  const { t, i18n } = useTranslation();

  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Typography variant="body1" component="p" align="center">
        {`${currentYear}`} || {t('footerText')}
      </Typography>
    </footer>
  );
};
