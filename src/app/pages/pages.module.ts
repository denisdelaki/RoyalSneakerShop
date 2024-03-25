import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ProductListComponent } from './product-list/product-list.component';
@NgModule({
  declarations: [
    HomeComponent,
    NavigationComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule, MatIconModule, AuthenticationModule  ]
})
export class PagesModule { }
