import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';


@Injectable()
export class httpInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService,private authservice:AuthService){}
  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {

    // this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  

    var access_token = this.authservice.getAccessToken() ? this.authservice.getAccessToken() : '';
    const authReq = req.clone(
      {
          headers: req.headers.set('x-auth-token' , access_token)
      }
  );
    return next.handle(authReq).pipe(tap(res => res));

  }
}
