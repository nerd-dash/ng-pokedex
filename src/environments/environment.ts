// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { HttpParams } from '@angular/common/http';

export const environment = {
  production: false,
  POKE_SERVER_BASE_URL: 'http://localhost:3000/pokemon',
  UNSEEN_POKE_QUERY_PARAMS: new HttpParams()
    .set('seen', 'false')
    .set('_limit', '1'),
  PAGE_QUERY_PARAM_KEY: '_page',
  INTIAL_UNSEEN_POKE_COUNT: 151,
  COUNT_HEADER_NAME: 'x-total-count',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
