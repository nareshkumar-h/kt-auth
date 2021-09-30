import { InjectionToken } from '@angular/core';

export class Config {
  API_ENDPOINT?: string;
  USER_TYPE?: string;
  ENCRYPTION?: boolean = false;
  REDIRECT_URI?: string;
  ALLOW_SIGNUP: boolean = false;
  ENVIRONMENT: string;
  APPLICATION: string;
}

export const AUTH_CONFIG = new InjectionToken<Config>('AUTH_CONFIG');
