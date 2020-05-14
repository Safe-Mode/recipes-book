import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export const BASE_URL_TOKEN = new InjectionToken<string>(environment.url.base);
export const AUTH_URL_TOKEN = new InjectionToken<string>(environment.url.auth);
export const API_KEY_TOKEN = new InjectionToken<string>(environment.apiKey);
