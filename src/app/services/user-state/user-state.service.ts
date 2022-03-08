import { Inject, Injectable } from '@angular/core';
import { AccessToken } from 'src/app/models/AccessToken';
import { AuthStateService } from 'src/app/models/AuthStateService';
import { StorageService } from 'src/app/models/StorageService';
import { EMPTY_USER, User } from 'src/app/models/User';
import { USER_STORAGE_SERVICE } from 'src/app/tokens/user-storage-service.token';
import { StateService } from '../state/state.service';

const initialState: AccessToken<User> = {
  accessToken: '',
  payload: EMPTY_USER,
};

@Injectable({
  providedIn: 'root',
})
export class UserStateService
  extends StateService<AccessToken<User>>
  implements AuthStateService<User>
{
  constructor(
    @Inject(USER_STORAGE_SERVICE)
    private storageService: StorageService<AccessToken<User>>
  ) {
    super(initialState);
    this.initializeStateWithStorage();
  }

  updateToken = (token: AccessToken<User>) => {
    this.setState(token);
    this.storageService.setItem(token);
  };
  loggedIn$ = () => this.select((state) => state);

  private initializeStateWithStorage = () => {
    const token = this.storageService.getItem();
    if (token) {
      this.setState(token);
    }
  };
}
