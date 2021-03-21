import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'ut-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css'],
})
export class AuthorizeComponent implements OnInit {
  code: string;
  constructor(private auth: AuthService, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((params) => {
      this.code = params['code'];
    });
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((res) => {
      let user = {
        username: res.nickname,
        name: res.name,
        picture: res.picture,
        email: res.email,
      };
      localStorage.setItem('USER_DETAILS', JSON.stringify(res));
    });

    this.auth.getAccessTokenSilently().subscribe((res) => {
      localStorage.setItem('TOKEN_DETAILS', res);
    });
  }
}
