import { Component } from '@angular/core';
import { UsersDataService } from '../../../services/users-data.service';
import { CommonModule } from '@angular/common';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AbstractControl, FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { NzFormControlComponent, NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-information',
  standalone: true,
  imports: [CommonModule,NzModalModule,NzButtonModule,FormsModule,NzFormControlComponent,ReactiveFormsModule,NzFormModule,NzInputModule],
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.scss'
})
export class UserInformationComponent {

  isVisible = false;
   listOfData: any=[]
   validateForm: FormGroup<{
    name: FormControl<string>;
    phone: FormControl<string>;
  }> = this.fb.group({
    name: ['', [ Validators.minLength(3), Validators.maxLength(20)]],
    phone: ['', [ Validators.min(10000000), Validators.max(99999999)]],
  });

  validateForme: FormGroup<{
    currentPassword: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
    
  }> 
  getNameErrorMessage(): string  {
    
    const control = this.validateForm.get('name');
    if (control && control.errors) {
       if (control.errors['minlength']) {
        return `Le nom de la marque doit comporter au moins ${control.errors['minlength'].requiredLength} caractères.`; 
      } else if (control.errors['maxlength']) {
        return `Le nom de la marque ne doit pas dépasser ${control.errors['maxlength'].requiredLength} caractères.`; 
      }
    }
    return '';
  }
  getPhoneErrorMessage(): string  {
    
    const control = this.validateForm.get('phone');
    if (control && control.errors) {
      if (control.errors['min']) {
        return `Le numéro de téléphone doit comporter exactement 8 chiffres.`;
      } else if (control.errors['max']) {
        return `Le numéro de téléphone doit comporter exactement 8 chiffres.`;
      }
    }
    return '';
  }
  showModal(): void {
    this.isVisible = true;
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Vous êtes sûr de vouloir supprimer votre compte ?',
      nzContent: '<b style="color: red;">Après suppression, vous ne pourrez pas récupérer votre compte !</b>',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteAccount(),
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  deleteAccount(){
    this.uds.deleteLoggedUser().subscribe((res:any)=>{
      localStorage.removeItem('token')
      this.router.navigate(['/'])
    })
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForme.controls.confirmPassword.updateValueAndValidity());
  }
  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForme.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  submitForm(): void {
    let data=this.validateForm.value
    
    if(data.name===''){
      delete data.name
    }
    if(data.phone===''){
      delete data.phone
    }
    console.log(data)
    this.uds.updateLoggedUserData(data).subscribe((res:any)=>{
      this.listOfData=res.data
      this.messageService.success('Modification complétée avec succès')
      this.isVisible = false;
    },(err:HttpErrorResponse)=>{
      console.log(err)
      this.messageService.error(err.error.errors[0].msg)
      
    })
    }

    getPasswordErrorMessage(): string  {
    
      const control = this.validateForme.get('password');
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
    getCurrentPasswordErrorMessage(): string  {
    
      const control = this.validateForme.get('currentPassword');
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
    submitForme(): void {
      let data=this.validateForme.value
      console.log(data)
      this.uds.updateLoggedUserPassword(data).subscribe((res:any)=>{
        console.log(res)
        this.as.saveProfileData(res.token)
        this.validateForme.reset()
        this.messageService.success('Mot de passe changée avec succès')
        
      },(err:HttpErrorResponse)=>{
        console.log(err)
        this.messageService.error(err.error.errors[0].msg)
        
      })
      }
   constructor(private uds:UsersDataService,private messageService: NzMessageService,private fb: NonNullableFormBuilder,private as:AuthService,private router:Router,private modal: NzModalService){
    this.validateForme = this.fb.group({
      currentPassword: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(25)]],
      password: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(25)]],
      confirmPassword: ['', [Validators.required, this.confirmationValidator]],
    });
    this.uds.getLoggedUserData().subscribe((data:any)=>{
      this.listOfData=data.data
     
     })
   }
}
