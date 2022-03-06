import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState {
  moviesList: reducers.MoviesState;
  movieDetails: reducers.MovieState
}

export const appReducers: ActionReducerMap<AppState> = {
  moviesList: reducers.moviesReducer,
  movieDetails: reducers.movieReducer
};
