import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ProductService } from '../../../services/product.service';
import { NzCarouselModule } from 'ng-zorro-antd/carousel'
import { VehictypeService } from '../../../services/vehictype.service';
import { Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NzMenuModule,CommonModule,NzCarouselModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit{
  array = ['../../../../../assets/images/imgCarousel6.png', '../../../../../assets/images/imgCarousel5.jpg', '../../../../../assets/images/imgCarousel3.jpeg', '../../../../../assets/images/imgCarousel4.jpeg'];
  params:any={}
  vehicTypes:any=[]
  lastCreatedProducts:any=[]
  mostSelledProducts:any=[]
  constructor(private router:Router,private ps:ProductService,private vts:VehictypeService,@Inject(PLATFORM_ID) private platformId: any){}
  
  ngOnInit(): void {
      this.getvehicTypes()
      this.getNouvelArrivage()
      this.getMostSold()
  }
  getvehicTypes(){
    this.vts.getAllVehicType().subscribe((data:any)=>{
      this.vehicTypes=data.data
    })
  }
  getVehicTypeId(id:any){
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined')  {
      localStorage.setItem('vehicTypeId',id)
    }
     
      this.router.navigate(['/allproducts'])
  }
  getNouvelArrivage(){
    this.params.sort='-createdAt'
    this.params.limit=5
    this.params.fields='title,imageCover,description,price,priceAfterDiscount,ratingsAverage'
    this.ps.getProducts(this.params).subscribe((data:any)=>{
      
      this.lastCreatedProducts=data.data
      
    })
  }
  getMostSold(){
    this.params.sort='-sold'
    this.params.limit=5
    this.params.fields='title,imageCover,description,price,priceAfterDiscount,ratingsAverage'
    this.ps.getProducts(this.params).subscribe((data:any)=>{
      
      this.mostSelledProducts=data.data
      
    })
  }
  goToNouvelArrivage(){
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined')  {
    localStorage.setItem('sort','-createdAt')
    }
    this.router.navigate(['/allproducts'])
  }
  goToMostSelled(){
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined')  {
    localStorage.setItem('sort','-sold')
    }
    this.router.navigate(['/allproducts'])
  }
  getProductId(id:any){
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined')  {
    localStorage.setItem('productId',id)
    }
    this.router.navigate(['/productDetails'])
  }
  
}
