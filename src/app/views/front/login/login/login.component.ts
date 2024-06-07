import { Component } from '@angular/core';

import { NzFormControlComponent } from 'ng-zorro-antd/form';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from '../../../services/auth.service';
import {  response } from 'express';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { Console } from 'console';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NzFormControlComponent,ReactiveFormsModule,NzButtonModule,NzCheckboxModule,NzIconModule,NzFormModule, NzFormItemComponent, NzFormLabelComponent,NzInputModule,RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  url:any
  role:any
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    
  }> = this.fb.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required]],
   
  });
  getEmailErrorMessage(): string  {
    
    const control = this.validateForm.get('email');
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Email est requis !';
      } else if (control.errors['email']) {
        return `Ce n'est pas une adresse e-mail!`; 
      } 
    }
    return '';
  }
  submitForm(): void {
    let data=this.validateForm.value
    this.as.login(data).subscribe((res:any)=>{
      this.as.saveProfileData(res.token)
      this.role=this.as.getUserData('role')
      console.log(this.role)
      if (this.role==='admin'){
        this.route.navigate([this.url])
      }else if(this.role==='user'){
        this.route.navigate(['/user/informations'])
      }
      
    },(err)=>{
      this.messageService.error(err.error.message)
    })
  }
  constructor(private fb: NonNullableFormBuilder,private as:AuthService, private route:Router,private messageService: NzMessageService,private jwtHelper: JwtHelperService,private ar:ActivatedRoute) {
    if(this.as.adminloggedIn()){
      this.route.navigate(['/admin'])
    }
    if(this.as.loggedIn()){
      this.route.navigate(['/'])
    }
    this.url=this.ar.snapshot.queryParams['returnUrl']||'/admin/orders'
    
  }
}
