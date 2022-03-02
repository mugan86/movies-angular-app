import { Observable } from 'rxjs/internal/Observable';
import { AlertService } from '@shared/services/alert.service';
import { ICompany } from '@pages/companies/company.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
import { BASE_URL } from '@core/constants/api';
import { ActorService } from '@pages/actors/actor.service';
import { CompaniesService } from '@pages/companies/companies.service';
import { TypeAlertEnum } from '@core/constants/alerts';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl = BASE_URL;

  private loadingData$ = new BehaviorSubject<boolean>(true);
  private movies$ = new BehaviorSubject<IMovie[]>([]);
  private movie$ = new Subject<IMovie>();

  constructor(
    private http: HttpClient,
    private actorsService: ActorService,
    private companiesService: CompaniesService,
    private alertService: AlertService,
    private router: Router
  ) {}

  get loadingData() {
    return this.loadingData$.asObservable();
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
        catchError(catchError((error) => of(error)))
      )
      .subscribe({
        complete: () => sub$.unsubscribe(),
        error: () => sub$.unsubscribe(),
      });
  }

  getItem(id: number) {
    const url = `${this.baseUrl}/movies/${id}`;

    const sub$: Subscription = this.http
      .get<IMovie>(url)
      .pipe(
        tap(() => this.loadingData$.next(true)),
        switchMap((movie: IMovie) => {
          return forkJoin([
            of(movie),
            ...movie.actors.map((item) => this.actorsService.item(item)),
            this.companiesService.list(),
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
        catchError(async (error) =>
          this.alertService
            .dialogConfirm('eeee', 'eeee', TypeAlertEnum.ERROR)
            .then((value) => {
              this.router.navigateByUrl('/');
              return value;
            })
        )
      )
      .subscribe({
        complete: () => sub$.unsubscribe(),
        error: () => sub$.unsubscribe(),
      });
  }

  delete(id: number) {
    const url = `${this.baseUrl}/movies/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.delete<IMovie>(url, httpOptions).pipe(
      catchError((error) => of(error))
    );
  }

  add(movie: any, relationCompany: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<IMovie>(`${this.baseUrl}/movies`, movie, httpOptions)
      .pipe(
        switchMap((movie: IMovie) => {
          return forkJoin([of(movie), this.companiesService.list()]).pipe(
            map((movieAndCompany: any[]) => {
              // 0: Movie / 1: CompaniesList
              const dataVal: ICompany = movieAndCompany[1].filter(
                (value: { id: number }) => {
                  return value.id === relationCompany;
                }
              )[0];
              dataVal.movies.push(movieAndCompany[0].id);
              return dataVal;
            }),
            switchMap((company: ICompany) => {
              return forkJoin([
                this.http.put<ICompany>(
                  `${this.baseUrl}/companies/${company.id}`,
                  company,
                  httpOptions
                ),
              ]);
            })
          );
        }),
        catchError((error) => of(error))
      );
  }

  reset = () => {
    this.loadingData$.next(true);
    this.movies$.next([]);
    this.movie$ = new Subject<IMovie>();
  };

  /**
   * Sistema muy basico de manejo de errores
   */
  handleError(error: { type: string; status: number; message: string }) {
    console.log(error);
    return throwError(() => EMPTY);
  }
}
