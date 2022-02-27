import { InjectionToken } from '@angular/core';
import { StorageService } from '../models/StorageService';

export const STORAGE_SERVICE = new InjectionToken<StorageService>(
  'storage-service'
);
