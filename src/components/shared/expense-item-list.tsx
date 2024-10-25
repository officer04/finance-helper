import { FC, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid2';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getExpenseItem } from '../../redux/expense-item/expenseItemSlice';
import { Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { FormCreateExpenseItem } from './form-create-exprense-item';
import { ExpenseItemCard } from './expense-item-card';
import { FloatingActionButton } from './floating-action-button';
import { ModalBox } from './modal-box';
import { FormUpdateExpenseItem } from './form-update-exprense-item';

interface Props {}

export const ExpenseItemList: FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const { expenseItems, loadStatus } = useAppSelector(({ expenseItem }) => expenseItem);
  const { t } = useTranslation();
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [expenseItemCardId, setExpenseItemCardId] = useState(0);
  const handleToggleModalCreate = () => setOpenModalCreate(!openModalCreate);
  const handleToggleModalUpdate = () => setOpenModalUpdate(!openModalUpdate);

  useEffect(() => {
    dispatch(getExpenseItem());
  }, []);

  const handleClickDeleteCard = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log('delete');
  };

  const handleUpdateCard = (id: number) => {
    handleToggleModalUpdate();
    setExpenseItemCardId(id);
  };

  return (
    <>
      {loadStatus === 'loading' ? (
        <Grid container spacing={2} justifyContent="center">
          {[
            ...Array(6)
              .fill(0)
              .map((_, index) => (
                <Grid size="auto" key={index}>
                  <Skeleton variant="rounded" width={190} height={85} />
                </Grid>
              )),
          ]}
        </Grid>
      ) : (
        <>
          <FloatingActionButton color="primary" handelClick={handleToggleModalCreate}>
            <AddIcon />
          </FloatingActionButton>

          <Grid container spacing={2} justifyContent="center">
            {expenseItems.map((item) => (
              <ExpenseItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                deleteCard={handleClickDeleteCard}
                updateCard={handleUpdateCard}
              />
            ))}
          </Grid>

          <ModalBox
            title={t('inputExpenseItemTypeCodeExpenseItem')}
            onClose={handleToggleModalCreate}
            open={openModalCreate}
          >
            <FormCreateExpenseItem setOpenModal={setOpenModalCreate} />
          </ModalBox>

          <ModalBox
            title={t('updateExpenseItemTitle')}
            onClose={handleToggleModalUpdate}
            open={openModalUpdate}
          >
            <FormUpdateExpenseItem
              setOpenModal={setOpenModalUpdate}
              expenseItemCardId={expenseItemCardId}
            />
          </ModalBox>
        </>
      )}
    </>
  );
};
