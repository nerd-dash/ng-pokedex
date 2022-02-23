import { InjectionToken } from '@angular/core';
import { PublishableService } from '../models/PublishableService';

export const PUBLISHABLE_SERVICE = new InjectionToken<PublishableService>(
  'publishable-service'
);
