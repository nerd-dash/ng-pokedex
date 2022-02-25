import { Observable } from 'rxjs';
import { AccessToken } from './AccessToken';
import { Service } from './Service';

export interface AuthService<K = any, T extends AccessToken<K> = any>
  extends Service {
  register$: (loginData: Partial<K>) => Observable<T>;
  login$: (loginData: Partial<K>) => Observable<T>;
  loggedIn$: () => Observable<K>;
}
