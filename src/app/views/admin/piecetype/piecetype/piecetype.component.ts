import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzModalComponent, NzModalModule } from 'ng-zorro-antd/modal';
import { UploadComponent } from '../../../../shared/components/upload/upload.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpErrorResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PieceTypeService } from '../../../services/piece-type.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { VehictypeService } from '../../../services/vehictype.service';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-piecetype',
  standalone: true,
  imports: [NzButtonModule,UploadComponent,CommonModule,NzEmptyModule,NzModalModule,NzUploadModule,ReactiveFormsModule,FormsModule,NzFormModule,NzIconModule,NzInputModule,NzSelectModule],
  templateUrl: './piecetype.component.html',
  styleUrl: './piecetype.component.scss'
})
export class PiecetypeComponent {
  listOfTagCategories:any = [];
  listOfCategorie: Array<{ label: string; value: string }> = [];
  itemData={
    id:'',
    name:''
  }

  categories:any=[]
  index=0
  value?: string;
  isVisible = false;
  listOfData: any=[]
  results: number = 0;
  selectedImageFile: File | null = null;
  modalTitle:any
  isLoading:boolean=false

  validateForm: FormGroup<{
    name: FormControl<string>;
    categorie:FormControl<never>
  }> = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    categorie: [[], [Validators.required]]
  });
  constructor(private fb: NonNullableFormBuilder,private messageService: NzMessageService,private pts:PieceTypeService,private vts:VehictypeService){
    this.pts.getPieceTypes().subscribe((data:any)=>{
      this.listOfData=data.data
      
      this.results=data.results
      
    })
  }
  getCategories(){
    this.vts.getCategories().subscribe((data:any)=>{
      this.categories=data.data
      const categorie: Array<{ label: string; value: string }> = [];
      for (let i of this.categories) {
        categorie.push({ label: i.name, value: i._id });
      }
      
      this.listOfCategorie = categorie;
    })
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
  submitForm(form: FormGroup) {
    
    const formData = new FormData();
    if(form.value.name){
      formData.append('name', form.value.name);
    }
    // formData.append('categorie', form.value.categorie);
    
    if (this.listOfTagCategories) {
     
      this.listOfTagCategories.forEach((categorie:any) => {
        console.log(categorie)
        formData.append('categorie', categorie);
      });
    }
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }
    
    this.isLoading = true;
    if(this.modalTitle==='Ajouter Une Marque'){
        console.log('hiiiiiiiiiiiiiii')
      this.pts.addPieceType(formData).subscribe((data:any)=>{
        this.listOfData.push(data.data)
        this.results++; 
        this.messageService.success('Type de piece ajouté !')
        this.isVisible = false;
        this.listOfTagCategories=[]
        form.reset();
        this.selectedImageFile = null;
        this.avatarUrl = '';
      },(err:HttpErrorResponse)=>{
        this.listOfTagCategories=[]
        this.messageService.error(err.error.errors[0].msg)
      }
      
    )
    }else if(this.modalTitle==='Modifier Marque'){
       this.pts.UpdatePieceType(formData,this.itemData.id).subscribe((data:any)=>{
        this.listOfData.splice(this.index,1,data.data)
    
        this.messageService.success('Type de piece modifié')
        
        this.isVisible = false;
        form.reset();
        this.selectedImageFile = null;
       this.listOfTagCategories=[]
        this.avatarUrl = '';
      },(err:HttpErrorResponse)=>{
        this.listOfTagCategories=[]
        this.messageService.error(err.error.errors[0].msg)
      }
      
    )
    }
  this.isLoading = false;
  }
  showAddModal(): void {
    this.getCategories()
    this.isVisible = true;
   
    this.modalTitle='Ajouter Un type de piece'
  }
  showUpdateModal(id:any,name:any,categorie:any,i:any): void {
    this.getCategories()
    this.isVisible = true;
    console.log(categorie)
    this.modalTitle='Modifier Type de piece'
    this.itemData.id=id
    this.itemData.name=name
    this.index=i
    // this.listOfTagCategories.push(categorie)
    // console.log(this.listOfTagCategories)
    
    console.log(this.itemData)
  }
  handleCancel(): void {
    
    this.isVisible = false;
  }
  affiche(){
    console.log(this.listOfTagCategories)
  }

  loading = false;
  avatarUrl?: string;
 
  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }
  
  handleChange(info: any): void {
    if (info.file.originFileObj) {
      this.selectedImageFile = info.file.originFileObj;
      console.log(info.file)
      this.getBase64(info.file!.originFileObj!, (img: string) => {
       
        this.avatarUrl = img;
      });
      console.log(this.avatarUrl)
    }}
    delete(id: any, i: number) {
      this.pts.deletePieceType(id).subscribe((response:any)=> {
        
        if (response==null) {
          this.listOfData.splice(i,1) 
          this.results--; 
          this.messageService.success('Type de piece supprimé!');
        } else {
          console.error('Deletion failed:', response); 
        }
      });
    }
}
