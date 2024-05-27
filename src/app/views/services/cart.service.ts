import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  header=new HttpHeaders().set('authorization',`bearer ${localStorage.getItem('token')}`)
  constructor(private http:HttpClient) { }
  getLoggedUserCart(){
    return this.http.get(Environment.urlBackend+'chariot',{headers:this.header})
  }
  updateChariotItem(data:any,id:any){
    return this.http.put(Environment.urlBackend+'chariot/'+id,data,{headers:this.header})
  }
  deleteChariotItem(id:any){
    return this.http.delete(Environment.urlBackend+'chariot/'+id,{headers:this.header})
  }
  applyCoupon(data:any){
    return this.http.put(Environment.urlBackend+'chariot/applyCoupon',data,{headers:this.header})
  }
  addProductToCart(data:any){
    return this.http.post(Environment.urlBackend+'chariot',data,{headers:this.header})
  }
  viderCart(){
    return this.http.delete(Environment.urlBackend+'chariot',{headers:this.header})
  }
}
