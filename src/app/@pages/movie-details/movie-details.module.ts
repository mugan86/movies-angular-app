import { HashtagModule } from '@shared/components/hashtag/hashtag.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsComponent } from './movie-details.component';
import { DurationPipe } from '@core/pipes/duration.pipe';
import { DetailsContentItemModule } from '@core/components';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/@data/i18n/movies-details/', '.json');
}
@NgModule({
  declarations: [MovieDetailsComponent, DurationPipe],
  imports: [CommonModule, MovieDetailsRoutingModule, 
  TranslateModule.forChild({
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient],
    },
    isolate: true,
  }), DetailsContentItemModule, HashtagModule],
})
export class MovieDetailsModule {}
