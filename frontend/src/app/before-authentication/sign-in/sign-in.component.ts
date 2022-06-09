import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../before-authentication.scss','./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private http: HttpService,
    private router: Router,
    private cookie: CookiesService
  ) { }

  account = {
    email: '',
    password: ''
  }

  

  ngOnInit(): void {
  }

  login() {
    const tmp: any = { ...this.account };

    this.http.login(tmp).subscribe({
      next: response => { 
        console.log(response.data.accessToken); 
        this.cookie.set_session(response.data.accessToken);
        this.router.navigate(['']); 
      },
      error: err => {
        console.log(err);
      },
      complete: () => {}
    });
  }

}
