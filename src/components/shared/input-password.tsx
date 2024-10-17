import React, { useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { BaseInputProps } from '../../types/ui/input-password/base-input-props';

/**
 * Пропсы для TextField
 */
interface InputPasswordProps<T extends FieldValues> extends BaseInputProps<T> {
  style?: React.CSSProperties;
}

export default function InputPassword<T extends FieldValues>({
  control,
  name,
  label,
  rules,
  style,
  margin,
}: InputPasswordProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          style={style}
          {...field}
          type={showPassword ? 'text' : 'password'}
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : ''}
          variant="outlined"
          margin={margin}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
