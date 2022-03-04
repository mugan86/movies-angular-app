import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieFormComponent } from './movie-form.component';
import { MovieAddRoutingModule } from './movie-form-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CustomTranslateLoader } from '@core/helpers/i18n';
import { FEATURE_DIRECTORIES_I18N } from '@core/constants/i18n';
import { SimpleFormLoaderModule } from '@core/components';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectValueModule } from '@shared/components';
const createTranslateLoader = (http: HttpClient) => {
  return new CustomTranslateLoader(http, FEATURE_DIRECTORIES_I18N.moviesForm);
};
@NgModule({
  declarations: [MovieFormComponent],
  imports: [
    CommonModule,
    MovieAddRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    SimpleFormLoaderModule,
    SelectValueModule,
  ],
})
export class MovieFormModule {}
