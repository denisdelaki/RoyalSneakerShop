import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './Components/home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    ProductListComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    PagesRoutingModule, MatIconModule, AuthenticationModule, SharedModule  ],
    exports:[]
})
export class PagesModule { }
