import { Component, OnDestroy, OnInit,Input } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
// import { NzSiderModule } from 'ng-zorro-antd/sider';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { VehictypeService } from '../../../services/vehictype.service';
import { CommonModule } from '@angular/common';
import { PieceTypeService } from '../../../services/piece-type.service';
import { ProductService } from '../../../services/product.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { MarquesDataService } from '../../../services/marques-data.service';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { Console } from 'console';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { Router } from '@angular/router';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../services/search.service';
import { UsersDataService } from '../../../services/users-data.service';
import { WishlistService } from '../../../services/wishlist.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CartService } from '../../../services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-allproducts',
  standalone: true,
  imports: [NzLayoutModule,NzMenuModule,NzIconModule,NzButtonModule,CommonModule,NzSelectModule,FormsModule,NzSliderModule,NzInputModule,NzInputNumberModule,NzCheckboxModule,NzRadioModule,NzEmptyModule,NzPaginationModule],
  templateUrl: './allproducts.component.html',
  styleUrl: './allproducts.component.scss',
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
export class AllproductsComponent implements OnInit,OnDestroy {
  private subscription: Subscription;
  wishList:any=[]
  keyword='';
  
  lvehicTypeId:any
  lcategorieId:any
  lpieceTypeId:any
  lsort:any
  lkeyword:any
  radioValue = ''
  totalProducts=0
  currentPage = 1; 
  pageSize = 5
  sortBy:any
  mostSelled=false
  creatAt=false
  ratingSort=false
  value2 = [1,10000];
  params:any={}
  products:any=[]
  marques: any=[]
  vehicTypes: any=[]
  sousmarques:any=[]
  vehiculTypeId:any
  categorieId:any
  categories: any=[]
  piecetypes: any=[]
  listOfMarque: Array<{ label: string; value: string }> = [];
  listOfTagMarques = [];
  selectedVehicMarque=null
  selectedSousMarque=null
  constructor(private vts:VehictypeService, private pts:PieceTypeService,private cs:CartService,private ws:WishlistService,private messageService: NzMessageService ,private uds:UsersDataService ,private ps:ProductService,private ms:MarquesDataService,private router:Router,private ss:SearchService,@Inject(PLATFORM_ID) private platformId: any){
    this.subscription = this.ss.getSearchKeyword().subscribe(keyword => {
      this.keyword = keyword;
     
      // Call your function here with the updated keyword
      if(this.keyword!=''){
        this.applyFunction(this.keyword);
        this.lkeyword=this.keyword
        localStorage.setItem('keyword',this.keyword)
      }
    });
  }
  search(){
    if(this.keyword!==''){
      this.params.keyword=this.keyword
    }
    this.getProducts(this.params)
  }
  applyFunction(keyword:string){
    this.params.keyword=keyword
    this.getProducts(this.params,this.listOfTagMarques)
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      this.lvehicTypeId=localStorage.getItem('vehicTypeId')
      this.lcategorieId=localStorage.getItem('categorieId')
      this.lpieceTypeId=localStorage.getItem('pieceTypeId')
      this.lsort=localStorage.getItem('sort')
      this.lkeyword=localStorage.getItem('keyword')
    }
    if (isPlatformBrowser(this.platformId)){}
    if (isPlatformBrowser(this.platformId)){}
      this.getVehiculTypes()
      if(this.lpieceTypeId){
        this.params.piecetype=this.lpieceTypeId
      }
      // if(this.lcategorieId){
      //   this.params.categorie=this.lcategorieId
      // }
      if(this.lvehicTypeId){
        this.params.vehicultype=this.lvehicTypeId
      }
      if(this.lkeyword){
        this.params.keyword=this.lkeyword
      }
      if(this.lsort){
        this.params.sort=this.lsort
      }
      this.params.fields='title,imageCover,description,price,priceAfterDiscount,ratingsAverage'
      this.getProducts(this.params)
      this.getMarques()
      this.getLoggedUserData()
  }
  getLoggedUserData(){
    this.uds.getLoggedUserData().subscribe((data:any)=>{
      this.wishList=data.data.wishList
     
    })
  }
  getMarques(){
    this.ms.getAllMarques().subscribe((data:any)=>{
      this.marques=data.data
      
      const marque: Array<{ label: string; value: string }> = [];
      for (let i of this.marques) {
        marque.push({ label: i.name, value: i._id });
      }
      
      this.listOfMarque = marque;
      
    })
  }
  
  addPieceMarqueFilter(){
   

    console.log(this.listOfTagMarques)
    this.getProducts(this.params,this.listOfTagMarques)
  }
  addVehicMarqueFilter(){
    this.ms.getSousMarqueForMarque(this.selectedVehicMarque).subscribe((data:any)=>{
      this.sousmarques=data.data
    })
  }
  addModelDeVoitureFilter(){
    this.params.marque=this.selectedVehicMarque
    this.params.sousmarque=this.selectedSousMarque
    this.getProducts(this.params,this.listOfTagMarques)
  }
  getProducts(params?: any,dupParams?:any){
    this.ps.getProducts(params,dupParams).subscribe((data:any)=>{
      
      this.totalProducts=data.paginationResult.totalDocuments
      console.log(data.data)
      this.products=data.data
    })
  }
  updatePaginatedData(pageNumber: number) {
    this.params.page=pageNumber
    this.getProducts(this.params,this.listOfTagMarques)
    
  }

  changePage(pageNumber: number) {
    
    this.currentPage = pageNumber;
    this.updatePaginatedData(pageNumber);
  }
  getVehiculTypes(){
    this.vts.getAllVehicType().subscribe((data:any)=>{
      this.vehicTypes=data.data
    })
  }
  onSubMenuOpen(event: boolean, id:any):void {
    if (event) {
      this.vts.getCategoriesForVehiculTypes(id).subscribe((data:any)=>{
        this.categories=data.data
        this.vehiculTypeId=id
      })
      
    }
  }
  onCategorieOpen(event: boolean, id:any) :void {
    if (event) {
      this.pts.getPieceTypesForCategories(id).subscribe((data:any)=>{
        this.piecetypes=data.data
        this.categorieId=id
      })
      
    }
  }
  handleItemClick(event:MouseEvent,id:any):void {
    this.params.vehicultype=this.vehiculTypeId
    // this.params.categorie=this.categorieId
    this.params.piecetype=id
   
    this.getProducts(this.params,this.listOfTagMarques)
    // console.log(piece.vehictype)
  }
  updateSlider(){
    console.log(this.value2[1])
    let newValue=[this.value2[0],this.value2[1]]
    this.value2=newValue
  }
  addPriceRangeFilter(event?:any){
    console.log(this.value2)
    this.params['price[gt]']=this.value2[0]
    this.params['price[lt]']=this.value2[1]
    this.getProducts(this.params,this.listOfTagMarques)
  }
  applyMostSelled(){
   
   if(this.mostSelled==true){
    if(this.params.sort){
      this.params.sort=`${this.params.sort},-sold`
    }else{
      this.params.sort='-sold'
    }
   }else{
    let index1 = this.params.sort.indexOf(",-sold")
    if(index1 !== -1){
     
      this.params.sort = this.params.sort.replace(",-sold", "")
      
      
    }else{
      let index2=this.params.sort.indexOf("-sold,")
      if(index2 !== -1){
        this.params.sort = this.params.sort.replace("-sold,", "")
      } else{
        this.params.sort = this.params.sort.replace("-sold", "")
      }
    }
    
   }
    this.getProducts(this.params,this.listOfTagMarques)
  }
  applyCreatAtSort(){
    
    if(this.creatAt==true){
      if(this.params.sort){
        this.params.sort=`${this.params.sort},-createdAt`
      }else{
        this.params.sort='-createdAt'
      }
    }else{
      let index1 = this.params.sort.indexOf(",-createdAt")
      if(index1 !== -1){
        console.log(index1)
        this.params.sort = this.params.sort.replace(",-createdAt", "")
        
        
      }else{
        let index2=this.params.sort.indexOf("-createdAt,")
        if(index2 !== -1){
          this.params.sort = this.params.sort.replace("-createdAt,", "")
        } else{
          this.params.sort = this.params.sort.replace("-createdAt", "")
        }
      }
      
    }
    
    this.getProducts(this.params,this.listOfTagMarques)
  }
  applyPriceSort(){
    
    if(this.radioValue=='ass'){
      if(this.params.sort){
        let array=this.params.sort.split(',')
        let index=array.indexOf('-price')
        if(index!=-1){
          array.splice(index,1)
        }
        array.splice(0,0,'price')
        this.params.sort=array.join(',')
      }else{
        this.params.sort='price'
      }
    }else if(this.radioValue=='des'){
      if(this.params.sort){
        let array=this.params.sort.split(',')
        let index=array.indexOf('price')
        if(index!=-1){
          array.splice(index,1)
        }
        array.splice(0,0,'-price')
        this.params.sort=array.join(',')
      }else{
        this.params.sort='-price'
      }
    }
   
    this.getProducts(this.params,this.listOfTagMarques)
  }
  applyRatingSort(){
    if(this.ratingSort==true){
      if(this.params.sort){
        this.params.sort=`-ratingsAverage,${this.params.sort}`
      }else{
        this.params.sort='-ratingsAverage'
      }
     }else{
      let index1 = this.params.sort.indexOf(",-ratingsAverage")
      if(index1 !== -1){
       
        this.params.sort = this.params.sort.replace(",-ratingsAverage", "")
        
        
      }else{
        let index2=this.params.sort.indexOf("-ratingsAverage,")
        if(index2 !== -1){
          this.params.sort = this.params.sort.replace("-ratingsAverage,", "")
        } else{
          this.params.sort = this.params.sort.replace("-ratingsAverage", "")
        }
      }
      
     }
      this.getProducts(this.params,this.listOfTagMarques)
  }

  getProductId(id:any){
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    localStorage.setItem('productId',id)
    }
    this.router.navigate(['/productDetails'])
  }
  isFavorite: boolean = false
  
 
  toggleFavorite(event: any, index: number) {
    const product = this.products[index];
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
    
  }
  isProductInWishlist(productId: string): boolean {
    return this.wishList.includes(productId);
  } 
  addToCart(id:any){
    
    this.cs.addProductToCart({productId:id}).subscribe((res:any)=>{
      
      this.router.navigate(['/user/cart'])
    },(err:HttpErrorResponse)=>{
      
      this.messageService.error(`Vous devriez d'abord vous connecter`)
    })
  }

  isCollapsed = true; 
  test=false
onCollapseChange(collapsed: boolean) {
  this.isCollapsed = collapsed;
  this.test=collapsed
  console.log(this.isCollapsed)
}
  ngOnDestroy(): void {

    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    localStorage.removeItem('vehicTypeId');
    localStorage.removeItem('categorieId');
    localStorage.removeItem('pieceTypeId');
    localStorage.removeItem('sort');
    localStorage.removeItem('keyword');
    }
  }

}
