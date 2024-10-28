import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { CatalogComponent } from './Components/catalog/catalog.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ProductListComponent } from './Components/product-list/product-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'contactus', component: ContactUsComponent},
  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'category', component: ElectronicsComponent},
  {path: 'product-list', component: ProductListComponent},
  // {path: '**', redirectTo: '', component: HomeComponent},
  {path: 'product-detail/:id', component: ProductDetailsComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
