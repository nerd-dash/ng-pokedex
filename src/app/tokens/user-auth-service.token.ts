import { InjectionToken } from '@angular/core';
import { AuthService } from '../models/AuthService';

export const USER_AUTH_SERVICE = new InjectionToken<AuthService>(
  'user-auth-service'
);
