import { Component,OnInit } from '@angular/core';

import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select'
import { FormBuilder, FormControl, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { VehictypeService } from '../../../services/vehictype.service';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PieceTypeService } from '../../../services/piece-type.service';
import { MarquesDataService } from '../../../services/marques-data.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ProductService } from '../../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [ FormsModule,NzSelectModule,CommonModule,NzButtonModule,NzInputModule,NzInputNumberModule,ReactiveFormsModule,NzFormModule,NzUploadModule,NzModalModule,NzIconModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent implements OnInit {
  selectedImageFile: File | null = null;
  title:any
  description:string=''
  price:any
  quantity:any

  vehicTypes: any=[]
  categories: any=[]
  pieceTypes: any=[]
  marques: any=[]
  sousmarques: any=[]
  constructor(private vts:VehictypeService, private pts:PieceTypeService,private ms:MarquesDataService,private fb:FormBuilder,private ps:ProductService,private messageService: NzMessageService){
    this.validateForm=this.fb.group({
      title: this.fb.control<string | null>(null, Validators.required),
      vehicultype: this.fb.control<string | null>(null, Validators.required),
      categorie: this.fb.control<string | null>(null, Validators.required),
      piecetype: this.fb.control<string | null>(null, Validators.required),
      pieceMarque: this.fb.control<string | null>(null, Validators.required),
      marque: this.fb.control<string | null>(null),
      sousmarque: this.fb.control<string | null>(null),
      price: this.fb.control<number | null>(null, Validators.required),
      quantity: this.fb.control<number | null>(null, Validators.required),
      description: this.fb.control<string | null>(null, Validators.required),
    });
  }
  ngOnInit(): void {
   
      this.vts.getAllVehicType().subscribe((data:any)=>{
        this.vehicTypes=data.data
      })
      this.ms.getAllMarques().subscribe((data:any)=>{
        this.marques=data.data
      })
  }
  onVehicleTypeChange(selectedValue: string) {
    console.log('hi')
    
    this.categories = []; 

    if (selectedValue) {
      
      this.vts.getCategoriesForVehiculTypes(selectedValue).subscribe((data: any) => {
        this.categories = data.data;
      });
    }
  }
  onCategorieChange(selectedCategorie: string) {
   
    this.pieceTypes = []; 

    if (selectedCategorie) {
      
      this.pts.getPieceTypesForCategories(selectedCategorie).subscribe((data: any) => {
        this.pieceTypes = data.data;
      });
    }
  }
  onVoitureMarqueChange(selectedvoitureMarque:string){
   
    this.sousmarques = []; 

    if (selectedvoitureMarque) {
      
      this.ms.getSousMarqueForMarque(selectedvoitureMarque).subscribe((data: any) => {
        this.sousmarques = data.data;
      });
    }
  }
 
  

  validateForm: FormGroup<{
    title: FormControl<string | null>;
    vehicultype: FormControl<string | null>;
    categorie: FormControl<string | null>;
    piecetype: FormControl<string | null>;
    pieceMarque: FormControl<string | null>;
    
  
    marque: FormControl<string | null>;
    sousmarque: FormControl<string | null>;
    price: FormControl<number | null>;
    quantity: FormControl<number | null>;
    description: FormControl<string | null>;
  }> 

  submitForm(form: FormGroup): void {
    
    if (form.valid) {
      const formData = new FormData();
      Object.entries(form.controls).forEach(([key, control]) => {
          formData.append(key, control.value);
      })
      if (this.selectedImageFile) {
        formData.append('imageCover', this.selectedImageFile);
      }
      if (this.fileList) {
        
        this.fileList.forEach((info)=>{
          this.images.push(info.originFileObj)
        })
       
        this.images.forEach((file: File, index: number) => {
          
          formData.append('images', file);
        });
      }
      this.ps.addProduct(formData).subscribe((data:any)=>{
        this.validateForm.reset()
        this.avatarUrl=''
        this.previewImage=''
        this.fileList=[]
        this.messageService.success('Produit  Ajouté avec Succée.')
        
      },(err:HttpErrorResponse)=>{
        
        this.messageService.error(err.error.errors[0].msg)
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    
  }
  
  loading = false;
  avatarUrl?: string;
  images:any=[]
  
  handleChange(info: any): void {
    if (info.file.originFileObj) {
      this.selectedImageFile = info.file.originFileObj;
      this.avatarUrl=info.file.thumbUrl
    }
  }







 


  getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  
   
    info:any
    fileList: NzUploadFile[] = [
     
    ];
    previewImage: string | undefined = '';
    previewVisible = false;
  
    handlePreview = async (file: NzUploadFile): Promise<void> => {
      
      if (!file.url && !file['preview']) {
        file['preview'] = await this.getBase64(file.originFileObj!);
      }
      this.previewImage = file.url || file['preview'];
      this.previewVisible = true;
    };
    handleChang(info:any){
      this.fileList=info.fileList
       
       this.info=info
     
      
    }
  

}
