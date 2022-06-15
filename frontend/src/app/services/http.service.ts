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

  get_myself(token: string): Observable<any> {
    return this.http.get<any>(
      this.backend + '/accounts/me',
      {
        headers:
          new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          })
      }
    );
  }

  update_me(token: string, data: any): Observable<any> {
    return this.http.put<any>(
      this.backend + '/accounts/update', data,
      {
        headers:
          new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          })
      }
    );
  }

  get_stations(token: string): Observable<any> {
    return this.http.get<any>(
      this.backend + '/stations',
      {
        headers:
          new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          })
      }
    );
  }

  add_station(data: any): Observable<any> {
    const { token, ...rest } = data;
    return this.http.post<any>(
      this.backend + '/stations', rest,
      {
        headers:
          new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          })
      }
    );
  }

  edit_station(data: any, stationId: any): Observable<any> {
    const { token, ...rest } = data;
    return this.http.put<any>(
      this.backend + '/stations/' + stationId, rest,
      {
        headers:
          new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          })
      }
    );
  }

  delete_station(token: string, stationId: any): Observable<any> {
    return this.http.delete<any>(
      this.backend + '/stations/' + stationId.toString(),
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
