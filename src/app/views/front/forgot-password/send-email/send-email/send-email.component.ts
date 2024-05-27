import { Component } from '@angular/core';

import { NzFormControlComponent } from 'ng-zorro-antd/form';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
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
  selector: 'app-send-email',
  standalone: true,
  imports: [FormsModule,NzFormControlComponent,ReactiveFormsModule,NzButtonModule,NzCheckboxModule,NzIconModule,NzFormModule, NzFormItemComponent, NzFormLabelComponent,NzInputModule,RouterModule],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.scss'
})
export class SendEmailComponent {
  email:any
  validateForm: FormGroup<{
    email: FormControl<string>;
    
  }> = this.fb.group({
    email: ['', [Validators.required,Validators.email]],
   
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
    this.email=data.email
    
    localStorage.setItem('email',this.email)
    this.as.forgotPassword(data).subscribe((res:any)=>{
      this.messageService.success(res.message)
      this.router.navigate(['/forgotPassword/sendCode'])
      
    },(err)=>{
      this.messageService.error(err.error.message)
    })
  }
  constructor(private fb: NonNullableFormBuilder, private as:AuthService,private messageService: NzMessageService, private router:Router){
    if(this.as.loggedIn()){
      this.router.navigate(['/'])
    }
  }
}
