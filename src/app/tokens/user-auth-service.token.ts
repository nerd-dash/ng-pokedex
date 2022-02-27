import { InjectionToken } from '@angular/core';
import { AuthService } from '../models/AuthService';
import { User } from '../models/User';

export const USER_AUTH_SERVICE = new InjectionToken<AuthService<User>>(
  'user-auth-service'
);
