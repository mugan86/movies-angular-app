import { createReducer, on } from '@ngrx/store';
import { IMovie } from '@pages/movies/movie.interface';
import { GetMoviesLoad, GetMoviesSuccess, GetMoviesFail } from '../actions';

export interface MoviesState {
  movies: IMovie[];
  status: boolean;
  loading: boolean;
  error: any;
}

export const moviesInitialState: MoviesState = {
  movies: [],
  status: false,
  loading: false,
  error: null,
};

const _moviesReducer = createReducer(
  moviesInitialState,

  on(GetMoviesLoad, (state) => ({ ...state, loading: true })),

  on(GetMoviesSuccess, (state, { movies }) => ({
    ...state,
    loading: false,
    status: true,
    message: '',
    movies: [...movies],
  })),

  on(GetMoviesFail, (state, { payload }) => ({
    ...state,
    loading: false,
    status: false,
    message: payload.message
  }))
);

export function moviesReducer(state: any, action: any) {
  return _moviesReducer(state, action);
}
