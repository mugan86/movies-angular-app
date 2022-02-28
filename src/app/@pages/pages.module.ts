import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SidebarModule, NavbarModule } from '@core/components';
import { AngularResizeEventModule } from 'angular-resize-event';

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule,
    SidebarModule,
    PagesRoutingModule,
    AngularResizeEventModule
  ]
})
export class PagesModule { }
