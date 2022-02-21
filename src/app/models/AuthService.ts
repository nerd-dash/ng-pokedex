import { Observable } from 'rxjs';
import { AccessToken } from './AccessToken';
import { Service } from './Service';

export interface AuthService<K = any, T extends AccessToken<K> = any>
  extends Service {
  register$: (loginData: any) => Observable<T>;
  login$: (loginData: any) => Observable<T>;
  loggedIn$: () => Observable<K>;
}
