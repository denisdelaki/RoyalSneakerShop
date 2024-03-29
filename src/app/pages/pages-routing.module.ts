import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
