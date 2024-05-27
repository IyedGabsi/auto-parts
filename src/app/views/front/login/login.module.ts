import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
       
      },
    }),
  ],
  providers: [JwtHelperService]
})
export class LoginModule { }
