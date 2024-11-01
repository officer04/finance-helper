import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import LoadingButton from '@mui/lab/LoadingButton';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateExpenseItem } from '../../redux/expense-item/expenseItemSlice';

import InputText from './input-text';
import InputAutocomplete from './input-autocomplete';
import ColorPicker from './color-picker';

import { IncomeSourceInfo } from './Income-source-list';
import { FormInputUpdateIncomeSource } from '../../types/ui/form-update-income-source/form-input-update-income-source';

import { getIncomeSource, updateIncomeSource } from '../../redux/Income-source/IncomeSourceSlice';
import { getIncomeSourceType } from '../../redux/Income-source-type/IncomeSourceTypeSlice';
import { IncomeSourceInfo } from '../../types/ui/Income-source-list/Income-source-info';

interface Props {
  setOpenModal: (str: boolean) => void;
  incomeSourceInfo: IncomeSourceInfo;
}

export const FormUpdateIncomeSource: FC<Props> = ({ setOpenModal, incomeSourceInfo }) => {
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const { incomeSourceType } = useAppSelector(({ incomeSourceType }) => incomeSourceType);


  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { handleSubmit, control } = useForm<FormInputUpdateIncomeSource>({
    mode: 'onSubmit',
    defaultValues: {
      name: incomeSourceInfo.name,
      color: incomeSourceInfo.color,
      incomeSourceTypeCode: incomeSourceInfo.incomeSourceTypeCode.name,
    },
  });

  useEffect(() => {
    dispatch(getIncomeSourceType());
  }, []);

  const onSubmit: SubmitHandler<FormInputUpdateIncomeSource> = (data) => {
    setIsLoadingButton(true);
    const request = {
      id: incomeSourceInfo.id,
      body: {
        name: data.name,
        color: data.color,
        incomeSourceTypeCode: data.incomeSourceTypeCode,
      },
    };
    dispatch(updateIncomeSource(request))
      .unwrap()
      .then(() => {
        dispatch(getIncomeSource()).then(() => {
          setOpenModal(false);
          setIsLoadingButton(false)
        });
      })
      .catch(() => {})
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
        label={t('inputIncomeSource')}
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
          {t('buttonUpdate')}
        </LoadingButton>
      </div>
    </form>
  );
};
