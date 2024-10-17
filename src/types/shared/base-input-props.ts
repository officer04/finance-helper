import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

export interface BaseInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  style?: React.CSSProperties;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  margin?: 'dense' | 'normal' | 'none' | undefined;
}
