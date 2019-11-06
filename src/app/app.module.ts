import { UserfeaturesService } from './userfeatures.service';

import { TokenInterceptorService } from './token-interceptor.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { TestimonialsService } from './testimonials.service';
import { ProductsService } from './products.service/products.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProddescComponent } from './proddesc/proddesc.component';
import { ProdheaderDirective } from './prod.header.directive/prodheader.directive';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ProductComponent } from './product/product.component';

import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchPipe } from './search.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { AuthComponent } from './auth/auth.component';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CheckoutComponent } from './checkout/checkout.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import { OrdersuccessComponent } from './ordersuccess/ordersuccess.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SignupComponent,
    PagenotfoundComponent,
    ProddescComponent,
    ProdheaderDirective,
    TestimonialsComponent,
    SearchPipe,
    ProductComponent,
    LoginComponent,
    AuthComponent,
    LogoutDialogComponent,
    WishlistComponent,
    CartComponent,
    CheckoutComponent,
    OrdersuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatRadioModule,
    MatTooltipModule
  ],
  entryComponents: [
    LogoutDialogComponent
  ],
  providers: [
    Title,
    ProductsService, 
    TestimonialsService, 
    AuthService,
    AuthGuard,
    UserfeaturesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
