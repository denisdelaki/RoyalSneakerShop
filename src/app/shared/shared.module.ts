import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchComponent } from './components/search/search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NavigationComponent, ToastComponent, SearchComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule
  ], 
  exports: [
    NavigationComponent,
    ToastComponent, 
    SearchComponent,
    MatIconModule]
})
export class SharedModule { }
