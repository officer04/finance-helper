import { Controller, FieldValues } from 'react-hook-form';
import { Autocomplete, Paper, styled, TextField } from '@mui/material';

import { BaseInputProps } from '../../types/shared/base-input-props';
import { AutocompleteOptions } from '../../types/ui/Input-autocomplete/autocomplete-options';

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxHeight: 250,
  overflowY: 'auto',
}));

interface InputAutocompleteProps<T extends FieldValues> extends BaseInputProps<T> {
  options: AutocompleteOptions[];
}

export default function InputAutocomplete<T extends FieldValues>({
  control,
  name,
  label,
  rules,
  style,
  margin,
  options,
}: InputAutocompleteProps<T>) {
  return (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState }) => (
          <Autocomplete
            disablePortal
            sx={style}
            options={options}
            getOptionLabel={(option) => option.value}
            PaperComponent={StyledPaper}
            onChange={(event, newValue) => {
              onChange(newValue ? newValue.code : null);
            }}
            renderInput={(params) => (
              <TextField  
                {...params}
                margin={margin}
                label={label}
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
            value={options.find((option) => option.code === value) || null}
          />
        )}
      />
  );
}
