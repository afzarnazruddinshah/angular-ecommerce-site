import { LogoutDialogComponent } from './../logout-dialog/logout-dialog.component';
import { AuthService } from './../auth.service';
// import { RouteService } from './../route.service';
import { Observable } from 'rxjs';
import { LoginData } from './../login-data';
import { TestimonialsService } from './../testimonials.service';
// import { LoginComponent } from './../login/login.component';
import { Component, OnInit, OnChanges } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
// import { of } from 'rxjs';
// import { map, mapTo, filter, switchMap, tap } from 'rxjs/operators';
// import { AuthComponent } from '../auth/auth.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  constructor(
    public dialog: MatDialog, 
    public _usersData: TestimonialsService,  
    public route: ActivatedRoute, 
    public router: Router,
    public _authService : AuthService,
    public _snackBar: MatSnackBar
   ) 
  { }

  email: string;
  password: string;
  data:LoginData;
  path:boolean;

  datavar  = [];
  fname: string;
  

  usersData = [];

  ngOnInit() {

    // this._usersData.getUserStories()
    // .subscribe( data => {
    //   // console.log(data);

    //   this.usersData = data;
    //   // console.log(this.usersData);
    // });

    this.path = this._authService.loggedIn();
    // console.log(this.path);


    this.fname = localStorage.getItem('fname');


      // this._authService.getUser()
      // .subscribe(
      //   res=> console.log(res),
      //   err => {
      //     console.log(err);
      //     // window.location.href = "";
      //   }
      // )
      // let routePath = this._routeService.getRoute().snapshot._routerState.url;
      // console.log(routePath);
    // console.log(this._routeService.routePath);

    //Get route:
    // this.routePathParam = this.navigationEnd
    // .pipe(
    //   map( () => this.route.root),
    //   switchMap( firstChild => {
    //     if (firstChild && firstChild.firstChild)
    //     {
    //       const targetRoute = firstChild.firstChild;
    //       return targetRoute.paramMap.pipe(map(paramMap => paramMap.get('subRoutePathParam')));
    //     }
    //     else
    //     {
    //       return of(null);
    //     }
    //   })

    // );

    // console.log(this.routePathParam);
    
  }

  ngOnChanges()
  {
    // window.location.reload();
  }


  // isLoginSuccessful()
  // {
  //   console.log('Login Check Happens Here');
  //   // console.log(data.email, this.data.email);
  //   let resultData = this.usersData.filter( (data) => this.data.email === data.email  && this.data.password === data.pwd);
  //   // console.log(resultData);

  //   if (resultData.length !== 0)
  //   {
  //     this.fname = resultData[0].fname;
  //     console.log(this.fname, 'Login Successfull');
  //   }
  //   else
  //   {
  //     console.log('Login Failed');
  //   }

  // }

  openDialog()
  {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '500px',
      data: { fname : this.fname}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   // console.log('The dialog was closed');
    //   this.data = result;
    //   console.log(this.data);
    //   this.isLoginSuccessful();
    // });
  }
  
  myOrdersConst()
  {
    this._snackBar.open(`Very Sorry 🤐: My Orders Section is under construction`, null, {
      duration: 2500,
    });
  }


}
