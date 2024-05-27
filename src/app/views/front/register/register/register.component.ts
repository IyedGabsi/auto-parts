import { Component } from '@angular/core';
import { AbstractControl, FormControl, NonNullableFormBuilder, ValidatorFn, Validators ,FormGroup, ReactiveFormsModule} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule, NzFormTooltipIcon} from 'ng-zorro-antd/form';
import { NzColDirective, NzGridModule, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { AuthService } from '../../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NzFormModule, NzInputModule, NzButtonModule, NzCheckboxModule, NzIconModule, NzGridModule, NzDropDownModule,NzSelectModule,ReactiveFormsModule,NzI18nModule, NzToolTipModule,NzDividerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  validateForm: FormGroup<{
    name: FormControl<string>;
    phone: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
    
  }> 
  getNameErrorMessage(): string  {
    
    const control = this.validateForm.get('name');
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Le nom de la marque est requis !';
      } else if (control.errors['minlength']) {
        return `Le nom de la marque doit comporter au moins ${control.errors['minlength'].requiredLength} caractères.`; 
      } else if (control.errors['maxlength']) {
        return `Le nom de la marque ne doit pas dépasser ${control.errors['maxlength'].requiredLength} caractères.`; 
      }
    }
    return '';
  }
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
  getPhoneErrorMessage(): string  {
    
    const control = this.validateForm.get('phone');
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Numéro de téléphone est requis !';
      }else if (control.errors['min']) {
        return `Le numéro de téléphone doit comporter exactement 8 chiffres.`;
      } else if (control.errors['max']) {
        return `Le numéro de téléphone doit comporter exactement 8 chiffres.`;
      }
    }
    return '';
  }
  
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.confirmPassword.updateValueAndValidity());
  }
  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  submitForm(): void {
    let data=this.validateForm.value
    this.as.sendRegisterCode(data).subscribe((res:any)=>{
      console.log('hi')
      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      localStorage.setItem('name',res.user.name)
      localStorage.setItem('phone',res.user.phone)
      localStorage.setItem('email',res.user.email)
      localStorage.setItem('password',res.user.password)
      localStorage.setItem('jess',res.code)
      localStorage.setItem('active',res.expire)
      }
      this.router.navigate(['/verifRegister'])
      this.messageService.success('Code envoyé avec succès')
     
      // this.router.navigate(['/'])
      
    },(err)=>{console.log(err)
      // this.messageService.error(err.error.message)
    })
  }
  constructor(private fb: NonNullableFormBuilder , private as:AuthService,private messageService: NzMessageService,private router:Router) {
    if(this.as.loggedIn()){
      this.router.navigate(['/'])
    }
    this.validateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      phone: ['', [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, this.confirmationValidator]],
    });
  }
}
