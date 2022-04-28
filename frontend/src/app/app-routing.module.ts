import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from "./before-authentication/sign-up/sign-up.component";
import {SignInComponent} from "./before-authentication/sign-in/sign-in.component";
import {HomeComponent} from "./after-authentication/home/home.component";
import {NotSignedOutComponent} from "./after-authentication/not-signed-out/not-signed-out.component";
import {SomethingWentWrongComponent} from "./something-went-wrong/something-went-wrong.component";
import {ExpiredSessionComponent} from "./before-authentication/expired-session/expired-session.component";
import {AuthGuardService, NotAuthGuardService} from "./services/auth-guard.service";

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [NotAuthGuardService]
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [NotAuthGuardService]
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'not-signed-out',
    component: NotSignedOutComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'expired-session',
    component: ExpiredSessionComponent,
    canActivate: [NotAuthGuardService]
  },
  {
    path: 'something-went-wrong',
    component: SomethingWentWrongComponent,
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
