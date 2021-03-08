import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'lib-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  
  siteInfo:any;
  key:string;

  constructor(private authService:AuthService, private router:Router, private toastr:ToastrService, private route:ActivatedRoute) { 
    this.route.params.subscribe(params=>{      
      this.key = params["key"];
    });
  }

  ngOnInit(): void {
    this.siteInfo = this.authService.getSiteInfo();
  }

  account:any = { email: null, password:null, key:null} ;

  processing  = false;
  setPassword(){
    
    this.processing = true;
    this.account["key"] = this.key;
    console.log(this.account);
    this.authService.setPassword(this.account).subscribe (res=>{
      console.log(res);
      this.processing = false;
      this.toastr.success("Successfully Password Updated");
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
