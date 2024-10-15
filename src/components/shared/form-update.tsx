import React, { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserMe, registerUser, updateUserMe } from '../../redux/user/userSlice';
import { RegexConstants } from '../../lib/constants';
import { FormInputUpdate } from '../../types/ui/form-update/form-input-update';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { User } from '../../types/ui/form-update/user';
import { getSupportedLanguages } from '../../redux/supported-languages/supportedLanguagesSlice';

interface Props {
  setOpenSnackbar?: (str: boolean) => void;
}

export const FormUpdate: FC<Props> = ({ setOpenSnackbar }) => {
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    preferredLocalizationCode: '',
  });
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [selectedSelectValue, setSelectedSelectValue] = useState('');
  const { supportedLanguages } = useAppSelector(({ supportedLanguages }) => supportedLanguages);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputUpdate>({
    mode: "all",
  });

  useEffect(() => {
    dispatch(getUserMe())
      .unwrap()
      .then((res) => {
        setUser({
          ...user,
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          preferredLocalizationCode: res.preferredLocalizationCode,
        });
        setSelectedSelectValue(res.preferredLocalizationCode);
      });
    dispatch(getSupportedLanguages());
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSelectValue(event.target.value as string);
  };

  const onSubmit: SubmitHandler<FormInputUpdate> = (data) => {
    setIsLoadingButton(true);
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      preferredLocalizationCode: 'ru',
    };
    dispatch(updateUserMe(body))
      .unwrap()
      .then((res) => {
        localStorage.setItem('bearerToken', res.bearerToken);
      })
      .catch(() => {
        // setOpenSnackbar(true);
      })
      .finally(() => setIsLoadingButton(false));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-3 text-center">
      <TextField
        error={!!errors?.firstName}
        {...register('firstName', {
          required: t('inputRequiredFields'),
          minLength: {
            value: 2,
            message: t('inputErrorLastName'),
          },
          maxLength: {
            value: 32,
            message: t('inputErrorLastName'),
          },
        })}
        style={{ width: '300px' }}
        helperText={errors?.firstName?.message}
        id="outlined-number"
        label={t('inputNameUser')}
        margin="dense"
        value={user.firstName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUser({ ...user, firstName: event.target.value });
        }}
      />
      <TextField
        error={!!errors?.lastName}
        {...register('lastName', {
          required: t('inputRequiredFields'),
          minLength: {
            value: 2,
            message: t('inputErrorLastName'),
          },
          maxLength: {
            value: 32,
            message: t('inputErrorLastName'),
          },
        })}
        style={{ width: '300px' }}
        id="outlined-error"
        label={t('inputLastNameUser')}
        helperText={errors?.lastName?.message}
        margin="dense"
        value={user.lastName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUser({ ...user, lastName: event.target.value });
        }}
      />
      <TextField
        error={!!errors?.email}
        {...register('email', {
          required: t('inputRequiredFields'),
          pattern: {
            value: RegexConstants.EMAIL,
            message: t('inputErrorEmail'),
          },
        })}
        style={{ width: '300px' }}
        id="outlined-error"
        label={t('inputEmailUser')}
        helperText={errors?.email?.message}
        margin="dense"
        value={user.email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUser({ ...user, email: event.target.value });
        }}
      />
      <FormControl fullWidth style={{ width: '300px', marginBottom: '10px', marginTop: '5px' }}>
        <InputLabel id="demo-simple-select-label">{t('inputSupportedLanguages')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSelectValue}
          label={t('inputSupportedLanguages')}
          onChange={handleChange}
          // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          //   setUser({ ...user, email: event.target.value });
          // }}
        >
          {supportedLanguages.map((item) => (
            <MenuItem key={item.value} value={item.code}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
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
