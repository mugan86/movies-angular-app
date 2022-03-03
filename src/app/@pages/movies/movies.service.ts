import { Observable } from 'rxjs/internal/Observable';
import { ICompany } from '@pages/companies/company.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  EMPTY,
  forkJoin,
  map,
  of,
  switchMap,
  combineLatest,
} from 'rxjs';
import { IMovie } from './movie.interface';
import { BASE_URL } from '@core/constants/api';
import { ActorService } from '@pages/actors/actor.service';
import { CompaniesService } from '@pages/companies/companies.service';

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

  list() {
    const url = `${this.baseUrl}/movies`;

    this.companiesService.itemByMovie(11).subscribe((data) => console.log(data));

    return this.http.get<IMovie[]>(url).pipe(
      map((movies) => {
        return { status: true, message: '', movies };
      }),
      catchError((error) => of({ status: false, message: error, movies: [] }))
    );
  }

  get(id: number) {
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
        return this.companiesService.assignMovieInCompany(movie, companyId);
      }),
      map(() => of({ status: 'ok' })),
      catchError((error) => of(error))
    );
  }

  update(movie: any, companyId: number, movieId: number) {
    console.log(movieId, movie);
    movie.id = movieId;
    const movie$: Observable<IMovie> = this.http.put<IMovie>(
      `${this.baseUrl}/movies/${movieId}`,
      movie
    );

    return movie$.pipe(
      
      switchMap((movie: IMovie) => {
        return forkJoin([
          of(movie),
          this.companiesService.itemByMovie(movieId),
          this.companiesService.assignMovieInCompany(movie, companyId),
        ]).pipe(
          map((data: any[]) => {
            console.log(data)
            const movie = data [0];
            let oldRelation: ICompany = data[1];
            const newRelation: ICompany = data[2];
            if (oldRelation.id !== newRelation.id) {
              const moviesOldCompany = oldRelation.movies;
              const removeOldRelation = moviesOldCompany.filter((value) => value !== movieId)
              oldRelation.movies = removeOldRelation;
            }
            
            console.log(oldRelation, newRelation);
            return { movie, old: oldRelation, newRelation };
          }),
          switchMap(({movie, old, newRelation}) => {
            return forkJoin({
              status: of(true),
              movie: of(movie),
              old: (old.id !== newRelation.id) ? this.companiesService.edit(old.id, old) : of(old),
              new: of(newRelation),
            })
          })
        );
      }),
     /*switchMap((oldRelation: ICompany, newRelation: ICompany) => {
        return forkJoin([
          of(movie),
          this.companiesService.itemByMovie(movieId),
          this.companiesService.assignMovieInCompany(movie, companyId),
        ]).pipe(
          map((data: any[]) => {
            console.log(data)
            const movie = data [0];
            const oldRelation: ICompany = data[1];
            const newRelation: ICompany = data[2];
            oldRelation.movies.slice(oldRelation.movies.indexOf(movieId), 1);
            newRelation.movies.push(movieId);
            console.log(oldRelation, newRelation);
            return { oldRelation, newRelation };
          })
        );
      }),*/
      /*switchMap((movie) => {
        return of({ movie, lastCompany: 
          this.companiesService.itemByMovie(11).pipe(map((item) => item.company))})
      }),
      switchMap(({movie, lastCompany}) => {
        console.log(lastCompany)
        return this.companiesService.assignMovieInCompany(movie, companyId);
      }),
      map(() => {
        return { status: true, movie, message: '' };
      }),*/
      catchError((error) => of(error))
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
      actor: actor$,
    });
  }
}
