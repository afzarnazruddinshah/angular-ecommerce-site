import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Signup } from '../signup';
import { Router } from '@angular/router';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupModel = new Signup('', '', null, '', '', null, '', '');

  
  gender= [
    { view: 'Male', value: 'male'},
    { view: 'Female', value: 'female'},
    { view: 'Others', value: 'others'}
  ];
  
  constructor(
    public _auth: AuthService, 
    public router: Router
    , private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle( `AngKart Sea Foods \xa0 |  \xa0 SignUp` );
  }


  registerNewUser(signupModel)
  {
    // event.preventDefault();
    console.log(signupModel);
    this._auth.registerUser(signupModel)
    .subscribe((res)=> {
      console.log(res);
      console.log(res.token);
      // localStorage.setItem('token', res.token);
      
    });
    
    window.location.href = "login";
  }

}
