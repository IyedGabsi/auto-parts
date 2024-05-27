import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  adminProfil={
    name:'',
    role:''
  }
  isLoggedIn:boolean=false
  helper=new JwtHelperService
  constructor(private http:HttpClient,private router:Router) { }
  
  sendRegisterCode(data:any){
    return this.http.post(Environment.urlBackend+'auth/sendRegisterCode',data)
  }

  register(data:any){
    return this.http.post(Environment.urlBackend+'auth/register',data)
  }

  login(data:any){
    return this.http.post(Environment.urlBackend+'auth/login',data)
  }
  saveProfileData(token:any){
    localStorage.setItem('token',token)
  }
  getUserData(key:string){
    let token:any=localStorage.getItem('token')
    if(token){
      let decodedToken=this.helper.decodeToken(token)
    if (key==='email'){
      return decodedToken.email
    }else if (key==='name'){
      return decodedToken.name
    }
    else if (key==='role'){
      return decodedToken.role
    }
    }else{
      return ''
    }
  }
  adminloggedIn(){
    let token:any=localStorage.getItem('token')
    if(!token){
      return false
    }
     let decodeToken=this.helper.decodeToken(token)
     if(decodeToken.role!=='admin'){
      return false
     }
     if(this.helper.isTokenExpired(token)){
      return false 
     }
     return true
      
  }
  loggedIn(){
    let token:any=localStorage.getItem('token')
    if(!token){
      return false
    }
     if(this.helper.isTokenExpired(token)){
      return false 
     }
     return true
      
  }
  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
  forgotPassword(data:any){
    return this.http.post(Environment.urlBackend+'auth/forgotPassword',data)
  }
  verifyResetCode(data:any){
    return this.http.post(Environment.urlBackend+'auth/verifResetCode',data)
  }
  resetPassword(data:any){
    return this.http.put(Environment.urlBackend+'auth/resetPassword',data)
  }
}
