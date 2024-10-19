import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import LoadingButton from '@mui/lab/LoadingButton';

import { useAppDispatch } from '../../redux/hooks';
import { registerUser } from '../../redux/user/userSlice';
import { ApplicationRoutes } from '../../lib/constants';
import { FormInputRegister } from '../../types/ui/form-register/form-input-register';
import { useNavigate } from 'react-router-dom';
import InputText from './input-text';
import InputPassword from './input-password';

interface Props {}

export const FormRegister: FC<Props> = () => {
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<FormInputRegister>({
    mode: 'onSubmit',
    defaultValues: { firstName: '', lastName: '', email: '', password: '', repeatPassword: '' },
  });

  const onSubmit: SubmitHandler<FormInputRegister> = (data) => {
    setIsLoadingButton(true);
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    dispatch(registerUser(body))
      .unwrap()
      .then((res) => {
        localStorage.setItem('bearerToken', res.bearerToken);
        navigate(ApplicationRoutes.PROFILE);
      })
      .catch(() => {
      })
      .finally(() => setIsLoadingButton(false));
  };
  return (
    <form className="mb-3 text-center" onSubmit={handleSubmit(onSubmit)}>
      <InputText
        control={control}
        name="firstName"
        label={t('inputFirstNameUser')}
        rules={{
          required: t('inputRequiredFields'),
          minLength: {
            value: 2,
            message: t('inputErrorFirstName'),
          },
          maxLength: {
            value: 32,
            message: t('inputErrorFirstName'),
          },
        }}
        style={{ width: '300px' }}
        margin="dense"
      />
      <InputText
        control={control}
        name="lastName"
        label={t('inputLastNameUser')}
        rules={{
          required: t('inputRequiredFields'),
          minLength: {
            value: 2,
            message: t('inputErrorLastName'),
          },
          maxLength: {
            value: 32,
            message: t('inputErrorLastName'),
          },
        }}
        style={{ width: '300px' }}
        margin="dense"
      />
      <InputText
        control={control}
        name="email"
        label={t('inputEmailUser')}
        rules={{
          required: t('inputRequiredFields'),
          minLength: {
            value: 2,
            message: t('inputErrorEmail'),
          },
          maxLength: {
            value: 32,
            message: t('inputErrorEmail'),
          },
        }}
        style={{ width: '300px' }}
        margin="dense"
      />
      <InputPassword
        control={control}
        name="password"
        label={t('inputPasswordUser')}
        rules={{
          required: t('inputRequiredFields'),
          minLength: {
            value: 2,
            message: t('inputErrorPassword'),
          },
          maxLength: {
            value: 32,
            message: t('inputErrorPassword'),
          },
        }}
        style={{ width: '300px' }}
        margin="dense"
      />
      <InputPassword
        control={control}
        name="repeatPassword"
        label={t('inputRepeatPasswordUser')}
        rules={{
          required: t('inputRequiredFields'),
          validate: (value, formValues) =>
            value === formValues.password || t('inputErrorRepeatPassword'),
        }}
        style={{ width: '300px', marginBottom: '10px' }}
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
          {t('buttonRegister')}
        </LoadingButton>
      </div>
    </form>
  );
};
