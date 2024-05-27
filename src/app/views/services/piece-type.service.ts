import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PieceTypeService {
  header=new HttpHeaders().set('authorization',`bearer ${localStorage.getItem('token')}`)
  constructor(private http:HttpClient) { }
  getPieceTypesForCategories(id:any){
    return this.http.get(Environment.urlBackend+'categories/'+id+'/piecetypes')
  }
  addPieceType(data:any){
    return this.http.post(Environment.urlBackend+'pieces',data,{headers:this.header}) 
  }
  getPieceTypes(){
    return this.http.get(Environment.urlBackend+'pieces') 
  }
  UpdatePieceType(data:any,id:any){
    return this.http.put(Environment.urlBackend+'pieces/'+id,data,{headers:this.header}) 
  }
  deletePieceType(id:any){
    return this.http.delete(Environment.urlBackend+'pieces/'+id,{headers:this.header}) 
  }
}
