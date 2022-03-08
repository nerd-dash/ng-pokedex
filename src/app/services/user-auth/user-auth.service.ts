import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AccessToken } from 'src/app/models/AccessToken';
import { AuthFetchService } from 'src/app/models/AuthFetchService';
import { AuthStateService } from 'src/app/models/AuthStateService';
import { User } from 'src/app/models/User';
import { USER_STATE_SERVICE } from 'src/app/tokens/game-state/user-state-service.token';
import { USER_AUTH_ENDPOINTS } from './user-auth.endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService implements AuthFetchService<User> {
  constructor(
    @Inject(USER_STATE_SERVICE)
    private stateService: AuthStateService<User>,
    private httpClient: HttpClient
  ) {}
  login$ = (loginData: Partial<User>) =>
    this.httpClient
      .post<AccessToken<User>>(USER_AUTH_ENDPOINTS.Login, {
        ...loginData,
      })
      .pipe(
        tap((data) => {
          this.stateService.updateToken(data);
        })
      );

  register$ = (data: Partial<User>) =>
    this.httpClient.post<AccessToken<User>>(USER_AUTH_ENDPOINTS.Register, {
      ...data,
    });
}
