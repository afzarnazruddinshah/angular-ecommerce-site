import { ProductsService } from '../products.service/products.service';
// import { prod } from './../../assets/fish.png'
import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products = [];
  imagesrc = './../../assets/fish.png';

  itemType:string='';
  searchModeId:number=2;
  searchterm: string = '';

  wlclass= "far fa-heart";

  constructor(
    public prods : ProductsService, 
    public router: Router,
    private titleService: Title
    ) { }

  ngOnInit() {
    this.products = this.prods.getProducts();
    this.titleService.setTitle( `AngKart Sea Foods \xa0 |  \xa0 Explore` );
    // console.log(this.products);
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

  searchItems(item)
  {
    console.log(item);
  }

  changeProdType(itemType)
  {
    this.itemType = itemType;

    if(this.itemType === 'All')
    {
      this.searchModeId = 2;
    }
    else
    {
    this.searchModeId = 1;
    this.searchterm = '';
    console.log(this.itemType);
    }
  }

  changeSearchMode(id)
  {
    this.searchModeId=id;

    console.log(this.searchModeId);
    if (this.searchModeId === 1)
    {
      this.searchterm = '';
    }

    else if(this.searchModeId === 2)
    {
        this.itemType="All";
    }
  }
}
