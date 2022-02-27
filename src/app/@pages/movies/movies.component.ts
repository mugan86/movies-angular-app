import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitleService } from '@core/services/title.service';
import menuItems from '@data/menus/principal.json';
import { IMovie } from './movie.interface';
import { Observable } from 'rxjs/internal/Observable';
import { MoviesService } from './movies.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject();
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
    this.movies$ = this.moviesService.movies.pipe(takeUntil(this.unsubscribe$));
    this.loading$ = this.moviesService.loadingData.pipe(takeUntil(this.unsubscribe$));
    this.errorData = this.moviesService.errorData.pipe(takeUntil(this.unsubscribe$));
  }

  ngOnInit(): void {
    this.moviesService.getAll();
  }

  trackById = (__: number, movie: any): string => movie.id;

  ngOnDestroy(): void {
    this.moviesService.reset();
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
