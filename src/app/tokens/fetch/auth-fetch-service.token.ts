import { InjectionToken } from '@angular/core';
import { AuthFetchService } from '../../models/AuthFetchService';
import { User } from '../../models/User';

export const AUTH_FETCH_SERVICE = new InjectionToken<AuthFetchService<User>>(
  'auth-fetch-service'
);
