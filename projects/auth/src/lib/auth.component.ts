import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'au-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  siteInfo:any;
  constructor(private authService:AuthService, public sanitizer:DomSanitizer){
      
  }

  ngOnInit(): void {
    this.siteInfo = this.authService.getSiteInfo();
  }

  cssUrl="https://kt-theme.netlify.app/css/theme.css";

}
