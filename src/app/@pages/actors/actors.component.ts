import { NavigationService } from './../../@core/services/navigation.service';
import { Component } from '@angular/core';
import { TitleService } from '@core/services/title.service';
import menuItems from '@data/menus/principal.json';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css'],
})
export class ActorsComponent {
  constructor(
    private titleService: TitleService,
    private navigationService: NavigationService
  ) {
    this.titleService.change(menuItems[1].label);

    this.navigationService.isDetailsPage(false);
  }
}
