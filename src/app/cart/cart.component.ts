import { ProductsService } from './../products.service/products.service';
import { UserfeaturesService } from './../userfeatures.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public userfname: string;
  public cart:any;
  public cartProducts= [];
  public ids= [];
  public wholeCart:any;
  public g= 'g';
  public kg = 'kg'; 
  public totalcost = 0;

  constructor( 
    public router:Router,
    public userFeatures: UserfeaturesService,
    public productsService: ProductsService
  ) { }

  ngOnInit() 
  {
    this.getFirstName(); //Get Fname from Localstorage - For Cart-Gretting-Message
    this.getCartList(); //Get Cart List
  }

  getFirstName()
  {
    this.userfname = String(localStorage.getItem('fname'));
  }

  getCartList()
  {
    let dummy = this.productsService.getProducts(); //Get Products List
    let id = String(localStorage.getItem('userId')); //Get UserId from LocalStorage
    console.log(dummy);
    //Get Cart Items
    this.userFeatures.getCart(id)
    .subscribe( 
      data => {
      console.log(data);
      this.cart = data; //storing the cart list
      console.log(this.cart);
      var i;
      
      for (i=0; i< this.cart.length; i++) //Extracting only the product ids
      {
        this.ids.push(this.cart[i].pid);
      }
      // console.log(this.ids);

      //Extracting Cart Product Details
      for(i=0;i< this.ids.length;i++)
      {
        this.cartProducts.push( dummy.filter( item=> item.prodid === this.ids[i])[0].prodname);

      }
      console.log(this.cartProducts);

      for (i=0; i< this.cart.length; i++)
      {
        this.cart[i].prodname = this.cartProducts[i];
        this.totalcost = this.totalcost + this.cart[i].cost;
      }

      // this.cart.prodname = this.cartProducts;
      console.log(this.cart);
      console.log(this.totalcost);

    },
    err=> {
      console.log(err);
    }
    
    ); //subscribing ends here
  }


  removeFromCart(item)
  {
    console.log(item);
  }

  goProdDesc(prod)
  {
    console.log(prod.pid);
    this.router.navigate(['products', prod.pid]);
  }

  checkout()
  {
    this.router.navigate(['checkout']);
  }


}
