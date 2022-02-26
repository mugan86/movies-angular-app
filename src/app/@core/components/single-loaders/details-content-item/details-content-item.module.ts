import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsContentItemComponent } from './details-content-item.component';
import { ContentLoaderModule } from '@ngneat/content-loader';



@NgModule({
  declarations: [
    DetailsContentItemComponent
  ],
  imports: [
    CommonModule,
    ContentLoaderModule
  ],
  exports: [DetailsContentItemComponent]
})
export class DetailsContentItemModule { }
