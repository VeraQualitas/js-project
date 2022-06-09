import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

import config from '../../../../frontend_config.json';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {


  constructor(private http: HttpClient,
              private cookieService: CookieService) {
  }

  backend = config.backend;

  public get_session(): any {
    let token = '0';

    if (this.cookieService.check('token')) {
      token = this.cookieService.get('token');
    } else {
      this.cookieService.set('token', '0', {path: '/'});
    }
    return token;
  }

  public clear_session(): void {
    this.cookieService.delete('token');
    this.get_session();
  }

  public set_session(token: string) {
    this.cookieService.set('token', token, {path: '/'});
  }


  public get_mode_data() {
    if (this.cookieService.check('mode')) {
      return this.cookieService.get('mode');
    } else {
      this.cookieService.set('mode', 'light', {path: '/'});
      return 'light';
    }
  }

  public change_mode_data() {
    let current_mode = 'dark';
    if (this.cookieService.check('mode')) {
      current_mode = this.cookieService.get('mode');
    }
    if (current_mode === 'light') {
      this.cookieService.set('mode', 'dark', {path: '/'});
      return this.cookieService.get('mode');
    }
    else {
      this.cookieService.set('mode', 'light', {path: '/'});
      return this.cookieService.get('mode');
    }
  }
}
