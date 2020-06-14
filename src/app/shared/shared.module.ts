import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriteriaComponent } from './criteria/criteria.component';
import  {FormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ CriteriaComponent],
  exports:[
    FormsModule,
    CommonModule,
    CriteriaComponent
  ]
})
export class SharedModule { }
