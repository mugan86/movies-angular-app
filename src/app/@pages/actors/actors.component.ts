import { NavigationService, TitleService } from '@core/services';
import { Component, OnDestroy } from '@angular/core';
import menuItems from '@data/menus/principal.json';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css'],
})
export class ActorsComponent implements OnDestroy {
  private readonly unsubscribe$ = new Subject();
  constructor(
    private titleService: TitleService,
    private navigationService: NavigationService
  ) {
    this.titleService.change(menuItems[1].label);

    this.navigationService.isDetailsOrFormPage(false);
  }

  ngOnDestroy(): void {
    this.titleService.change('');
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
