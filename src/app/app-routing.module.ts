import { OrdersuccessComponent } from './ordersuccess/ordersuccess.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ProddescComponent } from './proddesc/proddesc.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ 
  { 
    path: '', 
    component: HomeComponent
  },
  { 
    path: 'signup', 
    component: SignupComponent
  },
  {
    path: 'products/:prodid',
    component: ProddescComponent

  },
  {
    path: 'testimonials',
    component: TestimonialsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ordersuccess/:ordercolname',
    component: OrdersuccessComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    component : PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
