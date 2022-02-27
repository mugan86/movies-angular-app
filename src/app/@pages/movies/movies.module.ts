import { BasicInfoCardModule } from '@shared/components/basic-info-card/basic-info-card.module';
import { ContentItemsLoaderModule } from '@core/components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/@data/i18n/movies/', '.json');
}

@NgModule({
  declarations: [MoviesComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    ContentItemsLoaderModule,
    BasicInfoCardModule,
  ],
})
export class MoviesModule {}
