import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookiesService } from 'src/app/services/cookies.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['../after-authentication.scss', './members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(
    private http: HttpService,
    private toastr: ToastrService,
    private cookie: CookiesService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllStations();
  }

  showAdding = false;
  showEditting = false;

  fireStations: Array<any> = [];

  stationFields = [
    'stationName',
    'country',
    'city',
    'street',
    'postalCode',
    'description'
  ]

  stationFieldsTranslate: any = {
    'stationName': 'Nazwa jednostki',
    'country': 'Kraj',
    'city': 'Miasto',
    'street': 'Ulica',
    'postalCode': 'Kod pocztowy',
    'description': 'Opis jednostki'
  }

  station: any = {
    stationName: '',
    country: '',
    city: '',
    street: '',
    postalCode: '',
    description: ''
  }

  currentStation: any;

  getAllStations() {
    const tmp: string = this.cookie.get_session();

    this.http.get_stations(tmp).subscribe({
      next: response => {
        this.fireStations = response.data.stations;
        this.currentStation = this.fireStations[0];
      },
      error: err => {
        console.log(err);
        this.toastr.clear();
        this.toastr.error(err.error.message, 'Błąd');
      },
      complete: () => { }
    });
  }

  add() {
    const tmp: any = { ...this.station, token: this.cookie.get_session() };

    this.http.add_station(tmp).subscribe({
      next: response => {
        this.toastr.clear();
        this.toastr.success(response.message, 'Sukces');
        this.getAllStations();
      },
      error: err => {
        console.log(err);
        this.toastr.clear();
        this.toastr.error(err.error.message, 'Błąd');
      },
      complete: () => { }
    });
  }

  edit() {
    const { stationId, ...rest } = this.station;
    const tmp: any = { ...rest, token: this.cookie.get_session() };

    this.http.edit_station(tmp, stationId).subscribe({
      next: response => {
        this.toastr.clear();
        this.toastr.success(response.message, 'Sukces');
        this.getAllStations();
      },
      error: err => {
        console.log(err);
        this.toastr.clear();
        this.toastr.error(err.error.message, 'Błąd');
      },
      complete: () => { }
    });
  }

  delete(stationId: any) {
    this.http.delete_station(this.cookie.get_session(), stationId).subscribe({
      next: response => {
        this.toastr.clear();
        this.toastr.success(response.message, 'Sukces');
        this.getAllStations();
      },
      error: err => {
        console.log(err);
        this.toastr.clear();
        this.toastr.error(err.error.message, 'Błąd');
      },
      complete: () => { }
    });
  }

  deepcopy(dict: any) {
    return { ...dict };
  }

  clear() {
    this.station = {
      stationName: '',
      country: '',
      city: '',
      street: '',
      postalCode: '',
      description: ''
    }
  }

}
