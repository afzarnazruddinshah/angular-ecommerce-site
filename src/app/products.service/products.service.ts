import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products =[];

  constructor() { }

  getProducts = () => {
    return [
      {"prodid": 1, "prodtype":"Fish", "prodname": 'Salmon Fish', "prodqty": '1kg', "prodprice": 500, 'availability': 'In Stock'},
      {"prodid": 2,"prodtype":"Fish", "prodname": 'Aqua Fish', "prodqty": '200g', "prodprice": 431, 'availability': 'In Stock'},
      {"prodid": 3,"prodtype":"Crab", "prodname": 'Crab', "prodqty": '1kg', "prodprice": 250, 'availability': 'Out of Stock'},
      {"prodid": 4,"prodtype":"Prawn", "prodname": 'Prawn', "prodqty": '150g', "prodprice": 130, 'availability': 'In Stock'},
      {"prodid": 5,"prodtype":"Fish", "prodname": 'Octopus', "prodqty": '100g', "prodprice": 345, 'availability': 'In Stock'},
      {"prodid": 6,"prodtype":"Crab", "prodname": 'Some Crab B', "prodqty": '300g', "prodprice": 123, 'availability': 'Out of Stock'},
      {"prodid": 7,"prodtype":"Fish", "prodname": 'Shark', "prodqty": '1kg', "prodprice": 2323, 'availability': 'In Stock'},
      {"prodid": 8,"prodtype":"Fish", "prodname": 'Fish B', "prodqty": '500g', "prodprice": 434, 'availability': 'In Stock'},
      {"prodid": 9,"prodtype":"Fish", "prodname": 'Red Salmon', "prodqty": '250g', "prodprice": 3444, 'availability': 'In Stock'},
      {"prodid": 10,"prodtype":"Fish", "prodname": 'Fish C', "prodqty": '1kg', "prodprice": 3434, 'availability': 'In Stock'},
      {"prodid": 11,"prodtype":"Fish", "prodname": 'Fish D', "prodqty": '100g', "prodprice": 3434, 'availability': 'Out of Stock'},
      {"prodid": 12,"prodtype":"Prawn", "prodname": 'Prawn E', "prodqty": '1.5kg', "prodprice": 240, 'availability': 'In Stock'},
      {"prodid": 13,"prodtype":"Others", "prodname": 'Lobster', "prodqty": '200g', "prodprice": 899, 'availability': 'In Stock'},
      {"prodid": 14,"prodtype":"Others", "prodname": 'Oyster', "prodqty": '1kg', "prodprice": 2099, 'availability': 'In Stock'},
      {"prodid": 15,"prodtype":"Others", "prodname": 'Shrimp', "prodqty": '100g', "prodprice": 1299, 'availability': 'Out of Stock'},
      {"prodid": 16,"prodtype":"Others", "prodname": 'Squid', "prodqty": '500g', "prodprice": 1199, 'availability': 'In Stock'}

    ]
  }
}
