import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectronicsComponent } from './electronics/electronics.component';
import { JewelryComponent } from './jewelry/jewelry.component';
import { MenClothingComponent } from './men-clothing/men-clothing.component';
import { WomenClothingComponent } from './women-clothing/women-clothing.component';
import { CategoriesRoutingModule } from './categories-routing.module';



@NgModule({
  declarations: [
    ElectronicsComponent,
    JewelryComponent,
    MenClothingComponent,
    WomenClothingComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
