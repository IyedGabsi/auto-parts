import { Component ,EventEmitter, Output} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule,FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { UploadComponent } from '../upload/upload.component';
import { MarquesDataService } from '../../../views/services/marques-data.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Console } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Observable, Observer } from 'rxjs';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NzButtonModule,NzModalModule,FormsModule,NzInputModule, NzFormModule,CommonModule,ReactiveFormsModule,UploadComponent,NzUploadModule ,NzIconModule,NzSpinModule,NzButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  selectedImageFile: File | null = null;
  modalTitle:any
  itemData={
    id:'',
    name:''
  }
  validateForm: FormGroup<{
    name: FormControl<string>;
    
  }> = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  });
  
 
  constructor(private fb: NonNullableFormBuilder, private mds:MarquesDataService,private messageService: NzMessageService) {
    
  }
  onFileSelected(file: File): void {
    
    console.log('Selected file:', file);
  }
  
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

  @Output() marqueAdded: EventEmitter<any> = new EventEmitter<any>();
  @Output() marqueUpdated: EventEmitter<any> = new EventEmitter<any>();
  submitForm(form: FormGroup) {
    
    const formData = new FormData();
    formData.append('name', form.value.name);
    
    
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }
    
    this.isOkLoading = true;
    if(this.modalTitle==='Ajouter Une Marque'){
      
      this.mds.addMarque(formData).subscribe((data)=>{
        this.marqueAdded.emit(data)
        this.isVisible = false;
        form.reset();
        this.selectedImageFile = null;
        this.avatarUrl = '';
      },(err:HttpErrorResponse)=>{
        
        this.messageService.error(err.error.errors[0].msg)
      }
      
    )
    }else if(this.modalTitle==='Modifier Marque'){
       this.mds.updateMarque(this.itemData.id,formData).subscribe((data)=>{
        this.marqueUpdated.emit(data)
        
        this.isVisible = false;
        form.reset();
        this.selectedImageFile = null;
        this.avatarUrl = '';
      },(err:HttpErrorResponse)=>{
        
        this.messageService.error(err.error.errors[0].msg)
      }
      
    )
    }
  this.isOkLoading = false;
  }
  
  isVisible = false;
  isOkLoading = false;
 
  showAddModal(): void {
    this.isVisible = true;
   
    this.modalTitle='Ajouter Une Marque'
  }
  showUpdateModal(itemData:{id:string,name:string}): void {
    this.isVisible = true;
    
    this.modalTitle='Modifier Marque'
    this.itemData.id=itemData.id
    this.itemData.name=itemData.name
    console.log(this.itemData)
  }
  handleOk(): void {
    
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 2000);
  }

  handleCancel(): void {
  
    this.isVisible = false;
  }

  loading = false;
  avatarUrl?: string;
 
  
  handleChange(info: any): void {
    if (info.file.originFileObj) {
      this.selectedImageFile = info.file.originFileObj;
      this.avatarUrl=info.file.thumbUrl
    }
  }



}
