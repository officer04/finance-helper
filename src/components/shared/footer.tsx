import React, { FC } from 'react';
import { cn } from '../../lib/utils';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

interface Props {
  className?: string;
}

export const Footer: FC<Props> = ({ className }) => {
  const { t, i18n } = useTranslation();

  const currentYear = new Date().getFullYear();
  return (
    <footer className={cn('', className)}>
      <Typography variant="body1" component="p" align="center">
        {`${currentYear}`} || {t('footerText')}
      </Typography>
    </footer>
  );
};
