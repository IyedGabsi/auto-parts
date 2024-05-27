import { Component,OnDestroy} from '@angular/core';

import { NzFormControlComponent } from 'ng-zorro-antd/form';
import { AbstractControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';


import { Router, RouterModule } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,NzFormControlComponent,ReactiveFormsModule,NzButtonModule,NzCheckboxModule,NzIconModule,NzFormModule, NzFormItemComponent, NzFormLabelComponent,NzInputModule,RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnDestroy{
  role:any
  validateForm: FormGroup<{
    email: FormControl<string>;
    newPassword: FormControl<string>;
    confirmPassword: FormControl<string>;
    
  }> 

  updateConfirmValidator(): void {
    
    Promise.resolve().then(() => this.validateForm.controls.confirmPassword.updateValueAndValidity());
  }
  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  getNewPasswordErrorMessage(): string  {
    
    const control = this.validateForm.get('newPassword');
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Numéro de téléphone est requis !';
      } else if (control.errors['minlength']) {
        return `Mot de passe trop court`;
      }else if(control.errors['maxlength']){
        return `Mot de passe trop long`;
      }
    }
    return '';
  }
  submitForm(): void {
    let email:any=localStorage.getItem('email')
    let data=this.validateForm.value
    data.email = email
    
    this.as.resetPassword(data).subscribe((res:any)=>{
      this.messageService.success('Réinitialisation du mot de passe réussie!')
      this.as.saveProfileData(res.token)
      this.role=this.as.getUserData('role')
      console.log(this.role)
      if (this.role==='admin'){
        this.router.navigate(['/admin/users'])
      }else if(this.role==='user'){
        this.router.navigate(['/'])
      }
      console.log(res)
      
    },(err)=>{
      console.log(err)
      this.messageService.error(err.error.message)
    })
  }
  constructor(private fb: NonNullableFormBuilder , private as:AuthService,private messageService: NzMessageService,private router:Router) {
    if(this.as.loggedIn()){
      this.router.navigate(['/'])
    }
    this.validateForm = this.fb.group({
      email:[''],
      newPassword: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(25)]],
      confirmPassword: ['', [Validators.required, this.confirmationValidator]],
    });
  }
  ngOnDestroy(): void {
    localStorage.removeItem('email')
  }
}
