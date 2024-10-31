import { FC } from 'react';

import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import { HandleUpdateCard } from '../../types/ui/expense-item-list/handle-update-card';

interface Props {
  id: number;
  name: string;
  color: string;
  typeCode: { code: string; name: string };
  deleteCard: (name: string, id: number) => void;
  updateCard: HandleUpdateCard;
}

export const Card: FC<Props> = ({
  id,
  name,
  color,
  typeCode,
  deleteCard,
  updateCard,
}) => {
  return (
    <Grid size="auto">
      <Box
        component="div"
        sx={{
          minHeight: '85px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 2,
          boxShadow: '8px 4px 28px 0px rgba(34, 60, 80, 0.2)',
        }}
      >
        <Typography
          onClick={() => updateCard(id, name, color, typeCode)}
          sx={{ width: '150px', p: 2 }}
          variant="body1"
          component="p"
        >
          {name}
        </Typography>
        <IconButton
          color="inherit"
          onClick={(e) => deleteCard(name, id)}
          sx={{ width: '40px', p: '20px' }}
        >
          <ClearIcon sx={{ position: 'absolute', right: 7, height: '40px' }} />
        </IconButton>
      </Box>
    </Grid>
  );
};