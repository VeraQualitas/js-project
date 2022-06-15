import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import { SignUpComponent } from './before-authentication/sign-up/sign-up.component';
import { SignInComponent } from './before-authentication/sign-in/sign-in.component';
import { HomeComponent } from './after-authentication/home/home.component';
import {AuthGuardService, NotAuthGuardService} from "./services/auth-guard.service";
import {CookiesService} from "./services/cookies.service";
import {CookieService} from "ngx-cookie-service";
import {HttpService} from "./services/http.service";
import { NotSignedOutComponent } from './after-authentication/not-signed-out/not-signed-out.component';
import { SomethingWentWrongComponent } from './something-went-wrong/something-went-wrong.component';
import { ExpiredSessionComponent } from './before-authentication/expired-session/expired-session.component';
import { FirestationsComponent } from './after-authentication/firestations/firestations.component';
import { FiremenComponent } from './after-authentication/firemen/firemen.component';
import { VehiclesComponent } from './after-authentication/vehicles/vehicles.component';
import { EquipmentsComponent } from './after-authentication/equipments/equipments.component';
import { CoursesComponent } from './after-authentication/courses/courses.component';
import { AccountSettingsComponent } from './after-authentication/account-settings/account-settings.component';
import { MembersComponent } from './after-authentication/members/members.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    NotSignedOutComponent,
    SomethingWentWrongComponent,
    ExpiredSessionComponent,
    FirestationsComponent,
    FiremenComponent,
    VehiclesComponent,
    EquipmentsComponent,
    CoursesComponent,
    AccountSettingsComponent,
    MembersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MaterialModule,
    // ToastrModule.forRoot(),
  ],
  providers: [AuthGuardService, NotAuthGuardService, CookiesService, HttpService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
