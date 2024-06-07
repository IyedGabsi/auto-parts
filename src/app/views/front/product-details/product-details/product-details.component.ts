import { Component,OnInit,OnDestroy } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../../services/review.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { AuthService } from '../../../services/auth.service';
import { Router, UrlSerializer } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { HttpErrorResponse } from '@angular/common/http';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { WishlistService } from '../../../services/wishlist.service';
import { UsersDataService } from '../../../services/users-data.service';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,FormsModule,NzButtonModule,NzPaginationModule,NzInputModule,NzIconModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  animations: [
    trigger('heartSizeChange', [
      state('outline', style({
        transform: 'scale(1)'
      })),
      state('fill', style({
        transform: 'scale(1.2)'
      })),
      transition('outline => fill', [
        animate('0.2s ease-in')
      ]),
      transition('fill => outline', [
        animate('0.2s ease-out')
      ])
    ])
  ]
})
export class ProductDetailsComponent implements OnInit{
  wishList:any=[]
  relatedProducts:any
   productId:any
  productData:any={}
  reviewsData:any={}
  addShowData:any
  stars: boolean[] = [false, false, false, false, false]; 
  selectedRating: number = 0; 
  opinion: string = '';
  paginatedData: any[] = []; 
 
  totalItems = 0; 
  currentPage = 1; 
  pageSize = 2

  images:any=[] ;
  featuredImage=''
  constructor(private ps:ProductService,private cs:CartService,private rs:ReviewService,private uds:UsersDataService,private ws:WishlistService,private messageService: NzMessageService,private as:AuthService,private router:Router){
    
  }
  ngOnInit () {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      this.productId=localStorage.getItem('productId')
    }
    this.ps.getProduct(this.productId).subscribe((data:any)=>{
      this.productData=data.data
      this.featuredImage=this.productData.imageCover
      this.images=this.productData.images
      this.images.unshift(this.productData.imageCover)
      this.getRelatedProducts()
    })
    this.getReviewsItems()
     this.getLoggedUserData()
  }
  onMouseOver(image: string): void {
    this.featuredImage = image;
  }

  scrollLeft(): void {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft -= 180;
    }
  }

  scrollRight(): void {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft += 180;
    }
  }

  openImageModal(): void {
    console.log('hhhh')
  }

  getLoggedUserData(){
    this.uds.getLoggedUserData().subscribe((data:any)=>{
      this.wishList=data.data.wishList
    
    })
  }
  getRelatedProducts() {
    console.log(this.productData.piecetype)
    let params={
      'page':'1',
      'limit':'4',
      'piecetype':this.productData.piecetype,
    }
    
   this.ps.getProducts(params).subscribe((data:any)=>{
      this.relatedProducts=data.data
    
    })
   
  }
  getReviewsItems(pageNumber = 1) {
    this.rs.getProductReviews(this.productId).subscribe((data:any)=>{
      this.reviewsData=data.data
      this.totalItems = data.results;
      
      this.updatePaginatedData(pageNumber);
    })
    
  }
  updatePaginatedData(pageNumber: number) {
    
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.reviewsData.slice(startIndex, endIndex);
    
  }
  changePage(pageNumber: number) {
    
    this.currentPage = pageNumber;
    this.updatePaginatedData(pageNumber);
  }
  addtocart(id:any){
    
    let data={productId:id}
    this.cs.addProductToCart(data).subscribe((res:any)=>{
      console.log(res)
     this.router.navigate(['/user/cart'])
    },(err:HttpErrorResponse)=>{
      console.log(err)
      this.messageService.error(`Vous devriez d'abord vous connecter`)
    })
  }
  selectRating(index: number): void {
    this.selectedRating = index + 1;
    for (let i = 0; i <= index; i++) {
      this.stars[i] = true;
    }
    for (let i = index + 1; i < this.stars.length; i++) {
      this.stars[i] = false;
    }
  }
  submitReview(): void {
    let data={
      comment:this.opinion,
      rating:this.selectedRating
    }
    
    this.rs.addReviewOnProduct(data,this.productId).subscribe((res:any)=>{
     
      this.productData.ratingsQuantity=this.productData.ratingsQuantity+1
      this.totalItems=this.totalItems+1
      this.selectedRating = 0;
      this.opinion = '';
      this.stars.fill(false);
      this.addShowData={
        comment:res.data.comment,
        rating:res.data.rating,
        user:{
          name:this.as.getUserData('name')
        }
      }
      
      // this.reviewsData.push()
      this.paginatedData.splice(0,0,this.addShowData)
      this.messageService.success(`Merci d'avoir partagé votre opinion!`)
      
    },(err:any)=>{
     
      if(err.error.status=500){
        console.log('hi')
        this.messageService.error(`Vous devriez d'abord vous connecter`)
      }else{
        // console.log('hi')
        console.log(err.error.errors[0].msg)
        this.messageService.error(err.error.errors[0].msg)
      }
     
    })

   
  }
  getProductId(id:any){
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    localStorage.setItem('productId',id)
    }
    this.router.navigate(['/productDetails'])
  }
  isFavorite: boolean = false
  
 
  toggleFavorite(event: any, index ?: number) {
    if(index){
      const product = this.relatedProducts[index];
    product.isFavorite = event.target.checked;

    if (product.isFavorite) {
      
      let data={
        productId:product._id
      }
      this.ws.addProductToWishList(data).subscribe((res:any)=>{
        this.wishList.push(product._id)
      },(err)=>{
        this.messageService.error(`Vous devriez d'abord vous connecter`)
      })
    } else {
      const wishListIndex = this.wishList.indexOf(product._id);
      if (wishListIndex !== -1) {
        this.wishList.splice(wishListIndex, 1);
        this.ws.deleteProductFromWhishList(product._id).subscribe((res:any)=>{
           
        })
      }
    }
    }else{
      const product=this.productData
      product.isFavorite=event.target.checked
      if (product.isFavorite) {
      
        let data={
          productId:product._id
        }
        this.ws.addProductToWishList(data).subscribe((res:any)=>{
          this.wishList.push(product._id)
        },(err)=>{
          this.messageService.error(`Vous devriez d'abord vous connecter`)
        })
      } else {
        const wishListIndex = this.wishList.indexOf(product._id);
        if (wishListIndex !== -1) {
          this.wishList.splice(wishListIndex, 1);
          this.ws.deleteProductFromWhishList(product._id).subscribe((res:any)=>{
             
          })
        }
      }
    }
    
  }
  isProductInWishlist(productId: string): boolean {
    return this.wishList.includes(productId);
  } 
  // ngOnDestroy(): void {
  //   if (typeof localStorage !== 'undefined') {
  //     localStorage.removeItem('productId');
  //   }
  // }
}
