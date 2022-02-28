import { Component } from '@angular/core';
import { NavigationStart, Router, NavigationEnd } from '@angular/router';
import { SidebarService, TitleService } from '@core/services';
import { Location } from '@angular/common';
import { NavigationService } from '@core/services/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  title: string = '';
  isDetails: boolean = false;
  currentPath: string = '';
  constructor(
    private sidebarService: SidebarService,
    private titleService: TitleService,
    private navigationService: NavigationService
  ) {
    console.log(window.location.hash)
    this.titleService.title.subscribe((title) => (this.title = title));
    this.navigationService.inDetails$.subscribe((inDetails) => {
      this.isDetails = inDetails
    })
    
  }
  openNav(): void {
    this.sidebarService.openMenu();
  }

  back(): void {
    this.navigationService.back()
  }
}
