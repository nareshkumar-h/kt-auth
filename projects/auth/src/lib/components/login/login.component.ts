import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AUTH_CONFIG, Config } from '../../config';
import { SecurityService } from '../../security/security.service';

@Component({
  selector: 'kt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private redirectUrl: string;
  errors: any = [];
  userType: string;
  siteInfo: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    @Inject(AUTH_CONFIG) public config: Config,
    private secureService: SecurityService
  ) {
    this.userType = this.config.USER_TYPE;

    this.siteInfo = this.authService.getSiteInfo();
    this.redirectUrl = this.config.REDIRECT_URI;
  }

  showLeftbox: boolean = false;

  ngOnInit(): void {
    this.checkLogin();
    this.initLoginForm();

    // redirect back to the returnUrl before login
    this.route.queryParams.subscribe((params) => {
      this.redirectUrl = params['redirectUrl'] || '/';
      //   console.log(this.redirectUrl);
    });
  }

  user = { email: null, password: null, role: 'U' };

  checkLogin() {
    if (this.secureService.isAuthenticated()) {
      console.log('Already loggedin..redirecting to homepage');
      let user = this.authService.getUser();
      this.redirectToHomepage(user);
    }
  }

  redirectToHomepage(USER: any) {
    console.log('RedirectUrl:' + this.redirectUrl);

    if (this.redirectUrl) {
      window.location.href = this.redirectUrl ? this.redirectUrl : '/';
      // this.router.navigate([this.redirectUrl]);
      //this.router.navigateByUrl(this.redirectUrl);
    }
  }

  loginBtnLabel: string = 'Submit';

  loginForm: FormGroup;

  processing = false;
  initLoginForm() {
    this.loginForm = this.fb.group({
      email: [
        'email',
        Validators.compose([
          Validators.required,
          //Validators.email,
          Validators.minLength(5),
          Validators.maxLength(50), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        'password',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  login() {
    const controls = this.loginForm.controls;
    /** check form */
    // if (this.loginForm.invalid) {
    // 	Object.keys(controls).forEach(controlName =>
    // 		controls[controlName].markAsTouched()
    // 	);
    // 	return;
    // }

    this.processing = true;
    if (this.userType == 'U') {
      this.user['role'] = this.userType;
    } else {
      this.user['role'] = 'E';
    }
    try {
      this.authService
        .getAuthClient()
        .login(this.user)
        .then(
          (res) => {
            console.log('Response', res);
            this.processing = false;
            this.toastr.success('Login Success', '', { timeOut: 1000 });
            let responseUser = res;
            responseUser.organization = this.config.ORG_ID;
            this.authService.storeUser(responseUser);

            this.redirectToHomepage(responseUser);
          },
          (err) => {
            console.log(err.response.data);
            let error = err.response.data;

            this.processing = false;
            let message = 'Invalid Login Credentials';
            if (error?.errorMessage) {
              message = error?.errorMessage;
            }
            this.toastr.error(message);
          }
        );
    } catch (err) {
      console.log('Error', err);
    }
  }

  navigate(url) {
    console.log(url);
    this.router.navigate([url]);
  }
}
