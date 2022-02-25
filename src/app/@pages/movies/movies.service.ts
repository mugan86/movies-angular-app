import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  Subscription,
  tap,
  throwError,
} from 'rxjs';
import { IMovie } from './movies.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl = 'http://localhost:3000';

  private loadingData$ = new BehaviorSubject<boolean>(true);
  private movies$ = new BehaviorSubject<IMovie[]>([]);

  constructor(private http: HttpClient) {}

  get loadingData() {
    return this.loadingData$.asObservable();
  }

  get movies() {
    return this.movies$.asObservable();
  }

  loadAll() {
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

  /**
   * Sistema muy basico de manejo de errores
   */
  handleError(error: Error) {
    console.log(error);
    return throwError(() => EMPTY);
  }
}
