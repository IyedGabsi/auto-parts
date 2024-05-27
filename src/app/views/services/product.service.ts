import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  header=new HttpHeaders().set('authorization',`bearer ${localStorage.getItem('token')}`)
  constructor(private http:HttpClient) { }

  getProduct(id:any){
    return this.http.get(Environment.urlBackend+'products/'+id)
  }
  addProduct(data:any){
    return this.http.post(Environment.urlBackend+'products',data,{headers:this.header})
  }

  getProducts(params?: any,dupParams?: any) {
 
    let queryParams = new HttpParams();
    if(dupParams){
      dupParams.forEach((marque:any) => {
        queryParams = queryParams.append('pieceMarque', marque);
      });
      
    }
   
    if (params) {
      
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          queryParams = queryParams.append(key, params[key]);
        }
      });
    }

  
    return this.http.get(Environment.urlBackend + 'products', { params: queryParams });
  }
  deleteProduct(id:any){
    return this.http.delete(Environment.urlBackend+'products/'+id,{headers:this.header})
  }
  updateProduct(data:any,id:any){
    return this.http.put(Environment.urlBackend+'products/'+id,data,{headers:this.header})
  }
}
