import React, { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../redux/hooks';
import { registerUser } from '../../redux/user/userSlice';
import FormHelperText from '@mui/material/FormHelperText';

interface Props {}

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export const FormRegister: FC<Props> = ({}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ mode: 'onBlur' });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatPassword = () => setShowRepeatPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      preferredLocalizationCode: navigator.language.split('-')[0],
    };
    dispatch(registerUser(body))
      .then((res) => console.log('res', res))
      .catch((err) => console.log('err', err));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-center mb-3">
      <TextField
        error={!!errors?.firstName}
        {...register('firstName', {
          required: t('inputRequiredFields'),
          minLength: {
            value: 5,
            message: t('inputErrorLastName'),
          },
          maxLength: {
            value: 32,
            message: t('inputErrorLastName'),
          },
          // pattern: {
          //   value: /^(?=.*\d)\w{2,32}$/m,
          //   message: t('inputErrorFirstName'),
          // },
        })}
        style={{ minWidth: '100px' }}
        helperText={errors?.firstName?.message}
        id="outlined-number"
        label={t('inputNameUser')}
        margin="dense"
      />
      <TextField
        error={!!errors?.lastName}
        {...register('lastName', {
          required: t('inputRequiredFields'),
          min: {
            value: 5,
            message: t('inputErrorLastName'),
          },
          max: {
            value: 32,
            message: t('inputErrorLastName'),
          },
          // pattern: {
          //   value: /^(?=.*\d)\w{2,32}$/m,
          //   message: t('inputErrorLastName'),
          // },
        })}
        id="outlined-error"
        label={t('inputLastNameUser')}
        helperText={errors?.lastName?.message}
        margin="dense"
      />
      <TextField
        error={!!errors?.email}
        {...register('email', {
          required: t('inputRequiredFields'),
          pattern: {
            value:
              /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/,
            message: t('inputErrorEmail'),
          },
        })}
        id="outlined-error"
        label={t('inputEmailUser')}
        helperText={errors?.email?.message}
        margin="dense"
      />
      <FormControl error={!!errors?.password} sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">{t('inputPasswordUser')}</InputLabel>

        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          {...register('password', {
            required: t('inputRequiredFields'),
            pattern: {
              value: /^(?=.*\d)\w{2,32}$/m,
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
      <FormControl error={!!errors?.repeatPassword} sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          {t('inputRepeatPasswordUser')}
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showRepeatPassword ? 'text' : 'password'}
          {...register('repeatPassword', {
            required: t('inputRequiredFields'),
            validate: (value, formValues) =>
              value === formValues.password || t('inputErrorRepeatPassword'),
          })}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowRepeatPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {!showRepeatPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="RepeatPassword"
        />
        <FormHelperText id="component-error-text">{errors?.repeatPassword?.message}</FormHelperText>
      </FormControl>
      <div className="text-center">
        <Button variant="outlined" disabled={!isValid} type="submit" size="medium">
          {t('buttonRegister')}
        </Button>
      </div>
    </form>
  );
};
