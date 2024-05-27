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
  selector: 'app-send-code',
  standalone: true,
  imports: [FormsModule,NzFormControlComponent,ReactiveFormsModule,NzButtonModule,NzCheckboxModule,NzIconModule,NzFormModule, NzFormItemComponent, NzFormLabelComponent,NzInputModule,RouterModule],
  templateUrl: './send-code.component.html',
  styleUrl: './send-code.component.scss'
})
export class SendCodeComponent {
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
    let data=this.validateForm.value
    console.log(data)
    this.as.verifyResetCode(data).subscribe((res:any)=>{
      this.messageService.success(res.status)
      this.router.navigate(['/forgotPassword/resetPassword'])
      
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
