import { Component,EventEmitter,Output } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputGroupWhitSuffixOrPrefixDirective, NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router, RouterModule } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { VehictypeService } from '../../../views/services/vehictype.service';
import { CommonModule,Location } from '@angular/common';
import { PieceTypeService } from '../../../views/services/piece-type.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberGroupWhitSuffixOrPrefixDirective } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NzInputModule, NzButtonModule, NzIconModule,RouterModule,NzMenuModule,CommonModule,NzSelectModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss','./header.component.less']
})
export class HeaderComponent {
  menuSize='large'
  searchKeyword=''
  vehicTypes:any=[]
  categories:any=[]
  pieceTypes:any=[]
  @Output() applySearch: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private vs:VehictypeService, private ps:PieceTypeService,private router:Router,private location: Location){}
  search(){
    if(this.searchKeyword){
      let currentUrl=this.location.path()
      if(currentUrl=='/allproducts'){
        this.applySearch.emit(this.searchKeyword)
        // console.log('hi')
      }else{
        localStorage.setItem('keyword',this.searchKeyword)
        this.router.navigate(['/allproducts'])
      }
      
    }
  }

  getVehiculTypes(event:Boolean){
   if(event){
    this.vs.getAllVehicType().subscribe((data:any)=>{
      this.vehicTypes=data.data
     
    })
   }
  }
  getCategories(event:boolean,id:any){
    if(event){
      this.vs.getCategoriesForVehiculTypes(id).subscribe((data:any)=>{
        this.categories=data.data
      })
    }
  }
  getPieceTypes(event:boolean,id:any){
    if(event){
      this.ps.getPieceTypesForCategories(id).subscribe((data:any)=>{
        this.pieceTypes=data.data
      })
    }
  }
  getIds(idp:any,idc:any,idv:any){
    console.log(idp)
    console.log(idc)
    console.log(idv)
    localStorage.setItem('vehicTypeId',idv)
    localStorage.setItem('categorieId',idc)
    localStorage.setItem('pieceTypeId',idp)
    this.router.navigate(['/allproducts'])
  }
}
