import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  header=new HttpHeaders().set('authorization',`bearer ${localStorage.getItem('token')}`)
  constructor(private http:HttpClient) { }

  getCheckoutSession(data:any,id:any){
    return this.http.post(Environment.urlBackend+'commandes/checkout-session/'+id,data,{headers:this.header})
  }

  getAllOrders(){
    let params = new HttpParams().set('sort', '-createdAt')
    return this.http.get(Environment.urlBackend+'commandes',{headers:this.header,params:params})
  }
  updateOrdersStatus(id:any,data:any){
    return this.http.put(Environment.urlBackend+'commandes/'+id,data,{headers:this.header})
  }
}
