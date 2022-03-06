import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as movieActions from './../actions/movie.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { of } from 'rxjs';
import { MoviesService } from '@pages/movies/movies.service';

@Injectable()
export class MovieEffects {
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}

  loadMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(movieActions.GetMovieLoad),
      mergeMap((action) =>
        this.moviesService.get(action.id).pipe(
          map((result) =>
          movieActions.GetMovieSuccess({
            status: result.status,
            message: result.message,
            movie: result.movie,
          })
          ),
          catchError((err) => of(movieActions.GetMovieFail({ payload: err })))
        )
      )
    )
  );
  
}
