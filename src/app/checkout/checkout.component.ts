import { Router } from '@angular/router';
import { UserfeaturesService } from './../userfeatures.service';
import { Shipaddress } from './../shipaddress';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  shipaddress = new Shipaddress('', '','', '', '', null);

  constructor( 
    public userfeatures: UserfeaturesService,
    public router: Router) { }

  ngOnInit() {
  }

  confirmOrder(shipaddress)
  {
    
    const id = String(localStorage.getItem('userId'));
    console.log(shipaddress + ' '+id);
    
    let cart;

    this.userfeatures.getCart(id)
    .subscribe( res=> {
      console.log(res);
      cart = res;

      this.userfeatures.placeOrder(shipaddress, id, cart)
      .subscribe(res=> {
        console.log(res);
        console.log('successfull');
        this.router.navigate(['ordersuccess', res.ordercolname]);
      },
      err=> {
        console.log(err);
      });

    },
    err => {
      console.log(err);
    }
    );


  }

}
