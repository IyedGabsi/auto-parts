import { Component } from '@angular/core';
import { AddressesDataService } from '../../../services/addresses-data.service';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent, NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzEmptyModule } from 'ng-zorro-antd/empty';


@Component({
  selector: 'app-user-addresses',
  standalone: true,
  imports: [CommonModule,NzModalModule,NzButtonModule,FormsModule,FormsModule,NzFormControlComponent,ReactiveFormsModule,NzFormModule, NzFormItemComponent,NzFormLabelComponent,NzInputModule,NzEmptyModule],
  templateUrl: './user-addresses.component.html',
  styleUrl: './user-addresses.component.scss'
})
export class UserAddressesComponent {
  totalItems:any
  isVisible = false;
  listOfData: any=[]
  validateForm: FormGroup<{
    alias: FormControl<string>;
    city: FormControl<string>;
    postalCode: FormControl<string>;
    phone: FormControl<string>;
    details: FormControl<string>;
  }> = this.fb.group({
    alias: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    postalCode: ['', [Validators.required, Validators.max(999999999)]],
    phone: ['', [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
    details: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
  });
  constructor(private ads:AddressesDataService,private messageService: NzMessageService,private fb: NonNullableFormBuilder){
     this.ads.getAddresses().subscribe((data:any)=>{
      this.totalItems=data.results
      this.listOfData=data.data
     })
  }

  delete(id: any, i: number) {
    this.ads.deleteAddress(id).subscribe((response:any) => {
      if (response.status=='success') {
        this.listOfData.splice(i,1) 
        this.messageService.success(response.message);
      } else {
        this.messageService.error('Deletion failed!');
      }
    });
  }
  
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  getAliasErrorMessage(): string  {
    
    const control = this.validateForm.get('alias');
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Le titre est requis !';
      } else if (control.errors['minlength']) {
        return `Le titre doit comporter au moins ${control.errors['minlength'].requiredLength} caractères.`; 
      } else if (control.errors['maxlength']) {
        return `Le titre ne doit pas dépasser ${control.errors['maxlength'].requiredLength} caractères.`; 
      }
    }
    return '';
  }
  getCityErrorMessage(): string  {
    
    const control = this.validateForm.get('city');
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Ville est requis !';
      } else if (control.errors['minlength']) {
        return `Ville doit comporter au moins ${control.errors['minlength'].requiredLength} caractères.`; 
      } else if (control.errors['maxlength']) {
        return `Ville ne doit pas dépasser ${control.errors['maxlength'].requiredLength} caractères.`; 
      }
    }
    return '';
  }
  getPostalCodeErrorMessage(): string  {
    
    const control = this.validateForm.get('postalCode');
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Code postale est requis !';
      } else if (control.errors['max']) {
        return `Vous dépassez la limite de chiffres.`;
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
  getDetailsErrorMessage(): string  {
    
    const control = this.validateForm.get('details');
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Rue est requis !';
      } else if (control.errors['minlength']) {
        return `Rue doit comporter au moins ${control.errors['minlength'].requiredLength} caractères.`; 
      } else if (control.errors['maxlength']) {
        return `Rue ne doit pas dépasser ${control.errors['maxlength'].requiredLength} caractères.`; 
      }
    }
    return '';
  }
  submitForm(): void {
    let data=this.validateForm.value
    this.ads.addAddress(data).subscribe((res:any)=>{
      this.listOfData.push(data)
      this.messageService.success(res.message)
      this.isVisible = false;
    },(err)=>{
      console.log(err)
      // this.messageService.error(err.error.message)
    })
  }
}
