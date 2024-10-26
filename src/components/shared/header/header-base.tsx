import { FC } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export const HeaderBase: FC = () => {
  return (
    <AppBar position="static" sx={{marginBottom: "40px"}}>
      <Toolbar>
      </Toolbar>
    </AppBar>
  );
};
