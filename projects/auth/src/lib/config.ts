import { InjectionToken } from '@angular/core';

export class Config {
  API_ENDPOINT?: string;
  ORG_ID?: string;
  USER_TYPE?: string;
  ENCRYPTION?: boolean = false;
  REDIRECT_URI?: string;
}

export const AUTH_CONFIG = new InjectionToken<Config>('AUTH_CONFIG');
