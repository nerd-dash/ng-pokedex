export interface AccessToken<T = any> {
  accessToken: string;
  refreshToken?: string;
  payload?: T;
}
