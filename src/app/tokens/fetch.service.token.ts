import { InjectionToken } from '@angular/core';
import { FetchService } from '../models/FetchService';

export const FETCH_SERVICE = new InjectionToken<FetchService>('fetch-service');
