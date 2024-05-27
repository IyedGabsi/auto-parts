import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendCodeComponent } from './send-code/send-code.component';

const routes: Routes = [
  {path:'',component:SendCodeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendCodeRoutingModule { }
