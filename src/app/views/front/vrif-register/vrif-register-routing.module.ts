import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VrifRegisterComponent } from './vrif-register/vrif-register.component';

const routes: Routes = [
  {path:'',component:VrifRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VrifRegisterRoutingModule { }
