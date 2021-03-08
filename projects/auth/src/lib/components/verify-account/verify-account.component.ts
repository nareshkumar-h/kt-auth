import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'lib-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

  siteInfo:any;
  
  key:string;
  constructor(private authService:AuthService, private router:Router, private toastr:ToastrService, private route:ActivatedRoute) { 
    this.route.params.subscribe(params=>{
      this.key = params["key"];      
    });
  }

  infoMessage:string;
  errorMessage:string;

  ngOnInit(): void {
    this.siteInfo = this.authService.getSiteInfo();
    if(this.key && this.key.length>0){
      this.activateAccount();
    }
  }

  account:any = { key:null} ;

  processing = true;
  activateAccount(){
    
    let account = { key: this.key};
    this.authService.activateAccount(account).subscribe (res=>{
      console.log(res);
      this.processing = false;
      this.toastr.success("Successfully Account Activated");
      this.infoMessage = "Successfully Account Activated";
     // this.router.navigate(["auth/login"]);
    },err=>{
      this.processing = false;
      console.log(err.error);
      this.toastr.error(err.error.errorMessage);
      this.errorMessage = err.error.errorMessage;
    });
  }

  
  navigate(url){
    console.log(url);
    this.router.navigate([url]);
  }

}
