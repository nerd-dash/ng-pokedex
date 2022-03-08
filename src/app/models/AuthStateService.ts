import { Observable } from 'rxjs';
import { AccessToken } from './AccessToken';

export interface AuthStateService<T> {
  updateToken: (token: AccessToken<T>) => void;
  loggedIn$: () => Observable<AccessToken<T>>;
}
