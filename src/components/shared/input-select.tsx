import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectItem } from '../../types/ui/input-select.ts/select-item';
import { BaseInputSelectProps } from '../../types/ui/input-select.ts/base-input-select-props';

/**
 * Пропсы для Select
 */
interface InputSelectProps<T extends FieldValues> extends BaseInputSelectProps<T> {
  items: SelectItem[];
  style?: React.CSSProperties;
}

export default function InputSelect<T extends FieldValues>({
  control,
  name,
  label,
  rules,
  style,
  margin,
  items,
}: InputSelectProps<T>) {
  return (
    <FormControl style={style}>
      <InputLabel id="level-label">{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <Select label={label} labelId="level-label" {...field}>
            {items.map((item) => (
              <MenuItem key={item.key} value={item.key}>
                {item.value}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}
