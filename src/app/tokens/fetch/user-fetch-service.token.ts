import { InjectionToken } from '@angular/core';
import { FetchService } from '../../models/FetchService';
import { User } from '../../models/User';

export const USER_FETCH_SERVICE = new InjectionToken<FetchService<User>>(
  'user-fetch-service'
);
