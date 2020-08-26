import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthGuardGuard implements CanActivate {


  constructor(private authService:AuthService,private router:Router) { }

  canActivate():boolean {
   
    if(this.authService.isloggedIn()){
      return true;
    }else{
      this.router.navigate(['/login'])
        return false;
      
    }
  }
}
