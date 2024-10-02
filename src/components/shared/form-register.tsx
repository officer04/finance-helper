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
import Typography from '@mui/material/Typography';

interface Props {}

interface IFormInput {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const FormRegister: FC<Props> = ({}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" marginBottom={2} textAlign={'center'} component="h1">
        {t('registerTitle')}
      </Typography>
      <div className="text-center mb-3">
        <TextField
          {...errors?.name}
          {...register('name', {
            required: true,
            maxLength: 32,
            minLength: 2,
            // pattern: { value: /^([A-Za-z\-\']{1,50})|([А-Яа-я\-\']{1,50})$/, message: '' },
          })}
          id="outlined-number"
          label={t('inputNameUser')}
          margin="dense"
        />
        {errors?.name && (
          <div>
            {/* <img src={exclamation} /> */}
            <p>{errors.name.message}</p>
          </div>
        )}
        <TextField
          {...register('lastName')}
          id="outlined-error"
          label={t('inputLastNameUser')}
          margin="dense"
        />
        <TextField
          {...register('email')}
          id="outlined-error"
          label={t('inputEmailUser')}
          margin="dense"
        />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">{t('inputPasswordUser')}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
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
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            {t('inputRepeatPasswordUser')}
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
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
            label="RepeatPassword"
          />
        </FormControl>
      </div>
      <div className="text-center">
        <Button variant="outlined" type='submit' size="medium">
          {t('buttonRegister')}
        </Button>
      </div>
    </form>
  );
};
