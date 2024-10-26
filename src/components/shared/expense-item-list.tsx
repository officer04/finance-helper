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
import { ExpenseItemInfo } from '../../types/ui/expense-item-list/expense-item-info';
import { HandleUpdateCard } from '../../types/ui/expense-item-list/handle-update-card';

interface Props {}

export const ExpenseItemList: FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const { expenseItems, loadStatus } = useAppSelector(({ expenseItem }) => expenseItem);
  const { t } = useTranslation();
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [expenseItemInfo, setExpenseItemInfo] = useState<ExpenseItemInfo>({
    id: 0,
    name: '',
    color: '',
    expenseItemTypeCode: { code: '', name: '' },
  });
  const handleToggleModalCreate = () => setOpenModalCreate(!openModalCreate);
  const handleToggleModalUpdate = () => setOpenModalUpdate(!openModalUpdate);

  useEffect(() => {
    dispatch(getExpenseItem());
  }, []);

  const handleClickDeleteCard = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log('delete');
  };

  const handleUpdateCard: HandleUpdateCard = (id, name, color, expenseItemTypeCode) => {
    handleToggleModalUpdate();
    setExpenseItemInfo({
      id: id,
      name: name,
      color: color,
      expenseItemTypeCode: { name: expenseItemTypeCode.code, code: expenseItemTypeCode.name },
    });
  };

  return (
    <>
      {loadStatus === 'loading' ? (
        <Grid container spacing={2} justifyContent="center" style={{ flex: 1 }}>
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
                color={item.color}
                expenseItemTypeCode={item.expenseItemType}
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
              expenseItemInfo={expenseItemInfo}
            />
          </ModalBox>
        </>
      )}
    </>
  );
};
