import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentItemLoaderComponent } from './content-item-loader.component';
import { ContentLoaderModule } from '@ngneat/content-loader';

@NgModule({
  declarations: [
    ContentItemLoaderComponent
  ],
  imports: [
    CommonModule,
    ContentLoaderModule
  ],
  exports: [
    ContentItemLoaderComponent
  ]
})
export class ContentItemLoaderModule { }
