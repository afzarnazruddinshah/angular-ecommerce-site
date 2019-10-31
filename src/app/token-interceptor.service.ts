import { AuthService } from './auth.service';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public injector: Injector) { }

  intercept(req, next)
  {
    let authservice = this.injector.get(AuthService);
    let token = authservice.getToken();
    let tokenReq = req.clone({
      setHeaders : {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(tokenReq);
  }
}
