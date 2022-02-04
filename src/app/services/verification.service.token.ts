import { InjectionToken } from '@angular/core';
import { VerificationService } from './verification.service.interface';


export const VERIFICATION_SERVICE = new InjectionToken<VerificationService>('verification-service');