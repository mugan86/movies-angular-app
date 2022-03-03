import { TypeAlertEnum } from '@core/constants/alerts';
import { AlertService } from '@shared/services/alert.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '@core/constants/api';
import { Observable } from 'rxjs/internal/Observable';
import { IActor } from './actor.interface';
import { SweetAlertResult } from 'sweetalert2';
import { map } from 'rxjs/internal/operators/map';
import { last } from 'rxjs';
import { IListField } from '@core/interfaces/form.interface';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  private baseUrl = BASE_URL;
  constructor(
    private httpClient: HttpClient,
    private alertService: AlertService
  ) {}

  list = (): Observable<IActor[]> =>
    this.httpClient.get<IActor[]>(`${this.baseUrl}/actors`);
  item = (item: any): Observable<IActor | SweetAlertResult<any>> =>
    this.httpClient.get<IActor>(`${this.baseUrl}/actors/${item}`).pipe(
      catchError(() =>
        this.alertService
          .dialogConfirm('eeee', 'eeee', TypeAlertEnum.ERROR)
          .then((value) => {
            console.log(value);
            return value;
          })
      )
    );

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
