import { Router } from '@angular/router';
import { TestimonialsService } from './../testimonials.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Title }     from '@angular/platform-browser';


@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {

  testimonials= [];

  usersdummy= [];

  userStories=[];

  constructor(
    public testimonials_data: TestimonialsService,
    public router: Router,
    private titleService: Title
    ) { }

  ngOnInit() {
    this.titleService.setTitle( `AngKart Sea Foods \xa0 |  \xa0 Stakeholders` );
      // //from json-server data.json
      // this.testimonials_data.getUserStories()
      // .subscribe( data => {
      //   this.testimonials = data;
      //   // console.log(this.testimonials);
      //   // console.log(typeof this.testimonials[0].fname);
      // });
      // console.log(this.testimonials);

      
      this.testimonials_data.getTestimonials()
      .subscribe( data => {
        this.userStories = data;
        // console.log(this.userStories);
      });
      // console.log(this.userStories);

      // this.testimonials_data.getUsersDummy()
      // .subscribe( 
      //   res => { this.usersdummy = res},
      //   err => { 
      //     if (err)
      //     {
      //       if(err.status === 401 || err.status === 500)
      //       {
      //         this.router.navigate(['login']);
      //       }
      //     }
      //   }
      // );
     
  }

}
