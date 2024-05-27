import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class GuarduserGuard implements CanActivate {
  constructor(private as:AuthService,private route:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
    return new Promise((resolve,reject)=>{
      if(this.as.loggedIn()==true){
        resolve(true) 
      }else{
        this.route.navigate(['/login'])
        localStorage.removeItem('token')
        resolve(false)
      }
    })
  }
  
}