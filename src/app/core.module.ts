import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { API_KEY_TOKEN, AUTH_URL_TOKEN, BASE_URL_TOKEN } from './config';
import { environment } from '../environments/environment';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';

@NgModule({
  providers: [
    {
      provide: BASE_URL_TOKEN,
      useValue: environment.url.base
    },
    {
      provide: AUTH_URL_TOKEN,
      useValue: environment.url.auth
    },
    {
      provide: API_KEY_TOKEN,
      useValue: environment.apiKey
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
})
export class CoreModule {
}
