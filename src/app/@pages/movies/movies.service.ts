import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMovie } from './movies.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private loadingData$ = new BehaviorSubject<boolean>(true);
  private movies$ = new BehaviorSubject<IMovie[]>([]);
  private baseUrl = 'http://localhost:3000';
  private dataStore: { movies: IMovie[] } = { movies: [] };
  constructor(private http: HttpClient) { }

  get loadingData() {
    return this.loadingData$.asObservable();
  }
  get movies() {
    return this.movies$.asObservable();
  }
  loadAll() {
    this.loadingData$.next(true);
    this.http.get<IMovie[]>(`${this.baseUrl}/movies`)
    /*.pipe(
      catchError(err => of([]))
    )*/
    .subscribe({
      next: (data: any) => {
        this.dataStore.movies = data;
        this.movies$.next(Object.assign({}, this.dataStore).movies);
      },
      complete: () => {
        console.log('Complete');
        this.loadingData$.next(false);
      },
      error: (e: Error) => console.log(e),
    });
  }
}
