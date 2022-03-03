import { Subject } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { NavigationService, TitleService } from '@core/services';
import menuItems from '@data/menus/principal.json';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnDestroy{
  private readonly unsubscribe$ = new Subject(); 
  constructor(
    private titleService: TitleService,
    private navigationService: NavigationService
  ) {
    this.titleService.change(menuItems[2].label);

    this.navigationService.isDetailsOrFormPage(false);
  }

  ngOnDestroy(): void {
    this.titleService.change('');
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
