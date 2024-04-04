import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './Components/home/home.component';
// import { MatIconModule } from '@angular/material/icon';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CartComponent } from './Components/cart/cart.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { CatalogComponent } from './Components/catalog/catalog.component';
import { MaterialModule } from './material/material.module';
import { ElectronicsComponent } from './electronics/electronics.component';
@NgModule({
  declarations: [
    HomeComponent,
    ProductListComponent,
    TruncatePipe,
    CartComponent,
    ContactUsComponent,
    AboutUsComponent,
    CatalogComponent,
    ElectronicsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PagesRoutingModule, AuthenticationModule, SharedModule  ],
    exports:[MaterialModule]
})
export class PagesModule { }
