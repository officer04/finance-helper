import { FC } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MenuListComposition } from '../menu-list-composition';

export const HeaderAuth: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <MenuListComposition />
      </Toolbar>
    </AppBar>
  );
};
