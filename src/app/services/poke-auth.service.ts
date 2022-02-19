import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccessToken } from '../models/AccessToken';
import { AuthService } from '../models/AuthService';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class PokeAuthService implements AuthService<AccessToken<User>> {
  constructor(private httpClient: HttpClient) {}
  login$ = (loginData: Partial<User>) =>
    this.httpClient.post<AccessToken<User>>(
      `${environment.SERVER_BASE_URL}/login`,
      { ...loginData }
    );

  register$ = (data: Partial<User>) =>
    this.httpClient.post<AccessToken<User>>(
      `${environment.SERVER_BASE_URL}/register`,
      { ...data }
    );
}
