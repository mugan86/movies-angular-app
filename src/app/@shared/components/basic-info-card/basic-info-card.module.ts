import { HashtagModule } from '@shared/components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicInfoCardComponent } from './basic-info-card.component';

@NgModule({
  declarations: [
    BasicInfoCardComponent
  ],
  imports: [
    CommonModule,
    HashtagModule
  ],
  exports: [BasicInfoCardComponent]
})
export class BasicInfoCardModule { }
