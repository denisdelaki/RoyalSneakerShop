import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    HomeComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule, MatIconModule, AuthenticationModule, SharedModule  ],
    exports:[]
})
export class PagesModule { }
