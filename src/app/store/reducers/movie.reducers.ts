import { IMovie } from '@pages/movies/movie.interface';

import { createReducer, on } from '@ngrx/store';
import { GetMovieFail, GetMovieLoad, GetMovieSuccess } from '../actions';

export interface MovieState {
  movie?: IMovie;
  status: boolean;
  loading: boolean;
  error: any;
}

export const movieInitialState: MovieState = {
  movie: undefined,
  status: true,
  loading: false,
  error: null,
};

const _movieReducer = createReducer(
  movieInitialState,

  on(GetMovieLoad, (state) => ({ ...state, loading: true })),

  on(GetMovieSuccess, (state, { movie }) => ({
    ...state,
    loading: false,
    status: true,
    message: '',
    movie: Object.assign({}, movie),
  })),

  on(GetMovieFail, (state, { payload }) => ({
    ...state,
    loading: true,
    status: false,
    message: payload.message,
  }))
);

export function movieReducer(state: any, action: any) {
  return _movieReducer(state, action);
}
