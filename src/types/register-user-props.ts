import { LoginUserProps } from './login-user-props';

export interface RegisterUserProps extends LoginUserProps {
  firstName: string;
  lastName: string;
}
