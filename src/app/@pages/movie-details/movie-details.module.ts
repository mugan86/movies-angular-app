import { HashtagModule } from '@shared/components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsComponent } from './movie-details.component';
import { DurationPipe } from '@core/pipes/duration.pipe';
import { DetailsContentItemModule } from '@core/components';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomTranslateLoader } from '@core/helpers/i18n';
import { FEATURE_DIRECTORIES_I18N } from '@core/constants/i18n';
import { AngularResizeEventModule } from 'angular-resize-event';

const createTranslateLoader = (http: HttpClient) => {
  return new CustomTranslateLoader(
    http,
    FEATURE_DIRECTORIES_I18N.moviesDetails
  );
};
@NgModule({
  declarations: [MovieDetailsComponent, DurationPipe],
  imports: [
    CommonModule,
    MovieDetailsRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    DetailsContentItemModule,
    HashtagModule,
    AngularResizeEventModule
  ],
})
export class MovieDetailsModule {}
