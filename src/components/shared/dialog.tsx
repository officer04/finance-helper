import { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

interface Props {
  open: boolean;
  id: number;
  title: string;
  text?: string;
  name?: string;
  loading: boolean;
  colorButtonTextAgree: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  buttonTextAgree: string;
  buttonTextReturn: string;
  handleClose: () => void;
  handleAgree: (id: number) => void;
}

export const DialogBox: FC<Props> = ({
  open,
  title,
  id,
  name,
  text,
  loading,
  buttonTextAgree,
  buttonTextReturn,
  colorButtonTextAgree,
  handleAgree,
  handleClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
        {title} {name}?
      </DialogTitle>
      {text && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleClose} size="large" variant="outlined">
          {buttonTextReturn}
        </Button>
        <LoadingButton
          onClick={() => handleAgree(id)}
          loading={loading}
          variant="outlined"
          color={colorButtonTextAgree}
          type="submit"
          size="large"
        >
          {buttonTextAgree}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
