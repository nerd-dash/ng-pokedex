import { Identificable } from './Identificable';
import { Ownable } from './Ownable';
import { Revealable } from './Revealable';

export interface Sighting extends Identificable, Ownable, Revealable {}
