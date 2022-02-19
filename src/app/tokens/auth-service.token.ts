import { InjectionToken } from '@angular/core';
import { AuthService } from '../models/AuthService';

export const AUTH_SERVICE = new InjectionToken<AuthService>('auth-service');
