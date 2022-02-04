import { Service } from "./service.interface";

export class UtilsService implements Service {
  getRandomIndex = <T>(array: Array<T>): number => Math.floor(Math.random() * array.length);

  static ProvideSpy = () => ({
    getRandomIndex: () => 0
  })
}
