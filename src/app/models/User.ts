import { Identificable } from './Identificable';

export interface User extends Identificable {
  email: string;
  password: string;
}
