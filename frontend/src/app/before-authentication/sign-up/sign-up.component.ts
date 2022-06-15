import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from "../../services/http.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../before-authentication.scss', './sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  can_show = false;
  can_show_2 = false;;

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
    private toastr: ToastrService,
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
        this.toastr.clear();
        this.toastr.error(err.error.message, 'Błąd');
      },
      complete: () => {}
    });
  }
}
