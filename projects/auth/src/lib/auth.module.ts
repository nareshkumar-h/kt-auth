import {
  NgModule,
  ModuleWithProviders,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { CommonModule } from '@angular/common';
import { AUTH_CONFIG, Config } from './config';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { SendActivationMailComponent } from './components/send-activation-mail/send-activation-mail.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { GithubSignComponent } from './components/github-sign/github-sign.component';
import { MentorLoginComponent } from './components/mentor-login/mentor-login.component';
import { SecurityModule } from './security/security.module';
import { TokenComponent } from './components/token/token.component';
import { AuthorizeComponent } from './components/authorize/authorize.component';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    ForgotPasswordComponent,
    VerifyAccountComponent,
    SendActivationMailComponent,
    SetPasswordComponent,
    GithubSignComponent,
    MentorLoginComponent,
    TokenComponent,
    AuthorizeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SecurityModule.forRoot(),
    AuthRoutingModule,
  ],
  providers: [AuthService, AuthGuard],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    ForgotPasswordComponent,
  ],
})
export class AuthModule {
  static forRoot(config: Config): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: AuthHttpInterceptor,
        //   multi: true,
        // },
        AuthService,
        AuthGuard,
        { provide: AUTH_CONFIG, useValue: config },
      ],
    };
  }
}
