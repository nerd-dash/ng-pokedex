import { Observable } from "rxjs";
import { Service } from "./service.interface";

export interface GameStateService<T = any> extends Service {
    getRandom$: Observable<T>;
    verify$: (toBeTested: Partial<T>, verified: T) => Observable<boolean>;
    getNextRound: () => void;
}