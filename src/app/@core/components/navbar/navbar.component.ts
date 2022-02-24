import { Component } from '@angular/core';
import { SidebarService, TitleService } from '@core/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  title: string = '';
  constructor(
    private sidebarService: SidebarService,
    private titleService: TitleService
  ) {
    this.titleService.title.subscribe((title) => (this.title = title));
  }
  openNav() {
    this.sidebarService.openMenu();
  }
}
