import { Observable } from 'rxjs';
import { Service } from './Service';

export interface AuthService<T = any> extends Service {
  register$: (loginData: any) => Observable<T>;
  login$: (loginData: any) => Observable<T>;
}
