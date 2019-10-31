import { Router } from '@angular/router';
import { ProductsService } from './../products.service/products.service';
import { UserfeaturesService } from './../userfeatures.service';
import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  public wishlist = [];

  wlclass="fas fa-trash-alt";
  
  public filteredWishlist = [];
  public filteredWishlist2 = [];
  public _id:string;
  public _fname: string;

  public dummy = [];
  public index;

  constructor(
    public _userFeatures: UserfeaturesService,
    public _prodsService : ProductsService,
    public titleService: Title,
    public router: Router
  ) { }

  ngOnInit() {
      // console.clear();
      console.log('ngOnInit');
      this.getWL();
      // var j;
      // console.log(this.filteredWishlist.length);
      // for(j=0; j < this.filteredWishlist.length; j++ )
      // {
      //   console.log(j);
      //   console.log(this.filteredWishlist[j]);
      // }

    // this.filteredWishlist = this._prodsService.getProducts().filter( prod => prod.prodid === this.wishlist[0]);
    // console.log(this.filteredWishlist);
    // let i;
    // for(i = 0; i< )
  } //ngOnInit ends here

 getWL()
 {
  this._id = String(localStorage.getItem('userId'));
  this.titleService.setTitle( `AngKart Sea Foods \xa0 | \xa0 Wishlist` );
  this._fname = String(localStorage.getItem('fname'));

  this.filteredWishlist = this._prodsService.getProducts();
  console.log(this.filteredWishlist);

  this._userFeatures.getWishlist(this._id)
  .subscribe( 
    res => {
      this.wishlist = res;
      console.log(this.wishlist);

      // var i;
      // for (i=0; i < this.wishlist.length; i++)
      // {
      //   this.dummy.push(this.filteredWishlist.filter(
      //     (prod) => prod.prodid === this.wishlist[i]
      //   ));
      // }

      this.wishlist.forEach( (item, index) => {

        this.dummy.push(this.filteredWishlist.filter(
          (prod) => prod.prodid === this.wishlist[index]
        ));

      });
      console.log(this.dummy);

      // this.dummy.push(this.filteredWishlist.filter(
      //   (prod, iter)=> prod.prodid === this.wishlist[iter]
      // ));
      // console.log(this.dummy);
      // console.log(this.filteredWishlist);

      // this.filteredWishlist2 = this.dummy[0];
      // this.filteredWishlist2.push(this.dummy[][0]);
      this.dummy.forEach( item => {
        this.filteredWishlist2.push(item[0]);
      })
      console.log(this.filteredWishlist2);
      // var j=0;
      // for(j=0; j < this.filteredWishlist.length; j++ )
      // {
      //   this.filteredWishlist2.push(this.filteredWishlist[j][0]);
      // }
  }, 
    err => { 
      console.log(err);
      this.router.navigate(['login']);
    }
    );
 }


 updateWL(id){
  console.log(id);
  console.log(this.filteredWishlist2.indexOf(prod=> prod.prodid === id));
  this.filteredWishlist2.splice( this.filteredWishlist2.indexOf( prod=> prod.prodid === id));
  console.log(this.filteredWishlist2);
  console.log(typeof this.filteredWishlist2);
 }

}
