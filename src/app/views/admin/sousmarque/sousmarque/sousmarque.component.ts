import { Component, OnInit } from '@angular/core';
import { NzCollapseModule } from 'ng-zorro-antd/collapse'
import { NzListModule } from 'ng-zorro-antd/list';
import { MarquesDataService } from '../../../services/marques-data.service';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sousmarque',
  standalone: true,
  imports: [NzCollapseModule,NzListModule,CommonModule,NzButtonModule,NzModalModule,FormsModule,ReactiveFormsModule,NzFormModule,NzInputModule],
  templateUrl: './sousmarque.component.html',
  styleUrl: './sousmarque.component.scss'
})
export class SousmarqueComponent implements OnInit{
 
  marqueId:any
  marques:any=[]
  sousMarques:any=[]
  itemData={
   id:'',
   name:''
  }
  isVisible = false;
  modalTitle:any
  isLoading:boolean=false
  index:any

  validateForm: FormGroup<{
    name: FormControl<string>;
    
  }> = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
   
    
  });
  constructor(private mds:MarquesDataService,private fb: NonNullableFormBuilder,private messageService: NzMessageService){}
  ngOnInit(): void {
      this.getMarques()
  }
  getMarques(){
    this.mds.getAllMarques().subscribe((data:any)=>{
      this.marques=data.data
    })
  }
  getSousMarques(event:any,id:any){
    if(event){
      this.mds.getSousMarqueForMarque(id).subscribe((data:any)=>{
         this.sousMarques=data.data
      })
    }
    
  }
  showAddModal(id:any): void {
    
    this.isVisible = true;
   
    this.modalTitle='Ajouter Un modèle'
    this.marqueId=id
  }
  showUpdateModal(id:any,name:any,i:any): void {
    
    this.isVisible = true;
   
    this.modalTitle='Modifier modèle'
    this.itemData.name=name
    this.itemData.id=id
   
    this.index=i
    // this.listOfTagCategories.push(categorie)
    // console.log(this.listOfTagCategories)
    
    console.log(this.itemData)
  }
  getNameErrorMessage(): string  {
    
    const control = this.validateForm.get('name');
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
  
  
   
    if(this.modalTitle==='Ajouter Un modèle'){
        console.log()
      this.mds.addSousMarqueForMarque(this.marqueId,form.value).subscribe((data:any)=>{
        this.sousMarques.push(data.data)
        this.messageService.success('Modèle ajouté !')
        this.isVisible = false;
        form.reset()
      },(err:HttpErrorResponse)=>{
        form.reset()
        this.messageService.error(err.error.errors[0].msg)
      }
      
    )
    }
    else if(this.modalTitle==='Modifier modèle'){
      console.log('hiiii')
       this.mds.updateSousMarque(this.itemData.id,form.value).subscribe((data:any)=>{
        this.sousMarques.splice(this.index,1,data.data)
    
        this.messageService.success('Modèle modifié')
        
        this.isVisible = false;
        form.reset();
      },(err:HttpErrorResponse)=>{
        
        this.messageService.error(err.error.errors[0].msg)
      }
      
    )
    }
  this.isLoading = false;
  }
  handleCancel(): void {
    this.itemData={
      name:'',
      id:''
    }
    this.isVisible = false;
  }
  delete(id:any,i:any){
    this.mds.deleteSousMarque(id).subscribe((res:any)=>{
      if (res==null) {
        this.sousMarques.splice(i,1) 
        this.messageService.success('Modèle supprimé !')
      } else {
        this.messageService.error('Un erreur dans la suppression!')
      }
    })
  }




}
