export interface StorageService<T = any> {
  STORAGE_TOKEN: string;
  getItem: () => T;
  setItem: (item: T) => void;
  clear: () => void;
}
