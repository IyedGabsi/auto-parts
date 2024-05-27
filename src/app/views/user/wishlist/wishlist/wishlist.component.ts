import { Component ,OnInit} from '@angular/core';
import { WishlistService } from '../../../services/wishlist.service';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { Router } from '@angular/router';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { CartService } from '../../../services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,NzCardModule,NzPaginationModule,NzEmptyComponent ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  listOfData: any[] = [];
  paginatedData: any[] = []; 
  totalItems = 0; 
  currentPage = 1; 
  pageSize = 8

  constructor(private wls:WishlistService,private messageService: NzMessageService,private router:Router,private cs:CartService){
    // this.wls.getLoggedUserWishList().subscribe((data:any)=>{
    //   this.listOfData=data.data
    // })
  }

  
  ngOnInit() {
    
    this.getWishlistData();
  }
  
  
  getProductId(id:any){
    localStorage.setItem('productId',id)
    this.router.navigate(['/productDetails'])
  }
  getWishlistData(pageNumber = 1) {
    this.wls.getLoggedUserWishList().subscribe((data: any) => {
         this.listOfData = data.data;
        this.totalItems = data.results; 
        this.updatePaginatedData(pageNumber);
     
     
    });
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
  removeFromWishlist(id:any,i:any){
    this.wls.deleteProductFromWhishList(id).subscribe((response:any) => {
      if (response.status=='success') {
        this.paginatedData.splice(i,1) 
        this.messageService.success(response.message);
        let indexOnList=i+this.pageSize*(this.currentPage-1)
          this.listOfData.splice(indexOnList,1)
          this.totalItems=this.totalItems-1
      } else {
        this.messageService.error('Deletion failed!');
      }
    });
  }
  addToCart(id:any){
    
    this.cs.addProductToCart({productId:id}).subscribe((res:any)=>{
      
      this.router.navigate(['/user/cart'])
    },(err:HttpErrorResponse)=>{
      
      this.messageService.error(`Vous devriez d'abord vous connecter`)
    })
  }
  
}
