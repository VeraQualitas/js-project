import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookiesService } from 'src/app/services/cookies.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['../after-authentication.scss', './account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private cookie: CookiesService,
    private router: Router) { }

  can_show = false;
  can_show_2 = false;
  can_show_3 = false;

  account = {
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    description: '',

    password: '',
    confirmPassword: '',
    currentPassword: ''
  }

  ngOnInit(): void {
    this.getMyself();
  }

  getMyself() {
    const tmp: string = this.cookie.get_session();

    this.http.get_myself(tmp).subscribe({
      next: response => {
        this.account = response.data.account;
      },
      error: err => {
        console.log(err);
        this.toastr.clear();
        this.toastr.error(err.error.message, 'Błąd');
      },
      complete: () => { }
    });
  }

  update() {
    const tmp: any = this.cookie.get_session();

    this.http.update_me(tmp, this.account).subscribe({
      next: response => {
        this.toastr.clear();
        this.toastr.success(response.message, 'Sukces');
        this.getMyself();
      },
      error: err => {
        console.log(err);
        this.toastr.clear();
        this.toastr.error(err.error.message, 'Błąd');
      },
      complete: () => { }
    });
  }

}
