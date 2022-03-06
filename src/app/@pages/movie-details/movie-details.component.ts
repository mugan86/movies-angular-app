import { GetMovieLoad } from './../../store/actions/movie.actions';
import { AlertService } from '@shared/services/alert.service';
import { IMovie } from '@pages/movies/movie.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitleService, NavigationService, ScreenService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { MoviesService } from '@pages/movies/movies.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { TypeAlertEnum } from '@core/constants/alerts';
import { IScreen } from '@core/interfaces/screen.interface';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducers';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject();
  id: string = '';
  movie?: IMovie;
  loading: boolean = true;
  screen: { width: number; height: number } = {
    width: 0,
    height: 0,
  };
  constructor(
    private titleService: TitleService,
    private translate: TranslateService,
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private navigationService: NavigationService,
    private screenService: ScreenService,
    private store: Store<AppState>
  ) {
    this.translate.use('es');
    this.titleService.change('');
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: ParamMap) => {
        this.store.dispatch(GetMovieLoad({ id: Number(params.get('id')) }));
      });

    this.navigationService.isDetailsOrFormPage(true);
    this.screenService.screen$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((screen: IScreen) => {
        this.screen = screen;
      });
  }

  ngOnInit() {
    this.store
      .select('movieDetails')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ movie, loading, status }) => {
        this.loading = loading;
        if (status) {
          this.movie = movie;
        } else if (!status && !loading) {
          this.movie = undefined;
          this.alertService.dialogConfirm(
            'alerts.communicationOffTitle',
            'alerts.communicationOffDescription',
            TypeAlertEnum.ERROR
          );
        }
      });
  }

  async deleteItem() {
    await this.alertService
      .dialogConfirmCancel(
        'alerts.deleteTitle',
        'alerts.deleteContent',
        TypeAlertEnum.WARNING
      )
      .then(async (result: any) => {
        if (result.isConfirmed) {
          this.loading = true;
          this.moviesService
            .delete(this.movie!.id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data) => {
              if (data.status) {
                this.alertService
                  .dialogConfirm(
                    'alerts.deleteItemOkTitle',
                    'alerts.deleteItemOkDesc',
                    TypeAlertEnum.SUCCESS
                  )
                  .then(() => this.navigateTo('/movies'));
              } else {
                this.alertService.dialogConfirm(
                  'alerts.deleteItemNoTitle',
                  'alerts.deleteItemNoDesc',
                  TypeAlertEnum.WARNING
                );
              }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.alertService.dialogConfirm(
            'alerts.deleteItemCancelTitle',
            'alerts.deleteItemCancelDesc',
            TypeAlertEnum.ERROR
          );
        }
      });
  }

  navigateTo = (url: string) => {
    this.navigationService.goTo(url);
  };

  async updateItem() {
    this.navigationService.goTo(`/movies/edit/${this.movie?.id}`);
  }

  trackByElement = (__: number, elementString: any): string => elementString;

  ngOnDestroy(): void {
    this.titleService.change('');
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
