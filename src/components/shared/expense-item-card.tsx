import { FC } from 'react';

import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';

interface Props {
  id: number;
  name: string;
  deleteCard: (e: React.MouseEvent<HTMLElement>) => void;
  updateCard: (id: number) => void;
}

export const ExpenseItemCard: FC<Props> = ({ id, name, deleteCard, updateCard }) => {
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
        }}
      >
        <Typography
          onClick={() => updateCard(id)}
          sx={{ width: '130px' }}
          variant="body1"
          component="p"
        >
          {name}
        </Typography>
        <IconButton color="inherit" onClick={deleteCard} sx={{ width: '40px' }}>
          <ClearIcon sx={{ position: 'absolute', right: 0, height: '40px' }} />
        </IconButton>
      </Box>
    </Grid>
  );
};
