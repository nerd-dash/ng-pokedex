import { InjectionToken } from '@angular/core';
import { AuthStateService } from '../../models/AuthStateService';
import { User } from '../../models/User';

export const USER_STATE_SERVICE = new InjectionToken<AuthStateService<User>>(
  'user-state-service'
);
