import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import config from '../../../../frontend_config.json';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }
  backend = config.backend;


  sign_up(auth: any): Observable<any> {
    return this.http.post<any>(this.backend + '/sign-up', auth);
  }

  sign_in(auth: any): Observable<any> {
    return this.http.post<any>(this.backend + '/sign-in', auth);
  }

  public is_authenticated(auth: any): any {
    return this.http.post(this.backend + '/is-authenticated', auth);
 }

 sign_out(auth: any): Observable<any> {
    return this.http.post<any>(this.backend + '/sign-out', auth);
  }

}
