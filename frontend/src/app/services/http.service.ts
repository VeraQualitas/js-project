import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import config from '../../../../frontend_config.json';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  backend = config.backend;

  register(credentials: any): Observable<any> {
    return this.http.post<any>(this.backend + '/accounts/register', credentials);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.backend + '/accounts/login', credentials);
  }

  authenticate(token: string): Observable<any> {
    return this.http.get<any>(
      this.backend + '/accounts/authenticate',
      {
        headers:
          new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          })
      }
    );
  }

}
