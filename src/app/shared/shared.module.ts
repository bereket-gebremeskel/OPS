import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriteriaComponent } from './criteria/criteria.component';
import  {FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CustomCardComponent } from './custom-card/custom-card.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { WordTruncatePipe } from './word-truncate.pipe';
@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      DynamicDialogModule
   ],
   declarations: [
      CriteriaComponent,
      CustomCardComponent,
      WordTruncatePipe
   ],
   exports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      CriteriaComponent,
      CustomCardComponent,
      WordTruncatePipe
   ]
})
export class SharedModule { }
