import React, { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch } from '../../redux/hooks';
import { authorizationUser } from '../../redux/user/userSlice';
import { FormInputAuthorization } from '../../types/ui/form-login/form-input-authorization';
import { useNavigate } from 'react-router-dom';
import InputText from './input-text';
import InputPassword from './input-password';
import { ApplicationRoutes } from '../../types/shared/application-routes';
import { RegexConstants } from '../../types/shared/regex-constants';

interface Props {}

export const FormAuthorization: FC<Props> = () => {
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<FormInputAuthorization>({
    mode: 'onSubmit',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<FormInputAuthorization> = (data) => {
    setIsLoadingButton(true);
    const body = {
      email: data.email,
      password: data.password,
    };
    dispatch(authorizationUser(body))
      .unwrap()
      .then((res) => {
        localStorage.setItem('bearerToken', res.bearerToken);
        navigate(ApplicationRoutes.PROFILE);
      })
      .catch(() => {})
      .finally(() => setIsLoadingButton(false));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-center">
      <InputText
        control={control}
        name="email"
        label={t('inputEmailUser')}
        rules={{
          required: t('inputErrorEmail'),
          pattern: {
            value: RegexConstants.EMAIL,
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
          pattern: {
            value: RegexConstants.PASSWORD,
            message: t('inputErrorPassword'),
          },
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
          {t('buttonAuthorization')}
        </LoadingButton>
      </div>
    </form>
  );
};
