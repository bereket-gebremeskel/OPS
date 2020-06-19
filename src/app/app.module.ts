import { httpInterceptor } from './interceptor/httpInterceptor';
import { SharedModule } from './shared/shared.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { ShellComponent } from './components/layout/home/shell/shell.component';
import { AppRoutingModule } from './app-routing.module';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CriteriaComponent } from './shared/criteria/criteria.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';

import {DynamicDialogModule, DialogService, DynamicDialogRef, DynamicDialogConfig} from 'primeng/dynamicdialog';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { AuthGuardGuard } from './components/auth/authGuard.guard';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ShellComponent,AuthenticationComponent,LoginComponent,SignUpComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    BrowserAnimationsModule,
    SharedModule,
    MenuModule,
    MenubarModule,
    ToastModule
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true },
    ,DialogService,DynamicDialogRef,DynamicDialogConfig,AuthGuardGuard
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
