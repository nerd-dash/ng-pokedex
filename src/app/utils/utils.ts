export const getRandomIndex = <T>(array: Array<T>): number =>
  Math.floor(Math.random() * array.length);
