import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { TitleService } from '@core/services/title.service';
import menuItems from '@data/menus/principal.json';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  constructor(private titleService: TitleService, private readonly translate: TranslateService) { 
    this.titleService.change(menuItems[0].label);
    this.translate.setDefaultLang('es');
  }
}
