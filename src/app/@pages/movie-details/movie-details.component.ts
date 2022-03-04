import { AlertService } from '@shared/services/alert.service';
import { IMovie } from '@pages/movies/movie.interface';
import { Component, OnDestroy } from '@angular/core';
import { TitleService, NavigationService, ScreenService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { MoviesService } from '@pages/movies/movies.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { TypeAlertEnum } from '@core/constants/alerts';
import { IScreen } from '@core/interfaces/screen.interface';
import { IActor } from '@pages/actors/actor.interface';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnDestroy {
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
    private router: Router,
    private navigationService: NavigationService,
    private screenService: ScreenService
  ) {
    this.translate.use('es');
    this.titleService.change('');
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: ParamMap) => {
        this.moviesService
          .get(Number(params.get('id')))
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((result) => {
            if (result.status) {
              this.movie = result.movie;
              this.titleService.change(result.movie!.title);
              this.loading = false;
            } else if (!result.status) {
              if (result.message.status === 404) {
                this.alertService
                  .dialogConfirm(
                    'alerts.infoNotFound',
                    'alerts.infoNotFoundDescription',
                    TypeAlertEnum.ERROR
                  )
                  .then(() => {
                    this.navigateTo('');
                  });
                return;
              }
              this.alertService.dialogConfirm(
                'alerts.communicationOffTitle',
                'alerts.communicationOffDescription',
                TypeAlertEnum.ERROR
              );
            }
          });
      });

    this.navigationService.isDetailsOrFormPage(true);
    this.screenService.screen$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((screen: IScreen) => {
        this.screen = screen;
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
                    'Eliminado',
                    'Selección eliminada correctamente',
                    TypeAlertEnum.SUCCESS
                  )
                  .then(() => this.navigateTo('/movies'));
              } else {
                this.alertService.dialogConfirm(
                  'No eliminado',
                  'Debido a un problema no se ha eliminado',
                  TypeAlertEnum.WARNING
                );
              }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.alertService.dialogConfirm(
            'Cancelled',
            'Your imaginary file is safe :)',
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
