import { IMovie } from '../movies/movie.interface';
import { Component } from '@angular/core';
import { TitleService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';
import { MoviesService } from '../movies/movies.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { AlertService } from '@shared/services/alert.service';
import Swal from 'sweetalert2';
import { TypeAlertEnum } from '@core/constants/alerts';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent {
  private readonly unsubscribe$ = new Subject();
  id: string = '';
  movie?: IMovie;
  loading$: Observable<boolean>;
  constructor(
    private titleService: TitleService,
    private translate: TranslateService,
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router
  ) {
    // this.titleService.change(menuItems[0].label);
    this.translate.setDefaultLang('es');
    this.titleService.change('');
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.moviesService.getItem(Number(params.get('id')));
    });
    // Escuchando cambios
    this.moviesService.movie
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((movie) => {
        this.titleService.change(movie.title);
        this.movie = movie;
      });
    this.loading$ = this.moviesService.loadingData.pipe(
      takeUntil(this.unsubscribe$)
    );
  }

  trackByElement = (__: number, elementString: any): string => elementString;

  async deleteItem() {
    await this.alertService.dialogConfirmCancel(
      'ALERTS.deleteTitle',
      'ALERTS.deleteContent',
      TypeAlertEnum.WARNING
    ).then((result) => {
      if (result.isConfirmed) {
        this.moviesService.delete(this.movie!.id).subscribe((data) => {
          if (data.status === undefined) {
            this.alertService.dialogConfirm(
              'Eliminado',
              'Selección eliminada correctamente',
              TypeAlertEnum.SUCCESS
            ).then(() => this.navigateTo('/movies'));
          } else {
            this.alertService.dialogConfirm(
              'No eliminado',
              'Debido a un problema no se ha eliminado',
              TypeAlertEnum.WARNING
            )
          }
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.alertService.dialogConfirm(
          'Cancelled',
          'Your imaginary file is safe :)',
          TypeAlertEnum.ERROR
        );
      }
    });
  }

  navigateTo = (url: string) => {
    this.router.navigateByUrl(url);
  };

  async updateItem() {
    console.log(this.movie);
  }

  ngOnDestroy(): void {
    console.log('Destroy');
    this.moviesService.reset();
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
