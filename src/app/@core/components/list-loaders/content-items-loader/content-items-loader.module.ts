import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentItemsLoaderComponent } from './content-items-loader.component';
import { ContentItemLoaderModule } from '@core/components/list-loaders/content-item-loader/content-item-loader.module';
@NgModule({
  declarations: [ContentItemsLoaderComponent],
  imports: [CommonModule, ContentItemLoaderModule],
  exports: [ContentItemsLoaderComponent, ContentItemLoaderModule]
})
export class ContentItemsLoaderModule {}
