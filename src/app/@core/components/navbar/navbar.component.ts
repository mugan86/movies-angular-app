import { Component } from '@angular/core';
import { SidebarService, TitleService } from '@core/services';
import { NavigationService } from '@core/services/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  title: string = '';
  isDetailsOrForm: boolean = false;
  currentPath: string = '';
  constructor(
    private sidebarService: SidebarService,
    private titleService: TitleService,
    private navigationService: NavigationService
  ) {
    console.log(window.location.hash)
    this.titleService.title.subscribe((title) => (this.title = title));
    this.navigationService.inDetailsOrForm$.subscribe((inDetailsOrForm) => {
      this.isDetailsOrForm = inDetailsOrForm
    })
    
  }

  back(): void {
    this.navigationService.back()
  }
}
