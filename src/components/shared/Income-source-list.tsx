import { FC, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid2';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Card } from './card';
import { FloatingActionButton } from './floating-action-button';
import { HandleUpdateCard } from '../../types/ui/expense-item-list/handle-update-card';
import { getIncomeSource } from '../../redux/Income-source/IncomeSourceSlice';
import { ModalBox } from './modal-box';
import { FormCreateIncomeSource } from './form-create-Income-source';
import { useTranslation } from 'react-i18next';

interface Props {}

export const IncomeSourceList: FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { incomeSourceItems, loadStatus } = useAppSelector(({ incomeSource }) => incomeSource);
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const handleToggleModalCreate = () => setOpenModalCreate(!openModalCreate);

  useEffect(() => {
    dispatch(getIncomeSource());
  }, []);

  const handleClickDeleteCard = (name: string, id: number) => {
    console.log('delete');
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
          <FloatingActionButton color="primary" handelClick={handleToggleModalCreate}>
            <AddIcon />
          </FloatingActionButton>

          <Grid container spacing={2} justifyContent="space-evenly">
            {incomeSourceItems.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                name={item.name}
                color={item.color}
                typeCode={item.incomeSourceType}
                deleteCard={handleClickDeleteCard}
                updateCard={handleUpdateCard}
              />
            ))}
          </Grid>

          <ModalBox
            title={t('inputIncomeSource')}
            onClose={handleToggleModalCreate}
            open={openModalCreate}
          >
            <FormCreateIncomeSource setOpenModal={setOpenModalCreate} />
          </ModalBox>
        </>
      )}
    </>
  );
};
