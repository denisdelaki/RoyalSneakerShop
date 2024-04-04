import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator'
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatIconModule,MatPaginatorModule,MatPaginator, MatMenuModule,MatToolbarModule
  ],
  exports:[MatIconModule,MatPaginatorModule,MatPaginator, MatMenuModule,MatToolbarModule]
})
export class MaterialModule { }
