import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookiesService } from 'src/app/services/cookies.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['../after-authentication.scss', './vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

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
  vehicles: Array<any> = [];

  vehicleFields = [
    'vehicleName',
    'registration',
    'producer',
    'trademark',
    'type',
    'productionDate',
    'VIN',
    'operationalNumber',
    'fuelType',
    'fuelCapacity',
    'waterCapacity',
    'nextInspectionDate',
    'CNBOP',
    'nextInsuranceTerm',
    'policyNumber',
    'additionalInfo',
    'comments'
  ]

  vehicleFieldsTranslate: any = {
    'vehicleName': 'Nazwa pojazdu',
    'registration': 'Rejestracja',
    'producer': 'Producent',
    'trademark': 'Marka pojazdu',
    'type': 'Rodzaj pojazdu',
    'productionDate': 'Data produkcji',
    'VIN': 'VIN',
    'operationalNumber': 'Numer operacyjny',
    'fuelType': 'Rodzaj paliwa',
    'fuelCapacity': 'Pojemność baku',
    'waterCapacity': 'Pojemność zbiornika na wodę',
    'nextInspectionDate': 'Data przeglądu',
    'CNBOP': 'CNBOP',
    'nextInsuranceTerm': 'Data ubezpieczenia',
    'policyNumber': 'Numer polisy',
    'additionalInfo': 'Dodatkowe informacje',
    'comments': 'Komentarze'
  }

  vehicle: any = {
    vehicleName: '',
    registration: '',
    producer: '',
    trademark: '',
    type: '',
    productionDate: '',
    VIN: '',
    operationalNumber: '',
    fuelType: '',
    fuelCapacity: '',
    waterCapacity: '',
    nextInspectionDate: '',
    CNBOP: '',
    nextInsuranceTerm: '',
    policyNumber: '',
    additionalInfo: '',
    comments: ''
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
    const tmp: any = { ...this.vehicle, token: this.cookie.get_session() };

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
    const { stationId, ...rest } = this.vehicle;
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
    this.vehicle = {
      stationName: '',
      country: '',
      city: '',
      street: '',
      postalCode: '',
      description: ''
    }
  }

}
