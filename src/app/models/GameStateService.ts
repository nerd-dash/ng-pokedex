import { Observable } from 'rxjs';
import { Service } from './Service';

export interface GameStateService<T = any> extends Service {
  verifyItems: (toBeTested: Partial<T>) => boolean;
  getItem$: () => Observable<T>;
  getAllItems$: () => Observable<T[]>;
  getNextItem: () => void;
  updateItem$: (item: T) => Observable<T>;
}
