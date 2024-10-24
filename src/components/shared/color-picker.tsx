import { Controller, FieldValues } from 'react-hook-form';
import { BaseInputProps } from '../../types/shared/base-input-props';
import { cn } from '../../lib/utils';

interface InputColorPickerProps<T extends FieldValues> extends BaseInputProps<T> {}

export default function ColorPicker<T extends FieldValues>({
  control,
  name,
  rules,
  label,
  style,
}: InputColorPickerProps<T>) {
  return (
    <label htmlFor="color" style={style}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { value, onChange } }) => (
          <div className={cn('p-3 border-solid border-2 rounded-md flex items-center')}>
            <input
              type="color"
              value={value}
              id="color"
              onChange={(e) => {
                onChange(e.target.value);
              }}
              className="w-[30px] h-[30px] outline-none bg-inherit border-none"
            />
            <p className="ml-2 text-base">{label}</p>
          </div>
        )}
      />
    </label>
  );
}
