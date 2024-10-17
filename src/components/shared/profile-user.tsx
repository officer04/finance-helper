import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { FormUpdateUser } from './form-update-user';
import { useTranslation } from 'react-i18next';

interface Props {}

export const ProfileUser: FC<Props> = ({}) => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <Typography variant="h4" style={{ textAlign: 'center' }} marginBottom={2} component="h1">
        {t('titleProfileUser')}
      </Typography>
      <FormUpdateUser />
    </div>
  );
};
