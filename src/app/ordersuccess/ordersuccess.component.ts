import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ordersuccess',
  templateUrl: './ordersuccess.component.html',
  styleUrls: ['./ordersuccess.component.css']
})
export class OrdersuccessComponent implements OnInit {

  public orderid:any;

  constructor(  public actroute: ActivatedRoute) { }

  ngOnInit() {

    this.orderid = String(this.actroute.snapshot.paramMap.get('ordercolname'));
  }

}
