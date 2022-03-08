import { AUTH_ROUTES } from 'src/app/models/RoutesMap';
import { environment } from 'src/environments/environment';

export const USER_AUTH_ENDPOINTS = {
  Login: `${environment.LOGIN_SERVER_BASE_URL}/${AUTH_ROUTES.Login}`,
  Register: `${environment.LOGIN_SERVER_BASE_URL}/${AUTH_ROUTES.Register}`,
};

export const UserAuthEndpointList = Object.values(USER_AUTH_ENDPOINTS);
