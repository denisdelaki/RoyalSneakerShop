import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './Components/home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CartComponent } from './Components/cart/cart.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductListComponent,
    TruncatePipe,
    CartComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule, MatIconModule, AuthenticationModule, SharedModule  ],
    exports:[]
})
export class PagesModule { }
