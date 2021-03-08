import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'lib-send-activation-mail',
  templateUrl: './send-activation-mail.component.html',
  styleUrls: ['./send-activation-mail.component.css']
})
export class SendActivationMailComponent implements OnInit {

  
  siteInfo:any;

  constructor(private authService:AuthService, private router:Router, private toastr:ToastrService, private route:ActivatedRoute) { 
   
  }

  ngOnInit(): void {
    this.siteInfo = this.authService.getSiteInfo();
  }

  
  account:any = { email: null, key:null} ;
  processing = false;
  activateAccount(){
    console.log(this.account);
    this.processing = true;
    this.authService.resendActivateAccount(this.account).subscribe (res=>{
      console.log(res);
      this.processing = false;
      this.toastr.success("Account Activation link sent to your email.");
      //this.router.navigate(["auth/login"]);
    },err=>{
      this.processing = false;
      console.log(err.error);
      this.toastr.error(err.error.errorMessage);
    });
  }

  
  navigate(url){
    console.log(url);
    this.router.navigate([url]);
  }


}
