import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MarquesDataService {
  header=new HttpHeaders().set('authorization',`bearer ${localStorage.getItem('token')}`)
  constructor(private http:HttpClient) { }

  getAllMarques(){
    return  this.http.get(Environment.urlBackend+'marques')
  }
  deleteMarque(id:any){
    return this.http.delete(Environment.urlBackend+'marques/'+id,{headers:this.header})
  }
  addMarque(marque:any){
    return this.http.post(Environment.urlBackend+'marques',marque,{headers:this.header})
  }
  updateMarque(id:string,marque:any){
     return this.http.put(Environment.urlBackend+'marques/'+id,marque,{headers:this.header})
  }
  getSousMarqueForMarque(id:any){
    return this.http.get(Environment.urlBackend+'marques/'+id+'/sousmarques')
  }
}
