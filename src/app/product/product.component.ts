// import { WishlistComponent } from './../wishlist/wishlist.component';
import { UserfeaturesService } from './../userfeatures.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  @Input() public prod:any;
  @Input() public wlclass:any;
  @Output() chwl = new EventEmitter();

  wishlistClass = "far fa-heart";

  constructor(
    public router:Router,
    private _snackBar: MatSnackBar,
    public _userFeatures : UserfeaturesService,
    public route: ActivatedRoute
    ) { }

  ngOnInit() 
  {

    if( this.route.snapshot.routeConfig.path === 'wishlist')
    {
      this.wishlistClass = this.wlclass;
    }

  }

  goProdDesc(prod)
  {
    console.log(prod.prodid);
    this.router.navigate(['products', prod.prodid]);
  }

  qtyInStock(availability)
  {
    if (availability === 'In Stock')
    {
      return true;
    }
    return false;
  }

  wishlistThis(event)
  {

    if( this.route.snapshot.routeConfig.path !== 'wishlist')
    {
        let className = event.target.className;
        // console.log(className);
        if (className === 'far fa-heart')
        {
              //Adding to Wishlist
              let prodid = this.prod.prodid;
              let _id = localStorage.getItem('userId');
              this._userFeatures.addToWishlist(prodid, _id)
              .subscribe( 
                res=> { console.log(res);
                  //Displaying change to User
                  this.wishlistClass = 'fas fa-heart';
                  this._snackBar.open(`${this.prod.prodname} added to wishlist`, null, {
                    duration: 1500,
                  }); },
                err => { 
                  console.log(err);
                  this._snackBar.open(`Please Login to Add items to Wishlist`, null, {
                    duration: 1500,
                  });
                  return;
                }
              );    
        }  //if block ends here

        else
        {
            //Removing from wishlist
            let prodid = this.prod.prodid;
            let _id = localStorage.getItem('userId');
            this._userFeatures.removeFromWishlist(prodid, _id)
            .subscribe(
              res => {
                  console.log(res);
                  this.chwl.emit(res.id);
                  this.wishlistClass = 'far fa-heart';
                  this._snackBar.open(`${this.prod.prodname} removed from wishlist`, null, {
                    duration: 1500,
                  });
              },
              err => 
              {
                console.log(err);
              }
            );
        } //else ends here

  } //Main If

  else
  {
    //Removing Items from Wishlist Route
    let prodid = this.prod.prodid;
    let _id = localStorage.getItem('userId');
    this._userFeatures.removeFromWishlist(prodid, _id)
    .subscribe(
      res => {
          console.log(res);
          this._snackBar.open(`${this.prod.prodname} removed from wishlist`, null, {
            duration: 1500,
          });
        this.chwl.emit(this.prod.prodid);
      },
      err => 
      {
        console.log(err);
      }
    );
  }

  } //function ends

}
