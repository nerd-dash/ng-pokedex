import { Injectable } from '@angular/core';
import { AccessToken } from 'src/app/models/AccessToken';
import { StorageService } from 'src/app/models/StorageService';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService implements StorageService<AccessToken<User>> {
  STORAGE_TOKEN = `access-token-user`;

  constructor() {}
  getItem = () => {
    const str = <string>localStorage.getItem(this.STORAGE_TOKEN);
    return <AccessToken<User>>JSON.parse(str);
  };
  setItem = (item: AccessToken<User>) =>
    localStorage.setItem(this.STORAGE_TOKEN, JSON.stringify(item));

  clear = () => localStorage.removeItem(this.STORAGE_TOKEN);
}
