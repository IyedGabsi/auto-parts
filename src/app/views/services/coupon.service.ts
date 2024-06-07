import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  header=new HttpHeaders().set('authorization',`bearer ${localStorage.getItem('token')}`)
  constructor(private http:HttpClient) { }
  getCoupons(){
    return this.http.get(Environment.urlBackend+'coupons',{headers:this.header})
  }
  deleteCoupon(id:any){
    return this.http.delete(Environment.urlBackend+'coupons/'+id,{headers:this.header})
  }
  addCoupons(data:any){
    return this.http.post(Environment.urlBackend+'coupons',data,{headers:this.header})
  }
  updateCoupons(id:any,data:any){
    return this.http.put(Environment.urlBackend+'coupons/'+id,data,{headers:this.header})
  }
}
