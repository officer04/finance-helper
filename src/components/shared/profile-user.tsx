import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { FormUpdate } from './form-update';

interface Props {}

export const ProfileUser: FC<Props> = ({}) => {
  return (
    <div>
      <Typography variant="h4" style={{textAlign: "center"}} marginBottom={2} component="h1">
        Профиль
      </Typography>
      <FormUpdate/>
    </div>
  );
};
