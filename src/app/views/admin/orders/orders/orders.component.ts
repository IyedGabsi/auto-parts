import { Component, OnInit } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDescriptionsSize } from 'ng-zorro-antd/descriptions';
import { OrdersService } from '../../../services/orders.service';
import { CommonModule } from '@angular/common';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormControlComponent, NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NzDescriptionsModule,CommonModule,NzPaginationModule,NzButtonModule,NzModalModule,FormsModule,NzFormControlComponent,ReactiveFormsModule,NzFormModule,NzInputModule,NzSelectModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  selectedValue=null
  isVisible=false
  commandes: any[] = [];
  paginatedData: any[] = []; 
  totalItems = 0; 
  currentPage = 1; 
  pageSize = 1
 constructor(private os:OrdersService , private router:Router,private messageService: NzMessageService){}
  ngOnInit(): void {
      this.getAllOrders()
  }
  getAllOrders(pageNumber = 1){
    this.os.getAllOrders().subscribe((data:any)=>{
      this.commandes=data.data
      
      this.totalItems = data.results; 
      this.updatePaginatedData(pageNumber);
    })
  }
  updatePaginatedData(pageNumber: number) {
    
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.commandes.slice(startIndex, endIndex);
    
  }
  changePage(pageNumber: number) {
    
    this.currentPage = pageNumber;
    this.updatePaginatedData(pageNumber);
  }
  showModal(): void {
    this.isVisible = true;
  }
  submitForm(id:any,i:number){
    let data={
      isDelivered:this.selectedValue
    }
    this.os.updateOrdersStatus(id,data).subscribe((data:any)=>{
      this.paginatedData[i].isDelivered=data.data.isDelivered
      this.messageService.success('Status de livraison modifié avec succée')
      this.selectedValue=null
    },(err:any)=>{
      console.log(err)
    })
    
    this.isVisible=false
  }
  handleCancel(){
    this.isVisible=false
    this.selectedValue=null
  }
  getProduct(id:any){
    console.log('hi')
    localStorage.setItem('productId',id)
    this.router.navigate(['/productDetails'])
  }
}
