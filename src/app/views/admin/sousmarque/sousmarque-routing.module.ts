import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SousmarqueComponent } from './sousmarque/sousmarque.component';

const routes: Routes = [
  {path:'',component:SousmarqueComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SousmarqueRoutingModule { }
