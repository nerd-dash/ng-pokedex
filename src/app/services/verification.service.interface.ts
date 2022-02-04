import { Service } from "./service.interface";

export interface VerificationService<T = any> extends Service {
    verify: (toBeTeste: Partial<T>, verified: T) => boolean
}