import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  email:string;
  password: string;
 
    constructor(public _auth: AuthService, public router: Router, public dialog: MatDialog)
    {

    }

    canActivate():boolean
    {
      if (this._auth.loggedIn())
      {
        return true;
      }
      else
      {
        this.router.navigate(['login']);
        return false;
      }
    }
}
