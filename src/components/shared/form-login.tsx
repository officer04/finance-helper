import React, { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import LoadingButton from '@mui/lab/LoadingButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import { useAppDispatch } from '../../redux/hooks';
import { authorizationUser } from '../../redux/user/userSlice';
import { RegexConstants } from '../../lib/constants';
import { FormInputLogin } from '../../types/ui/form-login/form-input-login';

interface Props {
  setOpenSnackbar: (str: boolean) => void;
}

export const FormLogin: FC<Props> = ({ setOpenSnackbar }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputLogin>({ mode: 'onBlur' });
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const onSubmit: SubmitHandler<FormInputLogin> = (data) => {
    setIsLoadingButton(true);
    const body = {
      email: data.email,
      password: data.password,
    };
    dispatch(authorizationUser(body))
      .unwrap()
      .then((res) => {
        localStorage.setItem('bearerToken', res.bearerToken);
      })
      .catch((err) => {
        setOpenSnackbar(true);
      })
      .finally(() => setIsLoadingButton(false));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-center mb-3">
      <TextField
        error={!!errors?.email}
        {...register('email', {
          required: t('inputRequiredFields'),
          pattern: {
            value: RegexConstants.EMAIL,
            message: t('inputErrorEmail'),
          },
        })}
        id="outlined-error"
        label={t('inputEmailUser')}
        helperText={errors?.email?.message}
        style={{ width: '300px' }}
        margin="dense"
      />
      <FormControl
        error={!!errors?.password}
        style={{ width: '300px' }}
        sx={{ m: 1, width: '25ch' }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">{t('inputPasswordUser')}</InputLabel>

        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          {...register('password', {
            required: t('inputRequiredFields'),
            pattern: {
              value: RegexConstants.PASSWORD,
              message: t('inputErrorPassword'),
            },
          })}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {!showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        <FormHelperText id="component-error-text">{errors?.password?.message}</FormHelperText>
      </FormControl>

      <div className="text-center">
        <LoadingButton
          loading={isLoadingButton}
          variant="outlined"
          disabled={!isValid}
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