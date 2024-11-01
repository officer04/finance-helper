import { FC, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid2';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FloatingActionButton } from './floating-action-button';
import { HandleUpdateExpenseItemCard } from '../../types/ui/expense-item-list/handle-update-card';
import { getIncomeSource } from '../../redux/Income-source/IncomeSourceSlice';
import { ModalBox } from './modal-box';
import { FormCreateIncomeSource } from './form-create-Income-source';
import { useTranslation } from 'react-i18next';
import { IncomeSourceCard } from './income-source-card';
import { FormUpdateIncomeSource } from './form-update-Income-source';

interface Props {}

export interface IncomeSourceInfo {
  id: number;
  name: string;
  color: string;
  incomeSourceTypeCode: {
    code: string;
    name: string;
  };
}

export const IncomeSourceList: FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { incomeSourceItems, loadStatus } = useAppSelector(({ incomeSource }) => incomeSource);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [incomeSourceInfo, setIncomeSourceInfo] = useState<IncomeSourceInfo>({
    id: 0,
    name: '',
    color: '',
    incomeSourceTypeCode: { code: '', name: '' },
  });

  const handleToggleModalCreate = () => setOpenModalCreate(!openModalCreate);
  const handleToggleModalUpdate = () => setOpenModalUpdate(!openModalUpdate);

  useEffect(() => {
    dispatch(getIncomeSource());
  }, []);

  const handleClickDeleteCard = (name: string, id: number) => {
    console.log('delete');
  };

  const handleUpdateCard: HandleUpdateExpenseItemCard = (id, name, color, incomeSourceType) => {
    handleToggleModalUpdate();
    setIncomeSourceInfo({
      id: id,
      name: name,
      color: color,
      incomeSourceTypeCode: { name: incomeSourceType.code, code: incomeSourceType.name },
    });
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
              <IncomeSourceCard
                key={item.id}
                id={item.id}
                name={item.name}
                color={item.color}
                IncomeSourceTypeCode={item.incomeSourceType}
                deleteCard={handleClickDeleteCard}
                updateCard={handleUpdateCard}
              />
            ))}
          </Grid>

          <ModalBox
            title={t('IncomeSourceTitle')}
            onClose={handleToggleModalCreate}
            open={openModalCreate}
          >
            <FormCreateIncomeSource setOpenModal={setOpenModalCreate} />
          </ModalBox>

          <ModalBox
            title={t('inputIncomeSource')}
            onClose={handleToggleModalUpdate}
            open={openModalUpdate}
          >
            <FormUpdateIncomeSource
              setOpenModal={setOpenModalUpdate}
              incomeSourceInfo={incomeSourceInfo}
            />
          </ModalBox>
        </>
      )}
    </>
  );
};
