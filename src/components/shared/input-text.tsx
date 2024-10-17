import React from 'react';
import { Controller,FieldValues} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { BaseInputProps } from '../../types/ui/input-text/base-input-props';

/**
 * Пропсы для TextField
 */
interface InputTextProps<T extends FieldValues> extends BaseInputProps<T> {
  style?: React.CSSProperties;
}

export default function InputText<T extends FieldValues>({
  control,
  name,
  label,
  rules,
  style,
  margin,
}: InputTextProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          style={style}
          {...field}
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : ''}
          variant="outlined"
          margin={margin}
        />
      )}
    />
  );
}
