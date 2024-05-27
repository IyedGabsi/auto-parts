import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddressesComponent } from './user-addresses/user-addresses.component';

const routes: Routes = [
  {path:'',component:UserAddressesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAddressesRoutingModule { }
