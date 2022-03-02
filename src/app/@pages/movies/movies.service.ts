import { Observable } from 'rxjs/internal/Observable';
import { AlertService } from '@shared/services/alert.service';
import { ICompany } from '@pages/companies/company.interface';
import { HttpClient } from '@angular/common/http';
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
  combineLatest,
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

  loadingData$ = new BehaviorSubject<boolean>(true);
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
                  return company?.movies.includes(movie.id);
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

    const movie$ = this.http.get<IMovie>(url);
    const movieDeleted$ = this.http.delete<null>(url);

    return combineLatest([movie$, movieDeleted$]).pipe(
      switchMap(([movie, _]) => {
        return this.companiesService.list().pipe(
          switchMap((companies) => {
            const company = companies.find((c) => c.movies.includes(movie.id));

            if (company) {
              const movies = company.movies.filter((c) => c !== movie.id);
              return this.editCompany(company.id, { ...company, movies });
            }

            return of(EMPTY);
          })
        );
      }),
      map(() => { return {
        status: true
      }}),
      catchError((error) => of(error))
    );
  }

  add(movie: any, companyId: number) {
    const movie$: Observable<IMovie> = this.http.post<IMovie>(
      `${this.baseUrl}/movies`,
      movie
    );

    return movie$.pipe(
      switchMap((movie) => {
        return this.getCompanyById(companyId).pipe(
          switchMap((company) => {
            return this.editCompany(companyId, {
              ...company,
              movies: [...company?.movies, movie.id],
            });
          })
        );
      }),
      map(() => of({ status: 'ok' })),
      catchError((error) => of(error))
    );
  }

  getCompanyById(companyId: number) {
    return this.http.get<ICompany>(`${this.baseUrl}/companies/${companyId}`);
  }

  editCompany(companyId: number, company: ICompany) {
    return this.http.put<ICompany>(
      `${this.baseUrl}/companies/${companyId}`,
      company
    );
  }

  formListElements() {
    const companies$ = this.companiesService.names();
    const actor$ = this.actorsService.names();

    // 
    // return combineLatest([companies$, actor$]).pipe((
    //   map(([companiesFields, actorFields]) => of({companiesFields, actorFields}))
    // ))

    return forkJoin({
      companies: companies$,
      actor: actor$
    })

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
