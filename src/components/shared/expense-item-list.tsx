import { FC, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid2';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getExpenseItem } from '../../redux/expense-item/expenseItemSlice';
import { Box, Modal, Skeleton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { FormCreateExpenseItem } from './form-create-exprense-item';
import { ExpenseItemCard } from './expense-item-card';
import { FloatingActionButton } from './floating-action-button';

interface Props {}

export const ExpenseItemList: FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const { expenseItems, loadStatus } = useAppSelector(({ expenseItem }) => expenseItem);
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const handleToggleModal = () => setOpenModal(!openModal);

  useEffect(() => {
    dispatch(getExpenseItem());
  }, []);

  const handleClickDeleteCard = () => {
    console.log('delete');
  };

  return (
    <>
      {loadStatus !== 'loading' ? (
        <Grid container spacing={2} justifyContent="center">
          {[
            ...Array(6)
              .fill(0)
              .map(() => (
                <Grid size="auto">
                  <Skeleton variant="rounded" width={190} height={85} />
                </Grid>
              )),
          ]}
        </Grid>
      ) : (
        <>
          <FloatingActionButton color="primary" handelClick={handleToggleModal}>
            <AddIcon />
          </FloatingActionButton>
          <Grid container spacing={2} justifyContent="center">
            {expenseItems.map((item) => (
              <ExpenseItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                deleteCard={handleClickDeleteCard}
              />
            ))}
          </Grid>

          <Modal
            open={openModal}
            onClose={handleToggleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 w-[400px] border-solid border-2 p-4  bg-white shadow-sm rounded-lg">
              <Typography variant="h5" marginBottom={2} textAlign={'center'} component="h1">
                {t('inputExpenseItemTypeCodeExpenseItem')}
              </Typography>
                <FormCreateExpenseItem setOpenModal={setOpenModal} />
            </div>
          </Modal>
        </>
      )}
    </>
  );
};
