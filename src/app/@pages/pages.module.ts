import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SidebarModule } from '@core/components/sidebar/sidebar.module';
import { NavbarModule } from '@core/components/navbar/navbar.module';


@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule,
    SidebarModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
