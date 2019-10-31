import { AuthService } from './../auth.service';
import { LoginData } from './../login-data';
import { Router } from '@angular/router';
import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../dialog-data';
import { TestimonialsService } from '../testimonials.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usersData = [];
  logindata:LoginData;
  
  fname:string;
  loginError:boolean = false;

  constructor(
        public dialogRef: MatDialogRef<LoginComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        public router: Router, 
        public _usersData: TestimonialsService,
        public _auth: AuthService
    ){}
  
  
  ngOnInit() {
    // this._usersData.getUserStories()
    // .subscribe( data => {
    //   // console.log(data);
    //   this.usersData = data;
    //   // console.log(this.usersData);
    // });
  }

  onNoClick(): void {
    this.dialogRef.close();    
  }

  checkLogin(data)
  {
    
    // console.log(data);
    this.logindata = data;
    this.isLoginSuccessful();
  }


  isLoginSuccessful()
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
    console.log('Login Check Happens Here');
    // console.log(this.logindata);
    this._auth.loginUser(this.logindata)
    .subscribe( 
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['']);
        this.dialogRef.close();
      });
      this.router.navigate(['']);
  }

  goToSignUp(): void
  { 
    this.dialogRef.close();
    this.router.navigate(['signup']);
  } 

}
