import { InjectionToken } from '@angular/core';
import { Environment } from 'src/app/models/Environment';

export const ENVIRONMENT = new InjectionToken<Environment>('environment');
