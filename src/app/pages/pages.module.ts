import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationModule } from '../authentication/authentication.module';
@NgModule({
  declarations: [
    HomeComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule, MatIconModule, AuthenticationModule  ]
})
export class PagesModule { }
