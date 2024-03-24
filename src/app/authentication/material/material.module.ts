import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatTabsModule, MatCardModule,MatFormFieldModule,MatInputModule,MatIconModule,MatButtonModule, MatLabel
  ],
  exports:[MatTabsModule, MatCardModule, MatFormFieldModule,MatInputModule,MatIconModule,MatButtonModule,MatLabel]
})
export class MaterialModule { }
