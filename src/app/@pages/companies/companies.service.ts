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

  item = (id: number) =>
    this.httpClient.get<ICompany>(`${this.baseUrl}/companies/${id}`);

  edit = (id: number, company: ICompany) => {
    return this.httpClient.put<ICompany>(
      `${this.baseUrl}/companies/${id}`,
      company
    );
  };

  /**
   * Buscaremos la compañía relacionada a la película
   * @param movieId Id de la película para encontrar la compañía asociada
   * @returns company: ICompany
   */
  itemByMovie = (movieId: number): Observable<ICompany | undefined> => {
    return this.list().pipe(
      map((companies) =>
        companies.find((company) => company.movies.includes(movieId))
      ),
      map((company) => company)
    );
  };

  /**
   * Actualizar la propiedad movies de la compañía seleccionada con la película
   * especificada.
   * @param movie Película que usaremos para asociarlo a una compañía
   * @param companyId id de la compañia a donde vamos a relacionar la película
   * @returns
   */
  assignMovieInCompany = (movie: IMovie, companyId: number) => {
    return this.item(companyId).pipe(
      switchMap((company) => {
        return this.edit(companyId, {
          ...company,
          movies: Array.from(new Set([...company?.movies, movie.id])) as [],
        });
      })
    );
  };

  /**
   * Obtenemos los básico para cargar en el formulario para crear / editar película
   * @returns [{id: id de compañia, name: nombre de compañia}]
   */
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

  /**
   * Lista de compañía con sus relaciones a películas
   * obteniendo lo básico como id, nombre y películas
   * @returns
   */
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
