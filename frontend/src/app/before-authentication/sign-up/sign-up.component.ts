import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../before-authentication.scss', './sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  can_show = false;

  email = '';
  password = '';
  confirm_password = '';
  firstname = '';
  lastname = '';
  phone = '';



  constructor(private http: HttpService) {
  }

  ngOnInit(): void {
  }

  sign_up() {
    const tmp: any = {
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password,
      firstname: this.firstname,
      lastname: this.lastname,
      phone: this.phone,
    };
    // this.alert.warning('Wysyłanie...');
    this.http.sign_up(tmp).subscribe({
      next: response => { console.log(response); },
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
  editWorker(/*arg*/): void {
    // for (const a of arg) {
    //   a.control.markAllAsTouched();
    // }
    // const sessionkey = this.authService.get_session_key();
    // for (const worker of this.workers) {
    //   if (worker.checked) {
    //     this.userToEdit = worker.email;
    //     this.selectedId = worker.account_id;
    //   }
    // }
  }


}
