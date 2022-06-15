import {ChangeDetectorRef, Component} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {CookiesService} from "./services/cookies.service";
import {HttpService} from "./services/http.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mOSP';
  dark = 'dark';
  light = 'light';
  current_mode: any;
  mobileQuery: MediaQueryList;

  email = '';

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private router: Router,
              private cookies: CookiesService,
              private http: HttpService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit() {
    this.current_mode = this.cookies.get_mode_data();
    if(this.current_mode === this.dark) {
      document.body.classList.add(this.dark);
    }
    else {
      document.body.classList.remove(this.dark);
    }
  }

  change_mode() {
    this.current_mode = this.cookies.change_mode_data();
    if(this.current_mode === this.dark) {
      document.body.classList.add(this.dark);
    }
    else {
      document.body.classList.remove(this.dark);
    }
  }

  sign_out() {
    this.cookies.delete_session();
    document.location.reload();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
