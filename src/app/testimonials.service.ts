import { IUserStories } from './user-stories';
import { ITestimonial } from './testimonial';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {

  constructor(private http: HttpClient)
   { }

  //  getUserStories(): Observable<ITestimonial[]>
  //  {
  //    return this.http.get<ITestimonial[]>('http://localhost:3000/users');
  //  }

   getTestimonials(): Observable<IUserStories[]>
   {
     return this.http.get<IUserStories[]>('https://jsonplaceholder.typicode.com/users');
   }

}
