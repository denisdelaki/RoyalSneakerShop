import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { MyProductsComponent } from './components/my-products/my-products.component';

const routes: Routes = [
  {path: 'myprofile', component: UserProfileComponent},
  {path: 'payment', component: PaymentDetailsComponent},
  {path: 'my-product-list', component: MyProductsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
