import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieAddComponent } from './movie-add.component';
import { MovieAddRoutingModule } from './movie-add-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CustomTranslateLoader } from '@core/helpers/i18n';
import { FEATURE_DIRECTORIES_I18N } from '@core/constants/i18n';
import { SimpleFormLoaderModule } from '@core/components';
const createTranslateLoader = (http: HttpClient) => {
  return new CustomTranslateLoader(
    http,
    FEATURE_DIRECTORIES_I18N.moviesAdd
  );
};
@NgModule({
  declarations: [
    MovieAddComponent
  ],
  imports: [
    CommonModule,
    MovieAddRoutingModule,
    FormsModule, ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    SimpleFormLoaderModule
  ]
})
export class MovieAddModule { }
