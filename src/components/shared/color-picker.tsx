import { Controller, FieldValues } from 'react-hook-form';
import { BaseInputProps } from '../../types/shared/base-input-props';
import { cn } from '../../lib/utils';

interface InputColorPicker<T extends FieldValues> extends BaseInputProps<T> {}

export default function ColorPicker<T extends FieldValues>({
  control,
  name,
  rules,
  label,
  style,
}: InputColorPicker<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <div
          className={cn('p-3 border-solid border-2 rounded-md flex items-center', style)}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            className="w-[30px] h-[30px] outline-none bg-inherit border-none"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            className="w-[230px] outline-none text-base"
            style={{ marginLeft: '10px' }}
          />
        </div>
      )}
    />
  );
}
