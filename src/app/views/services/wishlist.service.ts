import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  header=new HttpHeaders().set('authorization',`bearer ${localStorage.getItem('token')}`)
  constructor(private http:HttpClient) { }

  getLoggedUserWishList(){
    return this.http.get(Environment.urlBackend+'wishList',{headers:this.header})
  }
  addProductToWishList(data:any){
    return this.http.post(Environment.urlBackend+'wishList',data,{headers:this.header})
  }
  deleteProductFromWhishList(id:any){
    return this.http.delete(Environment.urlBackend+'wishList/'+id,{headers:this.header})
  }
}
