import { HttpParams } from '@angular/common/http';

export const environment = {
  production: true,
  POKE_SERVER_BASE_URL: 'http://localhost:3000/pokemon',
  UNSEEN_POKE_QUERY_PARAMS: new HttpParams()
    .set('seen', 'false')
    .set('_limit', '1'),
  PAGE_QUERY_PARAM_KEY: '_page',
  INTIAL_UNSEEN_POKE_COUNT: 151,
  COUNT_HEADER_NAME: 'x-total-count',
};
