import { FC } from 'react';

import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

interface Props {
  addCard: () => void;
}

export const ExpenseItemCardAdd: FC<Props> = ({ addCard }) => {
  return (
    <Grid size={{ xs: 6, md: 3 }}>
      <Box
        component="section"
        sx={{
          p: 2,
          boxShadow: '8px 4px 28px 0px rgba(34, 60, 80, 0.2)',
          borderRadius: 2,
          textAlign: 'center',
          width: '190px',
          minHeight: '85px',
        }}
        onClick={addCard}
      >
        <IconButton color="inherit">
          <ControlPointIcon fontSize="large" />
        </IconButton>
      </Box>
    </Grid>
  );
};
