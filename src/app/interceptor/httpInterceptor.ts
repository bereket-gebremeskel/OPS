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


@Injectable()
export class httpInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService){}
  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    console.log(req)
    return next.handle(req).pipe(tap(res => console.log("res",res)));
  }
}
