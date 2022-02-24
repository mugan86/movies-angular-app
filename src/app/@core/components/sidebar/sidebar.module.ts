import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { CustomTranslateLoader } from '@core/helpers/i18n';
import { HttpClient } from '@angular/common/http';
function dynamicTransLoaderFactory(http: HttpClient) {
  return new CustomTranslateLoader(http, 'sidebar_navbar');
}

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, RouterModule, TranslateModule.forChild()],
  exports: [SidebarComponent, TranslateModule],
})
export class SidebarModule {}
