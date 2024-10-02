import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { FC, useState } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { FormRegister } from './form-register';

interface Props {
  className?: string;
}


export const Home: FC<Props> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div>
      <div className="text-center">
        <Typography variant="h5" marginBottom={2} component="h1">
          {t('title')}
        </Typography>
        <Button variant="outlined" size="medium" onClick={handleOpenModal}>
          {t('button')}
        </Button>
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormRegister />
      </Modal>
    </div>
  );
};
