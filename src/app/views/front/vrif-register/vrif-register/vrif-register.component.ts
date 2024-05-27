import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent, NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from '../../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vrif-register',
  standalone: true,
  imports: [FormsModule,NzFormControlComponent,ReactiveFormsModule,NzButtonModule,NzCheckboxModule,NzIconModule,NzFormModule, NzFormItemComponent, NzFormLabelComponent,NzInputModule,RouterModule],
  templateUrl: './vrif-register.component.html',
  styleUrl: './vrif-register.component.scss'
})
export class VrifRegisterComponent {
  name:any
  phone:any
  email:any
  password:any
  code:any
  expire:any

  validateForm: FormGroup<{
    resetCode: FormControl<string>;
    
  }> = this.fb.group({
    resetCode: ['', [Validators.required ,Validators.minLength(6), Validators.maxLength(6)]],
   
  });

  getCodeErrorMessage(): string  {
    
    const control = this.validateForm.get('resetCode');
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Numéro de téléphone est requis !';
      } else if (control.errors['minlength']||control.errors['maxlength']) {
        return `Le Code doit comporter exactement 6 chiffres.`;
      }
    }
    return '';
  }
  submitForm(): void {
    let resetCode=this.validateForm.value.resetCode
    let data={
      name:this.name,
      phone:this.phone,
      email:this.email,
      password:this.password,
      code:this.code,
      expire:this.expire,
      resetCode:resetCode
    }
    
    console.log(data)
    this.as.register(data).subscribe((res:any)=>{
       this.as.saveProfileData(res.token)
      this.router.navigate(['/user/informations'])
      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      localStorage.removeItem('name')
      localStorage.removeItem('phone')
      localStorage.removeItem('email')
      localStorage.removeItem('passsword')
      localStorage.removeItem('jess')
      localStorage.removeItem('active')
      }
    },(err)=>{
      this.messageService.error(err.error.message)
    })
  }
  constructor(private fb: NonNullableFormBuilder, private as:AuthService,private messageService: NzMessageService, private router:Router){
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      this.name=localStorage.getItem('name')
      this.phone=localStorage.getItem('phone')
      this.email=localStorage.getItem('email')
      this.password=localStorage.getItem('password')
      this.code=localStorage.getItem('jess')
      this.expire=localStorage.getItem('active')
    }
    if(this.as.loggedIn()){
      this.router.navigate(['/'])
    }
  }
}
