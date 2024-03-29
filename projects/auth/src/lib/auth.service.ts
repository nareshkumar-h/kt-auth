import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Config, AUTH_CONFIG } from './config';
import { AuthClient } from '@ks-sdk-client/rest';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loginSubject: any = new BehaviorSubject<any>(this.getUser());
  public currentUser: Observable<any>;

  private apiUrl: string;
  private role: string;
  private siteInfo: any;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(AUTH_CONFIG) private config: Config
  ) {
    this.currentUser = this.loginSubject.asObservable();
    this.apiUrl = config.API_ENDPOINT;
    this.role = config.USER_TYPE;
  }

  getHeaders() {
    let headers = new HttpHeaders();
    return headers;
  }

  getSiteInfo() {
    //  console.log("Get site info");
    if (!this.siteInfo) {
      this.siteInfo = JSON.parse(sessionStorage.getItem('SITE_INFO'));
    }
    return this.siteInfo;
  }

  headers = {};

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.loginSubject.next(null);
    this.router.navigateByUrl("auth/login");

  }


  getAuthClient() {
    return new AuthClient({
      headers: this.headers,
      environment: this.config.API_ENDPOINT,
    });
  }

  login(user) {
    user['role'] = this.role;
    let url = '';
    if (user.role == 'E') {
      url = this.apiUrl + 'v1/auth/emplogin';
    } else {
      url = this.apiUrl + 'v1/auth/login';
    }
    return this.http.post(url, user);
  }

  register(user) {
    user['role'] = this.role;
    let url = this.apiUrl + 'v1/auth/register';
    return this.http.post(url, user);
  }

  findOne(userId) {
    let url = this.apiUrl + 'v1/users/' + userId;
    return this.http.get(url);
  }

  isMentor() {
    return this.hasRoleAccess('T');
  }

  getLoggedInUsername() {
    let user = this.getUser();
    let username = null;
    if (user) {
      username = user.username;
    }
    return username;
  }

  getLoggedInGithubUsername() {
    let user = this.getUser();
    let username = null;
    if (user) {
      username = user.githubUsername;
    }
    return username;
  }

  getLoggedInOrg() {
    let user = this.getUser();
    let username = null;
    if (user) {
      username = user.organization;
    }
    return username;
  }

  getToken() {
    return localStorage.TOKEN;
  }

  getLoggedInUserId() {
    let user = this.getUser();
    let username = null;
    if (user) {
      username = user.id;
    }
    return username;
  }

  isAuthorized() {
    let user = this.getUser();
    if (user && user.username) {
      return true;
    }
    return false;
  }

  hasRoleAccess(roles) {
    let user = this.getUser();
    let allowed = false;
    if (user != null && roles != null && roles.length > 0) {
      for (let role of roles) {
        if (user.roles.indexOf(role) != -1) {
          allowed = true;
          break;
        }
      }
    }
    return allowed;
  }

  hasRole(user, roles) {
    let allowed = false;
    for (let role of roles) {
      if (user.roles.indexOf(role) != -1) {
        allowed = true;
        break;
      }
    }
    return allowed;
  }

  getUser(): any {
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    return userStr != null ? JSON.parse(userStr) : null;
  }

  getSelectedUser() {
    let user = localStorage.getItem('SELECTED_USER');
    return user ? user : this.getUser()?.username;
  }

  isLoggedIn(): boolean {
    var user = this.getUser();
    return this.getUser() != null && this.getUser().username != null;
  }

  activateAccount(account) {
    account['role'] = this.role;
    let url = this.apiUrl + 'v1/auth/activateAccount';
    return this.http.post(url, account);
  }

  setPassword(account) {
    account['role'] = this.role;
    let url = this.apiUrl + 'v1/auth/setPassword';
    return this.http.post(url, account);
  }

  resendActivateAccount(account) {
    account['role'] = this.role;
    let url =
      this.apiUrl + 'v1/auth/resend-activation-email?email=' + account.email;
    return this.http.post(url, account);
  }

  forgotPassword(account) {
    account['role'] = this.role;
    let url = this.apiUrl + 'v1/auth/forgotPassword';
    return this.http.post(url, account);
  }

  storeUser(user) {
    localStorage.setItem('LOGGED_IN_USER', JSON.stringify(user));
    localStorage.setItem('TOKEN', user.token);
    localStorage.setItem('SELECTED_USER', user['username']);
    this.loginSubject.next(user);
    // let username = res['login'];
    // let user = {
    //   id: res['id'],
    //   username: res['login'],
    //   githubUsername: res['login'],
    //   name: res['name'],
    //   email: res['email'],
    //   type: res['type'],
    //   created_at: res['created_at'],
    //   gravatar_id: res['gravatar_id'],
    //   avatar_url: res['avatar_url'],
    //   role: 'U',
    //   mode: 'github',
    // };
    /*
    this.findOne(username).subscribe((data) => {
      if (data) {
        user['username'] = data['username'];
        user['role'] = data['role'];
        user['name'] = data['name'];
      }
      this.securityService.set('LOGGED_IN_USER', JSON.stringify(user));
    });
    */
  }

  setSelectedUser(username) {
    localStorage.setItem('SELECTED_USER', username);
  }
}
