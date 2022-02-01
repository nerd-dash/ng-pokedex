import { Observable } from 'rxjs';

export interface FetchService<T = any> {
  getAll$: () => Observable<T[]>;
  get$: (id: number) => Observable<T>;
}
