import { Component } from '@angular/core';
import { NavigationService } from '@core/services/navigation.service';
import { TitleService } from '@core/services/title.service';
import menuItems from '@data/menus/principal.json';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent {
  constructor(
    private titleService: TitleService,
    private navigationService: NavigationService
  ) {
    this.titleService.change(menuItems[2].label);

    this.navigationService.isDetailsPage(false);
  }
}
