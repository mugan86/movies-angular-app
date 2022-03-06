import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitleService, NavigationService } from '@core/services';
import menuItems from '@data/menus/principal.json';
import { IMovie } from './movie.interface';
import { MoviesService } from './movies.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '@shared/services/alert.service';
import { TypeAlertEnum } from '@core/constants/alerts';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { GetMoviesLoad } from 'src/app/store/actions';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject();
  movies: IMovie[] = [];
  loading: boolean = true;
  constructor(
    private titleService: TitleService,
    private translate: TranslateService,
    private moviesService: MoviesService,
    private navigationService: NavigationService,
    private router: Router,
    private alertService: AlertService,
    private store: Store<AppState>
  ) {
    this.titleService.change(menuItems[0].label);
    this.translate.use('es');
    this.navigationService.isDetailsOrFormPage(false);
  }

  ngOnInit() {
    this.moviesService
      .list()
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

      this.store.select('movies').subscribe( ({ movies, loading, status, error }) => {
        console.log(movies, status, error, loading)
        this.movies = movies;
        this.loading  = loading;
        if (status) {
          this.movies = movies;
        } else if (!status && !loading) {
          this.movies = [];
          this.alertService.dialogConfirm(
            'alerts.communicationOffTitle',
            'alerts.communicationOffDescription',
            TypeAlertEnum.ERROR
          );
        }
      });
  
  
      this.store.dispatch( GetMoviesLoad() );
  }

  trackById = (__: number, movie: any): string => movie.id;

  add = () => this.router.navigateByUrl('/movies/add');

  ngOnDestroy(): void {
    this.titleService.change('');
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
