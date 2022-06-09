import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CookiesService} from './cookies.service';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpService} from "./http.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private cookies: CookiesService,
              private http: HttpService,
              private router: Router) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const token = this.cookies.get_session();
    if (token === '0') {
      this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
      return of(false);
    }
    return this.http.authenticate(token).pipe(map((response: any) => {
      if (response?.success) {
        return true;
      }
      else {
        this.router.navigate(['expired-session'], {queryParams: {returnUrl: state.url}});
        return false;
      }
    }), catchError((error) => {
      this.router.navigate(['something-went-wrong']);
      return of(false);
    }));
  }
}

@Injectable()
export class NotAuthGuardService implements CanActivate {
  constructor(private cookies: CookiesService,
              private http: HttpService,
              private router: Router) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const token = this.cookies.get_session();
    if (token === '0') {
      return of(true);
    }
    return this.http.authenticate(token).pipe(map((response: any) => {
      if (response?.success) {
        this.router.navigate(['not-signed-out'], {queryParams: {returnUrl: state.url}});
        return false;
      }
      else {
        return true;
      }
    }), catchError((error) => {
      return of(true);
    }));
  }
}
