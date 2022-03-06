import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as moviesActions from './../actions/movies.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { of } from 'rxjs';
import { MoviesService } from '@pages/movies/movies.service';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}

  loadMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moviesActions.GetMoviesLoad),
      mergeMap(() =>
        this.moviesService.list().pipe(
          map((result) =>
            moviesActions.GetMoviesSuccess({
              status: result.status,
              message: result.message,
              movies: result.movies,
            })
          ),
          catchError((err) => of(moviesActions.GetMoviesFail({ payload: err })))
        )
      )
    )
  );
}
