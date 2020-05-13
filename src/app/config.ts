import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export const BASE_URL_TOKEN = new InjectionToken<string>(environment.baseUrl);
