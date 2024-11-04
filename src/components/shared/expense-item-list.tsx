import { FC, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid2';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deleteExpenseItem, getExpenseItem } from '../../redux/expense-item/expenseItemSlice';
import { Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { FormCreateExpenseItem } from './form-create-exprense-item';
import { FloatingActionButton } from './floating-action-button';
import { ModalBox } from './modal-box';
import { FormUpdateExpenseItem } from './form-update-exprense-item';
import { ExpenseItemInfo } from '../../types/ui/expense-item-list/expense-item-info';
import { HandleUpdateExpenseItemCard } from '../../types/ui/expense-item-list/handle-update-card';
import { DialogBox } from './dialog';
import { ExpenseItemCard } from './expense-item-card';

interface Props {}

export const ExpenseItemList: FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { expenseItems, loadStatus } = useAppSelector(({ expenseItem }) => expenseItem);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [titleExpenseItemDelete, setTitleExpenseItemDelete] = useState('');
  const [idExpenseItemDelete, setIdExpenseItemDelete] = useState(0);
  const [expenseItemInfo, setExpenseItemInfo] = useState<ExpenseItemInfo>({
    id: 0,
    name: '',
    color: '',
    expenseItemTypeCode: { code: '', name: '' },
  });

  const handleToggleModalCreate = () => setOpenModalCreate(!openModalCreate);
  const handleToggleModalUpdate = () => setOpenModalUpdate(!openModalUpdate);
  const handleToggleModalDelete = () => setOpenModalDelete(!openModalDelete);

  useEffect(() => {
    dispatch(getExpenseItem());
  }, []);

  const handleClickDeleteCard = (name: string, id: number) => {
    handleToggleModalDelete();
    setTitleExpenseItemDelete(name);
    setIdExpenseItemDelete(id);
  };

  const handleDelete = (id: number) => {
    setIsLoadingButton(true);
    dispatch(deleteExpenseItem(id)).then(() => {
      dispatch(getExpenseItem()).then(() => {
        handleToggleModalDelete();
        setIsLoadingButton(false);
      });
    });
  };

  const handleUpdateCard: HandleUpdateExpenseItemCard = (id, name, color, expenseItemTypeCode) => {
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
            title={t('titleExpenseItemCreate')}
            onClose={handleToggleModalCreate}
            open={openModalCreate}
          >
            <FormCreateExpenseItem setOpenModal={setOpenModalCreate} />
          </ModalBox>

          <ModalBox
            title={t('titleExpenseItemUpdate')}
            onClose={handleToggleModalUpdate}
            open={openModalUpdate}
          >
            <FormUpdateExpenseItem
              setOpenModal={setOpenModalUpdate}
              expenseItemInfo={expenseItemInfo}
            />
          </ModalBox>

          <DialogBox
            open={openModalDelete}
            title={t('titleCategoryDelete')}
            name={titleExpenseItemDelete}
            id={idExpenseItemDelete}
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
