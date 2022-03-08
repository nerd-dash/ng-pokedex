import { Observable } from 'rxjs';
import { AccessToken } from './AccessToken';
import { Service } from './Service';

export interface AuthFetchService<T = any> extends Service {
  register$: (loginData: Partial<T>) => Observable<AccessToken<T>>;
  login$: (loginData: Partial<T>) => Observable<AccessToken<T>>;
}
