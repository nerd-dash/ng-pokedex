import { Observable } from 'rxjs';
import { Service } from './Service';

export interface GameStateService<T = any> extends Service {
  verifyItems: (toBeTested: Partial<T>, verified: T) => boolean;
  getItem$: () => Observable<T>;
  getAllItems$: () => Observable<T[]>;
  getNextItem: () => void;
}
