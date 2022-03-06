import { IMovie } from '@pages/movies/movie.interface';
import { createAction, props } from '@ngrx/store';

export enum MoviesActionTypes {
  GetMoviesLoad = '[Movies] Get Movies',
  GetMoviesSuccess = '[Movies] Get Movies Success',
  GetMoviesFail = '[Movies] Get Movies Fail',
}

export const GetMoviesLoad = createAction(MoviesActionTypes.GetMoviesLoad);

export const GetMoviesSuccess = createAction(
  MoviesActionTypes.GetMoviesSuccess,
  props<{ status: boolean; message: string; movies: IMovie[] }>()
);

export const GetMoviesFail = createAction(
  MoviesActionTypes.GetMoviesFail,
  props<{ payload: any }>()
);
