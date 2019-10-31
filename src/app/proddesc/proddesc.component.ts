import { UserfeaturesService } from './../userfeatures.service';
import { ProductsService } from '../products.service/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNgTemplate } from '@angular/compiler';
import { Title }     from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-proddesc',
  templateUrl: './proddesc.component.html',
  styleUrls: ['./proddesc.component.css']
})
export class ProddescComponent implements OnInit {

  public product: any;
  public products = [];

  public subDisabled = false;

  public cart = {
    pid: null,
    qty: 0,
    cost: 0 
  }

  public prodqty = 0;
  
  constructor(
    public actroute: ActivatedRoute, 
    public _proddata: ProductsService,
    public titleService: Title,
    public _snackBar: MatSnackBar,
    public userFeatures: UserfeaturesService) { }

  ngOnInit() {
    // console.log(this.products);
    // console.log(prodid);
    // let prod = this.products.filter( prodid1 => { prodid1 === prodid});
    // let prod = this.product.filter( (item)=> item.prodid === prodid);
    // console.log(prod);
    // console.log(prod);
    // this.products = this._proddata.getProducts();
    
    
    //TO get the Prod ID from Router Params
    let prodid = parseInt(this.actroute.snapshot.paramMap.get('prodid'));


    let product = this._proddata.getProducts().filter( (item)=> item.prodid === prodid);
    // console.log(product);

    this.product = product[0];
    // console.log(this.product);
    this.titleService.setTitle( `AngKart Sea Foods \xa0 |  \xa0 ${this.product.prodname}` );


    //Generating Integer Quantity Value for Cart add and remove operations
    this.prodqty = parseInt(this.product.prodqty.slice(0, this.product.prodqty.indexOf("g", 0)));
    this.cart.pid = this.product.prodid;
    if (this.cart.qty === 0)
    {
      this.subDisabled = true;
    }
  }  //ngOnInit ends here

  qtyInStock(availability)
  {
    if (availability === 'In Stock')
    {
      return true;
    }
    return false;
  }

  addQty()
  {
    // console.log('addQty clicked');
    //Calculating Quantity
    this.subDisabled = false;
    // console.log(qty + typeof qty);
    this.cart.qty = this.cart.qty + this.prodqty;
    this.cart.cost = this.cart.cost + this.product.prodprice;
  }

  subQty()
  {
    // console.log('subQty clicked'); 
    if (this.cart.qty !== 0)
    {
      this.cart.qty = this.cart.qty - this.prodqty;
    this.cart.cost = this.cart.cost - this.product.prodprice;
    }
    else
    {
      this.subDisabled = true;
    }

    
  }

  addToCart()
  {
    // console.log('addToCart is clicked');
    if(this.cart.qty === 0)
    {
      this._snackBar.open(`Dear User, Please add some quantity`, null, {
        duration: 1500,
      });
    }
    else
    {
      const id = localStorage.getItem('userId');
      this.userFeatures.addToCart(id, this.cart.pid, this.cart.qty, this.cart.cost)
      .subscribe(
        res => {
            console.log(res);
            this._snackBar.open(`Item Added to cart`, null, {
              duration: 1500,
            });
        },
        err => {
            console.log(err);
            this._snackBar.open(`Please Login to Add items to Cart`, null, {
              duration: 1500,
            });
        }
      );
    }
  }
}
