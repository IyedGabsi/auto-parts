import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehictypeService {
  header=new HttpHeaders().set('authorization',`bearer ${localStorage.getItem('token')}`)
  constructor(private http:HttpClient) { }
  getAllVehicType(){
    return this.http.get(Environment.urlBackend+'vehicules')
  }
  getCategoriesForVehiculTypes(id:any){
    return this.http.get(Environment.urlBackend+'vehicules/'+id+'/categories')
  }
  getCategories(){
    return this.http.get(Environment.urlBackend+'categories')
  }
}
