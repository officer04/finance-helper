import { FC, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid2';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FloatingActionButton } from './floating-action-button';

import { HandleUpdateExpenseItemCard } from '../../types/ui/expense-item-list/handle-update-card';
import { deleteIncomeSource, getIncomeSource } from '../../redux/income-source/incomeSourceSlice';
import { ModalBox } from './modal-box';
import { useTranslation } from 'react-i18next';
import { IncomeSourceCard } from './income-source-card';
import { DialogBox } from './dialog';
import { FormCreateIncomeSource } from './form-create-income-source';
import { FormUpdateIncomeSource } from './form-update-income-source';
import { IncomeSourceInfo } from '../../types/ui/income-source-list/income-source-info';

interface Props {}

export const IncomeSourceList: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { incomeSourceItems, loadStatus } = useAppSelector(({ incomeSource }) => incomeSource);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [titleIncomeSourceDelete, setTitleIncomeSourceDelete] = useState('');
  const [idIncomeSourceDelete, setIncomeSourceDelete] = useState(0);
  const [incomeSourceInfo, setIncomeSourceInfo] = useState<IncomeSourceInfo>({
    id: 0,
    name: '',
    color: '',
    incomeSourceTypeCode: { code: '', name: '' },
  });

  const handleToggleModalCreate = () => setOpenModalCreate(!openModalCreate);
  const handleToggleModalUpdate = () => setOpenModalUpdate(!openModalUpdate);
  const handleToggleModalDelete = () => setOpenModalDelete(!openModalDelete);

  useEffect(() => {
    dispatch(getIncomeSource());
  }, []);

  const handleClickDeleteCard = (name: string, id: number) => {
    handleToggleModalDelete();
    setTitleIncomeSourceDelete(name);
    setIncomeSourceDelete(id);
  };

  const handleDelete = (id: number) => {
    setIsLoadingButton(true);
    dispatch(deleteIncomeSource(id)).then(() => {
      dispatch(getIncomeSource()).then(() => {
        handleToggleModalDelete();
        setIsLoadingButton(false);
      });
    });
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
            title={t('titleIncomeSourceCreate')}
            onClose={handleToggleModalCreate}
            open={openModalCreate}
          >
            <FormCreateIncomeSource setOpenModal={setOpenModalCreate} />
          </ModalBox>

          <ModalBox
            title={t('titleIncomeSourceUpdate')}
            onClose={handleToggleModalUpdate}
            open={openModalUpdate}
          >
            <FormUpdateIncomeSource
              setOpenModal={setOpenModalUpdate}
              incomeSourceInfo={incomeSourceInfo}
            />
          </ModalBox>

          <DialogBox
            open={openModalDelete}
            title={t('titleCategoryDelete')}
            name={titleIncomeSourceDelete}
            id={idIncomeSourceDelete}
            loading={isLoadingButton}
            colorButtonTextAgree="error"
            buttonTextAgree={t('buttonTextDelete')}
            buttonTextCancel={t('buttonTextCancel')}
            handleAgree={handleDelete}
            handleClose={handleToggleModalDelete}
          />
        </>
      )}
    </>
  );
};
