import { ICompany } from './company.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '@core/constants/api';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { IListField } from '@core/interfaces/form.interface';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private baseUrl = BASE_URL;
  constructor(private httpClient: HttpClient) {}

  list = (): Observable<ICompany[]> =>
    this.httpClient.get<ICompany[]>(`${this.baseUrl}/companies`);

  item = (item: any): Observable<ICompany> =>
    this.httpClient.get<ICompany>(`${this.baseUrl}/companies/${item}`);

  names = (): Observable<Array<IListField>> =>
    this.list().pipe(
      map((company: ICompany[]) => 
      company.map((comp: ICompany) => {
        return {
          id: comp.id, label: comp.name
        }
      }))
    );

    /*names = (): Observable<Array<IListField>> =>
    this.list().pipe(
      map((actors: IActor[]) =>
        actors.map((actor: IActor) => { 
          return {
            id: actor.id, label: `${actor.first_name} ${actor.last_name}`
          }
        })
      )
    );*/
}
