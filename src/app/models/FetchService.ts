import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from './Service';

export interface FetchService<T = any> extends Service {
  getAll$: (params?: HttpParams) => Observable<T[]>;
  get$: (id: number) => Observable<T>;
  put$: (entity: T) => Observable<T>;
}
