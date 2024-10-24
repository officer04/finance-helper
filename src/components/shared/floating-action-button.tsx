import { Fab } from '@mui/material';
import { FC, ReactNode } from 'react';

interface Props {
  handelClick: () => void;
  children: ReactNode;
  color?:
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'default';
}

export const FloatingActionButton: FC<Props> = ({ handelClick, children, color }) => {
  return (
    <Fab
      sx={{ position: 'absolute', bottom: 20, right: 20, zIndex: 2 }}
      color={color}
      aria-label="add"
      onClick={handelClick}
    >
      {children}
    </Fab>
  );
};
