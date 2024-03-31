import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
@NgModule({
  declarations: [
    UserProfileComponent,
    PaymentDetailsComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule, 
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ]
})
export class FeaturesModule { }
