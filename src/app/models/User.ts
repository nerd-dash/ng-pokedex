import { Identificable } from './Identificable';

export interface User extends Identificable {
  email: string;
  password: string;
}

export const EMPTY_USER = <User>{};
