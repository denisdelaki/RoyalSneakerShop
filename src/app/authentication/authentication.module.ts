import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './Components/login/login.component';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MaterialModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthenticationModule { }
