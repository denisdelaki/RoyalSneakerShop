import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectronicsComponent } from './electronics/electronics.component';
import { JewelryComponent } from './jewelry/jewelry.component';
import { MenClothingComponent } from './men-clothing/men-clothing.component';
import { WomenClothingComponent } from './women-clothing/women-clothing.component';

const routes: Routes = [
  {path: 'electronics', component: ElectronicsComponent},
  {path: 'jewelry', component: JewelryComponent},
  {path: 'mensclothing', component: MenClothingComponent},
  {path: 'womensclothing', component: WomenClothingComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
