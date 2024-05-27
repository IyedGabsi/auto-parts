import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {path:'',component:ForgotPasswordComponent,children:[
    {path:'sendEmail',loadChildren:()=>import('../forgot-password/send-email/send-email.module').then(m=>m.SendEmailModule)},
    {path:'sendCode',loadChildren:()=>import('../forgot-password/send-code/send-code.module').then(m=>m.SendCodeModule)},
    {path:'resetPassword',loadChildren:()=>import('../forgot-password/reset-password/reset-password.module').then(m=>m.ResetPasswordModule)},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
