import { Observable } from 'rxjs';
import { Service } from './Service';

export interface PublishableService<T = any> extends Service {
  asObservable$: () => Observable<T>;
  next: (value: T) => void;
}
