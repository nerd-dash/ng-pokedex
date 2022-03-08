import { InjectionToken } from '@angular/core';
import { AccessToken } from '../models/AccessToken';
import { StorageService } from '../models/StorageService';
import { User } from '../models/User';

export const USER_STORAGE_SERVICE = new InjectionToken<
  StorageService<AccessToken<User>>
>('user-storage-service');
