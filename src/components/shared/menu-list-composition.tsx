import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ApplicationRoutes } from '../../types/shared/application-routes';

export const MenuListComposition: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = [
    { link: ApplicationRoutes.PROFILE, name: t('titleProfileUser') },
    { link: ApplicationRoutes.EXPENSE_ITEM, name: t('expenseItem') },
    { link: ApplicationRoutes.INCOME_SOURCE, name: t('incomeSource') },
  ];

  const ITEM_HEIGHT = 15 * options.length;

  return (
    <div>
      <IconButton
        size="large"
        onClick={handleClick}
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.link} onClick={handleClose}>
            <Link to={option.link}>{option.name}</Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
