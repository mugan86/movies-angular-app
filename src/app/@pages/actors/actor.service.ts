import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '@core/constants/api';
import { Observable } from 'rxjs/internal/Observable';
import { IActor } from './actor.interface';
import { SweetAlertResult } from 'sweetalert2';
import { map } from 'rxjs/internal/operators/map';
import { IListField } from '@core/interfaces/form.interface';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  private baseUrl = BASE_URL;
  constructor(
    private httpClient: HttpClient
  ) {}

  list = (): Observable<IActor[]> =>
    this.httpClient.get<IActor[]>(`${this.baseUrl}/actors`);


  item = (item: any): Observable<IActor | SweetAlertResult<any>> =>
    this.httpClient.get<IActor>(`${this.baseUrl}/actors/${item}`);

  names = (): Observable<Array<IListField>> =>
    this.list().pipe(
      map((actors: IActor[]) =>
        actors.map((actor: IActor) => { 
          return {
            id: actor.id, label: `${actor.first_name} ${actor.last_name}`
          }
        })
      )
    );
}
