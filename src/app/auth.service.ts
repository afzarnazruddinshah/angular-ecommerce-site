// import { Observable } from 'rxjs/Observable';
import { IId } from './testimonial';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //API Paths
  public REGISTRATION_API = " http://localhost:3001/api/register";
  public LOGIN_API = "http://localhost:3001/api/login";


  constructor(public http: HttpClient, public router:Router) { }

  registerUser(userData)
  {
    return this.http.post<any>(this.REGISTRATION_API, userData);
  }

  loginUser(userData)
  {
    return this.http.post<any>(this.LOGIN_API, userData);
  }


  loggedIn()
  {
    this.getUser();
    return !!localStorage.getItem('token');
  }


  logoutUser()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('fname');
    window.location.href="";
  }

  getToken()
  {
    return localStorage.getItem('token');
  }

  getUser(): Observable<any>
  {
    return this.http.post<any>('http://localhost:3001/api/users', '');
  }


}
