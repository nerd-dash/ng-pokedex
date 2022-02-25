import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PublishableService } from 'src/app/models/PublishableService';
import { EMPTY_USER, User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root',
})
export class PublishableUserService implements PublishableService<User> {
  private subject = new BehaviorSubject<User>(EMPTY_USER);

  asObservable$ = () => this.subject.asObservable();
  next = (value: User) => this.subject.next(value);
}
