import { Injectable } from '@angular/core';
import { Service } from '../models/Service';
@Injectable({
  providedIn: 'root',
})
export class UtilsService implements Service {
  getRandomItem = <T>(array: Array<T>): T =>
    array[this.getRandomNumber(array.length)];

  getRandomNumber = (maximun: number, minimun = 0) =>
    Math.floor(Math.random() * maximun - minimun + minimun);

  hasTheSameName = <T extends { name: string }>(
    toBeTested: Partial<T>,
    verified: T
  ): boolean =>
    toBeTested.name?.toLocaleLowerCase() === verified.name.toLocaleLowerCase();
}
