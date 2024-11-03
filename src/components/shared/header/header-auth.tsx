import { FC } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { MenuListComposition } from '../menu-list-composition';
import { BreadcrumbsComponent } from '../router-breadcrumbs';

export const HeaderAuth: FC = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: '40px' }}>
      <Toolbar>
        <MenuListComposition />
         <BreadcrumbsComponent/>
      </Toolbar>
    </AppBar>
  );
};
