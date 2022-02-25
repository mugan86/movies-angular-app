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
export class MoviesComponent implements OnInit{
  movies$: Observable<IMovie[]>;
  infoLoading: Observable<boolean>;
  constructor(
    private titleService: TitleService,
    private translate: TranslateService,
    private moviesService: MoviesService
  ) {
    this.titleService.change(menuItems[0].label);
    this.translate.setDefaultLang('es');

    // Escuchando cambios
    this.movies$ = this.moviesService.movies;
    this.infoLoading = this.moviesService.loadingData;
  }

  ngOnInit(): void {
    
    this.moviesService.loadAll()
    
  }

  trackById = (index: number, movie: any): string => movie.id;
}
