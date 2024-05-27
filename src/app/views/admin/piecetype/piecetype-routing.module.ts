import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PiecetypeComponent } from './piecetype/piecetype.component';

const routes: Routes = [
  {path:'',component:PiecetypeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PiecetypeRoutingModule { }
