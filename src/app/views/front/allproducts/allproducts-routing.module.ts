import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllproductsComponent } from './allproducts/allproducts.component';

const routes: Routes = [
  {path:'',component:AllproductsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllproductsRoutingModule { }
