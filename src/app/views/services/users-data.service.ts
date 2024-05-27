import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  header=new HttpHeaders().set('authorization',`bearer ${localStorage.getItem('token')}`)
  constructor(private http:HttpClient) {}


  getAllUsers(){
    return  this.http.get(Environment.urlBackend+'users',{headers:this.header})
  }
  deleteUser(id:any){
    return this.http.delete(Environment.urlBackend+'users/'+id,{headers:this.header})
  }
  getLoggedUserData(){
    return  this.http.get(Environment.urlBackend+'users/loggedUser',{headers:this.header})
  }
  updateLoggedUserData(data:any){
    return this.http.put(Environment.urlBackend+'users/updateLoggedUser',data,{headers:this.header})
  }
  updateLoggedUserPassword(data:any){
    return this.http.put(Environment.urlBackend+'users/updateLogUserPass',data,{headers:this.header})
  }
  deleteLoggedUser(){
    return this.http.delete(Environment.urlBackend+'users/deleteLoggedUser',{headers:this.header})
  }
}

