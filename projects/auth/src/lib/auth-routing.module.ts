import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { AuthComponent } from './auth.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { SendActivationMailComponent } from './components/send-activation-mail/send-activation-mail.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { GithubSignComponent } from './components/github-sign/github-sign.component';
import { MentorLoginComponent } from './components/mentor-login/mentor-login.component';
import { AuthorizeComponent } from './components/authorize/authorize.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'authorize', component: AuthorizeComponent },
      { path: 'mentorlogin', component: MentorLoginComponent },
      { path: 'githublogin', component: GithubSignComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgotPassword', component: ForgotPasswordComponent },
      { path: 'activateAccount', component: ActivateAccountComponent },
      { path: 'setpassword/:key', component: SetPasswordComponent },
      { path: 'send-activation-mail', component: SendActivationMailComponent },
      { path: 'verify/:key', component: VerifyAccountComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
