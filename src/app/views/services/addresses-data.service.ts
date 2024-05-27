
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AddressesDataService {
  header=new HttpHeaders().set('authorization',`bearer ${localStorage.getItem('token')}`)
  constructor(private http:HttpClient) { }

  getAddresses(){
    return  this.http.get(Environment.urlBackend+'addresses',{headers:this.header})
  }
  deleteAddress(id:any){
    return this.http.delete(Environment.urlBackend+'addresses/'+id,{headers:this.header})
  }
  addAddress(data:any){
    return this.http.post(Environment.urlBackend+'addresses',data,{headers:this.header})
  }
}
