import { FC, useEffect } from 'react';

import Grid from '@mui/material/Grid2';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ExpenseItemCard } from './expense-item-card';
import { FloatingActionButton } from './floating-action-button';
import { HandleUpdateCard } from '../../types/ui/expense-item-list/handle-update-card';
import { getIncomeSource } from '../../redux/Income-source/IncomeSourceSlice';

interface Props {}

export const IncomeSourceList: FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const { incomeSourceItems, loadStatus } = useAppSelector(({ incomeSource }) => incomeSource);

  useEffect(() => {
    dispatch(getIncomeSource());
  }, []);

  const handleClickDeleteCard = (name: string, id: number) => {
    console.log('delete');
  };

  const handleClickAdd = () => {
    console.log('add');
  };

  const handleUpdateCard: HandleUpdateCard = (id, name, color, expenseItemTypeCode) => {
    console.log('update');
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
          <FloatingActionButton color="primary" handelClick={handleClickAdd}>
            <AddIcon />
          </FloatingActionButton>

          <Grid container spacing={2} justifyContent="space-evenly">
            {incomeSourceItems.map((item) => (
              <ExpenseItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                color={item.color}
                expenseItemTypeCode={item.incomeSourceType}
                deleteCard={handleClickDeleteCard}
                updateCard={handleUpdateCard}
              />
            ))}
          </Grid>
        </>
      )}
    </>
  );
};
