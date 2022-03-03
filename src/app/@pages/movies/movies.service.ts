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
  switchMap,
  throwError,
  combineLatest,
} from 'rxjs';
import { IMovie } from './movie.interface';
import { BASE_URL } from '@core/constants/api';
import { ActorService } from '@pages/actors/actor.service';
import { CompaniesService } from '@pages/companies/companies.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl = BASE_URL;

  constructor(
    private http: HttpClient,
    private actorsService: ActorService,
    private companiesService: CompaniesService
  ) {}

  getAll() {
    const url = `${this.baseUrl}/movies`;

    return this.http.get<IMovie[]>(url).pipe(
      map((movies) => {
        return { status: true, message: '', movies };
      }),
      catchError((error) => of({ status: false, message: error, movies: [] }))
    );
  }

  getItem(id: number) {
    const url = `${this.baseUrl}/movies/${id}`;

    return this.http.get<IMovie>(url).pipe(
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
            return { status: true, movie, message: '' };
          })
        );
      }),
      catchError((error: any) => {
        return of({ status: false, movie: undefined, message: error });
      })
    );
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
              return this.companiesService.edit(company.id, {
                ...company,
                movies,
              });
            }

            return of(EMPTY);
          })
        );
      }),
      map(() => {
        return {
          status: true,
        };
      }),
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
        return this.companiesService.item(companyId).pipe(
          switchMap((company) => {
            return this.companiesService.edit(companyId, {
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

  /*getCompanyById(companyId: number) {
    return this.http.get<ICompany>(`${this.baseUrl}/companies/${companyId}`);
  }

  editCompany(companyId: number, company: ICompany) {
    return this.http.put<ICompany>(
      `${this.baseUrl}/companies/${companyId}`,
      company
    );
  }*/

  formListElements() {
    const companies$ = this.companiesService.names();
    const actor$ = this.actorsService.names();

    //
    // return combineLatest([companies$, actor$]).pipe((
    //   map(([companiesFields, actorFields]) => of({companiesFields, actorFields}))
    // ))

    return forkJoin({
      companies: companies$,
      actor: actor$,
    });
  }

}
