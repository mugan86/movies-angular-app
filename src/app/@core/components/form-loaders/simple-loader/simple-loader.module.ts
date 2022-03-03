import { ContentLoaderModule } from '@ngneat/content-loader';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleFormLoaderComponent } from './simple-loader.component';

@NgModule({
  declarations: [SimpleFormLoaderComponent],
  imports: [CommonModule, ContentLoaderModule],
  exports: [SimpleFormLoaderComponent],
})
export class SimpleFormLoaderModule {}
