import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  siteInfo:any;

  constructor(private authService:AuthService, private router:Router, private toastr:ToastrService, private route:ActivatedRoute) { 
    this.route.queryParams.subscribe(params=>{
      this.account["email"] = params["email"];
      this.account["key"] = params["key"];
      if(params.length>=2){
        this.activateAccount();
      }
    });
  }

  ngOnInit(): void {
    this.siteInfo = this.authService.getSiteInfo();
  }

  account:any = { email: null, key:null} ;

  processing = false;
  activateAccount(){
    console.log(this.account);
    this.processing = true;
    this.authService.activateAccount(this.account).subscribe (res=>{
      console.log(res);
      this.processing = false;
      this.toastr.success("Successfully Account Activated");
      this.router.navigate(["auth/login"]);
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
