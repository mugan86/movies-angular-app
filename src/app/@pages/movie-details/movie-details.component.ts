import { IMovie } from './../movies/movies.interface';
import { Component } from '@angular/core';
import { TitleService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';
import { MoviesService } from '../movies/movies.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
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
    this.moviesService.movie.subscribe((movie) => {
      this.titleService.change(movie.title)
      this.movie = movie;
    });
    this.loading$ = this.moviesService.loadingData;
  }
}
