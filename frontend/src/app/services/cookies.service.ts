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

  public get_session_data(): any {
    let session = ({
      session_id: 0,
      token: '0',
      account_id: 0
    });
    if (this.cookieService.check('session_id')) {
      session.session_id = Number((this.cookieService.get('session_id')));
      session.token = this.cookieService.get('token');
      session.account_id = Number(this.cookieService.get('account_id'));
    } else {
      this.cookieService.set('session_id', '0', {path: '/'});
      this.cookieService.set('token', '0', {path: '/'});
      this.cookieService.set('account_id', '0', {path: '/'});
    }
    return session;
  }

  public clear_session_data(): void {
    this.cookieService.delete('session_id');
    this.cookieService.delete('token');
    this.cookieService.delete('account_id');
    this.get_session_data();
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
