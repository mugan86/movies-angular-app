import { Component } from '@angular/core';
import { SidebarService } from '@core/services/sidebar.service';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent {
  constructor(private sidebarService: SidebarService) {}
  openNav() {
    this.sidebarService.openMenu();
  }
}
