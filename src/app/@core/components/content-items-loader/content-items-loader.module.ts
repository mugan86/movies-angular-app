import { ContentItemLoaderModule } from '@core/components/content-item-loader/content-item-loader.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentItemsLoaderComponent } from './content-items-loader.component';

@NgModule({
  declarations: [ContentItemsLoaderComponent],
  imports: [CommonModule, ContentItemLoaderModule],
  exports: [ContentItemsLoaderComponent, ContentItemLoaderModule]
})
export class ContentItemsLoaderModule {}
