import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  header=new HttpHeaders().set('authorization',`bearer ${localStorage.getItem('token')}`)
  constructor(private http:HttpClient) { }
  addReviewOnProduct(data:any,id:any){
    console.log(this.header)
    return this.http.post(Environment.urlBackend+'products/'+id+'/reviews',data,{headers:this.header})
  }
  getProductReviews(id:any){
    return this.http.get(Environment.urlBackend+'products/'+id+'/reviews')
  }
}
