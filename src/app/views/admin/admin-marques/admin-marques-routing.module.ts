import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMarquesComponent } from './admin-marques/admin-marques.component';

const routes: Routes = [
  {path:'',component:AdminMarquesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMarquesRoutingModule { }
