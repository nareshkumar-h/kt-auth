import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';
import { AUTH_CONFIG,  Config } from '../../config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  siteInfo:any;
  code:string;
  userType:string;

  constructor(private authService: AuthService,  private router: Router, private route: ActivatedRoute,private toastr:ToastrService,
    @Inject(AUTH_CONFIG) private config: Config) { 
      this.userType = this.config.USER_TYPE;

    this.route.queryParams.subscribe ( params =>{
      this.code = params['code'];
      console.log("register:" + this.code);
    });
  }

  ngOnInit(): void {
    this.siteInfo = this.authService.getSiteInfo();
  }

  user =  {username:null, name:null, email: null, password: null, role:"U"};

  processing = false;
  register(){
   this.processing = true;
    if(this.userType){
      this.user["role"] = this.userType;
    }

    this.authService.register(this.user).subscribe( res=>{
      this.processing = false;
      this.toastr.success("Successfully Registered. Account Activation link sent to your email.");      
      this.router.navigate (['/auth/login']);  
    },err=>{          
      this.processing = false;
      this.toastr.error(err.error.errorMessage);
    });
  }

  
  navigate(url){
    console.log(url);
    this.router.navigate([url]);
  }

}
