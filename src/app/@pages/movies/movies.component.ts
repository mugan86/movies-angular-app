import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy } from '@angular/core';
import { TitleService, NavigationService } from '@core/services';
import menuItems from '@data/menus/principal.json';
import { IMovie } from './movie.interface';
import { MoviesService } from './movies.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '@shared/services/alert.service';
import { TypeAlertEnum } from '@core/constants/alerts';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnDestroy {
  private readonly unsubscribe$ = new Subject();
  movies: IMovie[] = [];
  loading: boolean = true;
  constructor(
    private titleService: TitleService,
    private translate: TranslateService,
    private moviesService: MoviesService,
    private navigationService: NavigationService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.titleService.change(menuItems[0].label);
    this.translate.setDefaultLang('es');

    this.moviesService
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        console.log(result);
        if (result.status) {
          this.movies = result.movies;
          this.loading = false;
        } else if (!result.status) {
          this.alertService.dialogConfirm(
            'alerts.communicationOffTitle',
            'alerts.communicationOffDescription',
            TypeAlertEnum.ERROR
          );
        }
      });

    this.navigationService.isDetailsOrFormPage(false);
  }

  trackById = (__: number, movie: any): string => movie.id;

  add = () => this.router.navigateByUrl('/movies/add');

  ngOnDestroy(): void {
    this.titleService.change('');
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
