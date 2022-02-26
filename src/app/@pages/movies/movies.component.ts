import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { TitleService } from '@core/services/title.service';
import menuItems from '@data/menus/principal.json';
import { IMovie } from './movies.interface';
import { Observable } from 'rxjs/internal/Observable';
import { MoviesService } from './movies.service';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies$: Observable<IMovie[]>;
  loading$: Observable<boolean>;
  errorData: Observable<{ type: string; status: number; message: string }>;
  constructor(
    private titleService: TitleService,
    private translate: TranslateService,
    private moviesService: MoviesService
  ) {
    this.titleService.change(menuItems[0].label);
    this.translate.setDefaultLang('es');

    // Escuchando cambios
    this.movies$ = this.moviesService.movies;
    this.loading$ = this.moviesService.loadingData;
    this.errorData = this.moviesService.errorData;
  }

  ngOnInit(): void {
    this.moviesService.loadAll();
  }

  trackById = (__: number, movie: any): string => movie.id;
}
