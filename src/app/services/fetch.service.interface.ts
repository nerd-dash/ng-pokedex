import { Observable } from 'rxjs';
import { Service } from './service.interface';

export interface FetchService<T = any> extends Service {
  getAll$: () => Observable<T[]>;
  get$: (id: number) => Observable<T>;
}
