import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitleService, NavigationService } from '@core/services';
import menuItems from '@data/menus/principal.json';
import { IMovie } from './movie.interface';
import { Observable } from 'rxjs/internal/Observable';
import { MoviesService } from './movies.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject();
  movies$: Observable<IMovie[]>;
  loading$: Observable<boolean>;
  constructor(
    private titleService: TitleService,
    private translate: TranslateService,
    private moviesService: MoviesService,
    private navigationService: NavigationService,
    private router: Router
  ) {
    this.titleService.change(menuItems[0].label);
    this.translate.setDefaultLang('es');

    // Escuchando cambios
    this.movies$ = this.moviesService.movies.pipe(takeUntil(this.unsubscribe$));
    this.loading$ = this.moviesService.loadingData.pipe(
      takeUntil(this.unsubscribe$)
    );

    this.navigationService.isDetailsOrFormPage(false);
  }

  ngOnInit(): void {
    this.moviesService.getAll();
  }

  trackById = (__: number, movie: any): string => movie.id;

  add = () => this.router.navigateByUrl('/movies/add');

  ngOnDestroy(): void {
    this.moviesService.reset();
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
