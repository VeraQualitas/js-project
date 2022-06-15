import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from "./before-authentication/sign-up/sign-up.component";
import {SignInComponent} from "./before-authentication/sign-in/sign-in.component";
import {HomeComponent} from "./after-authentication/home/home.component";
import {NotSignedOutComponent} from "./after-authentication/not-signed-out/not-signed-out.component";
import {SomethingWentWrongComponent} from "./something-went-wrong/something-went-wrong.component";
import {ExpiredSessionComponent} from "./before-authentication/expired-session/expired-session.component";
import {AuthGuardService, NotAuthGuardService} from "./services/auth-guard.service";
import { FirestationsComponent } from './after-authentication/firestations/firestations.component';
import { FiremenComponent } from './after-authentication/firemen/firemen.component';
import { CoursesComponent } from './after-authentication/courses/courses.component';
import { VehiclesComponent } from './after-authentication/vehicles/vehicles.component';
import { EquipmentsComponent } from './after-authentication/equipments/equipments.component';
import { AccountSettingsComponent } from './after-authentication/account-settings/account-settings.component';
import { MembersComponent } from './after-authentication/members/members.component';

const routes: Routes = [
  {
    path: 'register',
    component: SignUpComponent,
    canActivate: [NotAuthGuardService]
  },
  {
    path: 'login',
    component: SignInComponent,
    canActivate: [NotAuthGuardService]
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
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'members',
    component: MembersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'firestations',
    component: FirestationsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'firemen',
    component: FiremenComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'vehicles',
    component: VehiclesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'equipments',
    component: EquipmentsComponent,
    canActivate: [AuthGuardService]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
