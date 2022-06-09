import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from "../../services/http.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../before-authentication.scss', './sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  can_show = false;

  account = {
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    description: '',

    password: '',
    confirmPassword: ''
  }

  constructor(
    private http: HttpService,
    private router: Router
    ) {}

  ngOnInit(): void {
  }

  register() {
    const tmp: any = { ...this.account };
    // this.alert.warning('Wysyłanie...');
    this.http.register(tmp).subscribe({
      next: response => { console.log(response); this.router.navigate(['login']); },
      error: err => {
        console.log(err);
        // this.alert.clear();
        // this.alert.error(err.error[responses.message], 'Błąd');
        // this.getOrganizationInfo();
      },
      complete: () => {
        // this.alert.clear();
        // this.alert.success('Zmieniono pomyślnie.', 'Sukces!');
        // this.getOrganizationInfo();
        // this.closeModal();

      }
    });
  }
}
