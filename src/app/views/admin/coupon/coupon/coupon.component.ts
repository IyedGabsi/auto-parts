import { Component, OnInit } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list'
import { CouponService } from '../../../services/coupon.service';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [NzListModule,CommonModule,NzModalModule,FormsModule,ReactiveFormsModule,NzFormModule,NzDatePickerModule,NzInputModule,NzInputNumberModule,NzButtonModule],
  templateUrl: './coupon.component.html',
  styleUrl: './coupon.component.scss'
})
export class CouponComponent implements OnInit{
  itemData={
    id:'',
    couponWord:'',
    discount:'',
    expire:''
  }
  demoValue:any
  coupons:any = []
  isVisible = false;
  modalTitle:any
  isLoading:boolean=false
  index:any

  validateForm: FormGroup<{
    couponWord: FormControl<string>;
    expire: FormControl<string>;
    discount: FormControl<string>
  }> = this.fb.group({
    couponWord: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    expire: ['', [Validators.required]],
    discount: ['',[Validators.required]]
    
  });
  constructor(private cps:CouponService,private messageService: NzMessageService,private fb: NonNullableFormBuilder){}
  
  ngOnInit(): void {
      this.getCoupons()
  }
  
  getCoupons(){
    this.cps.getCoupons().subscribe((data:any)=>{
      this.coupons= data.data
    })
  }
  edit(id:any,i:any){
    console.log(id)
  }
  getNameErrorMessage(): string  {
    
    const control = this.validateForm.get('couponWord');
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Le nom de la piece est requis !';
      } else if (control.errors['minlength']) {
        return `Le coupon doit comporter au moins ${control.errors['minlength'].requiredLength} caractères.`; 
      } else if (control.errors['maxlength']) {
        return `Le coupon ne doit pas dépasser ${control.errors['maxlength'].requiredLength} caractères.`; 
      }
    }
    return '';
  }
  submitForm(form: FormGroup) {
    let data:any={}
    if(form.value.expire){
    const parsedDate = new Date(form.value.expire);
    const formattedDate = parsedDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
    data.expire=formattedDate
    }
    if(form.value.couponWord){
      data.couponWord=form.value.couponWord
    }
    if(form.value.discount){
      console.log(form.value.discount)
      data.discount=form.value.discount
    }

    if(this.modalTitle==='Ajouter Un Coupon'){
        console.log('hiiiiiiiiiiiiiii')
      this.cps.addCoupons(data).subscribe((data:any)=>{
        this.coupons.push(data.data)
        
        this.messageService.success('Type de piece ajouté !')
        this.isVisible = false;
        
        form.reset();
       
      },(err:HttpErrorResponse)=>{
        console.log(err)
        this.messageService.error(err.error.errors[0].msg)
      }
      
    )
    }else if(this.modalTitle==='Modifier Coupon'){
      console.log('hiiii')
       this.cps.updateCoupons(this.itemData.id,data).subscribe((data:any)=>{
        this.coupons.splice(this.index,1,data.data)
    
        this.messageService.success('Coupon modifié')
        
        this.isVisible = false;
        form.reset();
       
      },(err:HttpErrorResponse)=>{
        console.log(err)
        this.messageService.error(err.error.errors[0].msg)
      }
      
    )
    }
  this.isLoading = false;
  }
  showAddModal(): void {
    
    this.isVisible = true;
   
    this.modalTitle='Ajouter Un Coupon'
  }
  showUpdateModal(id:any,couponWord:any,expire:any,discount:any,i:any): void {
    
    this.isVisible = true;
   
    this.modalTitle='Modifier Coupon'
    this.itemData.couponWord=couponWord
    this.itemData.expire=expire
    this.itemData.discount=discount
    this.itemData.id=id
    this.demoValue=discount
    console.log(discount)
    this.index=i
    // this.listOfTagCategories.push(categorie)
    // console.log(this.listOfTagCategories)
    
    console.log(this.itemData)
  }
  handleCancel(): void {
    this.itemData={
      id:'',
      couponWord:'',
      discount:'',
      expire:''
    }
    this.isVisible = false;
  }
  delete(id:any,i:any){
    this.cps.deleteCoupon(id).subscribe((res:any)=>{
      if (res==null) {
        this.coupons.splice(i,1) 
        this.messageService.success('Coupon supprimé !')
      } else {
        this.messageService.error('Un erreur dans la suppression!')
      }
    })
  }

}
