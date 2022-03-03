import { ICompany } from './company.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '@core/constants/api';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap } from 'rxjs/operators';
import { IListField } from '@core/interfaces/form.interface';
import { IMovie } from '@pages/movies/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private baseUrl = BASE_URL;
  constructor(private httpClient: HttpClient) {}

  list = (): Observable<ICompany[]> =>
    this.httpClient.get<ICompany[]>(`${this.baseUrl}/companies`);

  item = (id: any): Observable<ICompany> =>
    this.httpClient.get<ICompany>(`${this.baseUrl}/companies/${id}`);

  edit = (id: number, company: ICompany) => {
    return this.httpClient.put<ICompany>(
      `${this.baseUrl}/companies/${id}`,
      company
    );
  };

  assignMovieInCompany = (movie: IMovie, companyId: number) => {
    return this.item(companyId).pipe(
      switchMap((company) => {
        return this.edit(companyId, {
          ...company,
          movies: [...company?.movies, movie.id],
        });
      })
    );
  }

  names = (): Observable<IListField[]> =>
    this.list().pipe(
      map((company: ICompany[]) =>
        company.map((comp: ICompany) => {
          return {
            id: comp.id,
            label: comp.name,
          };
        })
      )
    );

  getWithMovies = (): Observable<
    {
      id: number;
      name: string;
      movies: number[];
    }[]
  > => {
    return this.list().pipe(
      map((company: ICompany[]) =>
        company.map((comp: ICompany) => {
          return {
            id: comp.id || -1,
            name: comp.name,
            movies: comp.movies,
          };
        })
      )
    );
  };
}
