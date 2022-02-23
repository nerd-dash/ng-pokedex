import { InjectionToken } from '@angular/core';
import { FetchService } from '../../models/FetchService';
import { Sighting } from '../../models/Sighting';

export const SIGHTING_FETCH_SERVICE = new InjectionToken<
  FetchService<Sighting>
>('sighting-fetch-service');
