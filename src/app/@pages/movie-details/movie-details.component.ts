import { IMovie } from '../movies/movie.interface';
import { Component } from '@angular/core';
import { TitleService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';
import { MoviesService } from '../movies/movies.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
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
    private route: ActivatedRoute
  ) {
    // this.titleService.change(menuItems[0].label);
    this.translate.setDefaultLang('es');
    this.titleService.change('');
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.moviesService.getItem(params.get('id') || '');
    })
    // Escuchando cambios
    this.moviesService.movie.pipe(takeUntil(this.unsubscribe$)).subscribe((movie) => {
      this.titleService.change(movie.title)
      this.movie = movie;
    });
    this.loading$ = this.moviesService.loadingData.pipe(takeUntil(this.unsubscribe$));
  }

  trackByElement = (__: number, elementString: any): string => elementString;

  ngOnDestroy(): void {
    console.log('Destroy');
    this.moviesService.reset();
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
