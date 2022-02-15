import { Service } from '../models/Service';

export class UtilsService implements Service {
  getRandomIndex = <T>(array: Array<T>): number =>
    this.getRandomNumber(array.length);

  getRandomNumber = (maximun: number, minimun = 0) =>
    Math.floor(Math.random() * maximun - minimun + minimun);

  static ProvideSpy = () => ({
    getRandomIndex: () => 0,
  });
}
