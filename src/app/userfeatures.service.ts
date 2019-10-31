import { Shipaddress } from './shipaddress';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserfeaturesService {

  public ADD_TO_WISHLIST_URL = "http://localhost:3001/api/addwishlist"
  public GET_WISHLIST_URL = "http://localhost:3001/api/getwishlist"
  public REMOVE_FROM_WISHLIST_URL = "http://localhost:3001/api/rmwishlist";
  public ADD_TO_CART = "http://localhost:3001/api/addtocart";
  public GET_CART = "http://localhost:3001/api/getcart";
  public PLACE_ORDER = "http://localhost:3001/api/placeorder";

  constructor(public http: HttpClient) { }

  addToWishlist(prodid, id): Observable<any>
  {
    let wishlistData = { id: id, prodid: prodid};
    return this.http.post<any>(this.ADD_TO_WISHLIST_URL,wishlistData);
  }

  // removeFromWishlist(prodid, id): Observable<any>
  // {
  //     return this.http.post<any>()
  // }

  getWishlist(id): Observable<any>
  {
    let idData = { id: id};
    return this.http.post<any>(this.GET_WISHLIST_URL, idData);
  }


  removeFromWishlist(prodid, id): Observable<any>
  {
    let wishlistData = { userid: id, pid: prodid };
    return this.http.post<any>(this.REMOVE_FROM_WISHLIST_URL, wishlistData);
  }

  addToCart(id, pid, qty, cost): Observable<any>
  {
    let cartData = { id: id, pid: pid, qty: qty, cost:cost};
    return this.http.post<any>(this.ADD_TO_CART, cartData);
  }

  getCart(id): Observable<any>
  {
    let idData = { id: id};
    return this.http.post<any>(this.GET_CART, idData);
  }


  placeOrder(shipaddress, id, cart ): Observable<any>
  {
    // console.log(shipaddress, id);
    const shipData = {
      shipaddress: shipaddress,
      id: id,
      cart: cart
    };
    return this.http.post<any>(this.PLACE_ORDER, shipData);
  }

}

