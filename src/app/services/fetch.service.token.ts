import { InjectionToken } from '@angular/core';
import { FetchService } from './fetch.service.interface';

export const FETCH_SERVICE = new InjectionToken<FetchService>('fetch-service');
