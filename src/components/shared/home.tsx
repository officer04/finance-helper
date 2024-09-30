import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { FC, useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { ApplicationLanguage, DefaultApplicationLanguage } from '../../lib/constans';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
  className?: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Home: FC<Props> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div>
      <div className='text-center'>
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
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t('modalText')}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
