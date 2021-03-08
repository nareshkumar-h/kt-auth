import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { Config, AUTH_CONFIG } from '../../config';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  private userType:string;
  siteInfo:any;
  constructor(private authService:AuthService, private router:Router,private toastr:ToastrService,
    @Inject(AUTH_CONFIG) private config: Config) { 
      this.userType = this.config.USER_TYPE;
    }

  ngOnInit(): void {
    this.siteInfo = this.authService.getSiteInfo();
  }

  account:any = { email : null, role: null};
  processing = false;
  submit(){
    this.processing = true;
    this.account["role"] = this.userType;
    this.authService.forgotPassword(this.account).subscribe (res=>{
      console.log(res);
      this.account = { email : null, role: null};
      this.toastr.success("Password reset link sent to your email.");
      this.processing = false;
    },err=>{
      console.log(err);
      this.toastr.error(err.error.errorMessage);
      this.processing = false;
    });
  }

  
  navigate(url){
    console.log(url);
    this.router.navigate([url]);
  }
}
