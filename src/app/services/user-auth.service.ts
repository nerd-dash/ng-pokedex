import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccessToken } from '../models/AccessToken';
import { AuthService } from '../models/AuthService';
import { PublishableService } from '../models/PublishableService';
import { User } from '../models/User';
import { PUBLISHABLE_SERVICE } from '../tokens/publishable-service.token';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService implements AuthService<User, AccessToken<User>> {
  constructor(
    @Inject(PUBLISHABLE_SERVICE) private publishable: PublishableService<User>,
    private httpClient: HttpClient
  ) {}
  login$ = (loginData: Partial<User>) =>
    this.httpClient
      .post<AccessToken<User>>(`${environment.SERVER_BASE_URL}/login`, {
        ...loginData,
      })
      .pipe(tap((data) => this.publishable.next(data.payload)));

  register$ = (data: Partial<User>) =>
    this.httpClient.post<AccessToken<User>>(
      `${environment.SERVER_BASE_URL}/register`,
      { ...data }
    );

  loggedIn$ = () => this.publishable.asObservable$();
}
