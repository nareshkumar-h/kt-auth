import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-github-sign',
  templateUrl: './github-sign.component.html',
  styleUrls: ['./github-sign.component.css'],
})
export class GithubSignComponent implements OnInit {
  code: string;
  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
    this.route.queryParams.subscribe((params) => {
      this.code = params['code'];
      console.log(this.code);
    });
  }

  ngOnInit(): void {
    if (this.code != null) {
      this.getToken();
    } else {
    }
  }

  getToken() {
    let url =
      'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token';
    let data = {
      code: this.code,
      client_id: 'fc639608910c9aceda7b',
      client_secret: 'd095ed0ee750d1eaf8c6e122eefb8153596bbf01',
      redirect_uri: 'https://projects.learn2build.in/auth/githublogin',
    };
    this.httpClient.post(url, data).subscribe((res) => {
      console.log(res);
      localStorage.setItem('GITHUB_TOKEN', JSON.stringify(res));
    });
  }

  loginWithGithub() {
    alert('Login with github app');
    let clientId = 'fc639608910c9aceda7b';
    let redirect_uri = 'https://projects.learn2build.in/auth/githublogin';
    let url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}`;
    window.location.href = url;
  }
}
