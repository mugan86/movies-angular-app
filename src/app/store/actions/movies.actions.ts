import { IMovie } from '@pages/movies/movie.interface';
import { createAction, props } from '@ngrx/store';

export enum MovieActionTypes {
  GetMoviesLoad = '[Movies] Get Movies',
  GetMoviesSuccess = '[Movies] Get Movies Success',
  GetMoviesFail = '[Movies] Get Movies Fail',
}

export const GetMoviesLoad = createAction(MovieActionTypes.GetMoviesLoad);

export const GetMoviesSuccess = createAction(
  MovieActionTypes.GetMoviesSuccess,
  props<{ status: boolean, message: string, movies: IMovie[] }>()
);

export const GetMoviesFail = createAction(
  MovieActionTypes.GetMoviesFail,
  props<{ payload: any }>()
);
