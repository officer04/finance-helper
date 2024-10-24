import { FC } from 'react';

import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';

interface Props {
  id: number;
  name: string;
  deleteCard: () => void;
}

export const ExpenseItemCard: FC<Props> = ({ id, name, deleteCard }) => {
  return (
    <Grid size="auto">
      <Box
        component="div"
        sx={{
          p: 2,
          minHeight: '85px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 2,
          boxShadow: '8px 4px 28px 0px rgba(34, 60, 80, 0.2)',
          width: '190px',
        }}
      >
        <Typography variant="body1" component="p">
          {name}
        </Typography>
        <IconButton color="inherit" onClick={deleteCard}>
          <ClearIcon style={{ position: 'absolute', right: 0, height: '40px' }} />
        </IconButton>
      </Box>
    </Grid>
  );
};
