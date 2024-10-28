import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [NavigationComponent, ToastComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule, RouterModule
  ], 
  exports: [NavigationComponent,ToastComponent, MatIconModule]
})
export class SharedModule { }
