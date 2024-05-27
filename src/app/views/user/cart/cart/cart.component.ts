import { CommonModule} from '@angular/common';
import { Component, ViewChild,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputGroupComponent, NzInputGroupSlotComponent, NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberComponent, NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { CartService } from '../../../services/cart.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpErrorResponse } from '@angular/common/http';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { AddressesDataService } from '../../../services/addresses-data.service';
import { OrdersService } from '../../../services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ CommonModule,FormsModule,NzInputModule,NzButtonModule,NzInputNumberModule,NzSpaceModule,NzIconModule,NzPaginationModule,NzEmptyModule,NzRadioModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  sessionUrl:string=''
  radioValue: string = '';
  hasACart:any
  allData:any
  cartData:any={}
  updateQuantityData={
    quantity:1
  }
  coupon={
    couponWord:''
  }
  couponCode=''
  quantity :any
  listOfData: any=[]
  adresses:any=[]
  countAdresses:any=[]
  paginatedData: any[] = []; 
  Iquantity:any=1
  totalItems = 0; 
  currentPage = 1; 
  pageSize = 2
  // @ViewChild('quantityInputRef') quantityInputRef: NzInputNumberComponent;
  constructor(private cs:CartService,private messageService: NzMessageService,private as:AddressesDataService,private os:OrdersService,private router:Router){
    
  }
  ngOnInit() {
    this.getChariotItems();
    this.getUserAdresses()
  }
  getUserAdresses(){
    this.as.getAddresses().subscribe((data:any)=>{
      this.adresses=data.data
      console.log(this.radioValue)
      this.countAdresses=data.results
    })
  }
  getChariotItems(pageNumber = 1) {
    this.cs.getLoggedUserCart().subscribe((data:any)=>{
      this.hasACart=true
      this.allData=data
      this.cartData=this.allData.data
      console.log(this.cartData)
      this.listOfData=this.cartData.chariotItems
      this.totalItems = this.allData.numOfChariotItems;
      this.updatePaginatedData(pageNumber);
    },(err:HttpErrorResponse)=>{
       if(err.status === 404){
        this.hasACart=false
       }
    })
  }
  updatePaginatedData(pageNumber: number) {
    
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.listOfData.slice(startIndex, endIndex);
    
  }
  changePage(pageNumber: number) {
    
    this.currentPage = pageNumber;
    this.updatePaginatedData(pageNumber);
  }
  submitQuantity(id:any,i:any) {
    this.updateQuantityData.quantity=this.quantity
    this.cs.updateChariotItem(this.updateQuantityData,id).subscribe((data:any)=>{
      this.paginatedData[i].quantity=this.updateQuantityData.quantity
      this.quantity=null
      this.cartData=data.data
      // this.messageService.success('')
    },(err)=>{
      console.log(err)
      // this.messageService.error(err.error.message)
    })
   
  }
  deleteItem(id:any,i:any){
    
      this.cs.deleteChariotItem(id).subscribe((response:any) => {
        
        if (response.status=='success') {
          this.paginatedData.splice(i,1) 
          let indexOnList=i+this.pageSize*(this.currentPage-1)
          this.listOfData.splice(indexOnList,1)
          this.totalItems=response.numOfChariotItems
          this.cartData=response.data
          this.messageService.success('Produit supprimé du panier avec succès!');
        } else {
          this.messageService.error('Deletion failed!');
        }
      });
    }
    submitCoupon(){
      this.coupon.couponWord=this.couponCode
      this.cs.applyCoupon(this.coupon).subscribe((res:any)=>{
        this.couponCode=''
        this.cartData=res.data
        this.messageService.success('Félicitations, vous avez obtenu une remise de 10% !');
      },(err:HttpErrorResponse)=>{
        this.messageService.error(err.error.message)
      })
    }
    submitPurchase(){
      let data = {shippingAddress:this.radioValue};
     
      this.os.getCheckoutSession(data,this.cartData._id).subscribe((data:any)=>{
        this.sessionUrl=data.session.url
        console.log(this.sessionUrl)
        window.location.href = this.sessionUrl; 
      })
    }
    viderChariot(){
      this.cs.viderCart().subscribe((res:any)=>{
        this.messageService.success('Succé')
        this.hasACart=false
      })
    }
}
