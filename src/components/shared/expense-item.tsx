import { FC, useEffect } from 'react';

import Grid from '@mui/material/Grid2';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getExpenseItem } from '../../redux/expense-item/expenseItemSlice';
import { ExpenseItemCard } from './expense-item-card';
import { ExpenseItemCardAdd } from './expense-item-card-add';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {}

export const ExpenseItem: FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const { expenseItems, loadStatus } = useAppSelector(({ expenseItem }) => expenseItem);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getExpenseItem());
  }, []);

  const handleClickDeleteCard = () => {
    console.log('delete');
  };

  const handleClickAddCard = () => {
    console.log('add');
  };

  return (
    <Grid container spacing={2} padding={2}>
      {loadStatus === 'loading' ? (
        <Typography>{t('loadingText')}</Typography>
      ) : (
        <>
          <ExpenseItemCardAdd addCard={handleClickAddCard} />
          {expenseItems.map((item) => (
            <ExpenseItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              deleteCard={handleClickDeleteCard}
            />
          ))}
        </>
      )}
    </Grid>
  );
};
