import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import LoadingButton from '@mui/lab/LoadingButton';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getExpenseItemType } from '../../redux/expense-item-type/expenseItemTypeSlice';
import { getExpenseItem } from '../../redux/expense-item/expenseItemSlice';

import InputText from './input-text';
import InputAutocomplete from './input-autocomplete';
import ColorPicker from './color-picker';
import { createIncomeSource, getIncomeSource } from '../../redux/Income-source/IncomeSourceSlice';
import { FormInputCreateIncomeSource } from '../../types/ui/form-create-Income-source/form-input-create-Income-source';
import { getIncomeSourceType } from '../../redux/Income-source-type/IncomeSourceTypeSlice';

interface Props {
  setOpenModal: (str: boolean) => void;
}

export const FormCreateIncomeSource: FC<Props> = ({ setOpenModal }) => {
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const { incomeSourceType } = useAppSelector(({ incomeSourceType }) => incomeSourceType);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  function getRandomHexColor(): string {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
  }

  const randomHexColor = getRandomHexColor();
  const { handleSubmit, control } = useForm<FormInputCreateIncomeSource>({
    mode: 'onSubmit',
    defaultValues: { name: '', color: randomHexColor, incomeSourceTypeCode: '' },
  });

  useEffect(() => {
    dispatch(getIncomeSourceType());
  }, []);

  const onSubmit: SubmitHandler<FormInputCreateIncomeSource> = (data) => {
    setIsLoadingButton(true);
    const body = {
      name: data.name,
      color: data.color,
      incomeSourceTypeCode: data.incomeSourceTypeCode,
    };
    dispatch(createIncomeSource(body))
      .unwrap()
      .then(() => {
        dispatch(getIncomeSource()).then(() => {
          setOpenModal(false);
          setIsLoadingButton(false)
        });
      })
      .catch(() => {});
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
        name="incomeSourceTypeCode"
        label={t('inputIncomeSourceTypeCode')}
        rules={{
          required: t('inputRequiredFields'),
        }}
        options={incomeSourceType}
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
