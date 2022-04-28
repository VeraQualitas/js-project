import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../before-authentication.scss','./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor() { }

  email = '';
  password = '';

  ngOnInit(): void {
  }

  sign_in() {

  }

}
