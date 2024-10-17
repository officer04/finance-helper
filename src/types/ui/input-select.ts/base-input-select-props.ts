import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

export interface BaseInputSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >; // Опциональные правила валидации
  margin?: 'dense' | 'normal' | 'none' | undefined;
}