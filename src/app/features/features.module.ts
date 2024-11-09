import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateProductComponent } from './dialogs/create-product/create-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [
    UserProfileComponent,
    PaymentDetailsComponent,
    MyProductsComponent,
    CreateProductComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule, 
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    SharedModule
  ]
})
export class FeaturesModule { }
