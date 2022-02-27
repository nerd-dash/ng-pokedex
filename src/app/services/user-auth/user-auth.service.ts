import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AccessToken } from 'src/app/models/AccessToken';
import { AuthService } from 'src/app/models/AuthService';
import { PublishableService } from 'src/app/models/PublishableService';
import { StorageService } from 'src/app/models/StorageService';
import { User } from 'src/app/models/User';
import { PUBLISHABLE_SERVICE } from 'src/app/tokens/publishable-service.token';
import { STORAGE_SERVICE } from 'src/app/tokens/user-storage-service.token';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService implements AuthService<User, AccessToken<User>> {
  constructor(
    @Inject(PUBLISHABLE_SERVICE) private publishable: PublishableService<User>,
    @Inject(STORAGE_SERVICE)
    private storageService: StorageService<AccessToken<User>>,
    private httpClient: HttpClient
  ) {}
  login$ = (loginData: Partial<User>) =>
    this.httpClient
      .post<AccessToken<User>>(`${environment.SERVER_BASE_URL}/login`, {
        ...loginData,
      })
      .pipe(
        tap((data) => {
          this.storageService.setItem(data);
          this.publishable.next(data.payload);
        })
      );

  register$ = (data: Partial<User>) =>
    this.httpClient.post<AccessToken<User>>(
      `${environment.SERVER_BASE_URL}/register`,
      { ...data }
    );

  loggedIn$ = () => this.publishable.asObservable$();
}
