import { IMovie } from '@app/@pages/movies/movie.interface';
import { createAction, props } from '@ngrx/store';

export enum MovieActionTypes {
  GetMovieLoad = '[Movies] Get Movie',
  GetMovieSuccess = '[Movies] Get Movie Success',
  GetMovieFail = '[Movies] Get Movie Fail',
}

export const GetMovieLoad = createAction(MovieActionTypes.GetMovieLoad,
    props<{ id: number }>());

export const GetMovieSuccess = createAction(
  MovieActionTypes.GetMovieSuccess,
  props<{ status: boolean; message: any; movie?: IMovie }>()
);

export const GetMovieFail = createAction(
  MovieActionTypes.GetMovieFail,
  props<{ payload: any }>()
);
