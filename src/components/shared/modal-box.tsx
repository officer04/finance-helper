import { Modal, Typography } from '@mui/material';
import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  open: boolean;
  title: string;
  onClose: () => void
}

export const ModalBox: FC<Props> = ({title, open, onClose, children}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 w-[400px] border-solid border-2 p-4  bg-white shadow-sm rounded-lg">
        <Typography variant="h5" marginBottom={2} textAlign={'center'} component="h1">
          {title}
        </Typography>
        {children}
      </div>
    </Modal>
  );
};
