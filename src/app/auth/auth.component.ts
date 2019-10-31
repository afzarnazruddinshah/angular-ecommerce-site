import { Login } from './../signup';
import { Component, OnInit } from '@angular/core';
import { LoginData } from '../login-data';
import { Router } from '@angular/router';
import { TestimonialsService } from '../testimonials.service';
import { AuthService } from '../auth.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  email = '';
  pwd= ''
  usersData = [];
  logindata:LoginData;
  fname:string;
  loginError:boolean = false;

  loginModel = new Login('', '');

  constructor(  public router: Router, 
                public _usersData: TestimonialsService,
                public _auth: AuthService,
                private titleService: Title
                ) { }

  ngOnInit() {
    this.titleService.setTitle( `AngKart Sea Foods \xa0 |  \xa0 Login` );
    // console.log(this.route.snapshot.routeConfig.path);
  }

  checkLogin(data)
  {
    console.log(data);
    this.logindata = data;
    this.isLoginSuccessful(data);
  }

  isLoginSuccessful(data)
  {
    // console.log(data.email, this.data.email);
    // let resultData = this.usersData.filter( (data) => this.logindata.email === data.email  && this.logindata.password === data.pwd);
    // console.log(resultData);

    // if (resultData.length !== 0)
    // {
    //   this.fname = resultData[0].fname;
    //   console.log(this.fname, 'Login Successfull');
    //   this.dialogRef.close();
    // }
    // else/
    // {
    //   console.log('Login Failed');
    //   this.loginError= true;

    // }
    console.log(data);
    console.log('Login Check Happens Here');
    // console.log('LoginData'+this.logindata);
    this._auth.loginUser(data)
    .subscribe( 
      res => {
        console.log(res);
        if( res === null)
        {
            this.loginError = true;
        }
        else
        {
          console.log(res);
          console.log(res.token);
          console.log(res.result);
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.result);
          localStorage.setItem('fname', res.fname);
          window.location.href = "";
        }
      },
      err => {
        console.error(err);
        this.loginError = true;
      });
      // this.router.navigate(['']);
  }



}
