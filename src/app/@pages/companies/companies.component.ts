import { Component } from '@angular/core';
import { TitleService } from '@core/services/title.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent {
  constructor(private titleService: TitleService) {
    this.titleService.change('Compañias');
  }
}
