import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import LoadingButton from '@mui/lab/LoadingButton';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getExpenseItemType } from '../../redux/expense-item-type/expenseItemTypeSlice';
import { createExpenseItem, getExpenseItem } from '../../redux/expense-item/expenseItemSlice';
import { FormInputCreateExpenseItem } from '../../types/ui/form-create-exprense-item/form-input-create-expense-item';

import InputText from './input-text';
import InputAutocomplete from './input-autocomplete';
import ColorPicker from './color-picker';

interface Props {
  setOpenModal: (str: boolean) => void;
}

export const FormCreateExpenseItem: FC<Props> = ({ setOpenModal }) => {
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const { expenseItemType } = useAppSelector(({ expenseItemType }) => expenseItemType);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  function getRandomHexColor(): string {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
  }

  const randomHexColor = getRandomHexColor();
  const { handleSubmit, control } = useForm<FormInputCreateExpenseItem>({
    mode: 'onSubmit',
    defaultValues: { name: '', color: randomHexColor, expenseItemTypeCode: '' },
  });

  useEffect(() => {
    dispatch(getExpenseItemType());
  }, []);

  const onSubmit: SubmitHandler<FormInputCreateExpenseItem> = (data) => {
    setIsLoadingButton(true);
    const body = {
      name: data.name,
      color: data.color,
      expenseItemTypeCode: data.expenseItemTypeCode,
    };
    // dispatch(createExpenseItem(body))
    //   .unwrap()
    //   .then(() => {
    //     dispatch(getExpenseItem()).then(() => setOpenModal(false));
    //   })
    //   .catch(() => {})
    //   .finally(() => setIsLoadingButton(false));
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
          {t('buttonCreate')}
        </LoadingButton>
      </div>
    </form>
  );
};
