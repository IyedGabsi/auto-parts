import { Component, OnInit } from '@angular/core';
import { CommandeModule } from '../../../user/commande/commande.module';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { NzPaginationComponent, NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,NzEmptyModule,NzPaginationModule,NzInputModule,NzIconModule,NzButtonModule,FormsModule,NzMenuModule,NzModalModule,ReactiveFormsModule,NzFormModule,NzUploadModule,NzInputNumberModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  productIndex=''
  productData:any={}
  selectedImageFile: File | null = null;
  title:any
  description:string=''
  price:any
  quantity:any
  avatarUrl?: string;
  images:any=[]

  isVisible=false
  keyword=''
  params:any={}
  currentPage = 1;
  pageSize = 10
  totalProducts=0 
  products:any=[]
  validateForm: FormGroup<{
    title: FormControl<string | null>;
    price: FormControl<number | null>;
    quantity: FormControl<number | null>;
    description: FormControl<string | null>;
  }> 
   constructor(private ps:ProductService,private router:Router,private messageService: NzMessageService,private fb:FormBuilder){
    this.validateForm=this.fb.group({
      title: this.fb.control<string | null>(null, Validators.required),
      price: this.fb.control<number | null>(null, Validators.required),
      quantity: this.fb.control<number | null>(null, Validators.required),
      description: this.fb.control<string | null>(null, Validators.required),
    });
   }
   
   ngOnInit(): void {
       this.params.limit=10
       this.getProducts(this.params)
   }

   getProducts(params?: any){
    this.ps.getProducts(params).subscribe((data:any)=>{
      
      this.totalProducts=data.paginationResult.totalDocuments
      console.log(data.data)
      this.products=data.data
    })
  }
  updatePaginatedData(pageNumber: number) {
    this.params.page=pageNumber
    this.getProducts(this.params)
    
  }

  changePage(pageNumber: number) {
    
    this.currentPage = pageNumber;
    this.updatePaginatedData(pageNumber);
  }
  getProductId(id:any){
    localStorage.setItem('productId',id)
    this.router.navigate(['/productDetails'])
  }
  search(){
    if(this.keyword!==''){
      this.params.keyword=this.keyword
    }
    this.getProducts(this.params)
  }
  deleteProduct(id:any,i:any){
    this.ps.deleteProduct(id).subscribe((res:any)=>{
       this.products.splice(i,1)
       this.messageService.success('Produit supprimé ')
    })
  }
  showModal(id:any,title:any,price:any,quantity:any,description:any,imageCover:any,images:any,i:any): void {
    this.productData.id=id
    this.productData.title=title
    this.productData.price=price
    this.productData.quantity=quantity
    this.productData.description=description
    this.productData.imageCover=imageCover
    this.productData.images=images
    
    this.productIndex=i
    this.isVisible = true
  }
  
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  submitForm(form: FormGroup){
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
      this.ps.updateProduct(formData,this.productData.id).subscribe((data:any)=>{
        console.log(data)
        this.isVisible = false
        this.productData={}
        this.avatarUrl=''
        this.previewImage=''
        this.fileList=[]
        this.products.splice(this.productIndex,1,data.data)
        this.messageService.success('Produit  modifié avec Succée.')
        
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
  handleChange(info: any): void {
    if (info.file.originFileObj) {
      this.selectedImageFile = info.file.originFileObj;
      this.avatarUrl=info.file.thumbUrl
    }
  }
  getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      console.log('si')
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
    console.log('hi')
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
