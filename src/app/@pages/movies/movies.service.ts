import { ICompany } from './../companies/company.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IActor } from '@pages/actors/actor.interface';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  forkJoin,
  map,
  of,
  Subject,
  Subscription,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { IMovie } from './movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl = 'http://localhost:3000';

  private loadingData$ = new BehaviorSubject<boolean>(true);
  private errorData$ = new BehaviorSubject<{
    type: string;
    status: number;
    message: string;
  }>({
    status: -1,
    message: '',
    type: '-',
  });
  private movies$ = new BehaviorSubject<IMovie[]>([]);
  private movie$ = new Subject<IMovie>();

  constructor(private http: HttpClient) {}

  get loadingData() {
    return this.loadingData$.asObservable();
  }

  get errorData() {
    return this.errorData$.asObservable();
  }

  get movies() {
    return this.movies$.asObservable();
  }

  get movie() {
    return this.movie$.asObservable();
  }

  getAll() {
    const url = `${this.baseUrl}/movies`;

    const sub$: Subscription = this.http
      .get<IMovie[]>(url)
      .pipe(
        tap(() => this.loadingData$.next(true)),
        tap((movies) => this.movies$.next(movies)),
        tap(() => this.loadingData$.next(false)),
        catchError(this.handleError)
      )
      .subscribe({
        complete: () => sub$.unsubscribe(),
        error: () => sub$.unsubscribe(),
      });
  }

  getItem(id: string) {
    const url = `${this.baseUrl}/movies/${id}`;

    const sub$: Subscription = this.http
      .get<IMovie>(url)
      .pipe(
        tap(() => this.loadingData$.next(true)),
        switchMap((movie: IMovie) => {
          return forkJoin([
            of(movie),
            ...movie.actors.map((item) =>
              this.http.get<IActor>(`${this.baseUrl}/actors/${item}`)
            ),
            this.http.get<ICompany>(`${this.baseUrl}/companies`),
          ]).pipe(
            map((data: any[]) => {
              // console.log(data)
              const movie: IMovie = data[0];
              movie.actors = data.slice(1, data.length - 1);
              movie.company = data[data.length - 1].filter(
                (company: ICompany) => {
                  return company.movies.includes(movie.id);
                }
              )[0];
              return movie;
            })
          );
        }),
        tap((movie) => this.movie$.next(movie)),
        tap(() => this.loadingData$.next(false)),
        catchError(this.handleError)
      )
      .subscribe({
        complete: () => sub$.unsubscribe(),
        error: () => sub$.unsubscribe(),
      });
  }

  reset = () => {
    this.loadingData$.next(true);
    this.movies$.next([]);
    this.movie$ = new Subject<IMovie>();
  }

  /**
   * Sistema muy basico de manejo de errores
   */
  handleError(error: { type: string; status: number; message: string }) {
    console.log(error);
    return throwError(() => EMPTY);
  }
}
