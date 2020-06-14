import { SharedModule } from './shared/shared.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { ShellComponent } from './components/layout/home/shell/shell.component';
import { AppRoutingModule } from './app-routing.module';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CriteriaComponent } from './shared/criteria/criteria.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShellComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
