import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import LoadingButton from '@mui/lab/LoadingButton';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getExpenseItemType } from '../../redux/expense-item-type/expenseItemTypeSlice';
import { getExpenseItem, updateExpenseItem } from '../../redux/expense-item/expenseItemSlice';

import InputText from './input-text';
import InputAutocomplete from './input-autocomplete';
import ColorPicker from './color-picker';
import { FormInputUpdateExpenseItem } from '../../types/ui/form-update-expense-item/form-input-update-expense-item';
import { ExpenseItemInfo } from '../../types/ui/expense-item-list/expense-item-info';

interface Props {
  setOpenModal: (str: boolean) => void;
  expenseItemInfo: ExpenseItemInfo;
}

export const FormUpdateExpenseItem: FC<Props> = ({ setOpenModal, expenseItemInfo }) => {
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const { expenseItemType } = useAppSelector(({ expenseItemType }) => expenseItemType);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { handleSubmit, control } = useForm<FormInputUpdateExpenseItem>({
    mode: 'onSubmit',
    defaultValues: {
      name: expenseItemInfo.name,
      color: expenseItemInfo.color,
      expenseItemTypeCode: expenseItemInfo.expenseItemTypeCode.name,
    },
  });

  useEffect(() => {
    dispatch(getExpenseItemType());
  }, []);

  const onSubmit: SubmitHandler<FormInputUpdateExpenseItem> = (data) => {
    setIsLoadingButton(true);
    const request = {
      id: expenseItemInfo.id,
      body: {
        name: data.name,
        color: data.color,
        expenseItemTypeCode: data.expenseItemTypeCode,
      },
    };
    dispatch(updateExpenseItem(request))
      .unwrap()
      .then(() => {
        dispatch(getExpenseItem()).then(() => setOpenModal(false));
      })
      .catch(() => {})
      .finally(() => setIsLoadingButton(false));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-2"
    >
      <InputText
        control={control}
        name="name"
        label={t('inputNameExpenseItem')}
        rules={{
          required: t('inputRequiredFields'),
        }}
        style={{ width: '300px' }}
        margin="dense"
      />
      <ColorPicker
        control={control}
        name="color"
        label={t('inputColor')}
        rules={{
          required: t('inputRequiredFields'),
        }}
        style={{ width: '300px' }}
        margin="dense"
      />
      <InputAutocomplete
        control={control}
        name="expenseItemTypeCode"
        label={t('inputExpenseItemTypeCodeExpenseItem')}
        rules={{
          required: t('inputRequiredFields'),
        }}
        options={expenseItemType}
        style={{ width: '300px' }}
        margin="dense"
      />
      <div className="text-center">
        <LoadingButton
          loading={isLoadingButton}
          variant="outlined"
          style={{ width: '300px' }}
          type="submit"
          size="large"
        >
          {t('buttonUpdate')}
        </LoadingButton>
      </div>
    </form>
  );
};
